import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty()
    @IsString()
    @Length(1)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    productId: number

    
}
