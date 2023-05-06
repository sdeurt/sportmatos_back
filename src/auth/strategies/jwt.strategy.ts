import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { HttpExceptionFilter } from 'src/errors/AllExceptionsFilter';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTCONSTANTS,
    });
  };

  async validate(payload: any) {
    const user = await this.usersService.findOneByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException(`Vous n'êtes pas répertorié`)
    }
    return user ;
  };
};