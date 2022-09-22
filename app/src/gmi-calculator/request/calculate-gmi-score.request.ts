import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

export class CalculateGmiScoreRequest {
  @ApiProperty({
    description: 'address',
  })
  @IsEthereumAddress()
  public address: string;
}
