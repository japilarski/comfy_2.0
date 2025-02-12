import { ProductsController } from '../controllers';
import { PrismaClient } from '@prisma/client';
import { ProductsService } from '../services';

export class AppContainer {
  private prismaClient = new PrismaClient();

  public getProductsController() {
    return new ProductsController(new ProductsService(this.prismaClient));
  }

  public async tearDown() {
    await this.prismaClient.$disconnect();
  }
};
