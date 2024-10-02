import { IOrderInteractor } from "../interfaces/IOrderInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";


@injectable()
export class OrderController {
    private orderInteractor: IOrderInteractor;
    constructor(@inject(INTERFACE_TYPE.OrderInteractor) orderInteractor: IOrderInteractor) {
        this.orderInteractor = orderInteractor;
    }

    async getOrder(req: any, res: any, next: any) {
        try {
            console.log(req.currentUser,'currentUser');
         res.status(201).send('ok');
        } catch (error) {
        }
     }

}