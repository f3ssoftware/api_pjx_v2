
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    user_id: string;
    @Column()
    create_at: Date;
    @Column()
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