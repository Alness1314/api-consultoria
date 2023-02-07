import { ValidProfiles } from './../interfaces/valid.profiles';
import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'profiles';

export const ProfileProtected = (...args: ValidProfiles[]) => {
  return SetMetadata(META_ROLES, args);
};
