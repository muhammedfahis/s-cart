import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { IOrderInteractor } from "../interfaces/IOrderInteractor";
import { IOrderRepository } from "../interfaces/IOrderRepository";


import { Order as IOrder, OrderStatus } from "../entities/Order";
import { OrderItem as IOrderItem } from "../entities/OrderItem";
import { IOrderItemRepository } from "../interfaces/IOrderItemRepository";
import { BadRequestError } from "@fayisorg/common-modules";
import { Product as IProduct } from "../entities/Product";
import { IProductRepository } from "../interfaces/IProductRepository";

@injectable()
export class OrderInteractor implements IOrderInteractor {
    private orderRepository: IOrderRepository;
    private orderItemRepository: IOrderItemRepository;
    private productRepository: IProductRepository;
    constructor(@inject(INTERFACE_TYPE.OrderRepository) orderRepository: IOrderRepository,
        @inject(INTERFACE_TYPE.OrderItemRepository) orderItemRepository: IOrderItemRepository,
        @inject(INTERFACE_TYPE.ProductRepository) productRepository: IProductRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;

    }
    async createOrder(customer_id: string, orderItems: IOrderItem[]): Promise<IOrder> {
        const ordered_date = new Date();
        const status = OrderStatus.Placed;
        let total_price = 0;

        const refactoredOrderItem: IOrderItem[] = await Promise.all(orderItems.map(async (item: IOrderItem) => {
            const product: IProduct | null = await this.productRepository.findOne(item.product_id);
            if (!product) throw new BadRequestError('Product not found');
            if (product.quantity < item.quantity) throw new BadRequestError('Product quantity is not enough');
            item.sub_total = item.unit_price * item.quantity;
            total_price += item.sub_total;
            return item;
        }));
        const orderData: IOrder = {
            total_price,
            customer_id,
            ordered_date,
            status,
            items: refactoredOrderItem
        }
        const newOrder = await this.orderItemRepository.createWithTransaction(orderData);
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