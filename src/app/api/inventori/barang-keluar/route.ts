import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { barangKeluar } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { decrypt } from "@/lib/auth";



export async function GET() {
  try {
    const db = getDb();
    const data = await db.select().from(barangKeluar).orderBy(desc(barangKeluar.tanggal));
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
    const { tanggal, namaBarang, jumlah, tujuan, keterangan } = body;

    if (!tanggal || !namaBarang || !jumlah) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    const nomorTransaksi = `BK-${Date.now()}`;

    const newBarangKeluar = {
      idTransaksi: crypto.randomUUID(),
      nomorTransaksi,
      tanggal,
      kodeBarang: `BRG-${Date.now()}`,
      namaBarang,
      jumlah: Number(jumlah),
      tujuan: tujuan || null,
      keterangan: keterangan || null,
      userId,
    };

    await db.insert(barangKeluar).values(newBarangKeluar);

    return NextResponse.json({ success: true, data: newBarangKeluar });
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
    await db.delete(barangKeluar).where(eq(barangKeluar.idTransaksi, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal menghapus data: " + error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { idTransaksi, tanggal, namaBarang, jumlah, tujuan, keterangan } = body;

    if (!idTransaksi || !tanggal || !namaBarang || !jumlah) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();

    await db.update(barangKeluar).set({
      tanggal,
      namaBarang,
      jumlah: Number(jumlah),
      tujuan: tujuan || null,
      keterangan: keterangan || null,
    }).where(eq(barangKeluar.idTransaksi, idTransaksi));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal mengupdate data: " + error.message }, { status: 500 });
  }
}
