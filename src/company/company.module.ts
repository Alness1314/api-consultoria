import { AddressModule } from './../address/address.module';
import { Company } from './entities/company.entity';
import { Module } from '@nestjs/common';
import { CompanyService } from './service/company.service';
import { CompanyController } from './controller/company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AddressModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
