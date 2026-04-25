import { ArrowLeft, Search, User, ShoppingBag } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { CaseNavFooter } from '@/app/components/CaseNavFooter';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import heroImage from '../../assets/f4d14d9769234e371e3b2c43f272901073d360c7.png';
import solutionsImage from '../../assets/2dfd007ccff4a3ab5905a1bc67d5535205ea07e2.png';
import shopImage from '../../assets/3f24ea7874dd37ca8cda54ecaed3080b2a4d8c28.png';
import pregnancyPillowsImage from '../../assets/bella-pillows.png';
import quizImage from '../../assets/ef4cb93d4bdaa208f60882e23720c518b7904228.png';
import userStoriesImage from '../../assets/1458d6abffcc02c19fe235eabf0be0bd373ab73b.png';
import mothersReviewsImage from '../../assets/67a1633c68713005694129658cd90189f7e8a3e9.png';
import productDetailImage from '../../assets/645f031c54e6fcf7dd2fecb04e889118fac43f5c.png';
import contentHubImage from '../../assets/2b35accf6040327f1a4293aad8b40fdd0928d71c.png';
import sleepTipsImage from '../../assets/70a34bb10e1f97f29587650c22e9351af6a312ea.png';
import pregnancyNormalImage from '../../assets/6b4d03b54622b096008e4efc8b3e88afcc6eb605.png';
import checkoutImage from '../../assets/c0c0facfa6f14e57ca71a7e8222654a5a77a734e.png';
import interactiveProductImage from '../../assets/fa4778ad5b7f683ff5d1d9f18574a3b7d95c4c92.png';
import aboutImage from '../../assets/bella-about.png';

interface BellaCaseStudyProps {
  onBack: () => void;
  onSelectProject?: (id: string) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-normal text-[rgba(19,19,19,0.44)] mb-4">
      {children}
    </p>
  );
}

function PillarCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#ECEEF0] p-6 md:p-8 min-h-[300px] md:min-h-[360px] flex items-center justify-center">
      {children}
    </div>
  );
}

type PillarImage = { src: string; alt: string; label: string };

const PILLAR_IMAGE_WIDTHS: Record<number, number> = {
  1: 440,
  2: 340,
  3: 220,
  4: 160,
};

