import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDepositDto {
  @IsString()
  @IsNotEmpty()
  hash: string;
  @IsString()
  @IsNotEmpty()
  fromAddress: string;
  @IsString()
  @IsNotEmpty()
  toAddress: string;
  @IsString()
  @IsNotEmpty()
  ownerAddress: string;
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsString()
  @IsOptional()
  type: string;
  @IsString()
  @IsOptional()
  version: string;
}

//Event ID: 789012345
//Timestamp: March 11, 2024, at 15:30:00 UTC
//Type: chain-processing.fct.lending.deposit.v1
//Specification Version: 1.0
//Data:
//Hash:
//0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
//From Address: 0x9876543210987654321098765432109876543210
//To Address: 0x1234567890123456789012345678901234567890
//Unix Timestamp: 1647029400
//Owner Address: 0x9876543210987654321098765432109876543210
//Amount Deposited: 1 ETH (1000000000000000000 wei)
