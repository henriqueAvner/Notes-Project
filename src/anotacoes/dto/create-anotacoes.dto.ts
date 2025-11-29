import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAnotacoesDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo titulo é obrigatório.' })
  @MaxLength(30, { message: 'O título não pode ter mais de 30 caracteres' })
  titulo: string;
  @IsString()
  @IsNotEmpty({ message: 'O campo conteúdo é obrigatório.' })
  @MaxLength(150, { message: 'O conteúdo não pode ter mais de 150 caracteres' })
  conteudo: string;
  @IsDate()
  @IsNotEmpty()
  dataCriacao: Date;
  @IsDate()
  @IsNotEmpty()
  dataAtualizacao: Date;
}
