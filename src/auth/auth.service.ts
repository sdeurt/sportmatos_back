import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }
  
    async validateUser(email: string, password: string): Promise<any> {

      const user = await this.usersService.findOneByEmail(email);
  
      const isMatch = await bcrypt.compare( password, user.password);
  
      if (isMatch) {
        const { password, ...result } = user;
  
        return result;
  
      };
  
      throw new ForbiddenException('Mot de passe incorrect');
  };
  
  async login(user: any) {

    const payload = { email: user.email, sub: user.id };

    return {
      statusCode: 200,
      message: 'Connection réussie',
      data: { 
       user: user,
        access_token: this.jwtService.sign(payload) },
    };

  };
  
}
