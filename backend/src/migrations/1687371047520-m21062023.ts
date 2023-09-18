import { MigrationInterface, QueryRunner } from 'typeorm';

export class m210620231687371047520 implements MigrationInterface {
  name = 'm210620231687371047520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` ADD \`enabled\` tinyint NOT NULL DEFAULT 1`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`enabled\``);
  }
}
