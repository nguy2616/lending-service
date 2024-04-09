import { Injectable } from '@nestjs/common';
import { ProducerService } from './modules/kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producer: ProducerService) {}
  getHello() {}
}
