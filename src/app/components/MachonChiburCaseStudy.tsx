import { ArrowLeft, Check, FileText, Shield, Scale } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { CaseNavFooter } from '@/app/components/CaseNavFooter';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import intakeStartImg from '../../assets/4da5aa04250589ceabba90f46d9d5eb35823d09f.png';
import intakeMiddleImg from '../../assets/6a70cc2ac4adf411579c789cc467ade4e7c03c01.png';
import intakeSuccessImg from '../../assets/f7a46f167b7078a4f8e6542c5df195f776773b14.png';
import mainDashboardImg from '../../assets/555012e72bdc0e1c9e229b999b8d53902c28ca93.png';
import heroLaptopImg from '../../assets/7e4406feba492b743bbe79e43d5ab8ec1d25e103.png';
import knowYourRightsImg from '../../assets/4ded4f6621f3769bf84821201029aba0cbba4079.png';
import welfareOptionsImg from '../../assets/f59877637369cdf4d6c8fac6c4b7b6af861914ce.png';
import commonQuestionsImg from '../../assets/f9cf9b0820aa088cbf068681c0406636887f6e2d.png';
import questionnaireImg from '../../assets/4539e4c1b0630345cbee893c45a400876abb8df6.png';
import resultsImg from '../../assets/f15bf7ba406af1bdb77ebb7675191e3fc71005ee.png';
import emotionalToolsImg from '../../assets/7d284a43775e44a2d5cb51e19a8cf579e67c34fa.png';
import chatImg from '../../assets/f47a1bedc64351fab2729de6136a0a43e262fd14.png';
import expertSelectionImg from '../../assets/b8f082375407022bd94b7f0a8dbddb6952af62f5.png';
import expertMatchImg from '../../assets/bf54ac24176d6a2c0b8550062a8b79bbcd24afeb.png';
import expertChatImg from '../../assets/63a1e0bc44b3cfb11631655d7fd5e9cd120ed9eb.png';

// Improved wrapper that uses a ref to scale content
import { useEffect, useRef, useState } from 'react';

interface MachonChiburCaseStudyProps {
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

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full aspect-[4/3] bg-neutral-50 rounded-lg border border-neutral-200 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#A7C4A0]/10 to-transparent opacity-50"></div>
      <div className="w-16 h-16 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mb-4 relative z-10 text-neutral-400 group-hover:scale-110 transition-transform duration-500">
        <div className="w-8 h-8 border-2 border-current rounded-lg border-dashed"></div>
      </div>
      <span className="text-neutral-500 text-xs md:text-sm font-medium tracking-widest uppercase relative z-10">{label}</span>
    </div>
  );
}

