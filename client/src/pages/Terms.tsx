/*
Design philosophy for this page: Match the main product site while presenting lightweight, credible terms for an informational company website.
Keep the language restrained and avoid legal claims the user has not provided.
*/
import { ArrowLeft } from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRhLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

export default function Terms() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(133,102,255,0.14),transparent_20%),radial-gradient(circle_at_88%_14%,rgba(64,212,255,0.08),transparent_18%),linear-gradient(180deg,#06050d_0%,#0a0915_45%,#07060e_100%)]" />
      </div>

      <header className="relative z-20 px-4 pb-6 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-6">
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
        <section className="mx-auto w-full max-w-[1100px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,11,23,0.92),rgba(9,8,18,0.98))] p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_60px_160px_rgba(0,0,0,0.52)] sm:p-10 lg:p-12">
          <div className="section-kicker">Terms of Use</div>
          <h1 className="font-display mt-4 text-[2.5rem] font-semibold tracking-[-0.07em] text-white sm:text-[3.1rem] lg:text-[3.4rem]">
            Terms for use of this public website.
          </h1>
          <p className="mt-5 max-w-[48rem] text-base leading-8 text-white/68 sm:text-[1.02rem]">
            These terms describe the intended use of the public Sapiens Health
            website and its informational materials.
          </p>

          <div className="mt-8 space-y-5">
            <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
                Informational purpose
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                This website is provided for general informational and business
                inquiry purposes. It is intended to explain Sapiens Health,
                MedMIX, and related company materials at a high level.
              </p>
            </article>

            <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
                No medical advice
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                Content on this website is not medical advice, diagnosis,
                treatment guidance, or emergency instruction. Visitors should
                not rely on this website as a substitute for professional
                clinical judgment.
              </p>
            </article>

            <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
                External engagement
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                Submitting an inquiry through public contact links does not, by
                itself, create a commercial, clinical, or advisory relationship.
                Any deeper engagement would depend on separate communication and
                agreement.
              </p>
            </article>

            <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
                Contact
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[0.98rem]">
                Questions about these website terms may be directed to{" "}
                <a
                  className="text-white/88 underline decoration-white/20 underline-offset-4"
                  href="mailto:info@sapienshealth.co?subject=Terms%20inquiry"
                >
                  info@sapienshealth.co
                </a>
                .
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
