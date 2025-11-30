/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Meeting } from '../interfaces/reuniao-interface';
import { UpdateReunioesDto } from '../dto/update-reunioes.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReuniaoRepositoryService {
  constructor(private readonly databaseService: DatabaseService) {}
  private nextId = 104;

  async getAll(): Promise<Meeting[] | undefined> {
    const queryAllMeetings = `select * from t_reunioes`;
    try {
      const result = await this.databaseService.pool.query(queryAllMeetings);
      return result.rows as Meeting[];
    } catch (error) {
      console.error('Erro ao trazer todas as reunioes', error);
      throw new Error('Falha ao buscar reunioes no banco de dados.');
    }
  }

  async getById(id: number): Promise<Meeting | undefined> {
    const queryMeetById = `select * from t_reunioes where id = ${id}`;
    try {
      const result = await this.databaseService.pool.query(queryMeetById);
      return result.rows[0] as Meeting;
    } catch (error) {
      console.error('Erro ao trazer a reuniao', error);
      throw new Error('Falha ao buscar reuniao no banco de dados.');
    }
  }

  async create(meetData: Omit<Meeting, 'id'>): Promise<Meeting> {
    const createMeeting = `insert into t_reunioes(titulo, descricao, horario) values('${meetData.titulo}', '${meetData.descricao}', '${meetData.horario}')`;
    try {
      const result = await this.databaseService.pool.query(createMeeting);
      return result.rows[0] as Meeting;
    } catch (error) {
      console.error('Erro ao criar a reuniao', error);
      throw new Error('Falha ao criar reuniao no banco de dados.');
    }
  }

  async update(id: number, newMeeting: UpdateReunioesDto): Promise<boolean> {
    const updateMeeting = `update t_reunioes set titulo = '${newMeeting.titulo}',descricao = '${newMeeting.descricao}',confirmacao = '${newMeeting.confirmacao}', horario = '${newMeeting.horario}' where id = ${id}`;
    try {
      await this.databaseService.pool.query(updateMeeting);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar a reuniao', error);
      throw new Error('Falha ao atualizar reuniao no banco de dados.');
    }
  }

  async delete(id: number): Promise<boolean> {
    const deleteMeeting = `delete from t_reunioes where id = ${id}`;
    try {
      await this.databaseService.pool.query(deleteMeeting);
      return true;
    } catch (error) {
      console.error('Erro ao deletar a reuniao', error);
      throw new Error('Falha ao deletar reuniao no banco de dados.');
    }
  }
}
