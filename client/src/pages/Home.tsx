/*
Design philosophy for this page: A stripped-down healthcare AI landing page inspired by Beacon-style clarity.
This file should use fewer words, keep only the product core, and rely on one strong hospital graphic plus
simple workflow cards to explain the product.
*/
import { FileStack, ListTodo, Mail, Sparkles } from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const heroTransparentGraphic = "/manus-storage/sapiens-doctor-hero-transparent-final_6a65ad22.png";

const steps = [
  {
    number: "01",
    title: "Connect",
    summary:
      "Patient data is scattered across EMRs, emails, referral networks, and lab portals, leaving care teams with an incomplete patient picture.",
    detail:
      "Sapiens parses multimodal data across these sources and synthesizes it into one unified care context with an automatically generated task list.",
    result:
      "Care teams start the day with a complete patient profile and a clear list of what needs to happen next.",
    demoLabel: "Connect demo",
    demoMeta: "Unified care context",
    demoLines: ["EMR + referral + email intake", "Unified patient summary", "Auto-generated task list"],
    Icon: FileStack,
  },
  {
    number: "02",
    title: "Prioritize",
    summary:
      "Most tools surface tasks without meaningful ordering, so reimbursement deadlines and high-impact interventions are easy to miss.",
    detail:
      "Sapiens scores and sequences every task by clinical urgency, deadline proximity, and quality or revenue impact.",
    result:
      "Teams work from a prioritized queue that protects timing-sensitive interventions and reduces lost revenue.",
    demoLabel: "Prioritize demo",
    demoMeta: "Ranked task queue",
    demoLines: ["Urgency + deadline scoring", "Assigned coordinator queue", "Quality and revenue impact"],
    Icon: ListTodo,
  },
  {
    number: "03",
    title: "Execute",
    summary:
      "Even with the right priorities, follow-ups, referrals, and coding still depend on repetitive manual work and fragile institutional memory.",
    detail:
      "Sapiens learns each clinic's workflow patterns and drafts follow-ups, referral pipelines, and coding outputs for a single admin review.",
    result:
      "High-volume execution work is completed faster, more accurately, and in the clinic's own operating style.",
    demoLabel: "Execute demo",
    demoMeta: "Review-ready workflow",
    demoLines: ["Follow-up draft ready", "Referral packet generated", "Coding pending one review"],
    Icon: Sparkles,
  },
] as const;

const demoHref = "mailto:info@sapienshealth.co?subject=Demo%20request";
const inquiryHref = "mailto:info@sapienshealth.co?subject=General%20inquiry";

