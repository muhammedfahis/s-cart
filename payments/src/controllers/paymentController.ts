import { IPaymentInteractor } from "../interfaces/IPaymentInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";


@injectable()
export class PaymentController {
    private PaymentInteractor: IPaymentInteractor;
    constructor(@inject(INTERFACE_TYPE.PaymentInteractor) PaymentInteractor: IPaymentInteractor) {
        this.PaymentInteractor = PaymentInteractor;
    }

}