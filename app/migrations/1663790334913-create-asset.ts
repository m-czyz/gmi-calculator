import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAsset1663790334913 implements MigrationInterface {
  name = 'createAsset1663790334913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "asset"
       (
           "id"                 character varying NOT NULL,
           "createdAt"          TIMESTAMP         NOT NULL,
           "appraisalWei"       numeric(32, 0)    NOT NULL DEFAULT '0',
           "appraisalUpdatedAt" TIMESTAMP,
           "name"               character varying,
           "collectionId"       character varying NOT NULL,
           "owner"              character varying,
           "ownerUpdatedAt"     TIMESTAMP         NOT NULL,
           "tokenId"            character varying NOT NULL,
           CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id")
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "asset"`);
  }
}
