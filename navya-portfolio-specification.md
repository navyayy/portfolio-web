# Navya Srivastav Portfolio Website
## Technical Specification Document

---

## 1. Project Overview

### 1.1 Purpose
Build a Gen-Z aesthetic, scroll-driven marketing portfolio website for Navya Srivastav — a Content Marketing Executive with expertise in fintech, healthcare, and SaaS content. The portfolio must function as living proof of her marketing abilities, demonstrating strategic thinking, measurable results, and creative execution.

### 1.2 Target Audience
- Hiring managers at tech startups, SaaS companies, and fintech firms
- Marketing team leads seeking content specialists
- Recruiters in the digital marketing space

### 1.3 Tech Stack
| Technology | Purpose |
|------------|---------|
| Next.js 14+ | React framework with App Router |
| TypeScript | Type safety and developer experience |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Scroll animations and micro-interactions |
| Lenis | Smooth scroll behavior |
| GSAP (optional) | Advanced scroll-triggered animations |

### 1.4 Core Differentiators
- **Scroll-driven storytelling**: Each section reveals through eye-catching scroll animations
- **Living proof**: Embedded Instagram Reels showcase real content work
- **Data-forward**: Metrics prominently displayed with animated counters
- **Gen-Z aesthetic**: Bold typography, vibrant gradients, bento grids, kinetic elements

---

## 2. Design System

### 2.1 Semantic Color Tokens

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          primary: '#FF6B35',      // Energetic coral-orange
          secondary: '#7C3AED',    // Electric purple
          tertiary: '#06B6D4',     // Cyan accent
        },
        
        // Semantic Colors
        surface: {
          DEFAULT: '#0A0A0F',      // Deep space black
          elevated: '#141419',     // Slightly lifted
          overlay: '#1E1E26',      // Cards, modals
          inverse: '#FAFAFA',      // Light mode surfaces
        },
        
        text: {
          primary: '#FAFAFA',      // Main content
          secondary: '#A1A1AA',    // Supporting text
          tertiary: '#71717A',     // Subtle text
          inverse: '#0A0A0F',      // On light backgrounds
          accent: '#FF6B35',       // Highlighted text
        },
        
        border: {
          DEFAULT: '#27272A',      // Subtle borders
          strong: '#3F3F46',       // Emphasized borders
          accent: '#FF6B35',       // Active/focus states
        },
        
        state: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
        
        // Gradient stops
        gradient: {
          start: '#FF6B35',
          mid: '#7C3AED',
          end: '#06B6D4',
        }
      }
    }
  }
}
```

### 2.2 Typography Scale

```typescript
// Font Configuration
const fonts = {
  display: 'Clash Display',      // Bold headlines - geometric, modern
  heading: 'Space Grotesk',      // Section titles - techy, clean
  body: 'Inter',                 // Body text - highly readable
  mono: 'JetBrains Mono',        // Code, stats - technical credibility
  accent: 'Instrument Serif',    // Quotes, highlights - editorial touch
}

