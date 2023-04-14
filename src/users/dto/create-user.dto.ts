import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";


export class CreateUserDto {

    
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    @Length(1)
    firstName: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    lastName: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    admin: boolean;
}
