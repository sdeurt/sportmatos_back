import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsString, Length } from "class-validator";

export class LoginDto {
 

    @ApiProperty()
    @IsEmail()
    @Length(1)
    email: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    password: string;

   

}
