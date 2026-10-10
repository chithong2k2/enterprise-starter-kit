import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteSettings, ServiceItem } from '@/lib/db';
import { getTheme } from '@/lib/theme';
import ContactForm from '@/components/ContactForm';

interface HeroWithFormProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

export function HeroWithForm({ settings, services }: HeroWithFormProps) {
  const theme = getTheme(settings.primaryColor);

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: TEXT */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${theme.primaryLight}`}>
              <Sparkles className="w-3.5 h-3.5" />
              Tư Vấn Giải Pháp Trực Tiếp
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {settings.slogan}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {settings.about}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Khảo sát hiện trạng & đề xuất phương án trong 24 giờ</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Bàn giao mã nguồn độc lập, không phụ thuộc nền tảng</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Cam kết bảo mật dữ liệu doanh nghiệp chuẩn ISO/IEC</span>
              </div>
            </div>
          </div>

          {/* RIGHT: EMBEDDED FORM */}
          <div className="lg:col-span-6">
            <ContactForm services={services} themeColor={settings.primaryColor} />
          </div>

        </div>
      </div>
    </section>
  );
}
