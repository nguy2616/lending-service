import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { WithdrawLogEntity } from '../entities/withdraw-log.entity';
import { WithdrawEntity } from '../entities/withdraw.entity';
import { CreateWithdrawCommand } from './create-withdraw.command';

@CommandHandler(CreateWithdrawCommand)
export class CreateWithdrawHandler
  implements ICommandHandler<CreateWithdrawCommand>
{
  constructor(private readonly entityManager: EntityManager) {}

  async execute({ withdrawDto }: CreateWithdrawCommand) {
    try {
      Logger.log('execute withdraw', withdrawDto);
      return this.entityManager.transaction(async (trx) => {
        const data = await trx.save(WithdrawEntity, [
          { ...withdrawDto, unixTimestamp: new Date().getTime() },
        ]);
        await trx.save(WithdrawLogEntity, [
          { log: JSON.stringify({ ...data }) },
        ]);
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
