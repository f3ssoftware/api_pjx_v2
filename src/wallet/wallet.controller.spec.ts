import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

describe('WalletController', () => {
  let walletController: WalletController;
  let walletService: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
            removeAll: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    walletController = module.get<WalletController>(WalletController);
    walletService = module.get<WalletService>(WalletService);
  });

  it('should create a wallet', async () => {
    const walletData: Partial<Wallet> = {
      active: true,
      currency: 'USD',
      name: 'My Wallet',
      user_id: '123',
      create_at: new Date(20 - 10 - 2003),
      updated_at: new Date(26 - 11 - 2008)
    };

    const createdWallet = {
      ...walletData,
      id: '1',
      create_at: new Date(),
      updated_at: new Date(),
    };


    jest.spyOn(walletService, 'create').mockResolvedValue(createdWallet as Wallet);

    const result = await walletController.create(walletData as Wallet);

    expect(walletService.create).toHaveBeenCalledWith(walletData);
    expect(result).toEqual(createdWallet);;
  });

  it('should return all wallets', async () => {
    const wallet: Wallet = {
      id: '1',
      active: true,
      currency: 'USD',
      name: 'My Wallet',
      user_id: '123',
      create_at: new Date(),
      updated_at: new Date(),
    };
    const result: Wallet[] = [wallet]; // Adicione a wallet ao array

    jest.spyOn(walletService, 'findAll').mockResolvedValue(result);

    expect(await walletController.findAll()).toBe(result);
  });

  describe('findOne', () => {
    it('should return a wallet', async () => {
      const result = { id: '1', name: 'Test Wallet' };
      jest.spyOn(walletService, 'findOne').mockImplementation(() => Promise.resolve(result as Wallet));

      expect(await walletController.findOne('1')).toBe(result);
    });
  });
  describe('update', () => {
    it('should return an updated wallet', async () => {
      const result = { id: '1', name: 'Updated Wallet' };
      jest.spyOn(walletService, 'update').mockImplementation(() => Promise.resolve(result as Wallet));

      expect(await walletController.update('1', { name: 'Updated Wallet' })).toBe(result);
    });
  });

  describe('remove', () => {
    it('should return void', async () => {
      jest.spyOn(walletService, 'remove').mockImplementation(() => Promise.resolve());

      expect(await walletController.remove('1')).toBeUndefined();
    });
  });

  describe('removeAll', () => {
    it('should return void', async () => {
      jest.spyOn(walletService, 'removeAll').mockImplementation(() => Promise.resolve());

      expect(await walletController.removeAll()).toBeUndefined();
    });
  });
});
