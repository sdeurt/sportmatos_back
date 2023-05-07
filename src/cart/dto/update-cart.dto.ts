import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddProductToCartDto } from './addProductToCartDto';
import { IsNumber } from 'class-validator';

export class UpdateCartDto extends PartialType(AddProductToCartDto) {

   
    
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNumber()
    totalPrice: number;
    
    @ApiProperty()
    @IsNumber()
    date: Date;
 
}
