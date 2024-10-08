import { Cart as ICart } from "../entities/Cart";
import { CartItem as ICartItem } from "../entities/CartItem";
import { CartStatus } from "../entities/Cart";

export interface ICartInteractor {
    createCart(cartItems: ICartItem, userId:string): Promise<ICart>;
    findCartByUserId(userId: string): Promise<ICart | null>;
    findCartById(id: string): Promise<ICart | null>;
    updateCart(id: string, cart: ICart): Promise<ICart>;
    updateCartStatus(id: string, status: CartStatus): Promise<ICart>
}