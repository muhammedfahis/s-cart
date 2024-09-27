import { IOrderInteractor } from "../interfaces/IOrderInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";


@injectable()
export class OrderController {
    private orderInteractor: IOrderInteractor;
    constructor(@inject(INTERFACE_TYPE.OrderInteractor) orderInteractor: IOrderInteractor) {
        this.orderInteractor = orderInteractor;
    }

}