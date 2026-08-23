"use client";

import { useState, useEffect } from "react";
import { Plus, Search, X, Loader2, Edit, Trash2 } from "lucide-react";

export default function BahanBakuPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    namaBahan: "",
    kuantiti: "",
    tanggalBuat: new Date().toISOString().split('T')[0],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inventori/bahan-baku");
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
  }, []);

  const handleEdit = (item: any) => {
    setFormData({
      id: item.id,
      namaBahan: item.namaBahan,
      kuantiti: item.kuantiti,
      tanggalBuat: item.tanggalBuat,
    });
    setIsEditing(true);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`/api/inventori/bahan-baku?id=${id}`, { method: "DELETE" });
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
      const res = await fetch("/api/inventori/bahan-baku", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = (await res.json()) as any;
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan data");

      setIsAdding(false);
      setIsEditing(false);
      setFormData({
        id: "",
        namaBahan: "",
        kuantiti: "",
        tanggalBuat: new Date().toISOString().split('T')[0],
      });
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredData = data.filter((item) =>
    item.namaBahan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Bahan Baku</h1>
          <p className="text-text-secondary mt-1">Kelola data bahan baku inventori Anda.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsAdding(true);
              setIsEditing(false);
              setFormData({
                id: "",
                namaBahan: "",
                kuantiti: "",
                tanggalBuat: new Date().toISOString().split('T')[0],
              });
            }}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors font-medium text-sm"
          >
            <Plus className="mr-2 h-5 w-5" />
            Tambah Data
          </button>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-lg border border-border shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted" />
          </div>
          <input type="text" className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
            placeholder="Cari bahan baku..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary uppercase bg-background border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium w-16">No</th>
                <th className="px-6 py-4 font-medium">Nama Bahan</th>
                <th className="px-6 py-4 font-medium">Kuantiti (Kg/Gram)</th>
                <th className="px-6 py-4 font-medium">Tanggal Buat</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-text-muted">Memuat data...</td></tr>
              ) : filteredData.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text-secondary">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">{item.namaBahan}</td>
                  <td className="px-6 py-4 text-text-secondary">{item.kuantiti}</td>
                  <td className="px-6 py-4 text-text-secondary">{item.tanggalBuat}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 transition-colors p-1" title="Edit">
                      <Edit className="h-4 w-4 inline" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition-colors p-1" title="Hapus">
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && filteredData.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-text-muted">Tidak ada data.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah/Edit */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface rounded-lg w-full max-w-md shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-text-primary">
                {isEditing ? "Edit Bahan Baku" : "Tambah Bahan Baku"}
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-text-muted hover:text-text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {error && (
                <div className="mb-4 p-3 bg-danger-light text-danger rounded-md text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Nama Bahan</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.namaBahan}
                    onChange={(e) => setFormData({ ...formData, namaBahan: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Kuantiti (Kg/Gram)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 5 Kg atau 500 Gram"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.kuantiti}
                    onChange={(e) => setFormData({ ...formData, kuantiti: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Tanggal Buat</label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.tanggalBuat}
                    onChange={(e) => setFormData({ ...formData, tanggalBuat: e.target.value })}
                  />
                </div>
                
                <div className="pt-4 border-t border-border flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2 border border-border rounded-md text-text-secondary hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors flex items-center disabled:opacity-50"
                  >
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
