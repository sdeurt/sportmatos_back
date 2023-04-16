import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
  ) {
    super({
      secretOrKey: 'accessToken',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
	
	// conserver impérativement le nom de méthode
  async validate(payload: any): Promise<User> {
    console.log('validate');
    const { email } = payload;
    const user: User = await this.usersService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException();
    return user;
  }
}