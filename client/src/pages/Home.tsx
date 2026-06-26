import { useState, useEffect, Fragment } from "react";
import { FileStack, ListTodo, LogIn, Sparkles } from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const heroGraphic = "/hero-cropped.png";

const notifications = [
  { tag: "Referral", text: "Referral for Sarah K. is ready for your review, Dr. Chen." },
  { tag: "Completed", text: "Visit summary for John M. has been completed and filed." },
  { tag: "Lab Results", text: "Lab results for Patient #2847 flagged — lipid panel elevated." },
  { tag: "Follow-up", text: "Follow-up plan for Maria L. sent via SMS successfully." },
  { tag: "Auth", text: "Prior authorization for Dr. Park's patient approved." },
  { tag: "Intake", text: "New call intake for Robert S. organized into workflow." },
];

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

const stats = [
  { label: "AI Trained On", value: "Clinical Reality" },
  { label: "Built For", value: "Clinic's Workflow" },
  { label: "Connected To", value: "Any EMR/EHR" },
  { label: "Security", value: "HIPAA Compliant" },
];

const demoHref = "mailto:info@sapienshealth.co?subject=Demo%20request";

function NotificationCard() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % notifications.length);
        setVisible(true);
      }, 350);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const n = notifications[idx];

  return (
    <div className="rounded-b-2xl border border-t-0 border-[#0d1b4d]/12 bg-white px-5 py-4 shadow-[0_8px_24px_rgba(13,27,77,0.08)]">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-bold text-[#0d1b4d]">Sapiens Health</span>
        <span
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
          className="rounded-full bg-[#5b3fa0]/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-[#5b3fa0]"
        >
          {n.tag}
        </span>
      </div>
      <p
        className="text-sm text-[#0d1b4d]/60"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {n.text}
      </p>
    </div>
  );
}

