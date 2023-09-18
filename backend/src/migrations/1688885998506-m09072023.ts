import { MigrationInterface, QueryRunner } from 'typeorm';

export class m090720231688885998506 implements MigrationInterface {
  name = 'm090720231688885998506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` ADD \`slug\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`categories\` ADD \`slug\` varchar(80) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`slug\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`slug\``);
  }
}
