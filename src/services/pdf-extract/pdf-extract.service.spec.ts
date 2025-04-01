import { Test, TestingModule } from '@nestjs/testing';
import { PdfExtractService } from './pdf-extract.service';

describe('PdfExtractService', () => {
  let service: PdfExtractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfExtractService],
    }).compile();

    service = module.get<PdfExtractService>(PdfExtractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
