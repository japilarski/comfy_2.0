import { ProductsController } from '../controllers';
import { ProductsService } from '../services';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// import { EntityManagerProvider } from '../providers';

export class AppContainer {
  // private entityManagerProvider = new EntityManagerProvider();

  public async getProductsController() {
    return new ProductsController(
      new ProductsService(new DynamoDBClient({ region: process.env.region ?? 'eu-central-1' }))
    );
  }

  // public async tearDown() {
  //   await this.entityManagerProvider.tearDown();
  // }
}
