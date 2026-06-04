/*
Design philosophy for this page: Match the primary product site while presenting essential privacy information in a calm, readable legal-style layout.
Avoid overstating compliance claims and keep wording appropriate for a public informational website.
*/
import { ArrowLeft } from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

export default function Privacy() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(133,102,255,0.14),transparent_20%),radial-gradient(circle_at_88%_14%,rgba(64,212,255,0.08),transparent_18%),linear-gradient(180deg,#06050d_0%,#0a0915_45%,#07060e_100%)]" />
      </div>

      <header className="relative z-20 px-4 pb-6 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
              <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
            </div>
            <div className="font-wordmark truncate text-white/96">Sapiens Health</div>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-white/68 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-20 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-[1100px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,11,23,0.92),rgba(9,8,18,0.98))] p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_60px_160px_rgba(0,0,0,0.52)] sm:p-10 lg:p-12">
          <div className="section-kicker">Privacy Policy</div>
          <h1 className="font-display mt-4 text-[2.5rem] font-semibold tracking-[-0.07em] text-white sm:text-[3.1rem] lg:text-[3.4rem]">
            Privacy information for this public website.
          </h1>
          <p className="mt-5 max-w-[48rem] text-base leading-8 text-white/68 sm:text-[1.02rem]">
            This page explains, at a high level, how Sapiens Health handles information submitted through the public-facing website and direct contact channels.
          </p>

          <div className="mt-8 space-y-5">
            <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">Information you may provide</h2>
              <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                If you contact Sapiens Health through the public email links on this site, you may choose to provide your name, organization, email address, and the contents of your message.
              </p>
            </article>

            <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">How website inquiries are used</h2>
              <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                Information submitted through public contact channels may be used to respond to evaluation requests, partnership inquiries, or general company questions.
              </p>
            </article>

            <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">Clinical and sensitive information</h2>
              <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                This public website is informational in nature. Visitors should avoid sending unnecessary patient-identifiable or highly sensitive clinical information through open email channels unless a more appropriate secure workflow has been established.
              </p>
            </article>

            <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">Questions</h2>
              <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                For privacy-related questions about this website, please contact <a className="text-white/88 underline decoration-white/20 underline-offset-4" href="mailto:info@sapienshealth.co?subject=Privacy%20inquiry">info@sapienshealth.co</a>.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
