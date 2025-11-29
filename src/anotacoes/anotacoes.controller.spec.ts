import { Test, TestingModule } from '@nestjs/testing';
import { AnotacoesController } from './anotacoes.controller';
import { AnotacoesService } from './anotacoes.service';

describe('AnotacoesController', () => {
  let controller: AnotacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnotacoesController],
      providers: [AnotacoesService],
    }).compile();

    controller = module.get<AnotacoesController>(AnotacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
