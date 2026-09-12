'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Plus, Pencil, Trash2, Loader2, LogOut, Camera, X,
  MapPin, Calendar, Users, Tag, AlignLeft, Image as ImageIcon,
  LayoutDashboard, ChevronDown
} from 'lucide-react';

const CATEGORIES = [
  'Kantor & Perusahaan',
  'Sekolah & Kampus',
  'Komunitas & Baksos',
  'Home Service',
] as const;

const BADGES = [
  'Kunjungan Keliling',
  'Bakti Sosial Komunitas',
  'Program Sekolah Sehat',
  'Door to Door VIP',
  'Health & Safety First',
  'Care for Seniors',
];

interface DocItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  participants: number;
  image: string;
  image_public_id: string | null;
  description: string;
  badge: string;
  created_at: string;
}

const emptyForm = {
  title: '',
  category: CATEGORIES[0],
  date: '',
  location: '',
  participants: '',
  description: '',
  badge: BADGES[0],
  imageBase64: '',
  imagePreview: '',
};

export default function AdminDokumentasiPage() {
  const router = useRouter();
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loggingOut, setLoggingOut] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/documentation');
      const data = await res.json();
      setDocs(data.data || []);
    } catch {
      setError('Gagal memuat data dokumentasi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file maksimal 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm((f) => ({ ...f, imageBase64: base64, imagePreview: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const openEdit = (doc: DocItem) => {
    setForm({
      title: doc.title,
      category: doc.category,
      date: doc.date,
      location: doc.location,
      participants: String(doc.participants),
      description: doc.description,
      badge: doc.badge,
      imageBase64: '',
      imagePreview: doc.image,
    });
    setEditingId(doc.id);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload: Record<string, unknown> = {
        title: form.title,
        category: form.category,
        date: form.date,
        location: form.location,
        participants: form.participants,
        description: form.description,
        badge: form.badge,
      };

      if (form.imageBase64) {
        payload.imageBase64 = form.imageBase64;
      }

      const url = editingId ? `/api/documentation/${editingId}` : '/api/documentation';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Terjadi kesalahan');
        return;
      }

      setSuccess(editingId ? 'Dokumentasi berhasil diperbarui!' : 'Dokumentasi berhasil ditambahkan!');
      setShowForm(false);
      fetchDocs();
    } catch {
      setError('Gagal menyimpan data');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/documentation/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setSuccess('Dokumentasi berhasil dihapus!');
      setDeleteId(null);
      fetchDocs();
    } catch {
      setError('Gagal menghapus dokumentasi');
    } finally {
      setSubmitting(false);
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
              <p className="text-xs text-slate-500">Manajemen Dokumentasi</p>
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
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Dokumentasi Kegiatan</h2>
            <p className="text-sm text-slate-500 mt-0.5">{docs.length} dokumentasi tersedia</p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            Tambah Dokumentasi
          </button>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-center justify-between">
            {success}
            <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
          </div>
        )}
        {error && !showForm && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center justify-between">
            {error}
            <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Documentation Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : docs.length === 0 ? (
          <div className="text-center py-24">
            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Belum ada dokumentasi. Tambahkan yang pertama!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {docs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="relative w-full aspect-[4/3] bg-slate-100">
                  <Image
                    src={doc.image}
                    alt={doc.title}
                    fill
                    className="object-cover"
                    unoptimized={doc.image.startsWith('http')}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/70 text-white text-[10px] font-semibold backdrop-blur-sm">
                      {doc.badge}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">{doc.category}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">{doc.title}</h3>

                  <div className="flex flex-col gap-1 mt-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{doc.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{doc.date}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{doc.participants} orang diperiksa</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => openEdit(doc)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-xs font-semibold transition"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(doc.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 text-xs font-semibold transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Form Modal (Create / Edit) */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl my-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingId ? 'Edit Dokumentasi' : 'Tambah Dokumentasi Baru'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" /> Foto Dokumentasi
                  {!editingId && <span className="text-red-500">*</span>}
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-full aspect-video rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 cursor-pointer transition overflow-hidden bg-slate-50 flex flex-col items-center justify-center gap-2 group"
                >
                  {form.imagePreview ? (
                    <>
                      <Image
                        src={form.imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <p className="text-white text-sm font-bold">Ganti Foto</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Camera className="w-8 h-8 text-slate-300" />
                      <p className="text-xs text-slate-400 font-medium">Klik untuk upload foto</p>
                      <p className="text-[10px] text-slate-400">JPG, PNG, WEBP — Maks. 10MB</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" /> Judul <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Judul kegiatan dokumentasi"
                  required
                />
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-8"
                      required
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Badge Label <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                      className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-8"
                      required
                    >
                      {BADGES.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Date & Participants */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="10 September 2026"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> Jumlah Peserta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.participants}
                    onChange={(e) => setForm({ ...form, participants: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Lokasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Nama tempat, Kecamatan, Kabupaten"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <AlignLeft className="w-3.5 h-3.5 text-slate-400" /> Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  placeholder="Deskripsi singkat kegiatan..."
                  required
                />
              </div>

              {/* Error in form */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setError(''); }}
                  className="flex-1 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                  ) : (
                    editingId ? 'Simpan Perubahan' : 'Tambahkan Dokumentasi'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-base font-black text-slate-900 text-center mb-2">Hapus Dokumentasi?</h3>
            <p className="text-xs text-slate-500 text-center mb-6">
              Tindakan ini tidak dapat dibatalkan. Gambar juga akan dihapus dari Cloudinary.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
