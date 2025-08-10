import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ApproveMilestoneDto {
  @ApiProperty({ description: 'Stellar address of the approver (manager, supervisor, or researcher)' })
  @IsString() @IsNotEmpty() signer: string;

  @ApiProperty({ description: 'On-chain ID of the grant' })
  @IsString() @IsNotEmpty() grant_id: string;

  @ApiProperty({ description: 'ID of the milestone' })
  @IsNumber() milestone_id: number;
}