import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FaturaController } from './fatura.controller';
import { FaturaService } from './fatura.service';

@Module({
  imports: [],
  controllers: [FaturaController],
  providers: [FaturaService, PrismaService],
})
export class FaturaModule {}
