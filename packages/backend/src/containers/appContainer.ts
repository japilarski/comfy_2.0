import { ProductsController } from '../controllers';
import { ProductsService } from '../services';
import { EntityManagerProvider } from '../providers/entityManagerProvider';

export class AppContainer {
  private entityManagerProvider = new EntityManagerProvider();

  public async getProductsController() {
    return new ProductsController(new ProductsService(await this.entityManagerProvider.createOrGetDatabaseClient()));
  }

  public async tearDown() {
    await this.entityManagerProvider.tearDown();
  }
}
