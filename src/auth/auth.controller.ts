import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  @UseGuards(AuthGuard()) //post accessible aux utilisateurs connectés
  /**décorateur @GetUser()user:User dans un paramètre pour avoir accès à l'objet de 
  l'utilisateur qui a envoyé la requête*/
  create(@Body() createAuthDto: CreateAuthDto,
    @GetUser() user: User,) {
    console.log(user);
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  @UseGuards(AuthGuard())
  login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

}
