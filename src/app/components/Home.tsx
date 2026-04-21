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
      title: 'Deep Breath',
      category: 'Smoking Cessation Platform',
      image: deepBreathHero,
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
      id: 'supply-net',
      title: 'Supply Net',
      category: 'B2B AI Procurement',
      image: supplyNetHero,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-auto bg-white pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-14 md:pt-20">
        {/* Hero — compact, left-aligned, all sans-serif */}
        <section className="mb-24 md:mb-32">
          {/* Line 1: role + name inline */}
          <p className="text-sm md:text-[15px] leading-relaxed">
            <span className="text-neutral-400">UX Designer </span>
            <span className="text-neutral-900 font-semibold">Noam Toren</span>
          </p>

          {/* Line 2: currently at / location */}
          <p className="text-sm md:text-[15px] leading-relaxed mb-10">
            <span className="text-neutral-400">Based in </span>
            <span className="text-neutral-900 font-semibold">Israel</span>
          </p>

          {/* Profile image — square with slightly rounded corners */}
          <div className="mb-8">
            <img
              src={profileImage}
              alt="Noam Toren"
              className="w-[72px] h-[72px] md:w-20 md:h-20 rounded-xl object-cover"
              style={{ objectPosition: 'center 35%' }}
            />
          </div>

          {/* Intro paragraph — regular sans with bold emphasis, no serif */}
          <p className="text-lg md:text-[22px] leading-[1.45] text-neutral-900 max-w-2xl mb-10">
            Hey, I'm Noam! A UX Designer with a
            {' '}<span className="font-semibold text-[#C87137]">love for thoughtful craft</span>.
            {' '}I design digital products that feel natural, clear, and built for the people who use them.
          </p>

          {/* Social links — quiet grey text row, inside hero block */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
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
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectClick?.(project.id)}
                className="group cursor-pointer"
              >
                {/* Inline title + category */}
                <p className="text-sm md:text-[15px] mb-3">
                  <span className="text-neutral-900 font-semibold group-hover:text-[#C87137] transition-colors duration-200">
                    {project.title}
                  </span>
                  <span className="text-neutral-400"> {project.category}</span>
                </p>

                {/* Mockup on light background */}
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F2F0EC] flex items-center justify-center p-8">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
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
