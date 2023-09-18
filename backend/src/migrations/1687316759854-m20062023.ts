import { MigrationInterface, QueryRunner } from 'typeorm';

export class m200620231687316759854 implements MigrationInterface {
  name = 'm200620231687316759854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`deliveries\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`description\` varchar(250) NOT NULL, \`price\` decimal(19,2) NOT NULL DEFAULT '0.00', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`client_addresses\` (\`id\` varchar(36) NOT NULL, \`address\` varchar(200) NOT NULL, \`clientId\` varchar(36) NOT NULL, \`deliveryId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clients\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`name\` varchar(80) NOT NULL, \`lastName\` varchar(80) NOT NULL, \`fullName\` varchar(200) NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`secondaryPhone\` varchar(255) NULL, UNIQUE INDEX \`IDX_b48860677afe62cd96e1265948\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('Admin', 'Staff') NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_images\` (\`id\` varchar(36) NOT NULL, \`default\` tinyint NOT NULL, \`imagePath\` varchar(255) NOT NULL, \`productId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`code\` varchar(30) NOT NULL, \`totalStock\` int NOT NULL DEFAULT '0', \`price\` decimal(19,2) NOT NULL, \`type\` enum ('Simple', 'Package') NOT NULL DEFAULT 'Simple', \`categoryId\` varchar(36) NOT NULL, UNIQUE INDEX \`IDX_7cfc24d6c24f0ec91294003d6b\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`name\` varchar(80) NOT NULL, \`imagePath\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`client_addresses\` ADD CONSTRAINT \`FK_e47066bf9a2848a8233f4be5343\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`client_addresses\` ADD CONSTRAINT \`FK_95d7a3f71dd7ceb82c8c68a88c5\` FOREIGN KEY (\`deliveryId\`) REFERENCES \`deliveries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` ADD CONSTRAINT \`FK_b367708bf720c8dd62fc6833161\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
    await queryRunner.query(`ALTER TABLE \`product_images\` DROP FOREIGN KEY \`FK_b367708bf720c8dd62fc6833161\``);
    await queryRunner.query(`ALTER TABLE \`client_addresses\` DROP FOREIGN KEY \`FK_95d7a3f71dd7ceb82c8c68a88c5\``);
    await queryRunner.query(`ALTER TABLE \`client_addresses\` DROP FOREIGN KEY \`FK_e47066bf9a2848a8233f4be5343\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_7cfc24d6c24f0ec91294003d6b\` ON \`products\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP TABLE \`product_images\``);
    await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_b48860677afe62cd96e1265948\` ON \`clients\``);
    await queryRunner.query(`DROP TABLE \`clients\``);
    await queryRunner.query(`DROP TABLE \`client_addresses\``);
    await queryRunner.query(`DROP TABLE \`deliveries\``);
  }
}
