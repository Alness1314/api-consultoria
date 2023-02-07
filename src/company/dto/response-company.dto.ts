import { ApiProperty } from '@nestjs/swagger';
import { ResponseAddressDto } from 'src/address/dto/response-address.dto';

export class ResponseCompanyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  addreess: ResponseAddressDto; //objeto id de direccion

  @ApiProperty()
  imagen: string; //id de la imagen

  @ApiProperty()
  createAt: Date;

  @ApiProperty()
  enabled: boolean;
  //taxpayer: Taxpayer; //relacion uno a uno //@OneToOne(mappedBy = "compania", cascade = CascadeType.ALL)
  //employees: Employees[]; //@OneToMany(mappedBy = "compania", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
}
