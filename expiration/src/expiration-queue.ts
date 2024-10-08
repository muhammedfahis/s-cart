import { KafkaProducer, Topics } from '@fayisorg/common-modules';
import Queue from 'bull';



interface Payload {
    orderId: string;
    items:any[];
}

const expirationQueue = new Queue<Payload>('expiration:created', {
    redis:{
        host: process.env.REDIS_HOST
    }
});

expirationQueue.process(async (job) => {
    const producer =  new KafkaProducer();
    await producer.publish({
        topic: 'Order_Events',
        headers:{},
        event: Topics.ORDER_EXPIRED,
        message: {
            orderId: job.data.orderId,
            cancelledBy: 'system',
            items: job.data.items
        }
    });
});

export { expirationQueue };