import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Sparkles,
  BookOpen,
  BookMarked,
  Search,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ----------------------------- Data: Volume 1 ----------------------------- */
const vol1Topics = [
  "Kitab At-Tawheed",
  "Categories of Tawheed",
  "Explanation of Some Verses on Tawheed",
  "The Excellence of Tawheed & What It Expiates of Sins",
  "Whoever Truly Attains Tawheed Will Be Admitted into Paradise Without Accounting",
  "Fear of Shirk",
  "Invitation to Testifying that Laa Ilaaha Illa Allah (There Is No Deity Worthy of Worship Except Allah)",
  "Explanation of Tawheed & the Testimony that: Laa Ilaaha Illa Allah",
  "Shirk Includes Wearing Amulet, Charm & the Likes to Remove or Prevent Affliction",
  "What Is Reported on Ar-Ruqaa (Exorcism) & the Use of Amulets",
  "He Who Seeks Blessings Through a Tree, Stone or the Like",
  "What Is Mentioned About Slaughtering for Other than Allah",
  "Sacrifice Should Not Be Made for Allah at an Altar",
  "To Make a Vow to Other than Allah Is from Shirk",
  "To Seek Refuge with Other than Allah Is from Shirk",
  "To Seek Assistance from Other than Allah or Supplicate to Other than Him Is from Shirk",
  "Allah’s Saying — I",
  "Allah’s Saying — II",
  "Intercession (Ash-Shafāʿah)",
  "The Saying of Allah the Exalted",
  "Cause of the Disbelief of the Children of Ādam & Their Abandoning",
  "Strong Condemnation of One Who Worships by a Righteous Man’s Grave",
  "Immoderation About the Graves of the Righteous Turns Them to Idols",
  "Al-Mustafā’s Safeguarding of Tawheed & Blocking Paths to Shirk",
  "Some of This Ummah Will Worship Idols",
  "What Has Been Reported Concerning As-Siḥr",
  "Explaining Some Forms of Siḥr",
  "What Has Been Reported Concerning Soothsayers and Their Likes",
  "What Has Been Reported Concerning An-Nushrah",
  "What Has Been Reported About Evil Omens",
];

const chapterSlugs = [
  "kitab-at-tawheed",
  "categories-of-tawheed",
  "explanation-of-some-verses-on-tawheed",
  "excellence-of-tawheed-and-what-it-expiates-of-sins",
  "whoever-truly-attains-tawheed-enters-paradise-without-accounting",
  "fear-of-shirk",
  "invitation-to-testifying-la-ilaha-illa-allah",
  "explanation-of-tawheed-and-testimony-la-ilaha-illa-allah",
  "shirk-includes-wearing-amulets-charms",
  "ruqya-and-amulets",
  "seeking-blessings-through-objects",
  "slaughtering-for-other-than-allah",
  "sacrifice-at-altars-for-other-than-allah",
  "vow-to-other-than-allah",
  "seeking-refuge-with-other-than-allah",
  "seeking-assistance-or-supplicating-to-other-than-allah",
  "allahs-saying-i",
  "allahs-saying-ii",
  "intercession-ash-shafaa",
  "the-saying-of-allah-the-exalted",
  "cause-of-disbelief-of-children-of-adam",
  "condemnation-worship-by-grave-of-righteous",
  "immoderation-about-graves-turns-to-idols",
  "mustafa-safeguarding-tawheed-blocking-paths-to-shirk",
  "some-of-this-ummah-will-worship-idols",
  "reported-concerning-sihr",
  "explaining-some-forms-of-sihr",
  "soothsayers-and-their-likes",
  "an-nushrah",
  "evil-omens",
];

/* ----------------------------- UI Helpers ----------------------------- */
const cx = (...a) => a.filter(Boolean).join(" ");

function VolumeChip({ active, children, color }) {
  const colors =
    {
      emerald: active
        ? "bg-emerald-700 text-white"
        : "bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200",
      indigo: active
        ? "bg-indigo-700 text-white"
        : "bg-indigo-100 text-indigo-900 border border-indigo-300 hover:bg-indigo-200",
    }[color || "emerald"];
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-xl px-3 py-1 text-sm font-bold transition",
        colors
      )}
    >
      {children}
    </span>
  );
}

