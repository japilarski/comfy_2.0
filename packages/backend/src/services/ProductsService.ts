import { PrismaClient } from '@prisma/client';
import { ProductQueryParams } from '../schemas/ProductQueryParamsSchema';

export class ProductsService {
  constructor(private prismaClient: PrismaClient) {}

  public async getProducts(params: ProductQueryParams) {
    const pageSize = 12;
    const products = await this.prismaClient.product.findMany({
      skip: (parseInt(!params.page ? '1' : params.page, 10) - 1) * pageSize,
      take: pageSize,
      orderBy: {
        name: params.order === 'a-z' ? 'asc' : params.order === 'z-a' ? 'desc' : undefined,
        price: params.order === 'low' ? 'asc' : params.order === 'high' ? 'desc' : undefined,
      },
      where: {
        shipping: !params.shipping ? undefined : params.shipping === 'on',
        featured: !params.featured ? undefined : params.featured === 'true',
        category: !params.category ? undefined : params.category,
        company: !params.company || params.company === 'all' ? undefined : params.company,
        name: !params.search
          ? undefined
          : {
              mode: 'insensitive',
              contains: params.search,
            },
        price: !params.price
          ? undefined
          : {
              lte: parseInt(params.price, 10),
            },
      },
    });

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
