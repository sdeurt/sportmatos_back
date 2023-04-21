import { ApiProperty } from "@nestjs/swagger";
import {  IsNumber,IsString, Length } from "class-validator";


export class CreateUserDto {


    @ApiProperty()
    @IsNumber()
    id: number;

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
