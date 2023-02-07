import { Profile } from './../../profiles/entities/profile.entity';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from '../dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly _userRespository: Repository<User>,
    @InjectRepository(Profile)
    private readonly _roleRespository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const newUser = this._userRespository.create(createUserDto);
    let user: User;
    //const detail = await this._detailService.create(createUserDto.detail);
    const list: Profile[] = [];
    for (const iterator of createUserDto.profilesId) {
      const temp = await this._roleRespository.findOneBy({ id: iterator });
      if (!temp) {
        throw new NotFoundException('profile not found');
      }
      console.log(JSON.stringify(temp));
      list.push(temp);
    }
    try {
      //newUser.detail = detail;
      newUser.profiles = list;
      user = await this._userRespository.save(newUser);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseUserDto, user);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const listUser = await this._userRespository.find({
      relations: ['profiles'],
    });
    return plainToInstance(ResponseUserDto, listUser);
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this._userRespository.findOne({
      relations: ['profiles'],
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return plainToInstance(ResponseUserDto, user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    //response user updated
    let updateUser: User;

    //search user for update
    const tempUser = await this.findOne(id);
    const user = plainToInstance(User, tempUser);
    this._userRespository.merge(user, updateUserDto);

    //Role assing to update
    const list: Profile[] = user.profiles;

    if (updateUserDto.profilesId) {
      for (const profilesId of updateUserDto.profilesId) {
        const temp = await this._roleRespository.findOneBy({ id: profilesId });
        if (!temp) {
          throw new NotFoundException('role not found');
        }
        list.push(temp);
      }
    }

    try {
      user.profiles = list;
      updateUser = await this._userRespository.save(user);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseUserDto, updateUser);
  }

  async remove(id: string): Promise<any> {
    const user = await this.findOne(id);
    const removeUser = plainToInstance(User, user);
    await this._userRespository.remove(removeUser);

    return {
      reponse: HttpStatus.ACCEPTED,
      message: `Deleted user with email: ${user.email} `,
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
