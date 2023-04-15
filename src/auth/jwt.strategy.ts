import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    const user: User = await this.userRepository.findOneBy({ email });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}