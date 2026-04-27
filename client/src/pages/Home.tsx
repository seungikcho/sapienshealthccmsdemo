/*
 * Style reminder: Swiss-modern editorial deep-tech with clearer company branding.
 * The site should feel venture-backed, precise, and product-oriented rather than academic.
 * Use the new black S-delta logo, stronger data-fusion visuals, and restrained copy.
 */
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Binary,
  Building2,
  Database,
  FlaskConical,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";
const fusionHeroUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-fusion-hero-HE5xYMZFVGom4Xs5X7cNpr.webp?Expires=1807943488&Signature=dGAdkPdSji0ze1WelB-eCHI7UE-Ef5~sDnrycLOxbfmD3cti-Wvk9SJgZGV1rcJ--EWpxVzCGyMXK1elTYjkoYBi9iXvK~N3j09eDoiTJaiRb7L33oOkcz4pYBW7AANLF5M0XqCHlbIorV7W49uZI5kMMbKYEOVkEis9xkzU81av5bIiuOLfVDibUTePYsa61KrcOKZWPblQfJ3vxAjqhpbDJuAAAqQg2EtEWgncIJKKS4ZoGX0DfWe2bAwQz0EhtyNhNjc7fAeCRfGbF6cyf2UzLZqghtC2C-KNFME3M5n70uvXiqbmMRD6SLYr8JJir-UT3hRBSiskkKlPJc~DMw__&Key-Pair-Id=K1MP89RTKNH4J";

const pillars = [
  {
    title: "Hospital operation support",
    copy:
      "Turn fragmented notes, imaging, waveform, and structured data into workflow-ready signal for patient flow, escalation, and discharge decisions.",
    icon: Building2,
  },
  {
    title: "Clinical trial support",
    copy:
      "Expand screening beyond rigid rule-based filters by scoring incomplete multimodal records for trial-fit probability.",
    icon: FlaskConical,
  },
];

const inputs = [
  { title: "Clinical notes", icon: FileText, accent: "from-[#d7efe7] to-[#edf6f2]" },
  { title: "Imaging", icon: ImageIcon, accent: "from-[#dfe6f4] to-[#eef2fb]" },
  { title: "ECG / waveform", icon: Activity, accent: "from-[#152744] to-[#213b63]" },
  { title: "Structured EHR", icon: Database, accent: "from-[#e5e8ef] to-[#f3f5f8]" },
];

