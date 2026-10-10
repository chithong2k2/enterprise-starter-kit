import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface HeroCenteredProps {
  settings: SiteSettings;
}

export function HeroCentered({ settings }: HeroCenteredProps) {
  const theme = getTheme(settings.primaryColor);

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${theme.primaryLight}`}>
          <Sparkles className="w-3.5 h-3.5" />
          Nền Tảng Quản Trị & Công Nghệ B2B
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
          {settings.slogan}
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
          {settings.about}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contact"
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition hover:opacity-90 ${theme.primary}`}
          >
            Đăng Ký Tư Vấn Ngay
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 flex items-center justify-center transition"
          >
            Xem Dịch Vụ Cốt Lõi
          </a>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {settings.stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
              <div className={`text-3xl font-extrabold tracking-tight mb-1 ${theme.primaryText}`}>
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
