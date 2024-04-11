import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';
import { NotFoundException } from '@nestjs/common';

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

  it('should call walletRepository.find', async () => {
    const findSpy = jest.spyOn(walletRepository, 'find').mockResolvedValue([]);

    const result = await walletService.findAll();

    expect(findSpy).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should return wallet when ID exists', async () => {
    const walletId = 'existing-wallet-id';
    const existingWallet: Wallet = {
      id: walletId,
      active: true,
      currency: 'USD',
      user_id: 'user-123',
      create_at: new Date(),
      updated_at: new Date(),
      name: 'ronaldo'
    };

    jest.spyOn(walletRepository, 'findOne').mockResolvedValue(existingWallet);

    // const result = await walletService.findOne(walletId);

    expect(await walletService.findOne(walletId)).toEqual(existingWallet);
  });


  it('should throw NotFoundException when ID does not exist', async () => {
    const walletId = 'non-existing-wallet-id';

    jest.spyOn(walletRepository, 'findOne').mockResolvedValue(undefined);

    try {
      await walletService.findOne(walletId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Wallet not found');

    }
  });

  it('should return wallet when ID exists', async () => {
    const walletId = 'existing-wallet-id';
    const updatedWalletData: Partial<Wallet> = {
      name: 'ronaldinho',
    };

    const existingWallet: Wallet = {
      id: walletId,
      active: true,
      currency: 'USD',
      user_id: 'user-123',
      create_at: new Date(),
      updated_at: new Date(),
      name: 'ronaldo'
    };

    jest.spyOn(walletRepository, 'findOne').mockResolvedValue(existingWallet); //findOne will always return existingWallet
    jest.spyOn(walletRepository, 'save').mockResolvedValue({ ...existingWallet, ...updatedWalletData }); //...existingWallet pode contar vários objetos

    const result = await walletService.update(walletId, updatedWalletData);

    expect(result).toEqual({ ...existingWallet, ...updatedWalletData });
  });

  describe('remove', () => {
    it('should remove an existing wallet', async () => {
      // Arrange
      const walletId = 'existing-wallet-id';
      const existingWallet = {
        id: walletId,
        active: true,
        currency: 'USD',
        user_id: 'user-123',
        create_at: new Date(),
        updated_at: new Date(),
        name: 'ronaldo',
      };

      walletService.findOne = jest.fn().mockReturnValue(existingWallet);
      walletService.remove = jest.fn();

      // Act
      await walletService.remove(walletId);

      // // Assert
      expect(walletService.remove).toHaveBeenCalledWith(walletId);
      expect(walletService.remove(walletId)).toBeUndefined();
    });

    it('should throw NotFoundException for non-existing wallet', async () => {
      // Arrange
      const walletId = 'non-existing-wallet-id';
      walletService.findOne = jest.fn().mockRejectedValue(new NotFoundException('Wallet not found'));

      // Act and Assert
      await expect(walletService.remove(walletId)).rejects.toThrow(NotFoundException);
    });
  });

  
  it('should remove all wallets', async () => {
    // Mock the delete method of the walletRepository
    const deleteSpy = jest.spyOn(walletRepository, 'delete').mockResolvedValue(undefined);

   const result = await walletService.removeAll();

    expect(deleteSpy).toHaveBeenCalledWith({});
    expect(result).toBeUndefined()
  });

});


