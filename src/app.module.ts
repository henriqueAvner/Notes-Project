import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnotacoesModule } from './anotacoes/anotacoes.module';
import { ReunioesModule } from './reunioes/reunioes.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AnotacoesModule, ReunioesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
