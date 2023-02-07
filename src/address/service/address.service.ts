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

@Injectable()
export class AddressService {
  private readonly logger = new Logger('AddressService');

  constructor(
    @InjectRepository(Address)
    private readonly _addressRepository: Repository<Address>,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
  ): Promise<ResponseAddressDto> {
    const newAddress = this._addressRepository.create(createAddressDto);
    let address: Address;
    try {
      address = await this._addressRepository.save(newAddress);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseAddressDto, address);
  }

  async findAll(): Promise<ResponseAddressDto[]> {
    const addressList = await this._addressRepository.find();
    return plainToInstance(ResponseAddressDto, addressList);
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
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
