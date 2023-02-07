import { Address } from './entities/address.entity';
import { Module } from '@nestjs/common';
import { AddressService } from './service/address.service';
import { AddressController } from './controller/address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [TypeOrmModule],
})
export class AddressModule {}
