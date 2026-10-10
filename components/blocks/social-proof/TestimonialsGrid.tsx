import { Star, Quote } from 'lucide-react';
import { TestimonialItem } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
  themeColor: string;
}

export function TestimonialsGrid({ testimonials, themeColor }: TestimonialsProps) {
  const theme = getTheme(themeColor);

  return (
    <section id="testimonials" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${theme.primaryText}`}>
              ĐÁNH GIÁ THỰC TẾ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Khách Hàng Nói Gì Về Chúng Tôi?
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm">
            Hơn 99.2% doanh nghiệp đối tác tiếp tục gia hạn hợp đồng bảo trì và mở rộng thêm các tính năng mới sau năm đầu tiên.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:bg-white hover:border-slate-300 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{t.feedback}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <h4 className="font-bold text-sm text-slate-900">
                  {t.clientName}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  {t.clientCompany}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
