import { PartialType } from '@nestjs/mapped-types';
import { CreateAnotacoesDto } from './create-anotacoes.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateAnotacoesDto extends PartialType(CreateAnotacoesDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: 'O título não pode ter mais de 30 caracteres' })
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150, { message: 'O conteúdo não pode ter mais de 150 caracteres' })
  conteudo: string;

  // dataCriacao and dataAtualizacao are server-generated; do not validate here.
}

// export interface Anotacao {
//   id: number;
//   titulo: string;
//   conteudo: string;
//   dataCriacao: Date;
//   dataAtualizacao: Date;
// }
