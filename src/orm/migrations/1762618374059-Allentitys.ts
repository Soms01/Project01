import {MigrationInterface, QueryRunner} from "typeorm";

export class Allentitys1762618374059 implements MigrationInterface {
    name = 'Allentitys1762618374059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "university_manager" (
                "Id" BIGSERIAL NOT NULL,
                "Fullname" character varying NOT NULL,
                "facultationId" bigint,
                CONSTRAINT "PK_faf3b9c16db40a0e35e6dc76a65" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "facultation" (
                "Id" BIGSERIAL NOT NULL,
                "Name" character varying NOT NULL,
                CONSTRAINT "PK_0576b6c9ff0896fd46fe105fa93" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "specialition" (
                "Id" BIGSERIAL NOT NULL,
                "Name" character varying NOT NULL,
                "Code" smallint NOT NULL,
                "facultationId" bigint,
                CONSTRAINT "PK_67b390a4654cd30ddd031afe0b7" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "student" (
                "Id" BIGSERIAL NOT NULL,
                "Fullname" character varying NOT NULL,
                "specialitionId" bigint,
                CONSTRAINT "PK_95f7181273b6aeb4ffcfe24bbfd" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "practice_place_rating" (
                "Id" BIGSERIAL NOT NULL,
                "rating" smallint NOT NULL,
                CONSTRAINT "PK_19c508ca88c3cfdf2deb05e0af7" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "practice_place_manager" (
                "Id" BIGSERIAL NOT NULL,
                "Fullname" character varying NOT NULL,
                "practicePlaceId" bigint,
                CONSTRAINT "PK_30a5ff8ce6814b7e49a46cb142b" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "City" (
                "Id" BIGSERIAL NOT NULL,
                "Name" character varying NOT NULL,
                CONSTRAINT "PK_2909ede69e6899c1aa249d83053" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "practice_place" (
                "Id" BIGSERIAL NOT NULL,
                "description" text NOT NULL,
                "Name" character varying NOT NULL,
                "Popularity" smallint NOT NULL,
                "cityId" bigint,
                CONSTRAINT "PK_3439706d44e987e8c94c81e1fd0" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "task" (
                "Id" BIGSERIAL NOT NULL,
                "Name" character varying NOT NULL,
                "rating" smallint NOT NULL,
                "applicationId" bigint,
                CONSTRAINT "PK_50bde4df67295bf27cd0b7abe99" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "application" (
                "Id" BIGSERIAL NOT NULL,
                "DateFrom" date NOT NULL,
                "DateTo" date NOT NULL,
                "report" text NOT NULL,
                "type practice" character varying NOT NULL,
                "practicePlaceManagerId" bigint,
                "studentId" bigint,
                "universityManagerId" bigint,
                "practicePlaceId" bigint,
                CONSTRAINT "PK_3f49ea39e661bee8f224d6c1e72" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager"
            ADD CONSTRAINT "FK_cbf152ab2fdb6180f9b6b4dc8a0" FOREIGN KEY ("facultationId") REFERENCES "facultation"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition"
            ADD CONSTRAINT "FK_da964205cda60e8d60e2077b169" FOREIGN KEY ("facultationId") REFERENCES "facultation"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_8eb29e53d2bc6c4912b2cf89395" FOREIGN KEY ("specialitionId") REFERENCES "specialition"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager"
            ADD CONSTRAINT "FK_738b04495e005b2eab2544c2f5f" FOREIGN KEY ("practicePlaceId") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place"
            ADD CONSTRAINT "FK_4333669b56cc7a62475d12cd02c" FOREIGN KEY ("cityId") REFERENCES "City"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_c478e91b58513c1e5601c4545bc" FOREIGN KEY ("applicationId") REFERENCES "application"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_ac55798bfd9ed1ff2a5ee929804" FOREIGN KEY ("practicePlaceManagerId") REFERENCES "practice_place_manager"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_8bd9711f01c7ba0d0a26710f23b" FOREIGN KEY ("studentId") REFERENCES "student"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_fedb183e8ba7638290b81f46a7d" FOREIGN KEY ("universityManagerId") REFERENCES "university_manager"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_ae32df5c66d3ba19d93aa35e268" FOREIGN KEY ("practicePlaceId") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_ae32df5c66d3ba19d93aa35e268"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_fedb183e8ba7638290b81f46a7d"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_8bd9711f01c7ba0d0a26710f23b"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_ac55798bfd9ed1ff2a5ee929804"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_c478e91b58513c1e5601c4545bc"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place" DROP CONSTRAINT "FK_4333669b56cc7a62475d12cd02c"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager" DROP CONSTRAINT "FK_738b04495e005b2eab2544c2f5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_8eb29e53d2bc6c4912b2cf89395"
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition" DROP CONSTRAINT "FK_da964205cda60e8d60e2077b169"
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager" DROP CONSTRAINT "FK_cbf152ab2fdb6180f9b6b4dc8a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            DROP TABLE "application"
        `);
        await queryRunner.query(`
            DROP TABLE "task"
        `);
        await queryRunner.query(`
            DROP TABLE "practice_place"
        `);
        await queryRunner.query(`
            DROP TABLE "City"
        `);
        await queryRunner.query(`
            DROP TABLE "practice_place_manager"
        `);
        await queryRunner.query(`
            DROP TABLE "practice_place_rating"
        `);
        await queryRunner.query(`
            DROP TABLE "student"
        `);
        await queryRunner.query(`
            DROP TABLE "specialition"
        `);
        await queryRunner.query(`
            DROP TABLE "facultation"
        `);
        await queryRunner.query(`
            DROP TABLE "university_manager"
        `);
    }

}
