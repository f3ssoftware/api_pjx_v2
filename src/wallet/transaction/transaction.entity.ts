
import { Entity, Column, PrimaryGeneratedColumn, Decimal128} from 'typeorm';
import { Group } from '../group/group.entity';
import { Wallet } from '../wallet.entity';

@Entity()
export class Transaction{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'decimal', precision: 10, scale: 3 })
    amount: number;
    @Column({ type: 'datetime' })
    due_date: Date;
    @Column({ type: 'decimal', precision: 10, scale: 3 })
    fee_amount: number;
    @Column({ type: 'decimal', precision: 10, scale: 3 })
    fine_amount: number;
    @Column()
    group_id: Group;
    @Column()
    wallet_id: Wallet;
    @Column({ type: 'datetime' })
    created_at: Date;
    @Column({ type: 'datetime' })
    updated_at: Date;

}