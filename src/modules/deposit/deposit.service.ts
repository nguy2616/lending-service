import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateDepositCommand } from './commands/create-deposit.command';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Injectable()
export class DepositService {
  constructor(private readonly commandBus: CommandBus) {}

  async createDeposit(dto: CreateDepositDto) {
    return this.commandBus.execute(new CreateDepositCommand(dto));
  }
}
