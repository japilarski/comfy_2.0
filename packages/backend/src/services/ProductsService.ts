import { logger } from '@comfy/logger';
import { ProductQueryParams } from '../schemas';
import { Product, ProductResponseMetadata, SimplifiedProduct } from '@comfy/schemas';
import { Client } from 'pg';

export class ProductsService {
  private pageSize = 12;

  constructor(private client: Client) {}

  public async getProductById(productId: string): Promise<Product | null> {
    const queryResult = await this.client.query<Product>('SELECT * FROM product WHERE id = $1', [productId]);
    return queryResult.rows[0] ? queryResult.rows[0] : null;
  }

  public async getProducts(params: ProductQueryParams): Promise<SimplifiedProduct[] | []> {
    logger.debug(params);
    const processedParams = this.processQueryParams(params);
    logger.debug(processedParams);
    const queryResult = await this.client.query<SimplifiedProduct>(
      `
        SELECT id, name, price, main_img_url FROM product
          WHERE featured = COALESCE($1::BOOLEAN, featured)
          AND category = COALESCE($2, category)
          AND company = COALESCE($3, company)
          AND name ~* COALESCE($4, name)
          AND (price <= COALESCE($5, price) OR price IS NULL)
        ORDER BY
          CASE WHEN $6 = 'a-z' THEN name END,
          CASE WHEN $6 = 'z-a' THEN name END DESC,
          CASE WHEN $6 = 'low' THEN price END,
          CASE WHEN $6 = 'high' THEN price END DESC
        LIMIT $7 OFFSET $8;
      `,
      [
        processedParams.featured,
        processedParams.category,
        processedParams.company,
        processedParams.search,
        processedParams.price,
        processedParams.orderBy,
        processedParams.take,
        processedParams.skip,
      ]
    );

    return queryResult.rows;
  }

  public async getMetadata(params: ProductQueryParams): Promise<ProductResponseMetadata> {
    const processedParams = this.processQueryParams(params);
    const total = await this.client.query(
      `
        SELECT COUNT(*) FROM product
          WHERE featured = COALESCE($1::BOOLEAN, featured)
          AND category = COALESCE($2, category)
          AND company = COALESCE($3, company)
          AND name ~* COALESCE($4, name)
          AND (price <= COALESCE($5, price) OR price IS NULL);
      `,
      [
        processedParams.featured,
        processedParams.category,
        processedParams.company,
        processedParams.search,
        processedParams.price,
      ]
    );

    const categories = await this.client.query('SELECT DISTINCT category FROM product'); //
    const companies = await this.client.query('SELECT DISTINCT company FROM product'); //

    return {
      pagination: {
        page: this.getPage(params?.page),
        pageSize: this.pageSize,
        pageCount: Math.ceil(parseInt(total.rows[0].count, 10) / this.pageSize),
        total: parseInt(total.rows[0].count, 10),
      },
      categories: categories.rows.map((category) => category.category),
      companies: companies.rows.map((company) => company.company) ?? [],
    };
  }

  private processQueryParams(params: ProductQueryParams) {
    return {
      skip: (this.getPage(params?.page) - 1) * this.pageSize,
      take: this.pageSize,
      shipping: params?.shipping ? params.shipping === 'on' : null,
      featured: params?.featured === 'true' ? true : params?.featured === 'false' ? false : null,
      category: params?.category && params.category !== 'all' ? params.category : null,
      company: params?.company && params.company !== 'all' ? params.company : null,
      search: params?.search ?? null,
      price: params?.price ?? null,
      orderBy: params?.order ?? null,
    };
  }

  private getPage(page: string | undefined): number {
    return parseInt(page ?? '1', 10);
  }
}
