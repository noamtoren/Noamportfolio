type Project = {
  id: string;
  title: string;
  category: string;
};

const PROJECTS: Project[] = [
  { id: 'academic', title: 'Deep Breath', category: 'Smoking Cessation Platform' },
  { id: 'bella', title: 'Bella', category: 'Maternal E-Commerce' },
  { id: 'machon-chibur', title: 'Machon Chibur', category: 'Therapeutic Web Platform' },
  { id: 'supply-net', title: 'Supply Net', category: 'B2B AI Procurement' },
];

interface NavLinkProps {
  direction: 'prev' | 'next';
  project: Project;
  onClick: () => void;
  align: 'left' | 'right';
}

function NavLink({ direction, project, onClick, align }: NavLinkProps) {
  const label = direction === 'prev' ? 'Previous Project' : 'Next Project';
  const arrow = direction === 'prev' ? '←' : '→';
  const arrowTranslate =
    direction === 'prev'
      ? 'group-hover:-translate-x-1'
      : 'group-hover:translate-x-1';

  return (
    <button
      onClick={onClick}
      className={`group ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      <p className="text-[13px] font-normal text-[rgba(19,19,19,0.44)] mb-3">
        {label}
      </p>
      <h3 className="text-[28px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.2]">
        {direction === 'prev' && (
          <span
            className={`inline-block mr-2 transition-transform duration-300 ease-out ${arrowTranslate}`}
          >
            {arrow}
          </span>
        )}
        {project.title}
        {direction === 'next' && (
          <span
            className={`inline-block ml-2 transition-transform duration-300 ease-out ${arrowTranslate}`}
          >
            {arrow}
          </span>
        )}
      </h3>
      <p className="text-[14px] font-normal text-[rgba(19,19,19,0.44)] mt-2">
        {project.category}
      </p>
    </button>
  );
}

interface CaseNavFooterProps {
  currentId: string;
  onSelectProject?: (id: string) => void;
}

export function CaseNavFooter({ currentId, onSelectProject }: CaseNavFooterProps) {
  if (!onSelectProject) return null;

  const idx = PROJECTS.findIndex((p) => p.id === currentId);
  if (idx === -1) return null;

  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  if (!prev && !next) return null;

  const isBoth = Boolean(prev && next);

  return (
    <section className="px-6 md:px-12 py-10 md:py-14">
      <div
        className={`flex gap-6 ${
          isBoth ? 'justify-between' : 'justify-center'
        }`}
      >
        {prev && (
          <NavLink
            direction="prev"
            project={prev}
            onClick={() => onSelectProject(prev.id)}
            align="left"
          />
        )}
        {next && (
          <NavLink
            direction="next"
            project={next}
            onClick={() => onSelectProject(next.id)}
            align="right"
          />
        )}
      </div>
    </section>
  );
}
