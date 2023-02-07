import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from '../dto/response-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidProfiles } from 'src/auth/interfaces/valid.profiles';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(ValidProfiles.employee, ValidProfiles.admin, ValidProfiles.super)
  @ApiResponse({
    status: 201,
    description: 'user was created',
    type: ResponseUserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth(ValidProfiles.employee, ValidProfiles.admin, ValidProfiles.super)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Auth(ValidProfiles.admin, ValidProfiles.super)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(ValidProfiles.admin, ValidProfiles.super)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
