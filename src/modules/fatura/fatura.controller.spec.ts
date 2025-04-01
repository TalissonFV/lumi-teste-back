import { Test, TestingModule } from '@nestjs/testing';
import { FaturaController } from './fatura.controller';

describe('FaturaController', () => {
  let controller: FaturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaturaController],
    }).compile();

    controller = module.get<FaturaController>(FaturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