// Type Scale (rem)
const typeScale = {
  'display-2xl': ['5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
  'heading-xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
  'heading-lg': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
  'heading-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
  'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
  'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
  'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
  'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.05em' }],
}
```

### 2.3 Spacing System

```typescript
const spacing = {
  section: {
    py: 'py-24 md:py-32 lg:py-40',  // Vertical padding for sections
    px: 'px-6 md:px-12 lg:px-20',    // Horizontal padding
  },
  container: {
    max: 'max-w-7xl mx-auto',
    narrow: 'max-w-4xl mx-auto',
    wide: 'max-w-[1600px] mx-auto',
  },
  gap: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
    '3xl': '6rem',  // 96px
  }
}
```

### 2.4 Animation Tokens

```typescript
const motion = {
  // Easing
  easing: {
    smooth: [0.25, 0.1, 0.25, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    snappy: [0.6, 0.05, 0.01, 0.9],
    elastic: [0.175, 0.885, 0.32, 1.275],
  },
  
  // Duration (seconds)
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    glacial: 1,
  },
  
  // Stagger delays
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  }
}
```

### 2.5 Effects & Shadows

```typescript
const effects = {
  // Glassmorphism
  glass: {
    light: 'bg-white/5 backdrop-blur-md border border-white/10',
    medium: 'bg-white/10 backdrop-blur-lg border border-white/20',
    heavy: 'bg-white/20 backdrop-blur-xl border border-white/30',
  },
  
  // Glow effects
  glow: {
    primary: 'shadow-[0_0_50px_rgba(255,107,53,0.3)]',
    secondary: 'shadow-[0_0_50px_rgba(124,58,237,0.3)]',
    soft: 'shadow-[0_0_80px_rgba(255,107,53,0.15)]',
  },
  
  // Gradients
  gradients: {
    primary: 'bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary',
    radial: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]',
    mesh: 'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))]',
  }
}
```

---

## 3. Site Architecture

### 3.1 Page Structure

```
/
├── (landing)
│   └── page.tsx                 # Single-page portfolio
├── blog/
│   ├── page.tsx                 # Blog listing
│   └── [slug]/page.tsx          # Individual blog posts
├── case-study/
│   └── [slug]/page.tsx          # Detailed case studies
└── layout.tsx                   # Root layout with nav/footer
```

### 3.2 Section Flow (Single Page)

```
┌─────────────────────────────────────────────────────────────┐
│  HERO SECTION                                               │
│  - Animated name reveal                                     │
│  - Tagline with typewriter effect                           │
│  - Floating 3D elements / gradient mesh background          │
│  - Scroll indicator                                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  ABOUT / INTRO                                              │
│  - Photo with parallax effect                               │
│  - Bio text with staggered reveal                           │
│  - "Marketing is..." philosophy statement                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  IMPACT METRICS (Horizontal scroll section)                 │
│  - Animated counters                                        │
│  - Key achievements pinned during scroll                    │
│  - "15% traffic increase" | "2 verticals" | etc.            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  EXPERIENCE TIMELINE                                        │
│  - Vertical timeline with scroll-triggered reveals          │
│  - Company cards with hover expansion                       │
│  - Skills tags animated on scroll                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  CASE STUDIES / WORK (Bento Grid)                           │
│  - Asymmetric grid layout                                   │
│  - Hover effects with project previews                      │
│  - Filter by type: Content | Social | SEO | Campaigns       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  SKILLS MARQUEE                                             │
│  - Infinite horizontal scroll                               │
│  - Tool logos and skill badges                              │
│  - Pause on hover                                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  INSTAGRAM REELS SHOWCASE                                   │
│  - Embedded reels in device mockups                         │
│  - Carousel with snap scrolling                             │
│  - "Content I've Created" header                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  BLOG / THOUGHT LEADERSHIP                                  │
│  - Featured articles cards                                  │
│  - "Read on Medium" links                                   │
│  - Writing samples preview                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  ACHIEVEMENTS & CERTIFICATIONS                              │
│  - Badge/card display                                       │
│  - Innovanza 2.0 winner highlight                           │
│  - GDSC volunteering                                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  CONTACT / CTA                                              │
│  - Large "Let's Work Together" headline                     │
│  - Email, LinkedIn, Phone with copy-to-clipboard            │
│  - Animated send button                                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  FOOTER                                                     │
│  - Social links                                             │
│  - Quick nav                                                │
│  - "Designed & Built by Navya" with year                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Component Library

### 4.1 Core Components

```typescript
// Component Index
components/
├── layout/
│   ├── Navigation.tsx           # Floating nav with scroll progress
│   ├── Footer.tsx               # Site footer
│   └── Section.tsx              # Reusable section wrapper
├── ui/
│   ├── Button.tsx               # Primary, secondary, ghost variants
│   ├── Badge.tsx                # Skill/tag badges
│   ├── Card.tsx                 # Base card component
│   ├── GradientText.tsx         # Animated gradient text
│   ├── AnimatedCounter.tsx      # Number counting animation
│   ├── Tooltip.tsx              # Hover tooltips
│   └── IconButton.tsx           # Icon-only buttons
├── sections/
│   ├── Hero.tsx                 # Hero section
│   ├── About.tsx                # About/intro section
│   ├── Metrics.tsx              # Impact metrics horizontal scroll
│   ├── Experience.tsx           # Timeline section
│   ├── CaseStudies.tsx          # Bento grid work showcase
│   ├── Skills.tsx               # Marquee skills section
│   ├── InstagramReels.tsx       # Reels carousel
│   ├── Blog.tsx                 # Blog/articles section
│   ├── Achievements.tsx         # Awards & certifications
│   └── Contact.tsx              # Contact CTA section
├── animations/
│   ├── ScrollReveal.tsx         # Scroll-triggered reveal wrapper
│   ├── TextReveal.tsx           # Character-by-character reveal
│   ├── ParallaxImage.tsx        # Parallax image effect
│   ├── MagneticButton.tsx       # Magnetic hover effect
│   └── SmoothScroll.tsx         # Lenis smooth scroll provider
└── features/
    ├── ThemeToggle.tsx          # Dark/light mode toggle
    ├── CopyToClipboard.tsx      # Copy email/phone utility
    └── ReelEmbed.tsx            # Instagram reel embed component
```

