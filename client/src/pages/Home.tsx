/*
Design philosophy for this page: A minimal, investment-grade healthcare AI homepage with
five clear sections only. The composition should feel calm, premium, and precise, with one
clinical image and one manufacturing image used consistently to anchor the two verticals.
*/
import {
  ArrowRight,
  Building2,
  CircleGauge,
  Database,
  Factory,
  FileText,
  Layers3,
  Microscope,
} from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const clinicalImageUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/clinical-intelligence_7a32d9bc.jpg";
const bioprocessImageUrl =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/bioprocess-intelligence_be2b8c9b.jpg";

const frameworkInputs = ["Imaging", "EHR", "Pathology", "Notes", "Process data"];
const frameworkOutputs = ["Clinical predictions", "Bioprocess outcomes"];

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
              <div className="font-wordmark truncate text-white/96">Sapiens Health</div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8 text-sm text-white/74">
              <a href="#clinical" className="transition hover:text-white">Clinical</a>
              <a href="#bioprocess" className="transition hover:text-white">Bioprocess</a>
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
              <span className="font-medium">MedMIX for incomplete multimodal data</span>
              <Chevron />
            </div>
          </div>

          <div className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="max-w-[60rem]">
              <h1 className="font-display max-w-[9ch] text-[3rem] font-semibold leading-[0.95] tracking-[-0.075em] text-white sm:text-[4.15rem] lg:text-[5rem] xl:text-[5.8rem]">
                Predict outcomes from incomplete data.
              </h1>

              <p className="mt-8 max-w-[34rem] text-lg leading-8 text-white/72 sm:text-xl">
                Sapiens Health builds the multimodal AI engine that works with what you have.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#framework"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-6 py-4 text-base font-semibold text-[#080612] shadow-[0_22px_50px_rgba(145,118,255,0.34)] transition duration-300 hover:-translate-y-0.5"
                >
                  How MedMIX works
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
          </div>
        </section>

        <section id="clinical" className="mx-auto mt-8 grid w-full max-w-[1520px] gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="section-kicker">Clinical Intelligence</div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/66">
              <Building2 className="h-4 w-4 text-[#cab7ff]" />
              <span>For Healthcare Institutions</span>
            </div>
            <h2 className="font-display mt-5 max-w-[14ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.9rem]">
              Predictions that survive missing clinical signals.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-white/68 sm:text-lg">
              Hospitals rarely have complete data. ECG, imaging, EHR, clinical notes — some are always missing. MedMIX fuses what exists and delivers accurate predictions anyway.
            </p>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,29,0.92),rgba(8,7,18,0.98))] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-4">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/30">
              <img src={clinicalImageUrl} alt="Clinical intelligence environment" className="h-[24rem] w-full object-cover sm:h-[29rem] lg:h-[32rem]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,13,0.06),rgba(7,7,13,0.24))]" />
            </div>
          </article>
        </section>

        <section id="bioprocess" className="mx-auto mt-8 grid w-full max-w-[1520px] gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <article className="order-2 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,29,0.92),rgba(8,7,18,0.98))] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-4 lg:order-1">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/30">
              <img src={bioprocessImageUrl} alt="Bioprocess intelligence manufacturing environment" className="h-[24rem] w-full object-cover sm:h-[29rem] lg:h-[32rem]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,13,0.08),rgba(7,7,13,0.22))]" />
            </div>
          </article>

          <article className="order-1 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:order-2 lg:p-10">
            <div className="section-kicker">Bioprocess Intelligence</div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/66">
              <Factory className="h-4 w-4 text-[#cab7ff]" />
              <span>For Biomanufacturing and CDMOs</span>
            </div>
            <h2 className="font-display mt-5 max-w-[15ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.9rem]">
              Outcome prediction across variable batch reality.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-white/68 sm:text-lg">
              Every batch looks different. Apheresis results, flow cytometry, process parameters — coverage varies by client and stage. MedMIX predicts outcomes from whatever is available.
            </p>
          </article>
        </section>

        <section id="framework" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,12,29,0.92),rgba(8,7,18,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-8 lg:p-10">
          <div className="max-w-[44rem]">
            <div className="section-kicker">How MedMIX works</div>
            <h2 className="font-display mt-5 max-w-[14ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.9rem]">
              Diverse inputs enter. Missing ones are masked, not fabricated. Predictions ship.
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
                  Entropy-guided multimodal fusion.
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

        <section id="contact" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="max-w-[50rem]">
            <div className="section-kicker">Contact</div>
            <h2 className="font-display mt-5 max-w-[16ch] text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[2.9rem]">
              Working with incomplete clinical or bioprocess data?
            </h2>
            <div className="mt-8">
              <a
                href="mailto:team@sapienshealth.co"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-6 py-4 text-base font-semibold text-[#080612] shadow-[0_22px_50px_rgba(145,118,255,0.34)] transition duration-300 hover:-translate-y-0.5"
              >
                Request Evaluation
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
