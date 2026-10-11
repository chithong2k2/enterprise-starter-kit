'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Save, 
  CheckCircle2, 
  Loader2, 
  LayoutTemplate,
  Sparkles,
  Link as LinkIcon,
  Plus,
  Trash2
} from 'lucide-react';
import { PageConfig, PageSection, NavItem } from '@/lib/db';

export default function AdminPageBuilder() {
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/builder')
      .then(r => r.json())
      .then(data => {
        if (data.config) setConfig(data.config);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = (id: string) => {
    if (!config) return;
    setConfig({
      ...config,
      sections: config.sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    });
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (!config) return;
    const newSections = [...config.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    setConfig({ ...config, sections: newSections });
  };

  const handleVariantChange = (id: string, variant: string) => {
    if (!config) return;
    setConfig({
      ...config,
      sections: config.sections.map(s => s.id === id ? { ...s, variant } : s)
    });
  };

  // NavItems handlers
  const handleNavItemChange = (id: string, field: 'label' | 'href', value: string) => {
    if (!config) return;
    setConfig({
      ...config,
      navItems: (config.navItems || []).map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const handleAddNavItem = () => {
    if (!config) return;
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      label: 'Mục Mới',
      href: '#contact'
    };
    setConfig({
      ...config,
      navItems: [...(config.navItems || []), newItem]
    });
  };

  const handleDeleteNavItem = (id: string) => {
    if (!config) return;
    setConfig({
      ...config,
      navItems: (config.navItems || []).filter(item => item.id !== id)
    });
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !config) {
    return (
      <div className="p-12 flex justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Trình Kéo Ghép Bố Cục Trang Chủ (Page Builder)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tùy biến Menu điều hướng, mẫu Header, Footer, bật/tắt và sắp xếp thứ tự hiển thị từng khối trên trang chủ.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Lưu Bố Cục
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-semibold">Đã lưu bố cục thành công! Hãy ra trang chủ kiểm tra ngay.</p>
        </div>
      )}

      {/* 1. DYNAMIC NAVIGATION MENU BUILDER */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-emerald-600" />
              Menu Điều Hướng Trên Thanh Header & Footer
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Thêm, sửa nhãn hoặc xóa các liên kết điều hướng trên Header và Footer đồng bộ 100%.
            </p>
          </div>

          <button
            onClick={handleAddNavItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Thêm Liên Kết
          </button>
        </div>

        <div className="space-y-2.5">
          {(config.navItems || []).map((item, idx) => (
            <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-white border border-slate-200 font-bold text-xs text-slate-500 flex items-center justify-center shrink-0">
                {idx + 1}
              </span>

              <div className="grid grid-cols-2 gap-3 flex-1">
                <div>
                  <input
                    type="text"
                    value={item.label}
                    placeholder="Tên hiển thị (Vd: Về chúng tôi)"
                    onChange={(e) => handleNavItemChange(item.id, 'label', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={item.href}
                    placeholder="Đường dẫn (Vd: #about hoặc /blog)"
                    onChange={(e) => handleNavItemChange(item.id, 'href', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-mono text-slate-600 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={() => handleDeleteNavItem(item.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                title="Xóa liên kết này"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. HEADER & FOOTER VARIANT PICKERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* HEADER VARIANT */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-blue-600" />
            Kiểu Dáng Header (Thanh Điều Hướng)
          </h2>

          <div className="space-y-2">
            {[
              { id: 'topbar', name: 'Header Kèm Hotline Topbar (Corporate)', desc: 'Thanh thông báo hotline trên cùng + Menu tiêu chuẩn' },
              { id: 'classic', name: 'Header Cổ Điển Logo Trái (Standard)', desc: 'Logo bên trái, Menu chính giữa, nút CTA bên phải' },
              { id: 'floating', name: 'Header Đảo Nổi (Modern Island)', desc: 'Thanh bo tròn nổi giữa màn hình phong cách Tech/Startup' },
            ].map(h => (
              <label 
                key={h.id}
                onClick={() => setConfig({ ...config, headerVariant: h.id as any })}
                className={`block p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                  config.headerVariant === h.id 
                    ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-semibold' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-bold">{h.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{h.desc}</div>
              </label>
            ))}
          </div>
        </div>

        {/* FOOTER VARIANT */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-indigo-600" />
            Kiểu Dáng Footer (Chân Trang)
          </h2>

          <div className="space-y-2">
            {[
              { id: 'corporate', name: 'Footer 4 Cột Doanh Nghiệp (Corporate)', desc: 'Đầy đủ thông tin giới thiệu, liên kết, giải pháp và trụ sở' },
              { id: 'minimal', name: 'Footer 1 Dòng Tối Giản (Minimal)', desc: 'Dành cho Landing Page ngắn, tinh gọn' },
            ].map(f => (
              <label 
                key={f.id}
                onClick={() => setConfig({ ...config, footerVariant: f.id as any })}
                className={`block p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                  config.footerVariant === f.id 
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-bold">{f.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{f.desc}</div>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* 3. SECTION REORDER & TOGGLE LIST */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Sắp Xếp & Bật/Tắt Các Khối Trên Trang Chủ
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dùng nút mũi tên để di chuyển thứ tự hiển thị từ trên xuống dưới.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {config.sections.map((sec, idx) => (
            <div 
              key={sec.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                sec.enabled 
                  ? 'bg-white border-slate-200' 
                  : 'bg-slate-50 border-slate-200/60 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-100 font-bold text-xs text-slate-500 flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>

                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    {sec.title}
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {sec.type}
                    </span>
                  </h3>
                </div>
              </div>

              {/* CONTROLS */}
              <div className="flex items-center gap-2 shrink-0">
                {/* VARIANT SELECTOR FOR HERO */}
                {sec.type === 'hero' && (
                  <select
                    value={sec.variant}
                    onChange={(e) => handleVariantChange(sec.id, e.target.value)}
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium"
                  >
                    <option value="split">Mẫu: Chia 2 cột (Split)</option>
                    <option value="centered">Mẫu: Căn giữa (Centered)</option>
                    <option value="form">Mẫu: Nhúng Form trực tiếp (With Form)</option>
                  </select>
                )}

                {/* MOVE BUTTONS */}
                <button
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-30 cursor-pointer"
                  title="Di chuyển lên"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === config.sections.length - 1}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-30 cursor-pointer"
                  title="Di chuyển xuống"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* ENABLE / DISABLE TOGGLE */}
                <button
                  onClick={() => handleToggle(sec.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                    sec.enabled 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {sec.enabled ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {sec.enabled ? 'Đang Bật' : 'Đã Ẩn'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
