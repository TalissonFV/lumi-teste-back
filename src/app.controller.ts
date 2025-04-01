import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PdfExtractService } from './pdf-extract/pdf-extract.service';

@Controller('pdf')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pdfService: PdfExtractService,
  ) {}

  @Get('extrair')
  async extrairPdf() {
    return await this.pdfService.extractData(
      'src/assets/pdfs/Instalacao_3001116735/3001116735-01-2024.pdf',
    );
  }
}
