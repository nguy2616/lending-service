import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { sleep } from '../../utils/sleep';
import { CreateDepositDto } from '../deposit/dto/create-deposit.dto';
import { CreateWithDrawDto } from '../withdraw/dto/create-WithDraw.dto';
@Injectable()
export class ProducerService implements OnModuleInit {
  constructor(
    @Inject('LENDING_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}
  async publish(topic: string, payload: Record<string, any>): Promise<void> {
    try {
      const eventId = uuidv4();
      payload.eventId = eventId;
      this.kafkaClient.emit(topic, payload);

      Logger.log(
        `publishing to topic: ${topic}, payload: ${JSON.stringify(payload)}`,
      );
    } catch (error) {
      const { message, stack } = error;
      Logger.error(
        'Publish kafka failed: ' + JSON.stringify({ message, stack }),
      );
    }
  }
  async deposit(paload: CreateDepositDto) {
    await this.publish('deposit', paload);
  }
  async withdraw(paload: CreateWithDrawDto) {
    await this.publish('withdraw', paload);
  }

  async connect() {
    this.kafkaClient.connect();
    Logger.log('producer connected');
  }
  async onModuleInit() {
    try {
      this.connect();
    } catch (error) {
      Logger.error('Failed to connect to Kafka. retry in 5s');
      await sleep(5000);
      await this.connect();
    }
  }
}
