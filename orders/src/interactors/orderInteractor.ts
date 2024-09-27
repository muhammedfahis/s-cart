import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { IOrderInteractor } from "../interfaces/IOrderInteractor";
import { IOrderRepository } from "../interfaces/IOrderRepository";


import { Order as IOrder } from "../entities/Order";

@injectable()
export class OrderInteractor implements IOrderInteractor {
    private orderRepository: IOrderRepository;
    constructor(@inject(INTERFACE_TYPE.OrderRepository) orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository;
    }

}