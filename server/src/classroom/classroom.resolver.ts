import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewClassroomInput } from './dto/new-classroom.input';
import { ClassroomsArgs } from './dto/classrooms.args';
import { Classroom } from './entities/classroom.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/supabase.guard';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';
import { CurrentUser } from '../auth/current-user.decorator';
import { ClassroomService } from './classroom.service';

const pubSub = new PubSub();

// @UseGuards(GqlAuthGuard)
@Resolver(() => Classroom)
export class ClassroomsResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @Query(() => Classroom)
  async classroom(
    @CurrentUser() user: SupabaseAuthUser,
    @Args('id') id: string,
  ): Promise<Classroom> {
    return this.classroomService.getOne(id);
  }

  @Query(() => [Classroom])
  async classrooms(
    @Args() classroomsArgs: ClassroomsArgs,
  ): Promise<Classroom[]> {
    const { skip, take } = classroomsArgs;
    return this.classroomService.getAll(skip, take);
  }

  @Mutation(() => Classroom)
  async addClassroom(
    @Args('newClassroomData') newClassroomData: NewClassroomInput,
  ): Promise<Classroom> {
    console.log(newClassroomData);
    const newClassroom = await this.classroomService.create(
      new Date().getTime().toString(),
      newClassroomData.lessons,
    );
    pubSub.publish('classroomAdded', { classroomAdded: newClassroom });
    return newClassroom;
  }

  @Mutation(() => Boolean)
  removeClassroom(@Args('id') id: string): Promise<boolean> {
    return this.classroomService.delete(id);
  }

  @Subscription(() => Classroom)
  classroomAdded() {
    return pubSub.asyncIterator('classroomAdded');
  }
}
