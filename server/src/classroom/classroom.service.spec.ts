import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomService } from './classroom.service';

describe('ClassroomService', () => {
  let service: ClassroomService;

  const classroomServiceMock: Partial<ClassroomService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ClassroomService, useValue: classroomServiceMock },
      ],
    }).compile();

    service = module.get<ClassroomService>(ClassroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
