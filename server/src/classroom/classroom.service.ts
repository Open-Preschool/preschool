import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classroom } from './entities/classroom.entity';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom) private repo: Repository<Classroom>,
  ) {}

  create(id: string) {
    const user = this.repo.create({
      creation_date: new Date(),
      teacher_id: id,
      lessons: ['a', 'b'],
    });
    return this.repo.save(user);
  }

  getAll() {
    return this.repo.find();
  }
}
