import { useEffect, useRef, useState } from 'react';
import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import profileImage from '../../assets/99a913ce6253b1dc7d05b1c7995c57d8d1596876.png';

// DEEP BREATH screens
import deepBreathHero from '../../assets/2ce63c0fab5bed905e4a9ef77a72b0e1c015b40b.png';
import deepBreathHub from '../../assets/2b35accf6040327f1a4293aad8b40fdd0928d71c.png';
import deepBreathMobile from '../../assets/6b4d03b54622b096008e4efc8b3e88afcc6eb605.png';
import deepBreathQuiz from '../../assets/ef4cb93d4bdaa208f60882e23720c518b7904228.png';

// BELLA screens
import bellaHero from '../../assets/f4d14d9769234e371e3b2c43f272901073d360c7.png';
import bellaDashboard from '../../assets/5f857b4e1c1e4a7d4218a376633531836947dcd7.png';
import bellaStrategy from '../../assets/2dfd007ccff4a3ab5905a1bc67d5535205ea07e2.png';
import bellaStories from '../../assets/c0c0facfa6f14e57ca71a7e8222654a5a77a734e.png';

// MACHON CHIBUR screens
import machonHero from '../../assets/7e4406feba492b743bbe79e43d5ab8ec1d25e103.png';
import machonExpert from '../../assets/bf54ac24176d6a2c0b8550062a8b79bbcd24afeb.png';
import machonIntake from '../../assets/4da5aa04250589ceabba90f46d9d5eb35823d09f.png';
import machonQuestions from '../../assets/f9cf9b0820aa088cbf068681c0406636887f6e2d.png';

// SUPPLY NET screens
import supplyHero from '../../assets/57b61d37a32011c4d800094d142fc794b97687b4.png';
import supplyBuying from '../../assets/9f500214e40b40199b69860288a6b22b6789eee3.png';
import supplySearch from '../../assets/336f0a82eac66094ade8528c0e3c91ee117d61cf.png';
import supplyFile from '../../assets/48533b611e84bb2db1d4446e96e32e39a9f9253a.png';

interface HomeProps {
  onProjectClick?: (projectId: string) => void;
}

type ProjectId = 'academic' | 'bella' | 'machon-chibur' | 'supply-net';

interface Project {
  id: ProjectId;
  title: string;
  category: string;
  year: string;
  screens: string[];
}

const projects: Project[] = [
  {
    id: 'academic',
    title: 'Deep Breath',
    category: 'Smoking Cessation Platform',
    year: '2024',
    screens: [deepBreathHero, deepBreathHub, deepBreathMobile, deepBreathQuiz],
  },
  {
    id: 'bella',
    title: 'Bella',
    category: 'Maternal E-Commerce',
    year: '2024',
    screens: [bellaHero, bellaDashboard, bellaStrategy, bellaStories],
  },
  {
    id: 'machon-chibur',
    title: 'Machon Chibur',
    category: 'Therapeutic Web Platform',
    year: '2025',
    screens: [machonHero, machonExpert, machonIntake, machonQuestions],
  },
  {
    id: 'supply-net',
    title: 'Supply Net',
    category: 'B2B AI Procurement',
    year: '2025',
    screens: [supplyHero, supplyBuying, supplySearch, supplyFile],
  },
];

export function Home({ onProjectClick }: HomeProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<ProjectId | null>(null);
  const [screenIdx, setScreenIdx] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Cycle through screens while hovering a project
  useEffect(() => {
    if (!hovered) return;
    const id = setInterval(() => {
      setScreenIdx((i) => i + 1);
    }, 900);
    return () => clearInterval(id);
  }, [hovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const activeProject = projects.find((p) => p.id === hovered);
  const activeScreen = activeProject
    ? activeProject.screens[screenIdx % activeProject.screens.length]
    : null;

  return (
    <div className="absolute inset-0 overflow-auto bg-[#FBFAF7] text-neutral-900">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-24 md:pb-32">
        {/* Profile image — small, quiet */}
        <div className="mb-8">
          <img
            src={profileImage}
            alt="Noam Toren"
            className="w-20 h-20 rounded-full object-cover"
            style={{ objectPosition: 'center 35%' }}
          />
        </div>

        {/* Eyebrow */}
        <p className="text-sm text-neutral-500 mb-3 tracking-normal">
          UX Designer
        </p>

        {/* Name — large italic serif display */}
        <h1 className="font-display text-6xl md:text-8xl leading-[0.95] text-neutral-900 mb-6">
          Noam Toren
        </h1>

        {/* Status line */}
        <p className="text-sm md:text-base text-neutral-500 mb-10">
          Currently <span className="font-display text-neutral-900">based in Israel</span>
        </p>

        {/* Intro paragraph — sans with italic serif emphasis */}
        <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-normal max-w-2xl mb-12">
          Hey, I'm Noam! A UX Designer crafting digital products that feel
          {' '}<span className="font-display text-[#B85C38]">natural</span>,
          {' '}<span className="font-display text-[#B85C38]">clear</span>, and
          {' '}<span className="font-display text-[#B85C38]">thoughtfully made</span>
          {' '}for the people who use them.
        </p>

        {/* Social row */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <a
            href="https://www.instagram.com/toren.design_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-[#B85C38] transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/noam-toren/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-[#B85C38] transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="mailto:noam.toren12@gmail.com"
            className="text-neutral-600 hover:text-[#B85C38] transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </section>

      {/* Projects list */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        {/* Small section label */}
        <p className="text-xs text-neutral-400 tracking-widest uppercase mb-6">
          Selected Work
        </p>

        <div
          ref={listRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
          className="relative border-t border-neutral-200"
        >
          {/* Cursor-follow preview */}
          <div
            className="pointer-events-none absolute z-20 w-[320px] md:w-[380px] aspect-[4/3] rounded-md overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/5 bg-white transition-opacity duration-300 ease-out hidden md:block"
            style={{
              left: mouse.x,
              top: mouse.y,
              transform: 'translate(-50%, -110%)',
              opacity: hovered ? 1 : 0,
            }}
          >
            {activeScreen && (
              <ImageWithFallback
                key={activeScreen}
                src={activeScreen}
                alt=""
                className="w-full h-full object-cover animate-fade-in"
              />
            )}
          </div>

          {projects.map((project, index) => {
            const isHovered = hovered === project.id;
            const isDimmed = hovered !== null && !isHovered;
            return (
              <div
                key={project.id}
                onClick={() => onProjectClick?.(project.id)}
                onMouseEnter={() => {
                  setHovered(project.id);
                  setScreenIdx(0);
                }}
                className="group flex items-baseline justify-between gap-6 py-7 md:py-9 border-b border-neutral-200 cursor-pointer transition-opacity duration-300"
                style={{ opacity: isDimmed ? 0.35 : 1 }}
              >
                <div className="flex items-baseline gap-6 md:gap-10 min-w-0">
                  <span className="text-xs md:text-sm text-neutral-400 tabular-nums w-6 flex-shrink-0">
                    0{index + 1}
                  </span>
                  <h3
                    className={`font-display text-3xl md:text-5xl leading-tight truncate transition-colors duration-300 ${
                      isHovered ? 'text-[#B85C38]' : 'text-neutral-900'
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-baseline gap-6 md:gap-10 flex-shrink-0">
                  <p className="text-xs md:text-sm text-neutral-500 hidden sm:block">
                    {project.category}
                  </p>
                  <span className="text-xs md:text-sm text-neutral-400 tabular-nums">
                    {project.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
