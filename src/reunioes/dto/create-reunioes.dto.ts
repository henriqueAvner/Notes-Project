import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReunioesDto {
  @IsString()
  @IsNotEmpty({ message: 'O título não pode estar vazio' })
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode estar vazia' })
  descricao: string;

  @IsString()
  @IsNotEmpty({ message: 'O horário não pode estar vazio' })
  horario: string;

  @IsBoolean()
  @IsOptional()
  confirmacao: boolean;
}
