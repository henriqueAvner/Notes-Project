import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // Exporta o serviço para que outros módulos possam usá-lo
})
export class DatabaseModule {}
