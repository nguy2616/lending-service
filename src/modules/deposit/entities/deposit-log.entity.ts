import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('deposit_logs')
export class DepositLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'log' })
  log: string;
}
