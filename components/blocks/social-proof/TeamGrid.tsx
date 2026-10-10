import { TeamMember } from '@/lib/db';
import { getTheme } from '@/lib/theme';

interface TeamProps {
  team: TeamMember[];
  themeColor: string;
}

export function TeamGrid({ team, themeColor }: TeamProps) {
  const theme = getTheme(themeColor);

  return (
    <section id="team" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${theme.primaryText}`}>
            ĐỘI NGŨ CHUYÊN GIA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Người Đồng Hành Cùng Dự Án Của Bạn
          </h2>
          <p className="text-slate-600 text-sm">
            Tập hợp những kỹ sư giải pháp, kiến trúc sư phần mềm và chuyên gia vận hành dày dạn kinh nghiệm thực chiến.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition text-center flex flex-col items-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-lg mb-4 border ${theme.primaryLight}`}>
                {member.initials}
              </div>

              <h3 className="font-extrabold text-base text-slate-900 mb-1">
                {member.name}
              </h3>
              
              <div className={`text-xs font-bold mb-3 ${theme.primaryText}`}>
                {member.role}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mt-auto pt-3 border-t border-slate-100">
                {member.experience}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
