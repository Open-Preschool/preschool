import { Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Classroom } from './classroom.entity';

@ObjectType({ description: 'classroom ' })
@Entity()
@Injectable()
export class Subject {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  name: string;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Field({ name: 'createdAt' })
  @CreateDateColumn()
  created_at: Date;

  @Field(() => JSON, { nullable: true })
  @Column({ type: 'jsonb' })
  lessons?: Record<string, unknown>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Classroom)
  @ManyToOne(() => Classroom, (classroom) => classroom.subjects)
  classroom: Classroom;
}
