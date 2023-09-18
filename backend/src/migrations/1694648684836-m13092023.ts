import { MigrationInterface, QueryRunner } from 'typeorm';

export class m130920231694648684836 implements MigrationInterface {
  name = 'm130920231694648684836';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`createdBy\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`observations\` longtext NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`observations\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`createdBy\``);
  }
}
