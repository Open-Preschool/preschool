import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewSubjectInput } from './dto/new-subject.input';
import { Classroom } from './entities/classroom.entity';
import { Subject } from './entities/subject.entity';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom) private repo: Repository<Classroom>,
    @InjectRepository(Subject) private subRepo: Repository<Subject>,
  ) {}

  async create(
    teacher_id: string,
    subjects: NewSubjectInput[],
    name: string,
  ): Promise<Classroom> {
    const subs = subjects?.map((e) =>
      this.subRepo.create({
        name: e.name,
        // lessons: ['writing numbers 1-10'],
        lessons: { writing: 'numbers 1-10' },
      }),
    );
    await Promise.all(subs?.map(async (s) => await this.subRepo.save(s)));
    console.log('subs', JSON.stringify(subs, null, 2));
    const user = this.repo.create({
      teacher_id,
      subjects: subs,
      name,
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

  getAll({ skip, take, teacherId }: GetAllArgs): Promise<Classroom[]> {
    return this.repo.find({
      where: {
        teacher_id: teacherId,
      },
      skip,
      take,
    });
  }
}

interface GetAllArgs {
  skip: number;
  take: number;
  teacherId: string;
}
