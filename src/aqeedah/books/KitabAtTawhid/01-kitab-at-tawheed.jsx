import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Bookmark,
  ScrollText,
  Quote,
  ShieldCheck,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * Kitāb at-Tawḥīd — Chapter 1: Introduction
 * Location: src/aqeedah/books/KitabAtTawhid/01-kitab-at-tawheed.jsx
 * Route:   /aqeedah/books/kitab-at-tawhid/kitab-at-tawheed  (HashRouter-safe)
 * ------------------------------------------------------------------------- */

/* ----------------------------- Tiny UI helpers ---------------------------- */
function Pill({ children, tone = "emerald" }) {
  const tones = {
    emerald:
      "border-emerald-500/60 bg-emerald-100 text-emerald-950 shadow-[inset_0_1px_0_#34d399]",
    sky: "border-sky-500/60 bg-sky-100 text-sky-950 shadow-[inset_0_1px_0_#38bdf8]",
    indigo:
      "border-indigo-500/60 bg-indigo-100 text-indigo-950 shadow-[inset_0_1px_0_#818cf8]",
    rose: "border-rose-500/60 bg-rose-100 text-rose-950 shadow-[inset_0_1px_0_#fb7185]",
    amber:
      "border-amber-500/60 bg-amber-100 text-amber-950 shadow-[inset_0_1px_0_#f59e0b]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm ring-1 ring-slate-200/60 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

const cx = (...a) => a.filter(Boolean).join(" ");
const scrollToId = (id) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

/* --------------------------------- Page ---------------------------------- */
export default function Chapter01_KitabAtTawheed() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Decorative soft glows */}
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

      {/* Header / breadcrumbs */}
      <header className="mx-auto max-w-7xl px-6 pt-10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/aqeedah/books/kitab-at-tawhid"
              className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back to Kitāb at-Tawḥīd
            </Link>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-emerald-900">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-bold">ʿAqīdah</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.4 }}
          className="rounded-3xl border border-white/60 bg-white/70 p-6 sm:p-8 shadow-sm backdrop-blur"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
                Kitāb at-Tawḥīd — Introduction
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-600">
                كتاب التوحيد — تمهيد
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="emerald">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> Core
                  creed
                </Pill>
                <Pill tone="sky">
                  <ScrollText className="h-3.5 w-3.5" aria-hidden="true" /> Text
                  with proofs
                </Pill>
                <Pill tone="rose">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                  Guarding from shirk
                </Pill>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToId("about")}
                className="rounded-xl border border-emerald-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                About the Book
              </button>
              <button
                onClick={() => scrollToId("study")}
                className="rounded-xl border border-sky-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-sky-800 shadow-sm hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                How to Study
              </button>
              <button
                onClick={() => scrollToId("evidences")}
                className="rounded-xl border border-amber-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-amber-900 shadow-sm hover:bg-amber-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                Evidences
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* About the book */}
            <Card className="border-emerald-200/70" id="about">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-2 text-white shadow-md">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    What is this book?
                  </h2>
                  <p className="mt-2 leading-7 text-slate-800">
                    <em>Kitāb at-Tawḥīd</em> is a concise, high-impact primer
                    that clarifies worship for Allah alone and blocks every
                    pathway to <em>shirk</em> (associating partners with Him).
                    It organizes the topic into short chapters, each anchored by
                    Qurʾānic verses and authentic ḥadīth, followed by brief,
                    practical conclusions. The goal is to make{" "}
                    <strong>pure tawḥīd</strong> actionable in daily life.
                  </p>
                </div>
              </div>
            </Card>

            {/* About the author */}
            <Card className="border-sky-200/70">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 p-2 text-white shadow-md">
                  <Bookmark className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    About the author
                  </h2>
                  <p className="mt-2 leading-7 text-slate-800">
                    Authored by{" "}
                    <strong>Shaykh Muḥammad ibn ʿAbd al-Wahhāb</strong>{" "}
                    (1115–1206 AH), a scholar of creed and reform. His method
                    centers the Book and Sunnah, the understanding of the Salaf,
                    and practical rectification: learning, acting, and calling
                    others with clarity and proofs.
                  </p>
                </div>
              </div>
            </Card>

            {/* Method & structure */}
            <Card className="border-indigo-200/70">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-2 text-white shadow-md">
                  <ScrollText className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Method & structure
                  </h2>
                  <ul className="mt-2 space-y-2 text-slate-800">
                    <li className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400"
                        aria-hidden="true"
                      />{" "}
                      Short, focused chapters on a single ruling or concept.
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400"
                        aria-hidden="true"
                      />{" "}
                      Primary evidences first (Qurʾān/Ḥadīth), then benefits and
                      cautions.
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400"
                        aria-hidden="true"
                      />{" "}
                      Emphasis on removing doubtful matters and common pathways
                      to shirk.
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400"
                        aria-hidden="true"
                      />{" "}
                      Practical orientation: rectifying belief, speech, and acts
                      of worship.
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Selected evidences */}
            <Card className="border-amber-200/70" id="evidences">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-2 text-white shadow-md">
                  <Quote className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Selected evidences referenced throughout
                  </h2>
                  <ul className="mt-3 space-y-3 text-slate-800">
                    <li>
                      <span className="font-semibold">Q 51:56</span> — “I did
                      not create jinn and mankind except that they worship Me.”
                    </li>
                    <li>
                      <span className="font-semibold">Q 39:3</span> — Purity of
                      worship belongs to Allah alone; false intermediaries are
                      rejected.
                    </li>
                    <li>
                      <span className="font-semibold">Q 4:48</span> — Allah does
                      not forgive associating partners with Him, but forgives
                      what is less than that for whom He wills.
                    </li>
                    <li>
                      <span className="font-semibold">Q 39:65</span> — Even the
                      greatest deeds are nullified by shirk.
                    </li>
                    <li>
                      <span className="font-semibold">Ḥadīth</span> —
                      “Supplication is worship.” (at-Tirmidhī) • Whoever meets
                      Allah not associating anything with Him will enter
                      Paradise. (Muslim)
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Right column — only navigation now */}
          <div className="space-y-6">
            <Card className="border-emerald-200/70">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/aqeedah/books/kitab-at-tawhid"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> All
                  topics
                </Link>
                <Link
                  to="/aqeedah/books/kitab-at-tawhid/categories-of-tawheed"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Next: Categories of Tawḥīd{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Bayt Al Rihla. Viewing only — no sign-in
          required.
        </div>
      </footer>
    </div>
  );
}
