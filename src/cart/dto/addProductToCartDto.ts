import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddProductToCartDto {


    @ApiProperty()
    @IsNumber()
    cartItems: number [];

 
}