function SiteWordmark() {
  return (
    <a href="/" className="flex items-center gap-3">
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-2xl shadow-md">
        <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
      </div>
      <span
        className="text-[#0d1b4d]"
        style={{
          fontFamily: '"Instrument Sans", "Manrope", sans-serif',
          fontSize: "1.18rem",
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        Sapiens Health
      </span>
    </a>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#0d1b4d]/10 py-10">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-xl shadow-md">
            <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
          </div>
          <span
            className="text-[#0d1b4d]"
            style={{ fontFamily: '"Instrument Sans", "Manrope", sans-serif', fontWeight: 700 }}
          >
            Sapiens Health
          </span>
        </div>
        <p className="text-sm text-[#0d1b4d]/40">© 2026 Sapiens Health. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#0d1b4d]/55">
          <a href="/terms" className="transition hover:text-[#0d1b4d]">Terms</a>
          <a href="/privacy" className="transition hover:text-[#0d1b4d]">Privacy</a>
          <a href="/login" className="transition hover:text-[#0d1b4d]">Sign In</a>
          <a href="#contact" className="transition hover:text-[#0d1b4d]">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden text-[#0d1b4d]"
      style={{ background: "linear-gradient(150deg, #f2eefb 0%, #ece6f8 50%, #eee9f9 100%)" }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="py-5">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-10 sm:px-20 lg:px-40">
          <SiteWordmark />
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0d1b4d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a2d6b]"
          >
            <LogIn className="h-4 w-4" />
            Login
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="pb-20 pt-12 lg:pt-[67px]">
          <div className="mx-auto w-full max-w-[1480px] px-10 sm:px-20 lg:px-40">
            <div className="grid gap-4 lg:grid-cols-[2fr_1.4fr] lg:items-stretch">
              {/* Left — vertically centered against hero image */}
              <div className="flex h-full flex-col justify-center">
                <h1
                  className="font-bold leading-[1.04] tracking-[-0.03em] text-[#0d1b4d]"
                  style={{
                    fontFamily: '"Instrument Sans", "Manrope", sans-serif',
                    fontSize: "clamp(1.8rem, 2.9vw, 3.24rem)",
                  }}
                >
                  AI-Native
                  <br />
                  <span className="text-[#5b3fa0]">Medical Assistant</span>
                  <br />
                  for Primary Care.
                </h1>

                <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-[1.75] text-[#0d1b4d]/58">
                  Sapiens Health builds AI-native medical assistants that connect
                  fragmented data, organize into workflow, and execute tasks.
                </p>

                <div className="mt-8">
                  <a
                    href={demoHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0d1b4d] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#1a2d6b]"
                  >
                    Book a Demo →
                  </a>
                </div>
              </div>

              {/* Right: image + animated notification */}
              <div className="flex flex-col">
                <div className="overflow-hidden rounded-2xl border border-[#0d1b4d]/12 shadow-[0_8px_40px_rgba(13,27,77,0.12)]">
                  <img
                    src={heroGraphic}
                    alt="Doctor using Sapiens Health AI assistant"
                    className="block w-full object-cover"
                  />
                </div>
                <NotificationCard />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ──────────────────────────────────────── */}
        <div className="border-t border-[#0d1b4d]/10">
          <div className="mx-auto max-w-[1480px] px-10 sm:px-20 lg:px-40">
            <div className="flex items-center">
              {stats.map((stat, i) => (
                <Fragment key={stat.label}>
                  <div className="flex-1 py-9 text-center">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#0d1b4d]/40">
                      {stat.label}
                    </div>
                    <div
                      className="mt-1.5 font-bold text-[#0d1b4d]"
                      style={{
                        fontFamily: '"Instrument Sans", "Manrope", sans-serif',
                        fontSize: "clamp(0.95rem, 1.6vw, 1.4rem)",
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="h-9 w-px shrink-0 bg-[#0d1b4d]/15" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ── How It Works ───────────────────────────────────── */}
        <section
          id="how-it-works"
          className="mx-auto mt-6 w-full max-w-[1480px] px-10 py-10 sm:px-20 lg:px-40"
        >
          <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#0d1b4d]/45">
            How It Works
          </h2>
          <div className="mt-10 space-y-0">
            {steps.map(step => {
              const { Icon } = step;
              return (
                <article
                  key={step.number}
                  className="flex items-center gap-6 border-t border-[#0d1b4d]/10 py-7 lg:gap-10"
                >
                  <div className="w-8 shrink-0 text-sm font-semibold tracking-[0.24em] text-[#0d1b4d]/30">
                    {step.number}
                  </div>
                  <div className="shrink-0 rounded-xl border border-[#0d1b4d]/10 bg-[#0d1b4d]/[0.04] p-2.5 text-[#0d1b4d]/55">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[#0d1b4d] sm:text-[1.55rem]">
                      <span className="text-[#5b3fa0]">{step.colored}</span>
                      {step.rest}
                    </h3>
                    <p className="max-w-[42rem] text-[0.93rem] leading-7 text-[#0d1b4d]/50">
                      {step.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Use Cases ──────────────────────────────────────── */}
        <section
          id="use-cases"
          className="mx-auto w-full max-w-[1480px] px-10 py-6 sm:px-20 lg:px-40"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <h2 className="shrink-0 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#0d1b4d]/45">
              Use Cases
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Lab Tests",
                "Patient Followups",
                "Referrals",
                "Visit Summaries",
                "History Trackings",
                "Call Intakes",
              ].map(label => (
                <button
                  key={label}
                  className="rounded-full border border-[#0d1b4d]/14 bg-[#0d1b4d]/[0.04] px-5 py-2 text-sm font-medium text-[#0d1b4d]/65 transition hover:border-[#0d1b4d]/25 hover:bg-[#0d1b4d]/[0.08] hover:text-[#0d1b4d]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────── */}
        <section
          id="contact"
          className="mx-auto mt-14 w-full max-w-[1480px] px-10 pb-10 pt-8 sm:px-20 lg:px-40"
        >
          <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#0d1b4d]/45">
            Contact
          </h2>
          <p
            className="mt-5 max-w-[18ch] font-bold leading-[1.05] tracking-[-0.04em] text-[#0d1b4d]"
            style={{
              fontFamily: '"Instrument Sans", "Manrope", sans-serif',
              fontSize: "clamp(1.8rem, 3vw, 2.74rem)",
            }}
          >
            Try out <span className="text-[#5b3fa0]">Sapiens Health</span>
            <span className="block">on your clinic.</span>
          </p>
          <a
            href={demoHref}
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#0d1b4d] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#1a2d6b]"
          >
            Book a demo
          </a>
          <div className="mt-16 sm:mt-20">
            <SiteFooter />
          </div>
        </section>
      </main>
    </div>
  );
}
