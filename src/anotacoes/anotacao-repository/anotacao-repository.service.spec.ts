import { Test, TestingModule } from '@nestjs/testing';
import { AnotacaoRepositoryService } from './anotacao-repository.service';

describe('AnotacaoRepositoryService', () => {
  let service: AnotacaoRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnotacaoRepositoryService],
    }).compile();

    service = module.get<AnotacaoRepositoryService>(AnotacaoRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
