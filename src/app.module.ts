import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from './wallet/walllet.module';
import { Wallet } from './wallet/wallet.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: '123456Ab',
            database: 'postgres',
            entities: [Wallet],
            synchronize: true,

  }),
    WalletModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
