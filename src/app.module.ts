import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnotacoesModule } from './anotacoes/anotacoes.module';

@Module({
  imports: [AnotacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
