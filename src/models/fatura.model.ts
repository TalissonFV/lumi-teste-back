import { Cliente } from './cliente.model';

export class Fatura {
  id: number;
  numeroCliente: string;
  cliente?: Cliente;
  mesFatura: string;
  qtdEnergiaEletrica: number;
  qtdEnergiaSCEE: number;
  qtdEnergiaCompensada: number;
  consumoEnergiaEletrica: number;
  valorEnergiaEletrica: number;
  valorEnergiaSCEE: number;
  valorEnergiaCompensada: number;
  valorContribuicaoIlumPublicaMunicipal: number;
  valorTotalSemGD: number;
  total: number;
}
