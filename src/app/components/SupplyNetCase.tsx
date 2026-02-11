import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import heroImage from 'figma:asset/57b61d37a32011c4d800094d142fc794b97687b4.png';
import buyingGroupState1 from 'figma:asset/460e25cd141ca9b471384ce97a83560a20d2ad76.png';
import buyingGroupState2 from 'figma:asset/9f500214e40b40199b69860288a6b22b6789eee3.png';
import buyingGroupState3 from 'figma:asset/18f2f4ae2ba02118fc5c433b02c9f15052f2419b.png';
import searchEmptyState from 'figma:asset/8c284cec1d04817bb63383fd5c14a8807268d70f.png';
import searchResultsState from 'figma:asset/336f0a82eac66094ade8528c0e3c91ee117d61cf.png';
import fileAnalysis1 from 'figma:asset/46fcd16704d676e2383ea0f1866aca541c44edc3.png';
import fileAnalysis2 from 'figma:asset/48533b611e84bb2db1d4446e96e32e39a9f9253a.png';

interface SupplyNetCaseProps {
  onBack: () => void;
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

export function SupplyNetCase({ onBack }: SupplyNetCaseProps) {
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
            <p className="text-xs font-semibold text-neutral-400 mb-6 tracking-widest uppercase">
              Startup
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-normal text-neutral-900 mb-6 leading-tight">
              SUPPLY NET
            </h1>
            <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">
              A strategic B2B marketplace bridging the gap between developers and suppliers. We built a transparent ecosystem where developers maximize buying power through collaboration, and suppliers gain equal access to new business opportunities.
            </p>
            <p className="text-xs md:text-sm text-neutral-400 font-light tracking-wide">
              UX/UI Design & Strategy | 2025
            </p>
          </div>
          <div className="lg:col-span-7 translate-y-16 lg:translate-x-8">
             <div className="w-full lg:scale-105 relative flex items-center justify-center">
                <ImageWithFallback 
                  src={heroImage} 
                  alt="Supply Net Hero" 
                  className="w-full h-auto object-contain"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative pb-32 border-t border-neutral-100">
        <StickyTitle>The Challenge</StickyTitle>
        <div className="max-w-3xl pt-12">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4 leading-tight">Dismantling Procurement Monopolies</h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-light">
                In the construction industry, access to suppliers is often restricted by non-transparent pricing. We empowered developers with corporate-level leverage by digitizing the management of materials and timelines.
            </p>
        </div>
      </section>

      {/* UX Strategy Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative pb-32 border-t border-neutral-100">
         <StickyTitle>UX Strategy</StickyTitle>
         
         <div className="max-w-6xl mx-auto pt-12">
            {/* Pillar 1: Smart Search & Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-32 border-b border-neutral-100 pb-24 last:border-0 last:pb-0">
                <div className="lg:col-span-5">
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Availability-First Search Engine</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">
                        An advanced module filtering by quantities and delivery dates, providing real-time price comparison and joint-purchase proposals.
                    </p>
                </div>
                <div className="lg:col-span-7">
                     <div className="relative w-full py-8">
                         {/* Image 1: Smaller, offset left/top */}
                         <div className="w-[70%] relative z-0">
                             <ImageWithFallback 
                               src={searchEmptyState}
                               alt="Search Interface - Empty State" 
                               className="w-full h-auto block rounded-lg opacity-90"
                             />
                         </div>
                         
                         {/* Image 2: Larger, overlapping, offset right/bottom */}
                         <div className="w-[85%] ml-auto -mt-[20%] relative z-10">
                             <ImageWithFallback 
                               src={searchResultsState}
                               alt="Search Interface - Results" 
                               className="w-full h-auto block rounded-lg"
                             />
                         </div>
                     </div>
                </div>
            </div>

            {/* Pillar 2: Buying Groups */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-32 border-b border-neutral-100 pb-24 last:border-0 last:pb-0">
                <div className="lg:col-span-7 order-2 lg:order-1">
                     <div className="relative w-full flex flex-col py-8 -ml-3 md:-ml-6">
                        {/* State 1: Search - Top Left */}
                        <div className="w-[80%] relative z-10">
                            <ImageWithFallback 
                                src={buyingGroupState1} 
                                alt="Buying Groups - Search" 
                                className="w-full h-auto rounded-lg" 
                            />
                        </div>

                        {/* State 2: Results - Middle, uniform offset */}
                        <div className="w-[80%] ml-[10%] -mt-[25%] relative z-20">
                             <ImageWithFallback 
                                src={buyingGroupState2} 
                                alt="Buying Groups - Results List" 
                                className="w-full h-auto rounded-lg" 
                            />
                        </div>

                        {/* State 3: Details - Bottom, uniform offset */}
                        <div className="w-[80%] ml-[20%] -mt-[25%] relative z-30">
                             <ImageWithFallback 
                                src={buyingGroupState3} 
                                alt="Buying Groups - Group Details" 
                                className="w-full h-auto rounded-lg" 
                            />
                        </div>
                     </div>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2">
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Collective Power through Connectivity</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">
                        Enables developers to initiate or join buying groups to secure bulk pricing and network with other industry professionals.
                    </p>
                </div>
            </div>

            {/* Pillar 3: Data Intelligence */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                <div className="lg:col-span-5">
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Automated Material Lifecycle</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">
                        Transforms static BOQ files into dynamic management tools with automated categorization and smart order reminders.
                    </p>
                </div>
                <div className="lg:col-span-7">
                     <div className="relative w-full flex flex-col py-8 -ml-3 md:-ml-6">
                        {/* Image 1: Identification Details - Back/Left */}
                        <div className="w-[90%] relative z-10">
                            <ImageWithFallback 
                                src={fileAnalysis1} 
                                alt="File Analysis - Project Setup" 
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Image 2: Physical Characteristics - Front/Right overlapping */}
                        <div className="w-[90%] ml-[10%] -mt-[20%] relative z-20">
                             <ImageWithFallback 
                                src={fileAnalysis2} 
                                alt="File Analysis - Data Entry" 
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                     </div>
                </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
