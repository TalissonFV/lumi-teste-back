// src/services/fatura/fatura.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class FaturaService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.fatura.findMany();
  }

  async findOne(id: number) {
    const fatura = await this.prisma.fatura.findUnique({
      where: { id },
    });
    if (!fatura) {
      throw new NotFoundException(`Fatura com ID ${id} não encontrada.`);
    }
    return fatura;
  }
}
