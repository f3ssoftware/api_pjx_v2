
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
    @Column()
    wallet_id: Wallet;
    @Column()
    create_at: Date;
    @Column()
    updated_at: Date;

}