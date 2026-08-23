import 'dotenv/config';
import { db } from './src/lib/db';
import { users } from './src/db/schema';
import * as bcrypt from 'bcryptjs';

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  await db.insert(users).values({
    id: 'admin-id-001',
    username: 'admin',
    nama: 'Administrator',
    role: 'Admin',
    status: 'Aktif',
    passwordHash: passwordHash,
    plainPassword: 'admin123',
    createdAt: new Date().toISOString()
  });

  console.log("Admin seeded successfully!");
}

main().catch(console.error);
