export const THEME_CONFIGS = {
  blue: {
    name: 'Xanh Công Nghệ (Blue)',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    primaryText: 'text-blue-600',
    primaryBorder: 'border-blue-600',
    primaryLight: 'bg-blue-50 text-blue-700 border-blue-200',
    primaryRing: 'focus:ring-blue-500',
    badge: 'bg-blue-100 text-blue-800'
  },
  emerald: {
    name: 'Xanh Lá Tăng Trưởng (Emerald)',
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    primaryText: 'text-emerald-600',
    primaryBorder: 'border-emerald-600',
    primaryLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    primaryRing: 'focus:ring-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800'
  },
  violet: {
    name: 'Tím Hiện Đại (Violet)',
    primary: 'bg-violet-600 hover:bg-violet-700 text-white',
    primaryText: 'text-violet-600',
    primaryBorder: 'border-violet-600',
    primaryLight: 'bg-violet-50 text-violet-700 border-violet-200',
    primaryRing: 'focus:ring-violet-500',
    badge: 'bg-violet-100 text-violet-800'
  },
  amber: {
    name: 'Cam Năng Động (Amber)',
    primary: 'bg-amber-600 hover:bg-amber-700 text-white',
    primaryText: 'text-amber-600',
    primaryBorder: 'border-amber-600',
    primaryLight: 'bg-amber-50 text-amber-800 border-amber-200',
    primaryRing: 'focus:ring-amber-500',
    badge: 'bg-amber-100 text-amber-900'
  },
  rose: {
    name: 'Đỏ Đô Doanh Nghiệp (Rose)',
    primary: 'bg-rose-600 hover:bg-rose-700 text-white',
    primaryText: 'text-rose-600',
    primaryBorder: 'border-rose-600',
    primaryLight: 'bg-rose-50 text-rose-700 border-rose-200',
    primaryRing: 'focus:ring-rose-500',
    badge: 'bg-rose-100 text-rose-800'
  },
  slate: {
    name: 'Đen & Xám Tối Giản (Monochrome)',
    primary: 'bg-slate-900 hover:bg-slate-800 text-white',
    primaryText: 'text-slate-900',
    primaryBorder: 'border-slate-900',
    primaryLight: 'bg-slate-100 text-slate-900 border-slate-300',
    primaryRing: 'focus:ring-slate-500',
    badge: 'bg-slate-200 text-slate-900'
  }
} as const;

export type ThemeKey = keyof typeof THEME_CONFIGS;

export function getTheme(key: string) {
  if (key in THEME_CONFIGS) {
    return THEME_CONFIGS[key as ThemeKey];
  }
  return THEME_CONFIGS.blue;
}
