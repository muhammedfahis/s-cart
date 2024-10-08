import { inject, injectable } from "inversify";
import { Cart as ICart, CartStatus } from "../entities/Cart";
import { ICartInteractor } from "../interfaces/ICartInteractor";
import { INTERFACE_TYPE } from "../utils/appCont";
import { ICartRepository } from "../interfaces/ICartRespository";
import { CartItem as ICartItem } from "../entities/CartItem";
import { Product as IProduct } from "../entities/Product";
import { IProductRepository } from "../interfaces/IProductRepository";
import { BadRequestError } from "@fayisorg/common-modules";
import { Cart } from "../models/cartModel";


@injectable()
export class CartInteractor implements ICartInteractor {
    private cartRepository: ICartRepository;
    private productRepository: IProductRepository
    constructor(@inject(INTERFACE_TYPE.CartRepository) cartRepository: ICartRepository,
        @inject(INTERFACE_TYPE.ProductRepository) productRepository: IProductRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }
    async createCart(cartItem: ICartItem, userId: string): Promise<ICart> {
        const status = CartStatus.Active;
        let totalPrice = 0;
        const product: IProduct | null = await this.productRepository.findOne(cartItem.product);
        if (!product) {
            throw new BadRequestError(`Product with ID ${cartItem.product} not found`);
        }

        if (product.quantity < cartItem.quantity) {
            throw new BadRequestError(`Insufficient stock for product ${product.name}`);
        }
        const itemTotalPrice = product.price * cartItem.quantity;
        let cart = await this.findCartByUserId(userId);

        if (!cart) {
            cart = await this.cartRepository.create({
                items: [],
                status: CartStatus.Active,
                totalPrice: 0,
                userId: userId
            })
        }

        const existingProduct = cart.items.find(item => item.product.toString() === product.id);
        if (existingProduct) {
            existingProduct.quantity += cartItem.quantity;
            existingProduct.totalPrice += itemTotalPrice;
            existingProduct.updatedAt = new Date();
        } else {
            cart.items.push({
                addedAt: new Date(),
                product: product.id!,
                quantity: cartItem.quantity,
                unitPrice: product.price,
                totalPrice: itemTotalPrice,
                updatedAt: new Date(),
            })
        }
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);
        cart.updatedAt = new Date();
        const updatedCart = await this.updateCart(cart.id!,cart);
        console.log(updatedCart);
        return updatedCart;

    }

    async findCartByUserId(userId: string): Promise<ICart | null> {
        return await this.cartRepository.findByUserId(userId);
    }
    async findCartById(id: string): Promise<ICart | null> {
        return await this.cartRepository.findById(id)
    }
    async updateCart(id: string, cart: ICart): Promise<ICart> {
        return await this.cartRepository.update(cart);
    }
    async updateCartStatus(id: string, status: CartStatus): Promise<ICart> {
        return await this.cartRepository.updateStatus(id,status)
    }

}