function SiteWordmark() {
  return (
    <a href="/" className="flex min-w-0 items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#17120d] shadow-[0_10px_22px_rgba(25,16,8,0.12)]">
        <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
      </div>
      <div className="font-wordmark truncate text-white">Sapiens Health</div>
    </a>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/10 pt-10 sm:pt-12">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#17120d] shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
              <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-wordmark text-white">Sapiens Health</div>
              <div className="mt-1 text-sm text-white/46">AI-native execution layer for primary care</div>
            </div>
          </div>
          <p className="mt-5 max-w-[30rem] text-[0.98rem] leading-8 text-white/58">
            Sapiens Health turns fragmented patient data into completed clinical workflows.
          </p>
        </div>

        <div>
          <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/38">Navigation</div>
          <div className="mt-5 space-y-4 text-[1rem] text-white/70">
            <a href="#how-it-works" className="block transition hover:text-white">
              How it works
            </a>
            <a href="#contact" className="block transition hover:text-white">
              Contact
            </a>
            <a href="/about" className="block transition hover:text-white">
              About
            </a>
          </div>
        </div>

        <div>
          <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/38">Company</div>
          <div className="mt-5 space-y-4 text-[1rem] text-white/70">
            <a href={demoHref} className="block transition hover:text-white">
              Demo
            </a>
            <a href={inquiryHref} className="block transition hover:text-white">
              General inquiry
            </a>
            <a href="/privacy" className="block transition hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="block transition hover:text-white">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(189,166,255,0.18),transparent_24%),linear-gradient(180deg,#110d1d_0%,#151124_52%,#0f0b19_100%)]" />
        <div className="absolute left-[-8rem] top-[14rem] h-[30rem] w-[30rem] rounded-full bg-[#a88dff]/12 blur-3xl" />
      </div>

      <header className="relative z-30 px-4 pb-4 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between px-0 py-1 sm:px-1">
          <SiteWordmark />

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8 text-sm text-white">
              <a href="#how-it-works" className="transition hover:text-white">
                How it works
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </nav>
            <a
              href={demoHref}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white transition hover:bg-white/6"
            >
              Demo →
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-[1480px] py-6 sm:py-8 lg:py-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:items-center lg:gap-8">
            <div className="max-w-[40rem]">
              <h1 className="max-w-[15ch] font-display text-[1.8rem] font-semibold leading-[1.01] tracking-[-0.05em] text-white sm:max-w-[18ch] sm:text-[2.28rem] lg:max-w-[21ch] lg:text-[2.74rem]">
                <span className="block sm:whitespace-nowrap">AI-Native <span className="text-[#c8b7ff]">Executive Assistant</span></span>
                <span className="mt-1 block">for Primary Care</span>
              </h1>

              <p className="mt-6 max-w-[34rem] text-[1.04rem] leading-8 text-white/66 sm:text-[1.1rem]">
                Sapiens Health builds intelligent AI-native care execution layer for primary care clinics.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={demoHref}
                  className="inline-flex items-center justify-center rounded-full border border-[#6a58a7] bg-[#4e3f7c] px-6 py-3 text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#423468]"
                >
                  Demo →
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-[#53437e] bg-transparent px-6 py-3 text-base font-medium text-white/82 transition duration-300 hover:border-[#6a58a7] hover:bg-white/5 hover:text-white"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative lg:mt-8 lg:max-w-[41rem] lg:justify-self-end xl:mt-10">
              <div className="hero-cutout-shell relative min-h-[20rem] sm:min-h-[22rem] lg:min-h-[26rem]">
                <div className="hero-cutout-glow hero-cutout-glow-a" />
                <div className="hero-cutout-glow hero-cutout-glow-b" />
                <div className="hero-cutout-frame">
                  <img
                    src={heroTransparentGraphic}
                    alt="Doctor using Sapiens Health care execution interface"
                    className="hero-cutout-image relative z-10 ml-auto w-full max-w-[33rem] object-contain"
                  />
                </div>
                <div className="hero-assist-stack" aria-hidden="true">
                  <div className="hero-assist-card hero-assist-card-one">Connect</div>
                  <div className="hero-assist-card hero-assist-card-two">Prioritize</div>
                  <div className="hero-assist-card hero-assist-card-three">Execute</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto mt-10 w-full max-w-[1480px] px-0 py-6 sm:py-8 lg:py-10">
          <div className="max-w-[68rem]">
            <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/42">How it Works</div>
            <h2 className="mt-4 max-w-[13ch] font-display text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.7rem]">
              Three steps. One execution layer.
            </h2>
            <p className="mt-5 max-w-[62rem] text-[1rem] leading-8 text-white/62 sm:text-[1.04rem]">
              Sapiens Health builds an AI-native execution layer with three steps — Connect, Prioritize, and Execute — that turns fragmented patient data into completed clinical workflows.
            </p>
          </div>

          <div className="mt-12 space-y-10 lg:space-y-12">
            {steps.map((step) => {
              const { Icon } = step;
              return (
                <article
                  key={step.number}
                  className="grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-10 lg:pt-10"
                >
                  <div className="max-w-[44rem]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold tracking-[0.24em] text-white/38">{step.number}</div>
                        <h3 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] text-white sm:text-[2.25rem]">
                          {step.title}.
                        </h3>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-white/76">
                        <Icon className="h-6 w-6" strokeWidth={1.6} />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4 text-[1rem] leading-8 text-white/74">
                      <p>{step.summary}</p>
                      <p>{step.detail}</p>
                      <p className="text-white/92">Result: {step.result}</p>
                    </div>
                  </div>

                  <div className="lg:pl-4">
                    <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">{step.demoLabel}</div>
                          <div className="mt-2 text-lg font-medium tracking-[-0.03em] text-white">{step.demoMeta}</div>
                        </div>
                        <div className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] uppercase tracking-[0.2em] text-white/42">
                          Placeholder
                        </div>
                      </div>

                      <div className="mt-6 rounded-[1.35rem] border border-dashed border-white/12 bg-black/10 p-4">
                        <div className="grid gap-3">
                          {step.demoLines.map((line) => (
                            <div key={line} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/72">
                              {line}
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 rounded-2xl border border-white/8 bg-[#120d1d] px-4 py-5 text-sm leading-7 text-white/40">
                          Demo surface reserved for product walkthrough, workflow preview, or UI capture.
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="mx-auto mt-14 w-full max-w-[1480px] px-0 pb-10 pt-8 sm:pb-12 sm:pt-10 lg:pb-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div>
              <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/38">Contact</div>
              <h2 className="mt-4 max-w-[11ch] font-display text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3rem] lg:text-[3.3rem]">
                Built for teams that need care execution.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <a
                href={demoHref}
                className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/[0.06] px-6 py-3.5 text-base font-medium text-white transition hover:bg-white/[0.1]"
              >
                Demo →
              </a>
              <a
                href={inquiryHref}
                className="inline-flex items-center justify-center rounded-full border border-white/12 px-6 py-3.5 text-base font-medium text-white/78 transition hover:border-white/20 hover:text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                General Inquiry
              </a>
            </div>
          </div>

          <div className="mt-12 sm:mt-14">
            <SiteFooter />
          </div>
        </section>
      </main>
    </div>
  );
}
