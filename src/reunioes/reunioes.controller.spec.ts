import { Test, TestingModule } from '@nestjs/testing';
import { ReunioesController } from './reunioes.controller';
import { ReunioesService } from './reunioes.service';

describe('ReunioesController', () => {
  let controller: ReunioesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReunioesController],
      providers: [ReunioesService],
    }).compile();

    controller = module.get<ReunioesController>(ReunioesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
