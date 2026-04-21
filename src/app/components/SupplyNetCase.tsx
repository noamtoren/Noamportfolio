import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { CaseNavFooter } from '@/app/components/CaseNavFooter';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import buyingGroupState1 from '../../assets/supplynet-buying-discover.png';
import buyingGroupState2 from '../../assets/supplynet-buying-matching.png';
import buyingGroupState3 from '../../assets/supplynet-buying-join.png';
import searchEmptyState from '../../assets/supplynet-search-empty.png';
import searchResultsState from '../../assets/supplynet-search-results.png';
import fileAnalysis1 from '../../assets/supplynet-fileanalysis-setup.png';
import fileAnalysis2 from '../../assets/supplynet-fileanalysis-data.png';

interface SupplyNetCaseProps {
  onBack: () => void;
  onSelectProject?: (id: string) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-normal text-[rgba(19,19,19,0.44)] mb-4">
      {children}
    </p>
  );
}

function PillarCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#ECEEF0] p-6 md:p-8 min-h-[300px] md:min-h-[360px] flex items-center justify-center">
      {children}
    </div>
  );
}

type PillarImage = { src: string; alt: string; label: string };

// Design-system rule: the more images in a row, the smaller each one is.
const PILLAR_IMAGE_WIDTHS: Record<number, number> = {
  1: 440,
  2: 340,
  3: 220,
  4: 160,
};

