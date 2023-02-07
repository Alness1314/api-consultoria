import { Address } from './entities/address.entity';
import { Module } from '@nestjs/common';
import { AddressService } from './service/address.service';
import { AddressController } from './controller/address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from 'src/cities/cities.module';
import { CountryModule } from 'src/country/country.module';
import { StateModule } from 'src/state/state.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    CitiesModule,
    CountryModule,
    StateModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [TypeOrmModule],
})
export class AddressModule {}
