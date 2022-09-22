import Big from 'big.js';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { stringToBigTransformer } from '../../common/string-to-big.transformer';

@Entity('asset')
export class AssetEntity {
  @PrimaryColumn()
  public id: string;

  @Column({ type: 'timestamp' })
  public createdAt: Date;

  @Column({
    type: 'decimal',
    precision: 32,
    scale: 0,
    default: '0',
    transformer: stringToBigTransformer,
  })
  public appraisalWei: Big;

  @Column({ type: 'timestamp', nullable: true })
  public appraisalUpdatedAt: Date;

  @Column({ nullable: true })
  public name: string;

  @Column()
  public collectionId: string;

  @Column({ nullable: true })
  public owner: string;

  @Column({ type: 'timestamp' })
  public ownerUpdatedAt: Date;

  @Column()
  public tokenId: string;
}
