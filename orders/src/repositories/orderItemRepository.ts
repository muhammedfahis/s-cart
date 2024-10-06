import { injectable } from "inversify";
import { IOrderItemRepository } from "../interfaces/IOrderItemRepository";
import { OrderItem } from "../models/orderItemModel";
import { Order } from '../models/orderModel'; 
import { OrderItem as IOrderItem } from "../entities/OrderItem"
import { Order as IOrder } from "../entities/Order";
import mongoose, { ClientSession } from "mongoose";

@injectable()
export class OrderItemRepository implements IOrderItemRepository {
    /**
   * Creates an order along with its associated order items within a transaction.
   * @param orderData - The order details.
   * @param orderItemsData - An array of order items associated with the order.
   * @returns The newly created order.
   * @throws Will throw an error if the transaction fails.
   */
  async createWithTransaction(orderData: IOrder, orderItemsData: IOrderItem[]): Promise<IOrder> {
    const session: ClientSession = await mongoose.startSession();
    try {
      session.startTransaction();

      // Create the new order
      const newOrder = await Order.build(orderData).save({ session });
      if (!newOrder.id) {
        throw new Error('Order not created');
      }

      // Associate order_id with each order item
      const orderItemsWithOrderId = orderItemsData.map((item) => ({
        ...item,
        order_id: newOrder.id!.toString(),
      }));

      // Create order items
      const newOrderItems = await OrderItem.create(orderItemsWithOrderId, { session });
      if (!newOrderItems || newOrderItems.length === 0) {
        throw new Error('Order items not created');
      }

      await session.commitTransaction();
      session.endSession();

      return newOrder;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  /**
   * Creates multiple order items in bulk.
   * @param orderItemsData - An array of order items to create.
   * @param options - Optional Mongoose options for bulk operations.
   * @returns An array of the newly created order items.
   */
  async create(orderItemsData: IOrderItem[], options?: any): Promise<IOrderItem[]> {
    const newOrderItems = OrderItem.buildMany(orderItemsData);
    await OrderItem.bulkSave(newOrderItems, options);
    return newOrderItems.map(items => ({
        ...items,
        order_id: items.order_id.toString()
    }));
  }

}