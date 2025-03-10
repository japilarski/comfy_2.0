import { Client } from 'pg';
import { faker } from '@faker-js/faker';

export const createProduct = async (client: Client) => {
  const query = `
    INSERT INTO product (name, company, description, featured, category, image, price, shipping, colors)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

  const values = [
    faker.commerce.productName(),
    faker.company.name(),
    faker.commerce.productDescription(),
    faker.datatype.boolean(),
    faker.commerce.department(),
    faker.image.avatar(),
    faker.number.int({ min: 10_000, max: 1_000_000 }),
    faker.datatype.boolean(),
    [faker.color.rgb({ format: 'hex' }), faker.color.rgb({ format: 'hex' })],
  ];

  const res = await client.query(query, values);
  return res.rows[0];
};
