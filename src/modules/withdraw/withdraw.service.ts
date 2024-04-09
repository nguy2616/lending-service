import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateWithdrawCommand } from './commands/create-withdraw.command';
import { CreateWithDrawDto } from './dto/create-WithDraw.dto';

@Injectable()
export class WithDrawService {
  constructor(private readonly commandBus: CommandBus) {}

  async createWithDraw(dto: CreateWithDrawDto) {
    return this.commandBus.execute(new CreateWithdrawCommand(dto));
  }
}
