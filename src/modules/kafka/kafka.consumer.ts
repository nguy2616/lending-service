import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as retry from 'async-retry';
import { Repository } from 'typeorm';
import { DepositService } from '../deposit/deposit.service';
import { CreateDepositDto } from '../deposit/dto/create-deposit.dto';
import { DeadLetterQueueEntity } from '../dlq/entities/dlq.entity';
import { WithDrawService } from '../withdraw/WithDraw.service';
import { CreateWithDrawDto } from '../withdraw/dto/create-WithDraw.dto';

@Controller('consumer')
export class KafkaConsumer {
  constructor(
    private readonly depositSerivce: DepositService,
    private readonly withdrawService: WithDrawService,
    @InjectRepository(DeadLetterQueueEntity)
    private readonly dlqRepo: Repository<DeadLetterQueueEntity>,
  ) {}

  async consume(fn: () => Promise<void>, payload, topic) {
    try {
      await retry(
        async () => {
          await fn();
        },
        {
          retries: 3,
          factor: 2,
          minTimeout: 3000,
          maxTimeout: 8000,
          onRetry: (error, attemptNumber) => {
            console.error(`Attempt ${attemptNumber} failed: ${error.message}`);
          },
        },
      );
    } catch (error) {
      Logger.log('dead leater queue');
      await this.saveFailMs(payload, topic, error.message);
    }
  }

  @EventPattern('deposit')
  async deposit(
    @Payload()
    payload: CreateDepositDto,
  ) {
    Logger.log('[Kafka receive]: deposit');
    Logger.debug(JSON.stringify(payload));
    await this.consume(
      async () => await this.depositSerivce.createDeposit(payload),
      payload,
      'deposit',
    );
  }

  @EventPattern('withdraw')
  async withdraw(
    @Payload()
    payload: CreateWithDrawDto,
  ) {
    Logger.log('[Kafka receive]: withdraw');
    Logger.debug(JSON.stringify(payload));
    await this.consume(
      async () => await this.withdrawService.createWithDraw(payload),
      payload,
      'withdraw',
    );
  }

  async saveFailMs(payload: any, topic: string, err: string) {
    try {
      await this.dlqRepo.save({
        eventId: payload?.eventId,
        topic,
        message: JSON.stringify(payload),
        error: err,
      });
    } catch (error) {
      Logger.error('save DLQ fail', error);
    }
  }
}
