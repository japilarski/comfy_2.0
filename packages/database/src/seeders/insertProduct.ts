import { Client } from 'pg';
import { Product } from '@comfy/schemas';

export const insertProduct = async (client: Client, product: Product) => {
  //TODO: set type for product
  const query = `
    INSERT INTO product (id, name, collection, company, category, description, manual_url, main_img_url, img_urls, featured)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

  const values = [
    product.id, // id
    product.name, // name
    product.collection, // collection
    product.company, // company
    product.category, // category
    product.description, // description
    product.manual_url, // manual_url
    product.main_img_url, // main_img_url
    [...product.img_urls], // img_urls
    product.id === 'AGIS_01' || product.id === 'BALTICA_0201' || product.id === 'ELMO_12', // featured
  ];

  const res = await client.query(query, values);
  return res.rows[0];
};
