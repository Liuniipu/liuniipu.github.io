export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export type NavItem = {
  label: string;
  href: string;
};

export type Slide = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: readonly string[];
};

export type HeroStat = {
  value: string;
  description: string;
};

export type ExampleProject = {
  id: string;
  title: string;
  description: string;
  highlights: readonly string[];
};

export type LanguageStack = {
  id: string;
  name: string;
  focus: string;
  points: readonly string[];
};

export type ContactDetail = {
  id: string;
  label: string;
  value: string;
  href: string;
};

export type LocaleOption = {
  code: Locale;
  label: string;
};

type NavigationContent = {
  brand: string;
  items: readonly NavItem[];
  localeButtonAria: string;
  menu: {
    open: string;
    close: string;
  };
};

type HeroContent = {
  slides: readonly Slide[];
  ctas: {
    explore: string;
    start: string;
  };
  card: {
    indicatorTemplate: string;
    title: string;
    description: string;
  };
  navigationLabels: {
    previous: string;
    next: string;
    dotTemplate: string;
  };
  stats: readonly HeroStat[];
};

type ExamplesContent = {
  heading: string;
  description: string;
  projects: readonly ExampleProject[];
};

type LanguageContent = {
  heading: string;
  description: string;
  stacks: readonly LanguageStack[];
};

type ContactContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  contacts: readonly ContactDetail[];
};

type FooterContent = {
  copy: string;
};

export type Dictionary = {
  navigation: NavigationContent;
  hero: HeroContent;
  examples: ExamplesContent;
  language: LanguageContent;
  contact: ContactContent;
  footer: FooterContent;
};

