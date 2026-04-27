/*
Design philosophy for this page: Full-screen healthcare AI deep-tech launch page.
Use a wide cinematic desktop layout, strong headline hierarchy, restrained violet-cyan glow,
real medical-image panels, and simpler product storytelling inspired by premium biotech sites.
The page should feel spacious and graphic-led rather than boxed or diagram-heavy.
*/
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Building2,
  Clock3,
  Database,
  FileSearch,
  FileText,
  HeartPulse,
  Microscope,
  ScanLine,
  Sparkles,
  Stethoscope,
  TestTube2,
} from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const heroPanelUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienshealth-converge-hero-panel-NgEPFyQkisPkeSfYwpRwff.webp";
const ctCardUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienshealth-ct-card-ipxNLKoHDU7tS9ahsYy2Ed.webp";
const pathologyCardUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienshealth-pathology-card-NgbQ3LcpAsKsJrL4zoVT5f.webp";
const ehrCardUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienshealth-ehr-monitor-card-i46Nek6t93bDx8BZ8RZRW7.webp";

const modalityCards = [
  {
    title: "CT and imaging",
    description: "CT, X-ray, MRI, ultrasound, and image-derived findings enter the same decision layer.",
    image: ctCardUrl,
    icon: ScanLine,
  },
  {
    title: "Pathology and tissue",
    description: "Digital pathology, histology regions, biomarkers, and morphology cues remain connected to the case context.",
    image: pathologyCardUrl,
    icon: Microscope,
  },
  {
    title: "EHR and live monitoring",
    description: "Labs, vitals, notes, medications, orders, and longitudinal trends are fused with imaging signals.",
    image: ehrCardUrl,
    icon: Database,
  },
];

const inputChips = [
  { label: "CT", icon: ScanLine },
  { label: "Pathology", icon: Microscope },
  { label: "Labs", icon: TestTube2 },
  { label: "Vitals", icon: HeartPulse },
  { label: "Notes", icon: FileText },
  { label: "EHR", icon: Database },
  { label: "Trials", icon: FileSearch },
  { label: "Ops", icon: Building2 },
];

const outputTasks = [
  { title: "OR time estimation", detail: "Case duration, turnover, and downstream schedule impact.", icon: Clock3 },
  { title: "Discharge readiness", detail: "Bed planning and patient-flow prioritization from incomplete signals.", icon: Building2 },
  { title: "ICU escalation", detail: "Faster recognition of patients who need transfer or closer monitoring.", icon: Stethoscope },
  { title: "Trial eligibility", detail: "Pre-screen likely candidates against protocol criteria and site logic.", icon: FileSearch },
  { title: "Patient matching", detail: "Match multimodal profiles to relevant studies, arms, or sponsor programs.", icon: BrainCircuit },
  { title: "Deterioration watch", detail: "Surface risk patterns across imaging, monitoring, and documentation together.", icon: Activity },
];

