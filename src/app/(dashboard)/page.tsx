import { ArrowUpRight, ArrowDownRight, Wallet, ShoppingCart } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { getDb } from "@/lib/db";
import { penjualan, penghasilan, pengeluaran } from "@/db/schema";
import { desc } from "drizzle-orm";



import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();
  const role = session?.user?.role || 'Staff';

  const db = getDb();

  // 1. Fetch Penjualan
  const penjualanData = await db.select().from(penjualan).orderBy(desc(penjualan.tanggal));
  let cashTotal = 0;
  let qrisTotal = 0;
  
  penjualanData.forEach(p => {
    const totalRow = p.nominal * p.pcsLaku;
    if (p.metode === "Cash") cashTotal += totalRow;
    if (p.metode === "Qris") qrisTotal += totalRow;
  });
  const totalPenjualan = cashTotal + qrisTotal;

  // 2. Fetch Penghasilan Operasional
  const penghasilanData = await db.select().from(penghasilan).orderBy(desc(penghasilan.tanggal));
  const totalPenghasilanOp = penghasilanData.reduce((acc, curr) => acc + curr.nominal, 0);

  // 3. Fetch Pengeluaran Operasional
  const pengeluaranData = await db.select().from(pengeluaran).orderBy(desc(pengeluaran.tanggal));
  const totalPengeluaran = pengeluaranData.reduce((acc, curr) => acc + curr.nominal, 0);

  // Totals
  const totalPemasukan = totalPenjualan + totalPenghasilanOp;
  const summary = {
    penghasilan: totalPemasukan,
    pengeluaran: totalPengeluaran,
    selisih: totalPemasukan - totalPengeluaran,
    totalTransaksi: penjualanData.length,
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
        <div className="bg-surface p-5 rounded-lg border border-border shadow-sm">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-text-secondary">Transaksi Penjualan</h3>
            <div className="p-2 bg-warning-light text-warning rounded-md">
              <ShoppingCart size={16} />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-2xl font-bold text-text-primary">{summary.totalTransaksi} <span className="text-base font-normal text-text-secondary">kali</span></p>
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
