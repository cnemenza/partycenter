import { MigrationInterface, QueryRunner } from 'typeorm';

export class m0907202321688886812235 implements MigrationInterface {
  name = 'm0907202321688886812235';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` ADD UNIQUE INDEX \`IDX_4c9fb58de893725258746385e1\` (\`name\`)`);
    await queryRunner.query(`ALTER TABLE \`products\` ADD UNIQUE INDEX \`IDX_464f927ae360106b783ed0b410\` (\`slug\`)`);
    await queryRunner.query(`ALTER TABLE \`categories\` ADD UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`)`);
    await queryRunner.query(`ALTER TABLE \`categories\` ADD UNIQUE INDEX \`IDX_420d9f679d41281f282f5bc7d0\` (\`slug\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`categories\` DROP INDEX \`IDX_420d9f679d41281f282f5bc7d0\``);
    await queryRunner.query(`ALTER TABLE \`categories\` DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP INDEX \`IDX_464f927ae360106b783ed0b410\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP INDEX \`IDX_4c9fb58de893725258746385e1\``);
  }
}
