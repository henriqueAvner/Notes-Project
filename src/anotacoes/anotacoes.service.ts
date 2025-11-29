import { Injectable } from '@nestjs/common';
import { CreateAnotacoesDto } from './dto/create-anotacoes.dto';
import { UpdateAnotacoesDto } from './dto/update-anotacoes.dto';

@Injectable()
export class AnotacoesService {
  create(createAnotacoesDto: CreateAnotacoesDto) {
    return 'This action adds a new anotacoe';
  }

  findAll() {
    return `This action returns all anotacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anotacoe`;
  }

  update(id: number, updateAnotacoesDto: UpdateAnotacoesDto) {
    return `This action updates a #${id} anotacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} anotacoe`;
  }
}
