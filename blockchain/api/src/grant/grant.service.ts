import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grant } from './entities/grant.entity';
import { User } from './entities/user.entity';
import { SorobanService } from '../soroban/soroban.service';
import { CreateGrantDto } from './dto/create-grant.dto';
import { ClaimPaymentDto } from './dto/claim-payment.dto';
import { RegisterMilestoneDto } from './dto/register-milestone.dto';
import { ApproveMilestoneDto } from './dto/approve-milestone.dto';

@Injectable()
export class GrantService {
  constructor(
    @InjectRepository(Grant)
    private readonly grantRepository: Repository<Grant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly sorobanService: SorobanService,
  ) {}

  private async findOrCreateUser(email: string, name: string): Promise<User> {
    let user = await this.userRepository.findOneBy({ email });
    if (!user) {
      user = this.userRepository.create({ email, name });
      await this.userRepository.save(user);
    }
    return user;
  }

  public async createGrantAndBuildTx(
    createGrantDto: CreateGrantDto,
  ): Promise<any> {
    const {
      managerName,
      managerEmail,
      supervisorName,
      supervisorEmail,
      researcherName,
      researcherEmail,
      ...restOfData
    } = createGrantDto;

    const managerUser = await this.findOrCreateUser(managerEmail, managerName);
    const supervisorUser = await this.findOrCreateUser(
      supervisorEmail,
      supervisorName,
    );
    const researcherUser = await this.findOrCreateUser(
      researcherEmail,
      researcherName,
    );

    const newGrant = this.grantRepository.create({
      funderInstitutionName: restOfData.funderInstitutionName,
      manager: managerUser,
      supervisor: supervisorUser,
      researcher: researcherUser,
    });
    await this.grantRepository.save(newGrant);

    const transactionXdr =
      await this.sorobanService.buildCreateGrantTransaction(createGrantDto);

    return {
      databaseId: newGrant.id,
      transaction: transactionXdr,
    };
  }

  public async getFullGrantDetails(onChainId: bigint): Promise<any> {
    const onChainData = await this.sorobanService.getGrantDetails(onChainId);
    const offChainData = await this.grantRepository.findOne({
      where: { onChainId: Number(onChainId) },
    });

    if (!offChainData) {
      throw new NotFoundException('Off-chain grant data not found.');
    }

    return { onChain: onChainData, offChain: offChainData };
  }

  public async getFullMilestoneDetails(
    grantId: bigint,
    milestoneId: number,
  ): Promise<any> {
    const onChainGrant = await this.sorobanService.getGrantDetails(grantId);
    const onChainMilestone = await this.sorobanService.getMilestoneDetails(
      grantId,
      milestoneId,
    );

    const offChainGrant = await this.grantRepository.findOne({
      where: { onChainId: Number(grantId) },
      relations: ['manager', 'supervisor', 'researcher'],
    });

    if (!offChainGrant) {
      throw new NotFoundException('Off-chain grant data not found.');
    }

    const approversWithRoles = onChainMilestone.approvers.map(
      (approverAddress: string) => {
        let role = 'Unknown';
        let name = 'Unknown Name';

        if (approverAddress === onChainGrant.manager) {
          role = 'Manager';
          name = offChainGrant.manager.name;
        } else if (approverAddress === onChainGrant.supervisor) {
          role = 'Supervisor';
          name = offChainGrant.supervisor.name;
        } else if (approverAddress === onChainGrant.researcher) {
          role = 'Researcher';
          name = offChainGrant.researcher.name;
        }
        return { address: approverAddress, role, name };
      },
    );

    return {
      ...onChainMilestone,
      approvers: approversWithRoles,
      participants: {
        manager: {
          address: onChainGrant.manager,
          name: offChainGrant.manager.name,
        },
        supervisor: {
          address: onChainGrant.supervisor,
          name: offChainGrant.supervisor.name,
        },
        researcher: {
          address: onChainGrant.researcher,
          name: offChainGrant.researcher.name,
        },
      },
    };
  }

  public async buildRegisterMilestoneTransaction(
    data: RegisterMilestoneDto,
  ): Promise<{ transaction: string }> {
    const xdr =
      await this.sorobanService.buildRegisterMilestoneTransaction(data);
    return { transaction: xdr };
  }

  public async buildApproveMilestoneTransaction(
    data: ApproveMilestoneDto,
  ): Promise<{ transaction: string }> {
    const xdr =
      await this.sorobanService.buildApproveMilestoneTransaction(data);
    return { transaction: xdr };
  }

  public async buildClaimPaymentTransaction(
    data: ClaimPaymentDto,
  ): Promise<{ transaction: string }> {
    const xdr = await this.sorobanService.buildClaimPaymentTransaction(data);
    return { transaction: xdr };
  }
}
