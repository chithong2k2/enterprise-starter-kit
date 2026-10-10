import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { SiteSettings, NavItem } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface HeaderProps {
  settings: SiteSettings;
  navItems?: NavItem[];
}

// ponytail: floating island header with spacious padding, crisp solid border, high readability
export function HeaderFloating({ settings, navItems = [] }: HeaderProps) {
  const theme = getTheme(settings.primaryColor);

  return (
    <div className="sticky top-5 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="bg-white/95 backdrop-blur-md border border-slate-300 shadow-md rounded-2xl px-7 py-4 flex items-center justify-between">
        
        {/* LOGO (TO & NỔI BẬT HƠN) */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl shadow-xs transition group-hover:scale-105 ${theme.primary}`}>
            {settings.companyName.charAt(0)}
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 block leading-tight">
              {settings.companyName}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase block">
              Enterprise Solutions
            </span>
          </div>
        </Link>

        {/* PILL NAVIGATION (CHỮ TO, RÕ RÀNG) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={item.href} 
              className="hover:text-slate-950 transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className="flex items-center gap-3">
          <a 
            href="#contact" 
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-xs transition hover:opacity-90 ${theme.primary}`}
          >
            <PhoneCall className="w-4 h-4" />
            Nhận Báo Giá
          </a>
        </div>

      </header>
    </div>
  );
}
