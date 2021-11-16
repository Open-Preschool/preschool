import { Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
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

@ObjectType({ description: 'classroom ' })
@Entity()
@Injectable()
export class Classroom {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ name: 'teacherId' })
  @Index('teacher', { unique: false })
  @Column()
  teacher_id: string;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Field({ name: 'createdAt' })
  @CreateDateColumn()
  created_at: Date;

  @Field(() => [String])
  @Column({ type: 'jsonb' })
  lessons: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  // Hooks
  @AfterInsert()
  logInsert() {
    // console.log(`Inserted ${JSON.stringify(this, null, 2)}`);
  }

  @AfterUpdate()
  logUpdate() {
    // console.log(`Updated ${JSON.stringify(this, null, 2)}`);
  }

  @AfterRemove()
  logRemove() {
    // console.log(`REMOVED ${JSON.stringify(this, null, 2)}`);
  }
}