function AutoScaleWrapper({ children, originalWidth = 1280, originalHeight = 924 }: { children: React.ReactNode, originalWidth?: number, originalHeight?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        setScale(parentWidth / originalWidth);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [originalWidth]);

  return (
    <div 
      ref={containerRef} 
      className="w-full relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
      style={{ height: originalHeight * scale }}
    >
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ 
          width: originalWidth, 
          height: originalHeight, 
          transform: `scale(${scale})` 
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function MachonChiburCaseStudy({ onBack, onSelectProject }: MachonChiburCaseStudyProps) {
  return (
    <div className="absolute inset-0 overflow-auto pb-0 bg-white text-neutral-600 font-sans">
      {/* Top Navigation */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-12 max-w-7xl mx-auto">
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
            <p className="text-xs font-semibold text-neutral-400 mb-3 tracking-widest uppercase">Case Study</p>
            <h1 className="font-display text-3xl md:text-4xl font-normal text-neutral-900 mb-4 leading-tight">MACHON CHIBUR</h1>
            <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">
              A therapeutic Web platform rooted in Trauma-Informed Design. We architected an anonymous, secure bridge to professional support for individuals facing "Transparent Violence" (emotional and economic abuse), effectively dismantling traditional barriers to seeking help.
            </p>
            <p className="text-xs md:text-sm text-neutral-400 font-light tracking-wide">UX/UI Research & Design | Reichman University | 2025</p>
          </div>
          <div className="lg:col-span-7 translate-y-16 lg:translate-x-8">
             <div className="w-full lg:scale-105 relative flex items-center justify-center">
                 <ImageWithFallback 
                    src={heroLaptopImg} 
                    alt="Machon Chibur Platform Interface" 
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
            <h2 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4 leading-tight">Bridging the 3-7 Scale Gap</h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-light">
                The core challenge was addressing the "Silent Middle"—individuals positioned between 3 and 7 on the domestic distress scale. While emergency services (8-10) focus on physical danger, Machon Chibur provides early intervention for those avoiding institutional aid due to social stigma, denial, or fear of exposure. The goal was to build a discrete, authoritative brand that feels like a private clinic rather than an emergency shelter.
            </p>
        </div>
      </section>

      {/* Research Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative pb-32 border-t border-neutral-100">
         <StickyTitle>Research</StickyTitle>
         <div className="max-w-3xl pt-12 mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Field Research & Methodology</h2>
            <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
              Our methodology integrated academic review with qualitative field research, including in-depth interviews with senior representatives from a veteran domestic violence NGO to decode user barriers.
            </p>
         </div>

         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300">
                <h3 className="font-display text-lg md:text-xl text-neutral-900 mb-3">Transparent Distress</h3>
                <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">
                   Identifying a broad demographic in middle-to-high socioeconomic status facing non-physical abuse that often goes unaddressed.
                </p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300">
                <h3 className="font-display text-lg md:text-xl text-neutral-900 mb-3">The Trust Deficit</h3>
                <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">
                   Total anonymity is the non-negotiable prerequisite for user engagement among those who distrust state authorities.
                </p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300">
                <h3 className="font-display text-lg md:text-xl text-neutral-900 mb-3">Cognitive Load</h3>
                <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">
                   Applying Miller’s Law to prevent information overload during crises through strategic information chunking.
                </p>
            </div>
         </div>
      </section>

      {/* UX Strategy Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative pb-32 border-t border-neutral-100">
         <StickyTitle>UX Strategy</StickyTitle>
         
         <div className="max-w-6xl mx-auto pt-12">
            {/* Block 1: Trust-Based Intake (UPDATED LAYOUT) */}
            <div className="flex flex-col gap-12 mb-24 border-b border-neutral-100 pb-24 last:border-0 last:pb-0">
                {/* Text Content - Top */}
                <div className="max-w-3xl">
                    <span className="text-[10px] font-bold text-[#A7C4A0] tracking-widest uppercase mb-2 block">Sensitive Onboarding</span>
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Trust-Based Intake</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">
                        A progressive disclosure flow designed as an empathetic conversation, minimizing cognitive friction while building immediate user confidence. The interface uses calming colors and clear, non-threatening language to guide users through the assessment process.
                    </p>
                </div>
                
                {/* Images - Bottom - Static Cascading Deck */}
                <div className="relative w-full py-12 md:py-20 flex flex-col md:flex-row justify-center items-start">
                     {/* Decorative Background Blur */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#A7C4A0]/5 blur-3xl -z-10 rounded-full"></div>
                     
                     {/* Item 1 - Left / Top */}
                     <div className="w-full md:w-[48%] relative z-30">
                         <img 
                            src={intakeStartImg} 
                            alt="Intake Question 1" 
                            className="w-full h-auto"
                         />
                     </div>
                     
                     {/* Item 2 - Middle - Overlapping & Stepped Down */}
                     <div className="w-full md:w-[48%] relative z-20 md:-ml-[12%] mt-8 md:mt-24">
                         <img 
                            src={intakeMiddleImg} 
                            alt="Intake Question 11" 
                            className="w-full h-auto"
                         />
                     </div>
                     
                     {/* Item 3 - Right - Overlapping & Stepped Further Down */}
                     <div className="w-full md:w-[48%] relative z-10 md:-ml-[12%] mt-8 md:mt-48">
                         <img 
                            src={intakeSuccessImg} 
                            alt="Intake Success" 
                            className="w-full h-auto"
                         />
                     </div>
                </div>
            </div>

            {/* Block 2: Personalized Rights (NEW STRUCTURE) */}
            <div className="flex flex-col gap-12 mb-24 border-b border-neutral-100 pb-24 last:border-0 last:pb-0">
                {/* Text Content - Top */}
                <div className="max-w-3xl">
                    <span className="text-[10px] font-bold text-[#A7C4A0] tracking-widest uppercase mb-2 block">Empowerment Hub</span>
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Personalized Rights & Knowledge</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">
                        A dual-axis information center featuring a rights-mapping questionnaire that translates complex legal data into a personalized, actionable roadmap.
                    </p>
                </div>

                {/* Images - Bottom - 3 Visual Groups */}
                <div className="space-y-16 mt-6">
                    {/* Group 1: Main Dashboard Screen (Replaced with new image) */}
                    <div className="w-full max-w-2xl mx-auto">
                        <div className="text-center mb-6">
                             <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">Main Dashboard</span>
                        </div>
                        <div>
                             <img src={mainDashboardImg} alt="Machon Chibur Dashboard" className="w-full h-auto block" />
                        </div>
                    </div>

                    {/* Group 2: Three Feature Pages (Replaced with new images) */}
                    <div className="w-full md:w-[110%] md:-ml-[5%] max-w-none">
                         <div className="text-center mb-8">
                             <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">Key Features</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                             <div className="flex flex-col gap-4 group">
                                <img 
                                    src={knowYourRightsImg} 
                                    alt="Know Your Rights" 
                                    className="w-full h-auto block" 
                                />
                                <p className="text-center text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Know Your Rights</p>
                             </div>
                             
                             <div className="flex flex-col gap-4 group">
                                <img 
                                    src={welfareOptionsImg} 
                                    alt="Welfare Options" 
                                    className="w-full h-auto block" 
                                />
                                <p className="text-center text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Welfare Options</p>
                             </div>

                             <div className="flex flex-col gap-4 group">
                                <img 
                                    src={commonQuestionsImg} 
                                    alt="Common Questions" 
                                    className="w-full h-auto block" 
                                />
                                <p className="text-center text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Common Questions</p>
                             </div>
                        </div>
                    </div>

                    {/* Group 3: Specific Feature Flow (Updated with 2 new images) */}
                    <div className="w-full md:w-[110%] md:-ml-[5%] max-w-none grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        
                         {/* Questionnaire */}
                         <div className="w-full">
                            <div className="text-center mb-6">
                                <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">Questionnaire Flow</span>
                            </div>
                            <img src={questionnaireImg} alt="Rights Mapping Questionnaire" className="w-full h-auto block" />
                        </div>

                        {/* Results */}
                        <div className="w-full">
                            <div className="text-center mb-6">
                                <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">Personalized Action Plan</span>
                            </div>
                            <img src={resultsImg} alt="Personalized Rights Map" className="w-full h-auto block" />
                        </div>

                    </div>
                </div>
            </div>

            {/* Block 3: Emotional Context Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-24 border-b border-neutral-100 pb-24 last:border-0 last:pb-0">
                <div className="lg:col-span-5">
                    <span className="text-[10px] font-bold text-[#A7C4A0] tracking-widest uppercase mb-2 block">Adaptive Toolbox</span>
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Emotional Context Tools</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">
                        An emotion-triggered resource library featuring an encrypted professional chat for real-time guidance and situational coping mechanisms.
                    </p>
                </div>
                <div className="lg:col-span-7">
                     {/* New Images Composition */}
                     <div className="relative w-full flex items-center justify-center">
                          {/* Main Image (Tools) */}
                          <div className="relative z-10 w-[95%]">
                              <img 
                                src={emotionalToolsImg} 
                                alt="Emotional Tools" 
                                className="w-full h-auto block"
                              />
                          </div>
                          
                          {/* Overlay Image (Chat) */}
                          <div className="absolute -left-8 -bottom-24 w-[55%] z-20">
                              <img 
                                src={chatImg} 
                                alt="Secure Chat" 
                                className="w-full h-auto block"
                              />
                          </div>
                     </div>
                </div>
            </div>

            {/* Block 4: Expert Match */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-24 border-b border-neutral-100 pb-24 last:border-0 last:pb-0">
                <div className="lg:col-span-7 order-2 lg:order-1">
                     <div className="relative w-full h-[600px] md:h-[800px]">
                         {/* Image 1: Selection (Top Left) */}
                         <div className="absolute top-0 left-0 w-[70%] z-10">
                              <img 
                                src={expertSelectionImg} 
                                alt="Therapist Selection" 
                                className="w-full h-auto block"
                              />
                         </div>
                         
                         {/* Image 2: Match (Middle Right) */}
                         <div className="absolute top-[28%] right-0 w-[70%] z-20">
                              <img 
                                src={expertMatchImg} 
                                alt="Match Confirmation" 
                                className="w-full h-auto block"
                              />
                         </div>

                         {/* Image 3: Chat (Bottom Left) */}
                         <div className="absolute bottom-12 left-8 w-[70%] z-30">
                              <img 
                                src={expertChatImg} 
                                alt="Secure Chat with Expert" 
                                className="w-full h-auto block"
                              />
                         </div>
                     </div>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2">
                    <span className="text-[10px] font-bold text-[#A7C4A0] tracking-widest uppercase mb-2 block">Graduated Trust Path</span>
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Expert Match</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">
                        A strategic communication funnel allowing users to transition at their own pace from anonymous platform chat to external email, and eventually to video or physical therapy sessions.
                    </p>
                </div>
            </div>



         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="border-t border-neutral-200" />
        <CaseNavFooter currentId="machon-chibur" onSelectProject={onSelectProject} />
      </div>

      <Footer />
    </div>
  );
}
