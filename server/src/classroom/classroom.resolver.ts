import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewClassroomInput } from './dto/new-classroom.input';
import { ClassroomsArgs } from './dto/classrooms.args';
import { Classroom } from './models/classroom.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/supabase.guard';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';
import { CurrentUser } from '../auth/current-user.decorator';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver((of) => Classroom)
export class ClassroomsResolver {
  @Query((returns) => Classroom)
  async classroom(
    @CurrentUser() user: SupabaseAuthUser,
    @Args('id') id: string,
  ): Promise<Classroom> {
    console.log('user', user);
    return Promise.resolve({
      id,
      lessons: ['a', 'b'],
      title: 'Class',
      creationDate: new Date(),
    });
  }

  @Query((returns) => [Classroom])
  classrooms(@Args() classroomsArgs: ClassroomsArgs): Promise<Classroom[]> {
    return Promise.resolve([
      {
        id: '123',
        lessons: ['a', 'b'],
        title: 'Class',
        creationDate: new Date(),
      },
    ]);
  }

  @Mutation((returns) => Classroom)
  async addClassroom(
    @Args('newClassroomData') newClassroomData: NewClassroomInput,
  ): Promise<Classroom> {
    return Promise.resolve({
      id: 'abc123',
      lessons: ['a', 'b'],
      title: 'Class',
      creationDate: new Date(),
    });
  }

  @Mutation((returns) => Boolean)
  async removeClassroom(@Args('id') id: string) {
    return true;
  }

  @Subscription((returns) => Classroom)
  classroomAdded() {
    return pubSub.asyncIterator('classroomAdded');
  }
}