function PillarImages({ images }: { images: PillarImage[] }) {
  const width = PILLAR_IMAGE_WIDTHS[images.length] ?? 200;
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {images.map((img, i) => (
        <div key={i} style={{ width: `${width}px` }}>
          <p className="text-[11px] mb-1.5 leading-none text-[#1E1E1E]">
            {img.label}
          </p>
          <ImageWithFallback
            src={img.src}
            alt={img.alt}
            className="block w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}

function Pillar({
  label,
  heading,
  body,
  images,
}: {
  label: string;
  heading: string;
  body: string;
  images: PillarImage[];
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <h3 className="text-[20px] font-semibold tracking-[-0.5px] text-[#131313] mb-3 leading-[1.3]">
        {heading}
      </h3>
      <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mb-8">
        {body}
      </p>
      <PillarCanvas>
        <PillarImages images={images} />
      </PillarCanvas>
    </div>
  );
}

export function BellaCaseStudy({ onBack, onSelectProject }: BellaCaseStudyProps) {
  return (
    <div className="absolute inset-0 overflow-auto bg-white">
      <div className="max-w-5xl mx-auto border-x border-neutral-100">
        {/* Top bar */}
        <div className="px-6 md:px-12 pt-6 md:pt-10">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-md bg-[#ECEEF0] hover:bg-neutral-200 px-4 py-2 text-[13px] text-[#131313] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to home</span>
          </button>
        </div>

        {/* Hero */}
        <div className="px-6 md:px-12 pt-10 md:pt-14 pb-8 md:pb-10">
          <h1 className="text-[36px] font-semibold leading-[1.5] tracking-[-1.5px] text-[#131313] mb-2">
            BELLA
          </h1>
          <p className="text-[18px] font-normal text-[rgba(19,19,19,0.44)]">
            <span>Case Study</span>
            <span className="mx-2 text-[rgba(19,19,19,0.24)]">|</span>
            <span>2026</span>
          </p>
        </div>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Overview */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Overview</SectionLabel>
          <div className="space-y-4 text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            <p>
              BELLA is a Hebrew-first e-commerce experience for women in pregnancy and early motherhood. It replaces a typical category-driven shop with a needs-driven, editorial system — products live next to the discomfort they solve, content carries the same weight as conversion, and trust is built through real voices instead of urgency tactics.
            </p>
            <p>
              My role covered UX strategy, information architecture, RTL Hebrew typography system, and visual direction — from the navigation pattern through the personalised quiz flow and editorial article surface.
            </p>
            <p className="text-[rgba(19,19,19,0.6)]">
              Scope note: maternity-tech e-commerce, full Hebrew RTL site with 10 desktop screens shipped in Figma.
            </p>
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* The Challenge */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>The Challenge</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Pregnant women are sold to in the wrong language.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            Most maternity e-commerce treats pregnancy like any other shopping vertical — flash sales, urgency timers, scattered product categories. But the audience is exhausted, in physical discomfort, and navigating a body that changes weekly. The brief was to design a store that meets them where they actually are: by need, not by SKU; through trusted voices, not through pressure; with a calm editorial surface, not a shouting catalogue.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Approach */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Approach</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Reframe the architecture from "what we sell" to "what hurts".
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            Instead of opening with categories ("Pillows", "Belts", "Apparel"), the homepage opens with situations: <em>better sleep, sitting comfort, pain relief, postpartum care</em>. A 5-question quiz translates how the user feels into a single product recommendation. Editorial content (sleep tips, "what's normal in pregnancy") sits at the same depth as the catalogue, not buried in a footer. Hebrew typography is treated as a first-class system — not an afterthought translation.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* UX Strategy */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>UX Strategy</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-10 max-w-2xl">
            Five pillars that make BELLA work.
          </h2>

          <div className="space-y-16 md:space-y-20">
            {/* Pillar 1 — Solution-first Browsing */}
            <Pillar
              label="Pillar 01 — Solution-first Browsing"
              heading="Architecture organised around the body, not the SKU."
              body="The homepage opens with the four physical states a pregnant body actually moves through — sleep, sitting, pain, postpartum — and routes each one into a curated shop. The catalogue still exists, but it's the second layer, not the front door. The Pregnancy Pillows hub demonstrates the same principle inside a single product family."
              images={[
                { src: solutionsImage, alt: 'Solutions by Need section', label: 'Home — Solutions by Need' },
                { src: pregnancyPillowsImage, alt: 'Pregnancy pillows hub', label: 'Pillows — Curated Hub' },
                { src: shopImage, alt: 'Shop with filters', label: 'Shop — Filtered Catalogue' },
              ]}
            />

            {/* Pillar 2 — Personalised Quiz */}
            <Pillar
              label="Pillar 02 — Personalised Quiz Path"
              heading="A 5-question conversation that ends in one matched product."
              body="Instead of forcing the user to compare specs across 24 SKUs, a short anonymous quiz translates how she feels (trimester, pain points, sleep position) into a single concrete recommendation. The quiz is calm, paced, and reversible — it never feels like a sales funnel."
              images={[
                { src: quizImage, alt: 'Questionnaire flow', label: 'Quiz — Full Flow' },
              ]}
            />

            {/* Pillar 3 — Editorial Trust */}
            <Pillar
              label="Pillar 03 — Editorial Trust Layer"
              heading="Content earns the right to sell."
              body="A real Knowledge Hub with sleep tips, pregnancy-norm guides and FAQ — promoted on the homepage as a peer surface to the shop, not buried in a footer. The editorial layer is what builds trust before any product is added to the cart, and it's what brings users back between purchases."
              images={[
                { src: contentHubImage, alt: 'Content guidance section on home', label: 'Home — Content Promoted as Peer' },
                { src: sleepTipsImage, alt: 'Sleep tips article', label: 'Sleep Tips Article' },
                { src: pregnancyNormalImage, alt: 'Pregnancy normal article', label: 'What’s Normal Article' },
              ]}
            />

            {/* Pillar 4 — Real Voices */}
            <Pillar
              label="Pillar 04 — Real Voices, Not Marketing"
              heading="Stories from actual mothers — not stock testimonials."
              body="Two surfaces, both above the fold on Home: an Instagram-style story carousel that runs real customer videos, and a verified review slider with names, weeks of pregnancy, and dates. There are no fake stars and no suspiciously generic copy. Trust is earned through specificity."
              images={[
                { src: userStoriesImage, alt: 'User stories carousel', label: 'Stories — Real Customers' },
                { src: mothersReviewsImage, alt: 'Mothers reviews slider', label: 'Reviews — Verified Buyers' },
              ]}
            />

            {/* Pillar 5 — Product Discovery */}
            <Pillar
              label="Pillar 05 — Product Discovery That Speaks to the Body"
              heading="Show the product against the problem, not the spec sheet."
              body="The homepage's interactive product zone uses a body-map composition to tell the user where the product touches and supports her — instead of leading with materials and dimensions. The PDP carries the same logic: feature first, fabric specs second, and customer reviews tightly integrated with the buy flow."
              images={[
                { src: interactiveProductImage, alt: 'Interactive product body-map section', label: 'Home — Body-Map Product View' },
                { src: productDetailImage, alt: 'Product detail page', label: 'Product Detail Page' },
              ]}
            />
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* The Outcome */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>The Outcome</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            A store that reads like an editorial.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            The five pillars turn a typical maternity catalogue into a paced, calm, Hebrew-native journey. Product, content, real voices, and personalised recommendation share the same surface, so trust is built before conversion is asked for.
          </p>

          <div className="mt-10 md:grid md:grid-cols-3">
            <div className="py-6 border-b md:py-0 md:pr-8 md:border-b-0 md:border-r border-neutral-200">
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">10</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">Desktop screens shipped in Figma — Home, Shop, Pillows, Product, Quiz, Content Hub, 2 articles, Checkout, About</p>
            </div>
            <div className="py-6 border-b md:py-0 md:px-8 md:border-b-0 md:border-r border-neutral-200">
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">5q</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">Quiz collapses 24 SKUs to one matched product — feeling-led, not spec-led</p>
            </div>
            <div className="py-6 md:py-0 md:pl-8">
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">100%</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">Hebrew RTL, including nav, breadcrumbs, progress bars, and form flows — no translation patches</p>
            </div>
          </div>

          <p className="text-[11px] text-[rgba(19,19,19,0.4)] mt-4 leading-[1.5]">
            Figures reflect design scope shipped in Figma, not measured production results.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Selected Screens — Home, Checkout, About full pages */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Selected Screens</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-8 max-w-2xl">
            The full-page tour.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { src: heroImage, label: 'Home' },
              { src: checkoutImage, label: 'Checkout' },
              { src: aboutImage, label: 'About' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-[#ECEEF0] p-4 flex flex-col gap-3">
                <p className="text-[11px] leading-none text-[#1E1E1E]">{s.label}</p>
                <ImageWithFallback src={s.src} alt={s.label} className="block w-full h-auto rounded-md" />
              </div>
            ))}
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Design System */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Design System</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            A documented system, not a moodboard.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mb-3">
            Foundations and components were built once, then mirrored across every screen — variables for color and spacing, text styles for the four-font Hebrew hierarchy, and a Component Library where every recurring element ships with its variants and states.
          </p>
          <p className="text-[12px] font-normal leading-[1.6] tracking-[-0.2px] text-[rgba(19,19,19,0.5)] max-w-2xl mb-12">
            Scope note: this section documents only what lives inside the system — UI surfaces, components, type, semantic states. It is not a brand-imagery palette and does not cover photography or campaign artwork.
          </p>

          {/* FOUNDATIONS */}
          <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-4">FOUNDATIONS</p>

          {/* Color */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 mb-6">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-[16px] font-semibold text-[#131313]">Color · 8 system tokens</h3>
              <span className="text-[11px] uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)]">UI tokens</span>
            </div>
            <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-5 max-w-3xl">
              Backgrounds in cream and warm beige set the editorial tone. A deep ink (#2B2A28) carries every CTA — there is no second action color. Gold (#C9A24D) appears only as a star rating or premium accent.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { hex: '#FAF7F3', label: 'bg / cream' },
                { hex: '#F1EAE2', label: 'bg / beige' },
                { hex: '#FFFFFF', label: 'bg / paper' },
                { hex: '#2B2A28', label: 'ink / primary' },
                { hex: '#6F6B66', label: 'ink / secondary' },
                { hex: '#9C968E', label: 'ink / muted' },
                { hex: '#C9A24D', label: 'accent / gold' },
                { hex: '#C97964', label: 'destructive' },
              ].map((s) => (
                <div key={s.hex} className="flex flex-col gap-2">
                  <div className="rounded-lg aspect-square border border-neutral-200" style={{ backgroundColor: s.hex }} />
                  <div>
                    <p className="text-[11px] font-medium text-[#131313] leading-tight">{s.label}</p>
                    <p className="text-[10px] text-[rgba(19,19,19,0.5)] font-mono leading-tight">{s.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 mb-6">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-[16px] font-semibold text-[#131313]">Typography · 4-font hierarchy</h3>
              <span className="text-[11px] uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)]">Editorial × Hebrew</span>
            </div>
            <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)] mb-6 max-w-3xl">
              Every text role is matched to a font with a specific job. Playfair Display for editorial moments, Heebo for clear UI in Hebrew, Assistant for long-form body, Varela Round for warm reviews.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 border border-neutral-100 rounded-lg p-4 bg-neutral-50/50">
                <p className="text-[10px] uppercase tracking-[1.4px] text-[rgba(19,19,19,0.4)] font-medium">DISPLAY</p>
                <p className="text-[26px] text-[#131313]" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400 }}>נוחות לאורך ההריון</p>
                <p className="text-[11px] text-[rgba(19,19,19,0.5)]">Playfair Display · Editorial headings</p>
              </div>
              <div className="space-y-2 border border-neutral-100 rounded-lg p-4 bg-neutral-50/50">
                <p className="text-[10px] uppercase tracking-[1.4px] text-[rgba(19,19,19,0.4)] font-medium">UI</p>
                <p className="text-[15px] text-[#131313]" style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 500 }}>הוסף לסל · חזרה · המשך</p>
                <p className="text-[11px] text-[rgba(19,19,19,0.5)]">Heebo · Buttons, navigation, labels</p>
              </div>
              <div className="space-y-2 border border-neutral-100 rounded-lg p-4 bg-neutral-50/50">
                <p className="text-[10px] uppercase tracking-[1.4px] text-[rgba(19,19,19,0.4)] font-medium">BODY</p>
                <p className="text-[14px] leading-relaxed text-[rgba(19,19,19,0.7)]" style={{ fontFamily: 'Assistant, sans-serif', fontWeight: 400 }}>שאלון קצר ואנונימי שיעזור לנו להמליץ לך את המוצר הנכון.</p>
                <p className="text-[11px] text-[rgba(19,19,19,0.5)]">Assistant · Long-form body in Hebrew</p>
              </div>
              <div className="space-y-2 border border-neutral-100 rounded-lg p-4 bg-neutral-50/50">
                <p className="text-[10px] uppercase tracking-[1.4px] text-[rgba(19,19,19,0.4)] font-medium">REVIEWS</p>
                <p className="text-[15px] text-[#131313]" style={{ fontFamily: '"Varela Round", sans-serif' }}>"הכרית הכי טובה שקניתי בהריון."</p>
                <p className="text-[11px] text-[rgba(19,19,19,0.5)]">Varela Round · Personal, warm tone</p>
              </div>
            </div>
          </div>

          {/* Radius + Elevation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="text-[16px] font-semibold text-[#131313] mb-2">Radius · 12px default</h3>
              <p className="text-[13px] text-[rgba(19,19,19,0.7)] leading-[1.6] mb-5">A single softness language: 12px on cards, 16px on hero blocks, full pill on buttons.</p>
              <div className="flex items-end gap-4">
                {[
                  { r: '8px', size: 56 },
                  { r: '12px', size: 72 },
                  { r: '16px', size: 88 },
                  { r: 'pill', size: 56, pill: true },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="bg-[#F1EAE2] border border-neutral-200" style={{ width: s.pill ? 96 : s.size, height: s.size, borderRadius: s.pill ? 999 : parseInt(s.r) }} />
                    <p className="text-[11px] text-[rgba(19,19,19,0.5)] font-mono">{s.r}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="text-[16px] font-semibold text-[#131313] mb-2">Elevation · 3 levels</h3>
              <p className="text-[13px] text-[rgba(19,19,19,0.7)] leading-[1.6] mb-5">Soft, ink-tinted shadows. No pure black. Maps to interaction state, not visual hierarchy.</p>
              <div className="flex items-center gap-4">
                {[
                  { name: 'sm', shadow: '0 1px 3px rgba(43,42,40,0.08)' },
                  { name: 'md', shadow: '0 4px 12px rgba(43,42,40,0.12)' },
                  { name: 'lg', shadow: '0 8px 24px rgba(43,42,40,0.15)' },
                ].map((e) => (
                  <div key={e.name} className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-lg bg-white border border-neutral-100" style={{ boxShadow: e.shadow }} />
                    <p className="text-[11px] text-[rgba(19,19,19,0.5)] font-mono">{e.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COMPONENTS */}
          <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-4">COMPONENTS</p>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 mb-12">
            <h3 className="text-[16px] font-semibold text-[#131313] mb-5">Built once, reused across all 10 screens.</h3>

            <div className="border-b border-neutral-100 py-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)] col-span-12 sm:col-span-3">CTA · Primary only</p>
                <div className="col-span-12 sm:col-span-9 flex flex-wrap items-center gap-3">
                  <button className="bg-[#2B2A28] text-white text-[13px] px-7 py-3 rounded-full">הוסף לסל</button>
                  <button className="bg-white border border-[#2B2A28] text-[#2B2A28] text-[13px] px-7 py-3 rounded-full">לקריאה נוספת</button>
                  <span className="text-[11px] text-[rgba(19,19,19,0.4)]">+ Hover · Focus · Disabled</span>
                </div>
              </div>
            </div>

            <div className="border-b border-neutral-100 py-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)] col-span-12 sm:col-span-3">Header · Pill nav</p>
                <div className="col-span-12 sm:col-span-9">
                  <div className="bg-[#FAF7F3]/95 border border-neutral-100 rounded-full px-6 py-3 inline-flex items-center gap-6 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-neutral-500" />
                      <User className="w-4 h-4 text-neutral-500" />
                      <ShoppingBag className="w-4 h-4 text-neutral-500" />
                    </div>
                    <span className="text-[12px] text-neutral-700 px-3 py-1 bg-[#F1EAE2] rounded-full">בית</span>
                    <span className="text-[12px] text-neutral-500">חנות</span>
                    <span className="text-[12px] text-neutral-500">תוכן והדרכה</span>
                    <span className="text-[15px] text-[#131313]" style={{ fontFamily: '"Playfair Display", serif' }}>BELLA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-neutral-100 py-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)] col-span-12 sm:col-span-3">Cards</p>
                <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-3 text-[11px] text-[#131313]">
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Product</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Solution by Need</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Article</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Story</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Review</span>
                </div>
              </div>
            </div>

            <div className="py-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <p className="text-[11px] font-medium uppercase tracking-[1.2px] text-[rgba(19,19,19,0.5)] col-span-12 sm:col-span-3">Forms · Quiz · Cart</p>
                <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-3 text-[11px] text-[#131313]">
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Input · 4 states</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Radio · Checkbox</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Quantity stepper</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Cart line item</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Search overlay</span>
                  <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Newsletter modal</span>
                </div>
              </div>
            </div>
          </div>

          {/* PRINCIPLES */}
          <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-4">PRINCIPLES</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Hebrew-first, not translated', body: 'Layouts flow right-to-left at the structural level: nav, breadcrumbs, hero text, product info. Numbers and Latin tokens stay LTR inside their Hebrew context — never letting a translation shortcut break the reading rhythm.' },
              { title: 'Editorial calm over conversion noise', body: 'No countdown timers, no flash-sale banners, no urgency manipulation. The system is built for trust before it is built for trigger — because the audience is already taking on enough.' },
              { title: 'One action color, always', body: 'Every CTA uses the same deep ink (#2B2A28). No competing reds, oranges, or greens. The hierarchy is built into the layout, not into competing colors.' },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border border-neutral-200 bg-white p-5">
                <h4 className="text-[14px] font-semibold text-[#131313] mb-2">{p.title}</h4>
                <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        <CaseNavFooter currentId="bella" onSelectProject={onSelectProject} />
      </div>

      <Footer />
    </div>
  );
}
