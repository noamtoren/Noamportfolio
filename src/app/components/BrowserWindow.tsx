interface BrowserWindowProps {
  children: React.ReactNode;
  className?: string;
}

export function BrowserWindow({ children, className = '' }: BrowserWindowProps) {
  return (
    <div className={`bg-neutral-100 rounded-xl shadow-2xl overflow-hidden ${className}`}>
      {/* Integrated Browser Chrome Header with Traffic Lights */}
      <div className="bg-neutral-100 border-b border-neutral-200 px-4 py-3.5 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      {/* Content Area - No overlap, no padding */}
      <div className="bg-white overflow-hidden">
        {children}
      </div>
    </div>
  );
}