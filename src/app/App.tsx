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
    <div className="h-screen flex flex-col bg-white">
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>

      {/* Floating Bottom Tab Navigation */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-neutral-900/90 backdrop-blur-xl rounded-lg px-1 py-1">
          <div className="flex items-center gap-0.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id && !selectedProject;

              if (tab.id === 'contact') {
                return (
                  <a
                    key={tab.id}
                    href="mailto:noam.toren12@gmail.com"
                    className="relative flex items-center justify-center py-2 px-5 rounded-md overflow-hidden text-neutral-300 transition-colors duration-300 hover:text-white group/cm"
                  >
                    <span className="absolute inset-0 bg-white/10 origin-left scale-x-0 transition-transform duration-[450ms] ease-out group-hover/cm:scale-x-100" />
                    <span className="relative text-[13px] whitespace-nowrap">
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
                  className={`relative flex items-center justify-center py-2 px-5 rounded-md transition-colors duration-300 ${
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
