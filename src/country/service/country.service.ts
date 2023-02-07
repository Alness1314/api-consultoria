import { plainToInstance } from 'class-transformer';
import { Country } from 'src/country/entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ResponseCountryDto } from '../dto/response-country.dto';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';

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

  async findOne(id: string) {
    const country = await this._countryRepository.findOne({
      where: { id: id },
    });
    if (country != null) {
      throw new NotFoundException('country not found');
    }
    return plainToInstance(ResponseCountryDto, country);
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
