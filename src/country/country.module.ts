import { Country } from 'src/country/entities/country.entity';
import { Module } from '@nestjs/common';
import { CountryService } from './service/country.service';
import { CountryController } from './controller/country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [TypeOrmModule],
})
export class CountryModule {}
