import { Test, TestingModule } from '@nestjs/testing';
import { TaxplayerController } from './taxplayer.controller';
import { TaxplayerService } from './taxplayer.service';

describe('TaxplayerController', () => {
  let controller: TaxplayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxplayerController],
      providers: [TaxplayerService],
    }).compile();

    controller = module.get<TaxplayerController>(TaxplayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
