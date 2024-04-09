import { Body, Controller, Post } from '@nestjs/common';
import { ProducerService } from '../kafka/producer.service';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Controller('deposits')
export class DepositController {
  constructor(private readonly producer: ProducerService) {}

  @Post()
  createDeposit(@Body() dto: CreateDepositDto) {
    return this.producer.deposit(dto);
  }
}
