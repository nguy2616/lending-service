import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './modules/database/orm.config';
import { DepositModule } from './modules/deposit/deposit.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { WithDrawModule } from './modules/withdraw/withdraw.module';

@Module({
  imports: [
    DepositModule,
    WithDrawModule,
    KafkaModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
