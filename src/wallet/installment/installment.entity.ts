
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {Transaction} from '../transaction/transaction.entity'

@Entity()
export class Installment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'datetime' })
    due_date: Date;
    @Column()
    paid: boolean;
    @Column('int')
    number: number ;
    @Column({ type: 'decimal', precision: 10, scale: 3 })
    amount  : number;
    @Column()
    transaction_id: Transaction;
    @Column({ type: 'datetime' })
    create_at: Date;
    @Column({ type: 'datetime' })
    updated_at: Date;

}