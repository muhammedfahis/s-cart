import express from 'express';
import 'reflect-metadata';
import { json } from 'body-parser';
import 'dotenv/config';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, validateUser, NotFoundError } from '@fayisorg/common-modules';

import { PaymentRouter } from './routes/payment';


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
app.use(validateUser())
app.use('/api/orders',PaymentRouter);
app.all('*', (req, res, next) => {
    next(new NotFoundError())
});

app.use(errorHandler as express.ErrorRequestHandler);

export { app } ;