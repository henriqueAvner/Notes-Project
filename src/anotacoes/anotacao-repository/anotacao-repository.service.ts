/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Anotacao } from '../interfaces/anotacao.interface';
import { UpdateAnotacoesDto } from '../dto/update-anotacoes.dto';

@Injectable()
export class AnotacaoRepositoryService {
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

  async get(): Promise<Anotacao[]> {
    return this.anotacoes;
  }

  async getById(id: number): Promise<Anotacao> {
    const findNote = this.anotacoes.find((note) => note.id === id);
    if (!findNote) {
      throw new Error(`Anotacao with id ${id} not found`);
    }
    return findNote;
  }

  async create(anotacaoData: Omit<Anotacao, 'id'>): Promise<Anotacao> {
    const newAnotacao: Anotacao = {
      id: this.nextId++,
      ...anotacaoData,
    };
    this.anotacoes.push(newAnotacao);
    console.log(`A anotação ${anotacaoData.titulo} foi adicionada`);
    return newAnotacao;
  }

  async update(id: number, newNode: UpdateAnotacoesDto): Promise<boolean> {
    const indexNote = this.anotacoes.findIndex((note) => note.id === id);
    if (indexNote !== -1) {
      this.anotacoes[indexNote] = { ...this.anotacoes[indexNote], ...newNode };
      return true;
    }
    return false;
  }
  async delete(id: number) {
    const indexNote = this.anotacoes.findIndex((note) => note.id === id);
    if (indexNote !== -1) {
      this.anotacoes.splice(indexNote, 1);
    }
  }
}
