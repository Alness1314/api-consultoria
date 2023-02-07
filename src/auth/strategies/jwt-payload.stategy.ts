import { User } from './../../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigKeys } from './../../utils/keys/config.keys';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/payload.interface';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    //private readonly _userService: UsersService,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get(ConfigKeys.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user: User = await this._userRepository.findOne({
      relations: ['profiles'],
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }
    if (!user.status) {
      throw new UnauthorizedException('User is not active, talk with an admin');
    }
    return user;
  }
}
