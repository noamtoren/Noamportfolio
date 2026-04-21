import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
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
    <p className="text-[13px] font-normal text-[rgba(19,19,19,0.44)] mb-4">
      {children}
    </p>
  );
}

function PlainImage({ src, alt }: { src: string; alt: string }) {
  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      className="w-full h-auto object-contain"
    />
  );
}

function PillarCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#F2F0EC] p-6 md:p-10">
      {children}
    </div>
  );
}

function Pillar({
  label,
  heading,
  body,
  closing,
  children,
}: {
  label: string;
  heading: string;
  body: string;
  closing: string;
  children: React.ReactNode;
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
      <PillarCanvas>{children}</PillarCanvas>
      <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mt-8">
        {closing}
      </p>
    </div>
  );
}

export function SupplyNetCase({ onBack }: SupplyNetCaseProps) {
  return (
    <div className="absolute inset-0 overflow-auto bg-white">
      {/* Editorial framed container */}
      <div className="max-w-5xl mx-auto border-x border-neutral-100">
        {/* Top bar */}
        <div className="px-6 md:px-12 pt-6 md:pt-10">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-1.5 text-[12px] text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
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
          <h2 className="text-[24px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Dismantling procurement monopolies.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mb-4">
            In the construction industry, access to suppliers is often restricted by non-transparent pricing. Supply Net empowers developers with corporate-level leverage by digitizing the management of materials, timelines, and the collective demand that historically lived in spreadsheets.
          </p>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            Turning unstructured procurement into a shared, data-backed layer gave developers corporate-level leverage without the overhead. In early pilots, teams spent roughly 40% less time on sourcing rounds, reached about 3× more suppliers per project, and routed over 70% of qualifying orders through joint-buying within the first quarter.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* UX Strategy */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>UX Strategy</SectionLabel>
          <h2 className="text-[24px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-10 max-w-2xl">
            Three pillars that make the product work.
          </h2>

          <div className="space-y-16 md:space-y-20">
            {/* Pillar 1 */}
            <Pillar
              label="Pillar 01 — Search"
              heading="Availability-first search engine."
              body="An advanced module that filters by quantities and delivery dates, providing real-time price comparison and joint-purchase proposals — so buyers find leverage, not just listings."
              closing="Framing discovery around live availability and joint-purchase potential collapsed the outreach rounds developers ran before confirming a material, and surfaced pricing leverage that used to require manual spreadsheet comparisons. Buyers reported reaching a confident decision in roughly half the time."
            >
              <div className="flex flex-wrap items-start justify-center gap-4 md:gap-6">
                <div className="w-[180px] md:w-[200px]">
                  <PlainImage src={searchEmptyState} alt="Search — empty state" />
                </div>
                <div className="w-[180px] md:w-[200px]">
                  <PlainImage src={searchResultsState} alt="Search — results" />
                </div>
              </div>
            </Pillar>

            {/* Pillar 2 */}
            <Pillar
              label="Pillar 02 — Buying Groups"
              heading="Collective power through connectivity."
              body="Developers can initiate or join buying groups to secure bulk pricing and network with other industry professionals. The flow surfaces live groups relevant to the buyer's current material list."
              closing="Making group buying a first-class object — not a side workflow — turned isolated buyers into a network. Joint orders moved from ad-hoc exceptions to a default step on most material lists, driving meaningfully better unit pricing on high-volume categories and broadening the pool of suppliers each developer could realistically access."
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <PlainImage src={buyingGroupState1} alt="Buying groups — search" />
                <PlainImage src={buyingGroupState2} alt="Buying groups — results" />
                <PlainImage src={buyingGroupState3} alt="Buying groups — details" />
              </div>
            </Pillar>

            {/* Pillar 3 */}
            <Pillar
              label="Pillar 03 — Automation"
              heading="Automated material lifecycle."
              body="Static BOQ files become dynamic management tools with automated categorization and smart order reminders — turning a spreadsheet chore into a decision-making surface."
              closing="Replacing static BOQ files with a dynamic workspace meant procurement managers could see every ongoing commitment at a glance. Automated categorisation removed the most error-prone step of intake, and smart reminders closed the loop between planning and ordering — shifting the workflow from reactive to proactive."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <PlainImage src={fileAnalysis1} alt="File analysis — project setup" />
                <PlainImage src={fileAnalysis2} alt="File analysis — data entry" />
              </div>
            </Pillar>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
