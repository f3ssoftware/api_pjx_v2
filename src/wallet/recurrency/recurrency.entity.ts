
import { FrequencyType } from 'src/wallet/enums/frequency-type.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from '../wallet.entity';

@Entity()
export class Recurrency {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    active: boolean;
    @Column({ type: 'decimal', precision: 10, scale: 3 })
    amount: number;
    @Column({ type: 'datetime' })
    base_date: Date;
    @Column()
    frequency: FrequencyType;
    @Column()
    include_weekends: boolean
    @Column()
    observation: string
    @Column()
    paid: boolean
    @Column()
    reference: string
    @Column()
    type: RecurrencyType;
    @Column()
    walled_id: Wallet;
    @Column()
    create_at: Date;
    @Column()
    updated_at: Date;

   

}   