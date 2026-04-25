import { ArrowLeft, Search, User, ShoppingBag } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { CaseNavFooter } from '@/app/components/CaseNavFooter';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import heroImage from '../../assets/f4d14d9769234e371e3b2c43f272901073d360c7.png';
import strategyFilterImage from '../../assets/3f24ea7874dd37ca8cda54ecaed3080b2a4d8c28.png';
import strategyNeedsCardsImage from '../../assets/2dfd007ccff4a3ab5905a1bc67d5535205ea07e2.png';
import quizStartImage from '../../assets/ef4cb93d4bdaa208f60882e23720c518b7904228.png';
import quizQuestionImage from '../../assets/1458d6abffcc02c19fe235eabf0be0bd373ab73b.png';
import quizResultImage from '../../assets/67a1633c68713005694129658cd90189f7e8a3e9.png';
import storiesImage from '../../assets/c0c0facfa6f14e57ca71a7e8222654a5a77a734e.png';
import reviewsImage from '../../assets/645f031c54e6fcf7dd2fecb04e889118fac43f5c.png';
import hubMainImage from '../../assets/2b35accf6040327f1a4293aad8b40fdd0928d71c.png';
import hubGuideImage from '../../assets/70a34bb10e1f97f29587650c22e9351af6a312ea.png';
import hubMobileImage from '../../assets/6b4d03b54622b096008e4efc8b3e88afcc6eb605.png';
import newInteractiveImage from '../../assets/fa4778ad5b7f683ff5d1d9f18574a3b7d95c4c92.png';

interface BellaCaseStudyProps {
  onBack: () => void;
  onSelectProject?: (id: string) => void;
}

function StickyTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-8 z-10 py-6 flex justify-start pointer-events-none">
      <div className="inline-flex px-4 py-2 bg-white/95 backdrop-blur-md border border-neutral-200 shadow-sm rounded-lg">
        <p className="text-[10px] md:text-xs font-semibold text-neutral-900 tracking-widest uppercase font-sans">
          {children}
        </p>
      </div>
    </div>
  );
}

