import { ApiProperty } from '@nestjs/swagger';

export class ResponseProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  createAt: Date;
}
