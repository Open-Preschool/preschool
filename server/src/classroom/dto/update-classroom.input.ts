import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, IsUUID } from 'class-validator';

@InputType()
export class UpdateClassroomInput {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  lessons?: string[];
}
