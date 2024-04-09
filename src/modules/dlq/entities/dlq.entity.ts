import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dead_letter_queue')
export class DeadLetterQueueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'event_id', nullable: false, unique: true })
  eventId: string;

  @Column({ nullable: false })
  topic: string;

  @Column({ nullable: false })
  message: string;

  @Column()
  error: string;
}
