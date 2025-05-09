import { createTable } from './migration/createTable';
import { createProduct } from './seeders/createProduct';
import { insertProduct } from './seeders/insertProduct';
import { logger } from '@comfy/logger';
import { createDatabaseClient } from './providers/databaseProvider';
import * as dotenv from 'dotenv';
import { Product } from '@comfy/schemas';
import fs from 'fs';
import path from 'path';

dotenv.config();

const schemas = ['products'];

export const initializeDatabase = async () => {
  const client = await createDatabaseClient(process.env.AWS_DEV === 'true');
  logger.verbose('Initializing database...');

  logger.verbose('Creating tables...');
  try {
    for (const schema of schemas) {
      await createTable(client, schema);
    }
    logger.verbose('Tables Created!');
  } catch (error) {
    logger.error('Error initializing database:', { error });
    throw error;
  }

  logger.verbose('Seeding database...');
  try {
    if (process.env.SEED_DUMMY === 'true') {
      logger.verbose('Seeding with dummy data...');
      for (let i = 0; i < 15; i++) {
        await createProduct(client);
      }
    } else {
      logger.verbose('Seeding with real products...');
      const filePath =
        process.env.AWS_DEV === 'true'
          ? path.resolve('./../../../comfy-2-data/products.json')
          : path.resolve('/usr/src/app/products.json');
      // Absolute path inside Docker
      const productsData = fs.readFileSync(filePath, 'utf-8');
      const products = JSON.parse(productsData) as Product[];
      for (const product of products) {
        try {
          await insertProduct(client, product);
        } catch (error) {
          logger.error('Error inserting product: ', { error });
        }
      }
    }
    logger.verbose('Database seeded successfully!');
  } catch (error) {
    logger.error('Error seeding database: ', { error });
    throw error;
  }

  client.end();
  logger.verbose('Database initialized successfully!');
};

initializeDatabase();
