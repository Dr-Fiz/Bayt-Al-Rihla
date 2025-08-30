// src/aqeedah/AqeedahBooksPage.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ChevronLeft, BookOpen, Bookmark, Search } from "lucide-react";

/* ------------------------------ Data ------------------------------------- */
const books = [
  { id: "kitab-at-tawhid", title: "Kitāb at-Tawḥīd", arabic: "كتاب التوحيد", path: "/aqeedah/books/kitab-at-tawhid", tone: "emerald", badge: "Core Text",
    desc: "Chapters with proofs clarifying worship for Allah alone and warning against shirk." },
  { id: "wasitiyyah", title: "al-ʿAqīdah al-Wāsiṭiyyah", arabic: "العقيدة الواسطية", path: "/aqeedah/books/wasitiyyah", tone: "indigo", badge: "Attributes & Creed",
    desc: "Concise creed by Ibn Taymiyyah focusing on Names & Attributes, faith and Sunnah." },
  { id: "nullifiers", title: "Nullifiers of ʿAqīdah", arabic: "نواقض التوحيد", path: "/aqeedah/books/nullifiers", tone: "rose", badge: "Caution List",
    desc: "High-impact primer on beliefs/actions that nullify Islam — memorize with evidences." },
  { id: "usul-ath-thalatha", title: "Uṣūl ath-Thalātha", arabic: "الأصول الثلاثة", path: "/aqeedah/books/usul-ath-thalatha", tone: "amber", badge: "Beginner Friendly",
    desc: "Three fundamental principles every Muslim must know — with proofs." },
];

const tones = {
  emerald: { ring:"ring-emerald-500/20", border:"border-emerald-300", bg:"from-emerald-100 to-emerald-50", badge:"bg-emerald-200 text-emerald-900 border border-emerald-400", hover:"hover:border-emerald-500 hover:bg-emerald-50" },
  indigo:  { ring:"ring-indigo-500/20",  border:"border-indigo-300",  bg:"from-indigo-100 to-indigo-50",  badge:"bg-indigo-200 text-indigo-900 border border-indigo-400",  hover:"hover:border-indigo-500 hover:bg-indigo-50" },
  rose:    { ring:"ring-rose-500/20",    border:"border-rose-300",    bg:"from-rose-100 to-rose-50",     badge:"bg-rose-200 text-rose-900 border border-rose-400",      hover:"hover:border-rose-500 hover:bg-rose-50" },
  amber:   { ring:"ring-amber-500/20",   border:"border-amber-300",   bg:"from-amber-100 to-amber-50",   badge:"bg-amber-200 text-amber-950 border border-amber-400",   hover:"hover:border-amber-500 hover:bg-amber-50" },
};

/* ------------------------------ Page ------------------------------------- */
export default function AqeedahBooksPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.arabic.toLowerCase().includes(q) ||
        b.desc.toLowerCase().includes(q) ||
        b.badge.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Cozy soft glows (match homepage vibe) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(251,191,36,0.20),rgba(255,255,255,0))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-40 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-rose-200/60 via-pink-200/50 to-amber-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-amber-200/60 via-orange-200/50 to-rose-200/40 blur-3xl"
      />

      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pt-10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800">
              <ChevronLeft className="h-4 w-4" />
              Back to home
            </Link>

            <Link to="/" className="flex items-center gap-3" aria-label="Bayt Al Rihla — Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md">
                <span className="text-lg font-bold">ب</span>
              </div>
              <div>
                <p className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
                  Bayt Al Rihla
                </p>
                <p className="-mt-1 text-xs text-slate-600">House of the Journey</p>
              </div>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-emerald-900">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-bold">ʿAqīdah</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Choose a Book</h1>
            <p className="-mt-1 text-xs font-semibold text-slate-600">
              Study from classical texts — organized, aesthetic, and proof-based.
            </p>
          </div>

          {/* Search box (mirrors homepage search UX) */}
          <label className="relative w-full max-w-sm">
            <span className="sr-only">Search books</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books, badges, or descriptions…"
              className="w-full rounded-xl border border-slate-200 bg-white/90 py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </label>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-4 text-xs text-slate-500">
          {filtered.length} {filtered.length === 1 ? "book" : "books"}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((b, i) => {
            const t = tones[b.tone];
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={`rounded-2xl border ${t.border} bg-gradient-to-br ${t.bg} p-5 shadow-md ring-1 ${t.ring} backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide ${t.badge}`}
                    >
                      <Bookmark className="mr-1 h-3.5 w-3.5" /> {b.badge}
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900">{b.title}</h2>
                    <p className="text-sm font-medium text-slate-600">{b.arabic}</p>
                  </div>
                  <BookOpen className="mt-1 h-6 w-6 text-slate-700" />
                </div>

                <p className="mt-3 leading-7 text-slate-800">{b.desc}</p>

                <div className="mt-4">
                  <Link
                    to={b.path}
                    className={`inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition ${t.hover}`}
                    aria-label={`Open ${b.title}`}
                  >
                    Open book →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Footer (mirrors homepage) */}
      <footer className="border-t border-slate-200/70 bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Bayt Al Rihla. Viewing only — no sign-in required.
        </div>
      </footer>
    </div>
  );
}