### 4.2 Key Component Specifications

#### Navigation Component
```typescript
interface NavigationProps {
  links: NavLink[];
  showProgress?: boolean;  // Scroll progress indicator
  variant?: 'floating' | 'fixed';
}

// Behavior:
// - Starts transparent, becomes glassmorphic on scroll
// - Shrinks on scroll down, expands on scroll up
// - Mobile: hamburger menu with full-screen overlay
// - Active section indicator with smooth transition
```

#### Hero Section
```typescript
interface HeroProps {
  name: string;
  tagline: string;
  roles: string[];          // For typewriter rotation
  ctaText: string;
  ctaLink: string;
  scrollIndicator?: boolean;
}

// Animations:
// 1. Name reveals character by character (staggered)
// 2. Tagline fades up after name completes
// 3. Roles cycle with typewriter effect
// 4. Background gradient mesh animates slowly
// 5. Floating shapes parallax with mouse movement
// 6. Scroll indicator pulses
```

#### Experience Timeline
```typescript
interface TimelineItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  skills: string[];
  logo?: string;
}

// Behavior:
// - Vertical timeline with alternating sides (desktop)
// - Stacked cards on mobile
// - Each card reveals on scroll into view
// - Skills tags animate in with stagger
// - Connecting line draws as user scrolls
```

#### Instagram Reels Carousel
```typescript
interface ReelItem {
  id: string;
  embedUrl: string;
  thumbnail: string;
  caption: string;
  metrics?: {
    views?: number;
    likes?: number;
  };
}

interface InstagramReelsProps {
  reels: ReelItem[];
  title?: string;
  subtitle?: string;
}

// Features:
// - Phone mockup frame around each reel
// - Horizontal snap scrolling
// - Lazy load embeds for performance
// - Custom play/pause controls
// - View metrics badge overlay
```

#### Bento Grid (Case Studies)
```typescript
interface CaseStudyCard {
  id: string;
  title: string;
  category: 'content' | 'social' | 'seo' | 'campaign';
  thumbnail: string;
  brief: string;
  metrics: string[];
  link: string;
  featured?: boolean;  // Larger card in grid
}

// Layout:
// Grid pattern (featured items span 2 columns):
// ┌──────────┬─────┬─────┐
// │ FEATURED │     │     │
// │          │  2  │  3  │
// ├─────┬────┴─────┼─────┤
// │  4  │    5     │  6  │
// └─────┴──────────┴─────┘
```

---

## 5. JSON Data Structure

### 5.1 Main Data File

