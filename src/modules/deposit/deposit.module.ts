import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateDepositHandler } from './commands/create-deposit.handler';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { DepositEntity } from './entities/deposit.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([DepositEntity])],
  controllers: [DepositController],
  providers: [DepositService, CreateDepositHandler],
  exports: [DepositService],
})
export class DepositModule {}
