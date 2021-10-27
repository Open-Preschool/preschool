import { Injectable } from '@nestjs/common';
import {
  AfterInsert,
  AfterUpdate,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';

@Entity()
@Injectable()
export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('teacher', { unique: false })
  @Column()
  teacher_id: string;

  @Column({ nullable: true })
  deleted_at?: Date;

  @Column({ generated: 'uuid' })
  random_id: string;

  @Column()
  creation_date: Date;

  @Column({ type: 'jsonb' })
  lessons: string[];

  @Column({ nullable: true })
  description?: string;

  // Hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated ${JSON.stringify(this, null, 2)}`);
  }
}
