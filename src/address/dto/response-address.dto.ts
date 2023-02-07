import { ResponseCountryDto } from './../../country/dto/response-country.dto';
import { ResponseStateDto } from './../../state/dto/response-state.dto';
import { ResponseCityDto } from './../../cities/dto/response-city.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseAddressDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  intNumber: string;

  @ApiProperty()
  extNumber: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  suburb: string;

  @ApiProperty()
  city: ResponseCityDto;

  @ApiProperty()
  state: ResponseStateDto;

  @ApiProperty()
  country: ResponseCountryDto;

  @ApiProperty()
  createAt: Date;

  @ApiProperty()
  enabled: boolean;
}
