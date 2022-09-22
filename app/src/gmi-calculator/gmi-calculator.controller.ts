import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GmiCalculatorService } from './gmi-calculator.service';
import { CalculateGmiScoreRequest } from './request/calculate-gmi-score.request';
import { CalculateGmiScoreResponse } from './response/calculate-gmi-score.response';

@ApiTags('gmi')
@Controller()
export class GmiCalculatorController {
  public constructor(private readonly gmiCalculatorService: GmiCalculatorService) {}

  @Get('/gmi/:address')
  @ApiOperation({
    summary: 'Get GMI and rank factors for a wallet',
  })
  @ApiResponse({
    status: 200,
    description: 'gmi and rank factors',
    type: CalculateGmiScoreResponse,
  })
  public async getGmiAndFactors(@Param() params: CalculateGmiScoreRequest): Promise<CalculateGmiScoreResponse> {
    return this.gmiCalculatorService.calculateScoreForWallet(params.address);
  }
}
