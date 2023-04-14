import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  /*crée un nouveau User */
  async create(createUserDto: CreateUserDto, hash:string): Promise<User> {
    const newUser = new User();

    newUser.id = createUserDto.id;
    newUser.firtname = createUserDto.firstName;
    newUser.lastname = createUserDto.lastName;
    newUser.email = createUserDto.email;
    newUser.password = hash;
    newUser.admin = createUserDto.admin;

    await newUser.save();
    return newUser;
  }

   /** Récupère tous les Users */
   async findAll(): Promise<User[]> {
    const users = await User.find({relations: {}});

    if (users.length > 0) {
      return users;
    };

    return undefined;
  };

    /** Récupère un User par son email */
    async findOneByEmail(email: string): Promise<User> {
      const user = await User.findOne({ where: { email: email } });
  
      if (user) {
        return user;
      };
  
      return undefined;
  };
  
  /** Récupère un User par son Id */
  async findOneById(id: number): Promise<User> {
    const user = await User.find({ relations: { }, where: { id: id } });

    if (user) {
      return user[0];
    };

    return undefined;

  };

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  /** Supprime un User */
  async remove(id: number): Promise<User | undefined> {

    // Vérifie que le User à supprimer existe
    const isUserExists = await User.findOneBy({ id });

    if (!isUserExists) {
      throw new NotFoundException('User id inexistant');
    };

    await isUserExists.remove();

    if (isUserExists) {
      return isUserExists;
    };

    return undefined;
  };

}
