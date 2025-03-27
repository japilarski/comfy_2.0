import { Client } from 'pg';
import { faker } from '@faker-js/faker';

export const createProduct = async (client: Client) => {
  const query = `
    INSERT INTO product (id, name, collection, company, category, description, manual_url, main_img_url, img_urls, featured, price, shipping)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

  const values = [
    faker.commerce.productName().replace(' ', '_'), // id
    faker.commerce.productName(), // name
    faker.commerce.productMaterial(), // collection
    faker.company.name(), // company
    faker.commerce.department(), // category
    faker.commerce.productDescription(), // description
    'https://example.com', // manual_url
    faker.image.avatar(), // main_img_url
    [faker.image.avatar(), faker.image.avatar()], // img_urls
    faker.datatype.boolean(), // featured
    faker.number.int({ min: 10_000, max: 1_000_000 }), // price
    faker.datatype.boolean(),
  ];

  const res = await client.query(query, values);
  return res.rows[0];
};
