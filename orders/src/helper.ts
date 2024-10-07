import  { BadRequestError, KafkaConsumer, MessageType, Topics } from "@fayisorg/common-modules";
import { ProductInteractor } from "./interactors/productInteractor";
import { ProductRepository } from "./repositories/productRepository";
import { Product as IProduct } from "./entities/Product";




export const startKafkaConsumer = async () => {
    const kafkaConsumer = new KafkaConsumer();
    const handleProductEvents = async (message: MessageType): Promise<void> => {
        console.log('Received message:', message);
        console.log(Topics.UPDATE_PRODUCT === message.event);
        try {
            switch (message.event) {
                case Topics.CREATE_PRODUCT:
                    await handleCreateProduct({
                        id: message.data.id,
                        name: message.data.name,
                        description: message.data.description,
                        price: message.data.price,
                        category: message.data.category,
                        imageUrl: message.data.imageUrl,
                        quantity: message.data.quantity,
                    } as IProduct);
                    break;

                case Topics.UPDATE_PRODUCT:
                    await handleUpdateProduct({
                        id: message.data.id,
                        name: message.data.name,
                        description: message.data.description,
                        price: message.data.price,
                        category: message.data.category,
                        imageUrl: message.data.imageUrl,
                        quantity: message.data.quantity,
                    } as IProduct);
                    break;
                case Topics.DELETE_PRODUCT:
                    await handleDeleteProduct({
                        id: message.data.id,
                    } as IProduct);
                    break;

                default:
                    console.warn(`Unhandled event type: ${message.event}`);
            }
        } catch (error) {
            console.error('Error handling message:', error);
            // Implement retry logic or send to a dead-letter queue if needed
        }
    };
await kafkaConsumer.subscribe(handleProductEvents,'Catelog_Events');
}

async function handleCreateProduct (data: IProduct) {
    const productInteractor = new ProductInteractor(new ProductRepository());
   await productInteractor.createProduct({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl,
        quantity: data.quantity
    });
}

async function handleUpdateProduct (data: IProduct) {
    const productInteractor = new ProductInteractor(new ProductRepository());
   await productInteractor.updateProduct(String(data.id), {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl,
        quantity: data.quantity
    });
}
async function handleDeleteProduct (data: IProduct) {
    const productInteractor = new ProductInteractor(new ProductRepository());
    await productInteractor.deleteProduct(String(data.id));
}