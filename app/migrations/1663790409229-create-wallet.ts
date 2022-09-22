import { MigrationInterface, QueryRunner } from 'typeorm';

export class createWallet1663790409229 implements MigrationInterface {
  name = 'createWallet1663790409229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "wallet"
                             (
                                 "address"            character varying NOT NULL,
                                 "lastUpdateAt"       TIMESTAMP         NOT NULL DEFAULT 'now()',
                                 "buyVolumeWei"       numeric(32, 0)    NOT NULL DEFAULT '0',
                                 "sellVolumeWei"      numeric(32, 0)    NOT NULL DEFAULT '0',
                                 "assetsAppraisalWei" numeric(32, 0)    NOT NULL DEFAULT '0',
                                 "assetsCount"        integer           NOT NULL DEFAULT '0',
                                 "totalGainsWei"      numeric(32, 0)    NOT NULL DEFAULT '0',
                                 CONSTRAINT "PK_1dcc9f5fd49e3dc52c6d2393c53" PRIMARY KEY ("address")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "wallet"`);
  }
}
