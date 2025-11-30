import { Module } from '@nestjs/common';
import { AnotacoesService } from './anotacoes.service';
import { AnotacoesController } from './anotacoes.controller';
import { AnotacaoRepositoryService } from './anotacao-repository/anotacao-repository.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnotacoesController],
  providers: [AnotacoesService, AnotacaoRepositoryService],
})
export class AnotacoesModule {}
