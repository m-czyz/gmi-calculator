import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTrade1663790252004 implements MigrationInterface {
  name = 'createTrade1663790252004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "trade"
                             (
                                 "id"            character varying NOT NULL,
                                 "transactionId" character varying NOT NULL,
                                 "timestamp"     TIMESTAMP         NOT NULL,
                                 "wei"           numeric(32, 0)    NOT NULL,
                                 "assetId"       character varying NOT NULL,
                                 "collectionId"  character varying NOT NULL,
                                 "toAddress"     character varying NOT NULL,
                                 "fromAddress"   character varying NOT NULL,
                                 "tokenId"       character varying NOT NULL,
                                 CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(
      `CREATE INDEX "IDX_169789ea91d49c0882dff0aa04" ON "trade" ("toAddress") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_88df5ccd149c06f1d168076d45" ON "trade" ("fromAddress") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_88df5ccd149c06f1d168076d45"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_169789ea91d49c0882dff0aa04"`,
    );
    await queryRunner.query(`DROP TABLE "trade"`);
  }
}
