/*
Design philosophy for this page: Dark healthcare deep-tech launch page.
Use a compact centered hero, sharp high-contrast typography, restrained neon glow,
minimal navigation, and disciplined panel geometry. The About section should behave
like a premium platform graphic: broad input coverage, strong branded engine presence,
and animated output tasks that read clearly for business buyers rather than researchers.
*/
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  ClipboardList,
  Clock3,
  Database,
  FileSearch,
  HeartPulse,
  Microscope,
  ScanLine,
  Stethoscope,
  TestTube2,
} from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const inputStreams = [
  { title: "Imaging", detail: "X-ray · CT · MRI · Ultrasound", icon: ScanLine },
  { title: "Pathology", detail: "WSI · Histology · Tumor markers", icon: Microscope },
  { title: "EHR", detail: "Diagnoses · Procedures · Medications", icon: Database },
  { title: "Labs & vitals", detail: "CBC · Chemistry · Trends · Monitoring", icon: HeartPulse },
  { title: "Clinical notes", detail: "Progress notes · Reports · Summaries", icon: ClipboardList },
  { title: "Operational data", detail: "OR schedule · Bed state · Throughput", icon: Clock3 },
  { title: "Research context", detail: "Trial criteria · Cohorts · Biomarkers", icon: FileSearch },
  { title: "Care context", detail: "Referral reason · Symptoms · Timeline", icon: Stethoscope },
];

const engineFeatures = [
  "Missing-modality robust",
  "Sample-specific fusion",
  "Multimodal reasoning",
  "Clinical workflow ready",
];

const outputTasks = [
  {
    title: "Deterioration watch",
    detail: "Escalate high-risk patients from fragmented signals",
    tone: "violet",
  },
  {
    title: "OR time estimation",
    detail: "Forecast case duration and downstream schedule impact",
    tone: "cyan",
  },
  {
    title: "Discharge readiness",
    detail: "Support bed turnover and patient flow planning",
    tone: "violet",
  },
  {
    title: "Readmission risk",
    detail: "Flag patients needing intensified follow-up",
    tone: "cyan",
  },
  {
    title: "ICU escalation",
    detail: "Prioritize transfer and monitoring decisions sooner",
    tone: "violet",
  },
  {
    title: "Trial eligibility",
    detail: "Pre-screen patients against protocol criteria",
    tone: "cyan",
  },
  {
    title: "Patient matching",
    detail: "Match multimodal evidence to relevant studies",
    tone: "violet",
  },
  {
    title: "Site screening queue",
    detail: "Surface likely candidates for coordinator review",
    tone: "cyan",
  },
];

