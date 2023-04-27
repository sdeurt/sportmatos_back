import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {

  /** création détails d'une commande */

  async create(createOrderItemDto: CreateOrderItemDto) : Promise < OrderItem> {
    
    const newOrderItem = new OrderItem();

    newOrderItem.quantity = createOrderItemDto.quantity;
    newOrderItem.price = createOrderItemDto.price;

    await newOrderItem.save();

    return newOrderItem;
  }

  /** récupération de tous les détails de toutes commandes */
  async findAll(): Promise< OrderItem []> {
    const orderItem = await OrderItem.find();

    if (orderItem.length > 0) {
      return orderItem
    }
    return undefined ;
  }

  /** Récupération d'un détail commande par son id */

  async findOneById (id: number): Promise<OrderItem> {
    const orderItem = await OrderItem.findOneBy({ id });

    if (orderItem) {
      return orderItem;
    }
    return undefined;
  }

  /** Modification d'un détail de commande */

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    const orderItemUpdate = await OrderItem.findOneBy({ id });

    orderItemUpdate.quantity = updateOrderItemDto.quantity;
    orderItemUpdate.price = updateOrderItemDto.price;

    const orderItem = await orderItemUpdate.save();

    if (updateOrderItemDto) {
      return orderItem;
    }
    return undefined;
  }

/** suppression d'un produit */
async remove(id: number): Promise<OrderItem> {
  const deleteOrderItem = await OrderItem.findOneBy({ id });
  await deleteOrderItem.remove();

  if (deleteOrderItem) {
    return deleteOrderItem;
  }
}
}
