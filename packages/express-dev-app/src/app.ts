import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import express from 'express';
import { GetProductsHandler } from '@comfy/handlers';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/products/:productId?', async (req, res) => {
  const event = {
    pathParameters: {
      productId: req.params.productId,
    },
    queryStringParameters: req.query,
  } as unknown as APIGatewayProxyEvent;

  const response: APIGatewayProxyResult = await GetProductsHandler.handler(event);

  res.status(response.statusCode);
  res.send(response.body);
});

export default app;
