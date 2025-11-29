import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnotacoesDto } from './dto/create-anotacoes.dto';
import { UpdateAnotacoesDto } from './dto/update-anotacoes.dto';
import { AnotacaoRepositoryService } from './anotacao-repository/anotacao-repository.service';

@Injectable()
export class AnotacoesService {
  constructor(private readonly notesRepository: AnotacaoRepositoryService) {}
  create(createAnotacoesDto: CreateAnotacoesDto) {
    return this.notesRepository.create(createAnotacoesDto);
  }

  findAll() {
    return this.notesRepository.getAll();
  }

  findOne(id: number) {
    const currNote = this.notesRepository.getById(id);
    if (currNote == null) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
    }
    return currNote;
  }

  update(id: number, updateAnotacoesDto: UpdateAnotacoesDto) {
    return this.notesRepository.update(id, updateAnotacoesDto);
  }

  remove(id: number) {
    return this.notesRepository.delete(id);
  }
}
