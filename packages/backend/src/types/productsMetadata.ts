export type ProductsMetadata = {
  pagination: {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number,
  },
  categories: string[] | [],
  companies: string[] | [],
}
