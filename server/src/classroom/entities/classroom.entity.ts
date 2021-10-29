import { Injectable } from '@nestjs/common';
import {
  AfterInsert,
  AfterUpdate,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  DeleteDateColumn,
  CreateDateColumn,
  AfterRemove,
} from 'typeorm';

@Entity()
@Injectable()
export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('teacher', { unique: false })
  @Column()
  teacher_id: string;

  @DeleteDateColumn()
  deleted_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'jsonb' })
  lessons: string[];

  @Column({ nullable: true })
  description: string;

  // Hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted ${JSON.stringify(this, null, 2)}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated ${JSON.stringify(this, null, 2)}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`REMOVED ${JSON.stringify(this, null, 2)}`);
  }
}
