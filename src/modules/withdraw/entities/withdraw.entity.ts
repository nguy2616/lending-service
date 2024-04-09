import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('withdraws')
export class WithdrawEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  hash: string;

  @Column({ name: 'from_address', nullable: false })
  fromAddress: string;

  @Column({ name: 'to_address', nullable: false })
  toAddress: string;

  @Column({ name: 'owner', nullable: false })
  ownerAddress: string;

  @Column({ nullable: false, type: 'double precision' })
  amount: number;

  @Column({ name: 'unix_timestamp', type: 'bigint', nullable: false })
  unixTimestamp: number;

  @Column({
    nullable: false,
    default: 'chain-processing.fct.lending.withdraw.v1',
  })
  type: string;

  @Column({ nullable: false, default: '1.0' })
  version: string;

  @Column({
    name: 'timestamp',
    nullable: false,
    type: 'timestamp with time zone',
  })
  @CreateDateColumn()
  timestamp: Date;
}
