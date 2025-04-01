import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfExtractService } from './pdf-extract/pdf-extract.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PdfExtractService],
})
export class AppModule {}
