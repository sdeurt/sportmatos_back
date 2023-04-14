import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @ApiProperty()
    @IsNumber()
    id: number;
  
    @ApiProperty()
    @IsNumber()
    totalPrice: number;
  
    @ApiProperty()
    @IsString()
    adresse: string;
  
    @ApiProperty()
    @IsString()
    status: string;
}
