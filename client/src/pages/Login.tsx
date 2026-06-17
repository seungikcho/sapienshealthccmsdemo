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
  const title = isSignup ? "Create account" : "Sign in";
  const submitLabel = isSignup ? "Create account" : "Sign in";
  const loadingLabel = isSignup ? "Creating account..." : "Signing in...";

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

    const credentials = {
      email: email.trim(),
      password,
    };

    try {
      if (isSignup) {
        const signupDetails = {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          organization_name: organizationName.trim(),
        };

        if (
          !signupDetails.first_name ||
          !signupDetails.last_name ||
          !signupDetails.organization_name
        ) {
          throw new Error("Please enter your name and organization.");
        }

        await signup({
          ...credentials,
          ...signupDetails,
        });
      }

      await login(credentials);
      setLocation("/patients");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#110d1d_0%,#151124_52%,#0f0b19_100%)] text-foreground">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a88dff]/8 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-[21rem]">
          <a
            href="/"
            className="mb-10 flex items-center justify-center gap-2.5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#17120d]">
              <img
                src={logoUrl}
                alt="Sapiens Health"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-wordmark text-white">Sapiens Health</span>
          </a>

          <div
            className="mb-7 grid grid-cols-2 rounded-full border border-white/12 bg-white/[0.04] p-1"
            role="tablist"
            aria-label="Authentication mode"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isSignup}
              onClick={() => switchMode("login")}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
                !isSignup
                  ? "bg-[#c8b7ff] text-[#17120d]"
                  : "text-white/48 hover:text-white"
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
              className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
                isSignup
                  ? "bg-[#c8b7ff] text-[#17120d]"
                  : "text-white/48 hover:text-white"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              Sign up
            </button>
          </div>

          <h1 className="mb-7 text-center font-display text-[1.5rem] font-semibold text-white">
            {title}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {isSignup && (
              <>
                <input
                  ref={firstNameRef}
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  required
                  maxLength={128}
                  className="w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#c8b7ff]/40 focus:bg-white/[0.08]"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="family-name"
                  required
                  maxLength={128}
                  className="w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#c8b7ff]/40 focus:bg-white/[0.08]"
                />
                <input
                  type="text"
                  placeholder="Organization name"
                  value={organizationName}
                  onChange={e => setOrganizationName(e.target.value)}
                  autoComplete="organization"
                  required
                  maxLength={256}
                  className="w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#c8b7ff]/40 focus:bg-white/[0.08]"
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
              className="w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#c8b7ff]/40 focus:bg-white/[0.08]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              maxLength={1024}
              className="w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#c8b7ff]/40 focus:bg-white/[0.08]"
            />

            {error && (
              <p className="text-center text-xs leading-5 text-rose-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c8b7ff] py-3 text-sm font-semibold text-[#17120d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#d6caff] disabled:translate-y-0 disabled:opacity-60"
            >
              {isSignup ? (
                <UserPlus className="h-4 w-4" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {loading ? loadingLabel : submitLabel}
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-white/35">
            <button
              type="button"
              onClick={() => switchMode(isSignup ? "login" : "signup")}
              className="font-medium text-white/56 transition hover:text-white"
            >
              {isSignup ? "Use an existing account" : "Create an account"}
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-white/24">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 transition hover:text-white/50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
