#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, token,
    Address, Env, Map, String, Vec,
};

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum MilestoneStatus {
    Pending,
    Approved,
    Rejected,
}

#[contracttype]
#[derive(Clone)]
pub struct Milestone {
    pub name: String,
    pub description: String, 
    pub status: MilestoneStatus,
    pub approvers: Vec<Address>,
    pub paid: bool,
}

#[contracttype]
#[derive(Clone)]
pub struct Grant {
    pub manager: Address,
    pub supervisor: Address,
    pub researcher: Address,
    pub funder: Address,
    pub total_amount: i128,
    pub claimed_amount: i128,
    pub name: String,
    pub total_milestones: u32,
    pub registered_milestones: u32,
    pub creation_timestamp: u64,
}

#[derive(Clone)]
#[contracttype]
pub enum StorageKey {
    TokenAddress,
    NextGrantId,
    Grants,
    Milestones,
}

pub trait GrantContractTrait {
    fn initialize(env: Env, token_address: Address);
    fn create_grant(
        env: Env,
        funder: Address,
        manager: Address,
        supervisor: Address,
        researcher: Address,
        name: String,
        total_amount: i128,
        total_milestones: u32,
    ) -> u64;

    fn register_milestone(
        env: Env,
        manager: Address,
        grant_id: u64,
        name: String,
        description: String,
    ) -> u32;

    fn approve_milestone(env: Env, signer: Address, grant_id: u64, milestone_id: u32);
    fn claim_payment(env: Env, claimer: Address, grant_id: u64, milestone_id: u32);
    fn get_grant(env: Env, id: u64) -> Grant;
    fn get_milestone(env: Env, grant_id: u64, milestone_id: u32) -> Milestone;
}


#[contract]
pub struct GrantContract;

#[contractimpl]
impl GrantContractTrait for GrantContract {
    fn initialize(env: Env, token_address: Address) {
        if env.storage().instance().has(&symbol_short!("init")) {
            panic!("Contract already initialized");
        }
        env.storage().instance().set(&symbol_short!("init"), &true);
        env.storage().instance().set(&StorageKey::TokenAddress, &token_address);
    }
    
    fn create_grant(/*...arguments...*/env: Env, funder: Address, manager: Address, supervisor: Address, researcher: Address, name: String, total_amount: i128, total_milestones: u32) -> u64 {
        funder.require_auth();

        if total_amount <= 0 || total_milestones == 0 {
            panic!("Amount and milestone count must be greater than zero");
        }
        if manager == supervisor || manager == researcher || supervisor == researcher {
            panic!("Participants must be unique");
        }

        let token_address: Address = env.storage().instance().get(&StorageKey::TokenAddress).unwrap();
        let token = token::Client::new(&env, &token_address);
        token.transfer_from(&env.current_contract_address(), &funder, &env.current_contract_address(), &total_amount);
        
        let mut grants: Map<u64, Grant> = env.storage().instance().get(&StorageKey::Grants).unwrap_or_else(|| Map::new(&env));
        let grant_id = env.storage().instance().get(&StorageKey::NextGrantId).unwrap_or(1u64);

        let new_grant = Grant {
            manager, supervisor, researcher, funder, total_amount, name, total_milestones,
            claimed_amount: 0,
            registered_milestones: 0,
            creation_timestamp: env.ledger().timestamp(),
        };

        grants.set(grant_id, new_grant);
        env.storage().instance().set(&StorageKey::Grants, &grants);
        env.storage().instance().set(&StorageKey::NextGrantId, &(grant_id + 1));

        grant_id
    }
    
