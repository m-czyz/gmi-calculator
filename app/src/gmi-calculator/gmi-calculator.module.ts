import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletEntity } from '../initial-sync/wallet-sync/wallet.entity';
import { GmiCalculatorController } from './gmi-calculator.controller';
import { GmiCalculatorRepository } from './gmi-calculator.repository';
import { GmiCalculatorService } from './gmi-calculator.service';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity])],
  providers: [GmiCalculatorService, GmiCalculatorRepository],
  controllers: [GmiCalculatorController],
})
export class GmiCalculatorModule {}
