import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

  /** création de la commande */
  
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = new Order();

    newOrder.adresse = createOrderDto.adresse;
    newOrder.totalPrice = createOrderDto.totalPrice;
    newOrder.status = createOrderDto.status;

    await newOrder.save();

    return newOrder;
  }

  /** Récupération de toutes les commandes */

  async findAllOrder() : Promise<Order[]> {
    const orders = await Order.find({ relations: {user: true}});
    if (orders.length > 0)
      return orders;
  }

  /** Récupération d'une commande par son id */
 
  async findOneById(id: number): Promise<Order> {
    const order = await Order.findOneBy({ id });
    console.log(order)
   if (order) {
     return order;
   };
   return undefined;
  }
  /**Modification de la commande */
  
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderUpdate = await Order.findOneBy({ id });
    
    orderUpdate.id = updateOrderDto.id;
    orderUpdate.adresse = updateOrderDto.adresse;
    orderUpdate.totalPrice = updateOrderDto.totalPrice;
    orderUpdate.status = updateOrderDto.status;

    const order = await orderUpdate.save();

    if (updateOrderDto) {
      return order;
    }
    return undefined;
  }

  /** suppression d'une commande */
  
  async remove (id: number) : Promise <Order> {
    const deleteOrder = await Order.findOneBy({ id });
    await deleteOrder.remove();

    if (deleteOrder) {
      return deleteOrder;
    }
  }
}
