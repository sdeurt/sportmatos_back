import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsString, Length } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

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
