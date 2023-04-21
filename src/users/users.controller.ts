import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import bcrypt, { hash } from "bcrypt";
import { IsEmail } from 'class-validator';
import { User } from './entities/user.entity';



@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  /* création d'un nouveau User
  **email unique
  **hash password
  * @param createUserDto Dto contenant les données de la requête (Insomnia par exemple)
  * @returns Renvoie les data du nouveau User
  */
  // @Post('register')
  //@UseInterceptors(ClassSerializerInterceptor) //  permet de ne pas renvoyer le password
  // async create(@Body() createUserDto: CreateUserDto): Promise<any> {
  //   const saltOrRounds = 10;

  // Vérifie que l'user n'existe pas déjà
  /*  const isUserExist = await this.usersService.findOneById(createUserDto.id);
    if (isUserExist)
      throw new ConflictException(
       'le User existe déjà'
      ); */
  /*      // Vérifie que l'email fournit n'existe pas déjà
      const isEmailExist = await this.usersService.findOneByEmail(createUserDto.email);
       if (isEmailExist)
        throw new ConflictException(
          'E-mail déjà utilisé, veuillez entrer un e-mail valide',
         ); */

  //   // Hashage du password
  //   const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

  // Création du user
  /*     const user = await this.usersService.create(createUserDto);
 
      return {
       statusCode: 201,
       message: 'Utilisateur enregistré',
       data: user
 
      };
 
    }; */
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    await this.usersService.create(createUserDto)
    return {
      status: 201,
      message: 'user créé',
      data: createUserDto
    }
  };

  // Récupération de tous les users
  @Get()
  async findAll(): Promise<any> {
    const users = await this.usersService.findAll();

    return users;

  };

  @Get(':email')
  async findOneByEmail(@Param('email') email: string): Promise<any> {
    // Vérifie que l'email fournit n'existe pas déjà
    const isEmailExist = await this.usersService.findOneByEmail(email);
    if (isEmailExist)
      throw new ConflictException(
        //       'E-mail déjà utilisé, veuillez entrer un e-mail valide',
      );

  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findOneById(+id);

    if (!user) {
      throw new NotFoundException("User id inexistant");
    };

    return {
      statusCode: 200,
      message: 'Affichage du User sélectionné',
      data: user
    };
  };

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    const updateUser = await this.usersService.update(+id, updateUserDto);
    return {
      status: 200,
      message: ' user modifié',
      data: updateUser
    }

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteUser = await this.usersService.remove(+id);
    return {
      status: 200,
      message: 'affichage user supprimé',
      data: deleteUser
    }
  }
}
