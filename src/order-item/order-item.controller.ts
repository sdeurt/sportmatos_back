import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  /** Création détail commande  */
  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    const response = await this.orderItemService.create(createOrderItemDto);
    
    return {
      status: 201,
      message: "detail commande ajouté",
      data: response
    }
  }

  /** Récupération de tous les détails commandes */
  @Get()
 async findAll() {
    const allOrderItems = await this.orderItemService.findAll();
    if (!allOrderItems) {
      throw new HttpException("aucun détail commande trouvé", HttpStatus.NOT_FOUND);
    }
    return {
      status: 200,
      message: " liste des détails commandes",
      data: allOrderItems
    }
  }

  /** Récupération détail commande par id  */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    
      const orderItem = await this.orderItemService.findOneById(+id);
      if (!orderItem) {
        throw new HttpException("ce détail de commande n'existe pas ", HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: 200,
        message: "Le détail de commande trouvé",
        data: orderItem
        
      };
  }

  /** Modification détail commande par id */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemService.update(+id, updateOrderItemDto);
    
    if (!orderItem) { 
    throw new NotFoundException(`Le détail commande n'existe pas!`);
    
  }
    return {
      statusCode: 200,
      message: "Le détail commande a bien été modifié",
      data: orderItem
    }
  }

  /** Suppression détail commande par id */
  @Delete(':id')
 async remove(@Param('id') id: string) {
    /**vérifier que le détail commande à supprimer existe */
    const isOrderItemExist = await this.orderItemService.findOneById(+id);
    if (!isOrderItemExist) {
      throw new NotFoundException(`le détail commande n'existe pas`);
    };
    /**supprime le détail commande sélectionné */
    await this.orderItemService.remove(+id);

    return {
      statusCode: 200,
      message: ' détail commande supprimé',
      data: isOrderItemExist
    }
  }
  }

