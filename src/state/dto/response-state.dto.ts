import { ApiProperty } from '@nestjs/swagger';

export class ResponseStateDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
  //cities: City[];
  //country: Country;
}
