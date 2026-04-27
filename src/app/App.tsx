import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SupplyNetCase } from '@/app/components/SupplyNetCase';
import { BellaCaseStudy } from '@/app/components/BellaCaseStudy';
import { MachonChiburCaseStudy } from '@/app/components/MachonChiburCaseStudy';
import { AcademicCaseStudy } from '@/app/components/AcademicCaseStudy';
import { Home } from '@/app/components/Home';
import { About } from '@/app/components/About';
import { Sketches } from '@/app/components/Sketches';
import { Contact } from '@/app/components/Contact';

const PAGE_EASE = [0.4, 0, 0.2, 1] as const;

type Tab = 'home' | 'about' | 'sketches' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Site-wide page transition variants. Animates only opacity/transform/filter.
  // Reduced-motion: opacity-only, 120ms.
  const pageVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.12, ease: PAGE_EASE } },
        exit: { opacity: 0, transition: { duration: 0.12, ease: PAGE_EASE } },
      }
    : {
        initial: { opacity: 0, y: 4, filter: 'blur(4px)' },
        animate: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.28, ease: PAGE_EASE },
        },
        exit: {
          opacity: 0,
          y: -4,
          filter: 'blur(4px)',
          transition: { duration: 0.22, ease: PAGE_EASE },
        },
      };

  const routeKey = selectedProject ? `project:${selectedProject}` : `tab:${activeTab}`;

  const tabs = [
    { id: 'home' as Tab, label: 'Home' },
    { id: 'about' as Tab, label: 'About me' },
    { id: 'sketches' as Tab, label: 'Sketches' },
    { id: 'contact' as Tab, label: 'Contact me' },
  ];

  // Helper to close case study and return to home
  const handleBack = () => {
    setSelectedProject(null);
  };

  const renderContent = () => {
    // If a project is selected, show it (overrides activeTab for now, or acts as a sub-view of home)
    if (selectedProject === 'supply-net') {
      return <SupplyNetCase onBack={handleBack} onSelectProject={setSelectedProject} />;
    }
    if (selectedProject === 'bella') {
      return <BellaCaseStudy onBack={handleBack} onSelectProject={setSelectedProject} />;
    }
    if (selectedProject === 'machon-chibur') {
      return <MachonChiburCaseStudy onBack={handleBack} onSelectProject={setSelectedProject} />;
    }
    if (selectedProject === 'academic') {
      return <AcademicCaseStudy onBack={handleBack} onSelectProject={setSelectedProject} />;
    }

    // Otherwise show the active tab
    switch (activeTab) {
      case 'home':
        return <Home 
          onProjectClick={(id) => setSelectedProject(id)} 
        />;
      case 'about':
        return <About />;
      case 'sketches':
        return <Sketches />;
      case 'contact':
        return <Contact />;
      default:
        return <Home 
          onProjectClick={(id) => setSelectedProject(id)} 
        />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={routeKey}
            className="absolute inset-0"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Tab Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-neutral-900/95 backdrop-blur-xl rounded-lg px-1 py-1 shadow-[0_14px_40px_-8px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
          <div className="flex items-center gap-0.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id && !selectedProject;

              if (tab.id === 'contact') {
                return (
                  <a
                    key={tab.id}
                    href="mailto:noam.toren12@gmail.com"
                    className="relative flex items-center justify-center py-3 px-4 rounded-md bg-neutral-700/40 border border-neutral-500/60 text-neutral-300 transition-colors duration-300 hover:bg-white hover:text-neutral-900 hover:border-white"
                  >
                    <span className="text-[13px] whitespace-nowrap">
                      {tab.label}
                    </span>
                  </a>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedProject(null);
                    setActiveTab(tab.id);
                  }}
                  className={`relative flex items-center justify-center py-3 px-4 rounded-md transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="text-[13px] whitespace-nowrap">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
