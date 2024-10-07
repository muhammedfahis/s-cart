import { injectable } from "inversify";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { Order as IOrder, OrderStatus } from "../entities/Order";
import { Order } from "../models/orderModel";
import { ProductDoc } from "../models/productModel";


@injectable()
export class OrderRepository implements IOrderRepository {
   async create(order: IOrder): Promise<IOrder> {
        const newOrder = await Order.build(order).save();
        return newOrder;
    }
    async findAll(): Promise<IOrder[]> {
        return await Order.find()
        .populate({
            path: 'orderItems',
            model: 'OrderItem',
            populate: {
                path: 'product_id',
                model: 'Product'
            } 
        })
        .exec();
    }
   async findById(id: string): Promise<IOrder | null> {
        return await Order.findById(id)
        .populate({
            path: 'orderItems',
            model: 'OrderItem',
            populate: {
                path: 'product_id',
                model: 'Product'
            }
        })
       .exec();
    }
   async updateStatus(id: string, status: OrderStatus): Promise<IOrder | null> {
        return await Order.findByIdAndUpdate(id ,{ status }, { new: true });
    }
 
}