```json
// data/portfolio.json
{
  "meta": {
    "name": "Navya Srivastav",
    "title": "Content Marketing Executive",
    "tagline": "Crafting stories that convert, content that ranks, and campaigns that resonate.",
    "roles": [
      "Content Strategist",
      "SEO Specialist",
      "Technical Writer",
      "Growth Marketer"
    ],
    "location": "Gurugram, India",
    "email": "navyaasrivastav@gmail.com",
    "phone": "+91 7080339888",
    "linkedin": "https://linkedin.com/in/navyasrivastav",
    "blog": "https://medium.com/@navyasrivastav",
    "portfolio": "https://navyasrivastav.com",
    "resumeUrl": "/navya-srivastav-resume.pdf",
    "profileImage": "/images/navya-profile.jpg"
  },
  
  "hero": {
    "headline": "I turn complex ideas into content that drives growth.",
    "subheadline": "Content Marketing • SEO • Technical Writing • Growth",
    "ctaText": "See My Work",
    "ctaLink": "#case-studies",
    "backgroundType": "gradient-mesh"
  },
  
  "about": {
    "shortBio": "I'm a Content Marketing Executive who bridges the gap between technical complexity and compelling storytelling. With a CS degree and a passion for words, I create content strategies that drive real business results.",
    "philosophy": "Great marketing doesn't feel like marketing. It feels like value.",
    "highlights": [
      "B.Tech in Computer Science from CTAE Udaipur",
      "Experience across fintech, healthcare, and SaaS verticals",
      "Technical background enables deep product understanding",
      "Data-driven approach to content strategy"
    ],
    "funFacts": [
      "Built 'Saksham' - a women's safety app that won Innovanza 2.0",
      "Technical Writer at Google Developer Students Club",
      "Can explain APIs to non-tech stakeholders (and make it interesting)"
    ]
  },
  
  "metrics": {
    "sectionTitle": "Impact by Numbers",
    "items": [
      {
        "value": 15,
        "suffix": "%",
        "label": "Traffic Increase",
        "description": "User footfall growth through strategic content at SigLens"
      },
      {
        "value": 2,
        "suffix": "",
        "label": "Verticals Led",
        "description": "Fintech (SaveIN) & Healthcare (welUp) content marketing"
      },
      {
        "value": 50,
        "suffix": "+",
        "label": "Blogs Published",
        "description": "SEO-optimized articles driving organic growth"
      },
      {
        "value": 100,
        "suffix": "%",
        "label": "Campaign Ownership",
        "description": "End-to-end content marketing execution"
      }
    ]
  },
  
  "experience": [
    {
      "id": "savein",
      "company": "SaveIN",
      "role": "Content Marketing Executive",
      "location": "Gurugram, India",
      "period": "March 2025 – Present",
      "type": "full-time",
      "logo": "/images/logos/savein.png",
      "description": "Leading content marketing for fintech and healthcare verticals",
      "highlights": [
        "Led end-to-end content marketing for SaveIN (fintech) and welUp (healthcare) verticals",
        "Created and managed social media campaigns across LinkedIn and Instagram",
        "Executed full-funnel marketing campaigns via Apollo.io, HubSpot, and LinkedIn Sales Navigator",
        "Built monthly content calendars improving cross-functional collaboration",
        "Tracked campaign performance with Excel dashboards and HubSpot analytics"
      ],
      "skills": ["HubSpot", "Apollo.io", "LinkedIn Sales Navigator", "Canva", "Figma", "SEO", "Content Strategy"],
      "achievements": [
        "Represented SaveIN at tech and HR industry events",
        "Aligned campaign messaging with sales team priorities"
      ]
    },
    {
      "id": "siglens",
      "company": "SigLens",
      "role": "Technical Writer",
      "location": "Udaipur, Rajasthan",
      "period": "Sep 2023 – Jun 2024",
      "type": "full-time",
      "logo": "/images/logos/siglens.png",
      "description": "Technical documentation and content marketing for observability platform",
      "highlights": [
        "Developed and managed API documentation for telemetry data platform",
        "Created comparative blogs analyzing SigLens against competitors",
        "Increased user footfall by 15% through strategic content",
        "Partnered with product and marketing teams for sales-ready content",
        "Tracked content adoption and engagement metrics for GTM alignment"
      ],
      "skills": ["API Documentation", "Technical Writing", "Competitor Analysis", "Data Analysis", "GTM Strategy"],
      "achievements": [
        "15% increase in user footfall through content strategy",
        "Cross-functional collaboration between sales, engineering, and product"
      ]
    },
    {
      "id": "nextedge",
      "company": "NextEdge Digital",
      "role": "Content Writer Intern",
      "location": "Udaipur, Rajasthan",
      "period": "Sep 2022 – Mar 2023",
      "type": "internship",
      "logo": "/images/logos/nextedge.png",
      "description": "Academic research writing and content creation",
      "highlights": [
        "Produced academic-style research papers and articles",
        "Ensured adherence to Chicago and APA citation formats",
        "Conducted research on technology, finance, and marketing topics"
      ],
      "skills": ["Academic Writing", "Research", "Chicago Style", "APA Style"]
    },
    {
      "id": "tdc",
      "company": "TDC Consultancy Pvt. Ltd.",
      "role": "Content Writer Intern",
      "location": "Udaipur, Rajasthan",
      "period": "Dec 2021 – Mar 2022",
      "type": "internship",
      "logo": "/images/logos/tdc.png",
      "description": "Product content and technical blogs for PIM application",
      "highlights": [
        "Authored product descriptions and technical blogs for PIM application",
        "Delivered SEO-optimized content driving website traffic",
        "Created content showcasing e-commerce product data management"
      ],
      "skills": ["Product Writing", "SEO", "Technical Blogs", "E-commerce"]
    }
  ],
  
  "caseStudies": [
    {
      "id": "savein-content-strategy",
      "title": "Full-Funnel Content Strategy for Fintech",
      "company": "SaveIN",
      "category": "content",
      "featured": true,
      "thumbnail": "/images/cases/savein-thumb.jpg",
      "brief": "Developed end-to-end content marketing strategy spanning blogs, downloadables, and social campaigns for fintech vertical.",
      "metrics": [
        "2 verticals managed simultaneously",
        "Monthly content calendar system implemented",
        "Cross-functional alignment with sales team"
      ],
      "tools": ["HubSpot", "Apollo.io", "LinkedIn Sales Navigator", "Canva"],
      "link": "/case-study/savein-content-strategy"
    },
    {
      "id": "siglens-growth",
      "title": "15% Traffic Growth Through Technical Content",
      "company": "SigLens",
      "category": "seo",
      "featured": true,
      "thumbnail": "/images/cases/siglens-thumb.jpg",
      "brief": "Created comparative content strategy positioning SigLens against competitors, resulting in measurable traffic increase.",
      "metrics": [
        "15% increase in user footfall",
        "Comprehensive API documentation",
        "Competitor analysis content series"
      ],
      "tools": ["Technical Writing", "SEO", "Data Analysis"],
      "link": "/case-study/siglens-growth"
    },
    {
      "id": "social-campaigns",
      "title": "Social Media Campaign Execution",
      "company": "SaveIN & welUp",
      "category": "social",
      "featured": false,
      "thumbnail": "/images/cases/social-thumb.jpg",
      "brief": "Created and managed social media presence across LinkedIn and Instagram, including ad copy, carousels, reels, and graphics.",
      "metrics": [
        "Multi-platform campaign management",
        "Ad copy and creative production",
        "Brand awareness and engagement growth"
      ],
      "tools": ["Canva", "Figma", "Instagram", "LinkedIn"],
      "link": "/case-study/social-campaigns"
    },
    {
      "id": "saksham-app",
      "title": "Saksham - Women's Safety App",
      "company": "Innovanza 2.0 IIC",
      "category": "campaign",
      "featured": false,
      "thumbnail": "/images/cases/saksham-thumb.jpg",
      "brief": "Award-winning project empowering women with safety measures, integrated with government helplines.",
      "metrics": [
        "Winner - Innovanza 2.0 IIC",
        "Government helpline integration",
        "Harassment & domestic violence focus"
      ],
      "tools": ["Product Development", "Social Impact"],
      "link": "/case-study/saksham"
    }
  ],
  
  "skills": {
    "categories": [
      {
        "name": "Content Management",
        "skills": ["Content Creation", "Editing", "Proofreading", "Formatting", "Publishing", "Optimization"]
      },
      {
        "name": "Research & Analysis",
        "skills": ["Technical Research", "Market Research", "Competitor Analysis", "Data Analysis", "Trend Analysis", "A/B Testing"]
      },
      {
        "name": "Marketing Tools",
        "skills": ["Google Analytics", "Ahrefs", "Semrush", "HubSpot", "WordPress", "Apollo.io", "LinkedIn Sales Navigator"]
      },
      {
        "name": "Design & Creative",
        "skills": ["Canva", "Figma"]
      },
      {
        "name": "Technical",
        "skills": ["HTML", "Git", "API Documentation"]
      },
      {
        "name": "Project Management",
        "skills": ["Jira", "Trello", "Slack", "Google Workspace", "Microsoft Office Suite"]
      },
      {
        "name": "Writing Standards",
        "skills": ["AP Style", "Chicago Manual of Style"]
      }
    ],
    "featured": [
      { "name": "HubSpot", "icon": "hubspot", "level": "advanced" },
      { "name": "SEO", "icon": "search", "level": "advanced" },
      { "name": "Content Strategy", "icon": "strategy", "level": "advanced" },
      { "name": "Canva", "icon": "canva", "level": "advanced" },
      { "name": "Google Analytics", "icon": "analytics", "level": "intermediate" },
      { "name": "Figma", "icon": "figma", "level": "intermediate" }
    ]
  },
  
  "instagramReels": {
    "sectionTitle": "Content I've Created",
    "subtitle": "Social media content showcasing brand storytelling and engagement",
    "reels": [
      {
        "id": "reel-1",
        "embedUrl": "https://www.instagram.com/reel/XXXXX/embed",
        "thumbnail": "/images/reels/reel-1-thumb.jpg",
        "caption": "SaveIN Brand Awareness Campaign",
        "platform": "instagram",
        "metrics": {
          "views": 5000,
          "likes": 250
        }
      },
      {
        "id": "reel-2",
        "embedUrl": "https://www.instagram.com/reel/YYYYY/embed",
        "thumbnail": "/images/reels/reel-2-thumb.jpg",
        "caption": "welUp Healthcare Content",
        "platform": "instagram",
        "metrics": {
          "views": 3500,
          "likes": 180
        }
      },
      {
        "id": "reel-3",
        "embedUrl": "https://www.instagram.com/reel/ZZZZZ/embed",
        "thumbnail": "/images/reels/reel-3-thumb.jpg",
        "caption": "Product Feature Explainer",
        "platform": "instagram",
        "metrics": {
          "views": 4200,
          "likes": 220
        }
      }
    ]
  },
  
  "blog": {
    "sectionTitle": "Thoughts & Writing",
    "subtitle": "Articles on content marketing, SEO, and tech",
    "featured": [
      {
        "id": "blog-1",
        "title": "Sample Blog Post Title",
        "excerpt": "Brief description of the blog post content...",
        "publishedAt": "2024-06-15",
        "readTime": "5 min read",
        "thumbnail": "/images/blog/blog-1-thumb.jpg",
        "externalUrl": "https://medium.com/@navyasrivastav/article-1",
        "tags": ["Content Marketing", "SEO"]
      }
    ]
  },
  
  "achievements": [
    {
      "id": "innovanza",
      "title": "Winner - Innovanza 2.0 IIC",
      "description": "Developed 'Saksham', empowering women with safety measures against harassment and domestic violence",
      "year": "2023",
      "icon": "trophy",
      "highlight": true
    },
    {
      "id": "gdsc",
      "title": "Technical Writer - GDSC CTAE",
      "description": "Google Developer Students Club volunteer, contributing technical content",
      "year": "2022-2023",
      "icon": "google",
      "highlight": false
    }
  ],
  
  "education": {
    "degree": "Bachelor of Technology and Engineering",
    "major": "Computer Science",
    "institution": "College of Technology And Engineering",
    "location": "Udaipur, Rajasthan",
    "period": "2020 – 2024",
    "logo": "/images/logos/ctae.png"
  },
  
  "contact": {
    "headline": "Let's Create Something Great",
    "subheadline": "I'm currently open to new opportunities in content marketing, SEO, and growth roles.",
    "email": "navyaasrivastav@gmail.com",
    "phone": "+91 7080339888",
    "linkedin": "https://linkedin.com/in/navyasrivastav",
    "calendlyLink": "",
    "availability": "Open to opportunities"
  },
  
  "footer": {
    "tagline": "Designed & Built by Navya Srivastav",
    "socialLinks": [
      { "platform": "linkedin", "url": "https://linkedin.com/in/navyasrivastav" },
      { "platform": "email", "url": "mailto:navyaasrivastav@gmail.com" },
      { "platform": "medium", "url": "https://medium.com/@navyasrivastav" }
    ]
  }
}
```

