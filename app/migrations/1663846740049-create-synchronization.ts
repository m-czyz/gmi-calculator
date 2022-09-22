import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSynchronization1663846740049 implements MigrationInterface {
  name = 'createSynchronization1663846740049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "synchronization"
                             (
                                 "id"                character varying NOT NULL,
                                 "synchronizedUntil" TIMESTAMP         NOT NULL,
                                 "completedAt"       TIMESTAMP         NOT NULL,
                                 CONSTRAINT "PK_a3ee337d325420446e170d1681f" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "synchronization"`);
  }
}
