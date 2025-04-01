import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfExtractService } from './services/pdf-extract/pdf-extract.service';
import { PrismaService } from './services/prisma/prisma.service';
import { FaturaModule } from './modules/fatura/fatura.module';

@Module({
  imports: [FaturaModule],
  controllers: [AppController],
  providers: [AppService, PdfExtractService, PrismaService],
})
export class AppModule {}
