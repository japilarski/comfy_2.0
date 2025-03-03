import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '@comfy/logger';
import { AppContainer } from '@comfy/backend';
import { ProductsController } from '@comfy/backend';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const container = new AppContainer();
  try {
    logger.defaultMeta = {
      requestId: event?.requestContext?.requestId ?? 'local',
    };

    const controller: ProductsController = container.getProductsController();

    logger.verbose('Products Lambda invoked with event: ', event);
    return await controller.get(event.pathParameters, event.queryStringParameters);
  } catch (error) {
    logger.error('Products Lambda failed with error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Products Lambda failed with error: ${error}`,
      }),
    };
  } finally {
    container.tearDown();
  }
};
