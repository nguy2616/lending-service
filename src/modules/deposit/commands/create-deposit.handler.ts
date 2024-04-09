import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepositEntity } from '../entities/deposit.entity';
import { CreateDepositCommand } from './create-deposit.command';

@CommandHandler(CreateDepositCommand)
export class CreateDepositHandler
  implements ICommandHandler<CreateDepositCommand>
{
  constructor(
    @InjectRepository(DepositEntity)
    private readonly repo: Repository<DepositEntity>,
  ) {}

  async execute({ depositDto }: CreateDepositCommand): Promise<void> {
    try {
      Logger.log('execute deposit', depositDto);
      await this.repo.save({
        ...depositDto,
        unixTimestamp: new Date().getTime(),
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
