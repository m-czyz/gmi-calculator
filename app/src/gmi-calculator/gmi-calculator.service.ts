import { Injectable, NotFoundException } from '@nestjs/common';
import Big from 'big.js';

import { GmiCalculatorRepository } from './gmi-calculator.repository';

@Injectable()
export class GmiCalculatorService {
  public constructor(private readonly gmiCalculatorRepository: GmiCalculatorRepository) {}

  public async calculateScoreForWallet(wallet: string) {
    const walletWithRank = await this.gmiCalculatorRepository.findWalletWithRank(wallet);

    if (!walletWithRank) {
      throw new NotFoundException();
    }

    const walletsCount = await this.gmiCalculatorRepository.countWallets();

    const gmiScore = Big(1000)
      .times(walletsCount - walletWithRank.rank)
      .div(walletsCount)
      .toString();

    return { gmiScore, ...walletWithRank };
  }
}
