import { PrismaClient } from '@prisma/client';

export class ProductsService {
  constructor(private prismaClient: PrismaClient) {}

  public async getProducts() {
    return 'products';
  }
}
