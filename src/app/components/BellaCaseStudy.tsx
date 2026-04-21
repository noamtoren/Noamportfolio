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
        
        <div className="bg-neutral-50 p-12 md:p-20 rounded-xl mt-12 border border-neutral-100">
            <div className="mb-20">
                <h2 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-6 leading-tight">
                Visual Language & Interface
                </h2>
                <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed max-w-3xl">
                   A warm earth-tone palette (#FAF7F3, #F1EAE2) paired with typography that balances editorial luxury (Playfair Display) with human softness (Varela Round).
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 pt-8">
                {/* Color Palette */}
                <div className="space-y-8">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">Color Palette</h3>
                    <div className="space-y-6">
                        <div className="">
                            <div className="h-28 w-full bg-[#FAF7F3] rounded-lg border border-neutral-200 mb-3"></div>
                            <div>
                                <p className="font-mono text-xs text-neutral-400 mb-1">#FAF7F3</p>
                                <p className="font-semibold text-neutral-900 text-sm">Off-White Cream</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="h-28 w-full bg-[#F1EAE2] rounded-lg mb-3"></div>
                            <div>
                                <p className="font-mono text-xs text-neutral-400 mb-1">#F1EAE2</p>
                                <p className="font-semibold text-neutral-900 text-sm">Warm Beige</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="h-28 w-full bg-[#2B2A28] rounded-lg mb-3"></div>
                            <div>
                                <p className="font-mono text-xs text-neutral-400 mb-1">#2B2A28</p>
                                <p className="font-semibold text-neutral-900 text-sm">Deep Charcoal</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Typography */}
                <div className="space-y-8">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">Typography</h3>
                    <div className="space-y-16">
                        <div>
                            <p className="text-6xl font-display text-neutral-900 mb-4">Aa</p>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Playfair Display — Headers</p>
                        </div>
                        <div>
                            <p className="text-xl font-sans text-neutral-900 mb-4 leading-relaxed">The quick brown fox jumps over the lazy dog.</p>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Assistant — Body Text</p>
                        </div>
                        <div>
                            <p className="text-2xl font-['Varela_Round'] text-neutral-900 mb-4">"Comfort is distinct."</p>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Varela Round — Quotes</p>
                        </div>
                    </div>
                </div>

                {/* Components & Interface */}
                <div className="space-y-8">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">Interface Components</h3>
                    <div className="flex flex-col items-start gap-12">
                        {/* Primary Button */}
                        <div>
                            <button className="bg-[#2B2A28] text-white text-base px-8 py-3 rounded-lg shadow-sm mb-4">
                                Shop Now
                            </button>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Primary CTA</p>
                        </div>
                        
                        {/* Floating Navigation */}
                        <div className="w-full">
                             <div className="bg-white/80 backdrop-blur-md px-8 py-4 rounded-lg shadow-sm border border-white/50 flex w-fit gap-8 items-center mb-4">
                                <Search className="w-4 h-4 text-neutral-900" />
                                <ShoppingBag className="w-4 h-4 text-neutral-400" />
                                <User className="w-4 h-4 text-neutral-400" />
                             </div>
                             <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Navigation System</p>
                        </div>
                    </div>
                </div>
            </div>
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
