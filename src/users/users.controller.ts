import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import bcrypt from "bcrypt";
import { IsEmail } from 'class-validator';



@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  /* création d'un nouveau User
  **email unique
  **hash password
  * @param createUserDto Dto contenant les données de la requête (Insomnia par exemple)
  * @returns Renvoie les data du nouveau User
  */
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor) // permet d
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const saltOrRounds = 10;

    // Vérifie que le password fournit n'existe pas déjà 
    const isUserExist = await this.usersService.findOneById(createUserDto.id);
    if (isUserExist)
      throw new ConflictException(
        'le User existe déjà'
      );
    // Vérifie que l'email fournit n'existe pas déjà
    const isEmailExist = await this.usersService.findOneByEmail(createUserDto.email);
    if (isEmailExist)
      throw new ConflictException(
        'E-mail déjà utilisé, veuillez entrer un e-mail valide',
      );

    // Hashage du password
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    // Création du user
    const user = await this.usersService.create(createUserDto, hash);

    return {
      statusCode: 201,
      message: 'Utilisateur enregistré',
      data: user
    };
  };

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
