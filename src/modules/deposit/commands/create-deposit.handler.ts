import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { DepositLogEntity } from '../entities/deposit-log.entity';
import { DepositEntity } from '../entities/deposit.entity';
import { CreateDepositCommand } from './create-deposit.command';

@CommandHandler(CreateDepositCommand)
export class CreateDepositHandler
  implements ICommandHandler<CreateDepositCommand>
{
  constructor(private readonly entityManager: EntityManager) {}

  async execute({ depositDto }: CreateDepositCommand) {
    try {
      Logger.log('execute deposit', depositDto);
      return this.entityManager.transaction(async (trx) => {
        const data = await trx.save(DepositEntity, [
          { ...depositDto, unixTimestamp: new Date().getTime() },
        ]);
        await trx.save(DepositLogEntity, [
          { log: JSON.stringify({ ...data }) },
        ]);
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
