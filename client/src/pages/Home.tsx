/*
 * Style reminder: Swiss-modern editorial deep-tech.
 * Use asymmetric layout, sharp information hierarchy, restrained color, generous whitespace,
 * and subtle biomedical systems cues. Every choice should reinforce "intelligence layer"
 * rather than generic SaaS dashboard aesthetics.
 */
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  ChevronRight,
  GitMerge,
  Hospital,
  Layers3,
  ShieldCheck,
  Stethoscope,
  Workflow,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const proofPoints = [
  "Built on MedMIX, a multimodal prediction framework designed for incomplete clinical data.",
  "Positioned for hospital operations, not diagnostic replacement.",
  "Designed to fit existing clinical infrastructure instead of adding another dashboard stack.",
];

const pillars = [
  {
    title: "Robust under missing modalities",
    description:
      "Real hospital data is incomplete by default. Sapiens is built around that reality, fusing notes, imaging, and EHR signals without assuming every modality is present.",
    icon: Layers3,
  },
  {
    title: "Multimodal by design",
    description:
      "Rather than relying on a single model or a single data source, the system aggregates complementary expert representations inside each modality before making downstream predictions.",
    icon: GitMerge,
  },
  {
    title: "Deployable in clinical environments",
    description:
      "The architecture is intended for efficient deployment and practical workflow insertion, making it easier to operationalize in real health-system settings.",
    icon: ShieldCheck,
  },
];

const useCases = [
  {
    eyebrow: "Patient flow",
    title: "Transfer and escalation support",
    description:
      "Help operations teams identify patients whose multimodal evidence suggests a higher likelihood of deterioration, transfer need, or more intensive monitoring.",
  },
  {
    eyebrow: "Capacity planning",
    title: "Length-of-stay and discharge coordination",
    description:
      "Surface earlier signals that can support bed planning, staffing decisions, and more proactive discharge workflows.",
  },
  {
    eyebrow: "Operational risk",
    title: "Readmission-aware workflows",
    description:
      "Translate fragmented clinical data into actionable risk signals that care coordination teams can use before a patient leaves the system.",
  },
];

const researchSignals = [
  {
    label: "Benchmarks",
    value: "4 datasets",
    detail: "OpenI, MIMIC-IV-MM, MMIST-ccRCC, and external validation on MIMIC-III.",
  },
  {
    label: "Core wedge",
    value: "Missing-modality robustness",
    detail: "A system architecture built to degrade gracefully when clinical data is incomplete.",
  },
  {
    label: "Efficiency",
    value: "Deployment-minded",
    detail: "Strong accuracy-efficiency tradeoff with lower inference burden than heavier multimodal alternatives.",
  },
];

