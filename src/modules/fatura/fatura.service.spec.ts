import { Test, TestingModule } from '@nestjs/testing';
import { FaturaService } from './fatura.service';

describe('FaturaService', () => {
  let service: FaturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaturaService],
    }).compile();

    service = module.get<FaturaService>(FaturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
