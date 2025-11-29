/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Meeting } from '../interfaces/reuniao-interface';
import { UpdateReunioesDto } from '../dto/update-reunioes.dto';

@Injectable()
export class ReuniaoRepositoryService {
  private meetingAgenda: Meeting[] = [
    {
      id: 101,
      titulo: 'Apresentação do Módulo Alpha',
      descricao:
        'Revisão final das funcionalidades desenvolvidas no Sprint atual.',
      horario: '14:00 (Terça-feira, 3 de Dezembro)',
      confirmacao: true,
    },
    {
      id: 102,
      titulo: 'Brainstorming de Marketing',
      descricao:
        'Sessão para gerar ideias de conteúdo para o lançamento do produto.',
      horario: '10:30 (Quarta-feira, 4 de Dezembro)',
      confirmacao: false, // Ainda não confirmada
    },
    {
      id: 103,
      titulo: 'One-on-One com o Gestor',
      descricao: 'Discussão de progresso pessoal e feedback de desempenho.',
      horario: '16:00 (Quinta-feira, 5 de Dezembro)',
      confirmacao: true,
    },
  ];

  private nextId = 104;

  async getAll(): Promise<Meeting[]> {
    return this.meetingAgenda;
  }

  async getById(id: number): Promise<Meeting | undefined> {
    const currMeeting = this.meetingAgenda.findIndex((meet) => meet.id === id);
    if (currMeeting !== -1) {
      return this.meetingAgenda[currMeeting];
    }
    return;
  }

  async create(meetData: Omit<Meeting, 'id'>): Promise<Meeting> {
    const newMeeting: Meeting = {
      id: this.nextId++,
      ...meetData,
      confirmacao: false,
    };
    this.meetingAgenda.push(newMeeting);
    return newMeeting;
  }

  async update(id: number, newMeeting: UpdateReunioesDto): Promise<boolean> {
    const indexMeet = this.meetingAgenda.findIndex((meet) => meet.id === id);
    if (indexMeet !== -1) {
      this.meetingAgenda[indexMeet] = {
        ...this.meetingAgenda[indexMeet],
        ...newMeeting,
      };
      return true;
    }
    return false;
  }

  async delete(id: number) {
    const indexMeet = this.meetingAgenda.findIndex((meet) => meet.id === id);
    if (indexMeet == -1) {
      throw new Error('This meeting doesnt exist');
    }
    this.meetingAgenda.splice(indexMeet, 1);
  }
}
