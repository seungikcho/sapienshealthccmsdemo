/*
Design philosophy for this page: Dark healthcare deep-tech launch page.
Use a compact centered hero, sharp high-contrast typography, restrained neon glow,
minimal navigation, and disciplined panel geometry. Every section should feel product-forward,
credible, and technically confident while preserving the Sapiens Health logo.
*/
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Database,
  FileSearch,
  Microscope,
  ScanLine,
} from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const signalCards = [
  {
    title: "Imaging",
    text: "Radiology and image-derived signal remain usable inside the same inference layer.",
    icon: ScanLine,
  },
  {
    title: "EHR",
    text: "Structured records, timelines, vitals, and coded events contribute without manual stitching.",
    icon: Database,
  },
  {
    title: "Clinical data",
    text: "Notes, waveform, and trial-specific context are fused even when some modalities are missing.",
    icon: Activity,
  },
];

const researchCards = [
  {
    title: "Hospital operations",
    text: "A single intelligence layer for operational prioritization, escalation support, and incomplete-data workflows.",
    icon: BrainCircuit,
  },
  {
    title: "Clinical trial support",
    text: "Screening and decision support that can reason across heterogeneous patient evidence with missing inputs.",
    icon: FileSearch,
  },
  {
    title: "Multimodal engine",
    text: "Built around the MEDMIX direction: strong multimodal reasoning when healthcare data is fragmented in practice.",
    icon: Microscope,
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

            <div id="about" className="grid gap-0 border-b border-white/8 md:grid-cols-[1.08fr_0.92fr]">
              <div className="border-b border-white/8 p-6 md:border-b-0 md:border-r md:border-white/8 md:p-10">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">About</div>
                <h2 className="mt-5 max-w-xl font-[Space_Grotesk] text-3xl font-bold tracking-[-0.06em] text-white sm:text-4xl">
                  Built for healthcare systems that rarely have complete data.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/66">
                  Sapiens Health is developing the multimodal AI layer for settings where imaging,
                  structured records, notes, and real clinical context do not arrive in perfect form.
                  The platform is designed to keep reasoning usable when inputs are fragmented.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {signalCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.title}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-[#d2c2ff]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="mt-4 text-sm font-semibold text-white">{card.title}</div>
                        <p className="mt-2 text-sm leading-6 text-white/55">{card.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-white/40">Signal fusion</div>
                      <div className="mt-2 text-lg font-semibold text-white">MEDMIX I</div>
                    </div>
                    <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                      Active
                    </div>
                  </div>

                  <div className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_50%_40%,rgba(124,108,255,0.24),transparent_28%),linear-gradient(180deg,rgba(8,9,18,0.95),rgba(10,12,24,0.95))] px-4 py-8">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
                    <div className="relative grid gap-4 text-sm text-white/70">
                      <FusionNode title="Imaging" align="left" />
                      <FusionNode title="EHR" align="left" />
                      <FusionNode title="Clinical data" align="left" />

                      <div className="relative mx-auto my-4 flex h-28 w-28 items-center justify-center rounded-[2rem] border border-[#a78dff]/35 bg-[radial-gradient(circle_at_50%_30%,rgba(216,191,255,0.34),rgba(120,94,255,0.20)_50%,rgba(16,13,34,0.98)_100%)] shadow-[0_0_60px_rgba(123,105,255,0.26)]">
                        <div className="absolute inset-0 rounded-[2rem] border border-white/10" />
                        <img src={logoUrl} alt="Sapiens Health fusion engine" className="h-14 w-14 rounded-2xl object-cover" />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <OutcomeCard title="Hospital operations" text="Operational prioritization, escalation context, and workflow intelligence." />
                        <OutcomeCard title="Clinical trials" text="Eligibility support, trial screening, and multimodal patient matching." />
                      </div>
                    </div>

                    <div className="pointer-events-none absolute left-[15%] top-[23%] h-px w-[32%] bg-[linear-gradient(90deg,rgba(139,121,255,0),rgba(165,151,255,0.9),rgba(139,121,255,0))]" />
                    <div className="pointer-events-none absolute left-[15%] top-[39%] h-px w-[32%] bg-[linear-gradient(90deg,rgba(139,121,255,0),rgba(165,151,255,0.9),rgba(139,121,255,0))]" />
                    <div className="pointer-events-none absolute left-[15%] top-[55%] h-px w-[32%] bg-[linear-gradient(90deg,rgba(139,121,255,0),rgba(165,151,255,0.9),rgba(139,121,255,0))]" />
                    <div className="pointer-events-none absolute right-[16%] bottom-[26%] h-px w-[26%] bg-[linear-gradient(90deg,rgba(139,121,255,0),rgba(139,231,255,0.9),rgba(139,121,255,0))]" />
                    <div className="pointer-events-none absolute right-[16%] bottom-[10%] h-px w-[26%] bg-[linear-gradient(90deg,rgba(139,121,255,0),rgba(139,231,255,0.9),rgba(139,121,255,0))]" />
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

function FusionNode({ title, align }: { title: string; align: "left" | "right" }) {
  return (
    <div className={`relative ${align === "left" ? "mr-auto" : "ml-auto"} w-[10.5rem] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3`}>
      <div className="text-xs uppercase tracking-[0.22em] text-white/40">Input</div>
      <div className="mt-2 text-sm font-semibold text-white">{title}</div>
    </div>
  );
}

function OutcomeCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs uppercase tracking-[0.24em] text-white/38">Output</div>
      <div className="mt-2 text-sm font-semibold text-white">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/58">{text}</p>
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
