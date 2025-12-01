import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryService } from './user-repository/user-repository.service';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepositoryService) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      dataCadastro: new Date(),
      ativo: true,
    });
  }

  signIn(email: string, senha: string) {
    return this.usersRepository.signIn(email, senha);
  }

  findAll() {
    return this.usersRepository.getAll();
  }

  findOne(id: number) {
    return this.usersRepository.getById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
