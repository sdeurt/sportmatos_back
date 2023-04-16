import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.usersService.findOneByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user;

      return result;

    };

    throw new ForbiddenException('mot de passe incorrect');
  };
    
    

  async login(loginDto: LoginDto) {
    
      const payload = { loginDto  };
  
      return {
        statusCode: 200,
        message: 'Connection réussie',
        data: { 
          loginDto: payload.loginDto,
          access_token: this.jwtService.sign(payload) },
      };
  }
}
