import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WithdrawEntity } from '../entities/withdraw.entity';
import { CreateWithdrawCommand } from './create-Withdraw.command';

@CommandHandler(CreateWithdrawCommand)
export class CreateWithdrawHandler
  implements ICommandHandler<CreateWithdrawCommand>
{
  constructor(
    @InjectRepository(WithdrawEntity)
    private readonly repo: Repository<WithdrawEntity>,
  ) {}

  async execute({ withdrawDto }: CreateWithdrawCommand): Promise<void> {
    try {
      Logger.log('execute Withdraw', withdrawDto);
      await this.repo.save({
        ...withdrawDto,
        unixTimestamp: new Date().getTime(),
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
