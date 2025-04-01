import { Fatura } from './fatura.model';

export class Cliente {
  id: number;
  numeroCliente: string;
  nome: string;
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  faturas?: Fatura[];
}
