import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnotacoesService } from './anotacoes.service';
import { CreateAnotacoesDto } from './dto/create-anotacoes.dto';
import { UpdateAnotacoesDto } from './dto/update-anotacoes.dto';

@Controller('anotacoes')
export class AnotacoesController {
  constructor(private readonly anotacoesService: AnotacoesService) {}

  @Post()
  create(@Body() createAnotacoesDto: CreateAnotacoesDto) {
    return this.anotacoesService.create(createAnotacoesDto);
  }

  @Get()
  findAll() {
    return this.anotacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anotacoesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnotacoesDto: UpdateAnotacoesDto,
  ) {
    return this.anotacoesService.update(+id, updateAnotacoesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anotacoesService.remove(+id);
  }
}
