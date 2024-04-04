
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, Decimal128, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CartHasProduct } from '../cart_has_product/cart_has_product.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @Column()
    thumbnail_url: string;

    @ManyToOne(() => CartHasProduct, cartHasProduct => cartHasProduct.product)
    @JoinColumn()
    cartHasProducts: CartHasProduct[];
}