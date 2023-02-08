import { Test, TestingModule } from '@nestjs/testing';
import { LegalRepresentativeService } from './legal-representative.service';

describe('LegalRepresentativeService', () => {
  let service: LegalRepresentativeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegalRepresentativeService],
    }).compile();

    service = module.get<LegalRepresentativeService>(LegalRepresentativeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
