import { ProductQueryParams } from '../schemas';
import { DynamoDBClient, GetItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Product } from '../types';

export class ProductsService {
  private pageSize = 12;

  constructor(private client: DynamoDBClient) {}

  public async getProductById(productId: string): Promise<Product | null> {
    const data = await this.client.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME ?? 'products',
        Key: {
          id: { S: productId },
        },
      })
    );
    return data.Item ? (unmarshall(data.Item) as Product) : null;
  }
  public async getProducts(params: ProductQueryParams) {
    //: Promise<SimplifiedProduct[] | []> {
    const scanResponse = await this.client.send(new ScanCommand({ TableName: process.env.TABLE_NAME ?? 'products' }));
    if (!scanResponse.Items || scanResponse.Items.length === 0) {
      return [];
    }
    return scanResponse.Items.map((appointment) => unmarshall(appointment));
  }

  // public async getProducts(params: ProductQueryParams): Promise<SimplifiedProduct[] | []> {
  //   const processedParams = this.processQueryParams(params);
  //   const queryResult = await this.client.query<SimplifiedProduct>(
  //     `
  //         SELECT id, name, price, image FROM product
  //         WHERE shipping = COALESCE($1, shipping)
  //           AND featured = COALESCE($2, featured)
  //           AND category = COALESCE($3, category)
  //           AND company = COALESCE($4, company)
  //           AND name ~* COALESCE($5, name)
  //           AND price <= COALESCE($6, price)
  //         ORDER BY
  //             CASE WHEN $7 = 'a-z' THEN name END,
  //             CASE WHEN $7 = 'z-a' THEN name END DESC,
  //             CASE WHEN $7 = 'low' THEN price END,
  //             CASE WHEN $7 = 'high' THEN price END DESC
  //         LIMIT $8 OFFSET $9;
  //     `,
  //     [
  //       processedParams.shipping,
  //       processedParams.featured,
  //       processedParams.category,
  //       processedParams.company,
  //       processedParams.search,
  //       processedParams.price,
  //       processedParams.orderBy,
  //       processedParams.take,
  //       processedParams.skip,
  //     ]
  //   );
  //
  //   return queryResult.rows;
  // }
  //
  // public async getMetadata(params: ProductQueryParams): Promise<ProductsMetadata> {
  //   const processedParams = this.processQueryParams(params);
  //   const total = await this.client.query(
  //     `
  //         SELECT COUNT(*) FROM product
  //         WHERE shipping = COALESCE($1, shipping)
  //           AND featured = COALESCE($2, featured)
  //           AND category = COALESCE($3, category)
  //           AND company = COALESCE($4, company)
  //           AND name ~* COALESCE($5, name)
  //           AND price <= COALESCE($6, price);
  //     `,
  //     [
  //       processedParams.shipping,
  //       processedParams.featured,
  //       processedParams.category,
  //       processedParams.company,
  //       processedParams.search,
  //       processedParams.price,
  //     ]
  //   );
  //
  //   const categories = await this.client.query('SELECT DISTINCT category FROM product'); //
  //   const companies = await this.client.query('SELECT DISTINCT company FROM product'); //
  //
  //   return {
  //     pagination: {
  //       page: this.getPage(params?.page),
  //       pageSize: this.pageSize,
  //       pageCount: Math.ceil(parseInt(total.rows[0].count, 10) / this.pageSize),
  //       total: parseInt(total.rows[0].count, 10),
  //     },
  //     categories: categories.rows.map((category) => category.category),
  //     companies: companies.rows.map((company) => company.company) ?? [],
  //   };
  // }
  //
  // private processQueryParams(params: ProductQueryParams) {
  //   return {
  //     skip: (this.getPage(params?.page) - 1) * this.pageSize,
  //     take: this.pageSize,
  //     shipping: params?.shipping ? params.shipping === 'on' : null,
  //     featured: params?.featured ? params.featured === 'true' : null,
  //     category: params?.category && params.category !== 'all' ? params.category : null,
  //     company: params?.company && params.company !== 'all' ? params.company : null,
  //     search: params?.search ?? null,
  //     price: params?.price ?? null,
  //     orderBy: params?.order ?? null,
  //   };
  // }
  //
  // private getPage(page: string | undefined): number {
  //   return parseInt(page ?? '1', 10);
  // }
}
