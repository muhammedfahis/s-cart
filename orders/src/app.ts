import express from 'express';
import 'reflect-metadata';
import { json } from 'body-parser';
import 'dotenv/config';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@fayisorg/common-modules';

import { OrderRouter } from './routes/order';


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
app.use('/api/orders',OrderRouter);
app.all('*', (req, res, next) => {
    next(new NotFoundError())
});

app.use(errorHandler as express.ErrorRequestHandler);

export { app } ;