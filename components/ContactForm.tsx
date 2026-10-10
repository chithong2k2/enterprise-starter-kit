'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ServiceItem } from '@/lib/db';
import { getTheme, ThemeKey } from '@/lib/theme';

interface ContactFormProps {
  services: ServiceItem[];
  themeColor: string;
}

export default function ContactForm({ services, themeColor }: ContactFormProps) {
  const theme = getTheme(themeColor);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: services[0]?.slug || '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gửi thất bại');
      }

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        service: services[0]?.slug || '',
        message: ''
      });
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-100 p-8 sm:p-10">
      <div className="mb-6">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${theme.badge}`}>
          TƯ VẤN MIỄN PHÍ 24/7
        </span>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Đăng ký Tư vấn & Khảo sát Giải pháp
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Điền thông tin bên dưới, chuyên gia của chúng tôi sẽ liên hệ lại trong vòng 15 phút.
        </p>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Gửi thông tin thành công!</p>
            <p className="text-xs text-emerald-700 mt-0.5">
              Yêu cầu của bạn đã được chuyển vào hệ thống CRM. Chuyên viên sẽ gọi điện tư vấn sớm nhất.
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="text-xs font-medium text-emerald-900 underline mt-2 hover:opacity-80"
            >
              Gửi thêm yêu cầu khác
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <p className="text-xs font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Họ và tên <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Nguyễn Văn A"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${theme.primaryRing} transition`}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Số điện thoại <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="0912 345 678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${theme.primaryRing} transition`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email công việc
            </label>
            <input
              type="email"
              placeholder="example@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${theme.primaryRing} transition`}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Tên Doanh nghiệp / Tổ chức
            </label>
            <input
              type="text"
              placeholder="Công ty ABC..."
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${theme.primaryRing} transition`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Dịch vụ quan tâm
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${theme.primaryRing} transition bg-white`}
          >
            {services.map((srv) => (
              <option key={srv.id} value={srv.slug}>
                {srv.title}
              </option>
            ))}
            <option value="other">Tư vấn giải pháp khác</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Mô tả nhu cầu / Bài toán cần giải quyết <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="Ví dụ: Chúng tôi cần xây dựng hệ thống quản lý chuỗi 5 chi nhánh, cần tính năng xuất hóa đơn và phân quyền nhân viên..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${theme.primaryRing} transition`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition duration-200 cursor-pointer ${theme.primary} disabled:opacity-60`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang gửi thông tin...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Gửi yêu cầu khảo sát ngay
            </>
          )}
        </button>
      </form>
    </div>
  );
}
