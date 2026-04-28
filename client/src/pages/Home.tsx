/*
Design philosophy for this page: A dark editorial product homepage inspired by Converge Bio.
The typography should feel straight, large, and calm. The layout should use generous spacing,
minimal clutter, and image-led product blocks. MedMIX should read as an intelligence layer for
incomplete multimodal clinical data rather than a broad category statement.
*/
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CircleGauge,
  Database,
  FileText,
  HeartPulse,
  Layers3,
  Microscope,
  MoveRight,
  ScanLine,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const clinicalImageUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/clinical-intelligence_7a32d9bc.jpg";

const modalityTiles = [
  {
    label: "CT",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-imaging-tile-oBWATGFLeZuQR9syf4mkyW.webp",
  },
  {
    label: "EHR",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-ehr-tile-L4Mxc73s5P7RBVBdrsGSpd.webp",
  },
  {
    label: "Pathology",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-pathology-tile-G4z9pvJ6Mi4kSWMjgowmn7.webp",
  },
  {
    label: "Clinical notes",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-notes-tile-C83VT9ULuSmsJZYG6srnZA.webp",
  },
  {
    label: "Vitals",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-vitals-tile-a4nFJTE6ASqXHRaHm54mEF.webp",
  },
];

const insightFlows = [
  {
    task: "Deterioration risk",
    insight: "Escalation insight for clinical teams",
    icon: AlertTriangle,
  },
  {
    task: "Discharge readiness",
    insight: "Bed planning and transition signal",
    icon: Building2,
  },
  {
    task: "Readmission risk",
    insight: "Follow-up prioritization cue",
    icon: Stethoscope,
  },
  {
    task: "Treatment response",
    insight: "Review signal for care pathways",
    icon: Sparkles,
  },
];

