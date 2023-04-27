import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    
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
