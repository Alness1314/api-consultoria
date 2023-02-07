import { ResponseProfileDto } from './../../profiles/dto/response-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    example: '460124df-f3ea-4325-b1df-3a68a4642ea6',
  })
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  //@ApiProperty()
  //detail: ResponseDetailDto;

  @ApiProperty()
  profile: ResponseProfileDto[];

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;
}
