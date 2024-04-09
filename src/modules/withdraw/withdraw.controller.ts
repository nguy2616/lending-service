import { Body, Controller, Post } from '@nestjs/common';
import { ProducerService } from '../kafka/producer.service';
import { CreateWithDrawDto } from './dto/create-WithDraw.dto';

@Controller('withdraws')
export class WithDrawController {
  constructor(private readonly producer: ProducerService) {}

  @Post()
  createWithDraw(@Body() dto: CreateWithDrawDto) {
    return this.producer.withdraw(dto);
  }
}
