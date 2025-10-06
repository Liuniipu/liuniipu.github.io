export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export type NavItem = {
  label: string;
  href?: string;
  children?: readonly NavItem[];
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

export type BrandCard = {
  id: string;
  name: string;
  sector: string;
  headline: string;
  description: string;
};

export type LanguageStack = {
  id: string;
  name: string;
  focus: string;
  points: readonly string[];
};

export type LanguageDetail = {
  id: string;
  name: string;
  focus: string;
  description: string;
  points: readonly string[];
};

export type PMTestimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
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
  tryNowCta: string;
  exploreMoreCta: string;
  projects: readonly ExampleProject[];
};

type ExamplesPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  brands: {
    heading: string;
    description: string;
    items: readonly BrandCard[];
  };
  categories: {
    heading: string;
    label: string;
    items: readonly string[];
  };
  testimonials: {
    heading: string;
    description: string;
    items: readonly PMTestimonial[];
  };
};

type LanguageContent = {
  heading: string;
  description: string;
  stacks: readonly LanguageStack[];
};

type LanguagePageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    backLabel: string;
    backHref: string;
  };
  sections: readonly LanguageDetail[];
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
  examplesPage: ExamplesPageContent;
  language: LanguageContent;
  languagePage: LanguagePageContent;
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
        {
          label: 'Examples',
          children: [
            { label: 'Highlights', href: '#example' },
            { label: 'Example library', href: '/en/examples' },
          ],
        },
        {
          label: 'Try Now',
          children: [
            { label: 'Market', href: '/en/try-now/market' },
            { label: 'Intro', href: '/en/try-now/intro' },
            { label: 'App', href: '/en/try-now/app' },
          ],
        },
        { label: 'Language', href: '/en/language' },
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
      tryNowCta: 'Try now',
      exploreMoreCta: 'Browse the example library',
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
    examplesPage: {
      hero: {
        eyebrow: 'Case study library',
        title: 'Examples you can adapt in a sprint.',
        description:
          'Mock brands that show how the same design system flexes across markets and mediums.',
        ctaLabel: 'Start a project',
        ctaHref: '#contact',
      },
      brands: {
        heading: 'Mock brands at a glance',
        description:
          'Each concept highlights a different customer journey while sharing the same component foundation.',
        items: [
          {
            id: 'aurora-exchange',
            name: 'Aurora Exchange',
            sector: 'Fintech SaaS',
            headline: 'Trading clarity for global teams',
            description:
              'Cross-market alerts, liquidity insights, and compliance-ready exports packaged in a calm, data-first interface.',
          },
          {
            id: 'pulse-ledger',
            name: 'Pulse Ledger',
            sector: 'Payments platform',
            headline: 'Revenue intelligence without spreadsheets',
            description:
              'Executive dashboards pair KPI storytelling with drill-down ledgers so finance leads can plan faster.',
          },
          {
            id: 'nova-health',
            name: 'NovaHealth Loop',
            sector: 'Digital health',
            headline: 'Care teams stay aligned in seconds',
            description:
              'Modular visit timelines surface triage decisions, follow ups, and goals for multidisciplinary clinics.',
          },
          {
            id: 'linea-stories',
            name: 'Linea Stories',
            sector: 'Media publishing',
            headline: 'Narratives launch with motion-first storytelling',
            description:
              'Interactive chapters blend typography, video, and ambient audio controls for editorial launch teams.',
          },
          {
            id: 'orbit-mobility',
            name: 'Orbit Mobility',
            sector: 'Mobility marketplace',
            headline: 'Scale rider trust at city speed',
            description:
              'Dynamic pricing guardrails, surge controls, and support macros keep operations ahead of demand.',
          },
          {
            id: 'kindred-markets',
            name: 'Kindred Markets',
            sector: 'Community commerce',
            headline: 'Shop-in-shop experiences with heart',
            description:
              'Personalized collections, loyalty tiers, and live service handoffs maintain neighborhood energy online.',
          },
        ],
      },
      categories: {
        heading: 'Infinite web directions',
        label: 'From prototypes to launch-ready journeys:',
        items: [
          'Market dashboards',
          'Mobile companion apps',
          'One-page launch sites',
          'Operations consoles',
          'Analytics hubs',
          'Onboarding tours',
          'Product marketing flows',
          'Research workspaces',
        ],
      },
      testimonials: {
        heading: 'PM perspectives',
        description: 'Partner product managers share how these examples accelerate alignment.',
        items: [
          {
            id: 'northbeam-pm',
            quote:
              'The mock handoffs made it painless to communicate scope with stakeholders; everything felt pitch-ready in one review.',
            author: 'Elaine Chou',
            role: 'Product Manager',
            company: 'Northbeam Logistics',
          },
          {
            id: 'orbit-pm',
            quote:
              'Shared design tokens let our mobile and web squads ideate together. We shipped a cohesive story without slowing engineering.',
            author: 'Miguel Rivera',
            role: 'Senior PM',
            company: 'Orbit Mobility',
          },
          {
            id: 'storyforge-pm',
            quote:
              'Even our brand team could riff on the motion system. Seeing variations across mock brands sparked faster content decisions.',
            author: 'Priya Desai',
            role: 'Lead PM',
            company: 'Storyforge Media',
          },
        ],
      },
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
    languagePage: {
      hero: {
        eyebrow: 'Language route',
        title: 'Key stacks that ship production work.',
        description:
          'A deeper look at how I apply each framework and database in day-to-day delivery, from interaction flow to data stewardship.',
        backLabel: 'Back to overview',
        backHref: '/en#language',
      },
      sections: [
        {
          id: 'react-next',
          name: 'React & Next.js',
          focus: 'Front-of-house applications',
          description:
            'Opinionated use of the App Router to balance dynamic product surfaces with predictable build pipelines.',
          points: [
            'Compose server and client components with Suspense to keep interactions responsive.',
            'Model data flows with Server Actions, Route Handlers, and edge-friendly caching policies.',
            'Codify shared patterns via Storybook-ready UI primitives and Tailwind tokens.',
          ],
        },
        {
          id: 'vue-nuxt',
          name: 'Vue & Nuxt',
          focus: 'Experience parity for multi-front teams',
          description:
            'Nuxt 3 foundations mirroring React feature sets so marketing and product teams stay aligned.',
          points: [
            'Leverage file-based routing, layouts, and middleware for campaign-ready pages.',
            'Use the Composition API and Pinia stores to encapsulate complex UI state.',
            'Generate static and hybrid deployments with Nuxt Content and server routes.',
          ],
        },
        {
          id: 'mysql',
          name: 'MySQL',
          focus: 'Operational data stores',
          description:
            'Structured relational design that favors clarity and predictable scaling for transactional workloads.',
          points: [
            'Map domain models with normalization, foreign keys, and read-optimized indexes.',
            'Design migration paths and rollbacks with Prisma or Planetscale workflows.',
            'Instrument query performance, slow logs, and backup rotation for production readiness.',
          ],
        },
        {
          id: 'postgresql',
          name: 'PostgreSQL',
          focus: 'Analytical flexibility',
          description:
            'Harness Postgres extensions to support mixed analytical and transactional workloads without extra services.',
          points: [
            'Model reporting needs with materialized views, CTEs, and window functions.',
            'Store semi-structured payloads with JSONB and GIN indexes for fast lookup.',
            'Stream changes through logical replication to feed downstream systems.',
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
        {
          label: '案例',
          children: [
            { label: '首頁精選', href: '#example' },
            { label: '案例資料庫', href: '/zh/examples' },
          ],
        },
        {
          label: '立即試用',
          children: [
            { label: '立即試用 - Market', href: '/zh/try-now/market' },
            { label: '立即試用 - Intro', href: '/zh/try-now/intro' },
            { label: '立即試用 - App', href: '/zh/try-now/app' },
          ],
        },
        { label: '技術語系', href: '/zh/language' },
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
      tryNowCta: '\u7acb\u5373\u8a66\u7528',
      exploreMoreCta: '\u9032\u4e00\u6b65\u700f\u89bd\u6848\u4f8b\u5eab',
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
    examplesPage: {
      hero: {
        eyebrow: '案例資料庫',
        title: '一個衝刺就能套用的示例。',
        description: '這些模擬品牌示範同一套設計系統如何在不同市場與媒介自由轉換。',
        ctaLabel: '啟動專案',
        ctaHref: '#contact',
      },
      brands: {
        heading: '模擬品牌一覽',
        description: '每個概念聚焦不同旅程，同時沿用相同的元件基底。',
        items: [
          {
            id: 'aurora-exchange',
            name: 'Aurora Exchange',
            sector: '金融科技 SaaS',
            headline: '協助全球交易團隊維持清晰',
            description: '跨市場警示、流動性洞察與法遵輸出，以沈穩的數據介面呈現。',
          },
          {
            id: 'pulse-ledger',
            name: 'Pulse Ledger',
            sector: '金流平台',
            headline: '擺脫試算表的營收洞察',
            description: '主管總覽結合 KPI 敘事與鑽取帳務視圖，讓財務團隊快速規劃。',
          },
          {
            id: 'nova-health',
            name: 'NovaHealth Loop',
            sector: '數位醫療',
            headline: '跨專科照護秒對齊',
            description: '模組化看診時序揭露檢傷決策、追蹤任務與病患目標。',
          },
          {
            id: 'linea-stories',
            name: 'Linea Stories',
            sector: '媒體出版',
            headline: '以動態敘事開場的故事頁',
            description: '互動章節融合字體、影片與環境聲效開關，支援編輯團隊發佈。',
          },
          {
            id: 'orbit-mobility',
            name: 'Orbit Mobility',
            sector: '移動服務市集',
            headline: '以城市節奏建立乘客信任',
            description: '動態票價防護、熱區控管與客服巨集讓營運團隊搶先需求。',
          },
          {
            id: 'kindred-markets',
            name: 'Kindred Markets',
            sector: '社群電商',
            headline: '保留溫度的商店中商店',
            description: '個人化精選、會員層級與即時客服交接，把街區氛圍搬上線。',
          },
        ],
      },
      categories: {
        heading: '無限延伸的網頁樣式',
        label: '從原型到上線旅程：',
        items: [
          '市場儀表板',
          '行動夥伴 App',
          '單頁發佈網站',
          '營運控台',
          '分析中心',
          '導覽／導入流程',
          '產品行銷流程',
          '研究協作空間',
        ],
      },
      testimonials: {
        heading: 'PM 視角',
        description: '合作過的產品經理分享這些示例如何加速對齊。',
        items: [
          {
            id: 'northbeam-pm',
            quote: '這些模擬交付讓我和利害關係人溝通範疇變得輕鬆，一次評審就像準備好簡報。',
            author: 'Elaine Chou',
            role: '產品經理',
            company: 'Northbeam Logistics',
          },
          {
            id: 'orbit-pm',
            quote: '共用設計 token 讓行動與網頁小組一起構想，不拖慢工程就交付一致故事。',
            author: 'Miguel Rivera',
            role: '資深產品經理',
            company: 'Orbit Mobility',
          },
          {
            id: 'storyforge-pm',
            quote: '連品牌團隊都能沿著動態系統延伸，看見不同模擬品牌激發更快的內容決策。',
            author: 'Priya Desai',
            role: '產品負責人',
            company: 'Storyforge Media',
          },
        ],
      },
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
    languagePage: {
      hero: {
        eyebrow: '技術路線',
        title: '支撐產品上線的關鍵技術堆疊。',
        description:
          '深入說明每種框架與資料庫在日常交付中的使用方式，涵蓋互動流程到資料治理。',
        backLabel: '回到總覽',
        backHref: '/zh#language',
      },
      sections: [
        {
          id: 'react-next',
          name: 'React 與 Next.js',
          focus: '核心產品前台',
          description: '善用 App Router 的規範來平衡動態產品頁與可預測的建置流程。',
          points: [
            '透過 Server / Client Components 與 Suspense 維持互動順暢。',
            '結合 Server Actions、Route Handlers 與邊緣快取策略規劃資料流。',
            '以 Storybook-ready 的 UI 元件與 Tailwind token 統一設計語彙。',
          ],
        },
        {
          id: 'vue-nuxt',
          name: 'Vue 與 Nuxt',
          focus: '多團隊體驗對齊',
          description: '以 Nuxt 3 打造與 React 相仿的能力，讓行銷與產品團隊保持一致。',
          points: [
            '運用檔案式路由、版型與 middleware 快速推出活動頁。',
            '以 Composition API 與 Pinia store 封裝複雜狀態。',
            '結合 Nuxt Content 與伺服器路由製作靜態與混合佈署。',
          ],
        },
        {
          id: 'mysql',
          name: 'MySQL',
          focus: '營運型資料庫',
          description: '以結構化設計支撐交易工作負載，兼顧清晰與擴充性。',
          points: [
            '依領域模型進行正規化、外鍵與讀取導向索引配置。',
            '透過 Prisma 或 Planetscale pipeline 管理版本遷移與回滾。',
            '監控查詢效能、慢查記錄與備份輪替，確保正式環境安全。',
          ],
        },
        {
          id: 'postgresql',
          name: 'PostgreSQL',
          focus: '分析彈性',
          description: '運用 Postgres 擴充功能，兼顧分析與交易需求，避免額外服務。',
          points: [
            '以實體化檢視、CTE 與視窗函式滿足報表需求。',
            '運用 JSONB 與 GIN 索引儲存半結構化資料並維持查詢速度。',
            '藉由邏輯複寫串接變更資料，提供下游系統即時更新。',
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
