import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('synchronization')
export class SynchronizationEntity {
  @PrimaryColumn()
  public id: string;

  @Column({ type: 'timestamp' })
  public synchronizedUntil: Date;

  @Column({ type: 'timestamp' })
  public completedAt: Date;
}
