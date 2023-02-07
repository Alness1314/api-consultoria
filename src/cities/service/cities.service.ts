import { plainToInstance } from 'class-transformer';
import { City } from 'src/cities/entities/city.entity';
import { ResponseCityDto } from './../dto/response-city.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly _cityRepository: Repository<City>,
  ) {}

  async findAll(): Promise<ResponseCityDto[]> {
    const citiesList = await this._cityRepository.find();
    return plainToInstance(ResponseCityDto, citiesList);
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
