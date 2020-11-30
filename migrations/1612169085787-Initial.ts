import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1612169085787 implements MigrationInterface {
    name = 'Initial1612169085787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "data" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "profileId" varchar NOT NULL, "level" int2 NOT NULL DEFAULT (0), "experience" int8 NOT NULL DEFAULT (0), "inventoryId" uuid, CONSTRAINT "REL_13fba937ad130d9285e0f28686" UNIQUE ("inventoryId"), CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_13fba937ad130d9285e0f28686" ON "character" ("inventoryId") `);
        await queryRunner.query(`CREATE TABLE "group" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "name" varchar NOT NULL, "prefix" varchar NOT NULL, "color" varchar NOT NULL, "power" int8 NOT NULL, "permissions" string array NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("uuid" uuid NOT NULL, "name" varchar NOT NULL, "teamspeakUniqueId" varchar, "language" varchar NOT NULL, "lastOnline" timestamptz NOT NULL DEFAULT now(), "timePlayed" int8 NOT NULL DEFAULT (0), "banPoints" int8 NOT NULL DEFAULT (0), "permissions" string array, "creationDate" timestamptz NOT NULL DEFAULT now(), "groupId" uuid, CONSTRAINT "PK_fab5f83a1cc8ebe0076c733fd85" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_87a1d383782d2161924d4b9d7c" ON "profile" ("groupId") `);
        await queryRunner.query(`CREATE TABLE "proxy-config" ("key" varchar NOT NULL, "value" varchar NOT NULL, CONSTRAINT "PK_4c0057309d1878964714e982d8e" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_13fba937ad130d9285e0f286869" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_87a1d383782d2161924d4b9d7ca" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_87a1d383782d2161924d4b9d7ca"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_13fba937ad130d9285e0f286869"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "proxy-config"`);
        await queryRunner.query(`DROP INDEX "profile"@"IDX_87a1d383782d2161924d4b9d7c" CASCADE`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP INDEX "character"@"IDX_13fba937ad130d9285e0f28686" CASCADE`);
        await queryRunner.query(`DROP TABLE "character"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
    }

}
