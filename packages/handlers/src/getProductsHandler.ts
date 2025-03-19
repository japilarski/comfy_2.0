import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '@comfy/logger';
import { AppContainer, ProductsController } from '@comfy/backend';
import { InternalServerErrorResource } from '@comfy/http-resources';
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.verbose('Products Lambda invoked with event: ', event);

  let container: AppContainer;
  try {
    logger.verbose('Creating AppContainer...');
    container = new AppContainer();
  } catch (error) {
    logger.error('Products Lambda failed to create AppContainer: ', error);
    return new InternalServerErrorResource(`Products Lambda failed to create AppContainer: ${error}`).toObject();
  }

  try {
    const controller: ProductsController = await container.getProductsController();

    return await controller.get(event.pathParameters, event.queryStringParameters);
  } catch (error) {
    logger.error('Products Lambda failed with error: ', error);
    return new InternalServerErrorResource(`Products Lambda failed with error: ${error}`).toObject();
  } finally {
    await container.tearDown();
  }
};
