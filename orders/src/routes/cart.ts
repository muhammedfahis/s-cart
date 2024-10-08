import express from 'express';
import { INTERFACE_TYPE } from '../utils/appCont';
import { appContainer as container } from '../appContainer';
import { requireAuth, validateRequest } from '@fayisorg/common-modules';
import { CartController } from '../controllers/cartController';
import { createCartValidator } from '../validators/createCartValidator';
import { getCartValidator } from '../validators/getCartValidator';
import { updateCartStatusValidator } from '../validators/updateCartStatusValidator';





const router = express.Router();

const controller = container.get<CartController>(INTERFACE_TYPE.CartController);

router.post('/',requireAuth,createCartValidator,validateRequest,controller.createCart.bind(controller));
router.get('/',requireAuth,controller.getCartByUserId.bind(controller));
router.get('/:id',requireAuth,getCartValidator,validateRequest,controller.getCartById.bind(controller));
router.patch('/:id',requireAuth,updateCartStatusValidator,validateRequest,controller.updateCartStatus.bind(controller));



export { router as CartRouter} ;