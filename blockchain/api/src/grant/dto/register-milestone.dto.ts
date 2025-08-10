import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterMilestoneDto {
  @ApiProperty({ description: 'Stellar address of the manager submitting the milestone' })
  @IsString()
  @IsNotEmpty()
  manager: string;

  @ApiProperty({ description: 'On-chain ID of the grant' })
  @IsString()
  @IsNotEmpty()
  grant_id: string;

  @ApiProperty({ description: 'Name of the milestone' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the milestone' })
  @IsString()
  @IsNotEmpty()
  description: string;
}