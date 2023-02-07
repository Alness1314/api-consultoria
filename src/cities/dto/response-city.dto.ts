import { ApiProperty } from '@nestjs/swagger';

export class ResponseCityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  //state: State;
}
