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
  LucideIcon,
  Microscope,
  Sparkles,
  Stethoscope,
  Syringe,
  TestTubeDiagonal,
  TimerReset,
  UserRoundCheck,
} from "lucide-react";

type ImageTile = {
  label: string;
  meta: string;
  kind: "image";
  image: string;
  imageClassName: string;
};

type DataTile = {
  label: string;
  meta: string;
  kind: "data";
  icon: LucideIcon;
  lines: string[];
};

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";
const xrayImageUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-real-xray_9b5f194e.webp";
const pathologyImageUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-real-pathology_48ac508d.jpeg";
const modalityTiles: Array<ImageTile | DataTile> = [
  {
    label: "Chest X-ray",
    meta: "AP radiograph",
    kind: "image",
    image: xrayImageUrl,
    imageClassName: "object-cover object-center grayscale-[0.08]",
  },
  {
    label: "Pathology",
    meta: "H&E tissue section",
    kind: "image",
    image: pathologyImageUrl,
    imageClassName: "object-cover object-center saturate-[0.88]",
  },
  {
    label: "EHR extract",
    meta: "recent encounters",
    kind: "data",
    icon: FileText,
    lines: ["Creatinine 1.9", "WBC 14.2", "LOS 4 days"],
  },
  {
    label: "Clinical note",
    meta: "assessment excerpt",
    kind: "data",
    icon: Database,
    lines: ["Dyspnea x 2 days", "Left effusion", "Needs escalation"],
  },
  {
    label: "Vitals trend",
    meta: "last 12 hours",
    kind: "data",
    icon: HeartPulse,
    lines: ["HR 108", "SpO2 92%", "MAP 67"],
  },
  {
    label: "Risk routing",
    meta: "priority signals",
    kind: "data",
    icon: CircleGauge,
    lines: ["Sepsis flag", "Readmit high", "Review pending"],
  },
];

const insightFlows = [
  {
    task: "Deterioration risk",
    insight: "Escalation insight",
    icon: AlertTriangle,
  },
  {
    task: "Discharge readiness",
    insight: "Transition planning",
    icon: Building2,
  },
  {
    task: "Readmission risk",
    insight: "Follow-up cue",
    icon: Stethoscope,
  },
  {
    task: "Treatment response",
    insight: "Care-path review",
    icon: Sparkles,
  },
  {
    task: "Length of stay",
    insight: "Resource planning",
    icon: TimerReset,
  },
  {
    task: "Trial eligibility",
    insight: "Screening shortlist",
    icon: UserRoundCheck,
  },
  {
    task: "Infusion duration",
    insight: "Chair utilization",
    icon: Syringe,
  },
  {
    task: "Disease classification",
    insight: "Subtype stratification",
    icon: TestTubeDiagonal,
  },
];

const evaluationHref = "mailto:info@sapienshealth.co?subject=Request%20evaluation";

