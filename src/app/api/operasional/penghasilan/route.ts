import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { penghasilan } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { decrypt } from "@/lib/auth";



export async function GET() {
  try {
    const db = getDb();
    const data = await db.select().from(penghasilan).orderBy(desc(penghasilan.tanggal));
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
    const { sumber, tanggal, nominal, keterangan } = body;

    if (!tanggal || !nominal) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    const newPenghasilan = {
      idTransaksi: crypto.randomUUID(),
      nomorTransaksi: `INC-${Date.now()}`,
      sumber: sumber || "Operasional",
      tanggal,
      nominal: Number(nominal),
      metode: "-",
      keterangan: keterangan || null,
      userId,
    };

    await db.insert(penghasilan).values(newPenghasilan);

    return NextResponse.json({ success: true, data: newPenghasilan });
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
    await db.delete(penghasilan).where(eq(penghasilan.idTransaksi, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal menghapus data: " + error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { idTransaksi, sumber, tanggal, nominal, keterangan } = body;

    if (!idTransaksi || !tanggal || !nominal) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    await db.update(penghasilan).set({
      sumber: sumber || "Operasional",
      tanggal,
      nominal: Number(nominal),
      keterangan: keterangan || null,
    }).where(eq(penghasilan.idTransaksi, idTransaksi));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal mengupdate data: " + error.message }, { status: 500 });
  }
}