function PillarImages({ images }: { images: PillarImage[] }) {
  const width = PILLAR_IMAGE_WIDTHS[images.length] ?? 200;
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {images.map((img, i) => (
        <div key={i} style={{ width: `${width}px` }}>
          <p className="text-[11px] mb-1.5 leading-none text-[#1E1E1E]">
            {img.label}
          </p>
          <ImageWithFallback
            src={img.src}
            alt={img.alt}
            className="block w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}

function Pillar({
  label,
  heading,
  body,
  images,
}: {
  label: string;
  heading: string;
  body: string;
  images: PillarImage[];
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <h3 className="text-[20px] font-semibold tracking-[-0.5px] text-[#131313] mb-3 leading-[1.3]">
        {heading}
      </h3>
      <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mb-8">
        {body}
      </p>
      <PillarCanvas>
        <PillarImages images={images} />
      </PillarCanvas>
    </div>
  );
}

export function SupplyNetCase({ onBack, onSelectProject }: SupplyNetCaseProps) {
  return (
    <div className="absolute inset-0 overflow-auto bg-white">
      {/* Editorial framed container */}
      <div className="max-w-5xl mx-auto border-x border-neutral-100">
        {/* Top bar */}
        <div className="px-6 md:px-12 pt-6 md:pt-10">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-md bg-[#ECEEF0] hover:bg-neutral-200 px-4 py-2 text-[13px] text-[#131313] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to home</span>
          </button>
        </div>

        {/* Hero block */}
        <div className="px-6 md:px-12 pt-10 md:pt-14 pb-8 md:pb-10">
          <h1 className="text-[36px] font-semibold leading-[1.5] tracking-[-1.5px] text-[#131313] mb-2">
            Supply Net
          </h1>
          <p className="text-[18px] font-normal text-[rgba(19,19,19,0.44)]">
            <span>Case Study</span>
            <span className="mx-2 text-[rgba(19,19,19,0.24)]">|</span>
            <span>2025</span>
          </p>
        </div>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Overview */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Overview</SectionLabel>
          <div className="space-y-4 text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            <p>
              Supply Net is a strategic B2B marketplace bridging the gap between developers and suppliers in construction. We designed a transparent ecosystem where developers maximize buying power through collaboration, and suppliers gain equal access to new business opportunities.
            </p>
            <p>
              My role spanned UX/UI design and product strategy — shaping the core flows, visual system, and the collaborative buying mechanics that sit at the heart of the product.
            </p>
            <p className="text-[rgba(19,19,19,0.6)]">
              Scope note: this engagement covered the developer (contractor) side of the marketplace only. The supplier-facing experience was not designed as part of this project.
            </p>
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* The Challenge */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>The Challenge</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Dismantling procurement monopolies.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            In the construction industry, access to suppliers is often restricted by non-transparent pricing. Supply Net empowers developers with corporate-level leverage by digitizing the management of materials, timelines, and the collective demand that historically lived in spreadsheets.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Approach */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Approach</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Grounding the product in buyer reality.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            We spoke with procurement managers and site developers to map the end-to-end sourcing journey — from BOQ file to final order confirmation. The insight that reframed the work: isolation, not pricing, was the real bottleneck. Individual developers were negotiating one-on-one when, collectively, they already had the volume of a corporate buyer. That moved Supply Net from "a better marketplace" to "a network of demand" — and set the brief for the three pillars that follow.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* UX Strategy */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>UX Strategy</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-10 max-w-2xl">
            Three pillars that make the product work.
          </h2>

          <div className="space-y-16 md:space-y-20">
            {/* Pillar 1 */}
            <Pillar
              label="Pillar 01 — Search"
              heading="Availability-first search engine."
              body="An advanced module that filters by quantities and delivery dates, providing real-time price comparison and joint-purchase proposals — so buyers find leverage, not just listings."
              images={[
                { src: searchEmptyState, alt: 'Search — empty state', label: 'Search — Empty State' },
                { src: searchResultsState, alt: 'Search — results', label: 'Search — Results View' },
              ]}
            />

            {/* Pillar 2 */}
            <Pillar
              label="Pillar 02 — Buying Groups"
              heading="Collective power through connectivity."
              body="Developers can initiate or join buying groups to secure bulk pricing and network with other industry professionals. The flow surfaces live groups relevant to the buyer's current material list."
              images={[
                { src: buyingGroupState1, alt: 'Buying groups — search', label: 'Buying Group — Discover' },
                { src: buyingGroupState2, alt: 'Buying groups — results', label: 'Buying Group — Matching Groups' },
                { src: buyingGroupState3, alt: 'Buying groups — details', label: 'Buying Group — Join Flow' },
              ]}
            />

            {/* Pillar 3 */}
            <Pillar
              label="Pillar 03 — Automation"
              heading="Automated material lifecycle."
              body="Static BOQ files become dynamic management tools with automated categorization and smart order reminders — turning a spreadsheet chore into a decision-making surface."
              images={[
                { src: fileAnalysis1, alt: 'File analysis — project setup', label: 'File Analysis — Project Setup' },
                { src: fileAnalysis2, alt: 'File analysis — data entry', label: 'File Analysis — Data Entry' },
              ]}
            />
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* The Outcome */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>The Outcome</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Solving the challenge.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            Together, the three pillars replaced fragmented, opaque sourcing with a shared, data-backed layer — letting developers find qualified suppliers faster, pool demand to unlock bulk pricing, and track live material commitments in one workspace.
          </p>

          <div className="mt-10 md:grid md:grid-cols-3">
            <div className="py-6 border-b md:py-0 md:pr-8 md:border-b-0 md:border-r border-neutral-200">
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">~40%</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">Less time spent on sourcing rounds</p>
            </div>
            <div className="py-6 border-b md:py-0 md:px-8 md:border-b-0 md:border-r border-neutral-200">
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">~3×</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">More competitive suppliers reached per project</p>
            </div>
            <div className="py-6 md:py-0 md:pl-8">
              <p className="text-[48px] font-semibold tracking-[-1.5px] leading-none text-[#131313]">70%+</p>
              <p className="text-[13px] text-[rgba(19,19,19,0.6)] mt-3 leading-[1.5]">Of high-volume orders routed through joint-buying</p>
            </div>
          </div>

          <p className="text-[11px] text-[rgba(19,19,19,0.4)] mt-4 leading-[1.5]">
            Figures are estimated projections based on research assumptions, not measured results.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        <CaseNavFooter currentId="supply-net" onSelectProject={onSelectProject} />
      </div>

      <Footer />
    </div>
  );
}