export default function Home() {
  const renderModalityTile = (tile: (typeof modalityTiles)[number], variant: "hero" | "platform") => {
    const bodyHeight = variant === "hero" ? "h-36" : "h-40";

    if (tile.kind === "image") {
      return (
        <article
          key={`${variant}-${tile.label}`}
          className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(19,17,31,0.96),rgba(11,10,20,0.98))] shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
        >
          <div className={`${bodyHeight} overflow-hidden bg-black/25`}>
            <img
              src={tile.image}
              alt={`${tile.label} clinical data preview`}
              className={`h-full w-full ${tile.imageClassName}`}
            />
          </div>
          <div className="border-t border-white/8 px-4 py-3">
            <div className="text-[0.95rem] font-medium text-white/86">{tile.label}</div>
            <div className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-white/44">{tile.meta}</div>
          </div>
        </article>
      );
    }

    const Icon = tile.icon;

    return (
      <article
        key={`${variant}-${tile.label}`}
        className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(19,17,31,0.96),rgba(11,10,20,0.98))] shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
      >
        <div className={`${bodyHeight} flex flex-col justify-between p-4`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <Icon className="h-4.5 w-4.5 text-[#d7cbff]" />
            </div>
            <div className="text-right text-[0.62rem] uppercase tracking-[0.2em] text-white/36">{tile.meta}</div>
          </div>
          <div className="space-y-2 rounded-[1rem] border border-white/8 bg-black/18 p-3">
            {tile.lines.map((line) => (
              <div key={line} className="flex items-center justify-between gap-3 border-b border-white/6 pb-2 text-[0.88rem] text-white/78 last:border-b-0 last:pb-0">
                <span>{line}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#bdaeff]/70" />
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/8 px-4 py-3">
          <div className="text-[0.95rem] font-medium text-white/86">{tile.label}</div>
          <div className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-white/44">{tile.meta}</div>
        </div>
      </article>
    );
  };

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
              <a href="#insights" className="transition hover:text-white">Prediction tasks</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
            </nav>
            <a
              href={evaluationHref}
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
              <span className="font-medium">Launching MedMIX I: Best multimodal engine for medical outcome prediction</span>
              <Chevron />
            </div>
          </div>

          <div className="px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-7">
            <div className="max-w-[42rem]">
              <h1 className="font-display max-w-[18ch] text-[2.45rem] font-semibold leading-[0.99] tracking-[-0.055em] text-white sm:text-[2.95rem] lg:text-[3.1rem] xl:text-[3.45rem]">
                <span className="block">Intelligence layer for</span>
                <span className="block">incomplete patient data.</span>
              </h1>

              <p className="mt-5 max-w-[32rem] text-[1.02rem] leading-7 text-white/72 sm:text-[1.12rem] sm:leading-8">
                Sapiens Health delivers clinical predictions from multimodal patient data — even when modalities are missing.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {modalityTiles.map((tile) => renderModalityTile(tile, "platform"))}
            </div>
          </article>
        </section>

        <section id="insights" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,29,0.92),rgba(8,7,18,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-8 lg:p-9">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-[34rem]">
              <div className="section-kicker">Prediction to insight</div>
              <h2 className="font-display mt-4 max-w-[11ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.7rem]">
                Prediction tasks become workflow-ready insight.
              </h2>
              <p className="mt-4 max-w-[33rem] text-base leading-7 text-white/66 sm:text-[1.02rem]">
                Instead of stopping at a score, Sapiens Health turns clinical predictions into signals that care teams can prioritize, review, and act on.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {insightFlows.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.task} className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_38px_rgba(0,0,0,0.22)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(126,92,255,0.16),rgba(255,255,255,0.03))]">
                      <Icon className="h-4.5 w-4.5 text-[#d7c9ff]" />
                    </div>
                    <div className="mt-4 text-[0.68rem] uppercase tracking-[0.18em] text-white/42">Prediction task</div>
                    <div className="mt-1 text-[1rem] font-semibold leading-5 tracking-[-0.03em] text-white">{item.task}</div>
                    <div className="mt-4 text-[0.68rem] uppercase tracking-[0.18em] text-white/42">Insight</div>
                    <div className="mt-1 text-sm leading-6 text-white/72">{item.insight}</div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(64,212,255,0.05))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-[36rem]">
              <div className="section-kicker">Contact</div>
              <h2 className="font-display mt-5 max-w-[14ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.7rem]">
                Working with incomplete multimodal clinical data?
              </h2>
              <p className="mt-5 max-w-[32rem] text-base leading-7 text-white/66 sm:text-[1.02rem]">
                We work with care teams and digital partners that need reliable insight from real-world multimodal patient data.
              </p>
              <div className="mt-7">
                <a
                  href={evaluationHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-6 py-4 text-base font-semibold text-[#080612] shadow-[0_22px_50px_rgba(145,118,255,0.34)] transition duration-300 hover:-translate-y-0.5"
                >
                  Request evaluation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,14,34,0.72),rgba(9,8,19,0.9))] px-6 py-7 sm:px-8 lg:px-10">
              <div className="text-sm uppercase tracking-[0.22em] text-white/42">Headquarters</div>
              <div className="font-display mt-3 text-[2.6rem] font-semibold tracking-[-0.06em] text-[#dcb7ff] sm:text-[3.3rem] lg:text-[4.25rem]">
                Houston, TX
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
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="opacity-80">
      <path d="M3 2.5L7.2 6L3 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
