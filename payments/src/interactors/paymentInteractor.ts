import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { IPaymentInteractor } from "../interfaces/IPaymentInteractor";
import { IPaymentRepository } from "../interfaces/IPaymentRepository";

@injectable()
export class PaymentInteractor implements IPaymentInteractor {
    private PaymentRepository: IPaymentRepository;
    constructor(@inject(INTERFACE_TYPE.PaymentRepository) PaymentRepository: IPaymentRepository) {
        this.PaymentRepository = PaymentRepository;
    }

}