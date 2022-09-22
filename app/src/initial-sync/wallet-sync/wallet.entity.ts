import Big from 'big.js';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { stringToBigTransformer } from '../../common/string-to-big.transformer';

@Entity('wallet')
export class WalletEntity {
  @PrimaryColumn()
  public address: string;

  @Column({ type: 'timestamp', default: 'now()' })
  public lastUpdateAt: Date;

  @Column({
    type: 'decimal',
    precision: 32,
    scale: 0,
    transformer: stringToBigTransformer,
    default: '0',
  })
  public buyVolumeWei: Big;

  @Column({
    type: 'decimal',
    precision: 32,
    scale: 0,
    transformer: stringToBigTransformer,
    default: '0',
  })
  public sellVolumeWei: Big;

  @Column({
    type: 'decimal',
    precision: 32,
    scale: 0,
    transformer: stringToBigTransformer,
    default: '0',
  })
  public assetsAppraisalWei: Big;

  @Column({
    type: 'integer',
    transformer: stringToBigTransformer,
    default: '0',
  })
  public assetsCount: Big;

  @Column({
    type: 'decimal',
    precision: 32,
    scale: 0,
    transformer: stringToBigTransformer,
    default: '0',
  })
  public totalGainsWei: Big;
}
