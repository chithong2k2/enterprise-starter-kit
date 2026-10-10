import { ServiceItem } from '@/lib/db';
import { getTheme } from '@/lib/theme';
import { CheckCircle2, ChevronRight, Code2, Briefcase, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

interface ServiceBentoProps {
  services: ServiceItem[];
  themeColor: string;
}

function renderServiceIcon(name: string, className: string) {
  switch (name) {
    case 'Code2': return <Code2 className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    default: return <Sparkles className={className} />;
  }
}

export function ServiceBento({ services, themeColor }: ServiceBentoProps) {
  const theme = getTheme(themeColor);

  return (
    <section id="services" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${theme.primaryText}`}>
              DỊCH VỤ CHIẾN LƯỢC
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hệ Sinh Thái Giải Pháp Toàn Diện
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm">
            Tất cả giải pháp được thiết kế theo mô hình khối mô-đun (modular), dễ dàng tích hợp và mở rộng theo sự phát triển của doanh nghiệp.
          </p>
        </div>

        {/* BENTO GRID (ASIMMETRICAL FLAT CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const isFeatured = idx === 0 || idx === 3;
            return (
              <div
                key={srv.id}
                className={`p-8 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isFeatured 
                    ? 'md:col-span-2 bg-slate-50 border-slate-300' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${theme.primaryLight}`}>
                    {renderServiceIcon(srv.icon, `w-6 h-6 ${theme.primaryText}`)}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-200/80 mb-6">
                    {srv.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${theme.primaryText} hover:underline`}
                >
                  Tư vấn chi tiết gói này
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
