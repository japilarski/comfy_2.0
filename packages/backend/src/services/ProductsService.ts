import { PrismaClient } from '@prisma/client';

export class ProductsService {
  constructor(private prismaClient: PrismaClient) {}

  public async getProducts() {
    const products = await this.prismaClient.product.findMany();

    return products;
  }

  public async getProductById(productId: number) {
    const product = await this.prismaClient.product.findUnique({
      where: {
        id: productId,
      },
    });

    return product;
  }
}
