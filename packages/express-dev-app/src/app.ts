import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import express from 'express';
import { handler } from '@comfy/handlers';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

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

app.get('/image', (req: any, res: any) => {
  const BASE_IMAGE_DIR = '/usr/src/app/processed_data/';
  const filePath = req.query.file;

  if (!filePath) {
    return res.status(400).json({ error: 'Path parameter is required' });
  }

  const absolutePath = path.join(BASE_IMAGE_DIR, filePath);
  if (!fs.existsSync(absolutePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.sendFile(absolutePath);
});

export default app;
