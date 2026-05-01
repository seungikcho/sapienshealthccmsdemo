/*
Design philosophy for this page: A dark editorial product homepage inspired by premium healthcare software.
The layout should stay minimal, text-led, and compact. Product sections should feel intentional,
not crowded, with realistic modality tiles and concise clinical language.
*/
import { AlertTriangle, ArrowRight, Building2, Sparkles, Stethoscope } from "lucide-react";

type ModalityTile = {
  label: string;
  image: string;
  imageClassName: string;
};

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const heroHospitalGraphic =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-hospital-hero-v2-aNekoNh4s6oDWSarMqDYVd.webp";

const supportLogos = [
  {
    name: "K2I Investment",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/logo-k2i-invest-trans_826e641c.png",
    className: "h-7 w-auto sm:h-8",
  },
  {
    name: "Texas Medical Center",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/logo-texas-medical-trans_a8802624.png",
    className: "h-10 w-auto sm:h-11",
  },
  {
    name: "THC",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/logo-thc-trans_4b0f97b4.png",
    className: "h-6 w-auto sm:h-7",
  },
  {
    name: "Nucleate",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/logo-nucleate-trans_8bb0c215.png",
    className: "h-8 w-auto sm:h-9",
  },
];

const modalityTiles: ModalityTile[] = [
  {
    label: "X-ray",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/modality-xray-realistic-WJu3ETUPBfZoHS7bBWn7sR.webp",
    imageClassName: "object-cover object-center grayscale-[0.06]",
  },
  {
    label: "EHR",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/modality-ehr-realistic-eKyY5LEe2FaHhX7Ex8HB5f.webp",
    imageClassName: "object-cover object-center",
  },
  {
    label: "WSI (Pathology)",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/modality-pathology-realistic-6DcSWZqcFBbmB3FpEw5mQD.webp",
    imageClassName: "object-cover object-center saturate-[0.96]",
  },
  {
    label: "Clinical Notes",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/modality-clinical-notes-realistic-fFKT792Wi6SdUXTSi9eotz.webp",
    imageClassName: "object-cover object-center",
  },
  {
    label: "CT",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/modality-ct-realistic-3pwKTVhQ7kMck3bkTuGPGH.webp",
    imageClassName: "object-cover object-center grayscale-[0.04]",
  },
  {
    label: "Genomics",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/modality-genomics-realistic-inTbtKA3JR9muAa9Rifnx2.webp",
    imageClassName: "object-cover object-center",
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

const evaluationHref = "mailto:info@sapienshealth.co?subject=Request%20evaluation";

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
              <a href="#platform" className="transition hover:text-white">
                Platform
              </a>
              <a href="#insights" className="transition hover:text-white">
                Prediction tasks
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
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
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-10">
              <div className="max-w-[42rem]">
                <h1 className="font-display max-w-[18ch] text-[2.45rem] font-semibold leading-[0.99] tracking-[-0.055em] text-white sm:text-[2.95rem] lg:text-[3.1rem] xl:text-[3.45rem]">
                  <span className="block">Intelligence layer for</span>
                  <span className="block">incomplete patient data.</span>
                </h1>

                <p className="mt-5 max-w-[32rem] text-[1.02rem] leading-7 text-white/72 sm:text-[1.12rem] sm:leading-8">
                  Sapiens Health delivers clinical predictions from multimodal patient data, even when modalities are missing.
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

              <div className="relative hidden lg:flex lg:min-h-[320px] lg:items-center lg:justify-center">
                <div className="hero-stage relative h-[320px] w-full max-w-[640px] overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_22%_18%,rgba(124,97,255,0.18),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(92,211,255,0.11),transparent_22%),linear-gradient(180deg,rgba(12,10,24,0.94),rgba(8,7,18,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
                  <div className="absolute inset-[1rem] overflow-hidden rounded-[1.55rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <img
                      src={heroHospitalGraphic}
                      alt="Isometric hospital room scene with a patient bed, clinician, and care support interface"
                      className="h-full w-full object-cover opacity-[0.94] saturate-[0.92] [animation:floatCard_12s_ease-in-out_infinite]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,18,0.02),rgba(8,7,18,0.2))]" />
                    <div className="absolute inset-y-0 left-0 w-[18%] bg-[linear-gradient(90deg,rgba(9,8,18,0.26),rgba(9,8,18,0))]" />
                    <div className="absolute inset-y-0 right-0 w-[12%] bg-[linear-gradient(270deg,rgba(9,8,18,0.18),rgba(9,8,18,0))]" />
                  </div>

                  <div className="absolute left-[5%] top-[8%] rounded-[1.1rem] border border-white/12 bg-[linear-gradient(180deg,rgba(18,16,35,0.74),rgba(10,9,20,0.86))] px-4 py-3 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.28)] [animation:floatCard_10s_ease-in-out_infinite]">
                    <div className="text-[0.62rem] uppercase tracking-[0.22em] text-white/40">Inference</div>
                    <div className="mt-1 text-[0.92rem] font-medium tracking-[-0.03em] text-white/88">Deterioration risk</div>
                    <div className="mt-2 h-1.5 w-20 overflow-hidden rounded-full bg-white/8">
                      <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#a67dff,#72d8ff)]" />
                    </div>
                  </div>

                  <div className="absolute right-[6%] top-[12%] rounded-[1.1rem] border border-cyan-300/16 bg-[linear-gradient(180deg,rgba(14,16,33,0.66),rgba(10,11,22,0.82))] px-4 py-3 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.24)] [animation:floatCard_11s_ease-in-out_infinite] [animation-delay:1.3s]">
                    <div className="text-[0.62rem] uppercase tracking-[0.22em] text-white/40">Operations</div>
                    <div className="mt-1 text-[0.92rem] font-medium tracking-[-0.03em] text-white/88">Discharge readiness</div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#86dbff] chip-pulse" />
                      <span className="h-2 w-2 rounded-full bg-[#b391ff]/85 chip-pulse [animation-delay:1.2s]" />
                      <span className="h-2 w-2 rounded-full bg-white/30" />
                    </div>
                  </div>

                  <div className="absolute bottom-[7%] right-[10%] rounded-[1.1rem] border border-white/12 bg-[linear-gradient(180deg,rgba(18,16,35,0.76),rgba(10,9,20,0.88))] px-4 py-3 backdrop-blur-md shadow-[0_18px_45px_rgba(0,0,0,0.28)] [animation:floatCard_9s_ease-in-out_infinite] [animation-delay:2.2s]">
                    <div className="text-[0.62rem] uppercase tracking-[0.22em] text-white/40">Care team</div>
                    <div className="mt-1 text-[0.92rem] font-medium tracking-[-0.03em] text-white/88">Bed status · alert</div>
                    <div className="mt-2 h-px w-24 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(143,125,255,0.7),rgba(114,216,255,0.7))]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-5 w-full max-w-[1520px]">
          <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.018))] px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-6 sm:py-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-[0.72rem] uppercase tracking-[0.22em] text-white/44">Supported by</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-x-7 gap-y-5 sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-10 sm:gap-y-4">
                {supportLogos.map((logo) => (
                  <div key={logo.name} className="flex min-h-[2.75rem] items-center justify-center opacity-88 transition duration-300 hover:opacity-100">
                    <img src={logo.src} alt={`${logo.name} logo`} className={`${logo.className} object-contain`} />
                  </div>
                ))}
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
            <p className="mt-5 max-w-[32rem] text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
              MedMIX works across the modalities care teams already have, turning incomplete multimodal context into usable clinical signal.
            </p>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,29,0.92),rgba(8,7,18,0.98))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-6 lg:p-8">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {modalityTiles.map((tile) => (
                <article
                  key={tile.label}
                  className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(19,17,31,0.96),rgba(11,10,20,0.98))] shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
                >
                  <div className="h-40 overflow-hidden bg-black/25">
                    <img src={tile.image} alt={`${tile.label} modality preview`} className={`h-full w-full ${tile.imageClassName}`} />
                  </div>
                  <div className="px-4 py-3 text-[0.98rem] font-medium tracking-[-0.03em] text-white/88">{tile.label}</div>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section
          id="insights"
          className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,29,0.92),rgba(8,7,18,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-8 lg:p-9"
        >
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="max-w-[36rem]">
              <div className="section-kicker">Prediction to insight</div>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.075em] text-white sm:text-4xl lg:text-[3rem] lg:leading-[0.95]">
                <span className="block whitespace-nowrap">Prediction tasks become</span>
                <span className="block whitespace-nowrap">workflow-ready insight.</span>
              </h2>
              <p className="mt-4 max-w-[26rem] text-base leading-7 text-white/66 sm:text-[1.02rem]">
                Clinical predictions translated into prioritized, reviewable workflow signals.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {insightFlows.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.task}
                    className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_38px_rgba(0,0,0,0.22)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(126,92,255,0.16),rgba(255,255,255,0.03))]">
                      <Icon className="h-4.5 w-4.5 text-[#d7c9ff]" />
                    </div>
                    <div className="mt-4 text-[0.68rem] uppercase tracking-[0.18em] text-white/42">Prediction task</div>
                    <div className="mt-1 text-[0.98rem] font-semibold leading-5 tracking-[-0.03em] text-white">{item.task}</div>
                    <div className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-white/42">Insight</div>
                    <div className="mt-1 text-sm leading-6 text-white/72">{item.insight}</div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(64,212,255,0.05))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6 lg:p-7"
        >
          <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
            <div className="max-w-[35rem]">
              <div className="section-kicker">Contact</div>
              <h2 className="font-display mt-3 max-w-none text-[2.15rem] font-semibold tracking-[-0.06em] text-white sm:text-[2.3rem] lg:whitespace-nowrap lg:text-[2.45rem]">
                Working with incomplete multimodal clinical data?
              </h2>
              <p className="mt-3 max-w-[31rem] text-[0.95rem] leading-6 text-white/66 sm:text-[0.98rem]">
                We work with care teams and digital partners that need reliable insight from real-world multimodal patient data.
              </p>
              <div className="mt-5">
                <a
                  href={evaluationHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-6 py-3.5 text-[0.98rem] font-semibold text-[#080612] shadow-[0_22px_50px_rgba(145,118,255,0.34)] transition duration-300 hover:-translate-y-0.5"
                >
                  Request evaluation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2 lg:max-w-[33rem] lg:justify-self-end lg:self-end">
              <article className="rounded-[1.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,14,34,0.72),rgba(9,8,19,0.9))] px-5 py-4">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] text-white/42">Email</div>
                <a href="mailto:info@sapienshealth.co" className="mt-3 block text-base font-medium text-white/88 transition hover:text-white">
                  info@sapienshealth.co
                </a>
              </article>
              <article className="rounded-[1.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,14,34,0.72),rgba(9,8,19,0.9))] px-5 py-4">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] text-white/42">Headquarters</div>
                <div className="mt-3 text-base font-medium text-white/88">Houston, TX</div>
              </article>
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
