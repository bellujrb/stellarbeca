import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class CreateGrantDto {
  @ApiProperty({ description: 'Stellar address of the funder' })
  @IsString() @IsNotEmpty() funder: string;

  @ApiProperty({ description: 'Stellar address of the manager' })
  @IsString() @IsNotEmpty() manager: string;

  @ApiProperty({ description: 'Stellar address of the supervisor' })
  @IsString() @IsNotEmpty() supervisor: string;
  
  @ApiProperty({ description: 'Stellar address of the researcher' })
  @IsString() @IsNotEmpty() researcher: string;
  
  @ApiProperty({ description: 'The name of the grant' })
  @IsString() @IsNotEmpty() name: string;
  
  @ApiProperty({ description: 'Total grant amount in stroops', example: '10000000' })
  @IsString() @IsNotEmpty() total_amount: string;
  
  @ApiProperty({ description: 'Number of milestones for the grant' })
  @IsNumber() total_milestones: number;
  
  @ApiProperty({ description: 'Name of the funding institution' })
  @IsString() @IsNotEmpty() funderInstitutionName: string;
  
  @ApiProperty() @IsString() @IsNotEmpty() managerName: string;
  @ApiProperty() @IsEmail() managerEmail: string;

  @ApiProperty() @IsString() @IsNotEmpty() supervisorName: string;
  @ApiProperty() @IsEmail() supervisorEmail: string;

  @ApiProperty() @IsString() @IsNotEmpty() researcherName: string;
  @ApiProperty() @IsEmail() researcherEmail: string;
}