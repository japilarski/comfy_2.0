import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import express from 'express';
import { handler } from '@comfy/handlers';
import cors from 'cors';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Comfy 2.0 API');
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/products/:productId?', async (req: any, res: any) => {
  const event = {
    pathParameters: {
      productId: req.params.productId,
    },
    queryStringParameters: req.query,
  } as unknown as APIGatewayProxyEvent;

  const response: APIGatewayProxyResult = await handler(event);

  res.status(response.statusCode);
  res.send(response.body);
});

export default app;
