import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  companyName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  @MinLength(1)
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  addreessId: string; //objeto id de direccion

  @ApiProperty()
  @IsOptional()
  @IsString()
  imagen?: string; //id de la imagen

  //taxpayer: Taxpayer; //relacion uno a uno //@OneToOne(mappedBy = "compania", cascade = CascadeType.ALL)
  //employees: Employees[]; //@OneToMany(mappedBy = "compania", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
}
