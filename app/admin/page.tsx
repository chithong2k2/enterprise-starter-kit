import Link from 'next/link';
import { 
  Users, 
  Briefcase, 
  FileText, 
  Clock, 
  ArrowUpRight, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Palette
} from 'lucide-react';
import { getDatabase } from '@/lib/db';
import { getTheme } from '@/lib/theme';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const db = await getDatabase();
  const theme = getTheme(db.settings.primaryColor);

  const totalLeads = db.leads.length;
  const newLeads = db.leads.filter(l => l.status === 'new').length;
  const totalServices = db.services.length;
  const totalPosts = db.posts.length;

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bảng Điều Khiển Tổng Quan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản trị nội dung và tiếp nhận khách hàng tiềm năng cho <strong>{db.settings.companyName}</strong>.
          </p>
        </div>

        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition"
        >
          Thông Tin Công Ty
        </Link>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Khách Chờ Tư Vấn
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {newLeads}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tổng cộng {totalLeads} yêu cầu liên hệ
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Dịch Vụ Đang Mở
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {totalServices}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Hiển thị trên trang chủ
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Bài Viết / Tin Tức
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {totalPosts}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Hỗ trợ chuẩn SEO Google
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Trạng Thái Hệ Thống
            </span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Hoạt động 100%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Local JSON Database Ready
          </p>
        </div>
      </div>

      {/* RECENT LEADS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Khách Hàng Mới Gửi Yêu Cầu Gần Đây
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dữ liệu được cập nhật tức thì khi khách điền form ngoài trang chủ.
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Xem tất cả <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3">Họ Tên</th>
                <th className="pb-3">Số Điện Thoại</th>
                <th className="pb-3">Công Ty</th>
                <th className="pb-3">Nội Dung</th>
                <th className="pb-3">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {db.leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 font-bold text-slate-900">{lead.name}</td>
                  <td className="py-3.5 font-medium text-slate-700">{lead.phone}</td>
                  <td className="py-3.5 text-slate-500">{lead.company || 'Cá nhân'}</td>
                  <td className="py-3.5 text-slate-600 max-w-xs truncate">{lead.message}</td>
                  <td className="py-3.5">
                    {lead.status === 'new' && (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                        MỚI NHẬN
                      </span>
                    )}
                    {lead.status === 'contacted' && (
                      <span className="bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded-full text-[10px]">
                        ĐÃ LIÊN HỆ
                      </span>
                    )}
                    {lead.status === 'closed' && (
                      <span className="bg-slate-100 text-slate-600 font-medium px-2.5 py-0.5 rounded-full text-[10px]">
                        ĐÃ CHỐT
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STARTER KIT PLAYBOOK CALLOUT (SOLID - NO GRADIENTS) */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm">
        <h3 className="font-extrabold text-lg mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          Mẹo Cho Nhà Phát Triển (Dev Startup):
        </h3>
        <p className="text-xs text-blue-100 leading-relaxed max-w-3xl">
          Khi nhận dự án mới cho khách hàng B, bạn chỉ cần <strong>Clone thư mục này</strong>, vào mục 
          <strong> Cài đặt & Đổi màu</strong> để nhập tên công ty và hotline của khách. Giao diện trang chủ sẽ tự động 
          thay đổi nhận diện thương hiệu trong vài giây mà không cần chạm vào code logic!
        </p>
      </div>

    </div>
  );
}
