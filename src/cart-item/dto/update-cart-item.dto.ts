import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartItemDto } from './create-cart-item.dto';
import { IsNumber } from 'class-validator';

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {
    
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
