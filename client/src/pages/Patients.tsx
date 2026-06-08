import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, LogOut, Mail, Search } from "lucide-react";
import { missingFields, type PatientProfile } from "@shared/patient-profile";
import { PatientProfileCard } from "@/components/PatientProfileCard";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AuthState = "loading" | "connected" | "disconnected";

function initialsFromEmail(email: string | null): string {
  if (!email) return "DR";
  return email.split("@")[0].slice(0, 2).toUpperCase();
}

export default function Patients() {
  const [auth, setAuth] = useState<AuthState>("loading");
  const [email, setEmail] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [profiles, setProfiles] = useState<PatientProfile[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [searchNotice, setSearchNotice] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [rawResult, setRawResult] = useState<string | null>(null);

  const [resetting, setResetting] = useState(false);
  const [simulating, setSimulating] = useState(false);

  const selected = profiles.find((p) => p.id === selectedId) ?? profiles[0];

  async function loadProfiles(selectId?: string) {
    const res = await fetch("/api/profiles");
    const data = await res.json();
    const list: PatientProfile[] = data.profiles ?? [];
    setProfiles(list);
    setSelectedId((cur) => {
      const want = selectId ?? cur;
      return list.some((p) => p.id === want) ? want : list[0]?.id ?? "";
    });
  }

  useEffect(() => {
    let active = true;
    fetch("/api/auth/status")
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d.authenticated) {
          setAuth("connected");
          setEmail(d.email ?? null);
          void loadProfiles();
        } else {
          setAuth("disconnected");
        }
      })
      .catch(() => active && setAuth("disconnected"));
    return () => {
      active = false;
    };
  }, []);

  function connectGmail() {
    window.location.href = "/api/auth/google";
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuth("disconnected");
    setEmail(null);
    setProfiles([]);
    setSelectedId("");
    setRawResult(null);
    setQuery("");
  }

  async function runSearch() {
    const name = query.trim();
    if (!name) return;
    setSearching(true);
    setSearchError(null);
    setSearchNotice(null);
    try {
      const res = await fetch("/api/gmail/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientName: name }),
      });
      if (res.status === 401) {
        setAuth("disconnected");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");

      setRawResult(data.rawText ?? null);
      if (data.created && !data.found) {
        setSearchNotice(`No email threads matched “${name}” — created a blank profile to populate.`);
      }
      await loadProfiles(data.profile.id);
    } catch (err) {
      setSearchError((err as Error).message);
    } finally {
      setSearching(false);
    }
  }

  async function resetDemo() {
    setResetting(true);
    try {
      const res = await fetch("/api/demo/reset", { method: "POST" });
      const data = await res.json();
      const list: PatientProfile[] = data.profiles ?? [];
      setProfiles(list);
      setSelectedId(list[0]?.id ?? "");
      setRawResult(null);
      setSearchNotice(null);
      setQuery("");
    } finally {
      setResetting(false);
    }
  }

  async function triggerReply() {
    if (!selected) return;
    setSimulating(true);
    try {
      const res = await fetch("/api/demo/simulate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId: selected.id }),
      });
      if (res.ok) await loadProfiles(selected.id);
    } finally {
      setSimulating(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(133,102,255,0.14),transparent_20%),radial-gradient(circle_at_88%_14%,rgba(64,212,255,0.08),transparent_18%),linear-gradient(180deg,#06050d_0%,#0a0915_45%,#07060e_100%)]" />
      </div>

      <header className="relative z-20 px-4 pb-6 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl sm:px-6">
          <a href="/" className="font-wordmark text-white/96">Sapiens Health</a>
          <div className="flex items-center gap-3">
            {auth === "connected" && (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9c8cff,#7e5cff)] text-[11px] font-bold text-white">
                    {initialsFromEmail(email)}
                  </div>
                  {email && <span className="hidden text-xs text-white/70 sm:inline">{email}</span>}
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/[0.1]"
                >
                  <LogOut className="h-3.5 w-3.5" /> Log Out
                </button>
              </>
            )}
            <a href="/" className="inline-flex items-center gap-2 text-sm text-white/68 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-28 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-[1200px]">
          <div className="section-kicker">Connect</div>
          <h1 className="font-display mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white sm:text-[2.6rem]">
            Patient Profiles
          </h1>
          <p className="mt-3 max-w-[46rem] text-sm leading-7 text-white/64">
            Welcome back, Dr. Evans. Here are your real-time clinical profiles parsed directly from your
            incoming patient email threads.
          </p>

          {auth === "loading" && (
            <div className="mt-10 flex items-center gap-2 text-white/60">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking Gmail connection…
            </div>
          )}

          {auth === "disconnected" && (
            <div className="mt-10 flex flex-col items-center justify-center rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#9c8cff,#7e5cff)] shadow-lg shadow-violet-600/25">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">Connect your Gmail to begin</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
                Sapiens reads your provider–patient email threads (read-only) to parse structured
                clinical profiles. Connect your Google Workspace account to load live patient data.
              </p>
              <button
                onClick={connectGmail}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-5 py-3 text-sm font-semibold text-[#080612] shadow-[0_18px_44px_rgba(145,118,255,0.34)] transition hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" /> Connect Gmail Account
              </button>
            </div>
          )}

          {auth === "connected" && (
            <>
              {/* Search — top of workspace */}
              <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && runSearch()}
                      placeholder="Search or add a patient by name…"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:border-violet-500/40 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={runSearch}
                    disabled={searching || !query.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#d8b1ff,#9c8cff,#81ddff)] px-5 py-2.5 text-sm font-semibold text-[#080612] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
                  >
                    {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    Search
                  </button>
                </div>
                {searching && (
                  <p className="mt-2 text-xs text-white/50">Parsing email threads for “{query.trim()}”…</p>
                )}
                {searchError && <p className="mt-2 text-xs text-rose-300">{searchError}</p>}
                {searchNotice && <p className="mt-2 text-xs text-white/50">{searchNotice}</p>}
              </div>

              {/* Patient board (rail) + selected profile card */}
              <div className="mt-6 grid gap-5 lg:grid-cols-[260px_1fr]">
                <aside className="h-fit rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-2">
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Patient board
                    </span>
                    <span className="text-[10px] text-white/40">{profiles.length}</span>
                  </div>
                  {profiles.map((p) => {
                    const sel = p.id === selected?.id;
                    const missing = missingFields(p).length;
                    const isLive = p.sourceThreadId === "gmail-live";
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-2xl border-l-2 px-3 py-2.5 text-left transition-all",
                          sel ? "border-violet-500 bg-violet-600/10" : "border-transparent hover:bg-white/[0.04]",
                        )}
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#9c8cff,#7e5cff)] text-[10px] font-bold text-white">
                          {(p.patientName ?? "–").split(/\s+/).map((s) => s[0]).slice(0, 2).join("")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className={cn("truncate text-sm font-medium", sel ? "text-white" : "text-white/75")}>
                              {p.patientName ?? "Unidentified"}
                            </span>
                            {isLive && (
                              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-300">
                                Live
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 text-[11px] text-white/45">
                            {missing === 0 ? "Complete" : `${missing} missing`}
                          </div>
                        </div>
                        {missing > 0 && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />}
                      </button>
                    );
                  })}
                </aside>

                <div>
                  {selected && (
                    <PatientProfileCard
                      profile={selected}
                      onDraftFollowUp={(p) => console.log("[stub] draft follow-up for", p.id)}
                    />
                  )}
                </div>
              </div>

              {/* Raw ingested data — collapsed debug accordion */}
              {rawResult && (
                <Accordion type="single" collapsible className="mt-12 rounded-[1.2rem] border border-white/10 bg-white/[0.02] px-4">
                  <AccordionItem value="raw" className="border-b-0">
                    <AccordionTrigger className="text-white/70 hover:text-white hover:no-underline">
                      View Raw Ingested Data (Debug Log)
                    </AccordionTrigger>
                    <AccordionContent>
                      <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-3 text-xs leading-5 text-white/70">
                        {rawResult}
                      </pre>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </>
          )}
        </section>
      </main>

      {/* Floating Demo Controls dock */}
      {auth === "connected" && (
        <div className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(13,11,23,0.85)] px-3 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Demo controls
            </span>
            <button
              onClick={resetDemo}
              disabled={resetting}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-white/85 transition hover:bg-white/[0.1] disabled:opacity-50"
            >
              {resetting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <span>🔄</span>}
              Reset Demo State
            </button>
            <button
              onClick={triggerReply}
              disabled={simulating || !selected}
              className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#d8b1ff,#9c8cff,#81ddff)] px-3.5 py-1.5 text-xs font-semibold text-[#080612] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
            >
              {simulating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <span>📩</span>}
              Trigger Patient Email Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
