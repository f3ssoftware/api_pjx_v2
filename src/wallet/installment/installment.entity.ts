
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
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

    @OneToOne(() => Transaction)
    transaction: Transaction;
    
    @Column({ type: 'datetime' })
    create_at: Date;
    @Column({ type: 'datetime' })
    updated_at: Date;

}