// Test to verify if the method save com WalletService.create are being correctly called when user 
// sends to it some WalletData info.

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

describe('WalletService', () => {
  let walletService: WalletService;
  let walletRepository: Repository<Wallet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: getRepositoryToken(Wallet),
          useClass: Repository,
        },
      ],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
    walletRepository = module.get<Repository<Wallet>>(getRepositoryToken(Wallet));
  });

  it('should create a wallet', async () => {
    const walletData: Partial<Wallet> = {
      currency: 'BRL',
      user_id: '1',
    };

    const createdWallet: Wallet = {
      id: '1',
      active: true,
      currency: walletData.currency,
      name: 'Fernando',
      user_id: '2',
      create_at: new Date(),
      updated_at: new Date(),
      // ...walletData,
    };

    jest.spyOn(walletRepository, 'create').mockReturnValue(createdWallet);
    jest.spyOn(walletRepository, 'save').mockResolvedValue(createdWallet);

    const result = await walletService.create(walletData);

    expect(result).toEqual(createdWallet);
  });

  it('should call walletRepository.create with the correct data', async () => {
    const walletData: Partial<Wallet> = {
      currency: 'BRL',
      user_id: '1',
    };

    const createdWallet: Wallet = {
      id: '1',
      active: true,
      currency: walletData.currency,
      name: 'Fernando',
      user_id: '2',
      create_at: new Date(),
      updated_at: new Date(),
    };

    jest.spyOn(walletRepository, 'create').mockReturnValue(createdWallet);
    jest.spyOn(walletRepository, 'save').mockResolvedValue(createdWallet);


    await walletService.create(walletData);

    expect(walletRepository.create).toHaveBeenCalledWith(walletData);
  });

  
});