const solutionCards = [
  {
    eyebrow: "Hospital operations",
    title: "Operational intelligence for busy care environments",
    text: "Use multimodal signals to support OR timing, discharge readiness, escalation workflows, and throughput planning in real hospital settings.",
    icon: Building2,
  },
  {
    eyebrow: "Clinical trial support",
    title: "A cleaner way to screen and match patients",
    text: "Fuse imaging, EHR, pathology, and protocol context to streamline eligibility screening, patient matching, and coordinator review.",
    icon: FileSearch,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(133,102,255,0.18),transparent_20%),radial-gradient(circle_at_88%_14%,rgba(64,212,255,0.1),transparent_18%),linear-gradient(180deg,#06050d_0%,#0a0915_45%,#07060e_100%)]" />
        <div className="absolute left-[-10rem] top-[14rem] h-[28rem] w-[28rem] rounded-full bg-[#6f57ff]/10 blur-3xl" />
        <div className="absolute bottom-[8rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-cyan-400/8 blur-3xl" />
      </div>

      <header className="relative z-30 px-4 pb-6 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
              <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-[0.24em] text-white/94">SAPIENS HEALTH</div>
              <div className="truncate text-xs text-white/48">Multimodal clinical intelligence</div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8 text-sm text-white/74">
              <a href="#about" className="transition hover:text-white">About</a>
              <a href="#research" className="transition hover:text-white">Research</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
            </nav>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/18 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/6"
            >
              Get in touch
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-[1520px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,11,23,0.92),rgba(9,8,18,0.98))] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_60px_160px_rgba(0,0,0,0.52)]">
          <div className="border-b border-white/8 px-5 py-6 sm:px-8 lg:px-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8f7dff]/25 bg-[linear-gradient(180deg,rgba(126,92,255,0.18),rgba(80,48,160,0.10))] px-5 py-2 text-sm text-[#e9deff] shadow-[0_8px_30px_rgba(120,80,255,0.18)]">
              <span className="font-medium">Launching MEDMIX I: Best multimodal AI engine in digital health</span>
              <Chevron />
            </div>
          </div>

          <div className="grid gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-16 xl:gap-14">
            <div className="flex max-w-[48rem] flex-col justify-between">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/56">
                  <Sparkles className="h-3.5 w-3.5 text-[#cab7ff]" />
                  Healthcare AI deep tech
                </div>
                <h1 className="max-w-[11ch] font-[Space_Grotesk] text-[3.35rem] font-bold leading-[0.93] tracking-[-0.08em] text-white sm:text-[4.5rem] lg:text-[5.4rem] xl:text-[6.25rem]">
                  Intelligence layer for incomplete clinical data.
                </h1>
              </div>

              <div className="mt-8 max-w-[34rem]">
                <p className="text-lg leading-8 text-white/72 sm:text-xl">
                  Sapiens Health builds the AI engine that fuses imaging, EHR, and clinical data —
                  even when some are missing.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#about"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-6 py-4 text-base font-semibold text-[#080612] shadow-[0_22px_50px_rgba(145,118,255,0.34)] transition duration-300 hover:-translate-y-0.5"
                  >
                    About Technology
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/[0.04] px-6 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]"
                  >
                    Get In Touch
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative min-h-[28rem] lg:min-h-[34rem]">
              <div className="hero-stage absolute inset-0 rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_50%_18%,rgba(136,108,255,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]" />
              <div className="absolute inset-[8%_4%_6%_4%] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0c0b16] shadow-[0_50px_90px_rgba(0,0,0,0.35)]">
                <img src={heroPanelUrl} alt="Sapiens Health multimodal fusion visual" className="h-full w-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(181,159,255,0.18),transparent_20%),linear-gradient(180deg,rgba(5,5,12,0.06),rgba(5,5,12,0.24))]" />
              </div>

              <div className="floating-card floating-card-a absolute left-[4%] top-[6%] w-[11rem] rounded-[1.6rem] border border-white/12 bg-[#11101c]/90 p-3 shadow-[0_30px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:w-[13rem]">
                <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/46">
                  <ScanLine className="h-3.5 w-3.5 text-[#bfa4ff]" />
                  Imaging
                </div>
                <img src={ctCardUrl} alt="CT imaging input" className="h-32 w-full rounded-[1.2rem] object-cover sm:h-36" />
              </div>

              <div className="floating-card floating-card-b absolute right-[2%] top-[10%] w-[11rem] rounded-[1.6rem] border border-white/12 bg-[#11101c]/90 p-3 shadow-[0_30px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:w-[13rem]">
                <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/46">
                  <Microscope className="h-3.5 w-3.5 text-cyan-300" />
                  Pathology
                </div>
                <img src={pathologyCardUrl} alt="Pathology input" className="h-32 w-full rounded-[1.2rem] object-cover sm:h-36" />
              </div>

              <div className="floating-card floating-card-c absolute bottom-[5%] right-[10%] w-[12rem] rounded-[1.6rem] border border-white/12 bg-[#11101c]/92 p-3 shadow-[0_30px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:w-[14rem]">
                <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/46">
                  <Database className="h-3.5 w-3.5 text-[#bfa4ff]" />
                  Clinical data
                </div>
                <img src={ehrCardUrl} alt="EHR and monitoring input" className="h-36 w-full rounded-[1.2rem] object-cover sm:h-40" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto mt-8 grid w-full max-w-[1520px] gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">About</div>
            <h2 className="mt-5 max-w-[16ch] font-[Space_Grotesk] text-3xl font-bold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.8rem]">
              Built like a platform, not a paper diagram.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-white/66">
              Sapiens Health accepts the clinical reality hospitals and study teams already have —
              incomplete imaging, fragmented notes, sparse vitals, operational signals, and protocol
              context — then turns that mixture into usable prediction tasks.
            </p>

            <div className="mt-8 grid gap-4">
              {modalityCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="modality-card grid gap-4 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-4 sm:grid-cols-[10.5rem_1fr] sm:items-center">
                    <div className="overflow-hidden rounded-[1.3rem] border border-white/10 bg-[#0d0c17]">
                      <img src={card.image} alt={card.title} className="h-40 w-full object-cover sm:h-36" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/52">
                        <Icon className="h-3.5 w-3.5 text-[#cab7ff]" />
                        Input modality
                      </div>
                      <h3 className="mt-4 font-[Space_Grotesk] text-2xl font-bold tracking-[-0.05em] text-white">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/62">{card.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,29,0.92),rgba(8,7,18,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Framework</div>
                <h2 className="mt-4 max-w-[17ch] font-[Space_Grotesk] text-3xl font-bold tracking-[-0.06em] text-white sm:text-4xl">
                  Diverse inputs enter. MEDMIX routes. Predictions ship.
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/58">
                missing-modality robust
              </div>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[0.78fr_0.64fr_0.98fr] xl:items-center">
              <div className="stage-card">
                <div className="stage-label">Inputs</div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {inputChips.map((chip) => {
                    const Icon = chip.icon;
                    return (
                      <div key={chip.label} className="chip-pulse inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/72">
                        <Icon className="h-4 w-4 text-[#c8b6ff]" />
                        {chip.label}
                      </div>
                    );
                  })}
                </div>
                <div className="framework-rail mt-5" />
                <p className="mt-4 text-sm leading-7 text-white/58">
                  Clinical images, pathology, structured records, notes, vitals, operations signals,
                  and trial context can be fused in one production layer.
                </p>
              </div>

              <div className="engine-shell relative mx-auto flex h-[21rem] w-full max-w-[19rem] flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_28%,rgba(214,197,255,0.24),rgba(103,84,255,0.18)_36%,rgba(8,8,18,0.98)_84%)] px-5 text-center shadow-[0_0_90px_rgba(112,96,255,0.18)]">
                <span className="engine-ring engine-ring-a" />
                <span className="engine-ring engine-ring-b" />
                <span className="engine-core-glow" />
                <div className="relative z-10 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/66">
                  MEDMIX engine
                </div>
                <div className="relative z-10 mt-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.65rem] border border-white/12 bg-black/80 shadow-[0_0_40px_rgba(111,93,255,0.22)]">
                  <img src={logoUrl} alt="Sapiens Health engine mark" className="h-full w-full object-cover" />
                </div>
                <div className="relative z-10 mt-5 font-[Space_Grotesk] text-2xl font-bold tracking-[-0.05em] text-white">Sapiens Health</div>
                <p className="relative z-10 mt-3 max-w-[14rem] text-sm leading-6 text-white/62">
                  Fuses multimodal evidence, scores incomplete inputs, and routes prediction tasks for real workflows.
                </p>
              </div>

              <div className="stage-card">
                <div className="stage-label">Outputs</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {outputTasks.map((task) => {
                    const Icon = task.icon;
                    return (
                      <div key={task.title} className="output-task-card flex items-start gap-3 rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-3.5">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[#cbb8ff]">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{task.title}</div>
                          <div className="mt-1 text-sm leading-6 text-white/58">{task.detail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        </section>

        <section id="research" className="mx-auto mt-8 grid w-full max-w-[1520px] gap-6 lg:grid-cols-[1fr_1fr]">
          {solutionCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#cab7ff]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">{card.eyebrow}</div>
                </div>
                <h2 className="mt-6 max-w-[15ch] font-[Space_Grotesk] text-3xl font-bold tracking-[-0.06em] text-white sm:text-4xl">
                  {card.title}
                </h2>
                <p className="mt-5 max-w-[34rem] text-base leading-8 text-white/64">{card.text}</p>
              </article>
            );
          })}
        </section>

        <section id="contact" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Contact</div>
              <h2 className="mt-4 max-w-[14ch] font-[Space_Grotesk] text-3xl font-bold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.85rem]">
                Built for real hospitals, study teams, and multimodal workflows.
              </h2>
              <p className="mt-5 max-w-[42rem] text-base leading-8 text-white/64">
                If you are exploring hospital decision support or clinical trial screening on incomplete
                clinical data, we can show how MEDMIX fits into your environment.
              </p>
            </div>
            <a
              href="mailto:hello@sapienshealth.co"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/[0.05] px-7 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]"
            >
              Contact team
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function Chevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
