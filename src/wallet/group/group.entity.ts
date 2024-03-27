
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Transaction, ManyToOne } from 'typeorm';
import { Wallet } from '../wallet.entity';

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    label: string;
    @Column()
    color: string;

    @ManyToOne(() => Wallet, wallet => wallet.groups)
    wallet: Wallet;

    @Column()
    create_at: Date;
    @Column()
    updated_at: Date;

    @OneToOne(() => Transaction,)
    @JoinColumn()
    transaction: Transaction;

}