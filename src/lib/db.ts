import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

export function getDb() {
  const env = getRequestContext().env as any;
  
  if (!env.DB) {
    throw new Error("Cloudflare D1 DB binding 'DB' is missing. Pastikan aplikasi dijalankan via Cloudflare Pages atau wrangler pages dev.");
  }
  
  return drizzle(env.DB, { schema });
}
