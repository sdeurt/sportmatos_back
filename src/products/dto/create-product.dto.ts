import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";


export class CreateProductDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    @Length(1)
    name: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    description: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsString()
    image: string;

    @ApiProperty()
    @IsNumber()
    stock: number;
}
