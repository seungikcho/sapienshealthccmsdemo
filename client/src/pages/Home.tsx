/*
Design philosophy for this page: A stripped-down healthcare AI landing page inspired by Beacon-style clarity.
This file should use fewer words, keep only the product core, and rely on one strong hospital graphic plus
simple workflow cards to explain the product.
*/
import { FileStack, ListTodo, LogIn, Mail, Sparkles, BrainCircuit, ShieldCheck, FlaskConical } from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const heroTransparentGraphic = "/hero-clean.png";

const steps = [
  {
    number: "01",
    colored: "Connect",
    rest: " Fragmented Data",
    Icon: FileStack,
    desc: "Paperworks, daily task templates, are scattered across systems, and operation manuals are just in head. AI pulls them into one place to build the full context of a patient.",
  },
  {
    number: "02",
    colored: "Organize",
    rest: " Into Workflow",
    Icon: ListTodo,
    desc: "The AI surfaces relevant data for each task, reasons over it, and structures the insights a physician needs to act with confidence.",
  },
  {
    number: "03",
    colored: "Execute",
    rest: " Task Items",
    Icon: Sparkles,
    desc: "The AI delivers the output — a referral, a visit summary, a follow-up plan. The physician reviews and approves, with no administrative burden.",
  },
];

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
    <footer className="border-t border-white/10 py-10 sm:py-12">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#17120d] shadow-[0_10px_24px_rgba(0,0,0,0.4)]">
            <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
          </div>
          <span className="font-wordmark text-white">Sapiens Health</span>
        </div>
        <p className="text-sm text-white/38">© 2026 Sapiens Health. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/55">
          <a href="/terms" className="transition hover:text-white">Terms</a>
          <a href="/privacy" className="transition hover:text-white">Privacy</a>
          <a href="/patients" className="transition hover:text-white">Sign In</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
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

      <header className="relative z-30 px-8 pb-14 pt-5 sm:px-14 lg:px-24">
        <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between px-0 py-1 sm:px-1">
          <SiteWordmark />

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8 text-sm text-white/70">
              <a href="#how-it-works" className="transition hover:text-white">
                How it works
              </a>
              <a href="#use-cases" className="transition hover:text-white">
                Use Cases
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </nav>
            <a
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c8b7ff] px-4 py-2 text-sm font-semibold text-[#17120d] transition hover:-translate-y-0.5 hover:bg-[#d6caff]"
            >
              <LogIn className="h-4 w-4" />
              Login
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-8 pb-24 sm:px-14 lg:px-24">
        <section className="mx-auto w-full max-w-[1480px] pb-6 pt-9 sm:pb-8 sm:pt-12 lg:pb-10 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:items-stretch lg:gap-8">
            <div className="flex max-w-[40rem] flex-col">
              <h1 className="max-w-[15ch] font-display text-[1.8rem] font-semibold leading-[1.01] tracking-[-0.05em] text-white sm:max-w-[18ch] sm:text-[2.28rem] lg:max-w-[21ch] lg:text-[2.74rem]">
                <span className="block sm:whitespace-nowrap">AI-Native <span className="text-[#c8b7ff]">Medical Assistant</span></span>
                <span className="mt-1 block">for Primary Care</span>
              </h1>

              <p className="mt-6 max-w-[34rem] text-[1.04rem] leading-8 text-white/66 sm:text-[1.1rem]">
                Sapiens Health builds AI-native medical assistants that connect fragmented data, organize into workflow, and execute tasks.
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

              {/* Trust pills */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {[
                  { Icon: FlaskConical, label: "Trained on", value: "Clinical Reality" },
                  { Icon: BrainCircuit, label: "Healthcare-Specific", value: "AI Reasoning" },
                  { Icon: ShieldCheck, label: "Privacy & Compliance", value: "HIPAA · GDPR" },
                ].map(({ Icon, label, value }) => (
                  <div
                    key={value}
                    className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[#c8b7ff]">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[0.62rem] font-medium tracking-wide text-white/38 uppercase">{label}</div>
                      <div className="text-[0.8rem] font-semibold text-white/80">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex lg:justify-self-end" style={{alignSelf: "stretch"}}>
              <div className="hero-bubble-shell relative w-full h-full">
                <div className="hero-cutout-glow hero-cutout-glow-a" />
                <div className="hero-cutout-glow hero-cutout-glow-b" />
                <div className="hero-bubble-frame">
                  <img
                    src={heroTransparentGraphic}
                    alt="Doctor using Sapiens Health care execution interface"
                    className="hero-bubble-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto mt-10 w-full max-w-[1480px] px-0 py-6 sm:py-8 lg:py-10">
          <div className="max-w-[68rem]">
            <h2 className="section-title">
              How It Works
            </h2>
          </div>

          <div className="mt-10 space-y-0">
            {steps.map((step) => {
              const { Icon } = step;
              return (
                <article
                  key={step.number}
                  className="flex items-center gap-6 border-t border-white/10 py-7 lg:gap-10"
                >
                  <div className="text-sm font-semibold tracking-[0.24em] text-white/38 shrink-0 w-8">{step.number}</div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white/76 shrink-0">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[1.35rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.55rem]">
                      <span className="text-[#c8b7ff]">{step.colored}</span>{step.rest}
                    </h3>
                    <p className="max-w-[42rem] text-[0.93rem] leading-7 text-white/44">{step.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="use-cases" className="mx-auto w-full max-w-[1480px] px-0 py-6 sm:py-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <h2 className="section-title shrink-0">
              Use Cases
            </h2>
            <div className="flex flex-wrap gap-3">
              {["Lab Tests", "Patient Followups", "Referrals", "Visit Summaries", "History Trackings", "Call Intakes"].map((label) => (
                <button
                  key={label}
                  className="rounded-full border border-white/14 bg-white/[0.05] px-5 py-2 text-sm font-medium text-white/80 transition hover:border-white/26 hover:bg-white/[0.1] hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto mt-14 w-full max-w-[1480px] px-0 pb-10 pt-8 sm:pb-12 sm:pt-10 lg:pb-16">
          <div>
            <h2 className="section-title">
              Contact
            </h2>
            <p className="mt-5 max-w-[18ch] font-display text-[1.8rem] font-semibold leading-[1.05] tracking-[-0.05em] text-white sm:text-[2.28rem] lg:text-[2.74rem]">
              Try out <span className="text-[#c8b7ff]">Sapiens Health</span>
              <span className="block">on your clinic.</span>
            </p>
            <a
              href={demoHref}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#c8b7ff] px-7 py-3 text-base font-semibold text-[#17120d] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d6caff]"
            >
              Book a demo
            </a>
          </div>

          <div className="mt-16 sm:mt-20">
            <SiteFooter />
          </div>
        </section>
      </main>
    </div>
  );
}
