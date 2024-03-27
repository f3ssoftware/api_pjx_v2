
import { Entity, Column, PrimaryGeneratedColumn, Decimal128, OneToOne, JoinColumn} from 'typeorm';
import { Group } from '../group/group.entity';
import { Wallet } from '../wallet.entity';
import { Installment } from '../installment/installment.entity';

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
    
    @OneToOne(() => Group, group_id => group_id.transaction)
    group_id: Group;

    @OneToOne(() => Wallet, wallet => wallet.transaction)
    wallet: Wallet;
    
    @OneToOne(() => Installment)
    @JoinColumn()
    installment: Installment;

    @Column({ type: 'datetime' })
    created_at: Date;
    @Column({ type: 'datetime' })
    updated_at: Date;

}