import { CreateDepositDto } from '../dto/create-deposit.dto';

export class CreateDepositCommand {
  constructor(public readonly depositDto: CreateDepositDto) {}
}
