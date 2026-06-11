import { useState, useRef } from "react";
import { ArrowLeft, Search, Loader2, FlaskConical } from "lucide-react";

type LabResult = {
  name: string;
  code: string;
  description: string;
  indication: string;
  price: string;
  turnaround: string;
};

export default function LabTestSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function search() {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setSearched(false);
    try {
      const res = await fetch("/api/lab-test/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") search();
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#110d1d_0%,#151124_52%,#0f0b19_100%)] text-foreground">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-8rem] top-[-4rem] h-[32rem] w-[32rem] rounded-full bg-[#a88dff]/10 blur-3xl" />
      </div>

      <header className="relative z-20 flex items-center gap-4 px-8 py-5 sm:px-14 lg:px-20">
        <a
          href="/patients"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </a>
      </header>

      <main className="relative z-10 px-8 pb-28 pt-6 sm:px-14 lg:px-20">
        <div className="mx-auto max-w-[640px]">
          <h1 className="font-display text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.4rem]">
            Lab Test Search
          </h1>
          <p className="mt-2 text-sm text-white/44">
            What lab test do you need?
          </p>

          {/* Search input */}
          <div className="mt-8 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="e.g. blood glucose, lipid panel, thyroid..."
                className="w-full rounded-full border border-white/12 bg-white/[0.05] py-3.5 pl-11 pr-5 text-sm text-white placeholder-white/28 outline-none transition focus:border-[#c8b7ff]/50 focus:bg-white/[0.07]"
              />
            </div>
            <button
              onClick={search}
              disabled={!query.trim() || loading}
              className="inline-flex items-center gap-2 rounded-full bg-[#c8b7ff] px-6 py-3.5 text-sm font-semibold text-[#17120d] transition hover:-translate-y-0.5 hover:bg-[#d6caff] disabled:opacity-50 disabled:translate-y-0"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Search"
              )}
            </button>
          </div>

          {/* Results */}
          {loading && (
            <div className="mt-16 flex flex-col items-center gap-3 text-center">
              <Loader2 className="h-7 w-7 animate-spin text-[#c8b7ff]" />
              <p className="text-sm text-white/50">Searching lab tests…</p>
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="mt-14 text-center">
              <p className="text-sm text-white/40">
                No matching lab tests found. Try a different term.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="mt-8 flex flex-col gap-4">
              {results.map((r, i) => (
                <div
                  key={r.code}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#c8b7ff]/20 hover:bg-white/[0.06]"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#c8b7ff]/10 text-[#c8b7ff]">
                      <FlaskConical className="h-4 w-4" strokeWidth={1.6} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[0.7rem] font-semibold tracking-widest text-white/28">
                          #{i + 1}
                        </span>
                        <h3 className="text-[1rem] font-semibold tracking-[-0.02em] text-white">
                          {r.name}
                        </h3>
                        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[0.68rem] font-mono text-white/38">
                          {r.code}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-white/54">
                        {r.description}
                      </p>
                      <p className="mt-1 text-xs text-white/34">
                        <span className="font-medium text-white/50">
                          Indication:
                        </span>{" "}
                        {r.indication}
                      </p>
                      <div className="mt-3.5 flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-[0.65rem] uppercase tracking-wider text-white/30">
                            Est. Price
                          </span>
                          <span className="text-sm font-semibold text-[#c8b7ff]">
                            {r.price}
                          </span>
                        </div>
                        <div className="h-6 w-px bg-white/10" />
                        <div className="flex flex-col">
                          <span className="text-[0.65rem] uppercase tracking-wider text-white/30">
                            Turnaround
                          </span>
                          <span className="text-sm font-medium text-white/70">
                            {r.turnaround}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
