import { Connection, createConnection, getConnectionManager } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const dbCreateConnection = async (username: string, password: string): Promise<Connection | null> => {
  const name = 'default';

  try {
    const isCompiled = __dirname.includes('dist');

    const conn = await createConnection({
      name: name,
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: username,
      password: password,
      database: process.env.POSTGRES_DB,
      synchronize: false,
      logging: false,
      entities: [isCompiled ? 'dist/orm/entities/**/*.js' : 'src/orm/entities/**/*.ts'],
      migrations: [isCompiled ? 'dist/orm/migrations/**/*.js' : 'src/orm/migrations/**/*.ts'],
      cli: {
        migrationsDir: 'src/orm/migrations',
      },
    });
    console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
  } catch (err) {
    if (err.name === 'AlreadyHasActiveConnectionError') {
      const activeConnection = getConnectionManager().get(name);
      return activeConnection;
    }
    console.log(err);
  }
  return null;
};
