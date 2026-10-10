import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import { SiteSettings, NavItem } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface HeaderProps {
  settings: SiteSettings;
  navItems?: NavItem[];
}

export function HeaderClassic({ settings, navItems = [] }: HeaderProps) {
  const theme = getTheme(settings.primaryColor);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO LEFT */}
        <Link href="/" className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-xs ${theme.primary}`}>
            {settings.companyName.charAt(0)}
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-tight">
            {settings.companyName}
          </span>
        </Link>

        {/* DYNAMIC NAV CENTER */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} className="hover:text-slate-900 transition">
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA RIGHT */}
        <div className="flex items-center gap-3">
          <a 
            href="#contact" 
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-xs transition hover:opacity-90 ${theme.primary}`}
          >
            <PhoneCall className="w-4 h-4" />
            Liên Hệ Ngay
          </a>
        </div>

      </div>
    </header>
  );
}
