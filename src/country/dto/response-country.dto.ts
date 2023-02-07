import { ApiProperty } from '@nestjs/swagger';

export class ResponseCountryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  countryCode: string;

  //@ApiProperty()
  //states: ResponseStateDto[];
}
