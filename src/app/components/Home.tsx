import { useEffect, useState } from 'react';
import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { BellaCardAnimation } from '@/app/components/BellaCardAnimation';
import { SupplyNetCardAnimation } from '@/app/components/SupplyNetCardAnimation';
import { MachonChiburCardAnimation } from '@/app/components/MachonChiburCardAnimation';
import { DeepBreathCardAnimation } from '@/app/components/DeepBreathCardAnimation';
import profileImage from '../../assets/99a913ce6253b1dc7d05b1c7995c57d8d1596876.png';
import bellaMockup from '../../assets/f4d14d9769234e371e3b2c43f272901073d360c7.png';
import supplyNetHero from '../../assets/57b61d37a32011c4d800094d142fc794b97687b4.png';
import deepBreathHero from '../../assets/2ce63c0fab5bed905e4a9ef77a72b0e1c015b40b.png';
import machonChiburHero from '../../assets/7e4406feba492b743bbe79e43d5ab8ec1d25e103.png';

interface HomeProps {
  onProjectClick?: (projectId: string) => void;
}

const HERO_VERBS = ['designs and ships', 'prototypes and tests', 'crafts and iterates'];

function AnimatedVerb() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_VERBS.length), 2800);
    return () => clearInterval(t);
  }, []);
  // Sizing placeholder uses the longest verb so the surrounding text never reflows.
  const longest = HERO_VERBS.reduce((a, b) => (a.length > b.length ? a : b));
  return (
    <span className="relative inline-block align-baseline">
      <span className="invisible font-semibold whitespace-nowrap">{longest}</span>
      {HERO_VERBS.map((verb, i) => (
        <span
          key={verb}
          className={`absolute left-0 top-0 text-[#B8552E] font-semibold whitespace-nowrap transition-all duration-[600ms] ease-out ${
            i === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {verb}
        </span>
      ))}
    </span>
  );
}

export function Home({ onProjectClick }: HomeProps) {
  const projects = [
    {
      id: 'supply-net',
      title: 'Supply Net',
      category: 'B2B AI Procurement',
      image: supplyNetHero,
    },
    {
      id: 'bella',
      title: 'Bella',
      category: 'Maternal E-Commerce',
      image: bellaMockup,
    },
    {
      id: 'machon-chibur',
      title: 'Machon Chibur',
      category: 'Therapeutic Web Platform',
      image: machonChiburHero,
    },
    {
      id: 'academic',
      title: 'Deep Breath',
      category: 'Smoking Cessation Platform',
      image: deepBreathHero,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-auto bg-white pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-14 md:pt-20">
        {/* Hero — compact, left-aligned, all sans-serif */}
        <section className="mb-24 md:mb-32">
          {/* Line 1: role + name inline */}
          <p
            className="rise-in text-sm md:text-[15px] leading-relaxed"
            style={{ animationDelay: '0ms' }}
          >
            <span className="text-neutral-400">UI/UX Designer </span>
            <span className="text-neutral-900 font-semibold">Noam Toren</span>
          </p>

          {/* Line 2: availability + live status dot */}
          <p
            className="rise-in text-sm md:text-[15px] leading-relaxed mb-10 inline-flex items-center gap-2"
            style={{ animationDelay: '100ms' }}
          >
            <span className="relative flex w-[7px] h-[7px]">
              <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping" />
              <span className="relative w-[7px] h-[7px] rounded-full bg-emerald-500" />
            </span>
            <span className="text-neutral-400">Open for </span>
            <span className="text-neutral-900 font-semibold">full-time &amp; freelance</span>
          </p>

          {/* Profile image — larger, with brand-tinted offset ring */}
          <div className="rise-in mb-10" style={{ animationDelay: '200ms' }}>
            <img
              src={profileImage}
              alt="Noam Toren"
              className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-2xl object-cover ring-2 ring-[#B8552E]/25 ring-offset-4 ring-offset-white"
              style={{ objectPosition: 'center 35%' }}
            />
          </div>

          {/* Intro headline — large typographic statement with rotating verb */}
          <h1
            className="rise-in text-[34px] md:text-[56px] leading-[1.1] tracking-[-1.5px] text-neutral-900 max-w-4xl mb-10 font-medium"
            style={{ animationDelay: '300ms' }}
          >
            Hey, I'm Noam! A UI/UX designer who{' '}
            <AnimatedVerb />
            {' '}digital products, from first idea to working interface.
          </h1>

          {/* Social links — quiet grey text row, inside hero block */}
          <div
            className="rise-in flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
            style={{ animationDelay: '450ms' }}
          >
            <a
              href="https://www.instagram.com/toren.design_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/noam-toren/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="/Noam-Toren-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              Resume
            </a>
            <a
              href="mailto:noam.toren12@gmail.com"
              className="text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </section>

        {/* Projects — 2-col grid, inline title/subtitle, light-grey image background */}
        <section className="pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => onProjectClick?.(project.id)}
                className="rise-in group cursor-pointer"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {/* Inline title + category */}
                <p className="text-sm md:text-[15px] mb-3">
                  <span className="text-neutral-900 font-semibold">
                    {project.title}
                  </span>
                  <span className="text-neutral-400"> {project.category}</span>
                </p>

                {/* Thin underline fills card width on hover */}
                <div className="h-px w-full origin-left scale-x-0 bg-neutral-900 transition-transform duration-[500ms] ease-out group-hover:scale-x-100 mb-3" />

                {/* Mockup — soft shadow + tiny lift on hover */}
                <div
                  className={`aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-transparent shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-[400ms] ease-out will-change-transform group-hover:-translate-y-2 group-hover:ring-black/[0.08] group-hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)] ${
                    project.id === 'bella' || project.id === 'supply-net' || project.id === 'machon-chibur' || project.id === 'academic'
                      ? 'bg-[#ECEEF0] flex items-center justify-center p-6 md:p-8'
                      : 'bg-[#F2F0EC] flex items-center justify-center p-8'
                  }`}
                >
                  {project.id === 'bella' ? (
                    <div className="w-[80%] aspect-[3/2] rounded-[10px] overflow-hidden shadow-[0_8px_22px_rgba(43,42,40,0.14),0_2px_6px_rgba(43,42,40,0.08)]">
                      <BellaCardAnimation />
                    </div>
                  ) : project.id === 'supply-net' ? (
                    <div className="w-[80%] aspect-[3/2] rounded-[10px] overflow-hidden shadow-[0_8px_22px_rgba(43,42,40,0.14),0_2px_6px_rgba(43,42,40,0.08)]">
                      <SupplyNetCardAnimation />
                    </div>
                  ) : project.id === 'machon-chibur' ? (
                    <div className="w-[80%] aspect-[3/2] rounded-[10px] overflow-hidden shadow-[0_8px_22px_rgba(43,42,40,0.14),0_2px_6px_rgba(43,42,40,0.08)]">
                      <MachonChiburCardAnimation />
                    </div>
                  ) : project.id === 'academic' ? (
                    <div className="w-[80%] aspect-[3/2] rounded-[10px] overflow-hidden shadow-[0_8px_22px_rgba(43,42,40,0.14),0_2px_6px_rgba(43,42,40,0.08)]">
                      <DeepBreathCardAnimation />
                    </div>
                  ) : (
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
