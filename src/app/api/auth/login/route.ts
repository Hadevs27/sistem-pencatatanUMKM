import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt-ts";
import { login } from "@/lib/auth";

// Opt into the Edge runtime since we need Cloudflare bindings
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan password diperlukan" }, { status: 400 });
    }

    const db = getDb();
    
    // Fetch user from D1 database
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    const userRow = result[0];

    console.log("DB User:", userRow);

    if (!userRow) {
      return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
    }

    if (userRow.status !== "Aktif") {
      return NextResponse.json({ error: "Akun tidak aktif." }, { status: 403 });
    }

    const isPasswordValid = await compare(password, userRow.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
    }

    const userPayload = {
      id: userRow.id,
      username: userRow.username,
      nama: userRow.nama,
      role: userRow.role,
    };

    await login(userPayload);

    return NextResponse.json({ success: true, user: userPayload });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server: " + error.message }, { status: 500 });
  }
}
