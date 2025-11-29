import { Test, TestingModule } from '@nestjs/testing';
import { ReunioesService } from './reunioes.service';

describe('ReunioesService', () => {
  let service: ReunioesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReunioesService],
    }).compile();

    service = module.get<ReunioesService>(ReunioesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
