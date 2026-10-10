// Bảng đăng ký tập trung tất cả các Section Blocks giúp AI tráo đổi giao diện trong 1 dòng code
import { HeaderWithTopbar } from './headers/HeaderWithTopbar';
import { HeaderClassic } from './headers/HeaderClassic';
import { HeaderFloating } from './headers/HeaderFloating';

import { FooterCorporate } from './footers/FooterCorporate';
import { FooterMinimal } from './footers/FooterMinimal';

import { HeroSplit } from './HeroSplit';
import { HeroCentered } from './HeroCentered';
import { HeroWithForm } from './heroes/HeroWithForm';

import { AboutStory } from './about/AboutStory';
import { ServiceBento } from './ServiceBento';
import { ClientLogos } from './social-proof/ClientLogos';
import { TeamGrid } from './social-proof/TeamGrid';
import { TestimonialsGrid } from './social-proof/TestimonialsGrid';
import { FaqAccordion } from './conversion/FaqAccordion';
import { CtaBanner } from './conversion/CtaBanner';

export const COMPONENT_REGISTRY = {
  headers: {
    topbar: HeaderWithTopbar,
    classic: HeaderClassic,
    floating: HeaderFloating,
  },
  footers: {
    corporate: FooterCorporate,
    minimal: FooterMinimal,
  },
  heroes: {
    split: HeroSplit,
    centered: HeroCentered,
    form: HeroWithForm,
  },
  sections: {
    about: AboutStory,
    services: ServiceBento,
    logos: ClientLogos,
    team: TeamGrid,
    testimonials: TestimonialsGrid,
    faq: FaqAccordion,
    cta: CtaBanner,
  }
} as const;
