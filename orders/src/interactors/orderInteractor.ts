import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { IOrderInteractor } from "../interfaces/IOrderInteractor";
import { IOrderRepository } from "../interfaces/IOrderRepository";


import { Order as IOrder, OrderStatus } from "../entities/Order";
import { OrderItem as IOrderItem } from "../entities/OrderItem";
import { IOrderItemRepository } from "../interfaces/IOrderItemRepository";
import { BadRequestError } from "@fayisorg/common-modules";

@injectable()
export class OrderInteractor implements IOrderInteractor {
    private orderRepository: IOrderRepository;
    private orderItemRepository: IOrderItemRepository;
    constructor(@inject(INTERFACE_TYPE.OrderRepository) orderRepository: IOrderRepository,
    @inject(INTERFACE_TYPE.OrderItemRepository) orderItemRepository: IOrderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;

    }
   async createOrder(order: IOrder, orderItems: IOrderItem[]): Promise<IOrder> {
        const newOrder = await this.orderItemRepository.createWithTransaction(order,orderItems);
        return newOrder;
    }
    async getAllOrders(): Promise<IOrder[]> {
        return await this.orderRepository.findAll()
    }
   async getOrderById(id: string): Promise<IOrder | null> {
        return await this.orderRepository.findById(id);
    }
   async updateOrderStatus(id: string, status: OrderStatus): Promise<IOrder | null> {
        const order = await this.orderRepository.findById(id);
        if (!order) throw new BadRequestError('Order not found');
        return await this.orderRepository.updateStatus(id, status);
    }

}