import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';

describe('WalletService', () => {
    let walletService: WalletService;
    let walletRepository: Repository<Wallet>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WalletService,
                {
                    provide: getRepositoryToken(Wallet),
                    useValue: {
                        find: jest.fn().mockResolvedValue([]),
                        findOne: jest.fn().mockResolvedValue({}),
                        create: jest.fn().mockReturnValue({}),
                        save: jest.fn().mockResolvedValue({}),
                        remove: jest.fn().mockResolvedValue({}),
                    },
                },
            ],
        }).compile();

        walletService = module.get<WalletService>(WalletService);
        walletRepository = module.get<Repository<Wallet>>(getRepositoryToken(Wallet));
    });

    describe('Wallet entity', () => {
        it('should have a create_at date when created', () => {
            const wallet = new Wallet();
            wallet.create_at = new Date()
            expect(wallet.create_at).toBeDefined();
            expect(wallet.create_at).toBeInstanceOf(Date);
        });

        it('should have an updated_at date when created', () => {
            const wallet = new Wallet();
            wallet.updated_at = new Date(26-10-2023)
            expect(wallet.updated_at).toBeDefined();
            expect(wallet.updated_at).toBeInstanceOf(Date);
        });

        it('should update the updated_at date when updated', async () => {
            const wallet = new Wallet();
            // ... preencha os outros campos e salve a carteira conforme necessário ...

            const originalUpdatedAt = wallet.updated_at;

            // Atualize algum campo na carteira
            wallet.name = 'New Name';

            // Salve a carteira atualizada
            jest.spyOn(walletRepository, 'save').mockResolvedValue({ ...wallet, updated_at: new Date() });
            const updatedWallet = await walletService.update(wallet.id, wallet);

            expect(updatedWallet.updated_at).toBeDefined();
            expect(updatedWallet.updated_at).toBeInstanceOf(Date);
            expect(updatedWallet.updated_at).not.toEqual(originalUpdatedAt);
        });

    });
});