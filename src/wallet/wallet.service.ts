import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}

    create(walletData: Partial<Wallet>): Promise<Wallet> {
        const wallet = this.walletRepository.create(walletData);
    
        return this.walletRepository.save(wallet);
        
    }

    async findAll(): Promise<Wallet[]> {
        return await this.walletRepository.find();
    }

    async findOne(id: string): Promise<Wallet> {
        const walletId: FindOneOptions<Wallet> = { where: { id } };
        const wallet = await this.walletRepository.findOne(walletId);
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

    async removeAll(): Promise<void> {
        await this.walletRepository.delete({});
    }
}
