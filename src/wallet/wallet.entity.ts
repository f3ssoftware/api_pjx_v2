

import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany, OneToOne, Transaction, JoinColumn } from 'typeorm';
// import { Recurrency } from './recurrency/recurrency.entity';
// import { Group } from './group/group.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ default: true })
    active: boolean;
    @Column({ nullable: true})
    currency: string;
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    user_id: string;
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date;
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // @OneToMany(() => Recurrency, recurrency => recurrency.wallet)
    // @JoinColumn()
    // recurrencies: Recurrency[];

    // @OneToMany(() => Group, groups => groups.wallet)
    // @JoinColumn()
    // groups: Group[];

    // @OneToOne(() => Transaction)
    // @JoinColumn()
    // transaction: Transaction;

    // @AfterInsert()
    // logInsert() {
    //     console.log('Inserted id with id', this.id, 'name with name: ', this.name)
    // }

    // @AfterUpdate()
    // logUpdate() {
    //     console.log('Updated id with id', this.id)
    // }

    // @AfterRemove()
    // logRemove() {
    //     console.log('Removed id with id', this.id)
    // }

}