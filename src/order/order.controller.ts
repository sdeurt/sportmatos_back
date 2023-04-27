import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const response = await this.orderService.create(createOrderDto); 
    
    return {
      status: 201,
      message: "commande ajoutée",
      data : response
    };
  };

  @Get()
  async findAll() {
    const allOrders = await this.orderService.findAllOrder();
    if (!allOrders) {
      throw new HttpException("aucune commande trouvée", HttpStatus.NOT_FOUND);
    };
    return {
      statusCode: 200,
      message: "commande trouvée",
      data:allOrders
    };
  };

  /** Récupération de la commande par son id */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.orderService.findOneById(+id);

    if (!order) {
      throw new HttpException("cette commande n'existe pas", HttpStatus.NOT_FOUND);
    };
    return {
      statusCode: 200,
      message: "commande trouvée",
      data : order
    };
  };

  /** Modification de la commande  */
  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.orderService.update(+id, updateOrderDto);

    if (!order) {
      throw new NotFoundException("La commande n'existe pas!");

    }; 
    return { 
      statusCode: 200,
      message: "La commande est modifiée",
      data: order
    };
  };

  /** Suppression de la commande par son id */
  @Delete(':id')
  async remove(@Param('id') id: string) {

    const isOrderExists = await this.orderService.findOneById(+id);
   
    if (!isOrderExists) {
      throw new NotFoundException("La commande n'existe pas");
    };
    await this.orderService.remove(+id);

    return {
      statusCode: 200,
      message: "La commande est supprimée",
      data: isOrderExists
    };
  };
}
