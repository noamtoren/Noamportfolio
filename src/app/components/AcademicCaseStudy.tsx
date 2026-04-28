import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { CaseNavFooter } from '@/app/components/CaseNavFooter';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import entryScenariosImage from '../../assets/8f3d0f7f00dfebcc8a19cae89b91bdfa32bafbeb.png';
import expertGridImage from '../../assets/5aa8c2c4647d1233c789d8f38d54bd734f24d03c.png';
import expertPlayerImage from '../../assets/c6e46aec833b43f6d4425d7cc6a04b6fe9310a8d.png';
import dashboardImage from '../../assets/5f857b4e1c1e4a7d4218a376633531836947dcd7.png';
import adaptiveToolboxImage from '../../assets/9b1f392b4896bf7fb9cf2624c06d952a48814049.png';

interface AcademicCaseStudyProps {
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

const PILLAR_IMAGE_WIDTHS: Record<number, number> = {
  1: 340,
  2: 340,
  3: 220,
  4: 160,
};

function PillarImages({ images }: { images: PillarImage[] }) {
  const width = PILLAR_IMAGE_WIDTHS[images.length] ?? 200;
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {images.map((img, i) => (
        <div key={i} className="text-left" style={{ width: `${width}px` }}>
          <p className="text-[11px] leading-[1.2] text-[#1E1E1E] mb-1.5 ml-2">
            {img.label}
          </p>
          <ImageWithFallback src={img.src} alt={img.alt} className="block w-full h-auto" />
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

export function AcademicCaseStudy({ onBack, onSelectProject }: AcademicCaseStudyProps) {
  return (
    <div className="absolute inset-0 overflow-auto bg-white">
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
            Deep Breath
          </h1>
          <p className="text-[18px] font-normal text-[rgba(19,19,19,0.44)]">
            <span>Case Study</span>
            <span className="mx-2 text-[rgba(19,19,19,0.24)]">|</span>
            <span>2026</span>
          </p>
        </div>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Overview */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Overview</SectionLabel>
          <div className="space-y-4 text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            <p>
              Deep Breath is a trust-based smoking-cessation web platform. It treats quitting as a long, non-linear journey rather than a streak to defend — recognising relapse as part of the process and meeting the user where they actually are: in a craving, in a routine, or in a calm planning moment.
            </p>
            <p>
              My role spanned UX research, information architecture, interaction design, and full visual system — from the qualitative smoker research through the four entry surfaces, the expert-led video curriculum, and the adaptive recommendation logic.
            </p>
            <p className="text-[rgba(19,19,19,0.6)]">
              Scope note: academic capstone project at Reichman University, designed end-to-end in Figma. Quantitative figures are study projections, not measured production results.
            </p>
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* The Challenge */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>The Challenge</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Resilience beyond the screen.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            A website is not the ideal tool for smoking cessation — face-to-face support, clinical follow-up, and group therapy all outperform a screen. The brief was to design a digital anchor that earns its place anyway: present in the high-craving moments when no clinic is open, structured enough to support a 12-week behaviour change, and trustworthy enough that the user does not abandon after the first slip.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* Approach */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>Approach</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            Build the system around the smoker, not the cigarette.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mb-8">
            Three rounds of research framed every product decision that follows. We profiled three smoker archetypes — heavy, moderate, and social — each with a distinct emotional fingerprint. We mapped the four contextual triggers that actually start a cigarette (location, time, emotion, social pressure). And we surfaced the psychological barriers that cause abandonment after a relapse: loss of self-trust, paralysing guilt, and high cognitive load. The system's four pillars are direct answers to those findings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-2">PROFILES</p>
              <h4 className="text-[14px] font-semibold text-[#131313] mb-1.5">Three smoker types</h4>
              <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)]">
                Heavy (constant trigger response), Moderate (ritual-bound — coffee, driving), and Social (gradual loss of control).
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-2">TRIGGERS</p>
              <h4 className="text-[14px] font-semibold text-[#131313] mb-1.5">Four contextual axes</h4>
              <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)]">
                Location, time, emotion, social. A craving at work is a different problem than a craving alone at night — each needs its own response.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="text-[11px] font-medium text-[rgba(19,19,19,0.5)] tracking-[1.4px] mb-2">BARRIERS</p>
              <h4 className="text-[14px] font-semibold text-[#131313] mb-1.5">What causes drop-off</h4>
              <p className="text-[13px] leading-[1.6] text-[rgba(19,19,19,0.7)]">
                Lost self-trust from past failed attempts, post-slip guilt, and the cognitive collapse during peak craving that blocks rational choice.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* UX Strategy */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>UX Strategy</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-10 max-w-2xl">
            Four pillars that turn the research into a working product.
          </h2>

          <div className="space-y-16 md:space-y-20">
            {/* Pillar 1 — Entry Scenarios */}
            <Pillar
              label="Pillar 01 — Entry Scenarios"
              heading="Three doorways sized to the user's current state."
              body="The home surface forks into three paths the moment the user lands: High Urgency (one-tap micro-CTAs — expert clip, distraction game, active to-do — for peak craving with low cognitive capacity), Routine & Management (deep links to Daily Questionnaire, Dashboard, Patterns & Insights, Saved Tools for calm moments), and Tracking & Personalisation (the daily check-in that feeds every other pillar). The system never punishes a relapse — it logs it as data and keeps the surfaces open."
              images={[
                { src: entryScenariosImage, alt: 'Home — three entry pathways', label: 'Home — Three Entry Pathways' },
              ]}
            />

            {/* Pillar 2 — Expert Authority */}
            <Pillar
              label="Pillar 02 — Expert Authority"
              heading="A human voice inside the digital product."
              body="An eight-episode video curriculum led by Dr. Eli Katz sits at the heart of the platform. The episodes are sequenced as a progression — from understanding why the body resists, to handling specific trigger types, to long-term identity change. The grid surfaces curriculum and progress; the player keeps the user in flow with a clean, distraction-free viewing surface and a per-episode summary."
              images={[
                { src: expertGridImage, alt: 'Expert curriculum — episode grid', label: 'Curriculum — Episode Grid' },
                { src: expertPlayerImage, alt: 'Expert curriculum — video player', label: 'Curriculum — Video Player' },
              ]}
            />

            {/* Pillar 3 — Dashboard */}
            <Pillar
              label="Pillar 03 — Dashboard for Self-Efficacy"
              heading="Small wins over streak counting."
              body="The dashboard is built to survive a slip. Instead of a binary streak that resets to zero on relapse, it surfaces long-range trend lines, money saved, situation-by-situation analysis, and a chronological history that frames a slip as a logged event, not a reset. The header always reads as a partner (“היי נועם”), not a judge."
              images={[
                { src: dashboardImage, alt: 'Dashboard — full overview', label: 'Dashboard — Full Overview' },
              ]}
            />

            {/* Pillar 4 — Adaptive Toolbox */}
            <Pillar
              label="Pillar 04 — Adaptive Toolbox & AI Recommendations"
              heading="Tools that reshuffle around the user's mood."
              body="The toolbox is organised by emotional state, not by feature type: Just for You, Tools You've Saved, Urge Moments, After a Cigarette. A hybrid recommender combines explicit user preferences (saved tools, ratings) with implicit behavioural signals (which tool was opened in which mood, which one was abandoned), so the right surface comes to the front automatically when the user opens the app in a peak craving."
              images={[
                { src: adaptiveToolboxImage, alt: 'Adaptive toolbox — mood-based grid', label: 'Toolbox — Mood-based Grid' },
              ]}
            />
          </div>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        {/* The Outcome */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <SectionLabel>The Outcome</SectionLabel>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#131313] leading-[1.3] mb-4 max-w-2xl">
            A research-backed platform, end-to-end in Figma.
          </h2>
          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl">
            Together, the four pillars convert qualitative smoker research into a working surface — three entry pathways, an eight-episode expert curriculum, a self-efficacy dashboard, and an adaptive toolkit — all governed by the same principle: keep the user in the system after a slip.
          </p>

          <p className="text-[14px] font-normal leading-[1.6] tracking-[-0.2px] text-[#131313] max-w-2xl mt-6">
            What emerged is a platform that meets a quitter at the moment of doubt rather than after it. Three entry pathways are tuned to cognitive load &mdash; one-tap urgency, structured weekly support, or deeper planning &mdash; so a user can show up at any energy level and still find a way in. An eight-episode curriculum sequences the change as a calm arc; a self-efficacy dashboard reframes a slip as data, not failure; and an adaptive toolkit responds to the user&rsquo;s emotional state on that day. The outcome is a softer, paced surface for one of the hardest decisions a person makes &mdash; built to hold the user through the moment they want to give up, instead of letting them quit the app first.
          </p>

          <p className="text-[11px] text-[rgba(19,19,19,0.4)] mt-6 leading-[1.5]">
            Outcome reflects academic research scope and the design system shipped in Figma, not measured production results.
          </p>
        </section>

        <div className="mx-6 md:mx-12 border-t border-neutral-200" />

        <CaseNavFooter currentId="academic" onSelectProject={onSelectProject} />
      </div>

      <Footer />
    </div>
  );
}
