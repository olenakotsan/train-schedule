import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trains')
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainNumber: string;

  @Column()
  departure: string;

  @Column()
  arrival: string;

  @Column('time')
  departureTime: string;

  @Column('time')
  arrivalTime: string;

  @Column('decimal', { precision: 6, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
