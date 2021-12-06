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
import { UpdateClassroomInput } from './dto/update-classroom.input';

const pubSub = new PubSub();

@Resolver(() => Classroom)
export class ClassroomsResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Classroom)
  async classroom(@Args('id') id: string): Promise<Classroom> {
    return this.classroomService.getOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Classroom])
  async classrooms(
    @Args() classroomsArgs: ClassroomsArgs,
    @CurrentUser() user: SupabaseAuthUser,
  ): Promise<Classroom[]> {
    const { skip, take } = classroomsArgs;
    return this.classroomService.getAll({ skip, take, teacherId: user.id });
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Classroom)
  async addClassroom(
    @CurrentUser() user: SupabaseAuthUser,
    @Args('newClassroomData') newClassroomData: NewClassroomInput,
  ): Promise<Classroom> {
    const newClassroom = await this.classroomService.create(
      user.id,
      newClassroomData.subjects,
      newClassroomData.name,
    );
    pubSub.publish('classroomAdded', { classrooms: newClassroom });
    return newClassroom;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeClassroom(@Args('id') id: string): Promise<boolean> {
    pubSub.publish('classroomDelete', { classroomDelete: id });
    return this.classroomService.delete(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Classroom)
  async updateClassroom(
    @Args('updateClassroomData') updateClassroomData: UpdateClassroomInput,
  ) {
    const updatedClassroom = await this.classroomService.update(
      updateClassroomData,
    );
    pubSub.publish('classroomUpdated', { classroomUpdated: updatedClassroom });
    return updatedClassroom;
  }

  @Subscription(() => String)
  classroomDelete() {
    return pubSub.asyncIterator('classroomDelete');
  }

  // TODO: address name for client query->subscription types
  @Subscription(() => Classroom, { name: 'classrooms' })
  classroomAdded() {
    return pubSub.asyncIterator('classroomAdded');
  }

  @Subscription(() => Classroom, {
    filter: (payload, variables) => payload.classroomUpdated.id == variables.id,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  classroomUpdated(@Args('id') _id: string) {
    return pubSub.asyncIterator('classroomUpdated');
  }
}
