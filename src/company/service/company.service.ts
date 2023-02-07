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

@Injectable()
export class CompanyService {
  private readonly logger = new Logger('CompanyService');

  constructor(
    @InjectRepository(Company)
    private readonly _companyRepository: Repository<Company>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
  ): Promise<ResponseCompanyDto> {
    const newCompany = this._companyRepository.create(createCompanyDto);
    let company: Company;
    try {
      company = await this._companyRepository.save(newCompany);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseCompanyDto, company);
  }

  async findAll(): Promise<ResponseCompanyDto[]> {
    const companyList = await this._companyRepository.find();
    return plainToInstance(ResponseCompanyDto, companyList);
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
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
