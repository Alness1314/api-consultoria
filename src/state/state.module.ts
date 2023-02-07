import { State } from './entities/state.entity';
import { Module } from '@nestjs/common';
import { StateService } from './service/state.service';
import { StateController } from './controller/state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  controllers: [StateController],
  providers: [StateService],
  exports: [TypeOrmModule],
})
export class StateModule {}
