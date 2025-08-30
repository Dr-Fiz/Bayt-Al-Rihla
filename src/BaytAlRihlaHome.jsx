import React, { useMemo, useState } from "react";
import {
  ShieldCheck,
  Scale,
  BookOpen,
  MapPinned,
  ScrollText,
  HeartHandshake,
  Languages,
  Landmark,
  ArrowRight,
  Search,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ----------------------------- Subjects ---------------------------------- */
const subjects = [
  { name: "Aqeedah", slug: "aqeedah", description: "Foundations of Islamic belief and creed.", Icon: ShieldCheck },
  { name: "Fiqh", slug: "fiqh", description: "Jurisprudence: rulings, worship, and transactions.", Icon: Scale },
  { name: "Tafseer", slug: "tafseer", description: "Exegesis and understanding of the Qur'an.", Icon: BookOpen },
  { name: "Seerah", slug: "seerah", description: "The prophetic biography and timeless lessons.", Icon: MapPinned },
  { name: "Hadith", slug: "hadith", description: "Sayings, actions, and approvals of the Prophet ﷺ.", Icon: ScrollText },
  { name: "Islamic Ethics", slug: "islamic-ethics", description: "Character, adab, and spiritual refinement.", Icon: HeartHandshake },
  { name: "Arabic", slug: "arabic", description: "Language of the Qur'an: grammar, vocabulary, and eloquence.", Icon: Languages },
  { name: "Islamic History", slug: "islamic-history", description: "Civilizations, scholars, and milestones of the ummah.", Icon: Landmark },
];

/* ----------------------------- Scholars ---------------------------------- */
const scholars = [
  { name: "Ibn Taymiyyah", slug: "ibn-taymiyyah", years: "661–728 AH", focus: ["Aqeedah", "Fiqh"] },
  { name: "Ibn al-Qayyim", slug: "ibn-al-qayyim", years: "691–751 AH", focus: ["Aqeedah", "Tazkiyah"] },
  { name: "Muhammad ibn ‘Abd al-Wahhab", slug: "muhammad-ibn-abd-al-wahhab", years: "1115–1206 AH", focus: ["Tawheed"] },
  { name: "Al-Albani", slug: "al-albani", years: "1333–1420 AH", focus: ["Hadith"] },
  { name: "Ibn Baz", slug: "ibn-baz", years: "1330–1420 AH", focus: ["Fiqh", "Aqeedah"] },
  { name: "Ibn ‘Uthaymeen", slug: "ibn-uthaymeen", years: "1347–1421 AH", focus: ["Fiqh", "Usul"] },
  { name: "Salih al-Fawzan", slug: "salih-al-fawzan", years: "1354 AH –", focus: ["Fiqh", "Aqeedah"] },
  { name: "Abd al-Muhsin al-‘Abbad", slug: "abd-al-muhsin-al-abbad", years: "1353 AH –", focus: ["Hadith"] },
];

const GRADIENTS = [
  "from-amber-500 via-orange-500 to-rose-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-fuchsia-500 via-pink-500 to-rose-500",
  "from-indigo-500 via-violet-500 to-fuchsia-500",
  "from-sky-500 via-cyan-500 to-emerald-500",
  "from-rose-500 via-red-500 to-orange-500",
];

/* ------------------------------ Cards ------------------------------------ */
// Turn Link into a motion component
const MotionLink = motion(Link);

const SubjectCard = ({ name, description, href, Icon, index = 0 }) => (
  <MotionLink
    to={href} // ✅ use Router Link, not <a href>
    className="group relative block rounded-2xl border border-white/50 bg-white/85 p-6 shadow-sm ring-1 ring-slate-200/60 transition hover:shadow-xl hover:ring-emerald-300/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 backdrop-blur-sm"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: index * 0.02 }}
    aria-label={`Explore ${name}`}
  >
    <div className="flex items-start gap-4">
      <div className={`rounded-xl bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} p-3 text-white shadow-md`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-700">{description}</p>
      </div>
    </div>
    <div className="pointer-events-none absolute right-4 top-4 opacity-0 transition-all group-hover:right-3 group-hover:opacity-100">
      <ArrowRight className="h-5 w-5 text-slate-400" aria-hidden="true" />
    </div>
  </MotionLink>
);

