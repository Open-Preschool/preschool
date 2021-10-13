import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewClassroomInput } from './dto/new-classroom.input';
import { ClassroomsArgs } from './dto/classrooms.args';
import { Classroom } from './models/classroom.model';

const pubSub = new PubSub();

@Resolver((of) => Classroom)
export class ClassroomsResolver {
  @Query((returns) => Classroom)
  async classroom(@Args('id') id: string): Promise<Classroom> {
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
