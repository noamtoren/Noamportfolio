import { useState } from 'react';
import { ArrowLeft, Search, User, ShoppingBag } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { CaseNavFooter } from '@/app/components/CaseNavFooter';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import p1SolutionsImage from '../../assets/bella-p1-solutions-v2.png';
import p1ShopImage from '../../assets/bella-p1-shop.png';
import p2QuizIntroImage from '../../assets/bella-p2-quiz-intro-v2.png';
import p2QuizStepImage from '../../assets/bella-p2-quiz-step.png';
import p2QuizResultsImage from '../../assets/bella-p2-quiz-results.png';
import p3HubImage from '../../assets/bella-p3-hub-v2.png';
import p3SleepImage from '../../assets/bella-p3-sleep-v2.png';
import p3NormalImage from '../../assets/bella-p3-normal-v2.png';
import p4StoriesImage from '../../assets/bella-p4-stories.png';
import p4ReviewsImage from '../../assets/bella-p4-reviews.png';
import bodyMapBg from '../../assets/bella-bodymap-bg-v2.jpg';

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
          <p className="text-[11px] mb-1.5 leading-none text-[#1E1E1E]">{img.label}</p>
          <ImageWithFallback
            src={img.src}
            alt={img.alt}
            className="block w-full h-auto shadow-[0_8px_24px_rgba(43,42,40,0.10)]"
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
  custom,
}: {
  label: string;
  heading: string;
  body: string;
  images?: PillarImage[];
  custom?: React.ReactNode;
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
        {custom ?? (images && <PillarImages images={images} />)}
      </PillarCanvas>
    </div>
  );
}

// ─────────────────── Pillar 5 — Live Interactive Body Map ──────────────────
// Hotspot positions are derived from the original Figma feature (node 283:599):
// container 1100×618.75; back at left=655/top=65.75, belly 602/274.75,
// hips 493/87.75, knees 320/351.75, ankles 147/132.75. Converted to %.
type Hotspot = {
  id: string;
  title: string;
  description: string;
  position: { top: string; left: string };
  tooltipDirection: 'left' | 'right';
};

// Positions reprojected from the original 1536×1024 image (also used in the home
// card) into this case study's 16:9 frame. Conversion: case_y = (orig_y - 7.79)
// / 84.4 * 100; X stays unchanged because the image fills width without crop.
const HOTSPOTS: Hotspot[] = [
  { id: 'back', title: 'תמיכה בגב', description: 'הכרית תומכת בעמוד השדרה ומפחיתה לחץ על אזור הגב התחתון', position: { top: '27%', left: '76%' }, tooltipDirection: 'left' },
  { id: 'hips', title: 'תמיכה באגן ובירכיים', description: 'יישור נכון של האגן מפחית כאבים ומשפר את איכות השינה', position: { top: '42%', left: '46%' }, tooltipDirection: 'right' },
  { id: 'belly', title: 'תמיכה בבטן', description: 'תומכת בבטן בעדינות ומקלה על תחושת המשקל', position: { top: '32%', left: '60%' }, tooltipDirection: 'left' },
  { id: 'knees', title: 'תמיכה בין הברכיים', description: 'שומרת על יישור נכון של הרגליים ומפחיתה לחץ על הברכיים', position: { top: '58%', left: '28%' }, tooltipDirection: 'right' },
  { id: 'ankles', title: 'תמיכה בקרסוליים', description: 'מרימה את הרגליים במעט ועוזרת להפחית נפיחות', position: { top: '62%', left: '17%' }, tooltipDirection: 'right' },
];

function InteractiveBodyMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [containerHovered, setContainerHovered] = useState(false);
  return (
    <div
      className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-[#f1eae2]"
      style={{ aspectRatio: '1100 / 618.75' }}
      dir="ltr"
      onMouseEnter={() => setContainerHovered(true)}
      onMouseLeave={() => setContainerHovered(false)}
    >
      <img
        src={bodyMapBg}
        alt="Pregnancy pillow feature highlights"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] ease-out ${
          containerHovered ? 'scale-[1.04]' : 'scale-100'
        }`}
      />
      <div className="absolute inset-0 bg-black/[0.06]" />

      {HOTSPOTS.map((h) => {
        const isHovered = hovered === h.id;
        return (
          <div
            key={h.id}
            className="absolute"
            style={{ top: h.position.top, left: h.position.left, zIndex: isHovered ? 30 : 20 }}
            onMouseEnter={() => setHovered(h.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Soft steady halo */}
            <span className="absolute inset-0 -m-1 rounded-full bg-white/25 pointer-events-none" />
            {/* Slow gentle pulse — single ring, low contrast (uses Tailwind ping keyframe) */}
            <span
              className="absolute inset-0 -m-1 rounded-full bg-white/35 animate-ping pointer-events-none"
              style={{ animationDuration: '2.8s', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
            />

            {/* Hotspot dot */}
            <button
              type="button"
              aria-label={h.title}
              className={`relative w-8 h-8 rounded-full border border-white/60 bg-white/90 backdrop-blur-sm shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center transition-transform duration-300 ease-out ${
                isHovered ? 'scale-110' : 'hover:scale-110'
              }`}
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-[#2b2a28]/70" />
            </button>

            {/* Glass tooltip */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${
                h.tooltipDirection === 'right' ? 'left-12' : 'right-12'
              } w-56 px-4 py-3 rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-[0_8px_24px_rgba(43,42,40,0.18)] transition-all duration-200 pointer-events-none ${
                isHovered ? 'opacity-100 translate-x-0' : `opacity-0 ${h.tooltipDirection === 'right' ? '-translate-x-1' : 'translate-x-1'}`
              }`}
              style={{ direction: 'rtl' }}
            >
              <p className="text-[12px] font-semibold text-[#131313] mb-1 leading-tight">
                {h.title}
              </p>
              <p className="text-[11px] text-[rgba(19,19,19,0.75)] leading-snug">
                {h.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Hover-triggered feature card — bottom-right, matches the BELLA site overlay */}
      <div
        className={`absolute bottom-4 right-4 md:bottom-6 md:right-6 w-[min(72%,360px)] px-5 py-4 md:px-6 md:py-5 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md shadow-[0_10px_30px_rgba(43,42,40,0.22)] z-40 transition-all duration-300 ease-out ${
          containerHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        style={{ direction: 'rtl' }}
      >
        <p className="text-[18px] md:text-[20px] font-semibold text-[#131313] leading-tight mb-1.5">
          תמיכה ב־5 נקודות מפתח בגוף
        </p>
        <p className="text-[12px] md:text-[13px] text-[rgba(19,19,19,0.75)] leading-snug mb-4">
          נוחות ותמיכה מלאה בכל הגוף להקלה על כאבי הריון
        </p>
        <button
          type="button"
          className="bg-[#2b2a28] text-white text-[12px] md:text-[13px] px-5 py-2.5 rounded-full hover:bg-[#3a3835] transition-colors"
        >
          לרכישת כריות הריון
        </button>
      </div>
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
            Instead of opening with categories ("Pillows", "Belts", "Apparel"), the homepage opens with situations: <em>better sleep, sitting comfort, pain relief, postpartum care</em>. A 6-step quiz translates how the user feels into a single product recommendation. Editorial content (sleep tips, "what's normal in pregnancy") sits at the same depth as the catalogue, not buried in a footer. Hebrew typography is treated as a first-class system — not an afterthought translation.
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
              body="The homepage opens with the four physical states a pregnant body actually moves through — sleep, sitting, pain, postpartum — and routes each one into a curated shop. The shop itself preserves the same logic: filters are framed around lived needs (week of pregnancy, sleeping position, back pain) rather than abstract product taxonomy, so the user is buying a solution, not browsing a catalogue."
              images={[
                { src: p1SolutionsImage, alt: 'Home — Solutions by Need', label: 'Home — Solutions by Need' },
                { src: p1ShopImage, alt: 'Shop — Filter by need', label: 'Shop — Filter by Need' },
              ]}
            />

            {/* Pillar 2 — Personalised Quiz Path: 3 static screens, SupplyNet style */}
            <Pillar
              label="Pillar 02 — Personalised Quiz Path"
              heading="A 6-step conversation that ends in one matched product."
              body="The quiz has a clear arc: a calm landing, six paced questions with a progress bar, and a single matched recommendation at the end. The user always knows where she is in the flow — questions are reversible, answers are anonymous, and the result is three concrete picks with reasoning, not a list of upsells."
              images={[
                { src: p2QuizIntroImage, alt: 'Quiz — landing screen', label: 'Quiz — Landing' },
                { src: p2QuizStepImage, alt: 'Quiz — question with progress bar', label: 'Quiz — Question 3 of 6' },
                { src: p2QuizResultsImage, alt: 'Quiz — personalised recommendations', label: 'Quiz — Matched Result' },
              ]}
            />

            {/* Pillar 3 — Editorial Trust Layer */}
            <Pillar
              label="Pillar 03 — Editorial Trust Layer"
              heading="Content earns the right to sell."
              body="A real Knowledge Hub with sleep tips, pregnancy-norm guides and FAQ — promoted on the homepage as a peer surface to the shop, not buried in a footer. Each article opens with an editorial hero that sets a calm, trustworthy tone before any product is mentioned, and links back to the matching solution only after the reader has been informed."
              images={[
                { src: p3HubImage, alt: 'Content Hub landing', label: 'Content Hub — Landing' },
                { src: p3SleepImage, alt: 'Sleep tips article', label: 'Article — Sleep in Pregnancy' },
                { src: p3NormalImage, alt: 'What is normal article', label: 'Article — What’s Normal' },
              ]}
            />

            {/* Pillar 4 — Trust Through Real Stories: SupplyNet-style static screens */}
            <Pillar
              label="Pillar 04 — Trust Through Real Stories"
              heading="Trust is built when other women tell the story — not the brand."
              body="Two surfaces, both above the fold on Home, run on real customers. An Instagram-style story carousel runs short video moments from actual mothers. A verified-buyer review slider rotates through five-star reviews with names, weeks of pregnancy and dates. No fake stars, no generic copy — trust is earned through specificity."
              images={[
                { src: p4StoriesImage, alt: 'Home — User stories section', label: 'Home — User Stories' },
                { src: p4ReviewsImage, alt: 'Home — Verified reviews', label: 'Home — Verified Reviews' },
              ]}
            />

            {/* Pillar 5 — Interactive feature: hotspots, glass tooltip, image zoom */}
            <Pillar
              label="Pillar 05 — Product Discovery Through the Body"
              heading="One image. Five hotspots. The product is explained by the body, not the spec sheet."
              body="The homepage's product zone is a single editorial photograph of a woman with the pillow, overlaid with five hotspots — back, hips, belly, knees, ankles. Each hotspot pulses gently to invite exploration; on hover, a glass-frame tooltip names what the pillow does at that point in the body, and the photograph zooms slightly to focus attention. The product is explained through the body it touches rather than through a spec sheet."
              custom={<InteractiveBodyMap />}
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
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">6q</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">A six-step quiz collapses the catalogue into a single matched product — feeling-led, not spec-led</p>
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
