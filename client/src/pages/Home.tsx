/*
Design philosophy for this page: Refined deep-tech enterprise landing page with a strict product-first hierarchy.
This file should prioritize concise claims, broad whitespace, rounded system cards, and a three-step
Connect → Prioritize → Execute flow based only on the user's provided product text.
*/
import {
  ArrowRight,
  CircleDollarSign,
  Clock3,
  FileStack,
  ListTodo,
  Mail,
  Network,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

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
    name: "NVIDIA Inception Program",
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663318202729/VsfYuRGWGApWwFyj.png",
    className: "h-[1.66rem] w-auto sm:h-8",
  },
  {
    name: "Nucleate",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/logo-nucleate-trans_8bb0c215.png",
    className: "h-8 w-auto sm:h-9",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Connect.",
    description:
      "Parse multimodal patient data across EMRs, emails, referrals, external records, and lab portals into one unified care context with an auto-generated task list.",
    Icon: Network,
    detail: "Unified patient context from fragmented sources.",
  },
  {
    number: "02",
    title: "Prioritize.",
    description:
      "Score and sequence every task by clinical urgency, deadline proximity, and revenue or quality impact so teams know what matters first.",
    Icon: ListTodo,
    detail: "A ranked workflow queue built around timing and impact.",
  },
  {
    number: "03",
    title: "Execute.",
    description:
      "Draft follow-ups, generate referral pipelines, and automate medical coding in each clinic's own workflow style, pending one admin review before sending.",
    Icon: Sparkles,
    detail: "High-volume execution completed accurately in the clinic's own voice.",
  },
] as const;

const painPoints = [
  {
    title: "Execution is the bottleneck.",
    text: "Primary care clinics are now measured on outcomes and care quality, yet critical tasks still go unfinished because execution lives across disconnected systems and manual handoffs.",
  },
  {
    title: "Time-sensitive value is missed quietly.",
    text: "Reimbursement windows close, quality opportunities expire, and teams often work the wrong queue because existing tools surface tasks without meaningful ordering.",
  },
  {
    title: "Administrative work absorbs clinical momentum.",
    text: "Staff spend hours searching emails, portals, and external records instead of acting on the next best care task with complete patient context.",
  },
] as const;

const proofPoints = [
  {
    title: "Complete care context",
    text: "Every day starts with a current patient view assembled from scattered records, messages, and referrals rather than a partial EMR snapshot.",
    Icon: FileStack,
  },
  {
    title: "Ranked workflow action",
    text: "Tasks are ordered by urgency, deadline, and financial or quality impact so valid opportunities are acted on while they still matter.",
    Icon: Clock3,
  },
  {
    title: "Review before send",
    text: "Sapiens executes repetitive work in the institution's own workflow memory, while preserving a single admin review step before final action.",
    Icon: ShieldCheck,
  },
] as const;

const outcomes = [
  {
    title: "More completed care tasks",
    text: "Teams move from searching and sorting to actually closing the workflows that affect patient outcomes.",
    Icon: Waypoints,
  },
  {
    title: "Better timing on reimbursement and quality windows",
    text: "Clinics stop losing value to tasks that were valid yesterday and unreimbursable today.",
    Icon: CircleDollarSign,
  },
  {
    title: "Lower administrative drag",
    text: "High-volume execution work is drafted and prepared in a fraction of the time, with less fragile institutional memory.",
    Icon: Mail,
  },
] as const;

const demoHref = "mailto:info@sapienshealth.co?subject=Demo%20request";
const inquiryHref = "mailto:info@sapienshealth.co?subject=General%20inquiry";

function SiteWordmark() {
  return (
    <a href="/" className="flex min-w-0 items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
        <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
        <div className="font-wordmark truncate text-white/96">Sapiens Health</div>
      </div>
    </a>
  );
}

