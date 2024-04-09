import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('withdraw_logs')
export class WithdrawLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'log' })
  log: string;
}
