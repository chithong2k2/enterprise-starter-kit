'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Trash2, CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';
import { ServiceItem } from '@/lib/db';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    icon: 'Briefcase',
    shortDesc: '',
    featuresText: '',
    order: 1
  });

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data.services);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const features = formData.featuresText
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          icon: formData.icon,
          shortDesc: formData.shortDesc,
          features: features.length > 0 ? features : ['Giải pháp chuyên sâu', 'Hỗ trợ 24/7'],
          order: Number(formData.order) || 1
        })
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ title: '', slug: '', icon: 'Briefcase', shortDesc: '', featuresText: '', order: 1 });
        fetchServices();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Quản Lý Danh Mục Dịch Vụ
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Các gói giải pháp hiển thị trong phần &quot;Dịch vụ cốt lõi&quot; ngoài trang chủ.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Thêm Dịch Vụ Mới
        </button>
      </div>

      {loading ? (
        <div className="p-12 flex justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <div key={srv.id} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    #{srv.order}
                  </span>
                  <button
                    onClick={() => handleDelete(srv.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                    title="Xóa dịch vụ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {srv.shortDesc}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  {srv.features.map((f, idx) => (
                    <div key={idx} className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL THÊM DỊCH VỤ */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Thêm Dịch Vụ Mới
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Dịch vụ mới sẽ xuất hiện ngay trên trang chủ sau khi lưu.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Tên dịch vụ / Giải pháp
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tư vấn Chuyển đổi số Doanh nghiệp"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Mô tả ngắn gọn
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Tóm tắt giá trị mang lại cho khách hàng..."
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Các tính năng nổi bật (Mỗi dòng 1 tính năng)
                </label>
                <textarea
                  rows={3}
                  placeholder="Khảo sát quy trình&#10;Triển khai trong 2 tuần&#10;Hỗ trợ kỹ thuật 24/7"
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition disabled:opacity-60 flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Lưu & Hiển thị
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
