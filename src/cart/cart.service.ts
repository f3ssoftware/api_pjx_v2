import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) {}
    async create(cartData: Partial<Cart>): Promise<Cart> {
        const cart = this.cartRepository.create(cartData);
        return await this.cartRepository.save(cart);
    }

    async findAll(): Promise<Cart[]> {
        return await this.cartRepository.find();
    }

    async findOne(id: string): Promise<Cart> {
        const cartId: FindOneOptions<Cart> = { where: { id } };
        const cart = await this.cartRepository.findOne(cartId);
        if (!cart) {
            throw new NotFoundException('There is no cart');
        }
        return cart;
    }

    async update(id: string, cartData: Partial<Cart>): Promise<Cart> {
        const cart = await this.findOne(id);
        return await this.cartRepository.save({ ...cart, ...cartData });
    }

    async remove(id: string): Promise<void> {
        const cart = await this.findOne(id);
        await this.cartRepository.remove(cart);
    }


}