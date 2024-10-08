import express from 'express';
import 'reflect-metadata';
import { json } from 'body-parser';
import 'dotenv/config';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError, validateUser } from '@fayisorg/common-modules';

import { OrderRouter } from './routes/order';
import { startKafkaConsumer } from './helper';
import { Product } from './models/productModel';
import { CartRouter } from './routes/cart';
import { Cart } from './models/cartModel';


const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)

app.use(currentUser);
app.use(validateUser());
app.use('/api/orders',OrderRouter);
app.use('/api/cart',CartRouter);
app.all('*', (req, res, next) => {
    next(new NotFoundError())
});
(async() => {
    console.log(await Product.find({}));
})();
startKafkaConsumer();

app.use(errorHandler as express.ErrorRequestHandler);

export { app } ;