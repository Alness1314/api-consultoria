import { Test, TestingModule } from '@nestjs/testing';
import { LegalRepresentativeController } from './legal-representative.controller';
import { LegalRepresentativeService } from './legal-representative.service';

describe('LegalRepresentativeController', () => {
  let controller: LegalRepresentativeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegalRepresentativeController],
      providers: [LegalRepresentativeService],
    }).compile();

    controller = module.get<LegalRepresentativeController>(LegalRepresentativeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
