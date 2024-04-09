import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithDrawController } from './WithDraw.controller';
import { WithDrawService } from './WithDraw.service';
import { WithdrawEntity } from './entities/withdraw.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([WithdrawEntity])],
  controllers: [WithDrawController],
  providers: [WithDrawService],
  exports: [WithDrawService],
})
export class WithDrawModule {}
