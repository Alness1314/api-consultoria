import { ValidProfiles } from './../../auth/interfaces/valid.profiles';
import { ResponseProfileDto } from './../dto/response-profile.dto';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProfilesService } from '../service/profiles.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @Auth(ValidProfiles.super, ValidProfiles.admin)
  @ApiResponse({
    status: 201,
    description: 'profile was created',
    type: ResponseProfileDto,
  })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @Auth(ValidProfiles.employee, ValidProfiles.admin, ValidProfiles.super)
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Delete(':id')
  @Auth(ValidProfiles.admin, ValidProfiles.super)
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }
}
