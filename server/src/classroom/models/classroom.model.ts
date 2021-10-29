import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'classroom ' })
export class Classroom {
  @Field(() => ID)
  id: string;

  @Field({ name: 'teacherId' })
  teacher_id: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ name: 'createdAt' })
  created_at: Date;

  @Field(() => [String])
  lessons: string[];
}
