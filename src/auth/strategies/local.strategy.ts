import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }


  async validate(email: string, password: string): Promise<any> {

    // Vérifie si le Pseudo existe dans la BDD
    const isUserExist = await this.usersService.findOneByEmail(email);

    if (!isUserExist) throw new BadRequestException('Pseudo incorrect');


    // Vérifie le password
    const user = await this.authService.validateUser(email, password);

    if (!user) { throw new UnauthorizedException(); };

    return user;

  };

};
