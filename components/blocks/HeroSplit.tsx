import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface HeroSplitProps {
  settings: SiteSettings;
}

// ponytail: clean solid corporate hero layout; no gradients; high readability
export function HeroSplit({ settings }: HeroSplitProps) {
  const theme = getTheme(settings.primaryColor);

  return (
    <section className="relative py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${theme.primaryLight}`}>
              <Sparkles className="w-3.5 h-3.5" />
              Giải Pháp Công Nghệ B2B
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {settings.slogan}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {settings.about}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#contact"
                className={`px-7 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition hover:opacity-90 ${theme.primary}`}
              >
                Đặt Lịch Khảo Sát Doanh Nghiệp
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="px-7 py-3.5 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 flex items-center justify-center transition"
              >
                Khám Phá Dịch Vụ
              </a>
            </div>

            {/* TRUST INDICATORS */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Bảo Mật Tiêu Chuẩn Doanh Nghiệp
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                99.9% Uptime Cam Kết
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Hỗ Trợ Kỹ Thuật 24/7
              </div>
            </div>
          </div>

          {/* RIGHT: MOCKUP DASHBOARD BOX (SOLID FLAT DESIGN) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">enterprise.portal.v1</span>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Tỷ lệ tăng trưởng vận hành</p>
                <div className="text-3xl font-black text-white">+148.5%</div>
                <p className="text-xs text-emerald-400 mt-1 font-medium">↑ Giảm 65% thời gian xử lý thủ công</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="text-xl font-bold text-white">250+</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Khách hàng DN</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="text-xl font-bold text-white">350+</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Dự án bàn giao</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
                🚀 Sẵn sàng mở rộng module: Tự động hóa CRM, ERP, và AI Ops trong cùng một nền tảng.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
