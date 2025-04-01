// src/controllers/fatura.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { FaturaService } from './fatura.service';

@Controller('faturas')
export class FaturaController {
  constructor(private readonly faturaService: FaturaService) {}

  @Get()
  async findAll() {
    return this.faturaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.faturaService.findOne(parseInt(id));
  }
}