const researchCards = [
  {
    title: "Hospital operations",
    text: "Move from fragmented patient signals to timing, escalation, capacity, and prioritization decisions that operational teams can act on.",
    icon: BrainCircuit,
  },
  {
    title: "Clinical trial support",
    text: "Fuse multimodal evidence to streamline eligibility screening, patient matching, and coordinator pre-review across complex trial workflows.",
    icon: FileSearch,
  },
  {
    title: "Multimodal engine",
    text: "MEDMIX is built to keep inference usable when real clinical deployments do not deliver complete data for every patient and every task.",
    icon: TestTube2,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(131,96,255,0.16),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(72,214,255,0.10),transparent_22%),linear-gradient(180deg,#070612_0%,#090816_45%,#06050f_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.08]" />
        <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_center,rgba(186,146,255,0.16),transparent_44%)] blur-3xl" />
      </div>

      <header className="relative z-30">
        <div className="container py-6">
          <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/4 px-5 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-xl">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
                <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-[0.22em] text-white/92">SAPIENS HEALTH</div>
                <div className="text-xs text-white/50">Multimodal clinical intelligence</div>
              </div>
            </a>

            <nav className="hidden items-center gap-10 text-sm text-white/72 md:flex">
              <a href="#about" className="transition hover:text-white">About</a>
              <a href="#research" className="transition hover:text-white">Research</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10">
        <section className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,30,0.84),rgba(8,7,18,0.96))] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_50px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="border-b border-white/8 px-6 py-8 sm:px-10">
              <div className="mx-auto flex max-w-3xl justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#8f7dff]/25 bg-[linear-gradient(180deg,rgba(126,92,255,0.16),rgba(80,48,160,0.10))] px-5 py-2 text-sm text-[#e9deff] shadow-[0_8px_30px_rgba(120,80,255,0.18)]">
                  <span className="font-medium">Launching MEDMIX I: Best multimodal AI engine in digital health</span>
                  <Chevron />
                </div>
              </div>
            </div>

            <div className="border-b border-white/8 px-6 py-16 sm:px-10 sm:py-20">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-[#9d86ff]/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_0_40px_rgba(118,88,255,0.16)]">
                  <img src={logoUrl} alt="Sapiens Health mark" className="h-14 w-14 rounded-2xl object-cover" />
                </div>

                <h1 className="font-[Space_Grotesk] text-5xl font-bold tracking-[-0.08em] text-white sm:text-6xl md:text-7xl">
                  Intelligence layer
                  <br />
                  for incomplete clinical data.
                </h1>

                <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                  Sapiens Health builds the AI engine that fuses imaging, EHR, and clinical data
                  — even when some are missing.
                </p>
              </div>
            </div>

            <div className="border-b border-white/8 px-6 py-12 sm:px-10">
              <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row">
                <a
                  href="#about"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d9b0ff_0%,#9b8cff_52%,#7bd9ff_100%)] px-6 py-4 text-base font-semibold text-[#090713] shadow-[0_18px_44px_rgba(147,118,255,0.34)] transition duration-300 hover:-translate-y-0.5"
                >
                  About Technology
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/5 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/8"
                >
                  Get In Touch
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div id="about" className="grid gap-0 border-b border-white/8 lg:grid-cols-[0.76fr_1.24fr]">
              <div className="border-b border-white/8 p-6 lg:border-b-0 lg:border-r lg:border-white/8 lg:p-10">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">About</div>
                <h2 className="mt-5 max-w-xl font-[Space_Grotesk] text-3xl font-bold tracking-[-0.06em] text-white sm:text-4xl">
                  One platform that turns fragmented clinical reality into usable decisions.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/66">
                  This is not a research diagram. Sapiens Health is building a live multimodal
                  platform that accepts the messy mix hospitals and study teams already have,
                  routes it through the MEDMIX engine, and returns prediction tasks that operators,
                  clinicians, and coordinators can act on.
                </p>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div className="text-xs uppercase tracking-[0.26em] text-white/38">Inputs</div>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      Imaging, pathology, structured EHR, labs, vitals, notes, operations data,
                      and trial criteria can all enter the same layer.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div className="text-xs uppercase tracking-[0.26em] text-white/38">Engine</div>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      MEDMIX keeps inference available when a modality is delayed, absent, or only
                      partially observed in production.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div className="text-xs uppercase tracking-[0.26em] text-white/38">Outputs</div>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      The output is a prediction workspace for hospital operations, decision
                      support, and clinical trial workflows—not just a fused embedding.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-10">
                <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.36)] lg:p-6">
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-white/40">Platform pipeline</div>
                      <div className="mt-2 text-lg font-semibold text-white">How MEDMIX turns incomplete data into action</div>
                    </div>
                    <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                      Animated system view
                    </div>
                  </div>

                  <div className="pipeline-shell mt-6 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(124,108,255,0.22),transparent_24%),linear-gradient(180deg,rgba(7,8,17,0.98),rgba(10,12,24,0.96))] p-4 lg:p-5">
                    <div className="pipeline-grid relative grid gap-6 xl:grid-cols-[1fr_0.86fr_1.08fr]">
                      <div className="pipeline-column">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <div className="text-[11px] uppercase tracking-[0.28em] text-white/38">Input streams</div>
                            <div className="mt-1 text-sm font-semibold text-white">Diverse real-world clinical inputs</div>
                          </div>
                          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/52">
                            live + missing tolerant
                          </div>
                        </div>

                        <div className="grid gap-3">
                          {inputStreams.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <div
                                key={item.title}
                                className="pipeline-input-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                style={{ animationDelay: `${index * 0.18}s` }}
                              >
                                <div className="absolute inset-y-3 right-3 w-px bg-[linear-gradient(180deg,rgba(149,122,255,0),rgba(149,122,255,0.8),rgba(117,222,255,0))] opacity-80" />
                                <div className="flex items-start gap-3">
                                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/6 text-[#d6c7ff] shadow-[0_0_20px_rgba(124,108,255,0.12)]">
                                    <Icon className="h-5 w-5" />
                                  </div>
                                  <div className="min-w-0 flex-1 pr-5">
                                    <div className="text-sm font-semibold text-white">{item.title}</div>
                                    <div className="mt-1 text-sm leading-6 text-white/55">{item.detail}</div>
                                  </div>
                                </div>
                                <span className="pipeline-drop" aria-hidden="true" />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pipeline-engine-wrap relative flex flex-col items-center justify-center">
                        <div className="pointer-events-none absolute inset-x-6 top-1/2 hidden h-px -translate-y-1/2 bg-[linear-gradient(90deg,rgba(139,121,255,0),rgba(139,121,255,0.9),rgba(117,222,255,0.9),rgba(139,121,255,0))] xl:block" />
                        <div className="pipeline-engine relative mx-auto flex h-[19rem] w-full max-w-[18rem] flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_28%,rgba(214,197,255,0.22),rgba(103,84,255,0.18)_35%,rgba(8,8,18,0.98)_82%)] px-5 text-center shadow-[0_0_80px_rgba(116,98,255,0.22)]">
                          <span className="pipeline-orbit pipeline-orbit-a" />
                          <span className="pipeline-orbit pipeline-orbit-b" />
                          <span className="pipeline-core-glow" />
                          <div className="pipeline-engine-badge">MEDMIX ENGINE</div>
                          <div className="relative z-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.7rem] border border-white/12 bg-black/70 shadow-[0_0_40px_rgba(111,93,255,0.2)]">
                            <img src={logoUrl} alt="Sapiens Health MEDMIX engine" className="h-full w-full object-cover" />
                          </div>
                          <div className="relative z-10 mt-5 font-[Space_Grotesk] text-2xl font-bold tracking-[-0.05em] text-white">
                            Sapiens Health
                          </div>
                          <p className="relative z-10 mt-3 max-w-[13rem] text-sm leading-6 text-white/62">
                            Fuses multimodal evidence, scores signal quality, and routes prediction tasks even when inputs are incomplete.
                          </p>
                          <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2">
                            {engineFeatures.map((feature, index) => (
                              <span
                                key={feature}
                                className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] text-white/70"
                                style={{ animationDelay: `${0.4 + index * 0.16}s` }}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pipeline-column">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <div className="text-[11px] uppercase tracking-[0.28em] text-white/38">Prediction workspace</div>
                            <div className="mt-1 text-sm font-semibold text-white">Operational and trial decision support</div>
                          </div>
                          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/52">
                            ranked outputs
                          </div>
                        </div>

                        <div className="grid gap-3">
                          {outputTasks.map((task, index) => (
                            <div
                              key={task.title}
                              className={`pipeline-output-card ${task.tone === "cyan" ? "pipeline-output-cyan" : "pipeline-output-violet"}`}
                              style={{ animationDelay: `${0.25 + index * 0.14}s` }}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="text-sm font-semibold text-white">{task.title}</div>
                                  <div className="mt-1 text-sm leading-6 text-white/56">{task.detail}</div>
                                </div>
                                <span className="pipeline-score">{92 - (index % 5) * 3}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="research" className="grid gap-4 p-6 sm:p-10 md:grid-cols-3">
              {researchCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/6 text-[#cab7ff]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-[Space_Grotesk] text-2xl font-bold tracking-[-0.04em] text-white">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/60">{card.text}</p>
                  </article>
                );
              })}
            </div>

            <div id="contact" className="border-t border-white/8 px-6 py-12 sm:px-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">Contact</div>
                  <h2 className="mt-4 font-[Space_Grotesk] text-3xl font-bold tracking-[-0.06em] text-white sm:text-4xl">
                    Talk with Sapiens Health about healthcare AI infrastructure.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/62">
                    We are focused on multimodal intelligence for real clinical environments,
                    especially where missing data is the rule rather than the exception.
                  </p>
                </div>

                <a
                  href="mailto:hello@sapienslabs.ai"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/5 px-6 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/8"
                >
                  Contact team
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
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
