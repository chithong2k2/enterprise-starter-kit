import { ArrowRight, PhoneCall } from 'lucide-react';
import { SiteSettings } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface CtaProps {
  settings: SiteSettings;
}

export function CtaBanner({ settings }: CtaProps) {
  const theme = getTheme(settings.primaryColor);

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 rounded-2xl p-8 sm:p-14 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block">
              BẮT ĐẦU CHUYỂN ĐỔI SỐ NGAY HÔM NAY
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Sẵn Sàng Đột Phá Năng Suất Doanh Nghiệp?
            </h3>
            <p className="text-slate-400 text-sm">
              Đăng ký lịch hẹn khảo sát miễn phí. Đội ngũ kỹ sư giải pháp sẽ đề xuất lộ trình tối ưu và bảng giá cụ thể.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <a
              href="#contact"
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition hover:opacity-90 ${theme.primary}`}
            >
              Đăng Ký Tư Vấn Ngay
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${settings.hotline}`}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Gọi Hotline: {settings.hotline.split(' - ')[0]}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
