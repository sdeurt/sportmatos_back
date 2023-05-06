import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";


export class CreateUserDto {




    @ApiProperty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    admin: boolean;

    @ApiProperty()
    @IsString()
    address: string;


}
