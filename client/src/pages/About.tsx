/*
Design philosophy for this page: Keep the same dark editorial healthcare software language as the homepage.
This page should strengthen company credibility for external reviewers with concrete, restrained public-facing content.
*/
import { ArrowLeft, ArrowRight, Building2, Mail, Sparkles } from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const evaluationHref =
  "mailto:info@sapienshealth.co?subject=Request%20evaluation";

const aboutBlocks = [
  {
    title: "What we are building",
    text: "Sapiens Health is building MedMIX to generate clinical outcome and workflow signals from multimodal patient data, including situations where not every modality is present.",
    icon: Sparkles,
  },
  {
    title: "Who it is for",
    text: "The product framing is designed for care teams, research collaborators, digital health partners, and translational settings that need usable signal from incomplete real-world clinical context.",
    icon: Building2,
  },
  {
    title: "How to engage",
    text: "The public site is meant to support initial evaluation requests, partnership conversations, and general company inquiries through a single direct contact path.",
    icon: Mail,
  },
];

export default function About() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(133,102,255,0.14),transparent_20%),radial-gradient(circle_at_88%_14%,rgba(64,212,255,0.08),transparent_18%),linear-gradient(180deg,#06050d_0%,#0a0915_45%,#07060e_100%)]" />
      </div>

      <header className="relative z-20 px-4 pb-6 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
              <img
                src={logoUrl}
                alt="Sapiens Health logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="font-wordmark truncate text-white/96">
              Sapiens Health
            </div>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/68 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-20 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-[1200px] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,11,23,0.92),rgba(9,8,18,0.98))] p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_60px_160px_rgba(0,0,0,0.52)] sm:p-10 lg:p-12">
          <div className="section-kicker">About</div>
          <h1 className="font-display mt-4 max-w-[12ch] text-[2.6rem] font-semibold tracking-[-0.07em] text-white sm:text-[3.2rem] lg:text-[3.7rem] lg:leading-[0.95]">
            Sapiens Health at a glance.
          </h1>
          <p className="mt-5 max-w-[42rem] text-base leading-8 text-white/68 sm:text-[1.05rem]">
            This public-facing website is designed to explain the company
            clearly, show where MedMIX fits, and provide a direct path for
            evaluation and partnership outreach.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {aboutBlocks.map(block => {
              const Icon = block.icon;
              return (
                <article
                  key={block.title}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(126,92,255,0.16),rgba(255,255,255,0.03))]">
                    <Icon className="h-5 w-5 text-[#d8cbff]" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-white">
                    {block.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/66">
                    {block.text}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="section-kicker text-white/40">
                Company context
              </div>
              <p className="mt-4 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                The current product narrative centers on multimodal clinical
                prediction for incomplete data settings. The website emphasizes
                hospital operations support, reviewable signals, and
                translational workflow relevance so external reviewers can
                understand the product frame quickly.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                Supported-by logos, company contact details, and legal pages are
                included to make the site feel more like a live operating
                company website rather than an early placeholder.
              </p>
            </article>

            <article className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,14,34,0.72),rgba(9,8,19,0.9))] p-6">
              <div className="section-kicker text-white/40">Contact</div>
              <div className="mt-4 space-y-4 text-sm leading-6 text-white/68">
                <p>
                  <span className="text-white/92">Email:</span>{" "}
                  info@sapienshealth.co
                </p>
                <p>
                  <span className="text-white/92">Headquarters:</span> Houston,
                  TX
                </p>
                <a
                  href={evaluationHref}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-5 py-3 text-sm font-semibold text-[#080612] shadow-[0_18px_44px_rgba(145,118,255,0.34)] transition hover:-translate-y-0.5"
                >
                  Request evaluation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