### 5.2 TypeScript Types

```typescript
// types/portfolio.ts

export interface PortfolioMeta {
  name: string;
  title: string;
  tagline: string;
  roles: string[];
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  blog?: string;
  portfolio?: string;
  resumeUrl?: string;
  profileImage?: string;
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundType: 'gradient-mesh' | 'particles' | 'video' | 'static';
}

export interface AboutSection {
  shortBio: string;
  philosophy: string;
  highlights: string[];
  funFacts: string[];
}

export interface MetricItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  logo?: string;
  description: string;
  highlights: string[];
  skills: string[];
  achievements?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  category: 'content' | 'social' | 'seo' | 'campaign' | 'technical';
  featured: boolean;
  thumbnail: string;
  brief: string;
  metrics: string[];
  tools: string[];
  link: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface FeaturedSkill {
  name: string;
  icon: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ReelItem {
  id: string;
  embedUrl: string;
  thumbnail: string;
  caption: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  metrics?: {
    views?: number;
    likes?: number;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  externalUrl?: string;
  slug?: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  icon: string;
  highlight: boolean;
}

export interface Education {
  degree: string;
  major: string;
  institution: string;
  location: string;
  period: string;
  logo?: string;
}

export interface ContactSection {
  headline: string;
  subheadline: string;
  email: string;
  phone: string;
  linkedin: string;
  calendlyLink?: string;
  availability: string;
}

export interface FooterSection {
  tagline: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}

export interface PortfolioData {
  meta: PortfolioMeta;
  hero: HeroSection;
  about: AboutSection;
  metrics: {
    sectionTitle: string;
    items: MetricItem[];
  };
  experience: ExperienceItem[];
  caseStudies: CaseStudy[];
  skills: {
    categories: SkillCategory[];
    featured: FeaturedSkill[];
  };
  instagramReels: {
    sectionTitle: string;
    subtitle: string;
    reels: ReelItem[];
  };
  blog: {
    sectionTitle: string;
    subtitle: string;
    featured: BlogPost[];
  };
  achievements: Achievement[];
  education: Education;
  contact: ContactSection;
  footer: FooterSection;
}
```

