import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean = true;
}
