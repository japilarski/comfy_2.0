import { Client } from 'pg';
import * as process from 'node:process';
import { logger } from '@comfy/logger';
import { fa } from '@faker-js/faker/.';

export const createDatabaseClient = async (awsEnv: boolean = false): Promise<Client> => {
  logger.verbose('Creating database client...');
  try {
    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      ...(awsEnv && {
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    });

    logger.verbose('Client created!');
    await client.connect();

    logger.verbose('Connection established!');
    return client;
  } catch (error) {
    logger.error('Database connection failed with errors: ', { error });
    throw error;
  }
};

export const destroyDatabaseClient = async (client: Client) => {
  try {
    logger.verbose('Destroying database client...');
    await client.end();
    logger.verbose('Client destroyed!');
  } catch (error) {
    logger.error('Client destruction failed with errors:', { error });
    throw error;
  }
};
