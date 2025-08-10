import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GrantService } from 'src/grant/grant.service';
import { SorobanService } from 'src/soroban/soroban.service';
import { Grant } from 'src/grant/entities/grant.entity';
import { User } from 'src/grant/entities/user.entity';
import { CreateGrantDto } from 'src/grant/dto/create-grant.dto';

const mockSorobanService = {
  buildCreateGrantTransaction: jest.fn(),
  getGrantDetails: jest.fn(),
  getMilestoneDetails: jest.fn(),
  buildRegisterMilestoneTransaction: jest.fn(),
  buildApproveMilestoneTransaction: jest.fn(),
  buildClaimPaymentTransaction: jest.fn(),
};

const mockUserRepository = {
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockGrantRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('GrantService', () => {
  let service: GrantService;
  let sorobanService: SorobanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrantService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: getRepositoryToken(Grant), useValue: mockGrantRepository },
        { provide: SorobanService, useValue: mockSorobanService },
      ],
    }).compile();

    service = module.get<GrantService>(GrantService);
    sorobanService = module.get<SorobanService>(SorobanService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGrantAndBuildTx', () => {
    it('should create users and a grant, then build the transaction', async () => {
      const dto = {
        managerName: 'Test Manager',
        managerEmail: 'manager@test.com',
        supervisorName: 'Test Supervisor',
        supervisorEmail: 'supervisor@test.com',
        researcherName: 'Test Researcher',
        researcherEmail: 'researcher@test.com',
      } as CreateGrantDto;
      const expectedXdr = 'TRANSACTION_XDR_HERE';
      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(mockUserRepository, 'create').mockReturnValue(new User());
      jest
        .spyOn(mockGrantRepository, 'create')
        .mockReturnValue({ id: 1 } as Grant);
      jest.spyOn(mockUserRepository, 'save').mockResolvedValue(new User());
      jest
        .spyOn(mockGrantRepository, 'save')
        .mockResolvedValue({ id: 1 } as Grant);
      mockSorobanService.buildCreateGrantTransaction.mockResolvedValue(
        expectedXdr,
      );

      const result = await service.createGrantAndBuildTx(dto);

      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(3);
      expect(mockUserRepository.create).toHaveBeenCalledTimes(3);
      expect(mockUserRepository.save).toHaveBeenCalledTimes(3);
      expect(mockGrantRepository.create).toHaveBeenCalledTimes(1);
      expect(mockGrantRepository.save).toHaveBeenCalledTimes(1);
      expect(sorobanService.buildCreateGrantTransaction).toHaveBeenCalledWith(
        dto,
      );
      expect(result).toEqual({ databaseId: 1, transaction: expectedXdr });
    });
  });

  describe('getFullGrantDetails', () => {
    it('should return combined on-chain and off-chain data', async () => {
      const grantId = BigInt(1);
      const onChainData = { name: 'On-Chain Grant' };
      const offChainData = { funderInstitutionName: 'Off-Chain Inc.' } as Grant;
      mockSorobanService.getGrantDetails.mockResolvedValue(onChainData);
      jest
        .spyOn(mockGrantRepository, 'findOne')
        .mockResolvedValue(offChainData);

      const result = await service.getFullGrantDetails(grantId);

      expect(sorobanService.getGrantDetails).toHaveBeenCalledWith(grantId);
      expect(mockGrantRepository.findOne).toHaveBeenCalledWith({
        where: { onChainId: Number(grantId) },
      });
      expect(result).toEqual({ onChain: onChainData, offChain: offChainData });
    });

    it('should throw NotFoundException if off-chain data is not found', async () => {
      const grantId = BigInt(1);
      mockSorobanService.getGrantDetails.mockResolvedValue({});
      jest.spyOn(mockGrantRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getFullGrantDetails(grantId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('buildRegisterMilestoneTransaction', () => {
    it('should call sorobanService and return the transaction', async () => {
      const data = {} as any;
      const expectedXdr = 'REGISTER_XDR';
      mockSorobanService.buildRegisterMilestoneTransaction.mockResolvedValue(
        expectedXdr,
      );

      const result = await service.buildRegisterMilestoneTransaction(data);

      expect(
        sorobanService.buildRegisterMilestoneTransaction,
      ).toHaveBeenCalledWith(data);
      expect(result).toEqual({ transaction: expectedXdr });
    });
  });
});
