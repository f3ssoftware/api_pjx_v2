import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async create(productData: Partial<Product>): Promise<Product> {
        const product = this.productRepository.create(productData);
        return await this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: string): Promise<Product> {
        const productId: FindOneOptions<Product> = { where: { id } };
        const product = await this.productRepository.findOne(productId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async update(id: string, productData: Partial<Product>): Promise<Product> {
        const product = await this.findOne(id);
        return await this.productRepository.save({ ...product, ...productData });
    }

    async remove(id: string): Promise<void> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
}
