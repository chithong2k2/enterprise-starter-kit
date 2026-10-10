'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Play, CheckCircle2 } from 'lucide-react';
import { SiteSettings, ServiceItem, PostItem } from '@/lib/db';

interface HomePageClientProps {
  settings: SiteSettings;
  services: ServiceItem[];
  posts: PostItem[];
}

export default function HomePageClient({ settings, services, posts }: HomePageClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Header visibility & dynamic background state
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  // Hero video expand-on-scroll progress (0 to 1)
  const [heroProgress, setHeroProgress] = useState(0);
  const heroSectionRef = useRef<HTMLDivElement | null>(null);

  // Progressive scroll tracking for the timeline
  // progress goes from 0 to 3 (0 = step 1, 1 = line draws to step 2, 2 = line draws to step 3, 3 = line draws to step 4)
  const [timelineProgress, setTimelineProgress] = useState(0);
  const timelineSectionRef = useRef<HTMLDivElement | null>(null);

  // Farms slides data
  const farmSlides = [
    {
      location: "Laramie, Wyoming",
      title: "Trang trại Plenty® nguyên bản",
      description: "Đây là trung tâm nghiên cứu và phát triển (R&D) của Plenty, nơi từng giống cây trồng được thử nghiệm và hoàn thiện tỉ mỉ. Chúng tôi thực hiện hàng ngàn thử nghiệm để tìm ra mức độ cấp nước, dinh dưỡng khoáng và quang phổ ánh sáng lý tưởng nhất nhằm nuôi dưỡng cây trồng đạt chuẩn đỉnh cao trong nhà – không ngừng mở rộng ranh giới của nền nông nghiệp hiện đại.",
      image: "https://www.plenty.ag/wp-content/uploads/2024/03/Plenty_LAR_WY0366-.jpg.webp"
    },
    {
      location: "Richmond, Virginia",
      title: "Đại trang trại dâu tây",
      description: "Tổ hợp trang trại dâu tây của chúng tôi tại bang Virginia là trang trại canh tác thẳng đứng trong nhà đầu tiên trên thế giới trồng dâu tây ở quy mô công nghiệp. Plenty Richmond được thiết kế để sản xuất hơn 1.800 tấn dâu tây thơm ngon mỗi năm – ngay cả giữa mùa đông băng giá. Chúng tôi điều chỉnh chính xác từng thông số môi trường như ánh sáng, độ ẩm và nhiệt độ để dâu tây luôn mang hương vị ngọt ngào đỉnh cao.",
      image: "https://www.plenty.ag/wp-content/uploads/2024/09/farm2.png.webp"
    },
    {
      location: "Sắp ra mắt",
      title: "Trang trại Plenty thế hệ tiếp theo",
      description: "Chúng tôi đang mở rộng quy mô với kế hoạch mang công nghệ đột phá tới nhiều cộng đồng và đô thị mới trên toàn cầu. Một ngày không xa, trang trại Plenty tiếp theo có thể sẽ hiện diện ngay tại thành phố của bạn.",
      image: "https://www.plenty.ag/wp-content/uploads/2024/03/2022_12_14_PLENTY_COMPTON_SL_Propagation_1025_FINAL.jpeg.webp"
    }
  ];

  // 4 steps of the process
  const processSteps = [
    {
      title: "Nền tảng sinh trưởng linh hoạt",
      description: "Công nghệ của Plenty có cấu trúc module và khả năng mở rộng linh hoạt, áp dụng tối ưu trên đa dạng các loại cây trồng: từ dâu tây, cà chua, dưa leo cho đến các loại rau mầm và thảo mộc chất lượng cao."
    },
    {
      title: "Hệ thống bằng sáng chế độc quyền",
      description: "Chúng tôi tái tạo trang trại từ nền móng ban đầu, đồng nghĩa với việc phát minh hàng loạt phần cứng, phần mềm, robot và công nghệ tự động hoàn toàn mới. Plenty sở hữu số lượng bằng sáng chế tại Hoa Kỳ nhiều hơn tất cả các công ty canh tác không ánh nắng mặt trời khác cộng lại."
    },
    {
      title: "Nghiên cứu khoa học đẳng cấp thế giới",
      description: "Chúng tôi đã dành hơn một thập kỷ tập trung nghiên cứu và phát triển để xây dựng nên một kỷ nguyên canh tác hoàn toàn mới, loại bỏ sự phụ thuộc vào thổ nhưỡng đất đai hay thiên tai mùa vụ."
    },
    {
      title: "Nông nghiệp vận hành bằng dữ liệu",
      description: "Với các dàn cảm biến đa điểm, thị giác máy tính và thuật toán học máy (Machine Learning), hệ thống liên tục giám sát và tự động tinh chỉnh điều kiện môi trường – giúp trang trại phát triển tốt hơn từng ngày."
    }
  ];

  // Unified scroll listener handling Header, Hero video expansion, and Technology timeline
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Header scroll logic:
      // Ở đỉnh trang (scrollY <= 25): header màu vàng, luôn hiện
      // Khi scroll xuống: header ẩn (-translate-y-full)
      // Khi scroll lên: header hiện (translate-y-0), màu TRẮNG
      if (currentScrollY <= 25) {
        setIsAtTop(true);
        setHeaderVisible(true);
      } else {
        setIsAtTop(false);
        const diff = currentScrollY - lastScrollY.current;
        if (diff > 4) {
          setHeaderVisible(false); // scrolling down -> hide
        } else if (diff < -4) {
          setHeaderVisible(true); // scrolling up -> show (white background)
        }
      }
      lastScrollY.current = currentScrollY;

      // 2. Hero video expansion:
      if (heroSectionRef.current) {
        const heroRect = heroSectionRef.current.getBoundingClientRect();
        const heroScrollable = heroRect.height - window.innerHeight;
        if (heroScrollable > 0) {
          const heroScrolled = -heroRect.top;
          const ratio = Math.max(0, Math.min(1, heroScrolled / heroScrollable));
          setHeroProgress(ratio);
        }
      }

      // 3. Technology timeline progress:
      if (timelineSectionRef.current) {
        const rect = timelineSectionRef.current.getBoundingClientRect();
        const topOffset = 80;
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable > 0) {
          const scrolled = topOffset - rect.top;
          const ratio = Math.max(0, Math.min(1, scrolled / totalScrollable));
          setTimelineProgress(ratio * 3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Độc giả Bản tin',
          email: newsletterEmail.trim(),
          phone: '0900000000',
          message: 'Đăng ký nhận bản tin nông nghiệp thông minh Plenty'
        })
      });
      setSubscribed(true);
      setNewsletterEmail('');
    } catch (err) {
      console.error(err);
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#121212] overflow-x-clip selection:bg-[#FF391B] selection:text-white font-sans">
      
      {/* ================= HEADER ================= */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          headerVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
        } ${
          isAtTop 
            ? 'bg-[#FFEA00] text-[#FF391B] border-transparent shadow-none' 
            : 'bg-white/95 backdrop-blur-md text-[#121212] border-b border-stone-200/60 shadow-md'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <svg className="h-8 md:h-10 w-auto fill-[#FF391B]" viewBox="0 0 299 98" xmlns="http://www.w3.org/2000/svg">
              <path d="M223.539 74.523v-14.58c-7.144 2.516-9.141.105-9.141-3.981V33.007c2.416.105 5.462.748 8.088 1.466V20.009h-8.088V6.49h-.749c-5.042 4.924-11.988 9.851-18.588 13.623 3.674 3.249 2.622 22.013 2.622 38.47 0 11.738 6.825 17.197 17.329 17.197a32.077 32.077 0 0 0 8.527-1.257ZM37.75 1.365c-7.455 0-14.61 3.458-18.379 9.222.315-4.299 1.574-6.811 2.731-8.385H0c5.672 9.432 2.416 42.032 2.416 72.43h20.192c-2.311-5.346-3.256-12.057-3.256-20.442 3.256 1.678 7.35 2.83 12.602 2.83 18.173 0 29.303-12.263 29.303-29.452.018-15.62-9.328-26.204-23.507-26.204Zm-8.616 41.61c-3.99 0-7.036-1.048-9.767-2.304v-9.75c0-7.85 4.496-14.255 12.602-14.255 8.107 0 11.868 5.765 11.868 12.999.004 7.649-4.72 13.31-14.7 13.31h-.003ZM191.959 62.89V37.313c0-11.11-6.406-18.446-17.749-18.446-6.511 0-13.969 3.365-17.434 10.378.314-3.88 1.258-6.815 2.622-9.226h-19.697c3.15 6.183 2.416 31.777 1.472 54.612h17.91c-.843-8.072-1.053-18.45-1.053-28.3 0-7.34 3.784-12.267 9.366-12.267 4.619 0 8.084 2.617 8.084 8.91 0 6.728 0 21.488-1.259 31.657h19.641c-1.378-3.357-1.903-7.025-1.903-11.743ZM81.602 0h-19.96C67 7.234 63.744 45.386 63.744 74.632h21.413c-7.02-8.703-4.08-52.934-3.555-74.632ZM277.607 62.47c0 23.06-12.288 35.43-29.512 35.43-7.459 0-14.389-1.992-19.746-5.764V75.888c5.147 4.927 10.819 7.126 17.434 7.126 9.137 0 16.386-5.87 16.386-18.655-2.731 5.764-6.934 11.424-16.596 11.424-11.133 0-17.749-7.652-17.749-20.562 0-15.619 1.364-31.653-1.996-35.22h19.745c-1.577 10.378-1.258 18.345-1.258 27.882 0 6.393 2.202 10.797 7.769 10.797 6.829 0 9.246-5.982 9.246-14.36 0-9.118.314-20.02-2.731-24.319h19.637c-1.154 15.317-.629 33.98-.629 42.47ZM293.771 14.117c0-2.244-1.746-3.174-3.896-3.174h-4.016v9.693h2.405v-3.148h1.69l1.577 3.148h2.596l-2.132-3.869a2.823 2.823 0 0 0 1.776-2.65Zm-4.387 1.622h-1.123v-2.916h1.183c1.206 0 1.723.61 1.723 1.424.004.883-.629 1.492-1.783 1.492Z" />
              <path d="M289.605 6.195c-5.204 0-9.426 3.993-9.426 9.69 0 5.698 4.222 9.687 9.426 9.687 5.203 0 9.395-3.99 9.395-9.687 0-5.697-4.226-9.69-9.395-9.69Zm0 17.28c-4.087 0-7.118-3.033-7.118-7.59s3.038-7.623 7.118-7.623c4.079 0 7.091 3.092 7.091 7.623 0 4.531-3.004 7.59-7.091 7.59ZM116.212 63.106c-5.428 0-8.964-1.294-10.144-4.004 18.401-.938 30.081-9.182 30.081-21.896 0-11.182-8.965-18.364-23.005-18.364-16.749 0-28.073 10.95-28.073 28.256 0 17.657 11.56 28.842 29.594 28.842 9.553 0 17.266-2.725 22.057-6.355V54.01c-4.102 5.72-12.606 9.096-20.51 9.096ZM100.89 45.214c0-8.6 4.957-14.012 12.153-14.012 4.6 0 7.548 2.474 7.548 6.83 0 5.884-6.016 10.595-18.993 11.653a13.175 13.175 0 0 1-.708-4.471Z" />
            </svg>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#farms" 
              className={`font-bold text-lg transition ${
                isAtTop ? 'text-black hover:text-[#FF391B]' : 'text-[#121212] hover:text-[#FF391B]'
              }`}
            >
              Trang Trại
            </a>
            <a 
              href="#technology" 
              className={`font-bold text-lg transition ${
                isAtTop ? 'text-black hover:text-[#FF391B]' : 'text-[#121212] hover:text-[#FF391B]'
              }`}
            >
              Quy Trình Canh Tác
            </a>
            <a 
              href="#news" 
              className={`font-bold text-lg transition ${
                isAtTop ? 'text-black hover:text-[#FF391B]' : 'text-[#121212] hover:text-[#FF391B]'
              }`}
            >
              Tin Tức
            </a>
            <a href="#about" className="text-[#FF391B] font-bold text-lg hover:opacity-80 transition">
              Về Chúng Tôi
            </a>
            <Link 
              href="/admin" 
              className={`px-4 py-2 rounded-full text-sm font-extrabold transition ${
                isAtTop 
                  ? 'bg-black text-[#FFEA00] hover:bg-[#FF391B] hover:text-white' 
                  : 'bg-stone-100 hover:bg-[#FFEA00] text-stone-800 hover:text-[#FF391B]'
              }`}
            >
              Quản Trị CMS
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-[#FF391B] p-2 focus:outline-none"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-6 py-6 space-y-4 border-b ${isAtTop ? 'bg-[#FFEA00] border-black/10' : 'bg-white border-gray-100'}`}>
            <a 
              href="#farms" 
              className="block text-xl font-bold text-[#121212]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang Trại
            </a>
            <a 
              href="#technology" 
              className="block text-xl font-bold text-[#121212]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quy Trình Canh Tác
            </a>
            <a 
              href="#news" 
              className="block text-xl font-bold text-[#121212]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tin Tức
            </a>
            <a 
              href="#about" 
              className="block text-xl font-bold text-[#FF391B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Về Chúng Tôi
            </a>
            <Link 
              href="/admin" 
              className="block text-lg font-bold text-blue-600 pt-2 border-t border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Đăng nhập CMS Quản Trị →
            </Link>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION (FULL VÀNG, VIDEO EXPAND TO 100VH 100VW ON SCROLL) ================= */}
      <section 
        ref={heroSectionRef}
        className="relative w-full bg-[#FFEA00] min-h-[175vh]"
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center pt-16 md:pt-20">
          
          {/* Expanding Video Container */}
          <div 
            className="relative overflow-hidden transition-[border-radius] duration-75 shadow-lg group flex items-center justify-center"
            style={{
              width: `${88 + heroProgress * 12}%`,
              maxWidth: heroProgress > 0.9 ? '100vw' : `${1360 + heroProgress * 400}px`,
              height: `${62 + heroProgress * 38}vh`,
              borderRadius: `${Math.max(0, (1 - heroProgress) * 32)}px`,
            }}
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
              src="https://www.plenty.ag/wp-content/uploads/2025/12/Plenty_Strawberries_16x9_GENERIC_ProRes-720p_Crop_Resize.mp4"
            />
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/15 transition-opacity">
              <button 
                onClick={() => setVideoModalOpen(true)}
                className="bg-[#FFEA00] hover:scale-105 active:scale-95 transition-all text-[#FF391B] font-black text-lg md:text-xl px-7 py-3.5 rounded-full flex items-center space-x-3 shadow-xl cursor-pointer"
              >
                <span>Xem Phim Giới Thiệu</span>
                <span className="w-8 h-8 rounded-full bg-[#FF391B] text-[#FFEA00] flex items-center justify-center">
                  <Play size={16} fill="#FFEA00" />
                </span>
              </button>
            </div>
          </div>

          {/* Hero Slogan */}
          <div 
            className="w-full max-w-[1360px] px-6 md:px-12 mt-6 transition-all duration-150 text-center"
            style={{
              opacity: Math.max(0, 1 - heroProgress * 2.2),
              transform: `translateY(${heroProgress * 20}px)`,
              display: heroProgress > 0.65 ? 'none' : 'block'
            }}
          >
            <h1 className="text-[#FF391B] font-extrabold text-2xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              Tại Plenty, chúng tôi đang tái định nghĩa diện mạo của một trang trại hiện đại.
            </h1>
          </div>

        </div>
      </section>

      {/* ================= STATEMENT SECTION ================= */}
      <section id="about" className="py-20 md:py-32 px-6 md:px-14 max-w-[1360px] mx-auto">
        <div className="max-w-[1100px]">
          <h2 className="text-[#FF391B] text-3xl md:text-5xl lg:text-[4.2rem] font-black leading-[1.05] tracking-tight">
            Dân số thế giới đang tăng nhanh trong khi diện tích đất canh tác ngày càng thu hẹp. Cùng với biến đổi khí hậu, tương lai của an ninh lương thực đang trở nên bấp bênh hơn bao giờ hết. Chúng ta không thể tiếp tục vùi đầu trong lớp đất cũ, mà phải hành động ngay từ bây giờ.
          </h2>
          <div className="mt-10 md:mt-12 flex flex-wrap gap-6 items-center">
            <a 
              href="#technology"
              className="inline-flex items-center space-x-3 text-[#FF391B] font-bold text-xl md:text-2xl hover:translate-x-2 transition-transform duration-200 group"
            >
              <span className="border-b-2 border-[#FF391B] pb-0.5">Khám Phá Quy Trình Canh Tác</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= STATS / CON SỐ ẤN TƯỢNG ================= */}
      <section className="px-4 md:px-8 pb-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {settings.stats?.map((stat, idx) => (
            <div key={idx} className="bg-[#F4F3E8] p-6 md:p-8 rounded-[24px] text-center border border-stone-200/50">
              <div className="text-3xl md:text-5xl font-black text-[#FF391B] tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-bold text-stone-700">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OUR FARMS HERO CARD ================= */}
      <section id="farms" className="px-4 md:px-8 py-6">
        <div className="max-w-[1400px] mx-auto rounded-[28px] md:rounded-[36px] bg-[#F4F3E8] p-8 md:p-16 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#FF391B] font-black text-2xl md:text-3xl uppercase tracking-wider block mb-4">
              Hệ Thống Trang Trại
            </span>
            <div className="space-y-6 text-lg md:text-xl lg:text-2xl text-[#121212] leading-relaxed font-normal">
              <p>
                Plenty® mang đến nhiều hơn cả những sản phẩm tươi ngon được canh tác tại địa phương. Chúng tôi đang tái định nghĩa hoàn toàn phương thức hoạt động của một nông trại. Các trang trại của Plenty nỗ lực tạo nên tác động tích cực to lớn cho thế giới nhưng giảm thiểu tối đa tác động tiêu cực tới môi trường.
              </p>
              <p>
                Năm 2024, Plenty khánh thành trang trại dâu tây đầu tiên ngay tại trung tâm bang Virginia. Nhờ khả năng gieo trồng và thu hoạch quanh năm trong nhà, những trái dâu của chúng tôi luôn giữ được hương vị ngọt ngào tuyệt hảo của đỉnh mùa hè suốt cả năm.
              </p>
            </div>
          </div>
          <div className="relative rounded-[22px] overflow-hidden aspect-[4/5] max-h-[560px] shadow-md">
            <img 
              src="https://www.plenty.ag/wp-content/uploads/2025/12/A7404482_cropped-for-no-NDA.jpg.webp" 
              alt="Cơ sở trang trại dâu tây Plenty" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= FARMS SLIDER ================= */}
      <section className="px-4 md:px-8 py-12 md:py-20 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold tracking-widest text-[#FF391B] uppercase">
              Các Trang Trại Tiêu Biểu ({currentSlide + 1} / {farmSlides.length})
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCurrentSlide(prev => (prev === 0 ? farmSlides.length - 1 : prev - 1))}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer"
              aria-label="Trang trại trước"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setCurrentSlide(prev => (prev === farmSlides.length - 1 ? 0 : prev + 1))}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer"
              aria-label="Trang trại tiếp theo"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Slide Card */}
        <div className="rounded-[28px] md:rounded-[36px] bg-[#FFEA00] p-8 md:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center transition-all duration-300 shadow-sm">
          <div className="space-y-6">
            <span className="text-black font-semibold text-base md:text-lg tracking-wide uppercase">
              {farmSlides[currentSlide].location}
            </span>
            <h3 className="text-[#FF391B] text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              {farmSlides[currentSlide].title}
            </h3>
            <p className="text-black text-lg md:text-xl leading-relaxed">
              {farmSlides[currentSlide].description}
            </p>
          </div>
          <div className="relative rounded-[22px] overflow-hidden aspect-[16/10] md:aspect-[4/3] shadow-md">
            <img 
              src={farmSlides[currentSlide].image} 
              alt={farmSlides[currentSlide].title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Selector Tabs */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mt-6">
          {farmSlides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`text-left p-4 md:p-6 rounded-[20px] transition-all cursor-pointer ${
                currentSlide === idx 
                  ? 'bg-black text-white shadow-md' 
                  : 'bg-[#F4F3E8] text-[#121212] hover:bg-gray-200'
              }`}
            >
              <p className="text-xs md:text-sm font-semibold opacity-70 mb-1">{slide.location}</p>
              <p className="text-sm md:text-lg font-bold truncate">{slide.title}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ================= CANH TÁC KHÁC BIỆT + TIN TỨC BÁO CHÍ (NỀN LIỀN MẠCH #F4F3E8, KHÔNG KHOẢNG TRỐNG) ================= */}
      <div className="w-full bg-[#F4F3E8]">
        
        {/* SECTION 1: CANH TÁC KHÁC BIỆT (CỐ ĐỊNH MÀN HÌNH VÀ VẼ TIẾN TRÌNH NHANH) */}
        <section 
          id="technology" 
          ref={timelineSectionRef}
          className="relative w-full min-h-[190vh]"
        >
          {/* Cố định toàn màn hình ngay dưới header (h-[calc(100vh-80px)]) */}
          <div className="sticky top-20 w-full h-[calc(100vh-80px)] flex items-center justify-center px-6 md:px-14 lg:px-20 max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full">
              
              {/* CỘT TRÁI: HÌNH ẢNH THÁP ĐỨNG CANH TÁC */}
              <div className="lg:col-span-5 h-[480px] lg:h-[560px] w-full">
                <div className="rounded-[24px] md:rounded-[32px] overflow-hidden shadow-md h-full w-full bg-stone-200 relative">
                  <img 
                    src="https://www.plenty.ag/wp-content/uploads/2024/03/221103_PLENTY_SIERRA_17105_BYH3_FINAL-1.jpg.webp" 
                    alt="Tháp canh tác thẳng đứng Plenty" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* CỘT PHẢI: TIÊU ĐỀ + TIẾN TRÌNH VẼ ĐƯỜNG DẪN */}
              <div className="lg:col-span-7 flex flex-col justify-between h-[480px] lg:h-[560px] py-1">
                
                {/* Header tiếng Việt hoàn toàn */}
                <div className="space-y-2 mb-2">
                  <h2 className="text-[#FF391B] font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1]">
                    Canh Tác Khác Biệt
                  </h2>
                  <div className="space-y-1 text-base md:text-lg font-medium text-[#FF391B] leading-relaxed">
                    <p>
                      Plenty® mang đến nhiều hơn cả nông sản tươi ngon. Chúng tôi đang tái định nghĩa hoàn toàn phương thức vận hành của một trang trại.
                    </p>
                  </div>
                </div>

                {/* KHU VỰC TIẾN TRÌNH QUY TRÌNH: DẤU CHẤM + ĐƯỜNG GẠCH CAM CHỈA XUỐNG TỪNG BƯỚC */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  {processSteps.map((step, idx) => {
                    // Step 0 is always visible.
                    // Step 1 appears once progress reaches 1.0 (after line 0 draws down)
                    // Step 2 appears once progress reaches 2.0 (after line 1 draws down)
                    // Step 3 appears once progress reaches 3.0 (after line 2 draws down)
                    const isVisible = idx === 0 || timelineProgress >= idx;

                    // Line segment below this step (between idx and idx+1)
                    // It draws from 0% to 100% as progress goes from idx to idx+1
                    const segmentProgress = Math.max(0, Math.min(1, timelineProgress - idx));
                    const hasLineBelow = idx < processSteps.length - 1;

                    return (
                      <div key={idx} className="relative flex items-start space-x-3.5 flex-1">
                        {/* Cột đường dẫn bên trái: Dấu chấm + Đường gạch chỉa xuống */}
                        <div className="flex flex-col items-center shrink-0 self-stretch">
                          {/* Dấu chấm cam Plenty - phóng to nhẹ rồi về kích thước ban đầu */}
                          <div 
                            className={`w-3.5 h-3.5 rounded-full bg-[#FF391B] shrink-0 ring-4 ring-[#FF391B]/20 transition-all duration-300 ${
                              isVisible 
                                ? 'opacity-100 animate-dot-pop' 
                                : 'opacity-0 scale-50'
                            }`} 
                          />
                          
                          {/* Đường gạch cam chỉa thẳng xuống bước kế tiếp */}
                          {hasLineBelow && (
                            <div className="w-[2.5px] flex-1 relative my-1 overflow-hidden">
                              <div 
                                className="w-full bg-[#FF391B] rounded-full absolute top-0 left-0 transition-all duration-75"
                                style={{ height: `${segmentProgress * 100}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Nội dung quy trình: Trượt êm từ bên phải qua khi xuất hiện */}
                        <div 
                          className={`transition-all duration-500 ease-out pb-2 ${
                            isVisible 
                              ? 'opacity-100 translate-x-0 delay-100' 
                              : 'opacity-0 translate-x-8 pointer-events-none'
                          }`}
                        >
                          <h3 className="text-lg md:text-xl font-black text-[#FF391B] tracking-tight -mt-1 leading-snug">
                            {step.title}
                          </h3>
                          <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-normal mt-1 max-w-xl">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: LATEST NEWS (NỐI TIẾP LIỀN MẠCH, KHÔNG CÓ KHOẢNG TRỐNG) */}
        <section id="news" className="w-full px-6 md:px-14 lg:px-20 pt-6 pb-20 md:pb-28 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-[#FF391B] text-3xl md:text-5xl font-black tracking-tight">
                Tin Tức & Báo Chí Mới Nhất
              </h2>
              <p className="text-stone-600 text-lg mt-2 font-medium">
                Cập nhật những bước phát triển mới nhất từ hệ sinh thái Plenty
              </p>
            </div>
            <Link 
              href="/admin/posts" 
              className="inline-flex items-center space-x-2 text-[#FF391B] font-bold text-xl hover:translate-x-1 transition mt-4 md:mt-0"
            >
              <span className="border-b border-[#FF391B]">Quản lý bài viết (CMS)</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <article 
                key={post.id || idx}
                className="group flex flex-col justify-between bg-white rounded-[28px] overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-200">
                  <img 
                    src={
                      idx === 0 
                        ? "https://www.plenty.ag/wp-content/uploads/2024/11/TS1_1497_BYH_FINAL.jpg.webp" 
                        : idx === 1 
                        ? "https://www.plenty.ag/wp-content/uploads/2024/09/farm2.png.webp" 
                        : "https://www.plenty.ag/wp-content/uploads/2024/03/Plenty_LAR_WY0366-.jpg.webp"
                    } 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-[#FF391B] font-bold text-sm tracking-wider uppercase mb-3">
                      <span>{post.category || 'Tin tức'}</span>
                      <span>•</span>
                      <span className="text-stone-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#121212] group-hover:text-[#FF391B] transition-colors line-clamp-2 leading-snug mb-4">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-base line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-semibold">{post.readTime || '4 phút đọc'}</span>
                    <span className="inline-flex items-center space-x-1 font-bold text-[#FF391B] text-base group-hover:translate-x-1 transition-transform">
                      <span>Xem chi tiết</span>
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="w-full bg-[#FF391B] text-[#FFEA00] pt-8 pb-12 overflow-hidden">
        {/* Marquee Tiếng Việt */}
        <div className="overflow-hidden border-b border-[#FFEA00]/30 pb-6 mb-16">
          <div className="animate-marquee whitespace-nowrap text-2xl md:text-4xl font-extrabold uppercase tracking-wide">
            <span className="mx-6">Plenty tự hào là đơn vị tiên phong về bình đẳng cơ hội việc làm và đổi mới nông nghiệp bền vững •</span>
            <span className="mx-6">Plenty tự hào là đơn vị tiên phong về bình đẳng cơ hội việc làm và đổi mới nông nghiệp bền vững •</span>
            <span className="mx-6">Plenty tự hào là đơn vị tiên phong về bình đẳng cơ hội việc làm và đổi mới nông nghiệp bền vững •</span>
            <span className="mx-6">Plenty tự hào là đơn vị tiên phong về bình đẳng cơ hội việc làm và đổi mới nông nghiệp bền vững •</span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-[#FFEA00]/30">
            
            {/* Logo Col */}
            <div className="lg:col-span-4 space-y-4">
              <svg className="h-14 md:h-20 w-auto fill-[#FFEA00]" viewBox="0 0 299 98" xmlns="http://www.w3.org/2000/svg">
                <path d="M223.539 74.523v-14.58c-7.144 2.516-9.141.105-9.141-3.981V33.007c2.416.105 5.462.748 8.088 1.466V20.009h-8.088V6.49h-.749c-5.042 4.924-11.988 9.851-18.588 13.623 3.674 3.249 2.622 22.013 2.622 38.47 0 11.738 6.825 17.197 17.329 17.197a32.077 32.077 0 0 0 8.527-1.257ZM37.75 1.365c-7.455 0-14.61 3.458-18.379 9.222.315-4.299 1.574-6.811 2.731-8.385H0c5.672 9.432 2.416 42.032 2.416 72.43h20.192c-2.311-5.346-3.256-12.057-3.256-20.442 3.256 1.678 7.35 2.83 12.602 2.83 18.173 0 29.303-12.263 29.303-29.452.018-15.62-9.328-26.204-23.507-26.204Zm-8.616 41.61c-3.99 0-7.036-1.048-9.767-2.304v-9.75c0-7.85 4.496-14.255 12.602-14.255 8.107 0 11.868 5.765 11.868 12.999.004 7.649-4.72 13.31-14.7 13.31h-.003ZM191.959 62.89V37.313c0-11.11-6.406-18.446-17.749-18.446-6.511 0-13.969 3.365-17.434 10.378.314-3.88 1.258-6.815 2.622-9.226h-19.697c3.15 6.183 2.416 31.777 1.472 54.612h17.91c-.843-8.072-1.053-18.45-1.053-28.3 0-7.34 3.784-12.267 9.366-12.267 4.619 0 8.084 2.617 8.084 8.91 0 6.728 0 21.488-1.259 31.657h19.641c-1.378-3.357-1.903-7.025-1.903-11.743ZM81.602 0h-19.96C67 7.234 63.744 45.386 63.744 74.632h21.413c-7.02-8.703-4.08-52.934-3.555-74.632ZM277.607 62.47c0 23.06-12.288 35.43-29.512 35.43-7.459 0-14.389-1.992-19.746-5.764V75.888c5.147 4.927 10.819 7.126 17.434 7.126 9.137 0 16.386-5.87 16.386-18.655-2.731 5.764-6.934 11.424-16.596 11.424-11.133 0-17.749-7.652-17.749-20.562 0-15.619 1.364-31.653-1.996-35.22h19.745c-1.577 10.378-1.258 18.345-1.258 27.882 0 6.393 2.202 10.797 7.769 10.797 6.829 0 9.246-5.982 9.246-14.36 0-9.118.314-20.02-2.731-24.319h19.637c-1.154 15.317-.629 33.98-.629 42.47ZM293.771 14.117c0-2.244-1.746-3.174-3.896-3.174h-4.016v9.693h2.405v-3.148h1.69l1.577 3.148h2.596l-2.132-3.869a2.823 2.823 0 0 0 1.776-2.65Zm-4.387 1.622h-1.123v-2.916h1.183c1.206 0 1.723.61 1.723 1.424.004.883-.629 1.492-1.783 1.492Z" />
                <path d="M289.605 6.195c-5.204 0-9.426 3.993-9.426 9.69 0 5.698 4.222 9.687 9.426 9.687 5.203 0 9.395-3.99 9.395-9.687 0-5.697-4.226-9.69-9.395-9.69Zm0 17.28c-4.087 0-7.118-3.033-7.118-7.59s3.038-7.623 7.118-7.623c4.079 0 7.091 3.092 7.091 7.623 0 4.531-3.004 7.59-7.091 7.59ZM116.212 63.106c-5.428 0-8.964-1.294-10.144-4.004 18.401-.938 30.081-9.182 30.081-21.896 0-11.182-8.965-18.364-23.005-18.364-16.749 0-28.073 10.95-28.073 28.256 0 17.657 11.56 28.842 29.594 28.842 9.553 0 17.266-2.725 22.057-6.355V54.01c-4.102 5.72-12.606 9.096-20.51 9.096ZM100.89 45.214c0-8.6 4.957-14.012 12.153-14.012 4.6 0 7.548 2.474 7.548 6.83 0 5.884-6.016 10.595-18.993 11.653a13.175 13.175 0 0 1-.708-4.471Z" />
              </svg>
              <p className="text-sm font-semibold opacity-90 max-w-sm">
                {settings.slogan}
              </p>
              <p className="text-xs opacity-75">
                Địa chỉ: {settings.address}
              </p>
            </div>

            {/* Links & Newsletter */}
            <div className="lg:col-span-8 space-y-10">
              <nav className="flex flex-wrap gap-8 md:gap-14 text-xl md:text-2xl font-bold">
                <a href="#news" className="hover:underline">Tin Tức</a>
                <a href="#about" className="hover:underline">Về Chúng Tôi</a>
                <a href="#farms" className="hover:underline">Trang Trại</a>
                <Link href="/admin" className="hover:underline bg-white/20 px-3 py-1 rounded-xl">Quản Trị CMS</Link>
              </nav>

              <div className="space-y-4 max-w-xl">
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">Đăng ký nhận bản tin Plenty</h3>
                <p className="text-lg md:text-xl font-normal opacity-90">
                  Cập nhật liên tục những đột phá mới nhất về công nghệ canh tác và hương vị nông sản tươi ngon.
                </p>
                {subscribed ? (
                  <div className="bg-[#FFEA00] text-[#FF391B] font-bold p-4 rounded-full text-center flex items-center justify-center space-x-2">
                    <CheckCircle2 size={24} />
                    <span>Cảm ơn bạn đã đăng ký nhận tin của Plenty!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                    <input 
                      type="email" 
                      required
                      placeholder="email-cua-ban@vidu.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-white text-black px-6 py-4 rounded-full text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFEA00]"
                    />
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="bg-[#FFEA00] hover:bg-white text-[#FF391B] font-extrabold px-8 py-4 rounded-full text-lg transition duration-200 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {submitting ? 'Đang gửi...' : 'Đăng Ký'}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Footer Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm md:text-base font-semibold">
            {/* Socials */}
            <div className="flex items-center space-x-6">
              <a href="https://www.instagram.com/plenty/" target="_blank" rel="noreferrer" className="hover:opacity-75 transition">
                Instagram
              </a>
              <a href="https://www.linkedin.com/company/plenty-farms/" target="_blank" rel="noreferrer" className="hover:opacity-75 transition">
                LinkedIn
              </a>
              <a href="https://www.youtube.com/channel/UCajiaq9RM0wwnOK1BPtA1bg" target="_blank" rel="noreferrer" className="hover:opacity-75 transition">
                YouTube
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <span>© {new Date().getFullYear()}, {settings.companyName}. Bảo lưu mọi quyền.</span>
              <a href="#" className="underline hover:no-underline">
                Chính Sách Bảo Mật
              </a>
              <a href="#" className="underline hover:no-underline">
                Quy Chuẩn Nhà Cung Cấp
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= VIDEO MODAL ================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <button 
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition"
              aria-label="Đóng video"
            >
              <X size={28} />
            </button>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/Sd7LNYEtSUM?autoplay=1" 
                title="Phim giới thiệu Plenty"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
