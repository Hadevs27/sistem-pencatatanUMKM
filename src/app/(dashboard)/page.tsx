import { ArrowUpRight, ArrowDownRight, Wallet, ShoppingCart } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { getDb } from "@/lib/db";
import { penjualan, penghasilan, pengeluaran } from "@/db/schema";
import { desc, and, gte, lte, eq, like } from "drizzle-orm";
import DateFilter from "@/components/DateFilter";

import { getSession } from "@/lib/auth";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ start?: string; end?: string }> }) {
  const session = await getSession();
  const role = session?.user?.role || 'Staff';

  const searchParamsResolved = await searchParams;
  const start = searchParamsResolved?.start;
  const end = searchParamsResolved?.end;

  const db = getDb();

  const conditionsPenjualan = [];
  if (start) conditionsPenjualan.push(gte(penjualan.tanggal, start));
  if (end) conditionsPenjualan.push(lte(penjualan.tanggal, end));
  
  const conditionsPenghasilan = [];
  if (start) conditionsPenghasilan.push(gte(penghasilan.tanggal, start));
  if (end) conditionsPenghasilan.push(lte(penghasilan.tanggal, end));

  const conditionsPengeluaran = [];
  if (start) conditionsPengeluaran.push(gte(pengeluaran.tanggal, start));
  if (end) conditionsPengeluaran.push(lte(pengeluaran.tanggal, end));

  // 1. Fetch Penjualan
  const penjualanData = await db.select().from(penjualan)
    .where(conditionsPenjualan.length > 0 ? and(...conditionsPenjualan) : undefined)
    .orderBy(desc(penjualan.tanggal));
    
  let cashTotal = 0;
  let qrisTotal = 0;
  let totalPcsLaku = 0;
  
  penjualanData.forEach(p => {
    totalPcsLaku += p.pcsLaku;
    const totalRow = p.nominal * p.pcsLaku;
    if (p.metode === "Cash") cashTotal += totalRow;
    if (p.metode === "Qris") qrisTotal += totalRow;
  });
  const totalPenjualan = cashTotal + qrisTotal;

  // Additional Fetch for today and this month
  // We use current local time in Indonesian context ideally, but ISO string works fine
  const now = new Date();
  const todayDate = now.toLocaleDateString("en-CA"); // "YYYY-MM-DD" in local time
  const thisMonthPrefix = todayDate.substring(0, 7);

  const penjualanHariIni = await db.select().from(penjualan).where(eq(penjualan.tanggal, todayDate));
  const penjualanBulanIni = await db.select().from(penjualan).where(like(penjualan.tanggal, `${thisMonthPrefix}%`));

  const pcsHariIni = penjualanHariIni.reduce((acc, curr) => acc + curr.pcsLaku, 0);
  const pcsBulanIni = penjualanBulanIni.reduce((acc, curr) => acc + curr.pcsLaku, 0);

  // 2. Fetch Penghasilan Operasional
  const penghasilanData = await db.select().from(penghasilan)
    .where(conditionsPenghasilan.length > 0 ? and(...conditionsPenghasilan) : undefined)
    .orderBy(desc(penghasilan.tanggal));
  const totalPenghasilanOp = penghasilanData.reduce((acc, curr) => acc + curr.nominal, 0);

  // 3. Fetch Pengeluaran Operasional
  const pengeluaranData = await db.select().from(pengeluaran)
    .where(conditionsPengeluaran.length > 0 ? and(...conditionsPengeluaran) : undefined)
    .orderBy(desc(pengeluaran.tanggal));
  const totalPengeluaran = pengeluaranData.reduce((acc, curr) => acc + curr.nominal, 0);

  // Totals
  const totalPemasukan = totalPenjualan + totalPenghasilanOp;
  const summary = {
    penghasilan: totalPemasukan,
    pengeluaran: totalPengeluaran,
    selisih: totalPemasukan - totalPengeluaran,
    totalTransaksi: penjualanData.length,
    totalPcsLaku: totalPcsLaku,
    pcsHariIni: pcsHariIni,
    pcsBulanIni: pcsBulanIni,
  };

  const cashPercent = totalPemasukan > 0 ? Math.round((cashTotal / totalPemasukan) * 100) : 0;
  const qrisPercent = totalPemasukan > 0 ? Math.round((qrisTotal / totalPemasukan) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Dashboard</h2>
          <p className="text-text-secondary mt-1">Ringkasan aktivitas dan finansial Anda.</p>
        </div>
        <DateFilter />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {role === 'Admin' && (
          <>
            {/* Penghasilan */}
            <div className="bg-surface p-5 rounded-lg border border-border shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-text-secondary">Total Pemasukan</h3>
                <div className="p-2 bg-success-light text-success rounded-md">
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-text-primary">{formatRupiah(summary.penghasilan)}</p>
              </div>
            </div>

            {/* Pengeluaran */}
            <div className="bg-surface p-5 rounded-lg border border-border shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-text-secondary">Total Pengeluaran</h3>
                <div className="p-2 bg-danger-light text-danger rounded-md">
                  <ArrowDownRight size={16} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-text-primary">{formatRupiah(summary.pengeluaran)}</p>
              </div>
            </div>

            {/* Selisih */}
            <div className="bg-surface p-5 rounded-lg border border-border shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-text-secondary">Keuntungan Bersih</h3>
                <div className="p-2 bg-primary-light text-primary rounded-md">
                  <Wallet size={16} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-text-primary">{formatRupiah(summary.selisih)}</p>
              </div>
            </div>
          </>
        )}

        {/* Total Transaksi */}
        <div className="bg-surface p-5 rounded-lg border border-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold text-text-secondary">Pcs Terjual (Sesuai Filter)</h3>
              <div className="p-2 bg-warning-light text-warning rounded-md">
                <ShoppingCart size={16} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-text-primary">{summary.totalPcsLaku} <span className="text-base font-normal text-text-secondary">pcs</span></p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-border flex justify-between text-sm">
            <div className="flex flex-col">
              <span className="text-text-muted">Hari ini</span>
              <span className="font-semibold text-text-primary">{summary.pcsHariIni} pcs</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-text-muted">Bulan ini</span>
              <span className="font-semibold text-text-primary">{summary.pcsBulanIni} pcs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Payment Overview */}
        <div className="bg-surface p-5 rounded-lg border border-border shadow-sm">
          <h3 className="text-base font-semibold text-text-primary mb-6">Penjualan Berdasarkan Metode</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-text-primary">Cash (Tunai)</span>
                <span className="text-sm text-text-secondary">{cashPercent}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2 mb-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${cashPercent}%` }}></div>
              </div>
              <p className="text-sm text-text-muted">{formatRupiah(cashTotal)}</p>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-text-primary">QRIS</span>
                <span className="text-sm text-text-secondary">{qrisPercent}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2 mb-1">
                <div className="bg-primary-hover h-2 rounded-full" style={{ width: `${qrisPercent}%` }}></div>
              </div>
              <p className="text-sm text-text-muted">{formatRupiah(qrisTotal)}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
