import { Global, Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

import { TypeOrmModule } from '@nestjs/typeorm';
import {
  KAFKA_CLIENT,
  KAFKA_GROUPID,
  KAFKA_NAME,
  KAFKA_SERVER,
} from '../../environments';
import { DepositModule } from '../deposit/deposit.module';
import { DeadLetterQueueEntity } from '../dlq/entities/dlq.entity';
import { WithDrawModule } from '../withdraw/withdraw.module';
import { KafkaConsumer } from './kafka.consumer';
import { ProducerService } from './producer.service';
@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: KAFKA_CLIENT,
            brokers: [KAFKA_SERVER],
          },
          consumer: {
            groupId: KAFKA_GROUPID,
          },
        },
      },
    ]),
    DepositModule,
    WithDrawModule,
    TypeOrmModule.forFeature([DeadLetterQueueEntity]),
  ],
  controllers: [KafkaConsumer],
  providers: [ProducerService, ClientKafka],
  exports: [ProducerService],
})
export class KafkaModule {}
