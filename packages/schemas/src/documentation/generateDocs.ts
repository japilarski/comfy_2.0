import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { GetProductsResponseSchema } from '../contracts';
import path from 'path';
import fs from 'fs';

const registry = new OpenAPIRegistry();

// Register schemas
registry.register('Product', GetProductsResponseSchema);

// Register the `/products` endpoint
registry.registerPath({
  method: 'get',
  path: '/products',
  description: 'Get a list of all products',
  responses: {
    200: {
      description: 'A list of products',
      content: {
        'application/json': {
          schema: GetProductsResponseSchema,
        },
      },
    },
  },
});

// Generate the OpenAPI document
const generator = new OpenApiGeneratorV3(registry.definitions);
const openApiDoc = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Product API',
    version: '1.0.0',
  },
});

// Write the OpenAPI document to a file
const outputPath = path.join(__dirname, 'openapi.json');

fs.writeFileSync(outputPath, JSON.stringify(openApiDoc, null, 2));

console.log(`✅ OpenAPI documentation generated at ${outputPath}`);
