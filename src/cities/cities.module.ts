import { City } from 'src/cities/entities/city.entity';
import { Module } from '@nestjs/common';
import { CitiesService } from './service/cities.service';
import { CitiesController } from './controller/cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [TypeOrmModule],
})
export class CitiesModule {}
