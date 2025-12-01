export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cargo: string;
  ativo: boolean;
  dataCadastro: Date;
}
