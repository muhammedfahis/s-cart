import express from 'express';
import { INTERFACE_TYPE } from '../utils/appCont';
import { ProductController } from '../controllers/productController';
import { requireAuth, validateRequest } from '@fayisorg/common-modules';
import { createProductValidator } from '../validators/createProductValidator';

import { appContainer as container } from '../appContainer';
import { updateProductValidator } from '../validators/updateProductValidator';
import { deleteProductValidator } from '../validators/deleteProductValidator';
import { getProductValidator } from '../validators/getProductValidator';






const router = express.Router();

const controller = container.get<ProductController>(INTERFACE_TYPE.ProductController);

router.post('/',requireAuth,createProductValidator,validateRequest,controller.createProduct.bind(controller));
router.get('/',requireAuth,controller.getAllProducts.bind(controller));
router.put('/:id',requireAuth,updateProductValidator,validateRequest,controller.updateProduct.bind(controller));
router.delete('/:id',requireAuth,deleteProductValidator,validateRequest,controller.deleteProduct.bind(controller));
router.get('/:id',requireAuth,getProductValidator,validateRequest,controller.getProduct.bind(controller));

export { router as ProductRouter} ;