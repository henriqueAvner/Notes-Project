/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from '../interfaces/user.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

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

  async create(userData: Omit<User, 'id'>) {
    const findUser = `select email from t_usuarios where email ='${userData.email}'`;
    const existingUser = await this.dataBaseService.pool.query(findUser);
    if (existingUser.rows.length > 0) {
      return new BadRequestException('email in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(userData.senha, salt, 32)) as Buffer;
    const saltAndHash = `${salt}.${hash.toString('hex')}`;

    const user = {
      ...userData,
      senha: saltAndHash,
    };
    const queryCreate = `insert into t_usuarios(nome, email, senha, cargo, data_cadastro) 
                        values('${user.nome}', '${user.email}', '${user.senha}', '${user.cargo}', NOW())`;
    try {
      await this.dataBaseService.pool.query(queryCreate);
      console.log('Usuário cadastrado', user);
      const { senha: _, ...resultUser } = user;
      return resultUser;
    } catch (error) {
      console.error('Erro ao criar usuário: ', error);
      throw new Error('Falha ao adicionar usuário no banco de dados.' + error);
    }
  }

  async signIn(email: string, senha: string) {
    const query = `select * from t_usuarios where email = '${email}'`;
    const findUser = await this.dataBaseService.pool.query(query);
    const user = findUser.rows[0] as User;
    if (!user) {
      return new UnauthorizedException('Invalid credentials');
    }
    const [salt, storedHash] = user.senha.split('.');
    const hash = (await scrypt(senha, salt, 32)) as Buffer;
    if (storedHash != hash.toString('hex')) {
      return new UnauthorizedException('Invalid credentials');
    }
    console.log('Signed in', user);
    const { senha: _, ...result } = user;
    return result;
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
