import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import profileImage from '../../assets/99a913ce6253b1dc7d05b1c7995c57d8d1596876.png';
import bellaMockup from '../../assets/f4d14d9769234e371e3b2c43f272901073d360c7.png';
import supplyNetHero from '../../assets/57b61d37a32011c4d800094d142fc794b97687b4.png';
import deepBreathHero from '../../assets/2ce63c0fab5bed905e4a9ef77a72b0e1c015b40b.png';
import machonChiburHero from '../../assets/7e4406feba492b743bbe79e43d5ab8ec1d25e103.png';

interface HomeProps {
  onProjectClick?: (projectId: string) => void;
}

export function Home({ onProjectClick }: HomeProps) {
  const projects = [
    { 
      id: 'academic', 
      title: "DEEP BREATH", 
      category: "Smoking Cessation Platform",
      context: "CASE STUDY",
      image: deepBreathHero,
      // Removed drop-shadow to ensure seamless blending between the image's white background and the card's white background
      customCardStyle: "bg-white flex items-center justify-center p-8",
      imageFit: "object-contain" 
    },
    { 
      id: 'bella', 
      title: "BELLA", 
      category: "Maternal E-Commerce Experience",
      context: "E-COMMERCE",
      image: bellaMockup,
      // Applied same style as DEEP BREATH: White background + Centered contained image
      customCardStyle: "bg-white flex items-center justify-center p-8",
      imageFit: "object-contain"
    },
    { 
      id: 'machon-chibur', 
      title: "MACHON CHIBUR", 
      category: "Therapeutic Web Platform",
      context: "CASE STUDY",
      image: machonChiburHero,
      // Same consistent style: White background + Centered contained image
      customCardStyle: "bg-white flex items-center justify-center p-8",
      imageFit: "object-contain"
    },
    { 
      id: 'supply-net', 
      title: "Supply Net", 
      category: "B2B AI Procurement Platform",
      context: "STARTUP",
      image: supplyNetHero,
      // Same consistent style: White background + Centered contained image
      customCardStyle: "bg-white flex items-center justify-center p-8",
      imageFit: "object-contain"
    }
  ];

  return (
    <div className="absolute inset-0 overflow-auto pb-32">
      {/* Hero Section */}
      <div className="px-6 md:px-12 py-12 md:py-16 max-w-5xl mx-auto">
        <div className="mb-16">
          {/* Name - Primary Identifier */}
          <h1 className="text-lg font-semibold text-black mb-1 tracking-tight animate-fade-up" style={{ animationDelay: '0ms' }}>
            Noam Toren
          </h1>

          {/* Role */}
          <p className="text-xs text-neutral-500 mb-8 tracking-normal font-normal animate-fade-up" style={{ animationDelay: '80ms' }}>
            UX Designer
          </p>

          {/* Personal Image — with available-for-work status indicator */}
          <div className="mb-8 relative inline-block group/avatar animate-fade-up" style={{ animationDelay: '160ms' }}>
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-xl ring-0 ring-[#C87137]/0 transition-all duration-500 ease-out group-hover/avatar:ring-4 group-hover/avatar:ring-[#C87137]/20" />
              <img
                src={profileImage}
                alt="Noam"
                className="w-24 h-24 rounded-xl object-cover transition-transform duration-500 ease-out group-hover/avatar:scale-[1.02]"
                style={{ objectPosition: 'center 35%' }}
              />
              {/* Status dot — pulsing green ring */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </span>
            </div>
            <p className="absolute left-[108px] top-1/2 -translate-y-1/2 whitespace-nowrap text-xs text-neutral-500 tracking-wide font-normal hidden md:block">
              <span className="text-emerald-600 font-medium">Available</span> for new projects
            </p>
          </div>

          {/* Personal Statement - Below Image */}
          <p className="font-display text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl font-normal animate-fade-up" style={{ animationDelay: '280ms' }}>
            <span className="text-[#C87137]">Hey, I'm Noam!</span>
            <span className="text-neutral-800"> I design digital products that feel natural, clear, and thoughtfully crafted for the <span className="relative inline-block px-1">
              <svg
                className="absolute left-0 top-1/2 w-full h-full pointer-events-none animate-brush"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                style={{
                  filter: 'blur(0.3px)'
                }}
              >
                {/* Simple, elegant brush stroke */}
                <path
                  d="M0,22 Q15,19.5 30,20 Q50,19 70,20.5 Q85,19.5 100,21.5 L100,27 Q85,28 70,28.5 Q50,28 30,27.5 Q15,28.5 0,26.5 Z"
                  fill="#FFA866"
                  fillOpacity="0.35"
                />
              </svg>
              <span className="relative">people</span>
            </span> who use them.</span>
          </p>

          {/* Social Links Row — each link gets an external-arrow that slides on hover */}
          <div className="flex items-center gap-6 text-sm pb-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <a
              href="https://www.instagram.com/toren.design_/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
            >
              <span>Instagram</span>
              <svg className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 ease-out group-hover/link:opacity-100 group-hover/link:translate-x-0" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 9L9 3M9 3H4M9 3V8" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/noam-toren/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
            >
              <span>LinkedIn</span>
              <svg className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 ease-out group-hover/link:opacity-100 group-hover/link:translate-x-0" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 9L9 3M9 3H4M9 3V8" />
              </svg>
            </a>
            <a
              href="mailto:noam.toren12@gmail.com"
              className="group/link inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
            >
              <span>Email</span>
              <svg className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 ease-out group-hover/link:opacity-100 group-hover/link:translate-x-0" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 9L9 3M9 3H4M9 3V8" />
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="h-px bg-neutral-100" />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-6 md:px-12 pb-16 max-w-5xl mx-auto pt-0 relative">
        {/* Subtle orange-tinted background layer */}
        <div className="absolute inset-0 -mx-[100vw] bg-gradient-to-b from-[#FFF5F0]/30 via-[#FFEEE5]/20 to-[#FFF5F0]/10 -z-10" />

        {/* Section Header — anchors the grid, sets expectation */}
        <div className="flex items-end justify-between mb-10 pt-2">
          <div>
            <p className="text-xs text-neutral-400 tracking-widest uppercase mb-2 font-medium">
              Selected Work
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-neutral-900 font-normal tracking-tight">
              Recent projects
            </h2>
          </div>
          <p className="text-xs text-neutral-400 tracking-wide hidden md:block">
            {projects.length.toString().padStart(2, '0')} / 2023 — 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer block transition-transform duration-500 ease-out hover:-translate-y-1.5"
              onClick={() => onProjectClick && onProjectClick(project.id)}
            >
              {/* Context Label — shifts to brand orange on hover */}
              <p className="text-xs text-neutral-400 mb-3 tracking-wide uppercase transition-colors duration-300 group-hover:text-[#C87137]">
                {project.context}
              </p>

              {/* Project Image / Preview */}
              <div className={`aspect-[4/3] rounded-lg mb-4 relative overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-xl border border-neutral-100/50 group-hover:border-[#C87137]/20
                ${project.customCardStyle ? project.customCardStyle : 'bg-neutral-100'}
              `}>
                {project.image ? (
                   <>
                     <div className={`w-full h-full transition-transform duration-700 ${project.imageFit && project.imageFit.includes('object-contain') ? 'group-hover:scale-105' : 'absolute inset-0 group-hover:scale-105'}`}>
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className={`w-full h-full ${project.imageFit || 'object-cover'} ${project.imagePosition || 'object-center'}`}
                        />
                     </div>
                     {/* Subtle overlay on hover (only for non-contained images to keep mockup clean) */}
                     {(!project.imageFit || !project.imageFit.includes('object-contain')) && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                     )}
                   </>
                ) : (
                  // Placeholder for projects without images
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-5xl text-neutral-200 font-light group-hover:text-neutral-300 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="absolute inset-0 bg-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />
                  </div>
                )}

                {/* Floating CTA pill — resting: compact arrow circle; hover: expands with label */}
                <div className="absolute bottom-3 right-3 flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-md border border-neutral-200/70 overflow-hidden transition-all duration-500 ease-out group-hover:bg-[#C87137] group-hover:border-[#C87137] group-hover:shadow-lg group-hover:pl-4">
                  <span className="max-w-0 opacity-0 whitespace-nowrap text-[11px] font-semibold tracking-widest uppercase text-white transition-all duration-500 ease-out group-hover:max-w-[140px] group-hover:opacity-100 group-hover:pr-2">
                    View Case Study
                  </span>
                  <span className="flex items-center justify-center w-9 h-9 flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#C87137] group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M2 6h8m0 0L6 2m4 4L6 10" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Project Title — with growing underline */}
              <h3 className="text-lg text-neutral-800 font-medium group-hover:text-black transition-colors inline-block relative">
                {project.title}
                <span className="absolute left-0 -bottom-0.5 w-full h-px bg-[#C87137] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </h3>
              <p className="text-sm text-neutral-500 mt-1">{project.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
