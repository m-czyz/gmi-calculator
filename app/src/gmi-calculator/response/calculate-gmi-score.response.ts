import { ApiProperty } from '@nestjs/swagger';

export class CalculateGmiScoreResponse {
  @ApiProperty()
  public address: string;

  @ApiProperty()
  public totalGainsWei: string;

  @ApiProperty()
  public sellVolumeWei: string;

  @ApiProperty()
  public buyVolumeWei: string;

  @ApiProperty()
  public assetsCount: string;

  @ApiProperty()
  public assetsAppraisalWei: string;

  @ApiProperty()
  public rank: number;
}
