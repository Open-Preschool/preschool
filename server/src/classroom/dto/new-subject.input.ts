import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewSubjectInput {
  @Field(() => String)
  name: string;
}
