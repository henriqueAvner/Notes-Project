import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from '../interfaces/user.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async getAll(): Promise<User[]> {
    const query = 'select * from t_usuarios;';
    const result = await this.dataBaseService.pool.query(query);
    return result.rows as User[];
  }

  async getById(id: number): Promise<User | null> {
    const query = `select * from t_usuarios where id = ${id};`;
    const result = await this.dataBaseService.pool.query(query);
    return result.rows[0] as User | null;
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const queryCreate = `insert into t_usuarios(nome, email, senha, cargo, data_cadastro) 
                        values('${userData.nome}', '${userData.email}', '${userData.senha}', '${userData.cargo}', NOW())`;
    try {
      const result = await this.dataBaseService.pool.query(queryCreate);
      return result.rows[0] as User;
    } catch (error) {
      console.error('Erro ao criar usuário: ', error);
      throw new Error('Falha ao adicionar usuário no banco de dados.' + error);
    }
  }

  async update(id: number, newUser: UpdateUserDto): Promise<boolean> {
    const updateQuery = `update t_usuarios set nome = ${newUser.nome}, 
    email = ${newUser.email}, 
    senha = ${newUser.senha}, 
    cargo = ${newUser.cargo}, 
    ativo = ${newUser.ativo}, 
    data_cadastro = NOW() where id = ${id}`;
    try {
      await this.dataBaseService.pool.query(updateQuery);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar o item: ', error);
      throw new Error('Falha ao atualizar o item no banco de dados.' + error);
    }
  }

  async delete(id: number): Promise<boolean> {
    const deleteQuery = `delete from t_usuarios where id = ${id}`;
    try {
      await this.dataBaseService.pool.query(deleteQuery);
      return true;
    } catch (error) {
      console.error('Erro ao deletar o item: ', error);
      throw new Error('Falha ao deletar o item no banco de dados.' + error);
    }
  }
}
