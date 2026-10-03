'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Loader2, LogOut, X, LayoutDashboard, Package,
  Plus, Trash2, ShoppingBag, Eye, Pencil, Check,
} from 'lucide-react';

interface LensType {
  id: number;
  name: string;
}

export default function AdminJenisLensaPage() {
  const router = useRouter();
  const [lensTypes, setLensTypes] = useState<LensType[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  const fetchLensTypes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lens-types');
      const data = await res.json();
      setLensTypes(data.data || []);
    } catch {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLensTypes(); }, []);

  // Auto-focus the edit input when editing starts
  useEffect(() => {
    if (editingId !== null) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [editingId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    setError('');
    try {
      const res = await fetch('/api/lens-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal menambah jenis lensa');
        return;
      }
      setSuccess(`Jenis lensa "${newName.trim()}" berhasil ditambahkan!`);
      setNewName('');
      fetchLensTypes();
    } catch {
      setError('Gagal menambah jenis lensa');
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (lt: LensType) => {
    setEditingId(lt.id);
    setEditName(lt.name);
    setDeleteConfirm(null);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleSaveEdit = async (id: number) => {
    if (!editName.trim()) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/lens-types/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal menyimpan perubahan');
        return;
      }
      setSuccess(`Jenis lensa berhasil diperbarui menjadi "${editName.trim()}"!`);
      setEditingId(null);
      setEditName('');
      fetchLensTypes();
    } catch {
      setError('Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/lens-types/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setSuccess('Jenis lensa berhasil dihapus!');
      setDeleteConfirm(null);
      fetchLensTypes();
    } catch {
      setError('Gagal menghapus jenis lensa');
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Topbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900">MataCare Admin</h1>
              <p className="text-xs text-slate-500">Manajemen Jenis Lensa</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
            >
              Lihat Website →
            </a>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition"
            >
              {loggingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
              Keluar
            </button>
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 border-t border-slate-100 overflow-x-auto">
            <a
              href="/admin/orderan"
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 border-b-2 border-transparent whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Orderan
            </a>
            <a
              href="/admin/dokumentasi"
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 border-b-2 border-transparent whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5" /> Dokumentasi
            </a>
            <a
              href="/admin/jenis-lensa"
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-blue-600 border-b-2 border-blue-600 whitespace-nowrap"
            >
              <Package className="w-3.5 h-3.5" /> Jenis Lensa
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-black text-slate-900">Jenis Lensa</h2>
          <p className="text-sm text-slate-500 mt-0.5">{lensTypes.length} jenis lensa tersedia</p>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-center justify-between">
            {success}
            <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center justify-between">
            {error}
            <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Add Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Tambah Jenis Lensa Baru</h3>
          <form onSubmit={handleAdd} className="flex gap-3">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Nama jenis lensa, contoh: Anti Radiasi"
              required
            />
            <button
              type="submit"
              disabled={adding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition disabled:opacity-60"
            >
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Tambah
            </button>
          </form>
        </div>

        {/* Lens Types List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : lensTypes.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Belum ada jenis lensa. Tambahkan di atas!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {lensTypes.map((lt) => (
                <li key={lt.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition">

                  {/* Left: icon + name or edit input */}
                  <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-blue-500" />
                    </div>

                    {editingId === lt.id ? (
                      /* Inline edit input */
                      <input
                        ref={editInputRef}
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') { e.preventDefault(); handleSaveEdit(lt.id); }
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-blue-400 bg-white text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-900 truncate">{lt.name}</span>
                    )}
                  </div>

                  {/* Right: action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {editingId === lt.id ? (
                      /* Save / Cancel edit */
                      <>
                        <button
                          onClick={() => handleSaveEdit(lt.id)}
                          disabled={saving || !editName.trim()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition disabled:opacity-60"
                          title="Simpan"
                        >
                          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                          Simpan
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition"
                          title="Batal"
                        >
                          Batal
                        </button>
                      </>
                    ) : deleteConfirm === lt.id ? (
                      /* Delete confirmation */
                      <>
                        <span className="text-xs text-slate-500">Yakin hapus?</span>
                        <button
                          onClick={() => handleDelete(lt.id)}
                          disabled={deleting}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition disabled:opacity-60"
                        >
                          {deleting ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                          Ya, Hapus
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition"
                        >
                          Batal
                        </button>
                      </>
                    ) : (
                      /* Normal: edit + delete buttons */
                      <>
                        <button
                          onClick={() => startEdit(lt)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-500 transition"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setDeleteConfirm(lt.id); setEditingId(null); }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-500 transition"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
