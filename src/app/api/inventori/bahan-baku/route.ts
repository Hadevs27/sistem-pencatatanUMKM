import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { bahanBaku } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { decrypt } from "@/lib/auth";

export const runtime = 'edge';

export async function GET() {
  try {
    const db = getDb();
    const data = await db.select().from(bahanBaku).orderBy(desc(bahanBaku.tanggalBuat));
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal mengambil data: " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { namaBahan, kuantiti, tanggalBuat } = body;

    if (!namaBahan || !kuantiti || !tanggalBuat) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();

    const newBahanBaku = {
      id: crypto.randomUUID(),
      namaBahan,
      kuantiti,
      tanggalBuat,
    };

    await db.insert(bahanBaku).values(newBahanBaku);

    return NextResponse.json({ success: true, data: newBahanBaku });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal menyimpan data: " + error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });

    const db = getDb();
    await db.delete(bahanBaku).where(eq(bahanBaku.id, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal menghapus data: " + error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { id, namaBahan, kuantiti, tanggalBuat } = body;

    if (!id || !namaBahan || !kuantiti || !tanggalBuat) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();

    await db.update(bahanBaku).set({
      namaBahan,
      kuantiti,
      tanggalBuat,
    }).where(eq(bahanBaku.id, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal memperbarui data: " + error.message }, { status: 500 });
  }
}
