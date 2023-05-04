import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";





export class CreateCartItemDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsNumber()
    cartId: number;

    @ApiProperty()
    @IsNumber()
    producId: number;
}
