import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { pengeluaran } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { decrypt } from "@/lib/auth";



export async function GET() {
  try {
    const db = getDb();
    const data = await db.select().from(pengeluaran).orderBy(desc(pengeluaran.tanggal));
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal mengambil data: " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sessionCookie = request.headers.get("cookie")?.split("; ").find(c => c.startsWith("session="))?.split("=")[1];
    let userId = "system";
    if (sessionCookie) {
      const payload = await decrypt(sessionCookie);
      if (payload?.user) userId = (payload.user as any).id;
    }

    const body = (await request.json()) as any;
    const { kategori, tanggal, nominal, keterangan } = body;

    if (!tanggal || !nominal) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    const newPengeluaran = {
      idTransaksi: crypto.randomUUID(),
      nomorTransaksi: `EXP-${Date.now()}`,
      kategori: kategori || "Operasional",
      tanggal,
      nominal: Number(nominal),
      metode: "-",
      keterangan: keterangan || null,
      userId,
    };

    await db.insert(pengeluaran).values(newPengeluaran);

    return NextResponse.json({ success: true, data: newPengeluaran });
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
    await db.delete(pengeluaran).where(eq(pengeluaran.idTransaksi, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal menghapus data: " + error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { idTransaksi, kategori, tanggal, nominal, keterangan } = body;

    if (!idTransaksi || !tanggal || !nominal) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    await db.update(pengeluaran).set({
      kategori: kategori || "Operasional",
      tanggal,
      nominal: Number(nominal),
      keterangan: keterangan || null,
    }).where(eq(pengeluaran.idTransaksi, idTransaksi));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal mengupdate data: " + error.message }, { status: 500 });
  }
}
