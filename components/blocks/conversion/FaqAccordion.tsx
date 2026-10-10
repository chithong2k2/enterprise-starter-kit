'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface FaqProps {
  faq: FaqItem[];
  themeColor: string;
}

export function FaqAccordion({ faq, themeColor }: FaqProps) {
  const theme = getTheme(themeColor);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${theme.primaryText}`}>
            GIẢI ĐÁP THẮC MẮC
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Câu Hỏi Thường Gặp Của Doanh Nghiệp
          </h2>
          <p className="text-slate-600 text-sm">
            Những băn khoăn phổ biến nhất trước khi tiến hành ký kết hợp đồng và triển khai phần mềm.
          </p>
        </div>

        <div className="space-y-3">
          {faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {item.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
