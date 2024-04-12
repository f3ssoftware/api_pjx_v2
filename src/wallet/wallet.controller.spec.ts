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
    expect(result).toEqual(createdWallet);

    //Here I'll do test for create_at and updated_at only to have 100% of test coverage for the entity Wallet
    expect(result.create_at).toBeDefined();
    expect(result.create_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeDefined();
    expect(result.updated_at).toBeInstanceOf(Date);
  });
});
