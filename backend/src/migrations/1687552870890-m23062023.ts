import { MigrationInterface, QueryRunner } from 'typeorm';

export class m230620231687552870890 implements MigrationInterface {
  name = 'm230620231687552870890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
  }
}
