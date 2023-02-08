import { Module } from '@nestjs/common';
import { TaxplayerService } from './taxplayer.service';
import { TaxplayerController } from './taxplayer.controller';

@Module({
  controllers: [TaxplayerController],
  providers: [TaxplayerService]
})
export class TaxplayerModule {}
