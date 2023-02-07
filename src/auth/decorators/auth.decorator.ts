import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserProfileGuard } from '../guards/user-profile.guard';
import { ValidProfiles } from './../interfaces/valid.profiles';
import { ProfileProtected } from './profiles-protected.decorator';

export function Auth(...profiles: ValidProfiles[]) {
  return applyDecorators(
    ProfileProtected(...profiles),
    UseGuards(AuthGuard(), UserProfileGuard),
    ApiBearerAuth(),
  );
}
