import { useEffect, useRef, useState } from "react";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { Redirect, useLocation } from "wouter";
import { isAuthenticated, login, signup } from "@/lib/auth";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

type AuthMode = "login" | "signup";

function getInitialMode(pathname: string): AuthMode {
  return pathname === "/signup" ? "signup" : "login";
}

export default function Login() {
  const [location, setLocation] = useLocation();
  const [mode, setMode] = useState<AuthMode>(() => getInitialMode(location));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const isSignup = mode === "signup";

  useEffect(() => {
    setMode(getInitialMode(location));
    setError("");
  }, [location]);

  useEffect(() => {
    if (mode === "signup") {
      firstNameRef.current?.focus();
      return;
    }
    emailRef.current?.focus();
  }, [mode]);

  if (isAuthenticated()) {
    return <Redirect to="/patients" />;
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError("");
    setLocation(nextMode === "signup" ? "/signup" : "/login");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const credentials = { email: email.trim(), password };

    try {
      if (isSignup) {
        const signupDetails = {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          organization_name: organizationName.trim(),
        };

        if (!signupDetails.first_name || !signupDetails.last_name || !signupDetails.organization_name) {
          throw new Error("Please enter your name and organization.");
        }

        await signup({ ...credentials, ...signupDetails });
      }

      await login(credentials);
      setLocation("/patients");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden text-[#0d1b4d]"
      style={{ background: "linear-gradient(150deg, #f2eefb 0%, #ece6f8 50%, #eee9f9 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #c4aff5 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #a78de8 0%, transparent 70%)" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 py-5">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-10 sm:px-20 lg:px-40">
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
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0d1b4d]/50 transition hover:text-[#0d1b4d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>
        </div>
      </header>

      {/* Main */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-[22rem]">

          {/* Tab switcher */}
          <div
            className="mb-8 grid grid-cols-2 rounded-2xl border border-[#0d1b4d]/10 bg-white/60 p-1 shadow-sm backdrop-blur-sm"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isSignup}
              onClick={() => switchMode("login")}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                !isSignup
                  ? "bg-[#0d1b4d] text-white shadow-sm"
                  : "text-[#0d1b4d]/45 hover:text-[#0d1b4d]"
              }`}
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isSignup}
              onClick={() => switchMode("signup")}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                isSignup
                  ? "bg-[#0d1b4d] text-white shadow-sm"
                  : "text-[#0d1b4d]/45 hover:text-[#0d1b4d]"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              Sign up
            </button>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-[#0d1b4d]/10 bg-white/70 px-8 py-9 shadow-[0_8px_40px_rgba(13,27,77,0.10)] backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {isSignup && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      ref={firstNameRef}
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      required
                      maxLength={128}
                      className="w-full rounded-xl border border-[#0d1b4d]/12 bg-[#0d1b4d]/[0.03] px-4 py-3 text-sm text-[#0d1b4d] placeholder:text-[#0d1b4d]/35 outline-none transition focus:border-[#5b3fa0]/40 focus:bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      autoComplete="family-name"
                      required
                      maxLength={128}
                      className="w-full rounded-xl border border-[#0d1b4d]/12 bg-[#0d1b4d]/[0.03] px-4 py-3 text-sm text-[#0d1b4d] placeholder:text-[#0d1b4d]/35 outline-none transition focus:border-[#5b3fa0]/40 focus:bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Organization name"
                    value={organizationName}
                    onChange={e => setOrganizationName(e.target.value)}
                    autoComplete="organization"
                    required
                    maxLength={256}
                    className="w-full rounded-xl border border-[#0d1b4d]/12 bg-[#0d1b4d]/[0.03] px-4 py-3 text-sm text-[#0d1b4d] placeholder:text-[#0d1b4d]/35 outline-none transition focus:border-[#5b3fa0]/40 focus:bg-white"
                  />
                </>
              )}

              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
                maxLength={320}
                className="w-full rounded-xl border border-[#0d1b4d]/12 bg-[#0d1b4d]/[0.03] px-4 py-3 text-sm text-[#0d1b4d] placeholder:text-[#0d1b4d]/35 outline-none transition focus:border-[#5b3fa0]/40 focus:bg-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
                maxLength={1024}
                className="w-full rounded-xl border border-[#0d1b4d]/12 bg-[#0d1b4d]/[0.03] px-4 py-3 text-sm text-[#0d1b4d] placeholder:text-[#0d1b4d]/35 outline-none transition focus:border-[#5b3fa0]/40 focus:bg-white"
              />

              {error && (
                <p className="text-center text-xs leading-5 text-rose-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d1b4d] py-3.5 text-sm font-semibold text-white transition hover:bg-[#1a2d6b] disabled:opacity-60"
              >
                {isSignup ? <UserPlus className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                {loading
                  ? isSignup ? "Creating account..." : "Signing in..."
                  : isSignup ? "Create account" : "Sign in"
                }
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-[#0d1b4d]/40">
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <button
                type="button"
                onClick={() => switchMode(isSignup ? "login" : "signup")}
                className="font-semibold text-[#5b3fa0] transition hover:text-[#4a2f8a]"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
