import { Target, Eye, Award, CheckCircle } from 'lucide-react';
import { SiteSettings } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface AboutProps {
  settings: SiteSettings;
}

export function AboutStory({ settings }: AboutProps) {
  const theme = getTheme(settings.primaryColor);

  return (
    <section id="about" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: TEXT */}
          <div className="lg:col-span-6 space-y-6">
            <span className={`text-xs font-bold uppercase tracking-widest block ${theme.primaryText}`}>
              VỀ CHÚNG TÔI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Kiến Tạo Giá Trị Bền Vững Cho Doanh Nghiệp
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Chúng tôi không chỉ là đơn vị lập trình phần mềm, mà là người đồng hành chiến lược cùng doanh nghiệp chuẩn hóa quy trình, loại bỏ các mắt xích thừa và chuyển dịch dữ liệu an toàn.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Target className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Sứ Mệnh Cốt Lõi</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Đưa các giải pháp công nghệ cao cấp nhất tiếp cận được các doanh nghiệp vừa và nhỏ với chi phí hợp lý nhất.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Eye className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Tầm Nhìn 2030</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Trở thành đơn vị tư vấn và phát triển giải pháp B2B đáng tin cậy hàng đầu khu vực cho hơn 1,000+ doanh nghiệp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: METRICS & CERTIFICATIONS */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-8">
            <div className="border-b border-slate-800 pb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                NĂNG LỰC TRIỂN KHAI
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Con Số Biết Nói
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {settings.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Đạt tiêu chuẩn ISO 27001 về An Toàn Thông Tin & Quản Trị Dự Án chuẩn Agile/Scrum.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