---

## 6. Scroll Animations & Interactions

### 6.1 Global Scroll Behavior

```typescript
// Smooth scroll setup with Lenis
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
})
```

### 6.2 Section-Specific Animations

#### Hero Section
```typescript
// Animation sequence on load
const heroAnimations = {
  // 1. Background gradient mesh fades in
  background: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.5, ease: 'easeOut' }
  },
  
  // 2. Name characters stagger in from bottom
  nameChars: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.03
    }
  },
  
  // 3. Tagline fades up
  tagline: {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.8, duration: 0.6 }
  },
  
  // 4. Roles typewriter effect
  roles: {
    typeSpeed: 80,
    deleteSpeed: 50,
    delayBetween: 2000
  },
  
  // 5. CTA button scales in
  cta: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { delay: 1.2, duration: 0.5, ease: 'backOut' }
  },
  
  // 6. Floating shapes parallax with mouse
  floatingShapes: {
    sensitivity: 0.05,
    ease: 0.1
  }
}
```

#### Metrics Section (Horizontal Scroll)
```typescript
// Pin section during horizontal scroll
const metricsAnimation = {
  // Container pinning
  pin: {
    trigger: '.metrics-section',
    start: 'top top',
    end: '+=300%',
    pin: true,
    scrub: 1
  },
  
  // Horizontal scroll effect
  horizontalMove: {
    x: '-75%',
    ease: 'none'
  },
  
  // Counter animation on each card entering
  counter: {
    startValue: 0,
    duration: 2,
    ease: 'power2.out',
    triggerOnEnter: true
  }
}
```