const frameworkInputs = ["CT", "EHR", "Pathology", "Notes", "Vitals"];
const frameworkOutputs = ["Workflow insight", "Prioritization signal", "Clinical prediction"];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(133,102,255,0.14),transparent_20%),radial-gradient(circle_at_88%_14%,rgba(64,212,255,0.08),transparent_18%),linear-gradient(180deg,#06050d_0%,#0a0915_45%,#07060e_100%)]" />
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
              <div className="font-wordmark truncate text-white/96">Sapiens Health</div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8 text-sm text-white/74">
              <a href="#platform" className="transition hover:text-white">Platform</a>
              <a href="#insights" className="transition hover:text-white">Insights</a>
              <a href="#framework" className="transition hover:text-white">How it works</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
            </nav>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/18 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/6"
            >
              Request evaluation
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-[1520px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,11,23,0.92),rgba(9,8,18,0.98))] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_60px_160px_rgba(0,0,0,0.52)]">
          <div className="border-b border-white/8 px-5 py-6 sm:px-8 lg:px-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8f7dff]/25 bg-[linear-gradient(180deg,rgba(126,92,255,0.18),rgba(80,48,160,0.10))] px-5 py-2 text-sm text-[#e9deff] shadow-[0_8px_30px_rgba(120,80,255,0.18)]">
              <span className="font-medium">Intelligence layer for incomplete multimodal clinical data</span>
              <Chevron />
            </div>
          </div>

          <div className="grid gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-18">
            <div className="max-w-[40rem]">
              <h1 className="font-display max-w-[10ch] text-[3rem] font-semibold leading-[0.95] tracking-[-0.075em] text-white sm:text-[4.15rem] lg:text-[5rem] xl:text-[5.6rem]">
                The intelligence layer for incomplete clinical data.
              </h1>

              <p className="mt-8 max-w-[33rem] text-lg leading-8 text-white/72 sm:text-xl">
                Sapiens Health turns fragmented multimodal patient data into workflow-ready insights for hospitals and care teams.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#insights"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-6 py-4 text-base font-semibold text-[#080612] shadow-[0_22px_50px_rgba(145,118,255,0.34)] transition duration-300 hover:-translate-y-0.5"
                >
                  See insight flow
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/[0.04] px-6 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]"
                >
                  Request evaluation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-4">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/30">
                <img src={clinicalImageUrl} alt="Clinical workflow environment" className="h-[23rem] w-full object-cover sm:h-[27rem] lg:h-[31rem]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,13,0.08),rgba(7,7,13,0.26))]" />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,11,20,0.78),rgba(10,11,20,0.58))] p-4 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5">
                  <div className="text-sm text-white/58">Clinical workflow reality</div>
                  <div className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-white">
                    Missing signals are common. Insight still has to ship.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="mx-auto mt-8 grid w-full max-w-[1520px] gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="section-kicker">Platform</div>
            <h2 className="font-display mt-5 max-w-[12ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.95rem]">
              Built around the data that actually exists.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-white/68 sm:text-lg">
              CT, EHR, pathology, clinical notes, and vitals do not arrive in perfect synchrony. MedMIX fuses what is available and turns incomplete multimodal context into usable clinical signal.
            </p>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,29,0.92),rgba(8,7,18,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-8 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {modalityTiles.map((tile) => (
                <div key={tile.label} className="group">
                  <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/20 shadow-[0_20px_45px_rgba(0,0,0,0.28)]">
                    <img
                      src={tile.image}
                      alt={`${tile.label} modality tile`}
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="px-1 pt-3 text-base font-medium text-white/82">{tile.label}</div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section id="insights" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,29,0.92),rgba(8,7,18,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-8 lg:p-10">
          <div className="max-w-[48rem]">
            <div className="section-kicker">Prediction to insight</div>
            <h2 className="font-display mt-5 max-w-[13ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.95rem]">
              Prediction tasks become workflow-ready insight.
            </h2>
            <p className="mt-5 max-w-[38rem] text-base leading-8 text-white/66 sm:text-lg">
              Instead of stopping at a score, Sapiens Health turns clinical predictions into signals that care teams can prioritize, review, and act on.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {insightFlows.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.task} className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <div>
                    <div className="text-sm text-white/52">Prediction task</div>
                    <div className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">{item.task}</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(126,92,255,0.14),rgba(255,255,255,0.03))]">
                      <MoveRight className="h-5 w-5 text-[#cbb8ff]" />
                    </div>
                  </div>
                  <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center gap-2 text-sm text-white/52">
                      <Icon className="h-4 w-4 text-[#cab7ff]" />
                      <span>Insight</span>
                    </div>
                    <div className="mt-2 text-base font-medium text-white/86">{item.insight}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="framework" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="max-w-[44rem]">
            <div className="section-kicker">How MedMIX works</div>
            <h2 className="font-display mt-5 max-w-[14ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.95rem]">
              Incomplete inputs enter. Missing ones are masked. Clinical insight ships.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-white/68">
                <Layers3 className="h-4 w-4 text-[#cab7ff]" />
                <span>Inputs</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {frameworkInputs.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/72">
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-white/68">
                <CircleGauge className="h-4 w-4 text-[#cab7ff]" />
                <span>Engine</span>
              </div>
              <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(138,116,255,0.12),rgba(255,255,255,0.02))] p-4">
                <div className="font-display text-2xl font-semibold tracking-[-0.05em] text-white">MedMIX</div>
                <p className="mt-2 text-sm leading-7 text-white/66">
                  Entropy-guided multimodal fusion for real-world clinical data.
                </p>
              </div>
            </article>

            <article className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-white/68">
                <Database className="h-4 w-4 text-[#cab7ff]" />
                <span>Outputs</span>
              </div>
              <div className="mt-4 grid gap-2">
                {frameworkOutputs.map((item) => (
                  <div key={item} className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(64,212,255,0.05))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="max-w-[50rem]">
            <div className="section-kicker">Contact</div>
            <h2 className="font-display mt-5 max-w-[16ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.95rem]">
              Working with incomplete multimodal clinical data?
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-white/66 sm:text-lg">
              We work with care teams and digital partners that need reliable insight from real-world multimodal patient data.
            </p>
            <div className="mt-8">
              <a
                href="mailto:team@sapienshealth.co"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-6 py-4 text-base font-semibold text-[#080612] shadow-[0_22px_50px_rgba(145,118,255,0.34)] transition duration-300 hover:-translate-y-0.5"
              >
                Request evaluation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="opacity-80">
      <path d="M3 2.5L7.2 6L3 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
