import { Module } from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { ReunioesController } from './reunioes.controller';
import { ReuniaoRepositoryService } from './reuniao-repository/reuniao-repository.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReunioesController],
  providers: [ReunioesService, ReuniaoRepositoryService],
})
export class ReunioesModule {}