const operatingModel = [
  {
    title: "Ingest the data hospitals already have",
    description:
      "Clinical notes, imaging, and structured records are brought together without requiring an unrealistically complete dataset for every patient.",
  },
  {
    title: "Fuse signal quality before action",
    description:
      "The engine weighs each modality by predictive reliability, not just availability, helping suppress noisy or uncertain evidence.",
  },
  {
    title: "Insert into existing workflows",
    description:
      "Outputs are framed as decision support for operators and care teams, designed to fit into current health-system processes rather than forcing a brand-new software behavior.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
      <span className="h-px w-8 bg-slate-300" />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-[linear-gradient(180deg,#f7f4ec_0%,#f9f8f4_36%,#eef3f2_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-0 top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,167,171,0.16),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[22rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(22,43,67,0.12),transparent_72%)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(249,248,244,0.78)] backdrop-blur-xl">
        <div className="container flex items-center justify-between py-5">
          <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-[0.16em] text-slate-900 uppercase">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[0.7rem] shadow-sm">
              SH
            </span>
            Sapiens Health
          </a>

          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a className="transition-colors hover:text-slate-900" href="#platform">
              Platform
            </a>
            <a className="transition-colors hover:text-slate-900" href="#use-cases">
              Use Cases
            </a>
            <a className="transition-colors hover:text-slate-900" href="#research">
              Research
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
        <section className="container relative py-10 md:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(440px,0.95fr)] lg:items-end">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
              className="relative max-w-3xl"
            >
              <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-teal-600" />
                Rice spinout concept · MedMIX foundation
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-4xl font-[Instrument_Serif] text-[3.6rem] leading-[0.92] tracking-[-0.04em] text-slate-950 sm:text-[4.6rem] lg:text-[6.2rem]"
              >
                The intelligence layer for hospital operations.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl"
              >
                Sapiens Health turns fragmented clinical data into operational decisions.
                Built on MedMIX, we are developing a multimodal prediction engine for health
                systems that need robust signal even when notes, imaging, and EHR data are
                incomplete.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                <a
                  href="#research"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Explore the research
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#use-cases"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400"
                >
                  See operational use cases
                  <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-12 grid gap-4 border-t border-black/8 pt-8 text-sm text-slate-600 md:grid-cols-3"
              >
                {proofPoints.map((item) => (
                  <div key={item} className="max-w-xs">
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative lg:pl-8"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-3 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent" />
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-hero-orbit-PBMxYZ4yaCLRhPbrnwQHPk.webp"
                  alt="Abstract illustration of multimodal clinical intelligence layers"
                  className="h-[25rem] w-full rounded-[1.55rem] object-cover object-center md:h-[33rem]"
                />

                <div className="pointer-events-none absolute inset-x-6 bottom-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[1.45rem] border border-white/65 bg-[rgba(248,248,245,0.84)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Core thesis
                    </div>
                    <div className="mt-3 text-xl font-semibold text-slate-900">
                      Hospital AI breaks when the data is incomplete.
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      MedMIX was designed to treat missing modalities as a first-class systems
                      problem, not an edge case.
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[1.3rem] border border-slate-200/80 bg-white/88 p-4 shadow-[0_18px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Focus
                      </div>
                      <div className="mt-2 text-base font-semibold text-slate-900">
                        Operational decision support
                      </div>
                    </div>
                    <div className="rounded-[1.3rem] border border-slate-200/80 bg-[#10243a] p-4 text-white shadow-[0_18px_32px_rgba(15,23,42,0.18)]">
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
                        Design intent
                      </div>
                      <div className="mt-2 text-base font-semibold">
                        Insert intelligence into existing hospital workflows.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container pb-10 pt-6 md:pb-16">
          <div className="grid gap-6 border-y border-black/8 py-7 md:grid-cols-4 md:gap-10">
            {[
              "Multimodal fusion",
              "Missing-modality robustness",
              "Operational workflows",
              "Research-to-deployment efficiency",
            ].map((item) => (
              <div key={item} className="text-sm font-medium tracking-[0.18em] text-slate-500 uppercase">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="platform" className="container py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
            <div className="max-w-xl">
              <SectionLabel>Platform</SectionLabel>
              <h2 className="font-[Instrument_Serif] text-5xl leading-none tracking-[-0.04em] text-slate-950 md:text-6xl">
                Not another dashboard. A deep-tech infrastructure layer.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                We are not trying to replace the EHR or sell generic workflow software. The
                ambition is to make messy clinical data operationally useful, so health systems can
                act on stronger patient-level signal inside the systems they already run.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {pillars.map(({ title, description, icon: Icon }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55 }}
                  className="group rounded-[1.8rem] border border-black/7 bg-white/70 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center">
            <div className="rounded-[2rem] border border-black/8 bg-white/60 p-4 shadow-[0_28px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-flow-signal-DKLPga7y2EJzVVhqJsp5fe.webp"
                alt="Visual diagram of fragmented clinical data becoming workflow-ready signals"
                className="w-full rounded-[1.6rem] object-cover"
              />
            </div>

            <div className="max-w-2xl">
              <SectionLabel>Why this matters</SectionLabel>
              <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
                Most hospital AI assumes cleaner data than hospitals actually have.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                In real-world settings, one patient may have notes and labs but no image, another may
                have imaging with sparse text, and another may have structured EHR with variable data
                quality. Sapiens is being built around that operational truth.
              </p>

              <div className="mt-8 grid gap-5">
                {operatingModel.map((item, index) => (
                  <div
                    key={item.title}
                    className="grid gap-4 border-t border-black/8 pt-5 md:grid-cols-[76px_minmax(0,1fr)]"
                  >
                    <div className="text-sm font-semibold tracking-[0.22em] text-slate-400 uppercase">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="use-cases" className="container py-12 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="max-w-xl">
              <SectionLabel>Use cases</SectionLabel>
              <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
                Start where operations feel the pain first.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                The immediate opportunity is not diagnostic substitution. It is better prediction for
                patient flow, discharge coordination, escalation decisions, and other operational tasks
                where fragmented multimodal evidence already shapes human judgment.
              </p>
            </div>

            <div className="grid gap-4">
              {useCases.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group grid gap-5 rounded-[1.8rem] border border-black/7 bg-[rgba(255,255,255,0.74)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)] md:grid-cols-[96px_minmax(0,1fr)]"
                >
                  <div className="border-b border-black/8 pb-4 text-sm font-semibold tracking-[0.22em] text-slate-400 uppercase md:border-b-0 md:border-r md:pb-0 md:pr-5">
                    0{index + 1}
                  </div>
                  <div>
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-teal-700">
                      {item.eyebrow}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-20">
          <div className="grid gap-10 rounded-[2.25rem] border border-black/8 bg-[#10243a] px-6 py-8 text-white shadow-[0_32px_90px_rgba(15,23,42,0.22)] md:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10 lg:py-10">
            <div className="max-w-xl self-center">
              <SectionLabel>
                <span className="text-slate-300">Operating model</span>
              </SectionLabel>
              <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-white md:text-5xl">
                Built to sit between fragmented data and the hospital decisions that follow.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Our thesis is that the winning product category is not a flashy new front end. It is an
                intelligence layer that can transform multimodal evidence into decision support where
                operations teams already work.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Clinical notes", icon: Stethoscope },
                  { title: "Imaging", icon: Hospital },
                  { title: "Structured EHR", icon: Workflow },
                  { title: "Fusion engine", icon: BrainCircuit },
                ].map(({ title, icon: Icon }) => (
                  <div key={title} className="rounded-[1.3rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-teal-300" />
                    <div className="mt-3 text-sm font-medium text-slate-200">{title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-network-detail-ViyMCuHPUCmfJnonioEERu.webp"
                alt="Close-up visual of a clinical intelligence network"
                className="h-full min-h-[20rem] w-full rounded-[1.45rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section id="research" className="container py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center">
            <div className="max-w-xl">
              <SectionLabel>Research foundation</SectionLabel>
              <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
                The science is the wedge.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                MedMIX combines modality-internal expert fusion with uncertainty-aware inter-modality
                fusion, allowing the model to down-weight unreliable inputs and explicitly handle absent
                modalities. That matters because incomplete data is not the exception in medicine. It is
                the environment.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-white/70 p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapiens-research-core-dnoUiX6nXxsCxJttuQr3pm.webp"
                alt="Abstract layered illustration representing the MedMIX research architecture"
                className="w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {researchSignals.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.7rem] border border-black/7 bg-white/72 p-6 shadow-[0_16px_44px_rgba(15,23,42,0.08)]"
              >
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {item.label}
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {item.value}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="container py-12 md:py-20">
          <div className="grid gap-8 rounded-[2.4rem] border border-black/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(240,246,245,0.92))] px-6 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-10">
            <div className="max-w-xl">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="font-[Instrument_Serif] text-4xl leading-none tracking-[-0.04em] text-slate-950 md:text-5xl">
                Building hospital intelligence where the data is still messy.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                If you are thinking about operational prediction in real health-system settings, we
                would love to talk about where multimodal signal can produce measurable workflow
                value first.
              </p>
            </div>

            <div className="grid gap-4 self-end md:grid-cols-2">
              <div className="rounded-[1.7rem] border border-white/80 bg-white/88 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Company
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  Sapiens Health
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  A deep-tech healthcare startup concept focused on multimodal hospital intelligence.
                </p>
              </div>
              <div className="rounded-[1.7rem] border border-slate-200 bg-[#10243a] p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
                  Positioning
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                  Intelligence layer for hospital operations
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Research-first infrastructure that turns incomplete multimodal data into workflow-ready signal.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
