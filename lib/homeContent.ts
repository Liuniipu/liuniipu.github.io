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
    exploreBySlide?: Record<string, string>;
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
      brand: 'HY',
      items: [
        { label: 'Home', href: '#home' },
        { label: 'Examples', href: '/en/examples' },
        {
          label: 'Try Now',
          children: [
            { label: 'Overview', href: '/en/try-now' },
            { label: 'Market', href: '/en/try-now/market' },
            { label: 'Intro', href: '/en/try-now/intro' },
            { label: 'Modular', href: '/en/try-now/modular' },
            { label: 'App', href: '/en/try-now/app' },
          ],
        },
        { label: 'Language', href: '/en/language' },
        { label: 'Contact', href: '/en/contact' },
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
          label: 'Case Highlights',
          title: 'Focused implementations across four real project directions.',
          description:
            'From social platforms and resource-management dashboards to brand websites and mobile apps, each case is built around specific business goals and user behavior.',
          bullets: [
            'Social platform: balances privacy and communication features.',
            'Resource management admin: translates operations into clear workflows.',
            'Brand website and mobile app: sharp storytelling plus map-enabled utility.',
          ],
        },
        {
          id: 'collaboration',
          label: 'Tech Stack',
          title: 'A practical stack designed for speed and reliability.',
          description:
            'The implementation combines React/Next.js and Vue/Nuxt for front-end flexibility, with MySQL and PostgreSQL for stable transaction and analytics support.',
          bullets: [
            'React + Next.js for SEO-ready interfaces and modular components.',
            'Vue + Nuxt for campaign and content-driven delivery.',
            'MySQL/PostgreSQL for operational data and analytical depth.',
          ],
        },
        {
          id: 'delivery',
          label: 'Try-Now Preview',
          title: 'Interactive demos that turn ideas into visible workflows.',
          description:
            'The try-now area includes a market cart flow, intro showcase, modular feature board, and chat-based app prototype for rapid concept validation.',
          bullets: [
            'Explore how each interaction feels before project kickoff.',
            'Compare UI patterns and data logic in one place.',
            'Shorten communication cycles between planning and implementation.',
          ],
        },
        {
          id: 'contact',
          label: 'Contact & Collaboration',
          title: 'Open a conversation and shape the project blueprint together.',
          description:
            'Share your direction, timeline, and product goals. We can align scope quickly and move from idea to delivery with clear next steps.',
          bullets: [
            'Send an email to start practical planning.',
            'Clarify priority milestones and release expectations.',
            'Turn concepts into an actionable implementation roadmap.',
          ],
        },
      ],
      ctas: {
        explore: 'Explore examples',
        start: 'Start a project',
        exploreBySlide: {
          experience: 'View case highlights',
          collaboration: 'View tech stack',
          delivery: 'Try interactive demos',
          contact: 'Contact now',
        },
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
          title: 'Market Cart Experience',
          description:
            'Real-time analytics workspace visualizing multi-market inventory, alerts, and price movements for trading teams.',
          highlights: [
            'Use case: E-commerce and direct-to-consumer storefronts.',
            'Explanation: A clean interface shortens decision paths and improves shopping confidence.',
          ],
        },
        {
          id: 'intro',
          title: 'Narrative Intro Microsite',
          description:
            'Immersive scrolling story introducing a new product line with modular chapters, hero animations, and localization-ready content.',
          highlights: [
            'Use case: Brand campaign sites and product launch pages.',
            'Explanation: Scroll-driven storytelling makes key messages easier to absorb and remember.',
          ],
        },
        {
          id: 'modular',
          title: 'Modular Package Showcase',
          description:
            'Configurable module catalog that spotlights plug-and-play bundles with live previews, usage recipes, and documentation callouts.',
          highlights: [
            'Use case: Admin tools and modular product platforms.',
            'Explanation: Drag-and-drop composition helps teams understand feature combinations quickly.',
          ],
        },
        {
          id: 'app',
          title: 'Mobile Companion App',
          description:
            'Hybrid app for field partners with offline-ready checklists, QR flows, and sync dashboards tailored to on-the-go contexts.',
          highlights: [
            'Use case: Customer support entry points and guided FAQ flows.',
            'Explanation: Preset prompts and progressive replies lower communication friction.',
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
        ctaHref: '/en/contact',
      },
      brands: {
        heading: 'Example projects at a glance',
        description: 'Four practical directions from planning to delivery, each with clear product outcomes.',
        items: [
          {
            id: 'social-platform',
            name: 'Social Platform',
            sector: 'Social Platform',
            headline: 'From data schema planning to API integration and front-end delivery',
            description:
              'Built with popular interaction features while balancing privacy and open communication.',
          },
          {
            id: 'resource-admin',
            name: 'Resource Management Admin',
            sector: 'Resource Management',
            headline: 'Mapped cross-team workflows and resources, then designed and implemented core logic',
            description: 'A direct and easy-to-use interface helps teams grasp operational status quickly.',
          },
          {
            id: 'branding-site',
            name: 'Brand Website',
            sector: 'Brand Website',
            headline: 'Organized product strengths into an interactive, attention-grabbing web experience',
            description: 'Communicates value propositions quickly and effectively.',
          },
          {
            id: 'mobile-app',
            name: 'Mobile App',
            sector: 'Mobile App',
            headline: 'App planning and development for real-world usage',
            description: 'Integrated map services with custom locations and quick navigation flows.',
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
        description: 'Feedback from PM-facing collaborations.',
        items: [
          {
            id: 'pm-collab',
            quote:
              'A highly communicative engineer who is willing to explore different possibilities and back them with analysis.',
            author: 'Collaboration Manager',
            role: 'PM',
            company: 'Collaboration Manager',
          },
          {
            id: 'pm-delivery',
            quote:
              'Delivers on time, goes deep in discussions, and identifies the real bottlenecks.',
            author: 'Product Manager',
            role: 'PM',
            company: 'Product Manager',
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
            'Best for: Marketing sites, SaaS dashboards, and content-heavy web apps.',
            'Team example: Built by the Meta (Facebook) engineering team and used across Facebook and Instagram web surfaces.',
            'Advantages: Massive ecosystem, component reuse, and smooth SSR/SEO support when paired with Next.js.',
          ],
        },
        {
          id: 'vue-nuxt',
          name: 'Vue & Nuxt',
          focus: 'Experience parity for multi-front teams',
          description:
            'Nuxt 3 foundations mirroring React feature sets so marketing and product teams stay aligned.',
          points: [
            'Best for: Content websites, campaign pages, and mid-sized web products.',
            'Team example: Driven by Nuxt Labs and the Vue core ecosystem, adopted by teams such as GitLab for Vue-based frontends.',
            'Advantages: Clear file-based structure, fast onboarding, and strong SSR/static generation capabilities.',
          ],
        },
        {
          id: 'mysql',
          name: 'MySQL',
          focus: 'Operational data stores',
          description:
            'Structured relational design that favors clarity and predictable scaling for transactional workloads.',
          points: [
            'Best for: E-commerce, membership systems, and transactional back-office platforms. Recommended site: mysql.com.',
            'Team example: Maintained by the Oracle MySQL team and widely used by teams behind products like YouTube and Shopify.',
            'Advantages: Mature tooling, stable performance, and broad hosting/support compatibility.',
          ],
        },
        {
          id: 'postgresql',
          name: 'PostgreSQL',
          focus: 'Analytical flexibility',
          description:
            'Harness Postgres extensions to support mixed analytical and transactional workloads without extra services.',
          points: [
            'Best for: Data-rich products, analytics dashboards, and systems needing complex queries. Recommended site: postgresql.org.',
            'Team example: Developed by the PostgreSQL Global Development Group and used by product teams such as Instagram.',
            'Advantages: Powerful SQL features, strong data integrity, and flexible JSONB/extension support.',
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
      contacts: [
        {
          id: 'email',
          label: 'Email',
          value: 'chuanren54.gmail.com',
          href: 'mailto:chuanren54.gmail.com?subject=Project%20Collaboration',
        },
      ],
    },
    footer: {
      copy: 'HY. All rights reserved.',
    },
  },
  zh: {
    navigation: {
      brand: 'HY',
      items: [
        { label: '首頁', href: '#home' },
        { label: '案例', href: '/zh/examples' },
        {
          label: '立即試用',
          children: [
            { label: '總覽', href: '/zh/try-now' },
            { label: '購物車', href: '/zh/try-now/market' },
            { label: '開場頁', href: '/zh/try-now/intro' },
            { label: '模組展示', href: '/zh/try-now/modular' },
            { label: '聊天室', href: '/zh/try-now/app' },
          ],
        },
        { label: '技術語系', href: '/zh/language' },
        { label: '聯絡', href: '/zh/contact' },
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
          label: '案例重點',
          title: '四種專案方向，聚焦不同需求落地。',
          description:
            '從社交平台、資源管理後台，到形象網站與手機 App，每個案例都對應清楚的目標與使用情境。',
          bullets: [
            '社交平台：兼顧隱私設定與高互動交流。',
            '資源管理後台：把跨單位流程轉成直觀操作。',
            '形象網站與手機 App：兼具亮點敘事與地圖導航實用性。',
          ],
        },
        {
          id: 'collaboration',
          label: '技術實作',
          title: '以實用技術組合，支撐穩定交付。',
          description:
            '前端以 React/Next.js 與 Vue/Nuxt 彈性搭配，後端資料以 MySQL、PostgreSQL 建立穩定且可擴展的基礎。',
          bullets: [
            'React + Next.js：利於 SEO 與可維護的元件化開發。',
            'Vue + Nuxt：快速建置內容型與活動型網站。',
            'MySQL/PostgreSQL：兼顧交易穩定與分析查詢能力。',
          ],
        },
        {
          id: 'delivery',
          label: '試用導覽',
          title: '從試用模組快速看見想法的實際樣貌。',
          description:
            '提供購物流程、開場展示、模組展示與聊天室示範，協助在開發前快速驗證流程與介面方向。',
          bullets: [
            '先體驗互動，再細化開發需求。',
            '一次比較不同功能模組的呈現方式。',
            '加速提案、溝通與實作的對齊效率。',
          ],
        },
        {
          id: 'contact',
          label: '聯絡合作',
          title: '歡迎聯絡，讓藍圖與專案目標快速對齊。',
          description:
            '提供需求方向、時程與目標後，可快速釐清範圍並規劃執行步驟，從想法走向可交付成果。',
          bullets: [
            '透過電子郵件啟動合作討論。',
            '快速對齊優先順序與里程碑。',
            '把想法整理成可執行的開發藍圖。',
          ],
        },
      ],
      ctas: {
        explore: '查看案例',
        start: '開始合作',
        exploreBySlide: {
          experience: '查看案例重點',
          collaboration: '查看技術組合',
          delivery: '查看試用模組',
          contact: '立即聯絡',
        },
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
          description: '運用安心可靠的套件',
        },
        {
          value: '4-6 週',
          description: '從框線圖、MVP 到 QA',
        },
        {
          value: '90%+',
          description: '首次提交通過率',
        },
      ],
    },
    examples: {
      heading: '案例精選',
      description: '多方位的編碼經驗，運用於各式專案',
      tryNowCta: '\u7acb\u5373\u8a66\u7528',
      exploreMoreCta: '\u9032\u4e00\u6b65\u700f\u89bd\u6848\u4f8b\u5eab',
      projects: [
        {
          id: 'market',
          title: '購物車互動體驗',
          description:
            '即時呈現多市場庫存、警示與價格動態的分析工作站，支援交易團隊決策。',
          highlights: [
            '適用場景：電商、自營商城',
            '解說：利用簡潔的介面拉近用戶體驗',
          ],
        },
        {
          id: 'intro',
          title: '敘事式開場頁',
          description:
            '以章節堆疊、主視覺動畫與可在地化內容打造的新產品敘事式官網。',
          highlights: [
            '適用場景：品牌官網、新品發表頁',
            '解說：透過滾動敘事與段落動態，強化產品故事的傳達力',
          ],
        },
        {
          id: 'modular',
          title: '模組化功能展示',
          description:
            '可配置的模組目錄，透過即時預覽與操作流程說明，快速展示可插拔式功能組合。',
          highlights: [
            '適用場景：後台系統、模組化平台',
            '解說：以拖曳配置方式，讓使用者快速理解功能組合與成效差異',
          ],
        },
        {
          id: 'app',
          title: '聊天室互動示範',
          description:
            '為外勤夥伴打造的混合式 App，提供離線清單、QR 流程與隨手同步的儀表板。',
          highlights: [
            '適用場景：客服入口、常見問題導引',
            '解說：使用預設訊息與逐字回覆，降低溝通門檻並提升互動感',
          ],
        },
      ],
    },
    examplesPage: {
      hero: {
        eyebrow: '案例資料庫',
        title: '快速上線的合作案例',
        description: '經過淬鍊、打磨後的成果',
        ctaLabel: '啟動專案',
        ctaHref: '/zh/contact',
      },
      brands: {
        heading: '案例一覽',
        description: '不同專案中專注不同重點',
        items: [
          {
            id: 'social-platform',
            name: '社交平台',
            sector: '社交平台',
            headline: '從資料表規劃、串接資料至前端展示',
            description: '提供各項熱門功能，兼顧隱密性、交流性。',
          },
          {
            id: 'resource-admin',
            name: '資源管理後台',
            sector: '資源管理後台',
            headline: '了解各單位流程及資源，規劃且撰寫邏輯',
            description: '直觀、簡易的操作介面，快速掌握單位現況。',
          },
          {
            id: 'branding-site',
            name: '形象網頁',
            sector: '形象網頁',
            headline: '整理優勢，製作具互動且吸睛的頁面',
            description: '快速、有效的展示賣點。',
          },
          {
            id: 'mobile-app',
            name: '手機 APP',
            sector: '手機 APP',
            headline: 'App 規劃與製作',
            description: '串接地圖，提供自訂地點與快速導航。',
          },
        ],
      },
      categories: {
        heading: '樂此不疲的開發旅程',
        label: '各個想法從腦海一一實現',
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
        heading: '夥伴推薦',
        description: '合作過程中，不經意的讚嘆',
        items: [
          {
            id: 'pm-collab',
            quote: '好溝通的工程師，願意嘗試各種可能與分析。',
            author: '合作經理',
            role: 'PM',
            company: '合作經理',
          },
          {
            id: 'pm-delivery',
            quote: '準時交件，能深度討論且找出癥結點。',
            author: '產品經理',
            role: 'PM',
            company: '產品經理',
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
            '適用平台：品牌官網、SaaS 後台、內容型網站。',
            '團隊案例：由 Meta（Facebook）工程團隊開發，並用於 Facebook、Instagram 等產品。',
            '優點：生態完整、元件復用性高，搭配 Next.js 具備良好 SEO 與 SSR 效能。',
          ],
        },
        {
          id: 'vue-nuxt',
          name: 'Vue 與 Nuxt',
          focus: '多團隊體驗對齊',
          description: '以 Nuxt 3 打造與 React 相仿的能力，讓行銷與產品團隊保持一致。',
          points: [
            '適用平台：內容網站、活動頁、企業形象站。',
            '團隊案例：由 Nuxt Labs 與 Vue 生態核心團隊推動，GitLab 等團隊採用 Vue 技術開發前端。',
            '優點：檔案結構清楚、上手快，並具備完整的 SSR 與靜態產生能力。',
          ],
        },
        {
          id: 'mysql',
          name: 'MySQL',
          focus: '營運型資料庫',
          description: '以結構化設計支撐交易工作負載，兼顧清晰與擴充性。',
          points: [
            '適用平台：電商平台、會員系統、交易型後台。推薦網站：mysql.com',
            '團隊案例：由 Oracle MySQL 團隊維護，YouTube、Shopify 等產品團隊長期採用。',
            '優點：工具成熟、穩定性高，且主機商與雲端服務支援廣泛。',
          ],
        },
        {
          id: 'postgresql',
          name: 'PostgreSQL',
          focus: '分析彈性',
          description: '運用 Postgres 擴充功能，兼顧分析與交易需求，避免額外服務。',
          points: [
            '適用平台：資料密集產品、分析儀表板、需複雜查詢的系統。推薦網站：postgresql.org',
            '團隊案例：由 PostgreSQL Global Development Group 開發維護，Instagram 等產品團隊使用。',
            '優點：SQL 功能強大、資料一致性佳，並支援 JSONB 與多種擴充套件。',
          ],
        },
      ],
    },
    contact: {
      badge: '聯絡',
      heading: '想開始就現在。',
      description: '歡迎聯絡洽詢進一步合作，構築藍圖，完成專案。',
      primaryCta: '寫信給我',
      contacts: [
        {
          id: 'email',
          label: '電子郵件',
          value: 'chuanren54.gmail.com',
          href: 'mailto:chuanren54.gmail.com?subject=Project%20Collaboration',
        },
      ],
    },
    footer: {
      copy: 'HY 保留所有權利。',
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



