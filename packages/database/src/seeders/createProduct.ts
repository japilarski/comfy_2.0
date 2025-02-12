import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const createProduct = async (prismaClient: PrismaClient) => {
  return await prismaClient.product.create({
    data: {
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 10_000, max: 1_000_000 }),
    },
  });
};
