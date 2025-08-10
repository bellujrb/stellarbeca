#![cfg(test)]

use beca::{GrantContract, GrantContractClient, MilestoneStatus};

use soroban_sdk::testutils::Address as _;
use soroban_sdk::token::{Client as TokenClient, StellarAssetClient};
use soroban_sdk::{Address, Env, String};

fn setup_test_env<'a>() -> (Env, GrantContractClient<'a>, TokenClient<'a>, StellarAssetClient<'a>, Address, Address, Address, Address, Address) {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None, GrantContract);
    let client = GrantContractClient::new(&env, &contract_id);
    let funder = Address::generate(&env);
    let manager = Address::generate(&env);
    let supervisor = Address::generate(&env);
    let researcher = Address::generate(&env);
    let token_id = env.register_stellar_asset_contract(funder.clone());
    let token_admin_client = StellarAssetClient::new(&env, &token_id);
    let token_public_client = TokenClient::new(&env, &token_id);
    client.initialize(&token_id);
    (env, client, token_public_client, token_admin_client, contract_id, funder, manager, supervisor, researcher)
}

#[test]
fn test_create_grant_successfully() {
    let (_, client, token_client, token_admin_client, contract_id, funder, manager, supervisor, researcher) = setup_test_env();
    let total_amount = 1_000_000_000;
    let grant_name = String::from_str(&client.env, "Climate Research Grant");
    let milestone_count = 4;
    token_admin_client.mint(&funder, &total_amount);
    token_client.approve(&funder, &contract_id, &total_amount, &100);
    let grant_id = client.create_grant(&funder, &manager, &supervisor, &researcher, &grant_name, &total_amount, &milestone_count);
    assert_eq!(grant_id, 1);
    assert_eq!(token_client.balance(&funder), 0);
    assert_eq!(token_client.balance(&contract_id), total_amount);
    let saved_grant = client.get_grant(&grant_id);
    assert_eq!(saved_grant.manager, manager);
}

#[test]
fn test_full_flow_one_milestone() {
    let (_, client, token_client, token_admin_client, contract_id, funder, manager, supervisor, researcher) = setup_test_env();
    let total_amount = 1200;
    let milestone_count = 3;
    token_admin_client.mint(&funder, &total_amount);
    token_client.approve(&funder, &contract_id, &total_amount, &100);
    let grant_id = client.create_grant(&funder, &manager, &supervisor, &researcher, &String::from_str(&client.env, "Full Flow Test"), &total_amount, &milestone_count);

    // Atualizado para incluir a descrição
    let milestone_name = String::from_str(&client.env, "Delivery 1");
    let milestone_desc = String::from_str(&client.env, "Submit the initial project report.");
    let milestone_id = client.register_milestone(&manager, &grant_id, &milestone_name, &milestone_desc);
    
    client.approve_milestone(&researcher, &grant_id, &milestone_id);
    client.approve_milestone(&supervisor, &grant_id, &milestone_id);
    client.approve_milestone(&manager, &grant_id, &milestone_id);
    
    let milestone_data = client.get_milestone(&grant_id, &milestone_id);
    assert_eq!(milestone_data.status, MilestoneStatus::Approved);
    assert_eq!(milestone_data.description, milestone_desc);
    
    let researcher_balance_before = token_client.balance(&researcher);
    client.claim_payment(&researcher, &grant_id, &milestone_id);
    
    let payment_amount = total_amount / (milestone_count as i128);
    let researcher_balance_after = token_client.balance(&researcher);
    assert_eq!(researcher_balance_after, researcher_balance_before + payment_amount);

    let final_milestone_data = client.get_milestone(&grant_id, &milestone_id);
    assert!(final_milestone_data.paid);
}

#[test]
#[should_panic(expected = "Participants must be unique")]
fn test_create_grant_fails_with_duplicate_participants() {
    let (_, client, _, _, _, funder, manager, _, researcher) = setup_test_env();
    client.create_grant(&funder, &manager, &manager, &researcher, &String::from_str(&client.env, "Failed Grant"), &1000, &1);
}

#[test]
#[should_panic(expected = "Payment for this milestone has already been claimed")]
fn test_fails_on_claiming_payment_twice() {
    let (_, client, token_client, token_admin_client, contract_id, funder, manager, supervisor, researcher) = setup_test_env();
    let amount = 1000;
    token_admin_client.mint(&funder, &amount);
    token_client.approve(&funder, &contract_id, &amount, &100);
    let grant_id = client.create_grant(&funder, &manager, &supervisor, &researcher, &String::from_str(&client.env, "Double Payment Test"), &amount, &1);
    
    let milestone_id = client.register_milestone(
        &manager,
        &grant_id,
        &String::from_str(&client.env, "M1"),
        &String::from_str(&client.env, "Description for M1")
    );
    
    client.approve_milestone(&researcher, &grant_id, &milestone_id);
    client.approve_milestone(&supervisor, &grant_id, &milestone_id);
    client.approve_milestone(&manager, &grant_id, &milestone_id);
    
    client.claim_payment(&manager, &grant_id, &milestone_id);
    client.claim_payment(&manager, &grant_id, &milestone_id);
}