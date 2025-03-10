import { readFileSync } from 'fs';
import { logger } from '@comfy/logger';
import { Client } from 'pg';
import { join } from 'path';

export const createTable = async (client: Client, schema: string) => {
  try {
    logger.verbose(`Creating table ${schema}...`);
    const schemaPath = join(__dirname, `../schemas/${schema}.sql`);
    const schemaSQL = readFileSync(schemaPath, 'utf8');
    await client.query(schemaSQL);
    logger.verbose(`Table ${schema} created!`);
  } catch (error) {
    console.error(`Error creating table ${schema}:`, { error });
    throw error;
  }
};
