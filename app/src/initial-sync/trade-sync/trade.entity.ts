import Big from 'big.js';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

import { stringToBigTransformer } from '../../common/string-to-big.transformer';

@Entity('trade')
export class TradeEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public transactionId: string;

  @Column({ type: 'timestamp' })
  public timestamp: Date;

  @Column({
    type: 'decimal',
    precision: 32,
    scale: 0,
    transformer: stringToBigTransformer,
  })
  public wei: Big;

  @Column()
  public assetId: string;

  @Column()
  public collectionId: string;

  @Column()
  @Index()
  public toAddress: string;

  @Column()
  @Index()
  public fromAddress: string;

  @Column()
  public tokenId: string;
}
