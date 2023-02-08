import { plainToInstance } from 'class-transformer';
import { City } from 'src/cities/entities/city.entity';
import { ResponseCityDto } from './../dto/response-city.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string): Promise<ResponseCityDto> {
    const city = await this._cityRepository.findOne({
      where: { id: id },
    });
    if (!city) {
      throw new NotFoundException('country not found');
    }
    return plainToInstance(ResponseCityDto, city);
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
