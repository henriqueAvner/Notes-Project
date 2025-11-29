import { Test, TestingModule } from '@nestjs/testing';
import { AnotacoesService } from './anotacoes.service';

describe('AnotacoesService', () => {
  let service: AnotacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnotacoesService],
    }).compile();

    service = module.get<AnotacoesService>(AnotacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