#### Experience Timeline
```typescript
const timelineAnimations = {
  // Line drawing animation
  line: {
    scaleY: { from: 0, to: 1 },
    transformOrigin: 'top center',
    scrub: 0.5
  },
  
  // Card reveal (alternating sides)
  card: {
    initial: (isLeft: boolean) => ({
      x: isLeft ? -100 : 100,
      opacity: 0,
      rotate: isLeft ? -5 : 5
    }),
    animate: {
      x: 0,
      opacity: 1,
      rotate: 0
    },
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  
  // Skills tags stagger in
  skills: {
    staggerChildren: 0.05,
    delayChildren: 0.2
  }
}
```

#### Bento Grid (Case Studies)
```typescript
const bentoAnimations = {
  // Cards scale up on scroll reveal
  cards: {
    initial: { scale: 0.9, opacity: 0, y: 50 },
    whileInView: { scale: 1, opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true, margin: '-100px' }
  },
  
  // Hover effect
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 }
  },
  
  // Image parallax within card
  imageParallax: {
    y: ['0%', '10%'],
    ease: 'linear',
    scrollTrigger: {
      scrub: true
    }
  }
}
```

#### Skills Marquee
```typescript
const marqueeConfig = {
  speed: 25,
  direction: 'left',
  pauseOnHover: true,
  duplicateCount: 3,
  fadeWidth: '15%',
  fadeColor: 'surface.DEFAULT'
}
```

#### Instagram Reels Carousel
```typescript
const reelsCarouselConfig = {
  // Snap scrolling
  snap: {
    type: 'mandatory',
    align: 'center'
  },
  
  // Phone mockup tilt on scroll
  tilt: {
    maxRotateY: 15,
    perspective: 1000
  },
  
  // Lazy loading
  lazyLoad: {
    threshold: 0.1,
    rootMargin: '100px'
  }
}
```

#### Contact Section
```typescript
const contactAnimations = {
  // Large headline reveal
  headline: {
    initial: { y: 100, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.8 }
  },
  
  // Contact items stagger
  items: {
    staggerChildren: 0.1,
    initial: { x: -30, opacity: 0 },
    animate: { x: 0, opacity: 1 }
  },
  
  // Magnetic button effect
  magneticButton: {
    magneticStrength: 0.3,
    springConfig: { stiffness: 150, damping: 15 }
  }
}
```

### 6.3 Micro-Interactions

```typescript
const microInteractions = {
  // Button hover
  button: {
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },
  
  // Link underline animation
  link: {
    underlineWidth: { from: '0%', to: '100%' },
    origin: 'left',
    duration: 0.3
  },
  
  // Card hover lift
  card: {
    hover: {
      y: -8,
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    }
  },
  
  // Badge/tag hover
  badge: {
    hover: {
      scale: 1.1,
      backgroundColor: 'var(--brand-primary)'
    }
  },
  
  // Copy to clipboard feedback
  copyFeedback: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    duration: 0.2
  }
}
```

