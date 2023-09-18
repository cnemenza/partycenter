import { MigrationInterface, QueryRunner } from 'typeorm';

export class m150920231694818900723 implements MigrationInterface {
  name = 'm150920231694818900723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order_payments\` (\`id\` varchar(36) NOT NULL, \`prepaid\` decimal(19,2) NOT NULL, \`balance\` decimal(19,2) NOT NULL, \`type\` enum ('Manual', 'Paypal') NOT NULL DEFAULT 'Manual', \`entityId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`order_details\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`order_details\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`balance\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`prepaid\``);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`orderPaymentId\` varchar(36) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD UNIQUE INDEX \`IDX_2615431b17ba361a9d4619f68e\` (\`orderPaymentId\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_2615431b17ba361a9d4619f68e\` ON \`orders\` (\`orderPaymentId\`)`);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_2615431b17ba361a9d4619f68e1\` FOREIGN KEY (\`orderPaymentId\`) REFERENCES \`order_payments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_2615431b17ba361a9d4619f68e1\``);
    await queryRunner.query(`DROP INDEX \`REL_2615431b17ba361a9d4619f68e\` ON \`orders\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP INDEX \`IDX_2615431b17ba361a9d4619f68e\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`orderPaymentId\``);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`prepaid\` decimal(19,2) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`balance\` decimal(19,2) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`order_details\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    await queryRunner.query(`DROP TABLE \`order_payments\``);
  }
}
