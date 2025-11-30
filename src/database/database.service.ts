import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  public pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: '159263',
      port: 5432,
    });

    this.pool.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco', err.stack);
      } else {
        console.log('Conexão estabelecida com sucesso');
      }
    });
  }
  async onModuleDestroy() {
    await this.pool.end();
  }
}
