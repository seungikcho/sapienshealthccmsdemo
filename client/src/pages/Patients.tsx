import { useState } from "react";
import { useLocation } from "wouter";
import {
  LogOut,
  FlaskConical,
  GitBranch,
  FileText,
  BookOpen,
} from "lucide-react";
import { getSessionEmail, logout } from "@/lib/auth";

const tools = [
  {
    icon: FlaskConical,
    label: "Lab Test Search",
    description: "Look up lab tests, reference ranges, and order history.",
    href: "/patients/lab-test",
  },
  {
    icon: GitBranch,
    label: "Referral Generator",
    description: "Draft and route referrals to specialists in seconds.",
    href: "/patients/referral",
  },
  {
    icon: FileText,
    label: "Meeting Note Generator",
    description: "Generate structured SOAP notes from visit summaries.",
    href: "/patients/meeting-note",
  },
  {
    icon: BookOpen,
    label: "Medical Document Reader",
    description:
      "Extract and summarize key information from medical documents.",
    href: null,
  },
];

export default function Patients() {
  const [, setLocation] = useLocation();
  const [loggingOut, setLoggingOut] = useState(false);
  const email = getSessionEmail();

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
    setLocation("/login");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#110d1d_0%,#151124_52%,#0f0b19_100%)] text-foreground">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10rem] top-[-4rem] h-[36rem] w-[36rem] rounded-full bg-[#a88dff]/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#c8b7ff]/6 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-8 py-5 sm:px-14 lg:px-20">
        <a href="/" className="font-wordmark text-white">
          Sapiens Health
        </a>
        <div className="flex items-center gap-4">
          {email && (
            <span className="hidden text-xs text-white/40 sm:inline">
              {email}
            </span>
          )}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-white/60 transition hover:bg-white/[0.1] hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            {loggingOut ? "Logging out" : "Log out"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 px-8 pb-28 pt-16 sm:px-14 lg:px-20">
        <div className="mx-auto max-w-[860px]">
          {/* Welcome heading */}
          <h1 className="font-display text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.05em] sm:text-[2.8rem] lg:text-[3.2rem]">
            <span className="text-white">Welcome,</span>
            <br />
            <span className="text-[#c8b7ff]">Archway Family Medicine</span>
          </h1>

          {/* Tool cards */}
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {tools.map(({ icon: Icon, label, description, href }) => (
              <a
                key={label}
                href={href ?? undefined}
                onClick={!href ? e => e.preventDefault() : undefined}
                className={`group flex flex-col items-start gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-[#c8b7ff]/30 hover:bg-white/[0.07] ${!href ? "cursor-default opacity-60" : ""}`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#c8b7ff]/10 text-[#c8b7ff] transition group-hover:bg-[#c8b7ff]/18">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div>
                  <div className="text-[1rem] font-semibold tracking-[-0.02em] text-white">
                    {label}
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-white/46">
                    {description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
