import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
dotenv.config();

const isCompiled = __dirname.includes('dist');

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [isCompiled ? 'dist/orm/entities/**/*.js' : 'src/orm/entities/**/*.ts'],
  migrations: [isCompiled ? 'dist/orm/migrations/**/*.js' : 'src/orm/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/orm/migrations',
  },
};

export default config;
