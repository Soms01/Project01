import {MigrationInterface, QueryRunner} from "typeorm";

export class NewSimpleUsers1770644196201 implements MigrationInterface {
    name = 'NewSimpleUsers1770644196201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "users" (
                "email", 
                "username", 
                "name", 
                "role", 
                "language"
            ) VALUES (
                'Simple@useres.com',  -- email (має бути unique)
                'simple_user',         -- username (має бути unique)
                'Юзер Андре',     -- name
                'STANDARD',              -- role (або 'STANDARD', залежно від ваших налаштувань)
                'uk-UA'               -- language
            )
        `);
        await queryRunner.query(`
            INSERT INTO "users" (
                "email", 
                "username", 
                "name", 
                "role", 
                "language"
            ) VALUES (
                'Simple2@useres.com',  -- email (має бути unique)
                'simple2_user',         -- username (має бути unique)
                'Юзер Олег',            -- name
                'STANDARD',              -- role (або 'STANDARD', залежно від ваших налаштувань)
                'uk-UA'               -- language
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
    }

}
