import { Injectable } from '@nestjs/common';
import { CreateReunioesDto } from './dto/create-reunioes.dto';
import { UpdateReunioesDto } from './dto/update-reunioes.dto';
import { ReuniaoRepositoryService } from './reuniao-repository/reuniao-repository.service';

@Injectable()
export class ReunioesService {
  constructor(private readonly meetingsRepository: ReuniaoRepositoryService) {}

  create(createReunioesDto: CreateReunioesDto) {
    return this.meetingsRepository.create(createReunioesDto);
  }

  findAll() {
    return this.meetingsRepository.getAll();
  }

  async findOne(id: number) {
    const currMeeting = this.meetingsRepository.getById(id);
    return (await currMeeting) ? currMeeting : undefined;
  }

  update(id: number, updateReunioesDto: UpdateReunioesDto) {
    return this.meetingsRepository.update(id, updateReunioesDto);
  }

  remove(id: number) {
    return this.meetingsRepository.delete(id);
  }
}
