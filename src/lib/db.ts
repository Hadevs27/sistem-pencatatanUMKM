import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "../db/schema";

const databaseUrl = process.env.DATABASE_URL || "postgresql://dummy_user:dummy_pass@ep-dummy-db.neon.tech/neondb";
const sql = neon(databaseUrl);
export const db = drizzle({ client: sql, schema });

export function getDb() {
  return db;
}
