import { Injectable, Logger } from '@nestjs/common';
import * as pdf from 'pdf-parse';
import * as fs from 'fs';
import {
  fixStringToReais,
  removeNonNumericCharacters,
} from '../utils/numberParser';

@Injectable()
export class PdfExtractService {
  private readonly logger = new Logger(PdfExtractService.name);

  async extractData(filePath: string): Promise<any> {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const data = await pdf(fileBuffer);
      const text = data.text;
      this.logger.debug(`PDF extraído: ${data.text}`);

      const extractedData = this.parseExtractedText(text);

      return extractedData;
    } catch (error) {
      this.logger.error(`Erro ao extrair dados do PDF: ${error.message}`);
      throw new Error('Falha ao extrair dados do PDF.');
    }
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
        extractedData.qtdEnergiaEletrica = lineContent[2];
        extractedData.valorEnergiaEletrica = fixStringToReais(lineContent[4]);
      }
      if (line.includes('Energia SCEE s/ ICMSkWh')) {
        const lineContent = line.split(' ').filter((item) => item !== '');
        extractedData.qtdEnergiaSCEE = lineContent[4];
        extractedData.valorEnergiaSCEE = fixStringToReais(lineContent[6]);
      }
      if (line.includes('Energia compensada GD IkWh')) {
        const lineContent = line.split(' ').filter((item) => item !== '');
        extractedData.qtdEnergiaCompensada = lineContent[4];
        extractedData.valorEnergiaCompensada = fixStringToReais(lineContent[6]);
      }

      if (line.includes('Contrib Ilum Publica Municipal')) {
        const lineContent = line.split(' ').filter((item) => item !== '');
        extractedData.valorContribuicaoIlumPublicaMunicipal = fixStringToReais(
          lineContent[4],
        );
      }
      if (line.includes('TOTAL')) {
        extractedData.total = fixStringToReais(line.split(' ')[8]);
      }
    });

    extractedData.consumoEnergiaEletrica =
      extractedData.qtdEnergiaEletrica !== undefined &&
      extractedData.qtdEnergiaSCEE !== undefined
        ? parseInt(
            removeNonNumericCharacters(extractedData.qtdEnergiaEletrica),
          ) + parseInt(removeNonNumericCharacters(extractedData.qtdEnergiaSCEE))
        : 0;

    extractedData.valorTotalSemGD = (
      extractedData.valorEnergiaEletrica +
      extractedData.valorEnergiaSCEE +
      extractedData.valorContribuicaoIlumPublicaMunicipal
    ).toFixed(2);

    this.logger.debug(`Dados extraídos: ${JSON.stringify(extractedData)}`);
    return extractedData;
  }
}
