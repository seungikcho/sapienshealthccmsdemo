/*
Design philosophy for this page: A stripped-down healthcare AI landing page inspired by Beacon-style clarity.
This file should use fewer words, keep only the product core, and rely on one strong hospital graphic plus
simple workflow cards to explain the product.
*/
import { ArrowRight, FileStack, ListTodo, Mail, Sparkles } from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const heroGraphic =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-hospital-hero-v2-aNekoNh4s6oDWSarMqDYVd.webp";

const steps = [
  {
    number: "01",
    title: "Connect",
    text: "Unify fragmented patient data into one care context.",
    Icon: FileStack,
  },
  {
    number: "02",
    title: "Prioritize",
    text: "Rank the next task by urgency, timing, and impact.",
    Icon: ListTodo,
  },
  {
    number: "03",
    title: "Execute",
    text: "Draft and complete repetitive workflows with one final review.",
    Icon: Sparkles,
  },
] as const;

const demoHref = "mailto:info@sapienshealth.co?subject=Demo%20request";
const inquiryHref = "mailto:info@sapienshealth.co?subject=General%20inquiry";

function SiteWordmark() {
  return (
    <a href="/" className="flex min-w-0 items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#e5ddd3] bg-[#17120d] shadow-[0_10px_22px_rgba(25,16,8,0.12)]">
        <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
      </div>
      <div className="font-wordmark truncate text-[#17120d]">Sapiens Health</div>
    </a>
  );
}

function SiteFooter() {
  return (
    <footer className="mx-auto mt-8 w-full max-w-[1440px] rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
              <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-wordmark text-white/96">Sapiens Health</div>
              <div className="mt-1 text-sm text-white/46">AI-native execution layer for primary care</div>
            </div>
          </div>
          <p className="mt-4 max-w-[32rem] text-sm leading-7 text-white/60 sm:text-[0.98rem]">
            Sapiens Health turns fragmented patient data into completed clinical workflows.
          </p>
        </div>

        <div>
          <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/42">Navigation</div>
          <div className="mt-4 space-y-3 text-sm text-white/70">
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
          <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/42">Company</div>
          <div className="mt-4 space-y-3 text-sm text-white/70">
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

      <header className="relative z-30 px-4 pb-6 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between rounded-full border border-[#3e345a] bg-[#f3edff] px-4 py-3 shadow-[0_12px_35px_rgba(15,10,28,0.08)] sm:px-6">
          <SiteWordmark />

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8 text-sm text-[#6d635a]">
              <a href="#how-it-works" className="transition hover:text-[#17120d]">
                How it works
              </a>
              <a href="#contact" className="transition hover:text-[#17120d]">
                Contact
              </a>
            </nav>
            <a
              href={demoHref}
              className="inline-flex items-center justify-center rounded-full border border-[#d9cfc3] px-5 py-2.5 text-sm font-medium text-[#17120d] transition hover:bg-[#f5efe8]"
            >
              Demo →
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2.3rem] border border-[#4c3f72] bg-[linear-gradient(180deg,#eee6ff_0%,#e8ddff_100%)] shadow-[0_30px_90px_rgba(16,11,31,0.18)]">
          <div className="grid gap-12 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:px-10 lg:py-10">
            <div className="max-w-[34rem]">
              <h1 className="max-w-[11.6ch] font-display text-[2.45rem] font-semibold leading-[0.96] tracking-[-0.055em] text-[#1a1330] sm:text-[3.2rem] lg:text-[3.75rem]">
                AI-Native Care Execution Layer for Healthcare
              </h1>

              <p className="mt-6 max-w-[34rem] text-[1.04rem] leading-8 text-[#51486a] sm:text-[1.1rem]">
                Sapiens Health builds intelligent AI-native care execution layer for primary care clinics.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={demoHref}
                  className="inline-flex items-center justify-center rounded-full border border-[#3e345a] bg-[#2f2648] px-6 py-3.5 text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#241c3a]"
                >
                  Demo →
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-[#c8b9f1] bg-[#f6f1ff] px-6 py-3.5 text-base font-medium text-[#2f2648] transition duration-300 hover:border-[#b8a5ea] hover:bg-[#efe7ff]"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(168,141,255,0.16),transparent_24%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-[#d2c3fb] bg-[#fbf8ff] p-3 shadow-[0_28px_70px_rgba(39,25,77,0.14)]">
                <img
                  src={heroGraphic}
                  alt="Sapiens Health care execution interface"
                  className="h-full w-full rounded-[1.6rem] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto mt-8 w-full max-w-[1440px] rounded-[2.2rem] border border-white/10 bg-white/[0.03] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-8 sm:py-10 lg:px-10">
          <div className="max-w-[36rem]">
            <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/42">How it works</div>
            <h2 className="mt-4 max-w-[12ch] font-display text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3rem]">
              Three steps. One execution layer.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
            {steps.map((step, index) => {
              const { Icon } = step;
              return (
                <>
                  <article
                    key={step.number}
                    className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(94,82,148,0.78),rgba(75,66,120,0.74))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-3xl font-semibold tracking-[-0.04em] text-white">{step.number}</div>
                      <div className="rounded-2xl border border-white/14 bg-black/10 p-3 text-white/80">
                        <Icon className="h-6 w-6" strokeWidth={1.6} />
                      </div>
                    </div>
                    <h3 className="mt-12 text-[2rem] font-semibold tracking-[-0.05em] text-white">{step.title}.</h3>
                    <p className="mt-4 max-w-[18rem] text-[1rem] leading-8 text-white/82">{step.text}</p>
                  </article>

                  {index < steps.length - 1 ? (
                    <div key={`${step.number}-arrow`} className="hidden items-center justify-center text-white/56 lg:flex">
                      <ArrowRight className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                  ) : null}
                </>
              );
            })}
          </div>
        </section>

        <section id="contact" className="mx-auto mt-8 w-full max-w-[1440px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(92,79,148,0.14),rgba(14,12,23,0.94))] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/48">Contact</div>
              <h2 className="mt-4 max-w-[12ch] font-display text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3rem]">
                Built for teams that need care execution.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <a
                href={demoHref}
                className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/[0.08] px-6 py-4 text-base font-semibold text-white transition hover:bg-white/[0.11]"
              >
                Demo →
              </a>
              <a
                href={inquiryHref}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-6 py-4 text-base font-medium text-white/76 transition hover:border-white/18 hover:text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                General Inquiry
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
