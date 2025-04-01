import { Injectable, Logger } from '@nestjs/common';
import * as pdf from 'pdf-parse';
import { readFileSync } from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { fixStringToReais } from '../../utils/numberParser';

@Injectable()
export class PdfExtractService {
  private readonly logger = new Logger(PdfExtractService.name);

  constructor(private readonly prisma: PrismaService) {}

  async extractData(filePath: string): Promise<any> {
    try {
      const fileBuffer = readFileSync(filePath);
      const data = await pdf(fileBuffer);
      const text = data.text;

      const extractedData = this.parseExtractedText(text);

      await this.saveFatura(extractedData);

      return extractedData;
    } catch (error) {
      this.logger.error(`Erro ao extrair dados do PDF: ${error.message}`);
      throw new Error('Falha ao extrair dados do PDF.');
    }
  }

  private async saveFatura(data: any): Promise<void> {
    await this.prisma.fatura.create({
      data: {
        numeroCliente: data.numeroCliente,
        mesFatura: data.mesFatura,
        qtdEnergiaEletrica: data.qtdEnergiaEletrica,
        qtdEnergiaSCEE: data.qtdEnergiaSCEE,
        qtdEnergiaCompensada: data.qtdEnergiaCompensada,
        consumoEnergiaEletrica: data.consumoEnergiaEletrica,
        valorEnergiaEletrica: data.valorEnergiaEletrica,
        valorEnergiaSCEE: data.valorEnergiaSCEE,
        valorEnergiaCompensada: data.valorEnergiaCompensada,
        valorContribuicaoIlumPublicaMunicipal:
          data.valorContribuicaoIlumPublicaMunicipal,
        valorTotalSemGD: data.valorTotalSemGD,
        total: data.total,
      },
    });
  }

  private parseExtractedText(text: string): any {
    const lines = text.split('\n');
    const extractedData: any = {};

    lines.forEach((line, index) => {
      if (line.includes('Nº DO CLIENTE')) {
        extractedData.numeroCliente = lines[index + 1].trim().split(' ')[0];
      }
      if (line.includes('Referente a')) {
        extractedData.mesFatura = lines[index + 1].trim().split(' ')[0];
      }
      if (line.includes('Energia ElétricakWh')) {
        const lineContent = line.split(' ').filter((item) => item !== '');
        extractedData.qtdEnergiaEletrica = parseInt(lineContent[2]);
        extractedData.valorEnergiaEletrica = fixStringToReais(lineContent[4]);
      }
      if (line.includes('Energia SCEE s/ ICMSkWh')) {
        const lineContent = line.split(' ').filter((item) => item !== '');
        extractedData.qtdEnergiaSCEE = parseInt(lineContent[4]);
        extractedData.valorEnergiaSCEE = fixStringToReais(lineContent[6]);
      }
      if (line.includes('Energia compensada GD IkWh')) {
        const lineContent = line.split(' ').filter((item) => item !== '');
        extractedData.qtdEnergiaCompensada = parseInt(lineContent[4]);
        extractedData.valorEnergiaCompensada = fixStringToReais(lineContent[6]);
      }

      if (line.includes('Contrib Ilum Publica Municipal')) {
        const lineContent = line.split(' ').filter((item) => item !== '');
        extractedData.valorContribuicaoIlumPublicaMunicipal = fixStringToReais(
          lineContent[4],
        );
      }
      if (line.includes('TOTAL')) {
        extractedData.total = fixStringToReais(
          line.split(' ').filter((item) => item !== '')[1],
        );
      }
    });

    extractedData.consumoEnergiaEletrica =
      extractedData.qtdEnergiaEletrica + extractedData.qtdEnergiaSCEE;

    extractedData.valorTotalSemGD =
      (
        extractedData.valorEnergiaEletrica +
        extractedData.valorEnergiaSCEE +
        extractedData.valorContribuicaoIlumPublicaMunicipal
      ).toFixed(2) * 1;

    return extractedData;
  }
}
