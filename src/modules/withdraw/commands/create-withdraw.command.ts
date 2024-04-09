import { CreateWithDrawDto } from '../dto/create-WithDraw.dto';

export class CreateWithdrawCommand {
  constructor(public readonly withdrawDto: CreateWithDrawDto) {}
}
