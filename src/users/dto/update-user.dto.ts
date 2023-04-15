import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsString()
    @Length(1)
    firstname: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    lastname: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    password: string;
}
