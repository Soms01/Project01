import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTest1770556879195 implements MigrationInterface {
    name = 'UpdateTest1770556879195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager" DROP CONSTRAINT "FK_738b04495e005b2eab2544c2f5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager" DROP CONSTRAINT "FK_cbf152ab2fdb6180f9b6b4dc8a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition" DROP CONSTRAINT "FK_da964205cda60e8d60e2077b169"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP CONSTRAINT "FK_9df90d89e38576ddf00d3cb5267"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP CONSTRAINT "FK_ad2016ee6c30ed03cea9556bf8b"
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_8eb29e53d2bc6c4912b2cf89395"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_c478e91b58513c1e5601c4545bc"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_ac55798bfd9ed1ff2a5ee929804"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_8bd9711f01c7ba0d0a26710f23b"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_fedb183e8ba7638290b81f46a7d"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_ae32df5c66d3ba19d93aa35e268"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place" DROP CONSTRAINT "FK_4333669b56cc7a62475d12cd02c"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager"
            ADD "practice_place_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager"
            ADD "facultation_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition"
            ADD "facultation_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating"
            ADD "practice_place_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating"
            ADD "student_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD "specialition_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "application_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD "practice_place_manager_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD "student_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD "university_manager_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD "practice_place_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place"
            ADD "city_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager"
            ADD CONSTRAINT "FK_efdc9167786726b6b0ff2d028ae" FOREIGN KEY ("practice_place_id") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager"
            ADD CONSTRAINT "FK_822705e6608cda5a2febda6ccf1" FOREIGN KEY ("facultation_id") REFERENCES "facultation"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition"
            ADD CONSTRAINT "FK_bde2bf1aaa774140ff71591ea19" FOREIGN KEY ("facultation_id") REFERENCES "facultation"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating"
            ADD CONSTRAINT "FK_fa8ef7394c672fa07c8ff77e002" FOREIGN KEY ("practice_place_id") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating"
            ADD CONSTRAINT "FK_18aff943c1522579211632ac1a9" FOREIGN KEY ("student_id") REFERENCES "student"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_226ca3cdc4e18b1ea04a034a128" FOREIGN KEY ("specialition_id") REFERENCES "specialition"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_060e88be2ae06dedf558ab2f242" FOREIGN KEY ("application_id") REFERENCES "application"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_5cf579bc2f6e8a2f0d7d8e05dbc" FOREIGN KEY ("practice_place_manager_id") REFERENCES "practice_place_manager"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_1d5ec9d033a54824dac61df274d" FOREIGN KEY ("student_id") REFERENCES "student"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_f5c64a2280f7a0584e2e9cbf5f6" FOREIGN KEY ("university_manager_id") REFERENCES "university_manager"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_313a076642ce502a5cde665c040" FOREIGN KEY ("practice_place_id") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place"
            ADD CONSTRAINT "FK_a94d66d7675f0501ad6d7885aef" FOREIGN KEY ("city_id") REFERENCES "City"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            DO $$
            BEGIN
                -- 1. Створення ролей
                -------------------------------------------------
                IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'student_group') THEN
                    CREATE ROLE student_group WITH NOLOGIN;
                END IF;

                IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'uni_manager_group') THEN
                    CREATE ROLE uni_manager_group WITH NOLOGIN;
                END IF;

                IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'practice_manager_group') THEN
                    CREATE ROLE practice_manager_group WITH NOLOGIN;
                END IF;

                IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'hr_group') THEN
                    CREATE ROLE hr_group WITH NOLOGIN;
                END IF;


                -- 2. Права для СТУДЕНТА
                -------------------------------------------------
                -- УВАГА: "City" з великої літери, "specialition" (як у базі), "application" (з маленької, дві 'p' якщо правильно, але у вас в логах 'application')
                
                GRANT SELECT ON "City", "practice_place", "facultation", "specialition", "university_manager", "practice_place_manager" TO student_group;
                
                GRANT SELECT, INSERT ON "application" TO student_group;
                GRANT UPDATE("report") ON "application" TO student_group;
                GRANT SELECT ON "task" TO student_group;
                GRANT INSERT, SELECT ON "practice_place_rating" TO student_group;


                -- 3. Права для КПМП
                -------------------------------------------------
                GRANT SELECT ON "student", "application", "specialition" TO practice_manager_group;
                GRANT ALL PRIVILEGES ON "task" TO practice_manager_group;
                GRANT UPDATE ON "application" TO practice_manager_group;


                -- 4. Права для КПУ
                -------------------------------------------------
                GRANT SELECT ON "student", "application", "practice_place", "specialition", "facultation" TO uni_manager_group;
                GRANT UPDATE("DateFrom", "DateTo") ON "application" TO uni_manager_group;


                -- 5. Права для HR
                -------------------------------------------------
                GRANT ALL PRIVILEGES ON "City", "facultation", "specialition", "student", "university_manager", "practice_place_manager", "practice_place" TO hr_group;
                GRANT SELECT ON "application", "practice_place_rating", "task" TO hr_group;


                -- 6. Sequences (Лічильники ID)
                -------------------------------------------------
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO student_group;
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO practice_manager_group;
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO hr_group;
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO uni_manager_group;


                -- 7. Прив'язка connect_user
                -------------------------------------------------
                IF EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'connect_user') THEN
                    GRANT student_group TO connect_user;
                    GRANT uni_manager_group TO connect_user;
                    GRANT practice_manager_group TO connect_user;
                    GRANT hr_group TO connect_user;
                END IF;

            END
            $$;
        `);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "practice_place" DROP CONSTRAINT "FK_a94d66d7675f0501ad6d7885aef"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_313a076642ce502a5cde665c040"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_f5c64a2280f7a0584e2e9cbf5f6"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_1d5ec9d033a54824dac61df274d"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_5cf579bc2f6e8a2f0d7d8e05dbc"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_060e88be2ae06dedf558ab2f242"
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_226ca3cdc4e18b1ea04a034a128"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP CONSTRAINT "FK_18aff943c1522579211632ac1a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP CONSTRAINT "FK_fa8ef7394c672fa07c8ff77e002"
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition" DROP CONSTRAINT "FK_bde2bf1aaa774140ff71591ea19"
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager" DROP CONSTRAINT "FK_822705e6608cda5a2febda6ccf1"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager" DROP CONSTRAINT "FK_efdc9167786726b6b0ff2d028ae"
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
            ALTER TABLE "practice_place" DROP COLUMN "city_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP COLUMN "practice_place_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP COLUMN "university_manager_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP COLUMN "student_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP COLUMN "practice_place_manager_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "application_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP COLUMN "specialition_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP COLUMN "student_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating" DROP COLUMN "practice_place_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition" DROP COLUMN "facultation_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager" DROP COLUMN "facultation_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager" DROP COLUMN "practice_place_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place"
            ADD CONSTRAINT "FK_4333669b56cc7a62475d12cd02c" FOREIGN KEY ("cityId") REFERENCES "City"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_ae32df5c66d3ba19d93aa35e268" FOREIGN KEY ("practicePlaceId") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_fedb183e8ba7638290b81f46a7d" FOREIGN KEY ("universityManagerId") REFERENCES "university_manager"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_8bd9711f01c7ba0d0a26710f23b" FOREIGN KEY ("studentId") REFERENCES "student"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_ac55798bfd9ed1ff2a5ee929804" FOREIGN KEY ("practicePlaceManagerId") REFERENCES "practice_place_manager"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_c478e91b58513c1e5601c4545bc" FOREIGN KEY ("applicationId") REFERENCES "application"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_8eb29e53d2bc6c4912b2cf89395" FOREIGN KEY ("specialitionId") REFERENCES "specialition"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating"
            ADD CONSTRAINT "FK_ad2016ee6c30ed03cea9556bf8b" FOREIGN KEY ("studentId") REFERENCES "student"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_rating"
            ADD CONSTRAINT "FK_9df90d89e38576ddf00d3cb5267" FOREIGN KEY ("practicePlaceId") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "specialition"
            ADD CONSTRAINT "FK_da964205cda60e8d60e2077b169" FOREIGN KEY ("facultationId") REFERENCES "facultation"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "university_manager"
            ADD CONSTRAINT "FK_cbf152ab2fdb6180f9b6b4dc8a0" FOREIGN KEY ("facultationId") REFERENCES "facultation"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "practice_place_manager"
            ADD CONSTRAINT "FK_738b04495e005b2eab2544c2f5f" FOREIGN KEY ("practicePlaceId") REFERENCES "practice_place"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
         await queryRunner.query(`
            DROP ROLE IF EXISTS student_group;
            DROP ROLE IF EXISTS uni_manager_group;
            DROP ROLE IF EXISTS practice_manager_group;
            DROP ROLE IF EXISTS hr_group;
        `);
    }

}
