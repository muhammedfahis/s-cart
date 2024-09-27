import express from 'express';
import { Container } from "inversify";
import { IPaymentRepository } from '../interfaces/IPaymentRepository';
import { INTERFACE_TYPE } from '../utils/appCont';
import { PaymentRepository } from '../repositories/paymentRepository';
import { IPaymentInteractor } from '../interfaces/IPaymentInteractor';
import { PaymentInteractor } from '../interactors/paymentInteractor';
import { PaymentController } from '../controllers/paymentController';
import { requireAuth, validateRequest } from '@fayisorg/common-modules';


const container = new Container();

container.bind<IPaymentRepository>(INTERFACE_TYPE.PaymentRepository).to(PaymentRepository);
container.bind<IPaymentInteractor>(INTERFACE_TYPE.PaymentInteractor).to(PaymentInteractor);
container.bind(INTERFACE_TYPE.PaymentController).to(PaymentController);

const router = express.Router();

const controller = container.get<PaymentController>(INTERFACE_TYPE.PaymentController);



export { router as PaymentRouter} ;