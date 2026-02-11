import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import entryScenariosImage from '../../assets/8f3d0f7f00dfebcc8a19cae89b91bdfa32bafbeb.png';
import expertGridImage from '../../assets/5aa8c2c4647d1233c789d8f38d54bd734f24d03c.png';
import expertPlayerImage from '../../assets/c6e46aec833b43f6d4425d7cc6a04b6fe9310a8d.png';
import dashboardImage from '../../assets/5f857b4e1c1e4a7d4218a376633531836947dcd7.png';
import adaptiveToolboxImage from '../../assets/9b1f392b4896bf7fb9cf2624c06d952a48814049.png';
import desktopMockupImage from '../../assets/2ce63c0fab5bed905e4a9ef77a72b0e1c015b40b.png';

interface AcademicCaseStudyProps {
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

function Placeholder({ label, className = "aspect-video" }: { label: string, className?: string }) {
  return (
    <div className={`w-full bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center ${className}`}>
      <span className="text-neutral-400 text-xs md:text-sm font-mono uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function AcademicCaseStudy({ onBack }: AcademicCaseStudyProps) {
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
            <p className="text-xs font-semibold text-neutral-400 mb-6 tracking-widest uppercase">Case Study</p>
            <h1 className="font-display text-3xl md:text-4xl font-normal text-neutral-900 mb-6 leading-tight">DEEP BREATH.</h1>
            <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed mb-6">
              Trust-based experience design, guiding users through smoking cessation by addressing cognitive load and physical needs until their exact solution is discovered.
            </p>
            <p className="text-xs md:text-sm text-neutral-400 font-light tracking-wide">UX/UI Research & Design | Reichman University | 2026</p>
          </div>
          <div className="lg:col-span-7 translate-y-16 lg:translate-x-8">
             <div className="w-full lg:scale-105 relative flex items-center justify-center">
                <ImageWithFallback 
                  src={desktopMockupImage} 
                  alt="Deep Breath Desktop Dashboard" 
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
            <h2 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4 leading-tight">Resilience Beyond the Screen</h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-light">
                The objective was to design a Web system for smoking cessation. The challenge was creating an effective digital anchor that provides expert guidance and emotional security, acknowledging that a website is not the primary ideal tool compared to face-to-face sessions.
            </p>
        </div>
      </section>

      {/* Research Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative pb-32 border-t border-neutral-100">
         <StickyTitle>Research</StickyTitle>
        <div className="max-w-3xl pt-12 mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Decoding the Smoker's Mind</h2>
            <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
              To build a system that truly supports cessation, we first had to understand the complex psychological and environmental factors driving the habit.
            </p>
        </div>

        {/* Research Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300">
                <h3 className="font-display text-lg md:text-xl text-neutral-900 mb-3">Target Profiles</h3>
                <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">
                   Identifying three distinct smoker types: <span className="font-medium text-neutral-800">Heavy smokers</span> with high dependence and constant triggers, <span className="font-medium text-neutral-800">Moderate smokers</span> whose habit is tied to daily rituals like coffee or driving, and <span className="font-medium text-neutral-800">Social smokers</span> experiencing a gradual loss of control and anxiety about long-term addiction.
                </p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300">
                <h3 className="font-display text-lg md:text-xl text-neutral-900 mb-3">Contextual Triggers</h3>
                <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">
                   Analyzing the critical impact of <span className="font-medium text-neutral-800">Location, Time, Emotion, and Social factors</span>. A cigarette smoked under workplace stress requires a different intervention than one driven by loneliness or boredom at home. The system must recognize each user's personal fingerprint to be effective.
                </p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300">
                <h3 className="font-display text-lg md:text-xl text-neutral-900 mb-3">Psychological Barriers</h3>
                <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">
                   Mapping emotional hurdles like <span className="font-medium text-neutral-800">loss of self-trust</span> from past attempts, <span className="font-medium text-neutral-800">paralyzing guilt</span> after a relapse, and <span className="font-medium text-neutral-800">high cognitive load</span> during cravings that hinders rational decision-making. Understanding these barriers is key to preventing user abandonment.
                </p>
            </div>
        </div>
      </section>

      {/* UX Strategy Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative pb-32 border-t border-neutral-100">
        <StickyTitle>UX Strategy</StickyTitle>
        
        <div className="max-w-6xl mx-auto pt-12">
            {/* Block 1: Entry Scenarios */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-24 border-b border-neutral-100 pb-24 last:border-0 last:pb-0">
                <div className="lg:col-span-5">
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Entry Scenarios</h3>
                    
                    <div className="text-base text-neutral-600 font-light leading-relaxed">
                        <p className="mb-3">
                            <span className="font-medium text-neutral-900">Tracking & Personalization.</span> Utilizing the Daily Questionnaire as a core tool for data collection to enhance system personalization. The system identifies relapses as part of the process, avoiding aggressive resetting of progress while offering positive reinforcement and practical tools for a quick recovery.
                        </p>
                        <p className="mb-3">
                            <span className="font-medium text-neutral-900">High Urgency.</span> A rapid intervention for high-craving moments with low cognitive capacity. Employs Micro-CTAs (expert videos, games, or active to-do lists) to provide instant distraction and interrupt the urge with minimal effort.
                        </p>
                        <p>
                            <span className="font-medium text-neutral-900">Routine & Management.</span> A dedicated path for learning and process management during calm moments. The interface provides shortcuts to key features: Process Continuity, Daily Questionnaire, Dashboard, Patterns & Insights, and Saved Tools.
                        </p>
                    </div>
                </div>
                <div className="lg:col-span-7">
                     <ImageWithFallback 
                       src={entryScenariosImage}
                       alt="Entry Scenarios UI Mockup" 
                       className="w-full h-auto"
                     />
                </div>
            </div>

            {/* Block 2: Expert Authority */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-24 border-b border-neutral-100 pb-24 last:border-0 last:pb-0">
                <div className="lg:col-span-7 order-2 lg:order-1">
                     <div className="relative w-full">
                        {/* Back Image (Player) */}
                        <div className="ml-auto w-[85%] relative z-0 translate-x-4">
                             <ImageWithFallback 
                                src={expertPlayerImage} 
                                alt="Expert Video Player" 
                                className="w-full h-auto" 
                             />
                        </div>
                        {/* Front Image (Grid) */}
                        <div className="-mt-[15%] w-[85%] relative z-10 -translate-x-4">
                             <ImageWithFallback 
                                src={expertGridImage} 
                                alt="Expert Videos Grid" 
                                className="w-full h-auto" 
                             />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2">
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Expert Authority</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">
                        Integrating expert-led video guidance by Dr. Eli Katz to establish trust and professional accompaniment, providing a supportive human presence within the digital interface.
                    </p>
                </div>
            </div>

            {/* Block 3: Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-24 border-b border-neutral-100 pb-24 last:border-0 last:pb-0">
                <div className="lg:col-span-5">
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Dashboard</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">
                        A visual data hub designed to strengthen self-efficacy. It emphasizes Small Wins and long-term growth trends over binary streak-counting to prevent abandonment after a single slip.
                    </p>
                </div>
                <div className="lg:col-span-7">
                     <ImageWithFallback 
                       src={dashboardImage}
                       alt="Dashboard Interface" 
                       className="w-full h-auto"
                     />
                </div>
            </div>

            {/* Block 4: Adaptive Toolbox */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                 <div className="lg:col-span-7 order-2 lg:order-1">
                     <ImageWithFallback 
                        src={adaptiveToolboxImage} 
                        alt="Recommendation Engine UI" 
                        className="w-full h-auto mix-blend-multiply" 
                     />
                 </div>
                 <div className="lg:col-span-5 order-1 lg:order-2">
                     <h3 className="font-display text-2xl md:text-3xl font-normal text-neutral-900 mb-4">Adaptive Toolbox & AI Recommendations</h3>
                     <p className="text-base text-neutral-600 font-light leading-relaxed">
                        A state-based toolkit categorized by mood (Urgency, Motivation, Relapse, or Routine). Features expert videos followed by a Hybrid Recommender system merging explicit preferences with implicit behavioral learning.
                     </p>
                 </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
