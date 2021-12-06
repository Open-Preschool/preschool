import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';
import { NewSubjectInput } from './new-subject.input';

@InputType()
export class NewClassroomInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field(() => [NewSubjectInput], { nullable: 'itemsAndList' })
  subjects?: NewSubjectInput[];

  @Field(() => String)
  name: string;
}
