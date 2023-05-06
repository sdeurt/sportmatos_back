import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class LoginDto {
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
    @Length(1)
    email: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    password: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    admin: boolean;

}
