import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnotacoesModule } from './anotacoes/anotacoes.module';
import { ReunioesModule } from './reunioes/reunioes.module';

@Module({
  imports: [AnotacoesModule, ReunioesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
