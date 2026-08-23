import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { penjualan } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { decrypt } from "@/lib/auth";



export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const metode = url.searchParams.get("metode");

    const db = getDb();
    let query = db.select().from(penjualan).orderBy(desc(penjualan.tanggal));
    
    if (metode) {
      // Drizzle requires building the query correctly
      const data = await db.select().from(penjualan)
        .where(eq(penjualan.metode, metode))
        .orderBy(desc(penjualan.tanggal));
      return NextResponse.json({ success: true, data });
    } else {
      const data = await query;
      return NextResponse.json({ success: true, data });
    }
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
    const { metode, tanggal, nominal, pcsLaku, keterangan } = body;

    if (!metode || !tanggal || !nominal || !pcsLaku) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    const newPenjualan = {
      idTransaksi: crypto.randomUUID(),
      metode,
      tanggal,
      nominal: Number(nominal),
      pcsLaku: Number(pcsLaku),
      keterangan: keterangan || null,
      userId,
    };

    await db.insert(penjualan).values(newPenjualan);

    return NextResponse.json({ success: true, data: newPenjualan });
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
    await db.delete(penjualan).where(eq(penjualan.idTransaksi, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal menghapus data: " + error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { idTransaksi, tanggal, nominal, pcsLaku, keterangan } = body;

    if (!idTransaksi || !tanggal || !nominal || !pcsLaku) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    await db.update(penjualan).set({
      tanggal,
      nominal: Number(nominal),
      pcsLaku: Number(pcsLaku),
      keterangan: keterangan || null,
    }).where(eq(penjualan.idTransaksi, idTransaksi));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal mengupdate data: " + error.message }, { status: 500 });
  }
}
