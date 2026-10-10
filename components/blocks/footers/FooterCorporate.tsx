import Link from 'next/link';
import { PhoneCall, Mail, MapPin, Settings2 } from 'lucide-react';
import { SiteSettings, NavItem } from '@/lib/db';

interface FooterProps {
  settings: SiteSettings;
  navItems?: NavItem[];
}

export function FooterCorporate({ settings, navItems = [] }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* COL 1: ABOUT */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-white tracking-tight uppercase">
              {settings.companyName}
            </h4>
            <p className="leading-relaxed text-slate-400">
              {settings.slogan}
            </p>
            <p className="text-[11px] text-slate-500">
              Giờ làm việc: {settings.workingHours}
            </p>
          </div>

          {/* COL 2: DYNAMIC LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Khám Phá
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-white transition">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: SOLUTIONS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Giải Pháp B2B
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition">Phát triển Web App & Portal</a></li>
              <li><a href="#services" className="hover:text-white transition">Số hóa ERP & Quản trị kho</a></li>
              <li><a href="#services" className="hover:text-white transition">Tự động hóa tác vụ với AI</a></li>
              <li><a href="#services" className="hover:text-white transition">Hạ tầng Cloud & DevOps 24/7</a></li>
            </ul>
          </div>

          {/* COL 4: CONTACT */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Trụ Sở Chính
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline: {settings.hotline}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.email}</span>
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 {settings.companyName}. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-white transition font-semibold text-slate-400">
              Quản trị CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
