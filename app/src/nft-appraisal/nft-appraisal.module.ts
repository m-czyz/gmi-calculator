import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { NftAppraisalService } from './nft-appraisal.service';

@Module({
  imports: [HttpModule],
  providers: [NftAppraisalService],
  exports: [NftAppraisalService],
})
export class NftAppraisalModule {}
