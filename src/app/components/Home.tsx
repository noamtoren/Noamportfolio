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
          <h1 className="text-lg font-semibold text-black mb-1 tracking-tight">
            Noam Toren
          </h1>

          {/* Role */}
          <p className="text-xs text-neutral-500 mb-8 tracking-normal font-normal">
            UX designer
          </p>

          {/* Personal Image */}
          <div className="mb-8">
            <img 
              src={profileImage} 
              alt="Noam" 
              className="w-24 h-24 rounded-xl object-cover" 
              style={{ objectPosition: 'center 35%' }}
            />
          </div>

          {/* Personal Statement - Below Image */}
          <p className="font-display text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl font-normal">
            <span className="text-[#C87137]">Hey, I'm Noam!</span>
            <span className="text-neutral-800"> I design digital products that feel natural, clear, and thoughtfully crafted for the <span className="relative inline-block px-1">
              <svg 
                className="absolute left-0 top-1/2 w-full h-full pointer-events-none" 
                viewBox="0 0 100 40" 
                preserveAspectRatio="none"
                style={{ 
                  filter: 'blur(0.3px)',
                  transform: 'translateY(-50%) rotate(-2.5deg)'
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

          {/* Social Links Row */}
          <div className="flex items-center gap-6 text-sm pb-8">
            <a 
              href="https://www.instagram.com/toren.design_/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
            >
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/noam-toren/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-300">
              LinkedIn
            </a>
            <a 
              href="mailto:noam.toren13@gmail.com" 
              className="text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
            >
              Email
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="group cursor-pointer block"
              onClick={() => onProjectClick && onProjectClick(project.id)}
            >
              {/* Context Label */}
              <p className="text-xs text-neutral-400 mb-3 tracking-wide uppercase">
                {project.context}
              </p>
              
              {/* Project Image / Preview */}
              <div className={`aspect-[4/3] rounded-lg mb-4 relative overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md border border-neutral-100/50 
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
              </div>
              
              {/* Project Title */}
              <h3 className="text-lg text-neutral-800 font-medium group-hover:text-black transition-colors">
                {project.title}
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
