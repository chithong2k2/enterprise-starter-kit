'use client';

import React, { useState, useEffect } from 'react';
import { Inbox, Phone, Mail, Building, Trash2, Check, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { LeadItem } from '@/lib/db';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      // In Next.js, we can read via our data api or fetch
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'new' | 'contacted' | 'closed') => {
    setActionLoading(id);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa liên hệ này không?')) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== id));
      }
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Quản Lý Khách Hàng Gửi Yêu Cầu (Leads)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Tất cả yêu cầu khảo sát, báo giá được gửi từ form trang chủ sẽ hiển thị tại đây.
        </p>
      </div>

      {loading ? (
        <div className="p-12 flex justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">Chưa có liên hệ nào</h3>
          <p className="text-xs text-slate-400 mt-1">Hãy thử ra trang chủ điền form để thấy dữ liệu nhảy vào đây!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div 
              key={lead.id} 
              className={`bg-white rounded-2xl p-6 border transition shadow-xs ${
                lead.status === 'new' ? 'border-emerald-300 ring-2 ring-emerald-50' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center text-sm">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      {lead.name}
                      {lead.status === 'new' && (
                        <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          MỚI NHẬN
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Gửi lúc: {new Date(lead.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(lead.id, 'contacted')}
                    disabled={actionLoading === lead.id}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      lead.status === 'contacted' 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Đã liên hệ
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(lead.id, 'closed')}
                    disabled={actionLoading === lead.id}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      lead.status === 'closed' 
                        ? 'bg-emerald-600 text-white border-emerald-600' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Đã chốt HĐ
                  </button>
                  <button
                    onClick={() => handleDelete(lead.id)}
                    disabled={actionLoading === lead.id}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                    title="Xóa liên hệ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 mb-4 bg-slate-50 p-3.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <strong>SĐT:</strong> {lead.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <strong>Email:</strong> {lead.email || 'Chưa cung cấp'}
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-indigo-600" />
                  <strong>Cty:</strong> {lead.company || 'Cá nhân'}
                </div>
              </div>

              <div className="text-xs text-slate-800 bg-slate-100/70 p-3.5 rounded-xl font-medium leading-relaxed">
                <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Nội dung nhu cầu:</span>
                {lead.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
