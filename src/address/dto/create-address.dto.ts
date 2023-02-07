import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(128)
  street: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  @MaxLength(32)
  intNumber: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  @MaxLength(32)
  extNumber: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  @MaxLength(32)
  zipCode: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(64)
  suburb: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  cityId: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  stateId: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  countryId: string;
}
