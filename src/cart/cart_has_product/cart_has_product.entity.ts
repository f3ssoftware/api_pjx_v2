
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Cart } from '../cart.entity';
import { Product } from '../product/product.entity';

@Entity()
export class CartHasProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    cart_id: Cart;
    @Column()
    product_id: Product;
    @Column()
    user_id: string;

}