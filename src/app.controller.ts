import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PdfExtractService } from './services/pdf-extract/pdf-extract.service';
import { readdirSync } from 'fs';

@Controller('pdf')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pdfService: PdfExtractService,
  ) {}

  @Get('extrair')
  async extrairPdf() {
    const pdfData = [];
    const files = readdirSync('./src/assets/pdfs/Instalacao_3001116735');
    for (const file of files) {
      pdfData.push(
        await this.pdfService.extractData(
          `src/assets/pdfs/Instalacao_3001116735/${file}`,
        ),
      );
    }

    return pdfData;
  }
}
