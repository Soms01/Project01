import {MigrationInterface, QueryRunner} from "typeorm";

export class UpgradeLogin1768998862877 implements MigrationInterface {
    name = 'UpgradeLogin1768998862877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`

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


                GRANT SELECT ON "cities", "practice_places", "faculties", "specialties", "university_managers", "practice_managers" TO student_group;
                GRANT SELECT, INSERT ON "applications" TO student_group;
                GRANT UPDATE("report") ON "applications" TO student_group;
                GRANT SELECT ON "tasks" TO student_group;
                GRANT INSERT, SELECT ON "practice_ratings" TO student_group;


                GRANT SELECT ON "students", "applications", "specialties" TO practice_manager_group;
                GRANT ALL PRIVILEGES ON "tasks" TO practice_manager_group;


                GRANT SELECT ON "students", "applications", "practice_places", "specialties", "faculties" TO uni_manager_group;
                GRANT UPDATE("date_from", "date_to") ON "applications" TO uni_manager_group;


                GRANT ALL PRIVILEGES ON "cities", "faculties", "specialties", "students", "university_managers", "practice_managers", "practice_places" TO hr_group;
                GRANT SELECT ON "applications", "practice_ratings", "tasks" TO hr_group;


                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO student_group;
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO practice_manager_group;
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO hr_group;
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO uni_manager_group;


                IF EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'connect_user') THEN
                    GRANT student_group TO connect_user;
                    GRANT uni_manager_group TO connect_user;
                    GRANT practice_manager_group TO connect_user;
                    GRANT hr_group TO connect_user;
                END IF;

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP ROLE IF EXISTS student_group;
            DROP ROLE IF EXISTS uni_manager_group;
            DROP ROLE IF EXISTS practice_manager_group;
            DROP ROLE IF EXISTS hr_group;
        `);
    }

}
