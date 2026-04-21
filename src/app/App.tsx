import { useState } from 'react';
import { SupplyNetCase } from '@/app/components/SupplyNetCase';
import { BellaCaseStudy } from '@/app/components/BellaCaseStudy';
import { MachonChiburCaseStudy } from '@/app/components/MachonChiburCaseStudy';
import { AcademicCaseStudy } from '@/app/components/AcademicCaseStudy';
import { Home } from '@/app/components/Home';
import { About } from '@/app/components/About';
import { Sketches } from '@/app/components/Sketches';
import { Contact } from '@/app/components/Contact';

type Tab = 'home' | 'about' | 'sketches' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const tabs = [
    { id: 'home' as Tab, label: 'Home' },
    { id: 'about' as Tab, label: 'About' },
    { id: 'sketches' as Tab, label: 'Sketches' },
    { id: 'contact' as Tab, label: 'Contact' },
  ];

  // Helper to close case study and return to home
  const handleBack = () => {
    setSelectedProject(null);
  };

  const renderContent = () => {
    // If a project is selected, show it (overrides activeTab for now, or acts as a sub-view of home)
    if (selectedProject === 'supply-net') {
      return <SupplyNetCase onBack={handleBack} />;
    }
    if (selectedProject === 'bella') {
      return <BellaCaseStudy onBack={handleBack} />;
    }
    if (selectedProject === 'machon-chibur') {
      return <MachonChiburCaseStudy onBack={handleBack} />;
    }
    if (selectedProject === 'academic') {
      return <AcademicCaseStudy onBack={handleBack} />;
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
    <div className="h-screen flex flex-col bg-[#FBFAF7]">
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>

      {/* Bottom Nav — editorial text links on a soft backdrop */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-6 md:gap-8 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md ring-1 ring-black/5 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id && !selectedProject;

            if (tab.id === 'contact') {
              return (
                <a
                  key={tab.id}
                  href="mailto:noam.toren12@gmail.com"
                  className="text-sm text-neutral-500 hover:text-[#B85C38] transition-colors duration-300"
                >
                  {tab.label}
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
                className={`text-sm transition-colors duration-300 ${
                  isActive
                    ? 'font-display text-[#B85C38]'
                    : 'text-neutral-500 hover:text-[#B85C38]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
