import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ClaimPaymentDto {
  @ApiProperty({ description: 'Stellar address of the researcher claiming payment' })
  @IsString() @IsNotEmpty() claimer: string;
  
  @ApiProperty({ description: 'On-chain ID of the grant' })
  @IsString() @IsNotEmpty() grant_id: string;
  
  @ApiProperty({ description: 'ID of the milestone being claimed' })
  @IsNumber() milestone_id: number;
}