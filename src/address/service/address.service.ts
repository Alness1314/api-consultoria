import { Country } from './../../country/entities/country.entity';
import { Address } from './../entities/address.entity';
import { ResponseAddressDto } from 'src/address/dto/response-address.dto';
import { plainToInstance } from 'class-transformer';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from 'src/country/service/country.service';
import { StateService } from 'src/state/service/state.service';
import { CitiesService } from 'src/cities/service/cities.service';
import { State } from 'src/state/entities/state.entity';
import { City } from 'src/cities/entities/city.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class AddressService {
  private readonly logger = new Logger('AddressService');

  constructor(
    @InjectRepository(Address)
    private readonly _addressRepository: Repository<Address>,
    private readonly _countryService: CountryService,
    private readonly _stateService: StateService,
    private readonly _cityService: CitiesService,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
  ): Promise<ResponseAddressDto> {
    const newAddress = this._addressRepository.create(createAddressDto);
    let address: Address;
    //search country, state and city
    // eslint-disable-next-line prettier/prettier
    const country = await this._countryService.findOne(
      createAddressDto.countryId,
    );
    const state = await this._stateService.findOne(createAddressDto.stateId);
    const city = await this._cityService.findOne(createAddressDto.cityId);
    try {
      newAddress.country = plainToInstance(Country, country);
      newAddress.state = plainToInstance(State, state);
      newAddress.city = plainToInstance(City, city);

      address = await this._addressRepository.save(newAddress);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseAddressDto, address);
  }

  async findAll(): Promise<ResponseAddressDto[]> {
    const addressList = await this._addressRepository.find({
      relations: {
        country: true,
        state: true,
        city: true,
      },
    });
    return plainToInstance(ResponseAddressDto, addressList);
  }

  async findOne(id: string): Promise<ResponseAddressDto> {
    const address = await this._addressRepository.findOne({
      where: { id: id },
      relations: {
        country: true,
        state: true,
        city: true,
      },
    });
    if (!address) {
      throw new NotFoundException('address not found');
    }
    return plainToInstance(ResponseAddressDto, address);
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    if (error.code === '23502') {
      throw new ConflictException(
        'viola la restricción de no nulo entry in dbase',
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
