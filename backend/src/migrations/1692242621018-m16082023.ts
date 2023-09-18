import { MigrationInterface, QueryRunner } from 'typeorm';

export class m160820231692242621018 implements MigrationInterface {
  name = 'm160820231692242621018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order_details\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`orderId\` varchar(36) NOT NULL, \`productId\` varchar(36) NOT NULL, \`price\` decimal(19,2) NOT NULL, \`quantity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`code\` varchar(30) NOT NULL, \`eventAddress\` varchar(200) NULL, \`eventDate\` date NOT NULL, \`prepaid\` decimal(19,2) NOT NULL, \`tax\` decimal(19,2) NOT NULL, \`discount\` decimal(19,2) NOT NULL, \`shipping\` decimal(19,2) NOT NULL, \`subTotal\` decimal(19,2) NOT NULL, \`total\` decimal(19,2) NOT NULL, \`type\` enum ('Internal', 'Web') NOT NULL DEFAULT 'Internal', \`deliveryId\` varchar(36) NULL, \`clientId\` varchar(36) NOT NULL, UNIQUE INDEX \`IDX_3e413c10c595c04c6c70e58a4d\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_147bc15de4304f89a93c7eee969\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_c67ebaba3e5085b6401911acc70\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_0dddcc76db9733e86e566e5e632\` FOREIGN KEY (\`deliveryId\`) REFERENCES \`deliveries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_1457f286d91f271313fded23e53\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_1457f286d91f271313fded23e53\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_0dddcc76db9733e86e566e5e632\``);
    await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_c67ebaba3e5085b6401911acc70\``);
    await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_147bc15de4304f89a93c7eee969\``);
    await queryRunner.query(`DROP INDEX \`IDX_3e413c10c595c04c6c70e58a4d\` ON \`orders\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`order_details\``);
  }
}
