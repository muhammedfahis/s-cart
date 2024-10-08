import  { BadRequestError, KafkaConsumer, MessageType, Topics } from "@fayisorg/common-modules";
import { expirationQueue } from "./expiration-queue";



export interface OrderData {
    id: string;
    expiresAt: Date;
    items: any[];
}

export const startKafkaConsumer = async () => {
    const kafkaConsumer = new KafkaConsumer();
    const handleOrderEvents = async (message: MessageType): Promise<void> => {
        console.log('Received message:', message);
        try {
            switch (message.event) {
                case Topics.CREATE_ORDER:
                   await handleCreateOrder({ id: message.data.id , 
                    expiresAt: message.data.expiresAt ,items: message.data.items } as OrderData);
                   break;
                default:
                    console.warn(`Unhandled event type: ${message.event}`);
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    };
await kafkaConsumer.subscribe(handleOrderEvents,'Order_Events');
}

async function handleCreateOrder (data: OrderData) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(delay,'dely');
    
    await expirationQueue.add({
      orderId: data.id,
      items: data.items
    },
    {
      delay
    }
  );
}


