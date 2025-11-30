import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnotacoesDto } from './dto/create-anotacoes.dto';
import { UpdateAnotacoesDto } from './dto/update-anotacoes.dto';
import { AnotacaoRepositoryService } from './anotacao-repository/anotacao-repository.service';
import formatDate from 'src/utils/formatDate';

@Injectable()
export class AnotacoesService {
  constructor(private readonly notesRepository: AnotacaoRepositoryService) {}
  create(createAnotacoesDto: CreateAnotacoesDto) {
    // cria e formata as datas antes de retornar
    return this.notesRepository.create(createAnotacoesDto).then((note) => ({
      ...note,
      dataCriacao: formatDate(note.dataCriacao, true),
      dataAtualizacao: formatDate(note.dataAtualizacao, true),
    }));
  }

  findAll() {
    // formata datas do array de notas
    return this.notesRepository.getAll().then((notes) =>
      notes.map((n) => ({
        ...n,
        dataCriacao: formatDate(n.dataCriacao, true),
        dataAtualizacao: formatDate(n.dataAtualizacao, true),
      })),
    );
  }

  findOne(id: number) {
    return this.notesRepository.getById(id).then((currNote) => {
      if (currNote == null) {
        throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
      }
      return {
        ...currNote,
        dataCriacao: formatDate(currNote.dataCriacao, true),
        dataAtualizacao: formatDate(currNote.dataAtualizacao, true),
      };
    });
  }

  update(id: number, updateAnotacoesDto: UpdateAnotacoesDto) {
    return this.notesRepository.update(id, updateAnotacoesDto);
  }

  remove(id: number) {
    return this.notesRepository.delete(id);
  }
}
