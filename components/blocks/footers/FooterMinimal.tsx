import Link from 'next/link';
import { SiteSettings, NavItem } from '@/lib/db';

interface FooterProps {
  settings: SiteSettings;
  navItems?: NavItem[];
}

export function FooterMinimal({ settings, navItems = [] }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <strong className="text-white font-bold">{settings.companyName}</strong>
          <span>•</span>
          <span>© 2026 Bảo lưu mọi quyền</span>
        </div>

        <nav className="flex items-center gap-6 text-slate-400 font-medium">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} className="hover:text-white transition">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
