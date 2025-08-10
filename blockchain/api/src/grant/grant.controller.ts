import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { GrantService } from './grant.service';
import { CreateGrantDto } from './dto/create-grant.dto';
import { ClaimPaymentDto } from './dto/claim-payment.dto';
import { ApproveMilestoneDto } from './dto/approve-milestone.dto';
import { RegisterMilestoneDto } from './dto/register-milestone.dto';

@ApiTags('Grants')
@Controller('grants')
export class GrantController {
  constructor(private readonly grantService: GrantService) {}

  @Get(':grantId')
  @ApiOperation({ summary: 'Get full on-chain and off-chain grant details' })
  @ApiResponse({ status: 200, description: 'Grant details returned successfully.' })
  @ApiResponse({ status: 404, description: 'Grant not found.' })
  public async getGrantDetails(@Param('grantId') grantId: string): Promise<any> {
    return this.grantService.getFullGrantDetails(BigInt(grantId));
  }

  @Get(':grantId/milestones/:milestoneId')
  @ApiOperation({ summary: 'Get full details for a specific milestone' })
  @ApiResponse({ status: 200, description: 'Milestone details returned successfully.' })
  @ApiResponse({ status: 404, description: 'Milestone or grant not found.' })
  public async getMilestoneDetails(
    @Param('grantId') grantId: string,
    @Param('milestoneId', ParseIntPipe) milestoneId: number,
  ): Promise<any> {
    return this.grantService.getFullMilestoneDetails(BigInt(grantId), milestoneId);
  }

  @Post('build/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a grant off-chain and build the on-chain transaction XDR' })
  @ApiResponse({ status: 201, description: 'Grant created and transaction XDR returned.' })
  @ApiBody({ type: CreateGrantDto })
  public async createGrant(
    @Body() grantData: CreateGrantDto,
  ): Promise<{ databaseId: number; transaction: string }> {
    return this.grantService.createGrantAndBuildTx(grantData);
  }

  @Post('build/register-milestone')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Build the XDR for registering a new milestone' })
  @ApiResponse({ status: 200, description: 'Transaction XDR returned.' })
  @ApiBody({ type: RegisterMilestoneDto })
  public async registerMilestone(
    @Body() data: RegisterMilestoneDto,
  ): Promise<{ transaction: string }> {
    return this.grantService.buildRegisterMilestoneTransaction(data);
  }

  @Post('build/approve-milestone')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Build the XDR for approving a milestone' })
  @ApiResponse({ status: 200, description: 'Transaction XDR returned.' })
  @ApiBody({ type: ApproveMilestoneDto })
  public async approveMilestone(
    @Body() data: ApproveMilestoneDto,
  ): Promise<{ transaction: string }> {
    return this.grantService.buildApproveMilestoneTransaction(data);
  }

  @Post('build/claim-payment')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Build the XDR for claiming a milestone payment' })
  @ApiResponse({ status: 200, description: 'Transaction XDR returned.' })
  @ApiBody({ type: ClaimPaymentDto })
  public async claimPayment(
    @Body() data: ClaimPaymentDto,
  ): Promise<{ transaction: string }> {
    return this.grantService.buildClaimPaymentTransaction(data);
  }
}