import { StateModule } from './../state/state.module';
import { CountryModule } from './../country/country.module';
import { CitiesModule } from './../cities/cities.module';
import { CountryService } from './../country/service/country.service';
import { CitiesService } from './../cities/service/cities.service';
import { Company } from './entities/company.entity';
import { Module } from '@nestjs/common';
import { CompanyService } from './service/company.service';
import { CompanyController } from './controller/company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateService } from 'src/state/service/state.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
