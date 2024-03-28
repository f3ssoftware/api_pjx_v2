import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}

    async create(walletData: Partial<Wallet>): Promise<Wallet> {
        const wallet = this.walletRepository.create(walletData);
        return await this.walletRepository.save(wallet);
    }

    async findAll(): Promise<Wallet[]> {
        return await this.walletRepository.find();
    }

    async findOne(id: string): Promise<Wallet> {
        const wallet = await this.walletRepository.findOne(id);
        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }
        return wallet;
    }

    async update(id: string, walletData: Partial<Wallet>): Promise<Wallet> {
        const wallet = await this.findOne(id);
        return await this.walletRepository.save({ ...wallet, ...walletData });
    }

    async remove(id: string): Promise<void> {
        const wallet = await this.findOne(id);
        await this.walletRepository.remove(wallet);
    }
}
