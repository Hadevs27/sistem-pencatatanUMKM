"use client";

import { useState, useEffect } from "react";
import { Plus, Search, X, Loader2, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export default function PenggunaPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    password: "",
    role: "Staff",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pengguna");
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
      username: item.username,
      password: "", // Leave blank, only fill to change
      role: item.role,
    });
    setIsEditing(true);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) return;
    try {
      const res = await fetch(`/api/pengguna?id=${id}`, { method: "DELETE" });
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
      const payload: any = { ...formData };
      
      if (isEditing && !payload.password) {
        delete payload.password;
      }

      const res = await fetch("/api/pengguna", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as any;
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan pengguna");

      setIsAdding(false);
      setIsEditing(false);
      setFormData({
        id: "",
        username: "",
        password: "",
        role: "Staff",
      });
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredData = data.filter(u => 
    u.username.toLowerCase().includes(search.toLowerCase()) || 
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Kelola Pengguna</h2>
          <p className="text-text-secondary mt-1">Atur akses admin dan staff pada sistem.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => {
            setIsEditing(false);
            setFormData({
              id: "",
              username: "",
              password: "",
              role: "Staff",
            });
            setIsAdding(true);
          }} className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors">
            <Plus className="mr-2 h-5 w-5" />
            Tambah Pengguna
          </button>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-lg border border-border shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted" />
          </div>
          <input type="text" className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
            placeholder="Cari pengguna berdasarkan username atau role..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary uppercase bg-background border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium w-16">No</th>
                <th className="px-6 py-4 font-medium">Username</th>
                <th className="px-6 py-4 font-medium">Password</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Tanggal Dibuat</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">Memuat data...</td></tr>
              ) : filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text-secondary">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">{item.username}</td>
                  <td className="px-6 py-4 text-text-secondary">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {visiblePasswords[item.id] ? (item.plainPassword || "********") : "••••••••"}
                      </span>
                      {item.plainPassword && (
                        <button onClick={() => togglePasswordVisibility(item.id)} className="text-text-muted hover:text-text-primary transition-colors">
                          {visiblePasswords[item.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.role === 'Admin' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700'}`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{new Date(item.createdAt).toLocaleDateString("id-ID")}</td>
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
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">Tidak ada pengguna.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface rounded-lg w-full max-w-md shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-primary">{isEditing ? "Edit Pengguna" : "Tambah Pengguna"}</h3>
              <button onClick={() => setIsAdding(false)} className="text-text-muted hover:text-text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {error && <div className="mb-4 p-3 bg-danger-light text-danger rounded-md text-sm">{error}</div>}
              <form id="add-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Username</label>
                  <input required type="text" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Password {isEditing && <span className="text-text-muted font-normal">(Kosongkan jika tidak ingin diubah)</span>}
                  </label>
                  <input required={!isEditing} type="password" minLength={6} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Role</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                  </select>
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