function Header() {
  return (
    <header className="mx-auto max-w-7xl px-6 pt-10 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/aqeedah"
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Aqīdah books
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

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Kitāb at-Tawḥīd
          </h1>
          <p className="-mt-1 text-xs font-semibold text-slate-600">
            Choose a volume • Read by topic • Clean & vibrant layout
          </p>
        </div>
        <BookOpen className="mt-1 h-7 w-7 text-slate-700" />
      </div>
    </header>
  );
}

/* Topic row that stays a proper <li> but makes the whole card a link */
function TopicRow({ index, title, to }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      className="list-none"
    >
      <Link
        to={to}
        className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white/80 p-3 shadow-sm ring-1 ring-black/5 hover:border-emerald-400 hover:bg-white"
      >
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-100 text-[11px] font-extrabold text-emerald-800">
          {index}
        </div>
        <div className="flex-1">
          <p className="text-slate-900">{title}</p>
        </div>
        <CheckCircle2 className="h-5 w-5 opacity-0 text-emerald-600 transition group-hover:opacity-100" />
      </Link>
    </motion.li>
  );
}

/* ------------------------------- Page ---------------------------------- */
export default function KitabAtTawhidPage() {
  const [volume, setVolume] = useState("vol1"); // "vol1" | "vol2"
  const [query, setQuery] = useState("");

  // stable mapping: chapter number + title + slug
  const pairs = useMemo(
    () =>
      vol1Topics.map((title, i) => ({
        no: i + 1,
        title,
        slug: chapterSlugs[i],
      })),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? pairs.filter((p) => p.title.toLowerCase().includes(q)) : pairs;
  }, [pairs, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Cozy soft glows (match homepage) */}
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

      <Header />

      {/* Volume selector */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-emerald-400 bg-gradient-to-r from-emerald-100 via-sky-100 to-indigo-100 p-5 shadow-md ring-1 ring-black/5 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-emerald-800" />
              <span className="text-sm font-bold text-emerald-900">
                Select a volume
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVolume("vol1")}
                className="focus:outline-none"
                aria-label="Open Volume One"
              >
                <VolumeChip active={volume === "vol1"} color="emerald">
                  Volume One
                </VolumeChip>
              </button>
              <button
                onClick={() => setVolume("vol2")}
                className="focus:outline-none"
                aria-label="Open Volume Two"
              >
                <VolumeChip active={volume === "vol2"} color="indigo">
                  Volume Two
                </VolumeChip>
              </button>
            </div>
          </div>

          {volume === "vol1" && (
            <p className="mt-3 text-xs font-semibold text-slate-700">
              {filtered.length}/{vol1Topics.length} topics • search and pick a chapter
            </p>
          )}
          {volume === "vol2" && (
            <p className="mt-3 text-xs font-semibold text-slate-700">
              Content coming soon — outline is being prepared.
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        {volume === "vol1" ? (
          <div className="space-y-6">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Search topics (e.g., shirk, amulets, intercession)…"
                aria-label="Search Kitab at-Tawhid topics"
              />
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                {filtered.length}/{vol1Topics.length}
              </span>
            </div>

            {/* Topic list */}
            <ol className="grid gap-2">
              {filtered.map((p) => (
                <TopicRow
                  key={p.slug}
                  index={p.no}
                  title={p.title}
                  to={`/aqeedah/books/kitab-at-tawhid/${p.slug}`}
                />
              ))}
            </ol>

            {/* CTA */}
            <div className="flex items-center justify-between rounded-2xl border border-emerald-300 bg-white p-4 shadow-sm">
              <div className="text-sm text-slate-700">
                Tip: Start at the top and memorize proofs as you go.
              </div>
              <Link
                to={`/aqeedah/books/kitab-at-tawhid/${chapterSlugs[0]}`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-extrabold text-white shadow-md hover:bg-emerald-800"
              >
                Start Volume One <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-indigo-300 bg-gradient-to-br from-indigo-100 to-indigo-50 p-6 text-slate-800 shadow-md"
          >
            <h2 className="text-xl font-extrabold text-slate-900">
              Volume Two — Coming Soon
            </h2>
            <p className="mt-2 leading-7">
              We’re preparing the Volume Two outline with the same clean,
              vibrant layout and quick-access tools (search, progress, and quizzes).
            </p>
            <p className="mt-2 text-sm text-slate-600">
              You can proceed with Volume One in the meantime.
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200/80 bg-white/80">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-700">
          © {new Date().getFullYear()} Bayt Al Rihla
        </div>
      </footer>
    </div>
  );
}
