import { ClientPartner } from '@/lib/db';

interface ClientLogosProps {
  clients: ClientPartner[];
}

export function ClientLogos({ clients }: ClientLogosProps) {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
          Được tin tưởng bởi hơn 250+ doanh nghiệp tiên phong
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {clients.map((c, idx) => (
            <div 
              key={idx}
              className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold text-sm tracking-tight hover:border-slate-300 transition"
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
