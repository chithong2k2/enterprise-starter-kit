import Link from 'next/link';
import { 
  Building2, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Code2, 
  Briefcase, 
  Settings2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  getSettings, 
  getServices, 
  getPosts, 
  getProjects, 
  getPageConfig,
  getTeam,
  getTestimonials,
  getFaq,
  getClients
} from '@/lib/db';
import { getTheme } from '@/lib/theme';
import ContactForm from '@/components/ContactForm';

// Headers
import { HeaderWithTopbar } from '@/components/blocks/headers/HeaderWithTopbar';
import { HeaderClassic } from '@/components/blocks/headers/HeaderClassic';
import { HeaderFloating } from '@/components/blocks/headers/HeaderFloating';

// Footers
import { FooterCorporate } from '@/components/blocks/footers/FooterCorporate';
import { FooterMinimal } from '@/components/blocks/footers/FooterMinimal';

// Section Blocks
import { HeroSplit } from '@/components/blocks/HeroSplit';
import { HeroCentered } from '@/components/blocks/HeroCentered';
import { HeroWithForm } from '@/components/blocks/heroes/HeroWithForm';
import { AboutStory } from '@/components/blocks/about/AboutStory';
import { ServiceBento } from '@/components/blocks/ServiceBento';
import { ClientLogos } from '@/components/blocks/social-proof/ClientLogos';
import { TeamGrid } from '@/components/blocks/social-proof/TeamGrid';
import { TestimonialsGrid } from '@/components/blocks/social-proof/TestimonialsGrid';
import { FaqAccordion } from '@/components/blocks/conversion/FaqAccordion';
import { CtaBanner } from '@/components/blocks/conversion/CtaBanner';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const pageConfig = await getPageConfig();
  const settings = await getSettings();
  const services = await getServices();
  const posts = await getPosts();
  const projects = await getProjects();
  const team = await getTeam();
  const testimonials = await getTestimonials();
  const faq = await getFaq();
  const clients = await getClients();
  const theme = getTheme(settings.primaryColor);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-slate-200">
      
      {/* 1. DYNAMIC HEADER SELECTION */}
      {pageConfig.headerVariant === 'classic' ? (
        <HeaderClassic settings={settings} navItems={pageConfig.navItems} />
      ) : pageConfig.headerVariant === 'floating' ? (
        <HeaderFloating settings={settings} navItems={pageConfig.navItems} />
      ) : (
        <HeaderWithTopbar settings={settings} navItems={pageConfig.navItems} />
      )}

      {/* 2. DYNAMIC HOMEPAGE SECTIONS IN ORDER */}
      {pageConfig.sections
        .filter(s => s.enabled)
        .map((sec) => {
          switch (sec.type) {
            case 'hero':
              if (sec.variant === 'centered') {
                return <HeroCentered key={sec.id} settings={settings} />;
              }
              if (sec.variant === 'form') {
                return <HeroWithForm key={sec.id} settings={settings} services={services} />;
              }
              return <HeroSplit key={sec.id} settings={settings} />;

            case 'logos':
              return <ClientLogos key={sec.id} clients={clients} />;

            case 'about':
              return <AboutStory key={sec.id} settings={settings} />;

            case 'services':
              return <ServiceBento key={sec.id} services={services} themeColor={settings.primaryColor} />;

            case 'projects':
              return (
                <section key={sec.id} id="projects" className="py-24 bg-slate-50 border-b border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                      <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${theme.primaryText}`}>
                        CASE STUDIES
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Dự Án Doanh Nghiệp Đã Triển Khai
                      </h2>
                      <p className="text-slate-600 text-sm">
                        Kết quả thực tế được chứng minh qua số liệu tăng trưởng và tối ưu chi phí của đối tác.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {projects.map((proj) => (
                        <div key={proj.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
                          <div>
                            <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider mb-4 border border-slate-200">
                              {proj.category}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                              {proj.title}
                            </h3>
                            <p className="text-xs font-semibold text-slate-500 mb-4">
                              Đối tác: {proj.client}
                            </p>
                          </div>
                          
                          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold leading-relaxed">
                            <strong>Kết quả:</strong> {proj.result}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'team':
              return <TeamGrid key={sec.id} team={team} themeColor={settings.primaryColor} />;

            case 'testimonials':
              return <TestimonialsGrid key={sec.id} testimonials={testimonials} themeColor={settings.primaryColor} />;

            case 'faq':
              return <FaqAccordion key={sec.id} faq={faq} themeColor={settings.primaryColor} />;

            case 'cta':
              return <CtaBanner key={sec.id} settings={settings} />;

            case 'posts':
              return (
                <section key={sec.id} id="posts" className="py-24 bg-white border-b border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${theme.primaryText}`}>
                          GÓC CHUYÊN GIA
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                          Kiến Thức & Xu Hướng Công Nghệ
                        </h2>
                      </div>
                      <span className="text-sm text-slate-500 font-medium">
                        Quản lý và cập nhật trực tiếp từ hệ thống CMS nội bộ
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {posts.map((post) => (
                        <article key={post.id} className="flex flex-col justify-between rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300 transition">
                          <div>
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-semibold">
                              <span className="bg-slate-200 px-2 py-0.5 rounded text-[11px] text-slate-800">
                                {post.category}
                              </span>
                              <span>{post.date}</span>
                            </div>
                            
                            <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
                              {post.title}
                            </h3>
                            
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                            <span>{post.author}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'contact':
              return (
                <section key={sec.id} id="contact" className="py-24 bg-slate-900 text-white relative border-b border-slate-800">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-5 space-y-8">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-2">
                            KẾT NỐI HỢP TÁC
                          </span>
                          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                            Sẵn Sàng Nâng Tầm Doanh Nghiệp?
                          </h2>
                          <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                            Để lại thông tin, đội ngũ kỹ sư giải pháp của chúng tôi sẽ liên hệ tư vấn trong vòng 15 phút.
                          </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-800 text-sm">
                          <div className="flex items-start gap-3.5">
                            <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-white font-semibold">Trụ sở:</strong>
                              <span className="text-slate-400">{settings.address}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-3.5">
                            <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-white font-semibold">Hotline:</strong>
                              <span className="text-slate-400">{settings.hotline}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-3.5">
                            <Mail className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-white font-semibold">Email:</strong>
                              <span className="text-slate-400">{settings.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-7">
                        <ContactForm services={services} themeColor={settings.primaryColor} />
                      </div>
                    </div>
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}

      {/* 3. DYNAMIC FOOTER SELECTION */}
      {pageConfig.footerVariant === 'minimal' ? (
        <FooterMinimal settings={settings} navItems={pageConfig.navItems} />
      ) : (
        <FooterCorporate settings={settings} navItems={pageConfig.navItems} />
      )}

    </div>
  );
}
