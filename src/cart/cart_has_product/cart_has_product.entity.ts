
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Cart } from '../cart.entity';
import { Product } from '../product/product.entity';

@Entity()
export class CartHasProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Cart, cart => cart.cartHasProduct)
    cart: Cart;

    @OneToMany(() => Product, product => product.cartHasProducts)
    product: Product;

    @Column()
    user_id: string;
}