import Link from 'next/link';
import { PhoneCall, Mail, Settings2, ArrowRight } from 'lucide-react';
import { SiteSettings, NavItem } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface HeaderProps {
  settings: SiteSettings;
  navItems?: NavItem[];
}

export function HeaderWithTopbar({ settings, navItems = [] }: HeaderProps) {
  const theme = getTheme(settings.primaryColor);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              Hotline: <strong className="text-white">{settings.hotline}</strong>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              {settings.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">Giờ làm việc: {settings.workingHours}</span>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-xs ${theme.primary}`}>
            {settings.companyName.charAt(0)}
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-tight">
              {settings.companyName}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase block">
              Enterprise Solutions
            </span>
          </div>
        </Link>

        {/* DYNAMIC NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} className="hover:text-slate-900 transition">
              {item.label}
            </a>
          ))}
        </nav>

        <a 
          href="#contact" 
          className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-xs transition hover:opacity-90 ${theme.primary}`}
        >
          <PhoneCall className="w-4 h-4" />
          Nhận Báo Giá
        </a>
      </div>
    </header>
  );
}
