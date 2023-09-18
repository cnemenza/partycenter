import { MigrationInterface, QueryRunner } from 'typeorm';

export class m120920231694570193008 implements MigrationInterface {
  name = 'm120920231694570193008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`withTax\` tinyint NOT NULL DEFAULT 1`);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`balance\` decimal(19,2) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`balance\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`withTax\``);
  }
}
