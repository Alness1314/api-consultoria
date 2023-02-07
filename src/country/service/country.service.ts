import { plainToInstance } from 'class-transformer';
import { Country } from 'src/country/entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ResponseCountryDto } from '../dto/response-country.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly _countryRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<ResponseCountryDto[]> {
    const countryList = await this._countryRepository.find();
    return plainToInstance(ResponseCountryDto, countryList);
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
