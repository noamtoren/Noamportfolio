import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import heroImage from '../../assets/57b61d37a32011c4d800094d142fc794b97687b4.png';
import buyingGroupState1 from '../../assets/460e25cd141ca9b471384ce97a83560a20d2ad76.png';
import buyingGroupState2 from '../../assets/9f500214e40b40199b69860288a6b22b6789eee3.png';
import buyingGroupState3 from '../../assets/18f2f4ae2ba02118fc5c433b02c9f15052f2419b.png';
import searchEmptyState from '../../assets/8c284cec1d04817bb63383fd5c14a8807268d70f.png';
import searchResultsState from '../../assets/336f0a82eac66094ade8528c0e3c91ee117d61cf.png';
import fileAnalysis1 from '../../assets/46fcd16704d676e2383ea0f1866aca541c44edc3.png';
import fileAnalysis2 from '../../assets/48533b611e84bb2db1d4446e96e32e39a9f9253a.png';

interface SupplyNetCaseProps {
  onBack: () => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs md:text-sm text-neutral-400 tracking-wide mb-6">
      {children}
    </p>
  );
}

function Pillar({
  label,
  heading,
  body,
  children,
}: {
  label: string;
  heading: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <h3 className="text-2xl md:text-[28px] font-semibold tracking-tight text-neutral-900 mb-4 leading-[1.2]">
        {heading}
      </h3>
      <p className="text-base md:text-[17px] leading-[1.7] text-neutral-700 max-w-2xl mb-10">
        {body}
      </p>
      {children}
    </div>
  );
}

function ImageFrame({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-[#F2F0EC] p-6 md:p-10 flex items-center justify-center ${className}`}>
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-auto object-contain rounded-md"
      />
    </div>
  );
}

export function SupplyNetCase({ onBack }: SupplyNetCaseProps) {
  return (
    <div className="absolute inset-0 overflow-auto bg-white">
      {/* Editorial framed container */}
      <div className="max-w-5xl mx-auto border-x border-neutral-100">
        {/* Top bar */}
        <div className="px-6 md:px-16 pt-8 md:pt-12">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-1.5 text-xs md:text-[13px] text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to home</span>
          </button>
        </div>

        {/* Hero block */}
        <div className="px-6 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16">
          <h1 className="text-5xl md:text-[64px] font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-5">
            Supply Net
          </h1>
          <p className="text-base md:text-[17px] text-neutral-500">
            <span>Case Study</span>
            <span className="mx-2 text-neutral-300">|</span>
            <span>2025</span>
          </p>
        </div>

        <div className="mx-6 md:mx-16 border-t border-neutral-200" />

        {/* Overview */}
        <section className="px-6 md:px-16 py-16 md:py-20">
          <SectionLabel>Overview</SectionLabel>
          <div className="space-y-5 text-base md:text-[17px] leading-[1.7] text-neutral-700 max-w-2xl">
            <p>
              Supply Net is a strategic B2B marketplace bridging the gap between developers and suppliers in construction. We designed a transparent ecosystem where developers maximize buying power through collaboration, and suppliers gain equal access to new business opportunities.
            </p>
            <p>
              My role spanned UX/UI design and product strategy — shaping the core flows, visual system, and the collaborative buying mechanics that sit at the heart of the product.
            </p>
          </div>
        </section>

        <div className="mx-6 md:mx-16 border-t border-neutral-200" />

        {/* Hero image */}
        <section className="px-6 md:px-16 py-16 md:py-20">
          <ImageFrame src={heroImage} alt="Supply Net Hero" />
        </section>

        <div className="mx-6 md:mx-16 border-t border-neutral-200" />

        {/* The Challenge */}
        <section className="px-6 md:px-16 py-16 md:py-20">
          <SectionLabel>The Challenge</SectionLabel>
          <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-neutral-900 leading-[1.15] mb-6 max-w-2xl">
            Dismantling procurement monopolies.
          </h2>
          <p className="text-base md:text-[17px] leading-[1.7] text-neutral-700 max-w-2xl">
            In the construction industry, access to suppliers is often restricted by non-transparent pricing. Supply Net empowers developers with corporate-level leverage by digitizing the management of materials, timelines, and the collective demand that historically lived in spreadsheets.
          </p>
        </section>

        <div className="mx-6 md:mx-16 border-t border-neutral-200" />

        {/* UX Strategy */}
        <section className="px-6 md:px-16 py-16 md:py-20">
          <SectionLabel>UX Strategy</SectionLabel>
          <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-neutral-900 leading-[1.15] mb-16 max-w-2xl">
            Three pillars that make the product work.
          </h2>

          <div className="space-y-24 md:space-y-28">
            {/* Pillar 1 */}
            <Pillar
              label="Pillar 01 — Search"
              heading="Availability-first search engine."
              body="An advanced module that filters by quantities and delivery dates, providing real-time price comparison and joint-purchase proposals — so buyers find leverage, not just listings."
            >
              <div className="space-y-6">
                <ImageFrame src={searchEmptyState} alt="Search — empty state" />
                <ImageFrame src={searchResultsState} alt="Search — results" />
              </div>
            </Pillar>

            {/* Pillar 2 */}
            <Pillar
              label="Pillar 02 — Buying Groups"
              heading="Collective power through connectivity."
              body="Developers can initiate or join buying groups to secure bulk pricing and network with other industry professionals. The flow surfaces live groups relevant to the buyer's current material list."
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ImageFrame src={buyingGroupState1} alt="Buying groups — search" />
                <ImageFrame src={buyingGroupState2} alt="Buying groups — results" />
                <ImageFrame src={buyingGroupState3} alt="Buying groups — details" />
              </div>
            </Pillar>

            {/* Pillar 3 */}
            <Pillar
              label="Pillar 03 — Automation"
              heading="Automated material lifecycle."
              body="Static BOQ files become dynamic management tools with automated categorization and smart order reminders — turning a spreadsheet chore into a decision-making surface."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageFrame src={fileAnalysis1} alt="File analysis — project setup" />
                <ImageFrame src={fileAnalysis2} alt="File analysis — data entry" />
              </div>
            </Pillar>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
