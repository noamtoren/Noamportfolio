export function Work() {
  const projects = [
    { id: 1, title: "Mobile Banking App", year: "2025", description: "Redesigning the user experience for seamless transactions and account management" },
    { id: 2, title: "Health Tracking Platform", year: "2025", description: "Helping users understand their wellness journey through intuitive data visualization" },
    { id: 3, title: "E-commerce Checkout", year: "2024", description: "Reducing friction in the purchase flow with progressive disclosure" },
    { id: 4, title: "Task Management System", year: "2024", description: "Building clarity in complex workflows for distributed teams" },
    { id: 5, title: "Travel Planning App", year: "2024", description: "Simplifying trip organization with collaborative features" },
    { id: 6, title: "Learning Management Platform", year: "2023", description: "Creating engaging educational experiences for remote learners" },
    { id: 7, title: "Dashboard Redesign", year: "2023", description: "Transforming data overload into actionable insights" },
  ];

  return (
    <div className="flex-1 overflow-auto pb-24 px-6 pt-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-2">Work</h1>
        <p className="text-neutral-500 mb-12">
          A collection of projects exploring different design challenges
        </p>

        {/* Project List */}
        <div className="space-y-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="border border-neutral-300 bg-white hover:border-neutral-400 transition-colors cursor-pointer group"
            >
              {/* Placeholder Image */}
              <div className="aspect-[16/9] bg-neutral-200 border-b border-neutral-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-300 opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl">{project.title}</h3>
                  <span className="text-sm text-neutral-500 whitespace-nowrap">{project.year}</span>
                </div>
                <p className="text-neutral-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
