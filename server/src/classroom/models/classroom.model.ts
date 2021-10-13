import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'recipe ' })
export class Classroom {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field((type) => [String])
  lessons: string[];
}
