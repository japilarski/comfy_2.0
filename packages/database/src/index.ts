import { PrismaClient } from '@prisma/client';
import { createProduct } from './seeders/createProduct';
import { logger } from '@comfy/logger';

export const seedDatabase = async () => {
  logger.info('Seeding database...');
  const prismaClient = new PrismaClient();

  try {
    for (let i = 0; i < 10; i++) {
      await createProduct(prismaClient);
    }
  } catch (error) {
    prismaClient.$disconnect();

    logger.error('Error seeding database: ', error);
    process.exit(1);
  }

  prismaClient.$disconnect();

  logger.info('Database seeded successfully!');
  process.exit(0);
};

seedDatabase();
