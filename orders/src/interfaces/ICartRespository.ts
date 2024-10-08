import { Cart as ICart } from "../entities/Cart";
import { CartStatus } from "../entities/Cart";


export interface ICartRepository {
    create(cart: ICart): Promise<ICart>;
    findById(id: string): Promise<ICart | null>;
    findByUserId(userId: string): Promise<ICart | null>;
    update(cart: ICart): Promise<ICart>;
    updateStatus(id: string, status: CartStatus): Promise<ICart>;
}