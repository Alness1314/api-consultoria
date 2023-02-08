import { ResponseCompanyDto } from './../dto/response-company.dto';
import { Company } from './../entities/company.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { Repository } from 'typeorm/repository/Repository';
import { plainToInstance } from 'class-transformer';
import { AddressService } from 'src/address/service/address.service';
import { Address } from 'src/address/entities/address.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger('CompanyService');

  constructor(
    @InjectRepository(Company)
    private readonly _companyRepository: Repository<Company>,
    private readonly _addressService: AddressService,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
  ): Promise<ResponseCompanyDto> {
    const newCompany = this._companyRepository.create(createCompanyDto);
    let company: Company;
    //asignamos address
    const addressResonse = await this._addressService.create(
      createCompanyDto.address,
    );
    //this.logger.debug(JSON.stringify(addressResonse));
    try {
      newCompany.address = plainToInstance(Address, addressResonse);
      //this.logger.debug(JSON.stringify(newCompany));
      company = await this._companyRepository.save(newCompany);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseCompanyDto, company);
  }

  async findAll(): Promise<ResponseCompanyDto[]> {
    const companyList = await this._companyRepository.find({
      relations: {
        address: true,
      },
    });
    return plainToInstance(ResponseCompanyDto, companyList);
  }

  async findOne(id: string): Promise<ResponseCompanyDto> {
    const company = this._companyRepository.findOne({
      where: { id: id },
      relations: {
        address: true,
      },
    });
    if (!company) {
      throw new NotFoundException('company not found');
    }
    return plainToInstance(ResponseCompanyDto, company);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    updateCompanyDto.address;
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ConflictException('Duplicate entry in database');
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
