import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { users } from "@/db/schema";
import { eq, ne } from "drizzle-orm";
import { hash } from "bcrypt-ts";
import { decrypt } from "@/lib/auth";



export async function GET() {
  try {
    const db = getDb();
    // Exclude passwordHash from response for security
    const data = await db.select({
      id: users.id,
      username: users.username,
      plainPassword: users.plainPassword,
      role: users.role,
      createdAt: users.createdAt,
    }).from(users);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal mengambil data pengguna: " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { username, password, role } = body;

    if (!username || !password || !role) {
      return NextResponse.json({ error: "Username, password, dan role wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    
    // Check if username exists
    const existing = await db.select().from(users).where(eq(users.username, username));
    if (existing.length > 0) {
      return NextResponse.json({ error: "Username sudah digunakan" }, { status: 400 });
    }

    const passwordHash = await hash(password, 10);

    const newUser = {
      id: crypto.randomUUID(),
      username,
      passwordHash,
      plainPassword: password, // Save plain password as requested
      role,
      nama: username,
      status: "Aktif",
      createdAt: new Date().toISOString(),
    };

    await db.insert(users).values(newUser);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal membuat pengguna: " + error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { id, username, password, role } = body;

    if (!id || !username || !role) {
      return NextResponse.json({ error: "Username dan role wajib diisi" }, { status: 400 });
    }

    const db = getDb();

    // Check if new username conflicts
    const existing = await db.select().from(users).where(eq(users.username, username));
    if (existing.length > 0 && existing[0].id !== id) {
      return NextResponse.json({ error: "Username sudah digunakan" }, { status: 400 });
    }

    const updateData: any = {
      username,
      role,
    };

    if (password) {
      updateData.passwordHash = await hash(password, 10);
      updateData.plainPassword = password;
    }

    await db.update(users).set(updateData).where(eq(users.id, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal mengupdate pengguna: " + error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });

    // Prevent deleting the user making the request
    const sessionCookie = request.headers.get("cookie")?.split("; ").find(c => c.startsWith("session="))?.split("=")[1];
    if (sessionCookie) {
      const payload = await decrypt(sessionCookie);
      if (payload?.user && (payload.user as any).id === id) {
         return NextResponse.json({ error: "Tidak dapat menghapus akun Anda sendiri saat sedang login" }, { status: 400 });
      }
    }

    const db = getDb();
    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal menghapus pengguna: " + error.message }, { status: 500 });
  }
}
