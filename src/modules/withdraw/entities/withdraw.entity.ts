import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: false })
  amount: number;

  @Column({ name: 'unix_timestamp', type: 'bigint', nullable: false })
  unixTimestamp: number;
}
