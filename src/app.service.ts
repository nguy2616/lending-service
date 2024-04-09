import { Injectable } from '@nestjs/common';
import { ProducerService } from './modules/kafka/producer.service';
import { CreateWithDrawDto } from './modules/withdraw/dto/create-WithDraw.dto';

@Injectable()
export class AppService {
  constructor(private readonly producer: ProducerService) {}
  getHello() {
    const dto: CreateWithDrawDto = {
      hash: '123',
      fromAddress: '123',
      toAddress: '123',
      ownerAddress: '123',
      amount: 123,
    };
    this.producer.withdraw(dto);
  }
}
