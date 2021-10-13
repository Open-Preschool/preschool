import { Module } from '@nestjs/common';
import { ClassroomsResolver } from './classroom.resolver';

@Module({
  providers: [ClassroomsResolver],
})
export class ClassroomModule {}
