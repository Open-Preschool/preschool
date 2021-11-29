import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class NewClassroomInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field(() => [String])
  lessons: string[];

  @Field(() => String)
  name: string;
}
