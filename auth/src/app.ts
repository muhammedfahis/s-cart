import * as trpcExpress from "@trpc/server/adapters/express";
import { t, createContext } from "./trpc";

import express from 'express';
import 'reflect-metadata';
import { json } from 'body-parser';
import 'dotenv/config';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError, KafkaProducer, KafkaConsumer, IProducer, Topics, MessageType, TOPIC_TYPE } from '@fayisorg/common-modules';
import { userRouter } from './routes/user';


const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)
const appRouter = t.router({
    user: userRouter
  });
  
export type AppRouter = typeof appRouter;
  
app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
      onError({ error, path, type, input, ctx, req }) {
        console.error(`tRPC Error on ${type} "${path}":`, error);
    },
    })
  );


app.use(currentUser);
// app.use('/api/users',userRouter);
app.all('*', (req, res, next) => {
    next(new NotFoundError())
});

app.use(errorHandler as express.ErrorRequestHandler);

export { app } ;