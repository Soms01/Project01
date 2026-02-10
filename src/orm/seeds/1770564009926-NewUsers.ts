import {MigrationInterface, QueryRunner} from "typeorm";

export class NewUsers1770564009926 implements MigrationInterface {
    name = 'NewUsers1770564009926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "users" (
                "email", 
                "username", 
                "name", 
                "role", 
                "language"
            ) VALUES (
                'admin@example.com',  -- email (має бути unique)
                'admin_user',         -- username (має бути unique)
                'Головний Адмін',     -- name
                'ADMIN',              -- role (або 'STANDARD', залежно від ваших налаштувань)
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
        await queryRunner.query(`
            DELETE FROM "users" 
            WHERE "email" = 'admin@example.com'
        `);
    }

}
