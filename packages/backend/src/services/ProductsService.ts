import { PrismaClient } from '@prisma/client';
import { ProductQueryParams } from '../schemas';
import { Product, ProductsMetadata } from '../types';

export class ProductsService {
  private pageSize = 12;

  constructor(private prismaClient: PrismaClient) {}

  public async getProductById(productId: number): Promise<Product | null> {
    return this.prismaClient.product.findUnique({
      where: {
        id: productId,
      },
    }) as any;
  }

  public async getProducts(params: ProductQueryParams): Promise<Product[] | []> {
    const processedParams = this.processQueryParams(params);
    return this.prismaClient.product.findMany({
      skip: processedParams.skip,
      take: processedParams.take,
      orderBy: processedParams.orderBy,
      where: {
        shipping: processedParams.shipping,
        featured: processedParams.featured,
        category: processedParams.category,
        company: processedParams.company,
        name: processedParams.search,
        price: processedParams.price,
      },
    }) as any;
  }

  public async getMetadata(params: ProductQueryParams): Promise<ProductsMetadata> {
    const processedParams = this.processQueryParams(params);
    const total: number = await this.prismaClient.product.count({
      where: {
        shipping: processedParams.shipping,
        featured: processedParams.featured,
        category: processedParams.category,
        company: processedParams.company,
        name: processedParams.search,
        price: processedParams.price,
      },
    });

    const categories: Pick<Product, 'category'>[] = await this.prismaClient.product.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    const companies: Pick<Product, 'company'>[] = await this.prismaClient.product.findMany({
      select: { company: true },
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
      companies: companies.map((company) => company.company) ?? [],
    };
  }

  private processQueryParams(params: ProductQueryParams) {
    return {
      skip: (this.getPage(!params.page ? '1' : params.page) - 1) * this.pageSize,
      take: this.pageSize,
      shipping: params.shipping ? params.shipping === 'on' : undefined,
      featured: params.featured ? params.featured === 'true' : undefined,
      category: params.category && params.category !== 'all' ? params.category : undefined,
      company: params.company && params.company !== 'all' ? params.company : undefined,
      search: params.search ? ({ mode: 'insensitive', contains: params.search } as any) : undefined,
      price: params.price ? { lte: parseInt(params.price, 10) } : undefined,
      orderBy: {
        name: params.order === 'a-z' ? 'asc' : params.order === 'z-a' ? 'desc' : undefined,
        price: params.order === 'low' ? 'asc' : params.order === 'high' ? 'desc' : undefined,
      } as any,
    };
  }

  private getPage(page: string | undefined): number {
    return parseInt(!page ? '1' : page, 10);
  }
}
