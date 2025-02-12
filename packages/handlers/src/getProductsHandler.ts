import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '@comfy/logger';
import { AppContainer } from '@comfy/backend';
import { ProductsController } from '@comfy/backend';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const container = new AppContainer();
  try {
    const controller: ProductsController = container.getProductsController();
    return await controller.getProducts(event.pathParameters, event.queryStringParameters);
  } catch (error) {
    logger.error('MY ERROR: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `MY ERROR: ${error}` }),
    };
  } finally {
    container.tearDown();
  }
};