### 6.4 Scroll Progress Indicator

```typescript
const scrollProgress = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '3px',
  background: 'gradient.primary',
  scaleX: {
    inputRange: [0, 1],
    outputRange: [0, 1]
  },
  transformOrigin: 'left'
}
```

---

## 7. Project Structure

```
navya-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── case-study/
│       └── [slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── Section.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── GradientText.tsx
│   │   ├── AnimatedCounter.tsx
│   │   └── ...
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Metrics.tsx
│   │   ├── Experience.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Skills.tsx
│   │   ├── InstagramReels.tsx
│   │   ├── Blog.tsx
│   │   ├── Achievements.tsx
│   │   └── Contact.tsx
│   └── animations/
│       ├── ScrollReveal.tsx
│       ├── TextReveal.tsx
│       ├── ParallaxImage.tsx
│       ├── MagneticButton.tsx
│       └── SmoothScroll.tsx
├── data/
│   └── portfolio.json
├── lib/
│   ├── utils.ts
│   └── animations.ts
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useInView.ts
│   └── useMagnetic.ts
├── types/
│   └── portfolio.ts
├── public/
│   ├── images/
│   │   ├── logos/
│   │   ├── cases/
│   │   ├── reels/
│   │   └── blog/
│   ├── fonts/
│   └── navya-srivastav-resume.pdf
├── styles/
│   └── fonts.css
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 8. Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "@studio-freight/lenis": "^1.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

---

## 9. Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance | > 90 | Chrome DevTools |
| First Contentful Paint | < 1.5s | WebPageTest |
| Largest Contentful Paint | < 2.5s | Core Web Vitals |
| Cumulative Layout Shift | < 0.1 | Core Web Vitals |
| Time to Interactive | < 3s | Lighthouse |
| Bundle Size (JS) | < 150KB | Next.js Analyzer |

### Optimization Strategies
1. **Image Optimization**: Use Next.js Image component with WebP format
2. **Font Loading**: Use `font-display: swap` and preload critical fonts
3. **Code Splitting**: Leverage Next.js automatic code splitting
4. **Lazy Loading**: Defer non-critical components and Instagram embeds
5. **Animation Performance**: Use CSS transforms, avoid layout-triggering properties

---

## 10. Accessibility Requirements

- **WCAG 2.1 AA Compliance**
- Keyboard navigation for all interactive elements
- Focus indicators visible and styled
- Color contrast ratio ≥ 4.5:1 for text
- Reduced motion preference respected (`prefers-reduced-motion`)
- Semantic HTML structure
- ARIA labels for interactive components
- Alt text for all images

---

## 11. SEO Considerations

```typescript
// Metadata configuration
const metadata = {
  title: 'Navya Srivastav | Content Marketing Executive',
  description: 'Content Marketing Executive specializing in fintech, healthcare, and SaaS. Creating content strategies that drive growth and engagement.',
  keywords: ['content marketing', 'SEO', 'technical writing', 'fintech marketing', 'SaaS content'],
  openGraph: {
    title: 'Navya Srivastav - Content Marketing Portfolio',
    description: 'Crafting stories that convert, content that ranks.',
    image: '/og-image.jpg',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image'
  }
}
```

---

## 12. Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Project setup (Next.js, Tailwind, TypeScript)
- [ ] Design system implementation
- [ ] JSON data structure finalization
- [ ] Base component library

### Phase 2: Core Sections (Week 2)
- [ ] Hero section with animations
- [ ] About section
- [ ] Experience timeline
- [ ] Skills marquee

### Phase 3: Advanced Sections (Week 3)
- [ ] Metrics horizontal scroll
- [ ] Bento grid case studies
- [ ] Instagram Reels carousel
- [ ] Contact section

### Phase 4: Polish & Deploy (Week 4)
- [ ] Animation refinement
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] SEO implementation
- [ ] Deployment (Vercel)

---

## 13. Future Enhancements

1. **Blog CMS Integration**: Connect to Notion or Contentful for blog posts
2. **Dark/Light Mode Toggle**: Add theme switching capability
3. **Analytics Dashboard**: Track portfolio views and engagement
4. **Contact Form**: Add functional contact form with email integration
5. **Case Study Detail Pages**: Expand to full case study experiences
6. **Internationalization**: Support for multiple languages

---

*Document Version: 1.0*  
*Last Updated: February 2026*  
*Author: Portfolio Specification for Navya Srivastav*
