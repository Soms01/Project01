import {MigrationInterface, QueryRunner} from "typeorm";

export class Allentitis1765904719937 implements MigrationInterface {
    name = 'Allentitis1765904719937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating"
            ADD "practicePlaceId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating"
            ADD "studentId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager" DROP CONSTRAINT "FK_738b04495e005b2eab2544c2f5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager"
            ALTER COLUMN "practicePlaceId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager" DROP CONSTRAINT "FK_cbf152ab2fdb6180f9b6b4dc8a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager"
            ALTER COLUMN "facultationId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition" DROP CONSTRAINT "FK_da964205cda60e8d60e2077b169"
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition"
            ALTER COLUMN "facultationId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_8eb29e53d2bc6c4912b2cf89395"
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ALTER COLUMN "specialitionId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_c478e91b58513c1e5601c4545bc"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ALTER COLUMN "applicationId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_ae32df5c66d3ba19d93aa35e268"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_8bd9711f01c7ba0d0a26710f23b"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_ac55798bfd9ed1ff2a5ee929804"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_fedb183e8ba7638290b81f46a7d"
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "practicePlaceId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "studentId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "practicePlaceManagerId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "universityManagerId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place" DROP CONSTRAINT "FK_4333669b56cc7a62475d12cd02c"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place"
            ALTER COLUMN "cityId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager"
            ADD CONSTRAINT "FK_738b04495e005b2eab2544c2f5f" FOREIGN KEY ("practicePlaceId") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
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
            ALTER TABLE "practice_place_rating"
            ADD CONSTRAINT "FK_9df90d89e38576ddf00d3cb5267" FOREIGN KEY ("practicePlaceId") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating"
            ADD CONSTRAINT "FK_ad2016ee6c30ed03cea9556bf8b" FOREIGN KEY ("studentId") REFERENCES "student"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_8eb29e53d2bc6c4912b2cf89395" FOREIGN KEY ("specialitionId") REFERENCES "specialition"("Id") ON DELETE CASCADE ON UPDATE CASCADE
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
        await queryRunner.query(`
            ALTER TABLE "practice_place"
            ADD CONSTRAINT "FK_4333669b56cc7a62475d12cd02c" FOREIGN KEY ("cityId") REFERENCES "City"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "practice_place" DROP CONSTRAINT "FK_4333669b56cc7a62475d12cd02c"
        `);
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
            ALTER TABLE "student" DROP CONSTRAINT "FK_8eb29e53d2bc6c4912b2cf89395"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP CONSTRAINT "FK_ad2016ee6c30ed03cea9556bf8b"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP CONSTRAINT "FK_9df90d89e38576ddf00d3cb5267"
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition" DROP CONSTRAINT "FK_da964205cda60e8d60e2077b169"
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager" DROP CONSTRAINT "FK_cbf152ab2fdb6180f9b6b4dc8a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager" DROP CONSTRAINT "FK_738b04495e005b2eab2544c2f5f"
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
            ALTER TABLE "practice_place"
            ALTER COLUMN "cityId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place"
            ADD CONSTRAINT "FK_4333669b56cc7a62475d12cd02c" FOREIGN KEY ("cityId") REFERENCES "City"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "universityManagerId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "practicePlaceManagerId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "studentId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ALTER COLUMN "practicePlaceId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_fedb183e8ba7638290b81f46a7d" FOREIGN KEY ("universityManagerId") REFERENCES "university_manager"("Id") ON DELETE CASCADE ON UPDATE CASCADE
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
            ADD CONSTRAINT "FK_ae32df5c66d3ba19d93aa35e268" FOREIGN KEY ("practicePlaceId") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ALTER COLUMN "applicationId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_c478e91b58513c1e5601c4545bc" FOREIGN KEY ("applicationId") REFERENCES "application"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ALTER COLUMN "specialitionId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_8eb29e53d2bc6c4912b2cf89395" FOREIGN KEY ("specialitionId") REFERENCES "specialition"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition"
            ALTER COLUMN "facultationId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition"
            ADD CONSTRAINT "FK_da964205cda60e8d60e2077b169" FOREIGN KEY ("facultationId") REFERENCES "facultation"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager"
            ALTER COLUMN "facultationId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager"
            ADD CONSTRAINT "FK_cbf152ab2fdb6180f9b6b4dc8a0" FOREIGN KEY ("facultationId") REFERENCES "facultation"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager"
            ALTER COLUMN "practicePlaceId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager"
            ADD CONSTRAINT "FK_738b04495e005b2eab2544c2f5f" FOREIGN KEY ("practicePlaceId") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP COLUMN "studentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP COLUMN "practicePlaceId"
        `);
    }

}
