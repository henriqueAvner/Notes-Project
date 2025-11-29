import { Module } from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { ReunioesController } from './reunioes.controller';
import { ReuniaoRepositoryService } from './reuniao-repository/reuniao-repository.service';

@Module({
  controllers: [ReunioesController],
  providers: [ReunioesService, ReuniaoRepositoryService],
})
export class ReunioesModule {}