    fn register_milestone(env: Env, manager: Address, grant_id: u64, name: String, description: String) -> u32 {
        manager.require_auth();
        
        let mut grant = Self::get_grant(env.clone(), grant_id);
        
        if grant.manager != manager {
            panic!("Only the grant manager can register milestones");
        }
        if grant.registered_milestones >= grant.total_milestones {
            panic!("Maximum number of milestones already reached");
        }

        let milestone_id = grant.registered_milestones + 1;
        
        let new_milestone = Milestone {
            name,
            description, 
            status: MilestoneStatus::Pending,
            approvers: Vec::new(&env),
            paid: false,
        };

        let mut milestones: Map<(u64, u32), Milestone> = env.storage().instance().get(&StorageKey::Milestones).unwrap_or_else(|| Map::new(&env));
        milestones.set((grant_id, milestone_id), new_milestone);
        env.storage().instance().set(&StorageKey::Milestones, &milestones);

        grant.registered_milestones = milestone_id;
        let mut grants_map: Map<u64, Grant> = env.storage().instance().get(&StorageKey::Grants).unwrap();
        grants_map.set(grant_id, grant);
        env.storage().instance().set(&StorageKey::Grants, &grants_map);
        
        milestone_id
    }
    
    fn approve_milestone(/*...arguments...*/ env: Env, signer: Address, grant_id: u64, milestone_id: u32) {
        signer.require_auth();
        let grant = Self::get_grant(env.clone(), grant_id);
        if signer != grant.manager && signer != grant.supervisor && signer != grant.researcher {
            panic!("Only grant participants can approve");
        }
        let mut milestone = Self::get_milestone(env.clone(), grant_id, milestone_id);
        if milestone.status != MilestoneStatus::Pending {
            panic!("Milestone is not pending approval");
        }
        if milestone.approvers.contains(&signer) {
            panic!("Signer has already approved this milestone");
        }
        milestone.approvers.push_back(signer);
        if milestone.approvers.len() == 3 {
            milestone.status = MilestoneStatus::Approved;
        }
        let mut milestones_map: Map<(u64, u32), Milestone> = env.storage().instance().get(&StorageKey::Milestones).unwrap();
        milestones_map.set((grant_id, milestone_id), milestone);
        env.storage().instance().set(&StorageKey::Milestones, &milestones_map);
    }

    fn claim_payment(/*...arguments...*/ env: Env, claimer: Address, grant_id: u64, milestone_id: u32) {
        claimer.require_auth();
        let mut grant = Self::get_grant(env.clone(), grant_id);
        if claimer != grant.manager && claimer != grant.supervisor && claimer != grant.researcher {
            panic!("Only grant participants can claim payment");
        }
        let mut milestone = Self::get_milestone(env.clone(), grant_id, milestone_id);
        if milestone.status != MilestoneStatus::Approved {
            panic!("Milestone is not approved");
        }
        if milestone.paid {
            panic!("Payment for this milestone has already been claimed");
        }
        let payment_amount = grant.total_amount / (grant.total_milestones as i128);
        let token_address: Address = env.storage().instance().get(&StorageKey::TokenAddress).unwrap();
        let token = token::Client::new(&env, &token_address);
        token.transfer(&env.current_contract_address(), &grant.researcher, &payment_amount);
        milestone.paid = true;
        let mut milestones_map: Map<(u64, u32), Milestone> = env.storage().instance().get(&StorageKey::Milestones).unwrap();
        milestones_map.set((grant_id, milestone_id), milestone);
        env.storage().instance().set(&StorageKey::Milestones, &milestones_map);
        grant.claimed_amount += payment_amount;
        let mut grants_map: Map<u64, Grant> = env.storage().instance().get(&StorageKey::Grants).unwrap();
        grants_map.set(grant_id, grant);
        env.storage().instance().set(&StorageKey::Grants, &grants_map);
    }
        
    fn get_grant(env: Env, id: u64) -> Grant {
        let grants: Map<u64, Grant> = env.storage().instance().get(&StorageKey::Grants).unwrap();
        grants.get(id).unwrap()
    }

    fn get_milestone(env: Env, grant_id: u64, milestone_id: u32) -> Milestone {
        let milestones: Map<(u64, u32), Milestone> = env.storage().instance().get(&StorageKey::Milestones).unwrap();
        milestones.get((grant_id, milestone_id)).unwrap()
    }
}