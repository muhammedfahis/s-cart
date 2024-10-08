import { BadRequestError, KafkaConsumer, MessageType, Topics } from "@fayisorg/common-modules";
import { ProductInteractor } from "./interactors/productInteractor";
import { ProductRepository } from "./repositories/productRepository";
import { Product as IProduct } from "./entities/Product";


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
        console.log('Received message:CREATE_ORDER-PRODUCT-SERVICE', message);
        try {
            switch (message.event) {
                case Topics.CREATE_ORDER:
                    const productData: ProductData[] = [...(message.data as any).items].map((order: any) => {
                        //want to decreament the stock data
                        return { product_id: order.product_id, quantity: -Math.abs(Number(order.quantity)) } as ProductData;
                    });
                    await handleCreateOrder(productData);
                    break;
                case Topics.ORDER_EXPIRED:
                    const expiredProductData: ProductData[] = [...(message.data as any).items].map((order: any) => {
                        //want to increament the stock data
                        return { product_id: order.product_id, quantity: Math.abs(Number(order.quantity)) } as ProductData;
                    });
                    await handleUpdateProduct(expiredProductData);
                    break;
                default:
                    console.warn(`Unhandled event type: ${message.event}`);
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    };
    await kafkaConsumer.subscribe(handleProductEvents, 'Order_Events');
}

async function handleCreateOrder(data: ProductData[]) {
    console.log('DATA:CREATE_ORDER-PRODUCT-SERVICE', data);
    const productInteractor = new ProductInteractor(new ProductRepository());
    await productInteractor.updateStock(data)
}

async function handleUpdateProduct(data: ProductData[]) {
    const productInteractor = new ProductInteractor(new ProductRepository());
    await productInteractor.updateStock(data);
}

