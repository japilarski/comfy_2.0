import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const createProduct = async (prismaClient: PrismaClient) => {
  return await prismaClient.product.create({
    data: {
      name: faker.commerce.productName(),
      company: faker.company.name(),
      description: faker.commerce.productDescription(),
      featured: faker.datatype.boolean(),
      category: faker.commerce.department(),
      image: faker.image.avatar(),
      price: faker.number.int({ min: 10_000, max: 1_000_000 }),
      shipping: faker.datatype.boolean(),
      colors: [faker.color.rgb({ format: 'hex' }), faker.color.rgb({ format: 'hex' })],
    },
  });
};
