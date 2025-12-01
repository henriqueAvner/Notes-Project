/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Anotacao } from '../interfaces/anotacao.interface';
import { UpdateAnotacoesDto } from '../dto/update-anotacoes.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AnotacaoRepositoryService {
  constructor(private readonly dataBaseService: DatabaseService) {}
  private anotacoes: Anotacao[] = [
    {
      id: 1,
      titulo: 'Reunião de Planejamento',
      conteudo:
        'Discutir as metas do próximo trimestre e alocação de recursos.',
      dataCriacao: new Date('2025-11-20T10:00:00Z'),
      dataAtualizacao: new Date('2025-11-20T10:00:00Z'),
    },
    {
      id: 2,
      titulo: 'Ideias para o Blog',
      conteudo: 'Post sobre TypeScript e interfaces; Tutorial de React Hooks.',
      dataCriacao: new Date('2025-11-25T14:30:00Z'),
      dataAtualizacao: new Date('2025-11-28T09:15:00Z'),
    },
    {
      id: 3,
      titulo: 'Lista de Compras',
      conteudo: 'Ovos, leite, pão integral, alface, frango.',
      dataCriacao: new Date('2025-11-29T08:00:00Z'),
      dataAtualizacao: new Date('2025-11-29T08:00:00Z'),
    },
    {
      id: 4,
      titulo: 'Configuração do Ambiente',
      conteudo:
        "Instalar Node.js v18, configurar variáveis de ambiente e clonar o repositório 'frontend-app'.",
      dataCriacao: new Date('2025-11-15T18:45:00Z'),
      dataAtualizacao: new Date('2025-11-16T11:20:00Z'),
    },
  ];

  private nextId = 5;

  async getAll(): Promise<Anotacao[]> {
    const queryText = 'select * from t_anotacoes';
    try {
      const result = await this.dataBaseService.pool.query(queryText);
      return result.rows as Anotacao[]; //enquanto o erro de tabela nao é resolvido, retorno o mock
    } catch (error) {
      console.error('Erro ao buscar todos os items: ', error);
      throw new Error('Falha ao buscar items no banco de dados.');
    }
  }

  async getById(id: number): Promise<Anotacao> {
    const queryText = `select * from t_anotacoes where id = ${id}`;
    try {
      const result = await this.dataBaseService.pool.query(queryText);
      return result.rows[0] as Anotacao;
    } catch (error) {
      console.error('Erro ao buscar o item: ', error);
      throw new Error('Falha ao buscar items no banco de dados.');
    }
  }

  async create(
    anotacaoData: Omit<Anotacao, 'id' | 'dataCriacao' | 'dataAtualizacao'>,
  ): Promise<Anotacao> {
    const queryCreate = `insert into t_anotacoes(titulo, conteudo) values('${anotacaoData.titulo}', '${anotacaoData.conteudo}')`;
    try {
      const result = await this.dataBaseService.pool.query(queryCreate);
      console.log(result.rows[0]);
      return result.rows[0] as Anotacao;
    } catch (error) {
      console.error('Erro ao adicionar o item: ', error);
      throw new Error('Falha ao adicionar item no banco de dados.' + error);
    }
  }

  async update(id: number, newNode: UpdateAnotacoesDto): Promise<boolean> {
    const queryUpdate = `update t_anotacoes set titulo = '${newNode.titulo}', conteudo = '${newNode.conteudo}' where id = ${id}`;
    try {
      const result = await this.dataBaseService.pool.query(queryUpdate);
      console.log(result.rows);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar o item: ', error);
      throw new Error('Falha ao atualizar o item no banco de dados.' + error);
    }
  }
  async delete(id: number) {
    const queryDelete = `delete from t_anotacoes where id = ${id}`;
    try {
      await this.dataBaseService.pool.query(queryDelete);
    } catch (error) {
      console.error('Erro ao adicionar o item: ', error);
      throw new Error('Falha ao adicionar item no banco de dados.' + error);
    }
  }
}
