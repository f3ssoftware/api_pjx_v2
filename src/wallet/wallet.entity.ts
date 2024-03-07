

import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    active: boolean;
    @Column()
    currency: string;
    @Column()
    name: string;
    @Column()
    user_id: string;
    @Column({ type: 'datetime' })
    create_at: Date;
    @Column({ type: 'datetime' })
    updated_at: Date;

    @AfterInsert()
    logInsert() {
        console.log('Inserted id with id', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated id with id', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed id with id', this.id)
    }

}