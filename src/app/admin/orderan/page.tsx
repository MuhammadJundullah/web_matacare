'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Pencil, Trash2, Loader2, LogOut, X, FileText, ImageDown,
  ShoppingBag, LayoutDashboard, Package, Eye,
} from 'lucide-react';

interface LensType {
  id: number;
  name: string;
}

interface Order {
  id: number;
  order_date: string;
  name: string;
  age: number | null;
  phone: string;
  address: string;
  lens_type: string;
  nominal: number;
  notes: string | null;
  created_at: string;
}

const emptyForm = {
  order_date: '',
  name: '',
  age: '',
  phone: '',
  address: '',
  lens_type: '',
  nominal: '',
  notes: '',
};

export default function AdminOrderanPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [lensTypes, setLensTypes] = useState<LensType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loggingOut, setLoggingOut] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.data || []);
    } catch {
      setError('Gagal memuat data orderan');
    } finally {
      setLoading(false);
    }
  };

  const fetchLensTypes = async () => {
    try {
      const res = await fetch('/api/lens-types');
      const data = await res.json();
      setLensTypes(data.data || []);
    } catch {
      // silent
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchLensTypes();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const openEdit = (order: Order) => {
    setForm({
      order_date: order.order_date,
      name: order.name,
      age: order.age !== null ? String(order.age) : '',
      phone: order.phone,
      address: order.address,
      lens_type: order.lens_type,
      nominal: String(order.nominal),
      notes: order.notes ?? '',
    });
    setEditingId(order.id);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        order_date: form.order_date,
        name: form.name,
        age: form.age ? Number(form.age) : null,
        phone: form.phone,
        address: form.address,
        lens_type: form.lens_type,
        nominal: Number(form.nominal),
        notes: form.notes || null,
      };

      const url = editingId ? `/api/orders/${editingId}` : '/api/orders';
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
      setSuccess(editingId ? 'Order berhasil diperbarui!' : 'Order berhasil ditambahkan!');
      setShowForm(false);
      fetchOrders();
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
      const res = await fetch(`/api/orders/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setSuccess('Order berhasil dihapus!');
      setDeleteId(null);
      fetchOrders();
    } catch {
      setError('Gagal menghapus order');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const formatRupiah = (val: number | string) =>
    'Rp\u00a0' + Number(val).toLocaleString('id-ID');

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[char] as string);

  const invoiceMarkup = (order: Order) => `
    <article class="invoice">
      <header class="invoice-header">
        <div><div class="brand">MataCare <span>Optik</span></div><div class="muted">Layanan Optik & Pemeriksaan Mata</div></div>
        <div class="invoice-label"><div>INVOICE</div><strong>MC-${String(order.id).padStart(5, '0')}</strong></div>
      </header>
      <div class="rule"></div>
      <section class="meta"><div><small>TANGGAL ORDER</small><strong>${escapeHtml(order.order_date)}</strong></div><div><small>NO. INVOICE</small><strong>MC-${String(order.id).padStart(5, '0')}</strong></div></section>
      <h2>Informasi Pelanggan</h2>
      <section class="customer"><div><small>NAMA</small><strong>${escapeHtml(order.name)}</strong></div><div><small>NO. TELEPON</small><strong>${escapeHtml(order.phone)}</strong></div><div><small>UMUR</small><strong>${order.age ?? '—'}${order.age !== null ? ' tahun' : ''}</strong></div><div><small>ALAMAT</small><strong>${escapeHtml(order.address)}</strong></div></section>
      <h2>Rincian Pesanan</h2>
      <table><thead><tr><th>DESKRIPSI</th><th class="right">JUMLAH</th></tr></thead><tbody><tr><td>Order kacamata — ${escapeHtml(order.lens_type)}</td><td class="right">${formatRupiah(order.nominal)}</td></tr></tbody></table>
      ${order.notes ? `<div class="notes"><small>KETERANGAN</small><div>${escapeHtml(order.notes)}</div></div>` : ''}
      <div class="total"><span>Total</span><strong>${formatRupiah(order.nominal)}</strong></div>
      <footer>Terima kasih telah mempercayakan kebutuhan penglihatan Anda kepada MataCare Optik.</footer>
    </article>`;

  const invoiceStyles = `
    *{box-sizing:border-box}body{margin:0;background:#f1f5f9;color:#0f172a;font-family:Arial,sans-serif}.invoice{width:794px;min-height:1123px;margin:32px auto;padding:64px;background:white}.invoice-header,.meta,.total{display:flex;justify-content:space-between;align-items:center}.brand{font-size:27px;font-weight:800;color:#123456}.brand span{color:#2563eb}.muted,small{color:#64748b}.muted{font-size:12px;margin-top:6px}.invoice-label{text-align:right;color:#2563eb;font-size:12px;font-weight:700;letter-spacing:2px}.invoice-label strong{display:block;color:#0f172a;font-size:15px;letter-spacing:0;margin-top:8px}.rule{height:3px;background:#2563eb;margin:28px 0}.meta{background:#f8fafc;padding:18px 20px}.meta>div,.customer>div{display:flex;flex-direction:column;gap:7px}small{font-size:9px;font-weight:700;letter-spacing:1px}.meta strong,.customer strong{font-size:13px;font-weight:600}h2{font-size:14px;margin:32px 0 14px}.customer{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:18px 20px;border:1px solid #e2e8f0;border-radius:8px}table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;background:#f8fafc;color:#64748b;font-size:10px;letter-spacing:1px}th,td{padding:15px;border-bottom:1px solid #e2e8f0}.right{text-align:right}.notes{margin-top:20px;padding:14px;background:#f8fafc;font-size:12px}.notes div{margin-top:8px;white-space:pre-wrap}.total{margin-top:20px;padding:18px 0;border-top:2px solid #0f172a;font-size:16px}.total strong{font-size:21px;color:#2563eb}footer{margin-top:70px;padding-top:18px;border-top:1px solid #e2e8f0;text-align:center;color:#64748b;font-size:11px}@page{size:A4;margin:0}@media print{body{background:white}.invoice{margin:0;width:210mm;min-height:297mm;padding:17mm;box-shadow:none}}`;

  const exportInvoicePdf = (order: Order) => {
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      setError('Izinkan pop-up browser untuk mencetak invoice.');
      return;
    }
    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Invoice MataCare MC-${order.id}</title><style>${invoiceStyles}</style></head><body>${invoiceMarkup(order)}<script>window.onload=()=>{window.print()}<\/script></body></html>`);
    printWindow.document.close();
  };

  const exportInvoicePng = (order: Order) => {
    const svgEscape = (value: string) => escapeHtml(value);
    const lines: Array<[string, number, number, number, string, string]> = [
      ['MataCare Optik', 54, 70, 30, '#123456', 'bold'],
      ['INVOICE', 650, 66, 15, '#2563eb', 'bold'],
      [`MC-${String(order.id).padStart(5, '0')}`, 650, 94, 17, '#0f172a', 'bold'],
      ['Tanggal Order', 54, 150, 13, '#64748b', 'normal'],
      [order.order_date, 54, 176, 17, '#0f172a', 'bold'],
      ['PELANGGAN', 54, 246, 13, '#2563eb', 'bold'],
      ['Nama', 54, 292, 12, '#64748b', 'normal'], [order.name, 54, 317, 17, '#0f172a', 'bold'],
      ['Telepon', 410, 292, 12, '#64748b', 'normal'], [order.phone, 410, 317, 17, '#0f172a', 'bold'],
      ['Alamat', 54, 365, 12, '#64748b', 'normal'], [order.address, 54, 390, 15, '#0f172a', 'normal'],
      ['RINCIAN PESANAN', 54, 470, 13, '#2563eb', 'bold'],
      [`Order kacamata — ${order.lens_type}`, 54, 530, 17, '#0f172a', 'normal'],
      [formatRupiah(order.nominal), 650, 530, 17, '#0f172a', 'bold'],
      ['TOTAL', 54, 620, 14, '#64748b', 'bold'],
      [formatRupiah(order.nominal), 650, 624, 22, '#2563eb', 'bold'],
      ['Terima kasih telah mempercayakan kebutuhan penglihatan Anda kepada MataCare Optik.', 54, 1030, 13, '#64748b', 'normal'],
    ];
    if (order.notes) {
      lines.push([`Keterangan: ${order.notes}`, 54, 690, 14, '#64748b', 'normal']);
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="794" height="1123" viewBox="0 0 794 1123"><rect width="794" height="1123" fill="#fff"/><rect x="54" y="118" width="686" height="3" fill="#2563eb"/><rect x="54" y="215" width="686" height="1" fill="#e2e8f0"/><rect x="54" y="440" width="686" height="1" fill="#e2e8f0"/><rect x="54" y="490" width="686" height="70" rx="8" fill="#f8fafc"/>${lines.map(([text, x, y, size, color, weight]) => `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}"${x === 650 ? ' text-anchor="end"' : ''}>${svgEscape(String(text))}</text>`).join('')}</svg>`;
    const image = new Image();
    const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1588;
      canvas.height = 2246;
      const context = canvas.getContext('2d');
      if (!context) {
        URL.revokeObjectURL(svgUrl);
        setError('Gagal membuat gambar invoice.');
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(svgUrl);
      canvas.toBlob((blob) => {
        if (!blob) {
          setError('Gagal mengunduh gambar invoice.');
          return;
        }
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `invoice-matacare-${order.id}.png`;
        link.click();
        URL.revokeObjectURL(link.href);
      }, 'image/png');
    };
    image.onerror = () => {
      URL.revokeObjectURL(svgUrl);
      setError('Gagal membuat gambar invoice.');
    };
    image.src = svgUrl;
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
              <p className="text-xs text-slate-500">Manajemen Orderan</p>
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
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-blue-600 border-b-2 border-blue-600 whitespace-nowrap"
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
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 border-b-2 border-transparent whitespace-nowrap"
            >
              <Package className="w-3.5 h-3.5" /> Jenis Lensa
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Data Orderan</h2>
            <p className="text-sm text-slate-500 mt-0.5">{orders.length} order tercatat</p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Tambah Order
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

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Belum ada order. Tambahkan yang pertama!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">No</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Tanggal</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Nama</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Umur</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">No HP</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Alamat</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Jenis Lensa</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Nominal</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Keterangan</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order, idx) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 text-slate-400 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{order.order_date}</td>
                      <td className="px-4 py-3 text-slate-900 font-semibold whitespace-nowrap">{order.name}</td>
                      <td className="px-4 py-3 text-slate-600 text-center">{order.age ?? '—'}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{order.phone}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate" title={order.address}>{order.address}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold whitespace-nowrap">{order.lens_type}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-900 font-semibold whitespace-nowrap">{formatRupiah(order.nominal)}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs max-w-[140px] truncate" title={order.notes ?? ''}>{order.notes || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEdit(order)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => exportInvoicePdf(order)}
                            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition"
                            title="Cetak atau simpan invoice sebagai PDF"
                          >
                            <FileText className="w-3.5 h-3.5" /> PDF
                          </button>
                          <button
                            onClick={() => exportInvoicePng(order)}
                            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition"
                            title="Unduh invoice sebagai PNG"
                          >
                            <ImageDown className="w-3.5 h-3.5" /> PNG
                          </button>
                          <button
                            onClick={() => setDeleteId(order.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 transition"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl my-4">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingId ? 'Edit Order' : 'Tambah Order Baru'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Tanggal & Nama */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.order_date}
                    onChange={(e) => setForm({ ...form, order_date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Nama pelanggan"
                    required
                  />
                </div>
              </div>

              {/* Umur & No HP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Umur <span className="text-slate-400 font-normal">(opsional)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Contoh: 35"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    No HP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>
              </div>

              {/* Alamat */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alamat <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  placeholder="Alamat lengkap pelanggan"
                  required
                />
              </div>

              {/* Jenis Lensa */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Jenis Lensa <span className="text-red-500">*</span>
                </label>
                {lensTypes.length === 0 ? (
                  <p className="text-xs text-slate-400">
                    Belum ada jenis lensa. Tambahkan di menu{' '}
                    <a href="/admin/jenis-lensa" className="text-blue-600 underline">Jenis Lensa</a>.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {lensTypes.map((lt) => (
                      <label
                        key={lt.id}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition text-sm font-medium ${
                          form.lens_type === lt.name
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="lens_type"
                          value={lt.name}
                          checked={form.lens_type === lt.name}
                          onChange={() => setForm({ ...form, lens_type: lt.name })}
                          className="accent-blue-600"
                          required
                        />
                        {lt.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Nominal */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nominal (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.nominal}
                  onChange={(e) => setForm({ ...form, nominal: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="0"
                  required
                />
              </div>

              {/* Keterangan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Keterangan <span className="text-slate-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  placeholder="Catatan tambahan..."
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
                    editingId ? 'Simpan Perubahan' : 'Tambahkan Order'
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
            <h3 className="text-base font-black text-slate-900 text-center mb-2">Hapus Order?</h3>
            <p className="text-xs text-slate-500 text-center mb-6">
              Tindakan ini tidak dapat dibatalkan.
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
