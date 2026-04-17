/*
 * Style reminder: Swiss-modern editorial deep-tech.
 * Keep the structure simple, the copy short, and the visual hierarchy crisp.
 * The page should communicate two things clearly: hospital operation support and clinical trial support.
 */
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  FlaskConical,
  Layers3,
  ShieldCheck,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const pillars = [
  {
    title: "Hospital operation support",
    description:
      "Use multimodal clinical data to support patient flow, escalation, discharge timing, and other operational decisions inside health systems.",
    icon: Building2,
  },
  {
    title: "Clinical trial support",
    description:
      "Help trial operators find more eligible patients from incomplete EHR, note, ECG, and imaging data, especially when rule-based screening misses them.",
    icon: FlaskConical,
  },
];

const proof = [
  {
    title: "Built on MedMIX",
    text: "A multimodal framework designed to stay robust when modalities are missing.",
  },
  {
    title: "Deep-tech positioning",
    text: "An intelligence layer, not another generic dashboard product.",
  },
  {
    title: "Deployment intent",
    text: "Designed to fit real clinical infrastructure and real-world workflow constraints.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-[linear-gradient(180deg,#f7f4ec_0%,#f9f8f4_42%,#eef3f2_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-0 top-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,167,171,0.16),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[14rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(22,43,67,0.10),transparent_72%)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(249,248,244,0.82)] backdrop-blur-xl">
        <div className="container flex items-center justify-between py-5">
          <a href="#top" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[0.7rem] shadow-sm">
              SL
            </span>
            Sapiens Labs
          </a>

          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a className="transition-colors hover:text-slate-900" href="#solutions">
              Solutions
            </a>
            <a className="transition-colors hover:text-slate-900" href="#research">
              Research
            </a>
            <a className="transition-colors hover:text-slate-900" href="#contact">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)]"
          >
            Contact
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="container py-10 md:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:items-end">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-teal-600" />
                Rice spinout concept · MedMIX foundation
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-4xl font-[Instrument_Serif] text-[3.5rem] leading-[0.92] tracking-[-0.04em] text-slate-950 sm:text-[4.5rem] lg:text-[6rem]"
              >
                Multimodal intelligence for hospitals and trials.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl"
              >
                Sapiens Labs builds an intelligence layer for incomplete clinical data.
                We focus on two workflows: hospital operation support and clinical trial
                support.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-col items-start gap-4 sm:flex-row">
                <a
                  href="#solutions"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  View solutions
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#research"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400"
                >
                  Read the thesis
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-3 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-hero-orbit-PBMxYZ4yaCLRhPbrnwQHPk.webp"
                  alt="Abstract illustration of a multimodal clinical intelligence system"
                  className="h-[24rem] w-full rounded-[1.55rem] object-cover object-center md:h-[31rem]"
                />

                <div className="pointer-events-none absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.35rem] border border-white/70 bg-[rgba(248,248,245,0.88)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Focus 01
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-900">
                      Hospital operation support
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-slate-200 bg-[#10243a] p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
                      Focus 02
                    </div>
                    <div className="mt-2 text-lg font-semibold">
                      Clinical trial support
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="solutions" className="container py-10 md:py-16">
          <div className="mb-8 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
              <span className="h-px w-8 bg-slate-300" />
              Solutions
            </div>
            <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
              Two clear wedges.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map(({ title, description, icon: Icon }) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="rounded-[1.9rem] border border-black/7 bg-white/72 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-md">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-slate-950">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="container py-10 md:py-16">
          <div className="grid gap-10 rounded-[2.2rem] border border-black/8 bg-[#10243a] px-6 py-8 text-white shadow-[0_32px_90px_rgba(15,23,42,0.22)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:px-10">
            <div className="max-w-xl self-center">
              <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-300">
                <span className="h-px w-8 bg-white/30" />
                Why it matters
              </div>
              <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-white md:text-5xl">
                Clinical data is incomplete. The workflow still has to move.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Our thesis is simple: better signal from incomplete multimodal data can improve
                hospital operations and widen the screening pool for complex clinical trials.
              </p>
            </div>

            <div className="rounded-[1.9rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-flow-signal-DKLPga7y2EJzVVhqJsp5fe.webp"
                alt="Conceptual diagram of incomplete medical data becoming workflow-ready signals"
                className="h-full min-h-[20rem] w-full rounded-[1.45rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section id="research" className="container py-10 md:py-16">
          <div className="mb-8 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
              <span className="h-px w-8 bg-slate-300" />
              Research
            </div>
            <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
              Research-backed, deployment-minded.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {proof.map((item, index) => {
              const Icon = index === 0 ? Layers3 : index === 1 ? ShieldCheck : ArrowRight;
              return (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] border border-black/7 bg-white/72 p-6 shadow-[0_16px_44px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-xl font-semibold tracking-[-0.02em] text-slate-950">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="container py-10 md:py-16 lg:pb-20">
          <div className="rounded-[2.2rem] border border-black/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(240,246,245,0.92))] px-6 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl lg:px-10">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                <span className="h-px w-8 bg-slate-300" />
                Contact
              </div>
              <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
                Sapiens Labs
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                We are building multimodal intelligence for hospital operations and clinical trial
                workflows, starting where incomplete data creates the biggest friction.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
