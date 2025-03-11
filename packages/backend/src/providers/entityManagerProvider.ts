import { Client } from 'pg';
import { createDatabaseClient, destroyDatabaseClient } from '@comfy/database';

export class EntityManagerProvider {
  private databaseClient: Client | null = null;

  public async createOrGetDatabaseClient(): Promise<Client> {
    if (!this.databaseClient) {
      this.databaseClient = await createDatabaseClient();
    }
    return this.databaseClient;
  }

  public async tearDown() {
    if (this.databaseClient) {
      await destroyDatabaseClient(this.databaseClient);
      this.databaseClient = null;
    }
  }
}
