
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany, OneToOne } from 'typeorm';
import { Product } from './product/product.entity';
import { CartHasProduct } from './cart_has_product/cart_has_product.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    create_at: Date;

    @Column()
    updated_at: Date;

    @OneToOne(() => CartHasProduct, cartHasProduct => cartHasProduct.cart)
    cartHasProduct: CartHasProduct;
}