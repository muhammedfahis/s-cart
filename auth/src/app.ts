import express from 'express';
import 'reflect-metadata';
import { json } from 'body-parser';
import 'dotenv/config';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError, KafkaProducer, KafkaConsumer, IProducer, Topics, MessageType, TOPIC_TYPE } from '@fayisorg/common-modules';
import { Producer, Consumer } from 'kafkajs';

import { UserRouter } from './routes/user';


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
app.use('/api/user',UserRouter);
app.all('*', (req, res, next) => {
    next(new NotFoundError())
});

(async() => {
    const producer =  new KafkaProducer();
    await producer.publish({
        topic: 'Auth_Events',
        headers:{},
        event: Topics.TEST,
        message: {
            userId: '123',
            action: 'login'
        }
    });

    const kafkaConsumer = new KafkaConsumer();

 
    const handleOrderEvents = async (message: MessageType): Promise<void> => {
        console.log('Received message:', message);
    
        // Implement your business logic here
        // For example, process the order event
    };
   setTimeout( async() => {
    await kafkaConsumer.subscribe(handleOrderEvents,'Auth_Events');
   },5000)
    
})()

app.use(errorHandler as express.ErrorRequestHandler);

export { app } ;