import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from './wallet/walllet.module';

@Module({
  imports: [TypeOrmModule.forRoot({
  }),
    WalletModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
