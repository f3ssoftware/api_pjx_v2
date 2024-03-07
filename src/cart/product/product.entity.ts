
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, Decimal128 } from 'typeorm';

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
    thumbnail_url: string

}