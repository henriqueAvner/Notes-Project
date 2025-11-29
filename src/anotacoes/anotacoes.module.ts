import { Module } from '@nestjs/common';
import { AnotacoesService } from './anotacoes.service';
import { AnotacoesController } from './anotacoes.controller';
import { AnotacaoRepositoryService } from './anotacao-repository/anotacao-repository.service';

@Module({
  controllers: [AnotacoesController],
  providers: [AnotacoesService, AnotacaoRepositoryService],
})
export class AnotacoesModule {}
