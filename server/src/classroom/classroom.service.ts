import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classroom } from './entities/classroom.entity';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom) private repo: Repository<Classroom>,
  ) {}

  create(teacher_id: string, lessons: string[]): Promise<Classroom> {
    const user = this.repo.create({
      teacher_id,
      lessons,
    });
    return this.repo.save(user);
  }

  async update(attrs: Partial<Classroom>) {
    const room = await this.getOne(attrs.id);
    Object.assign(room, attrs);
    return this.repo.save(room);
    // return this.repo.update(id, rest);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const classroom = await this.getOne(id);
      await this.repo.softRemove(classroom);
      return true;
    } catch (error) {
      return false;
    }
  }

  getOne(id: string): Promise<Classroom> {
    return this.repo.findOneOrFail(id);
  }

  getAll(skip: number, take: number): Promise<Classroom[]> {
    return this.repo.find({
      skip,
      take,
    });
  }
}
