"use client";

import { use, useState, useEffect } from "react";
import { Plus, Search, X, Loader2, Edit, Trash2, Printer, FileText, Table as TableIcon } from "lucide-react";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatRupiah } from "@/lib/utils";

export default function PenjualanPage({ params }: { params: Promise<{ metode: string }> }) {
  const resolvedParams = use(params);
  const metode = resolvedParams.metode.charAt(0).toUpperCase() + resolvedParams.metode.slice(1);
  const title = `Penjualan ${metode}`;

  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showLaporan, setShowLaporan] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    idTransaksi: "",
    metode: metode,
    tanggal: new Date().toISOString().split('T')[0],
    nominal: "",
    pcsLaku: "",
    keterangan: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/penjualan?metode=${metode}`);
      const json = (await res.json()) as any;
      
      if (json.success) setData(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Update default form data if metode changes
    setFormData(prev => ({ ...prev, metode }));
  }, [metode]);

  const handleEdit = (item: any) => {
    setFormData({
      idTransaksi: item.idTransaksi,
      metode,
      tanggal: item.tanggal,
      nominal: item.nominal.toString(),
      pcsLaku: item.pcsLaku.toString(),
      keterangan: item.keterangan || "",
    });
    setIsEditing(true);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`/api/penjualan?id=${id}`, { method: "DELETE" });
      const json = (await res.json()) as any;
      if (!res.ok) throw new Error(json.error);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/penjualan", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = (await res.json()) as any;
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan data");

      setIsAdding(false);
      setIsEditing(false);
      setFormData({
        idTransaksi: "",
        metode,
        tanggal: new Date().toISOString().split('T')[0],
        nominal: "",
        pcsLaku: "",
        keterangan: "",
      });
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredData = data.filter(b => 
    b.keterangan?.toLowerCase().includes(search.toLowerCase()) || 
    b.tanggal.includes(search)
  );

  const exportToExcel = () => {
    const exportData = filteredData.map((item, idx) => ({
      "No": idx + 1,
      "Nominal (Rp)": item.nominal,
      "Pcs yang laku": item.pcsLaku,
      "Total Nominal": item.nominal * item.pcsLaku,
      "Tanggal": item.tanggal,
      "Keterangan": item.keterangan || "-"
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    XLSX.writeFile(workbook, `Laporan_${title.replace(' ', '_')}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Laporan ${title}`, 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["No", "Nominal (Rp)", "Pcs yang laku", "Total Nominal", "Tanggal", "Keterangan"]],
      body: filteredData.map((item, idx) => [
        idx + 1,
        formatRupiah(item.nominal),
        item.pcsLaku,
        formatRupiah(item.nominal * item.pcsLaku),
        item.tanggal,
        item.keterangan || "-"
      ]),
    });
    doc.save(`Laporan_${title.replace(' ', '_')}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
          <p className="text-text-secondary mt-1">Catat transaksi {title.toLowerCase()} harian Anda.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowLaporan(true)} className="flex items-center px-4 py-2 border border-border bg-white text-text-secondary rounded-md font-medium hover:bg-gray-50 transition-colors">
            <Printer className="mr-2 h-5 w-5" />
            Laporan
          </button>
          <button onClick={() => {
            setIsEditing(false);
            setFormData({
              idTransaksi: "",
              metode,
              tanggal: new Date().toISOString().split('T')[0],
              nominal: "",
              pcsLaku: "",
              keterangan: "",
            });
            setIsAdding(true);
          }} className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors">
            <Plus className="mr-2 h-5 w-5" />
            Tambah {title}
          </button>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-lg border border-border shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted" />
          </div>
          <input type="text" className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
            placeholder="Cari transaksi..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary uppercase bg-background border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium w-16">No</th>
                <th className="px-6 py-4 font-medium">Nominal (Rp)</th>
                <th className="px-6 py-4 font-medium">Pcs yang laku</th><th className="px-6 py-4 font-medium">Total Nominal</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Keterangan</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">Memuat data...</td></tr>
              ) : filteredData.map((item, idx) => (
                <tr key={item.idTransaksi || idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text-secondary">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">{formatRupiah(item.nominal)}</td>
                  <td className="px-6 py-4 text-text-secondary">{item.pcsLaku}</td><td className="px-6 py-4 font-bold text-success">{formatRupiah(item.nominal * item.pcsLaku)}</td>
                  <td className="px-6 py-4 text-text-secondary">{item.tanggal}</td>
                  <td className="px-6 py-4 text-text-secondary">{item.keterangan || "-"}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 transition-colors p-1" title="Edit">
                      <Edit className="h-4 w-4 inline" />
                    </button>
                    <button onClick={() => handleDelete(item.idTransaksi)} className="text-red-600 hover:text-red-800 transition-colors p-1" title="Hapus">
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && filteredData.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">Tidak ada data.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showLaporan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface rounded-lg w-full max-w-4xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-primary">Preview Laporan {title}</h3>
              <button onClick={() => setShowLaporan(false)} className="text-text-muted hover:text-text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-0 overflow-y-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-secondary uppercase bg-gray-100 border-b border-border sticky top-0">
                  <tr>
                    <th className="px-6 py-3 w-16">No</th>
                    <th className="px-6 py-3">Nominal (Rp)</th>
                    <th className="px-6 py-3">Pcs yang laku</th><th className="px-6 py-3">Total Nominal</th>
                    <th className="px-6 py-3">Tanggal</th>
                    <th className="px-6 py-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredData.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-3">{idx + 1}</td>
                      <td className="px-6 py-3 font-medium">{formatRupiah(item.nominal)}</td>
                      <td className="px-6 py-3">{item.pcsLaku}</td><td className="px-6 py-3 font-bold text-success">{formatRupiah(item.nominal * item.pcsLaku)}</td>
                      <td className="px-6 py-3">{item.tanggal}</td>
                      <td className="px-6 py-3">{item.keterangan || "-"}</td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-8 text-center">Tidak ada data.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-border bg-gray-50 flex justify-end gap-3">
              <button onClick={exportToPDF} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                <FileText className="mr-2 h-4 w-4" /> Download PDF
              </button>
              <button onClick={exportToExcel} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                <TableIcon className="mr-2 h-4 w-4" /> Download Excel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface rounded-lg w-full max-w-md shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-primary">{isEditing ? `Edit ${title}` : `Tambah ${title}`}</h3>
              <button onClick={() => setIsAdding(false)} className="text-text-muted hover:text-text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {error && <div className="mb-4 p-3 bg-danger-light text-danger rounded-md text-sm">{error}</div>}
              <form id="add-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Tanggal</label>
                  <input required type="date" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Nominal (Rp)</label>
                    <input required type="number" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.nominal} onChange={e => setFormData({...formData, nominal: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Pcs yang laku</label>
                    <input required type="number" min="1" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.pcsLaku} onChange={e => setFormData({...formData, pcsLaku: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Keterangan (Opsional)</label>
                  <input type="text" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.keterangan} onChange={e => setFormData({...formData, keterangan: e.target.value})} />
                </div>
              </form>
            </div>
            <div className="px-6 py-4 border-t border-border bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 bg-white border border-border text-text-secondary rounded-md hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button type="submit" form="add-form" disabled={submitting} className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors disabled:opacity-70">
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