const ScholarCard = ({ s, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.25, delay: index * 0.02 }}
  >
    <Link
      to={`/scholars/${s.slug}`}
      className="group relative flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md backdrop-blur-sm"
      aria-label={`Go to ${s.name}`}
    >
      <div className={`mt-0.5 rounded-lg bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} p-2 text-white`}>
        <Users className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-900">{s.name}</p>
        <p className="mt-0.5 text-xs text-slate-600">{s.years}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {s.focus.map((f) => (
            <span key={f} className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              {f}
            </span>
          ))}
        </div>
      </div>
      <ArrowRight className="ml-auto h-4 w-4 text-slate-400 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
    </Link>
  </motion.div>
);

/* ------------------------------- Page ------------------------------------ */
export default function BaytAlRihlaHome() {
  const [query, setQuery] = useState("");
  const [scholarQuery, setScholarQuery] = useState("");

  const filteredSubjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [query]);

  const filteredScholars = useMemo(() => {
    const q = scholarQuery.trim().toLowerCase();
    if (!q) return scholars;
    return scholars.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.focus.join(" ").toLowerCase().includes(q) ||
        (s.years || "").toLowerCase().includes(q)
    );
  }, [scholarQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* glows */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(251,191,36,0.20),rgba(255,255,255,0))]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-40 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-rose-200/60 via-pink-200/50 to-amber-200/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-amber-200/60 via-orange-200/50 to-rose-200/40 blur-3xl" />

      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pb-6 pt-10 sm:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
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

          {/* Subject search */}
          <label className="relative w-full max-w-sm">
            <span className="sr-only">Search subjects</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search subjects..."
              className="w-full rounded-xl border border-slate-200 bg-white/90 py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </label>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-sm backdrop-blur"
        >
          <h1 className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
            Seek Knowledge with Clarity
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
            Welcome to <span className="font-semibold">Bayt Al Rihla</span> — a calm, distraction-free home for exploring
            the core sciences of Islam. Choose a subject or explore scholars below.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#subjects" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
              Browse Subjects <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#scholars" className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
              View Scholars <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Subjects */}
      <section id="subjects" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Subjects</h2>
            <p className="mt-1 text-sm text-slate-600">Clear, organized, and easy to read.</p>
          </div>
          <p className="text-xs text-slate-500">
            {filteredSubjects.length} {filteredSubjects.length === 1 ? "subject" : "subjects"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSubjects.map((s, i) => (
            <SubjectCard
              key={s.slug}
              name={s.name}
              description={s.description}
              href={`/${s.slug}`}   // ✅ Link will prepend basename (/Bayt-Al-Rihla)
              Icon={s.Icon}
              index={i}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">Tip: Use the search box above to quickly find a topic.</p>
      </section>

      {/* Scholars */}
      <section id="scholars" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Scholars</h2>
            <p className="mt-1 text-sm text-slate-600">
              Browse Salafi scholars and tap a card to visit their page.
            </p>
          </div>
          <label className="relative w-full max-w-sm">
            <span className="sr-only">Search scholars</span>
            <input
              type="text"
              value={scholarQuery}
              onChange={(e) => setScholarQuery(e.target.value)}
              placeholder="Search scholars (name, focus, years)…"
              className="w-full rounded-xl border border-slate-200 bg-white/90 py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredScholars.map((s, i) => (
            <ScholarCard key={s.slug} s={s} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Bayt Al Rihla. Viewing only — no sign-in required.
        </div>
      </footer>
    </div>
  );
}