export function BellaCaseStudy({ onBack, onSelectProject }: BellaCaseStudyProps) {
  return (
    <div className="absolute inset-0 overflow-auto pb-0 bg-white text-neutral-600 font-sans">
      {/* Top Navigation */}
      <div className="px-6 md:px-12 lg:px-24 py-12 max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium tracking-wide">Back to Home</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center lg:translate-y-16">
            <p className="text-xs font-semibold text-neutral-400 mb-3 tracking-widest uppercase">E-commerce Website</p>
            <h1 className="font-display text-3xl md:text-4xl font-normal text-neutral-900 mb-4 leading-tight">BELLA.</h1>
            <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">
              Trust-based experience design, guiding mothers through pregnancy from the levels of cognitive load and physical needs to the discovery of their exact solution.
            </p>
            <p className="text-xs md:text-sm text-neutral-400 font-light tracking-wide">UX/UI Design & Strategy | 2026</p>
          </div>
          <div className="lg:col-span-7 translate-y-16 lg:translate-x-8">
             <div className="w-full lg:scale-105 relative flex items-center justify-center">
                <ImageWithFallback src={heroImage} alt="BELLA Mockup" className="w-full h-auto object-contain" />
             </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative pb-32 border-t border-neutral-100">
        <StickyTitle>The Challenge</StickyTitle>
        <div className="max-w-3xl pt-12">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4 leading-tight">Trust Before Sales</h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-light">
                Expecting mothers face significant cognitive load and physical discomfort. The challenge was to design a soft, empathetic interface that builds high-level trust—prioritizing emotional security before the sale to drive meaningful conversion.
            </p>
        </div>
      </section>

      {/* UX Strategy Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative pb-32 border-t border-neutral-100">
         <StickyTitle>UX Strategy</StickyTitle>
        <div className="max-w-3xl pt-12 mb-24">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Mapping the Relief Journey</h2>
            <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
              Instead of standard product categories, we structured the architecture around physical needs: Sleep, Sitting, and Back Pain. This journey is integrated with a diagnostic quiz that replaces browsing fatigue with a specific, trimester-based recommendation.
            </p>
        </div>

        {/* Strategy Images - Group 1 */}
        <div className="max-w-6xl mx-auto mb-32">
            <div className="relative max-w-6xl mx-auto flex items-center justify-center">
               <div className="relative w-full h-auto">
                   <div className="relative z-20 w-full md:w-[65%] mx-auto">
                        <ImageWithFallback src={strategyNeedsCardsImage} alt="Needs Selection" className="w-full h-auto" />
                   </div>
                   <div className="absolute top-[55%] right-0 w-[40%] md:w-[35%] z-30">
                        <ImageWithFallback src={strategyFilterImage} alt="Filter Modal" className="w-full h-auto shadow-2xl rounded-xl" />
                   </div>
               </div>
            </div>
        </div>
            
        {/* Strategy Images - Group 2 (Quiz) */}
        <div className="max-w-6xl mx-auto mb-32">
            <div className="relative w-full flex justify-center items-center px-4">
               {/* Increased sizes slightly more and reduced overlap (from -space-x-14 to -space-x-10) as requested */}
               <div className="flex justify-center items-end -space-x-6 md:-space-x-10 pt-12 pb-12">
                   <div className="w-[30%] max-w-[220px] relative z-10 origin-bottom-right">
                        <ImageWithFallback src={quizStartImage} alt="Start" className="w-full h-auto" />
                   </div>
                   <div className="w-[35%] max-w-[270px] relative z-20 -translate-y-8 md:-translate-y-12">
                        <ImageWithFallback src={quizQuestionImage} alt="Question" className="w-full h-auto drop-shadow-2xl" />
                   </div>
                   <div className="w-[30%] max-w-[220px] relative z-10 origin-bottom-left">
                        <ImageWithFallback src={quizResultImage} alt="Result" className="w-full h-auto" />
                   </div>
               </div>
            </div>
        </div>
        
        {/* Knowledge Hub */}
        <div className="pt-32 border-t border-neutral-100">
             <div className="max-w-3xl mb-24">
                <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">The Knowledge Hub</h3>
                <p className="text-base text-neutral-600 font-light leading-relaxed">
                  The Guide & Support center acts as an anchor of authority, featuring professional tips, FAQs, and pregnancy guides to reduce anxiety and provide expert accompaniment.
                </p>
            </div>
            
            <div className="max-w-6xl mx-auto relative h-[600px] md:h-[800px]">
                 <div className="absolute top-0 left-0 md:-left-8 w-full md:w-[65%] z-10">
                    <ImageWithFallback src={hubMainImage} alt="Main Hub" className="w-full h-auto" />
                 </div>
                 
                 {/* Right Side Group: Guide & Mobile */}
                 <div className="absolute top-24 right-8 md:top-16 md:right-0 w-[40%] md:w-[45%] z-20 flex flex-col items-center">
                     <ImageWithFallback src={hubGuideImage} alt="Guide" className="w-full h-auto relative z-10" />
                     <div className="-mt-16 w-[40%] relative z-20">
                         <ImageWithFallback src={hubMobileImage} alt="Mobile" className="w-full h-auto" />
                     </div>
                 </div>
            </div>
        </div>

        {/* Real Mothers, Real Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center pt-32 border-t border-neutral-100">
            <div className="lg:col-span-5">
               <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Real Mothers, Real Stories</h3>
               <p className="text-base text-neutral-600 font-light leading-relaxed">
                 Building trust through authentic social media stories from real mothers, allowing users to see the product in a genuine, everyday environment.
               </p>
            </div>
            
            <div className="lg:col-span-7 relative h-auto min-h-[500px] flex items-center">
                 <div className="relative w-full">
                     <div className="relative z-20 w-full">
                        <ImageWithFallback 
                            src={storiesImage} 
                            alt="Stories" 
                            className="w-full h-auto" 
                        />
                     </div>
                    <div className="absolute -bottom-12 -right-12 w-[55%] z-30">
                        <ImageWithFallback 
                            src={reviewsImage} 
                            alt="Reviews" 
                            className="w-full h-auto" 
                        />
                    </div>
                 </div>
            </div>
        </div>

        {/* Interactive Feature - Moved INSIDE UX Strategy */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center pt-32 border-t border-neutral-100">
            <div className="lg:col-span-7">
                <div className="relative z-20 w-full">
                    <ImageWithFallback 
                        src={newInteractiveImage} 
                        alt="Map" 
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="lg:col-span-5">
               <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Interactive Support: 5-Point Body Map</h3>
               <p className="text-base text-neutral-600 font-light leading-relaxed">
                  Demonstrating the technical advantage of the flagship product through an interactive map, showing exactly how the pillow supports 5 critical points of the body.
               </p>
            </div>
         </div>
      </section>

      {/* Design System - With Sticky Title */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative pb-32 border-t border-neutral-100">
        <StickyTitle>Design System</StickyTitle>

        <div className="mt-12 mb-12 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4 leading-tight">
            Visual Language & Interface
          </h2>
          <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            BELLA's system documents only what ships in the product — UI surfaces, typography, components and semantic states. A warm cream palette anchors the brand; deep ink carries every action; gold appears only as a rating or detail accent.
          </p>
          <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
            Scope note: this section covers system tokens used in interface, not photography or campaign imagery.
          </p>
        </div>

        {/* FOUNDATIONS */}
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 mb-4">Foundations</p>

        {/* Color */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 md:p-8 mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-base font-semibold text-neutral-900">Color · 8 system tokens</h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">UI tokens</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed mb-6 max-w-3xl">
            Backgrounds in cream and warm beige set the editorial tone. A deep ink (#2B2A28) carries every CTA — there is no second action color. Gold (#C9A24D) appears only as a star rating or premium accent.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { hex: '#FAF7F3', label: 'bg / cream', token: 'primary-light-bg' },
              { hex: '#F1EAE2', label: 'bg / beige', token: 'secondary-section-bg' },
              { hex: '#FFFFFF', label: 'bg / paper', token: 'paper' },
              { hex: '#2B2A28', label: 'ink / primary', token: 'text-primary' },
              { hex: '#6F6B66', label: 'ink / secondary', token: 'text-secondary' },
              { hex: '#9C968E', label: 'ink / muted', token: 'text-muted' },
              { hex: '#C9A24D', label: 'accent / gold', token: 'rating-gold' },
              { hex: '#C97964', label: 'destructive', token: 'destructive' },
            ].map((s) => (
              <div key={s.hex} className="flex flex-col gap-2">
                <div className="rounded-lg aspect-square border border-neutral-200" style={{ backgroundColor: s.hex }} />
                <div>
                  <p className="text-[11px] font-medium text-neutral-900 leading-tight">{s.label}</p>
                  <p className="text-[10px] text-neutral-400 font-mono leading-tight">{s.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 md:p-8 mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-base font-semibold text-neutral-900">Typography · 4-font hierarchy</h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">Editorial × Hebrew</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed mb-6 max-w-3xl">
            Every text role is matched to a font with a specific job. Playfair Display for editorial moments, Heebo for clear UI in Hebrew, Assistant for long-form body, Varela Round for warm reviews.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 border border-neutral-100 rounded-lg p-5 bg-neutral-50/50">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">DISPLAY</p>
              <p className="text-3xl text-neutral-900" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400 }}>נוחות לאורך ההריון</p>
              <p className="text-[11px] text-neutral-500">Playfair Display · Editorial headings</p>
            </div>
            <div className="space-y-2 border border-neutral-100 rounded-lg p-5 bg-neutral-50/50">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">UI</p>
              <p className="text-base text-neutral-900" style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 500 }}>הוסף לסל · חזרה · המשך</p>
              <p className="text-[11px] text-neutral-500">Heebo · Buttons, navigation, labels</p>
            </div>
            <div className="space-y-2 border border-neutral-100 rounded-lg p-5 bg-neutral-50/50">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">BODY</p>
              <p className="text-sm leading-relaxed text-neutral-700" style={{ fontFamily: 'Assistant, sans-serif', fontWeight: 400 }}>שאלון קצר ואנונימי שיעזור לנו להמליץ לך את המוצר הנכון לטרימסטר ולגוף שלך.</p>
              <p className="text-[11px] text-neutral-500">Assistant · Long-form body in Hebrew</p>
            </div>
            <div className="space-y-2 border border-neutral-100 rounded-lg p-5 bg-neutral-50/50">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">REVIEWS</p>
              <p className="text-base text-neutral-900" style={{ fontFamily: '"Varela Round", sans-serif' }}>"הכרית הכי טובה שקניתי בהריון."</p>
              <p className="text-[11px] text-neutral-500">Varela Round · Personal, warm tone</p>
            </div>
          </div>
        </div>

        {/* Spacing & Elevation row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h3 className="text-base font-semibold text-neutral-900 mb-2">Radius · 12px default</h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-5">A single softness language: 12px on cards, 16px on hero blocks, full pill on buttons.</p>
            <div className="flex items-end gap-4">
              {[
                { r: '8px', size: 56 },
                { r: '12px', size: 72 },
                { r: '16px', size: 88 },
                { r: 'pill', size: 56, pill: true },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="bg-[#F1EAE2] border border-neutral-200" style={{ width: s.pill ? 96 : s.size, height: s.size, borderRadius: s.pill ? 999 : parseInt(s.r) }} />
                  <p className="text-[11px] text-neutral-500 font-mono">{s.r}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h3 className="text-base font-semibold text-neutral-900 mb-2">Elevation · 3 levels</h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-5">Soft, ink-tinted shadows. No pure black. Maps to interaction state, not visual hierarchy.</p>
            <div className="flex items-center gap-4">
              {[
                { name: 'sm', shadow: '0 1px 3px rgba(43,42,40,0.08)' },
                { name: 'md', shadow: '0 4px 12px rgba(43,42,40,0.12)' },
                { name: 'lg', shadow: '0 8px 24px rgba(43,42,40,0.15)' },
              ].map((e) => (
                <div key={e.name} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-lg bg-white border border-neutral-100" style={{ boxShadow: e.shadow }} />
                  <p className="text-[11px] text-neutral-500 font-mono">{e.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPONENTS */}
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 mb-4">Components</p>
        <div className="rounded-xl border border-neutral-200 bg-white p-6 md:p-8 mb-12">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Built once, reused across all 10 screens.</h3>

          {/* Buttons */}
          <div className="border-b border-neutral-100 py-5">
            <div className="grid grid-cols-12 gap-4 items-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 col-span-12 sm:col-span-3">CTA · Primary only</p>
              <div className="col-span-12 sm:col-span-9 flex flex-wrap items-center gap-3">
                <button className="bg-[#2B2A28] text-white text-sm px-7 py-3 rounded-full">הוסף לסל</button>
                <button className="bg-white border border-[#2B2A28] text-[#2B2A28] text-sm px-7 py-3 rounded-full">לקריאה נוספת</button>
                <span className="text-[11px] text-neutral-400">+ Hover · Focus · Disabled</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="border-b border-neutral-100 py-5">
            <div className="grid grid-cols-12 gap-4 items-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 col-span-12 sm:col-span-3">Header · Pill nav</p>
              <div className="col-span-12 sm:col-span-9">
                <div className="bg-[#FAF7F3]/95 border border-neutral-100 rounded-full px-6 py-3 inline-flex items-center gap-6 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-neutral-500" />
                    <User className="w-4 h-4 text-neutral-500" />
                    <ShoppingBag className="w-4 h-4 text-neutral-500" />
                  </div>
                  <span className="text-xs text-neutral-700 px-3 py-1 bg-[#F1EAE2] rounded-full">בית</span>
                  <span className="text-xs text-neutral-500">חנות</span>
                  <span className="text-xs text-neutral-500">תוכן והדרכה</span>
                  <span className="text-base text-neutral-900" style={{ fontFamily: '"Playfair Display", serif' }}>BELLA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="border-b border-neutral-100 py-5">
            <div className="grid grid-cols-12 gap-4 items-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 col-span-12 sm:col-span-3">Cards</p>
              <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-3 text-[11px] text-neutral-700">
                <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Product</span>
                <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Solution by Need</span>
                <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Article</span>
                <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Story</span>
                <span className="px-3 py-2 rounded-lg bg-white border border-neutral-200">Review</span>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="py-5">
            <div className="grid grid-cols-12 gap-4 items-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 col-span-12 sm:col-span-3">Forms · Quiz · Cart</p>
              <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-3 text-[11px] text-neutral-700">
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
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 mb-4">Principles</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Hebrew-first, not translated', body: 'Layouts flow right-to-left at the structural level: nav, breadcrumbs, hero text, product info. Numbers and Latin tokens stay LTR inside their Hebrew context — never letting a translation shortcut break the reading rhythm.' },
            { title: 'Editorial calm over conversion noise', body: 'No countdown timers, no flash-sale banners, no urgency manipulation. The system is built for trust before it is built for trigger — because the audience is already taking on enough.' },
            { title: 'One action color, always', body: 'Every CTA uses the same deep ink (#2B2A28). No competing reds, oranges, or greens. The hierarchy is built into the layout, not into competing colors.' },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-neutral-200 bg-white p-5">
              <h4 className="text-sm font-semibold text-neutral-900 mb-2">{p.title}</h4>
              <p className="text-[13px] leading-relaxed text-neutral-600">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="border-t border-neutral-200" />
        <CaseNavFooter currentId="bella" onSelectProject={onSelectProject} />
      </div>

      {/* Footer is already imported and used, likely needs no change or is global */}
      <Footer />
    </div>
  );
}
