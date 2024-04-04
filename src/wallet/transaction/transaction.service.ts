import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
    ) {}
    async create(transactionData: Partial<Transaction>): Promise<Transaction> {
        const transaction = this.transactionRepository.create(transactionData);
        return await this.transactionRepository.save(transaction);
    }

    async findAll(): Promise<Transaction[]> {
        return await this.transactionRepository.find();
    }

    async findOne(id: string): Promise<Transaction> {
        const transactionId: FindOneOptions<Transaction> = { where: { id } };
        const transaction = await this.transactionRepository.findOne(transactionId);
        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }
        return transaction;
    }

    async update(id: string, transactionData: Partial<Transaction>): Promise<Transaction> {
        const transaction = await this.findOne(id);
        return await this.transactionRepository.save({ ...transaction, ...transactionData });
    }

    async remove(id: string): Promise<void> {
        const transaction = await this.findOne(id);
        await this.transactionRepository.remove(transaction);
    }


}