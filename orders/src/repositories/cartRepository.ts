import { injectable } from "inversify";
import { Cart as ICart, CartStatus } from "../entities/Cart";
import { ICartRepository } from "../interfaces/ICartRespository";
import { Cart, CartDoc } from "../models/cartModel";


@injectable()
export class CartRepository implements ICartRepository {
   async create(cart: ICart): Promise<ICart> {
        const newCart = Cart.build(cart);
        return await newCart.save();
    }
   async findById(id: string): Promise<ICart | null> {
        return await Cart.findById(id);
    }
   async findByUserId(userId: string): Promise<ICart | null> {
        return await Cart.findOne({ userId });
    }
   async update(cart: CartDoc ): Promise<ICart> {
        const updatedCart = await cart.save();
        return updatedCart!
    }
   async updateStatus(id: string, status: CartStatus): Promise<ICart> {
        const updatedCart = await Cart.findByIdAndUpdate(id, { status }, { new: true });
        return updatedCart! as ICart;
    }

}