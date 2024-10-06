import express from 'express';
import { INTERFACE_TYPE } from '../utils/appCont';
import { OrderController } from '../controllers/orderController';
import { appContainer as container } from '../appContainer';
import { createOrderValidator } from '../validators/createOrderValidator';
import { requireAuth, validateRequest } from '@fayisorg/common-modules';
import { getOrderValidator } from '../validators/getOrderValidator';
import { updateOrderStatusValidator } from '../validators/updateOrderStatusValidator';





const router = express.Router();

const controller = container.get<OrderController>(INTERFACE_TYPE.OrderController);

router.post('/',createOrderValidator,validateRequest,requireAuth,controller.createOrder.bind(controller));
router.get('/',requireAuth,controller.getAllOrders.bind(controller));
router.get('/:id',getOrderValidator,validateRequest,requireAuth,controller.getOrderById.bind(controller));
router.patch('/:id',updateOrderStatusValidator,validateRequest,requireAuth,controller.updateOrderStatus.bind(controller));


export { router as OrderRouter} ;