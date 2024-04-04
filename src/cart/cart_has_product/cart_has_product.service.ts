import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CartHasProduct } from './cart_has_product.entity';

@Injectable()
export class CartHasProductService {
    constructor(
        @InjectRepository(CartHasProduct)
        private readonly cartHasProductRepository: Repository<CartHasProduct>,
    ) {}

    async create(cartHasProductData: Partial<CartHasProduct>): Promise<CartHasProduct> {
        const cartHasProduct = this.cartHasProductRepository.create(cartHasProductData);
        return await this.cartHasProductRepository.save(cartHasProduct);
    }

    async findAll(): Promise<CartHasProduct[]> {
        return await this.cartHasProductRepository.find();
    }

    async findOne(id: string): Promise<CartHasProduct> {
        const cartHasProductId: FindOneOptions<CartHasProduct> = { where: { id } };
        const cartHasProduct = await this.cartHasProductRepository.findOne(cartHasProductId);
        if (!cartHasProduct) {
            throw new NotFoundException('Cart doesnt have product');
        }
        return cartHasProduct;
    }

    async update(id: string, cartHasProductData: Partial<CartHasProduct>): Promise<CartHasProduct> {
        const cartHasProduct = await this.findOne(id);
        return await this.cartHasProductRepository.save({ ...cartHasProduct, ...cartHasProductData });
    }

    async remove(id: string): Promise<void> {
        const cartHasProduct = await this.findOne(id);
        await this.cartHasProductRepository.remove(cartHasProduct);
    }
}
