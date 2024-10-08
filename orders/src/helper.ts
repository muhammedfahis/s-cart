import  { BadRequestError, KafkaConsumer, MessageType, Topics } from "@fayisorg/common-modules";
import { ProductInteractor } from "./interactors/productInteractor";
import { ProductRepository } from "./repositories/productRepository";
import { Product as IProduct } from "./entities/Product";
import { OrderInteractor } from "./interactors/orderInteractor";
import { OrderRepository } from "./repositories/orderRepository";
import { OrderItemRepository } from "./repositories/orderItemRepository";
import { OrderItem as IOrderItem } from "./entities/OrderItem";


export interface ProductData {
    product_id: string,
    quantity: number
}
export interface OrderMessageData {
    items?: ProductData[]
}


export const startKafkaConsumer = async () => {
    const kafkaConsumer = new KafkaConsumer();
    const handleProductEvents = async (message: MessageType): Promise<void> => {
        console.log('Received message:', message);
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
                case Topics.ORDER_EXPIRED:
                    const expiredProductData: IOrderItem[] = [...(message.data as any).items] as IOrderItem[]
                    await handleUpdateStock(expiredProductData);
                    break;

                default:
                    console.warn(`Unhandled event type: ${message.event}`);
            }
        } catch (error) {
            console.error('Error handling message:', error);
            // Implement retry logic or send to a dead-letter queue if needed
        }
    };
kafkaConsumer.subscribe(handleProductEvents,'Catelog_Events');
kafkaConsumer.subscribe(handleProductEvents,'Order_Events');
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

async function handleUpdateStock(data: IOrderItem[]) {
    const productRepository = new ProductRepository();
    data = data.map(product => {
        product.quantity = Math.abs(Number(product.quantity));
        return product;
    })
    await productRepository.updateStock(data);
}