const principles = [
  "Handles missing modalities as a normal operating condition.",
  "Designed as infrastructure, not another dashboard layer.",
  "Built for deployment in real hospital and trial workflows.",
];

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-[#f5f1e8] text-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_20%_10%,rgba(165,196,199,0.22),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(31,45,68,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(245,241,232,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.018)_1px,transparent_1px)] bg-[size:88px_88px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(245,241,232,0.84)] backdrop-blur-xl">
        <div className="container flex items-center justify-between py-5">
          <a href="#top" className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#111111] shadow-[0_18px_34px_rgba(15,23,42,0.18)] ring-1 ring-black/8">
              <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Sapiens Health
              </div>
              <div className="text-sm text-slate-700">Multimodal clinical intelligence</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#platform" className="transition-colors hover:text-slate-950">
              Platform
            </a>
            <a href="#applications" className="transition-colors hover:text-slate-950">
              Applications
            </a>
            <a href="#research" className="transition-colors hover:text-slate-950">
              Research
            </a>
            <a href="#contact" className="transition-colors hover:text-slate-950">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]"
          >
            Talk to us
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="container pb-14 pt-10 md:pt-16 lg:pb-20 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.05fr)] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-teal-600" />
                Company overview
              </div>

              <h1 className="font-[Instrument_Serif] text-[3.8rem] leading-[0.9] tracking-[-0.05em] text-slate-950 sm:text-[4.7rem] lg:text-[6.2rem]">
                Intelligence infrastructure for hospitals and trials.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Sapiens Health turns incomplete multimodal clinical data into decision-ready
                signal. We fuse notes, imaging, waveform, and structured records into one
                operating layer for real healthcare workflows.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
                <a
                  href="#applications"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_22px_42px_rgba(15,23,42,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Explore applications
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#platform"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400"
                >
                  See how fusion works
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                {principles.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-black/6 bg-white/72 px-4 py-4 text-sm leading-6 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-[#10161f] p-3 shadow-[0_34px_100px_rgba(15,23,42,0.22)]">
                <img
                  src={fusionHeroUrl}
                  alt="Multimodal clinical data streams converging into a unified intelligence layer"
                  className="h-[24rem] w-full rounded-[1.7rem] object-cover md:h-[34rem]"
                />

                <div className="pointer-events-none absolute inset-x-5 bottom-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.35rem] border border-white/12 bg-[rgba(9,15,22,0.68)] p-5 text-white backdrop-blur-xl">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-300">
                      Data fusion
                    </div>
                    <div className="mt-2 text-xl font-semibold">Multiple inputs. One operating signal.</div>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/70 bg-[rgba(248,248,245,0.90)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
                      Core use cases
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-950">
                      Hospital operations and clinical trial support
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="platform" className="container py-8 md:py-14">
          <div className="grid gap-10 rounded-[2.4rem] border border-black/8 bg-white/60 px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:px-10">
            <div className="max-w-xl self-center">
              <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                <span className="h-px w-8 bg-slate-300" />
                Platform
              </div>
              <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
                Designed to fuse the data hospitals actually have.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Real clinical environments rarely offer complete patient records. Our platform is
                built to combine uneven multimodal inputs into one scored decision layer instead of
                discarding incomplete cases.
              </p>
            </div>

            <div className="relative rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#fbfaf7_0%,#eff5f4_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="grid gap-4 md:grid-cols-2">
                {inputs.map(({ title, icon: Icon, accent }, index) => (
                  <div
                    key={title}
                    className={`relative rounded-[1.6rem] border border-black/6 bg-gradient-to-br ${accent} p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ${index === 2 ? "text-white" : "text-slate-900"}`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-slate-900 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-5 text-lg font-semibold">{title}</div>
                  </div>
                ))}
              </div>

              <div className="relative mt-8 flex justify-center">
                <div className="absolute left-[14%] top-[-2.6rem] h-24 w-px bg-gradient-to-b from-transparent via-slate-400/40 to-transparent md:left-[24%]" />
                <div className="absolute right-[14%] top-[-2.6rem] h-24 w-px bg-gradient-to-b from-transparent via-slate-400/40 to-transparent md:right-[24%]" />
                <div className="absolute left-1/2 top-[-1.2rem] h-10 w-[72%] -translate-x-1/2 rounded-full border border-dashed border-slate-400/35" />
                <div className="absolute left-[24%] top-[-1.9rem] h-[5.2rem] w-[22%] rounded-b-[999px] border-b border-l border-slate-400/30" />
                <div className="absolute right-[24%] top-[-1.9rem] h-[5.2rem] w-[22%] rounded-b-[999px] border-b border-r border-slate-400/30" />

                <div className="relative w-full max-w-[23rem] overflow-hidden rounded-[1.8rem] border border-slate-900/8 bg-[#111827] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.20)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(94,234,212,0.20),transparent_34%),radial-gradient(circle_at_50%_82%,rgba(148,163,184,0.16),transparent_32%)]" />
                  <div className="relative flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-slate-300">
                    <Binary className="h-4 w-4" />
                    Fusion engine
                  </div>
                  <div className="relative mt-4 font-[Instrument_Serif] text-3xl tracking-[-0.03em] text-white">
                    One unified scoring layer
                  </div>
                  <p className="relative mt-4 text-sm leading-7 text-slate-300">
                    Weighted multimodal signal for operational support and trial-fit screening.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="applications" className="container py-10 md:py-14">
          <div className="mb-8 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
              <span className="h-px w-8 bg-slate-300" />
              Applications
            </div>
            <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
              Built around two high-value workflows.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map(({ title, copy, icon: Icon }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`rounded-[2rem] border p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${
                  index === 0
                    ? "border-black/7 bg-white/78"
                    : "border-slate-900/8 bg-[#111827] text-white"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    index === 0 ? "bg-slate-950 text-white" : "bg-white/10 text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{title}</h3>
                <p className={`mt-4 text-sm leading-7 ${index === 0 ? "text-slate-600" : "text-slate-300"}`}>
                  {copy}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="research" className="container py-10 md:py-14">
          <div className="grid gap-8 rounded-[2.2rem] border border-black/8 bg-[linear-gradient(135deg,#0f1728_0%,#13253b_58%,#1a334e_100%)] px-6 py-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10">
            <div className="max-w-xl self-center">
              <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-300">
                <span className="h-px w-8 bg-white/30" />
                Research
              </div>
              <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] md:text-5xl">
                Research-backed. Deployment-minded.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                The platform direction is grounded in MedMIX: multimodal fusion designed to remain
                useful when patient data is incomplete, sparse, or uneven across modalities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Missing-modality robustness",
                "Multimodal fusion architecture",
                "Real workflow deployment intent",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-slate-200 backdrop-blur-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="container pb-18 pt-10 md:pb-20 md:pt-14">
          <div className="rounded-[2.2rem] border border-black/8 bg-white/78 px-6 py-10 shadow-[0_26px_70px_rgba(15,23,42,0.08)] lg:px-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  <span className="h-px w-8 bg-slate-300" />
                  Contact
                </div>
                <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
                  Sapiens Health
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  We are building a multimodal intelligence layer for healthcare organizations that
                  operate with incomplete data but still need high-conviction decisions.
                </p>
              </div>

              <a
                href="mailto:hello@sapienslabs.ai"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Contact Sapiens Health
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
