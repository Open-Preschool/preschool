import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'classroom ' })
export class Classroom {
  @Field(() => ID)
  id: string;

  @Field({ name: 'teacherId' })
  teacherId: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(() => [String])
  lessons: string[];
}
