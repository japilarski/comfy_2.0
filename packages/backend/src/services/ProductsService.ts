import { PrismaClient } from '@prisma/client';
import { ProductQueryParams } from '../schemas/ProductQueryParamsSchema';

export class ProductsService {
  constructor(private prismaClient: PrismaClient) {}

  pageSize = 12;

  public async getProducts(params: ProductQueryParams) {
    const products = await this.prismaClient.product.findMany({
      skip: (this.getPage(!params.page ? '1' : params.page) - 1) * this.pageSize,
      take: this.pageSize,
      orderBy: {
        name: params.order === 'a-z' ? 'asc' : params.order === 'z-a' ? 'desc' : undefined,
        price: params.order === 'low' ? 'asc' : params.order === 'high' ? 'desc' : undefined,
      },
      where: {
        shipping: !params.shipping ? undefined : params.shipping === 'on',
        featured: !params.featured ? undefined : params.featured === 'true',
        category: !params.category || params.category === 'all' ? undefined : params.category,
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

  public async getMetadata(params: ProductQueryParams) {
    const total = await this.prismaClient.product.count({
      where: {
        shipping: !params.shipping ? undefined : params.shipping === 'on',
        featured: !params.featured ? undefined : params.featured === 'true',
        category: !params.category || params.category === 'all' ? undefined : params.category,
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

    const categories = await this.prismaClient.product.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });
    const companies = await this.prismaClient.product.findMany({
      select: {
        company: true,
      },
      distinct: ['company'],
    });

    return {
      pagination: {
        page: this.getPage(params.page),
        pageSize: this.pageSize,
        pageCount: Math.ceil(total / this.pageSize),
        total,
      },
      categories: categories.map((category) => category.category),
      companies: companies.map((company) => company.company),
    };
  }

  public async getProductById(productId: number) {
    return this.prismaClient.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  private getPage(page: string | undefined) {
    return parseInt(!page ? '1' : page, 10);
  }
}