function Header() {
  return (
    <header className="relative z-30 px-4 pb-6 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-6">
        <SiteWordmark />

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8 text-sm text-white/74">
            <a href="#problem" className="transition hover:text-white">
              Problem
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
            <a href="#outcomes" className="transition hover:text-white">
              Outcomes
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
          <a
            href={demoHref}
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/6"
          >
            Demo →
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroPanel() {
  return (
    <section className="mx-auto w-full max-w-[1520px] overflow-hidden rounded-[2.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,13,26,0.96),rgba(10,9,20,0.98))] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_60px_160px_rgba(0,0,0,0.52)]">
      <div className="grid gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:px-10 lg:py-12">
        <div className="max-w-[39rem]">
          <div className="inline-flex items-center rounded-full border border-[#8f7dff]/25 bg-[linear-gradient(180deg,rgba(126,92,255,0.18),rgba(80,48,160,0.10))] px-4 py-2 text-[0.8rem] font-medium tracking-[0.08em] text-[#e7deff] shadow-[0_8px_30px_rgba(120,80,255,0.18)]">
            AI-native execution layer for primary care
          </div>

          <h1 className="mt-6 max-w-[12ch] font-display text-[3rem] font-semibold leading-[0.94] tracking-[-0.065em] text-white sm:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]">
            Turn fragmented patient data into completed care workflows.
          </h1>

          <p className="mt-6 max-w-[36rem] text-[1.06rem] leading-8 text-white/72 sm:text-[1.14rem]">
            Sapiens Health builds an AI-native execution layer with three steps — connect, prioritize, and execute — that turns fragmented patient data into completed clinical workflows.
          </p>

          <p className="mt-4 max-w-[35rem] text-[0.98rem] leading-7 text-white/56 sm:text-[1.02rem]">
            In value-based care, the missing layer is not intent or analysis. It is execution.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={demoHref}
              className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/[0.055] px-6 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]"
            >
              Demo →
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-6 py-4 text-base font-medium text-white/74 transition duration-300 hover:border-white/18 hover:text-white"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(148,111,255,0.18),transparent_26%),radial-gradient(circle_at_86%_14%,rgba(255,255,255,0.08),transparent_22%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(89,78,140,0.82),rgba(73,63,118,0.82))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_32px_90px_rgba(0,0,0,0.35)] sm:p-5">
            <div className="relative grid gap-3 md:grid-cols-3">
              <div className="pointer-events-none absolute left-1/3 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white/72 xl:block">
                <ArrowRight className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <div className="pointer-events-none absolute left-2/3 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white/72 xl:block">
                <ArrowRight className="h-8 w-8" strokeWidth={1.5} />
              </div>

              {workflowSteps.map((step) => {
                const { Icon } = step;

                return (
                  <article
                    key={step.title}
                    className="relative flex min-h-[338px] flex-col justify-between rounded-[2rem] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="text-3xl font-semibold tracking-[-0.04em] text-white/96">{step.number}</div>
                      <div className="rounded-2xl border border-white/14 bg-black/10 p-3 text-white/78">
                        <Icon className="h-7 w-7" strokeWidth={1.65} />
                      </div>
                    </div>

                    <div className="mt-8">
                      <h2 className="text-[2rem] font-semibold tracking-[-0.055em] text-white sm:text-[2.2rem]">{step.title}</h2>
                      <p className="mt-4 max-w-[20rem] text-[0.98rem] leading-7 text-white/78">{step.description}</p>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4 text-sm leading-6 text-white/56">{step.detail}</div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportStrip() {
  return (
    <section className="mx-auto mt-6 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-white/[0.035] px-5 py-5 shadow-[0_22px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-white/42">Supported by</div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-90 sm:gap-x-10">
          {supportLogos.map((logo) => (
            <img key={logo.name} src={logo.src} alt={`${logo.name} logo`} className={`${logo.className} object-contain`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-[44rem]">
      <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/42">{eyebrow}</div>
      <h2 className="mt-4 max-w-[14ch] font-display text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3rem]">
        {title}
      </h2>
      <p className="mt-5 max-w-[42rem] text-[1rem] leading-8 text-white/68 sm:text-[1.06rem]">{body}</p>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
              <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-wordmark text-white/96">Sapiens Health</div>
              <div className="mt-1 text-sm text-white/48">AI-native execution layer for primary care</div>
            </div>
          </div>
          <p className="mt-4 max-w-[34rem] text-sm leading-7 text-white/62 sm:text-[0.98rem]">
            Sapiens Health turns fragmented patient data into completed clinical workflows by connecting scattered context, prioritizing the highest-value actions, and executing repetitive work with a final admin review step.
          </p>
        </div>

        <div>
          <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/42">Navigation</div>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <a href="#problem" className="block transition hover:text-white">
              Problem
            </a>
            <a href="#how-it-works" className="block transition hover:text-white">
              How it works
            </a>
            <a href="#outcomes" className="block transition hover:text-white">
              Outcomes
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
            <div className="pt-1 text-white/48">Houston, TX</div>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(133,102,255,0.13),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(197,183,255,0.08),transparent_18%),linear-gradient(180deg,#06050d_0%,#090713_52%,#06060d_100%)]" />
        <div className="absolute left-[-8rem] top-[14rem] h-[30rem] w-[30rem] rounded-full bg-[#6f57ff]/10 blur-3xl" />
        <div className="absolute bottom-[8rem] right-[-7rem] h-[26rem] w-[26rem] rounded-full bg-[#c0a8ff]/8 blur-3xl" />
      </div>

      <Header />

      <main className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
        <HeroPanel />
        <SupportStrip />

        <section id="problem" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2.2rem] border border-white/10 bg-white/[0.03] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <SectionHeading
              eyebrow="The bottleneck"
              title="The problem is not data. The problem is execution."
              body="Healthcare is shifting from fee-for-service to value-based care, where revenue is tied to outcomes and quality. Yet the layer that connects fragmented patient data to completed care action still does not exist."
            />

            <div className="grid gap-4 md:grid-cols-3">
              {painPoints.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/64">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,13,25,0.88),rgba(9,9,18,0.94))] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.18)] sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <SectionHeading
              eyebrow="How it works"
              title="Three steps from fragmented context to completed workflow."
              body="Sapiens connects scattered data, prioritizes what actually matters, and executes repetitive work with the institution's own workflow memory."
            />

            <div className="grid gap-4 xl:grid-cols-3">
              {workflowSteps.map((step) => {
                const { Icon } = step;
                return (
                  <article
                    key={step.number}
                    className="rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(96,84,149,0.78),rgba(76,66,121,0.74))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.18)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-3xl font-semibold tracking-[-0.04em] text-white">{step.number}</div>
                      <Icon className="h-8 w-8 text-white/74" strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-12 text-[2rem] font-semibold tracking-[-0.05em] text-white">{step.title}</h3>
                    <p className="mt-4 text-[1rem] leading-8 text-white/82">{step.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 grid w-full max-w-[1520px] gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-8 sm:py-10">
            <SectionHeading
              eyebrow="What the system produces"
              title="A product surface built around action, not just visibility."
              body="Existing workflow agents and care management platforms work inside a single system and act only on the data already there. Sapiens works across sources, builds the missing care context, and carries the workflow all the way to completion."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {proofPoints.map((item) => {
              const { Icon } = item;
              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-white/80">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-5 text-[1.15rem] font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/66">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="outcomes" className="mx-auto mt-8 w-full max-w-[1520px] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,12,23,0.9),rgba(8,8,16,0.95))] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.18)] sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionHeading
              eyebrow="Outcomes"
              title="What changes for the care team."
              body="Execution of care connects patient data to quality outcomes, financial incentives, and operational efficiency. Sapiens is built to own that missing layer."
            />

            <div className="grid gap-4 md:grid-cols-3">
              {outcomes.map((item) => {
                const { Icon } = item;
                return (
                  <article
                    key={item.title}
                    className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-white/78">
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-5 text-[1.15rem] font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/66">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto mt-8 w-full max-w-[1520px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(92,79,148,0.18),rgba(14,12,23,0.94))] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
            <div>
              <div className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-white/48">Start here</div>
              <h2 className="mt-4 max-w-[12ch] font-display text-[2.45rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3.2rem]">
                Bring execution into primary care.
              </h2>
              <p className="mt-5 max-w-[34rem] text-[1rem] leading-8 text-white/70 sm:text-[1.06rem]">
                If fragmented data, missed task windows, and repetitive admin work are slowing your team down, Sapiens Health can help turn that work into a completed workflow system.
              </p>
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
