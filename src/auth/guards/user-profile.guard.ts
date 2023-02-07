import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { META_ROLES } from '../decorators/profiles-protected.decorator';

@Injectable()
export class UserProfileGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validProfiles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validProfiles) {
      return true;
    }

    if (validProfiles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) {
      throw new BadRequestException('User not found');
    }

    for (const profile of user.profiles) {
      if (validProfiles.includes(profile.name)) {
        return true;
      }
    }

    console.log({ userProfile: user.profiles });

    //console.log({validRoles});
    throw new ForbiddenException(`User ${user.email} need a valid profile `);
  }
}
