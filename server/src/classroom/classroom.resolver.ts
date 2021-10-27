import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewClassroomInput } from './dto/new-classroom.input';
import { ClassroomsArgs } from './dto/classrooms.args';
import { Classroom } from './models/classroom.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/supabase.guard';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';
import { CurrentUser } from '../auth/current-user.decorator';
import { ClassroomService } from './classroom.service';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(() => Classroom)
export class ClassroomsResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @Query(() => Classroom)
  async classroom(
    @CurrentUser() user: SupabaseAuthUser,
    @Args('id') id: string,
  ): Promise<Classroom> {
    console.log('user', user);
    return Promise.resolve({
      id,
      creationDate: new Date(),
      lessons: ['a', 'b'],
      title: 'Class',
      randomId: 'abc',
      teacherId: 'abc123',
    });
  }

  @Query(() => [Classroom])
  async classrooms(
    @Args() classroomsArgs: ClassroomsArgs,
  ): Promise<Classroom[]> {
    console.log(classroomsArgs);
    const all = await this.classroomService.getAll();
    return all.map((c) => ({
      creationDate: c.creation_date,
      id: c.id,
      lessons: c.lessons,
      teacherId: c.teacher_id,
      description: c.description,
    }));
  }

  @Mutation(() => Classroom)
  async addClassroom(
    @Args('newClassroomData') newClassroomData: NewClassroomInput,
  ): Promise<Classroom> {
    console.log(newClassroomData);
    const {
      creation_date: creationDate,
      id,
      lessons,
    } = await this.classroomService.create(new Date().getTime().toString());
    return Promise.resolve({
      id,
      creationDate,
      lessons,
      title: 'Class',
      randomId: 'abc',
      teacherId: 'abc123',
    });
  }

  @Mutation(() => Boolean)
  async removeClassroom(@Args('id') id: string) {
    return !!id;
  }

  @Subscription(() => Classroom)
  classroomAdded() {
    return pubSub.asyncIterator('classroomAdded');
  }
}
