import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Search,
  Loader2,
  FlaskConical,
  Star,
  Plus,
  Check,
  X,
  Trash2,
  Ellipsis,
  Pencil,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";
import { getAuthorizationHeader } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LabTest = {
  id: string;
  catalog: string;
  name: string;
  cpt: string;
  company: string;
  favorite: boolean;
  price: number;
  markup: number;
};

type LabTestSet = {
  id: string;
  name: string;
  testIds: string[];
  tests: LabTest[];
};

const PAGE_SIZE = 50;
const COMPANIES = ["All", "Labcorp", "PathGroup"] as const;

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function LabTestSearch() {
  // search state
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState<(typeof COMPANIES)[number]>("All");
  const [favOnly, setFavOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);
  const [results, setResults] = useState<LabTest[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // selection + saved sets
  const [selected, setSelected] = useState<Record<string, LabTest>>({});
  const [sets, setSets] = useState<LabTestSet[]>([]);
  const [setName, setSetName] = useState("");
  const [savingSet, setSavingSet] = useState(false);
  const [editingSet, setEditingSet] = useState<LabTestSet | null>(null);
  const [editedSetName, setEditedSetName] = useState("");
  const [editSetError, setEditSetError] = useState("");
  const [savingSetName, setSavingSetName] = useState(false);
  const [deletingSet, setDeletingSet] = useState<LabTestSet | null>(null);
  const [deleteSetError, setDeleteSetError] = useState("");
  const [deletingSetId, setDeletingSetId] = useState("");
  const [editingLabTest, setEditingLabTest] = useState<LabTest | null>(null);
  const [editedLabTestName, setEditedLabTestName] = useState("");
  const [editLabTestError, setEditLabTestError] = useState("");
  const [savingLabTestName, setSavingLabTestName] = useState(false);

  const requestSeq = useRef(0);

  // Debounced catalog search — refetches whenever query/filters/page change.
  useEffect(() => {
    const seq = ++requestSeq.current;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          q: query.trim(),
          page: String(page),
          pageSize: String(PAGE_SIZE),
        });
        if (company !== "All") params.set("company", company);
        if (favOnly) params.set("favorites", "1");
        const res = await fetch(apiUrl(`/lab-tests/search?${params}`), {
          headers: getAuthorizationHeader(),
        });
        const data = await res.json();
        if (seq !== requestSeq.current) return; // stale response
        setResults(data.results ?? []);
        setTotal(data.total ?? 0);
      } catch {
        if (seq === requestSeq.current) {
          setResults([]);
          setTotal(0);
        }
      } finally {
        if (seq === requestSeq.current) setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, company, favOnly, page, reloadKey]);

  useEffect(() => {
    refreshSets();
  }, []);

  async function refreshSets() {
    try {
      const res = await fetch(apiUrl("/lab-sets/"), {
        headers: getAuthorizationHeader(),
      });
      const data = await res.json();
      setSets(data.sets ?? []);
    } catch {
      /* leave existing list */
    }
  }

  function changeFilter(update: () => void) {
    update();
    setPage(1);
  }

  async function toggleFavorite(t: LabTest) {
    const next = !t.favorite;
    // Optimistic: flip the star now. If the Favorites filter is on and we just
    // unfavorited, drop the row from view. Keep any selected-panel copy in sync.
    setResults(prev =>
      favOnly && !next
        ? prev.filter(x => x.id !== t.id)
        : prev.map(x => (x.id === t.id ? { ...x, favorite: next } : x))
    );
    setSelected(prev =>
      prev[t.id] ? { ...prev, [t.id]: { ...prev[t.id], favorite: next } } : prev
    );
    try {
      const res = await fetch(apiUrl(`/lab-tests/${t.id}/favorite`), {
        method: "POST",
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: next }),
      });
      if (!res.ok) throw new Error("Failed to update favorite");
    } catch (err) {
      toast.error((err as Error).message);
      setReloadKey(k => k + 1); // re-sync from the server
    }
  }

  function toggleTest(t: LabTest) {
    setSelected(prev => {
      const next = { ...prev };
      if (next[t.id]) delete next[t.id];
      else next[t.id] = t;
      return next;
    });
  }

  async function updateLabTestName(testId: string, name: string) {
    const res = await fetch(apiUrl(`/lab-tests/${testId}`), {
      method: "PATCH",
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) throw new Error("Failed to update test name");
  }

  function startEditingLabTest(test: LabTest) {
    setEditingLabTest(test);
    setEditedLabTestName(test.name);
    setEditLabTestError("");
  }

  function closeEditLabTestDialog() {
    if (savingLabTestName) return;

    setEditingLabTest(null);
    setEditedLabTestName("");
    setEditLabTestError("");
  }

  async function saveLabTestName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingLabTest) return;

    const name = editedLabTestName.trim();

    if (!name) {
      setEditLabTestError("Enter a test name.");
      return;
    }

    setSavingLabTestName(true);
    setEditLabTestError("");

    try {
      await updateLabTestName(editingLabTest.id, name);
      setResults(prev =>
        prev.map(test =>
          test.id === editingLabTest.id ? { ...test, name } : test
        )
      );
      setSelected(prev =>
        prev[editingLabTest.id]
          ? {
            ...prev,
            [editingLabTest.id]: { ...prev[editingLabTest.id], name },
          }
          : prev
      );
      setSets(prev =>
        prev.map(set => ({
          ...set,
          tests: set.tests.map(test =>
            test.id === editingLabTest.id ? { ...test, name } : test
          ),
        }))
      );
      toast.success(`Renamed test to “${name}”`);
      setEditingLabTest(null);
      setEditedLabTestName("");
    } catch (err) {
      setEditLabTestError((err as Error).message);
    } finally {
      setSavingLabTestName(false);
    }
  }

  const selectedList = useMemo(() => Object.values(selected), [selected]);
  const totals = useMemo(() => {
    const price = selectedList.reduce((s, t) => s + t.price, 0);
    const markup = selectedList.reduce((s, t) => s + t.markup, 0);
    return { price, markup, profit: markup - price };
  }, [selectedList]);

  async function saveCurrentSet() {
    const name = setName.trim();
    if (!name || selectedList.length === 0) return;
    setSavingSet(true);
    try {
      const res = await fetch(apiUrl("/lab-sets/"), {
        method: "POST",
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, testIds: selectedList.map(t => t.id) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "Failed to save set");
      toast.success(
        data.replaced ? `Updated set “${name}”` : `Saved set “${name}”`
      );
      setSetName("");
      refreshSets();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSavingSet(false);
    }
  }

  function loadSet(s: LabTestSet) {
    setSelected(Object.fromEntries(s.tests.map(t => [t.id, t])));
    toast.success(`Loaded “${s.name}” (${s.tests.length} tests)`);
  }

  async function updateSetName(setId: string, name: string) {
    const res = await fetch(apiUrl(`/lab-sets/${setId}`), {
      method: "PATCH",
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) throw new Error("Failed to update set name");
  }

  async function deleteSet(setId: string) {
    const res = await fetch(apiUrl(`/lab-sets/${setId}`), {
      method: "DELETE",
      headers: getAuthorizationHeader(),
    });

    if (!res.ok) throw new Error("Failed to delete set");
  }

  function startEditingSet(s: LabTestSet) {
    setEditingSet(s);
    setEditedSetName(s.name);
    setEditSetError("");
  }

  function closeEditSetDialog() {
    if (savingSetName) return;

    setEditingSet(null);
    setEditedSetName("");
    setEditSetError("");
  }

  async function saveSetName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingSet) return;

    const name = editedSetName.trim();

    if (!name) {
      setEditSetError("Enter a set name.");
      return;
    }

    setSavingSetName(true);
    setEditSetError("");

    try {
      await updateSetName(editingSet.id, name);
      setSets(prev =>
        prev.map(s => (s.id === editingSet.id ? { ...s, name } : s))
      );
      toast.success(`Renamed set to “${name}”`);
      setEditingSet(null);
      setEditedSetName("");
    } catch (err) {
      setEditSetError((err as Error).message);
    } finally {
      setSavingSetName(false);
    }
  }

  function startDeletingSet(s: LabTestSet) {
    setDeletingSet(s);
    setDeleteSetError("");
  }

  function closeDeleteSetDialog() {
    if (deletingSetId) return;

    setDeletingSet(null);
    setDeleteSetError("");
  }

  async function confirmDeleteSet() {
    if (!deletingSet) return;

    const setId = deletingSet.id;
    setDeletingSetId(setId);
    setDeleteSetError("");

    try {
      await deleteSet(setId);
      toast.success(`Deleted “${deletingSet.name}”`);
      setSets(prev => prev.filter(s => s.id !== setId));
      setDeletingSet(null);
    } catch (err) {
      setDeleteSetError((err as Error).message);
    } finally {
      setDeletingSetId("");
    }
  }

  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(total, page * PAGE_SIZE);

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
        <div className="mx-auto max-w-[1200px]">
          <h1 className="font-display text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.4rem]">
            Lab Test Search
          </h1>
          <p className="mt-2 text-sm text-white/44">
            Search the Archway lab price list, build a panel, and see your
            combined pricing.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* ── Left: search + results ─────────────────────────────────── */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[240px] flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={query}
                    onChange={e => changeFilter(() => setQuery(e.target.value))}
                    placeholder="Search by test name, CPT code, or catalog #…"
                    className="w-full rounded-full border border-white/12 bg-white/[0.05] py-3.5 pl-11 pr-5 text-sm text-white placeholder-white/28 outline-none transition focus:border-[#c8b7ff]/50 focus:bg-white/[0.07]"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {COMPANIES.map(c => (
                  <button
                    key={c}
                    onClick={() => changeFilter(() => setCompany(c))}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${company === c
                        ? "border-[#c8b7ff]/60 bg-[#c8b7ff]/15 text-[#d6caff]"
                        : "border-white/12 bg-white/[0.04] text-white/50 hover:text-white"
                      }`}
                  >
                    {c}
                  </button>
                ))}
                <button
                  onClick={() => changeFilter(() => setFavOnly(v => !v))}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium transition ${favOnly
                      ? "border-[#ffd27a]/50 bg-[#ffd27a]/12 text-[#ffd27a]"
                      : "border-white/12 bg-white/[0.04] text-white/50 hover:text-white"
                    }`}
                >
                  <Star
                    className="h-3.5 w-3.5"
                    fill={favOnly ? "currentColor" : "none"}
                  />
                  Favorites
                </button>
                <span className="ml-auto text-xs text-white/35">
                  {loading
                    ? "Searching…"
                    : `Showing ${rangeStart}–${rangeEnd} of ${total.toLocaleString()} tests`}
                </span>
              </div>

              {/* Results list */}
              <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03]">
                <div className="hidden grid-cols-[2.75rem_minmax(0,1fr)_13rem_5rem] items-center gap-3 border-b border-white/10 px-5 py-3 text-[0.65rem] uppercase tracking-wider text-white/35 sm:grid">
                  <span />
                  <span>Test</span>
                  <div className="grid grid-cols-2 gap-x-1">
                    <span className="text-right">Price</span>
                    <span className="text-right">Markup</span>
                  </div>
                  <span />
                </div>

                {loading && (
                  <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <Loader2 className="h-7 w-7 animate-spin text-[#c8b7ff]" />
                    <p className="text-sm text-white/50">
                      Searching lab tests…
                    </p>
                  </div>
                )}

                {!loading && results.length === 0 && (
                  <div className="py-14 text-center">
                    <p className="text-sm text-white/40">
                      No matching lab tests found. Try a different term.
                    </p>
                  </div>
                )}

                {!loading &&
                  results.map(t => {
                    const isSelected = Boolean(selected[t.id]);
                    return (
                      <div
                        key={t.id}
                        onClick={() => toggleTest(t)}
                        className={`group grid cursor-pointer grid-cols-[2.75rem_minmax(0,1fr)_2rem] items-center gap-3 border-b border-white/[0.06] px-5 py-3 transition last:border-b-0 sm:grid-cols-[2.75rem_minmax(0,1fr)_13rem_5rem] ${isSelected
                            ? "bg-[#c8b7ff]/[0.08] hover:bg-[#c8b7ff]/[0.12]"
                            : "hover:bg-white/[0.04]"
                          }`}
                      >
                        <button
                          aria-label={
                            isSelected ? "Remove from panel" : "Add to panel"
                          }
                          className={`flex h-7 w-7 items-center justify-center rounded-full border transition ${isSelected
                              ? "border-[#c8b7ff] bg-[#c8b7ff] text-[#17120d]"
                              : "border-white/20 text-white/50 hover:border-[#c8b7ff]/60 hover:text-[#c8b7ff]"
                            }`}
                        >
                          {isSelected ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                toggleFavorite(t);
                              }}
                              aria-label={
                                t.favorite
                                  ? "Remove from favorites"
                                  : "Add to favorites"
                              }
                              className={`shrink-0 transition ${t.favorite
                                  ? "text-[#ffd27a] hover:text-[#ffba47]"
                                  : "text-white/25 hover:text-[#ffd27a]"
                                }`}
                            >
                              <Star
                                className="h-3.5 w-3.5"
                                fill={t.favorite ? "currentColor" : "none"}
                              />
                            </button>
                            <span className="truncate text-sm font-medium text-white">
                              {t.name}
                            </span>
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-[0.68rem] text-white/38">
                            <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono">
                              {t.company} · {t.catalog}
                            </span>
                            {t.cpt && (
                              <span className="truncate font-mono">
                                CPT {t.cpt}
                              </span>
                            )}
                          </div>
                          {/* Mobile prices */}
                          <div className="mt-1 flex gap-4 text-xs sm:hidden">
                            <span className="text-white/60">
                              Price {money(t.price)}
                            </span>
                            <span className="text-[#c8b7ff]">
                              Markup {money(t.markup)}
                            </span>
                          </div>
                        </div>
                        <div className="hidden grid-cols-2 gap-x-1 sm:grid">
                          <span className="text-right text-sm text-white/70">
                            {money(t.price)}
                          </span>
                          <span className="text-right text-sm font-semibold text-[#c8b7ff]">
                            {money(t.markup)}
                          </span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              onClick={event => event.stopPropagation()}
                              className="inline-flex h-7 w-7 justify-self-end items-center justify-center rounded-md text-white/45 transition hover:bg-white/[0.09] hover:text-white focus:bg-white/[0.09] focus:text-white focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                              aria-label={`Actions for ${t.name}`}
                              title="Test actions"
                            >
                              <Ellipsis className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            onClick={event => event.stopPropagation()}
                            className="min-w-32 border-white/10 bg-[#211b31] text-white shadow-xl"
                          >
                            <DropdownMenuItem
                              onSelect={event => {
                                event.stopPropagation();
                                startEditingLabTest(t);
                              }}
                              className="cursor-pointer text-white/85 focus:bg-white/[0.1] focus:text-white"
                            >
                              <Pencil className="h-3.5 w-3.5" /> Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    );
                  })}
              </div>

              {/* Pagination */}
              {total > PAGE_SIZE && (
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1 || loading}
                    className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs text-white/60 transition hover:text-white disabled:opacity-40"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Prev
                  </button>
                  <span className="text-xs text-white/40">
                    Page {page} of {lastPage.toLocaleString()}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(lastPage, p + 1))}
                    disabled={page >= lastPage || loading}
                    className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs text-white/60 transition hover:text-white disabled:opacity-40"
                  >
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* ── Right: selected panel + saved sets ─────────────────────── */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between">
                  <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                    <FlaskConical className="h-4 w-4 text-[#c8b7ff]" />
                    Selected Tests
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.68rem] text-white/60">
                      {selectedList.length}
                    </span>
                  </h2>
                  {selectedList.length > 0 && (
                    <button
                      onClick={() => setSelected({})}
                      className="text-xs text-white/40 transition hover:text-white"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {selectedList.length === 0 ? (
                  <p className="mt-4 text-xs leading-5 text-white/38">
                    Click tests on the left to build a panel. Combined price,
                    markup, and profit show up here.
                  </p>
                ) : (
                  <>
                    <div className="mt-4 flex max-h-[18rem] flex-col gap-1.5 overflow-y-auto pr-1">
                      {selectedList.map(t => (
                        <div
                          key={t.id}
                          className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium text-white/85">
                              {t.name}
                            </p>
                            <p className="text-[0.65rem] text-white/35">
                              {money(t.price)} → {money(t.markup)}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleTest(t)}
                            aria-label={`Remove ${t.name}`}
                            className="text-white/30 transition hover:text-white"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
                      <div className="flex items-center justify-between text-white/60">
                        <span>Total Price (your cost)</span>
                        <span>{money(totals.price)}</span>
                      </div>
                      <div className="flex items-center justify-between text-white/60">
                        <span>Total Markup (charge)</span>
                        <span className="font-semibold text-[#c8b7ff]">
                          {money(totals.markup)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-white">
                        <span className="font-semibold">Profit</span>
                        <span className="font-semibold text-emerald-400">
                          {money(totals.profit)}
                        </span>
                      </div>
                    </div>

                    {/* Save as set */}
                    <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
                      <input
                        type="text"
                        value={setName}
                        onChange={e => setSetName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") saveCurrentSet();
                        }}
                        placeholder="Set name (e.g. Annual Physical)"
                        className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs text-white placeholder-white/28 outline-none transition focus:border-[#c8b7ff]/50"
                      />
                      <button
                        onClick={saveCurrentSet}
                        disabled={!setName.trim() || savingSet}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#c8b7ff] px-4 py-2 text-xs font-semibold text-[#17120d] transition hover:bg-[#d6caff] disabled:opacity-50"
                      >
                        {savingSet ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Bookmark className="h-3.5 w-3.5" />
                        )}
                        Save
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Saved sets */}
              <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
                <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <Bookmark className="h-4 w-4 text-[#c8b7ff]" />
                  Saved Sets
                </h2>
                {sets.length === 0 ? (
                  <p className="mt-3 text-xs leading-5 text-white/38">
                    No saved sets yet. Select tests and save them as a named set
                    to reuse later.
                  </p>
                ) : (
                  <div className="mt-3 flex flex-col gap-2">
                    {sets.map(s => {
                      const setPrice = s.tests.reduce(
                        (sum, t) => sum + t.price,
                        0
                      );
                      const setMarkup = s.tests.reduce(
                        (sum, t) => sum + t.markup,
                        0
                      );
                      return (
                        <div
                          key={s.id}
                          className="group relative rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5"
                        >
                          <div className="flex items-center gap-2 pr-7">
                            <p className="min-w-0 flex-1 truncate text-xs font-semibold text-white/90">
                              {s.name}
                            </p>
                            <button
                              onClick={() => loadSet(s)}
                              className="rounded-full border border-[#c8b7ff]/40 px-3 py-1 text-[0.65rem] font-medium text-[#c8b7ff] transition hover:bg-[#c8b7ff]/10"
                            >
                              Load
                            </button>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-md text-white/45 opacity-0 transition hover:bg-white/[0.09] hover:text-white focus:pointer-events-auto focus:bg-white/[0.09] focus:text-white focus:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100"
                                aria-label={`Actions for ${s.name}`}
                                title="Set actions"
                              >
                                <Ellipsis className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="min-w-32 border-white/10 bg-[#211b31] text-white shadow-xl"
                            >
                              <DropdownMenuItem
                                onSelect={() => startEditingSet(s)}
                                className="cursor-pointer text-white/85 focus:bg-white/[0.1] focus:text-white"
                              >
                                <Pencil className="h-3.5 w-3.5" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                variant="destructive"
                                onSelect={() => startDeletingSet(s)}
                                className="cursor-pointer text-rose-400 focus:bg-rose-500/10 focus:text-rose-300"
                              >
                                <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <p className="mt-1 text-[0.65rem] text-white/40">
                            {s.tests.length} tests · {money(setPrice)} →{" "}
                            {money(setMarkup)} ·{" "}
                            <span className="text-emerald-400/80">
                              +{money(setMarkup - setPrice)}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog
        open={Boolean(editingSet)}
        onOpenChange={open => {
          if (!open) closeEditSetDialog();
        }}
      >
        <DialogContent className="border-white/10 bg-[#211b31] text-white sm:max-w-md">
          <form onSubmit={saveSetName}>
            <DialogHeader>
              <DialogTitle>Edit set name</DialogTitle>
              <DialogDescription className="text-white/55">
                Choose a new name for this saved lab set.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5">
              <label
                htmlFor="saved-set-name"
                className="mb-2 block text-sm font-medium text-white/70"
              >
                Set name
              </label>
              <input
                id="saved-set-name"
                type="text"
                value={editedSetName}
                onChange={event => setEditedSetName(event.target.value)}
                autoFocus
                disabled={savingSetName}
                className="w-full rounded-xl border border-white/12 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#c8b7ff]/50 focus:bg-white/[0.07] disabled:opacity-50"
              />
              {editSetError && (
                <p className="mt-2 text-sm text-rose-300">{editSetError}</p>
              )}
            </div>
            <DialogFooter className="mt-6">
              <button
                type="button"
                onClick={closeEditSetDialog}
                disabled={savingSetName}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingSetName}
                className="rounded-full bg-[#c8b7ff] px-4 py-2 text-sm font-semibold text-[#17120d] transition hover:bg-[#d6caff] disabled:opacity-50"
              >
                {savingSetName ? "Saving…" : "Save"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(editingLabTest)}
        onOpenChange={open => {
          if (!open) closeEditLabTestDialog();
        }}
      >
        <DialogContent className="border-white/10 bg-[#211b31] text-white sm:max-w-md">
          <form onSubmit={saveLabTestName}>
            <DialogHeader>
              <DialogTitle>Edit test name</DialogTitle>
              <DialogDescription className="text-white/55">
                Choose a new name for this lab test.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5">
              <label
                htmlFor="lab-test-name"
                className="mb-2 block text-sm font-medium text-white/70"
              >
                Test name
              </label>
              <input
                id="lab-test-name"
                type="text"
                value={editedLabTestName}
                onChange={event => setEditedLabTestName(event.target.value)}
                autoFocus
                disabled={savingLabTestName}
                className="w-full rounded-xl border border-white/12 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#c8b7ff]/50 focus:bg-white/[0.07] disabled:opacity-50"
              />
              {editLabTestError && (
                <p className="mt-2 text-sm text-rose-300">{editLabTestError}</p>
              )}
            </div>
            <DialogFooter className="mt-6">
              <button
                type="button"
                onClick={closeEditLabTestDialog}
                disabled={savingLabTestName}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingLabTestName}
                className="rounded-full bg-[#c8b7ff] px-4 py-2 text-sm font-semibold text-[#17120d] transition hover:bg-[#d6caff] disabled:opacity-50"
              >
                {savingLabTestName ? "Saving…" : "Save"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deletingSet)}
        onOpenChange={open => {
          if (!open) closeDeleteSetDialog();
        }}
      >
        <DialogContent className="border-white/10 bg-[#211b31] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete {deletingSet?.name}?</DialogTitle>
            <DialogDescription className="text-white/55">
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteSetError && (
            <p className="text-sm text-rose-300">{deleteSetError}</p>
          )}
          <DialogFooter className="mt-2">
            <button
              type="button"
              onClick={closeDeleteSetDialog}
              disabled={Boolean(deletingSetId)}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirmDeleteSet()}
              disabled={Boolean(deletingSetId)}
              className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400 disabled:opacity-50"
            >
              {deletingSetId ? "Deleting…" : "Delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
