import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomsResolver } from './classroom.resolver';
import { ClassroomService } from './classroom.service';
import { Classroom } from './entities/classroom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom])],
  providers: [ClassroomsResolver, ClassroomService],
})
export class ClassroomModule {}
