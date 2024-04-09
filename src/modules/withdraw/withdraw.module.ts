import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithDrawController } from './WithDraw.controller';
import { WithDrawService } from './WithDraw.service';
import { CreateWithdrawHandler } from './commands/create-withdraw.handler';
import { WithdrawEntity } from './entities/withdraw.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([WithdrawEntity])],
  controllers: [WithDrawController],
  providers: [WithDrawService, CreateWithdrawHandler],
  exports: [WithDrawService],
})
export class WithDrawModule {}
