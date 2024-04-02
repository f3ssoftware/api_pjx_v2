import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

@Controller('wallets')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Post()
    create(@Body() walletData: Partial<Wallet>): Promise<Wallet> {
        return this.walletService.create(walletData);
    }

    @Get()
    findAll(): Promise<Wallet[]> {
        return this.walletService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Wallet> {
        return this.walletService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() walletData: Partial<Wallet>): Promise<Wallet> {
        return this.walletService.update(id, walletData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.walletService.remove(id);
    }
}
