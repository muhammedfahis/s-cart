import { injectable } from "inversify";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { Order as IOrder, OrderStatus } from "../entities/Order";
import { Order } from "../models/orderModel";


@injectable()
export class OrderRepository implements IOrderRepository {
   async create(order: IOrder): Promise<IOrder> {
        console.log(order,'orderRep')
        const newOrder = await Order.build(order).save();
        return newOrder;
    }
    async findAll(): Promise<IOrder[]> {
        return await Order.find()
        .populate({
            path: 'orderItems',
            model: 'OrderItem'
        })
        .exec();
    }
   async findById(id: string): Promise<IOrder | null> {
        return await Order.findById(id)
        .populate({
            path: 'orderItems',
            model: 'OrderItem'
        })
       .exec();
    }
   async updateStatus(id: string, status: OrderStatus): Promise<IOrder | null> {
        return await Order.findByIdAndUpdate(id ,{ status }, { new: true });
    }
 
}