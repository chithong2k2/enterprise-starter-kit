import Link from 'next/link';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Inbox, 
  Settings, 
  Globe, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { getSettings, getLeads } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const leads = await getLeads();
  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        
        {/* BRAND */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow">
                CMS
              </span>
              <h2 className="font-extrabold text-white text-base tracking-tight">
                Backoffice
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate max-w-[180px]">
              {settings.companyName}
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="p-4 space-y-1.5 flex-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            Tổng quan (Dashboard)
          </Link>

          <Link
            href="/admin/leads"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4 text-emerald-400" />
              <span>Khách liên hệ (Leads)</span>
            </div>
            {newLeadsCount > 0 && (
              <span className="bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {newLeadsCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin/services"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <Briefcase className="w-4 h-4 text-indigo-400" />
            Quản lý Dịch vụ
          </Link>

          <Link
            href="/admin/posts"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            Tin tức & Bài viết
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <Settings className="w-4 h-4 text-violet-400" />
            Thông Tin Doanh Nghiệp
          </Link>
        </nav>

        {/* BOTTOM QUICK LINK */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            Xem Trang Web Khách
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
