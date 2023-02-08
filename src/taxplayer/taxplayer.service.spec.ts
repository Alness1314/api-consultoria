import { Test, TestingModule } from '@nestjs/testing';
import { TaxplayerService } from './taxplayer.service';

describe('TaxplayerService', () => {
  let service: TaxplayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxplayerService],
    }).compile();

    service = module.get<TaxplayerService>(TaxplayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
