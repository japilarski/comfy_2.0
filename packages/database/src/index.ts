import { createTable } from './migration/createTable';
import { createProduct } from './seeders/createProduct';
import { logger } from '@comfy/logger';
import { createDatabaseClient } from './providers/databaseProvider';

const schemas = ['products'];

export const initializeDatabase = async () => {
  const client = await createDatabaseClient();

  logger.verbose('Initializing database...');
  try {
    for (const schema of schemas) {
      await createTable(client, schema);
    }
    logger.verbose('Database initialized successfully!');
  } catch (error) {
    logger.error('Error initializing database:', { error });
    throw error;
  }

  logger.verbose('Seeding database...');
  try {
    for (let i = 0; i < 12; i++) {
      await createProduct(client);
    }
    logger.verbose('Database seeded successfully!');
  } catch (error) {
    logger.error('Error seeding database: ', { error });
    throw error;
  }
};

initializeDatabase();
