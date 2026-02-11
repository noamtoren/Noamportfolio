export function Footer() {
  return (
    <footer className="py-12 px-6">
      {/* Subtle Divider Line */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="h-px bg-neutral-200" />
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
          <p>Designed with intention</p>
          <p>© 2026 Noam Toren. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}