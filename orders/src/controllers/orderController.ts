import { IOrderInteractor } from "../interfaces/IOrderInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { Request, Response, NextFunction } from "express";
import { OrderStatus } from "../entities/Order";
import { OrderItem as IOrderItem } from "../entities/OrderItem";
import { KafkaProducer, Topics } from "@fayisorg/common-modules";

const EXPIRATION_WINDOW_SECONDS =  1 * 60;


@injectable()
export class OrderController {
    private orderInteractor: IOrderInteractor;
    constructor(@inject(INTERFACE_TYPE.OrderInteractor) orderInteractor: IOrderInteractor) {
        this.orderInteractor = orderInteractor;
    }

  
    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            let { items } = req.body;
            const customer_id = req.currentUser!.id;
            const order = await this.orderInteractor.createOrder(customer_id, items);
            const producer =  new KafkaProducer();
            const expiration = new Date();
            expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)
            await producer.publish({
                topic: 'Order_Events',
                headers:{},
                event: Topics.CREATE_ORDER,
                message: {
                    id: order.id,
                    expiresAt: expiration,
                    customer_id: customer_id,
                    total_price: order.total_price,
                    items: items,
                    ordered_date: order.ordered_date,
                    status: OrderStatus.Placed,
                }
            });
         res.status(201).send(order);
        } catch (error) {
            next(error);
        }
     }

     async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await this.orderInteractor.getAllOrders();
            res.status(200).send(orders);
        } catch (error) {
            next(error);
        }
     }

     async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const order = await this.orderInteractor.getOrderById(id);
            res.status(200).send(order);
        } catch (error) {
            next(error);
        }
     }

     async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const status = req.body.status;
            const order = await this.orderInteractor.updateOrderStatus(id, status);
            res.status(200).send(order);
        } catch (error) {
            next(error);
        }
     }

}