export const localeOptions: readonly LocaleOption[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: 'TW-zh' },
] as const;

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    navigation: {
      brand: 'liuniipu',
      items: [
        { label: 'Home', href: '#home' },
        { label: 'Example', href: '#example' },
        { label: 'Language', href: '#language' },
        { label: 'Contact', href: '#contact' },
      ],
      localeButtonAria: 'Switch locale',
      menu: {
        open: 'Menu',
        close: 'Close',
      },
    },
    hero: {
      slides: [
        {
          id: 'experience',
          label: 'Experience Design',
          title: 'Crafting calm, connected web journeys.',
          description:
            'Pair thoughtful storytelling with motion that guides, never distracts. Every interaction is tuned for clarity, focus, and performance.',
          bullets: [
            'Accessible-first interface patterns',
            'Micro-interactions that explain complex flows',
            'Performance budgets for responsive apps',
          ],
        },
        {
          id: 'collaboration',
          label: 'Product Collaboration',
          title: 'Shaping ideas with product and marketing teams.',
          description:
            'I build bridges between stakeholders, translating brand strategy into living design systems and production-ready components.',
          bullets: [
            'Figma to production component pipelines',
            'Design tokens that scale between stacks',
            'Rapid prototyping to validate concepts quickly',
          ],
        },
        {
          id: 'delivery',
          label: 'Delivery & Growth',
          title: 'From prototype to launch-ready experiences.',
          description:
            'Own the front-end launch plan, keep QA tight, and translate insights into measurable improvements sprint after sprint.',
          bullets: [
            'Automated regression-friendly UI architecture',
            'CSAT and UX metric dashboards for stakeholders',
            'Iterative rollouts with A/B tracking hooks',
          ],
        },
      ],
      ctas: {
        explore: 'Explore examples',
        start: 'Start a project',
      },
      card: {
        indicatorTemplate: 'Slide {current} of {total}',
        title: 'Weekly focus roadmap',
        description:
          'A living backlog connecting research, design, and release checklists with transparent status signals.',
      },
      navigationLabels: {
        previous: 'Previous slide',
        next: 'Next slide',
        dotTemplate: 'Go to slide {index}',
      },
      stats: [
        {
          value: '50+',
          description: 'web deliverables launched across expressive brand and product teams.',
        },
        {
          value: '4-6 week',
          description: 'design-to-production window with animation and QA baked in from day one.',
        },
        {
          value: '>90%',
          description: 'usability session success rate by pairing research insights with component systems.',
        },
      ],
    },
    examples: {
      heading: 'Example engagements',
      description:
        'Selected case studies spanning product dashboards, narrative intro pages, and companion apps focused on measurable impact.',
      projects: [
        {
          id: 'market',
          title: 'Market Pulse Dashboard',
          description:
            'Real-time analytics workspace visualizing multi-market inventory, alerts, and price movements for trading teams.',
          highlights: [
            'Role: UI Architecture and Motion',
            'Stack: Next.js, Tailwind, D3',
            'Outcome: 22% drop in time-to-insight',
          ],
        },
        {
          id: 'intro',
          title: 'Narrative Intro Microsite',
          description:
            'Immersive scrolling story introducing a new product line with modular chapters, hero animations, and localization-ready content.',
          highlights: [
            'Role: Creative Direction and Frontend',
            'Stack: React, Framer Motion',
            'Outcome: 3x engagement over static press kit',
          ],
        },
        {
          id: 'app',
          title: 'Mobile Companion App',
          description:
            'Hybrid app for field partners with offline-ready checklists, QR flows, and sync dashboards tailored to on-the-go contexts.',
          highlights: [
            'Role: Design Systems and Development',
            'Stack: React Native, Zustand',
            'Outcome: 40% faster weekly reporting',
          ],
        },
      ],
    },
    language: {
      heading: 'Framework fluency',
      description:
        'I maintain parity across React and Vue ecosystems so teams can pick the path that fits the release strategy without losing design fidelity.',
      stacks: [
        {
          id: 'react',
          name: 'React',
          focus: 'Primary production stack',
          points: [
            'Next.js routing and data layer',
            'Server Components and Suspense',
            'Design tokens ready for Storybook',
          ],
        },
        {
          id: 'vue',
          name: 'Vue',
          focus: 'Design system parity',
          points: [
            'Composable architecture with Pinia',
            'Vite-powered rapid iteration',
            'Nuxt content-ready deployments',
          ],
        },
        {
          id: 'other',
          name: 'More tools',
          focus: 'Fit the team and project',
          points: [
            'SvelteKit for lean prototypes',
            'Astro for static storytelling',
            'Solid and Signals for micro-apps',
          ],
        },
      ],
    },
    contact: {
      badge: 'Contact',
      heading: 'Ready when you are.',
      description:
        'Share your roadmap, brief, or even a napkin sketch. I can help map the path, shape the story, and assemble a delivery-ready UI system.',
      primaryCta: 'Send an email',
      secondaryCta: 'Book a call',
      contacts: [
        {
          id: 'email',
          label: 'Email',
          value: 'liuniipu@gmail.com',
          href: 'mailto:liuniipu@gmail.com?subject=Project%20Collaboration',
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          value: 'linkedin.com/in/liuniipu',
          href: 'https://www.linkedin.com/in/liuniipu',
        },
      ],
    },
    footer: {
      copy: 'liuniipu. All rights reserved.',
    },
  },
  zh: {
    navigation: {
      brand: 'liuniipu',
      items: [
        { label: '首頁', href: '#home' },
        { label: '案例', href: '#example' },
        { label: '技術語系', href: '#language' },
        { label: '聯絡', href: '#contact' },
      ],
      localeButtonAria: '切換語系',
      menu: {
        open: '選單',
        close: '關閉',
      },
    },
    hero: {
      slides: [
        {
          id: 'experience',
          label: '體驗設計',
          title: '打造沈穩且緊密連結的網頁旅程。',
          description:
            '以細膩的敘事搭配恰到好處的動態，引導使用者而不造成干擾。每個互動都為清晰、專注與效能而調校。',
          bullets: [
            '無障礙優先的介面模式',
            '解釋複雜流程的微互動',
            '兼顧效能預算的響應式應用',
          ],
        },
        {
          id: 'collaboration',
          label: '產品協作',
          title: '與產品與行銷團隊攜手塑造想法。',
          description:
            '串聯利害關係人的語言，將品牌策略轉化成可延展的設計系統與可上線的元件。',
          bullets: [
            'Figma 到產線元件的流水線',
            '可跨框架延伸的設計語彙',
            '高速原型驗證概念可行性',
          ],
        },
        {
          id: 'delivery',
          label: '交付與成長',
          title: '從原型走到可正式發布的體驗。',
          description:
            '主導前端發佈路線，嚴密控管品保，並把洞察轉成循環迭代的改善節奏。',
          bullets: [
            '友善回歸測試的 UI 架構',
            '提供利害關係人的 CSAT 與 UX 儀表板',
            '搭配 A/B 追蹤的漸進式釋出',
          ],
        },
      ],
      ctas: {
        explore: '查看案例',
        start: '開始合作',
      },
      card: {
        indicatorTemplate: '幻燈片 {current}/{total}',
        title: '本週重點路線圖',
        description:
          '一份活的待辦清單，串聯研究、設計與發佈檢查表，並以透明狀態指示進度。',
      },
      navigationLabels: {
        previous: '上一張幻燈片',
        next: '下一張幻燈片',
        dotTemplate: '跳至第 {index} 張幻燈片',
      },
      stats: [
        {
          value: '50+',
          description: '跨品牌與產品團隊完成的網頁交付成果。',
        },
        {
          value: '4-6 週',
          description: '從設計到上線平均時程，動態與 QA 從第一天就納入。',
        },
        {
          value: '90%+',
          description: '透過研究洞察與元件系統達成的使用性測試成功率。',
        },
      ],
    },
    examples: {
      heading: '案例精選',
      description:
        '從數據儀表板、敘事導覽頁到行動應用的代表作品，聚焦可衡量的成果。',
      projects: [
        {
          id: 'market',
          title: 'Market Pulse Dashboard',
          description:
            '即時呈現多市場庫存、警示與價格動態的分析工作站，支援交易團隊決策。',
          highlights: [
            '角色：UI 架構與動態設計',
            '技術：Next.js、Tailwind、D3',
            '成果：洞察時間縮短 22%',
          ],
        },
        {
          id: 'intro',
          title: 'Narrative Intro Microsite',
          description:
            '以章節堆疊、主視覺動畫與可在地化內容打造的新產品敘事式官網。',
          highlights: [
            '角色：創意指導與前端開發',
            '技術：React、Framer Motion',
            '成果：互動率為靜態新聞稿的 3 倍',
          ],
        },
        {
          id: 'app',
          title: 'Mobile Companion App',
          description:
            '為外勤夥伴打造的混合式 App，提供離線清單、QR 流程與隨手同步的儀表板。',
          highlights: [
            '角色：設計系統與開發',
            '技術：React Native、Zustand',
            '成果：週報提交時間加快 40%',
          ],
        },
      ],
    },
    language: {
      heading: '框架熟練度',
      description:
        '在 React 與 Vue 生態中維持一致的設計語彙，讓團隊能配合發佈策略自由選擇技術。',
      stacks: [
        {
          id: 'react',
          name: 'React',
          focus: '核心產線技術',
          points: [
            'Next.js 路由與資料層設計',
            'Server Components 與 Suspense',
            '可導入 Storybook 的設計 token',
          ],
        },
        {
          id: 'vue',
          name: 'Vue',
          focus: '設計系統對齊',
          points: [
            '結合 Pinia 的可組合式架構',
            '使用 Vite 加速迭代',
            'Nuxt 靜態內容佈署',
          ],
        },
        {
          id: 'other',
          name: '更多工具',
          focus: '依專案調整組合',
          points: [
            'SvelteKit 打造輕量原型',
            'Astro 呈現敘事內容',
            'Solid 與 Signals 應用於微型服務',
          ],
        },
      ],
    },
    contact: {
      badge: '聯絡',
      heading: '想開始就現在。',
      description:
        '無論是 roadmap、簡報或一張手稿，我都能協助勾勒路徑、形塑故事並打造可正式上線的 UI 系統。',
      primaryCta: '寫信給我',
      secondaryCta: '預約通話',
      contacts: [
        {
          id: 'email',
          label: '電子郵件',
          value: 'liuniipu@gmail.com',
          href: 'mailto:liuniipu@gmail.com?subject=Project%20Collaboration',
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          value: 'linkedin.com/in/liuniipu',
          href: 'https://www.linkedin.com/in/liuniipu',
        },
      ],
    },
    footer: {
      copy: 'liuniipu。保留所有權利。',
    },
  },
};

export const defaultLocale: Locale = 'zh';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

