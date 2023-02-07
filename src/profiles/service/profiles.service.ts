import { ResponseProfileDto } from './../dto/response-profile.dto';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger('ProfilesService');

  constructor(
    @InjectRepository(Profile)
    private readonly _roleRepository: Repository<Profile>,
  ) {}

  async create(
    createProfileDto: CreateProfileDto,
  ): Promise<ResponseProfileDto> {
    const newProfile = this._roleRepository.create(createProfileDto);
    let profile: Profile;
    try {
      profile = await this._roleRepository.save(newProfile);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseProfileDto, profile);
  }

  async findAll(): Promise<ResponseProfileDto[]> {
    const profileList = await this._roleRepository.find();
    return plainToInstance(ResponseProfileDto, profileList);
  }

  async findOne(id: string): Promise<ResponseProfileDto> {
    const profile = await this._roleRepository.findOneBy([{ id: id }]);
    if (!profile) {
      throw new NotFoundException(`Role with id:${id} not found`);
    }
    return plainToInstance(ResponseProfileDto, profile);
  }

  async remove(id: string): Promise<any> {
    const profile = await this.findOne(id);
    await this._roleRepository.remove(profile);
    return {
      reponse: HttpStatus.ACCEPTED,
      message: `Deleted role with name: ${profile.name} `,
    };
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
