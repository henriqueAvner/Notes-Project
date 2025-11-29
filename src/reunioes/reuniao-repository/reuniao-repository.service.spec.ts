import { Test, TestingModule } from '@nestjs/testing';
import { ReuniaoRepositoryService } from './reuniao-repository.service';

describe('ReuniaoRepositoryService', () => {
  let service: ReuniaoRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReuniaoRepositoryService],
    }).compile();

    service = module.get<ReuniaoRepositoryService>(ReuniaoRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
