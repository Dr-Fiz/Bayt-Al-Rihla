// src/aqeedah/books/KitabAtTawhid/01-kitab-at-tawheed.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Quote,
  Info,
  ListChecks,
  XCircle,
} from "lucide-react";

/* ------------------------------ Chapter Content --------------------------- */
const proofs = [
  { label: "Qurʾān • 51:56", text: "“I did not create jinn and mankind except to worship Me.”" },
  { label: "Qurʾān • 39:3", text: "“Unquestionably, to Allah belongs the pure religion.”" },
  {
    label: "Ḥadīth • Right of Allah",
    text:
      "“The right of Allah over the servants is that they worship Him alone and do not associate anything with Him.” (Bukhārī & Muslim)",
  },
  {
    label: "Ḥadīth • Muʿādh to Yemen",
    text:
      "“You are going to a people of the Book; let the first thing you invite them to be the testimony that none has the right to be worshipped except Allah.” (Bukhārī & Muslim)",
  },
];

const learningGoals = [
  "Grasp the aim of the book: to establish worship for Allah alone with evidences.",
  "Differentiate between sincere ʿibādah and acts that conflict with it.",
  "Recognize that proofs from Qurʾān and authentic Sunnah anchor every chapter.",
];

const glossary = [
  { term: "Tawḥīd", def: "To single out Allah alone in all worship (belief, speech, and action)." },
  { term: "ʿIbādah (Worship)", def: "A comprehensive term for everything Allah loves and is pleased with." },
  { term: "Shirk", def: "Directing any act of worship to other than Allah or associating partners with Him." },
];

/* ------------------------------ Quiz Data --------------------------------- */
const QUESTIONS = [
  {
    id: "q1",
    stem: "What is the central thesis of Kitāb at-Tawḥīd?",
    choices: [
      "Refuting philosophical atheism exclusively",
      "Establishing that all acts of worship are for Allah alone, with proofs",
      "Detailing only rulings of transactions (muʿāmalāt)",
      "Cataloguing differences between the madhhabs",
    ],
    answer: 1,
    explanation:
      "The book evidences that worship (ʿibādah) must be directed solely to Allah with Qurʾān and authentic Sunnah.",
  },
  {
    id: "q2",
    stem: "Which verse is cited to show the purpose of creation?",
    choices: ["2:255", "1:1", "51:56", "112:1-4"],
    answer: 2,
    explanation: "Q 51:56: “I did not create jinn and mankind except to worship Me.”",
  },
  {
    id: "q3",
    stem: "According to the ḥadīth of Muʿādh sent to Yemen, what is the FIRST matter of daʿwah?",
    choices: [
      "Zakat distribution",
      "Testimony that none has the right to be worshipped except Allah",
      "Detailed fiqh of purification",
      "Rules of inheritance",
    ],
    answer: 1,
    explanation:
      "The Prophet ﷺ instructed Muʿādh that the first call is to the testimony of Tawḥīd (Bukhārī & Muslim).",
  },
  {
    id: "q4",
    stem: "What does 'pure religion' (ad-dīn al-khāliṣ) in Q 39:3 entail?",
    choices: [
      "Rituals done for community cohesion",
      "Sincerity of worship for Allah alone without association",
      "Any good deed regardless of intention",
      "Legal stratagems (ḥiyal) to make things easier",
    ],
    answer: 1,
    explanation:
      "Q 39:3 indicates that religion must be purified for Allah alone—this is ikhlāṣ in Tawḥīd al-ʿibādah.",
  },
  {
    id: "q5",
    stem: "Which of the following best defines shirk as used in this chapter?",
    choices: [
      "Minor mistakes in recitation",
      "Directing any act of worship to other than Allah or associating partners with Him",
      "Disagreeing on subsidiary legal issues",
      "Over-reliance on qiyās",
    ],
    answer: 1,
    explanation:
      "Shirk is to direct worship to other than Allah or to associate partners with Him—contrary to Tawḥīd.",
  },
];

/* -------------------------------- UI Bits --------------------------------- */
const Section = ({ title, Icon = Info, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur-sm"
  >
    <div className="mb-3 flex items-center gap-2">
      <Icon className="h-5 w-5 text-emerald-700" />
      <h3 className="text-sm font-extrabold tracking-wide text-slate-900">{title}</h3>
    </div>
    {children}
  </motion.section>
);

function GradientButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      {children}
    </button>
  );
}

const ProgressBar = ({ step, total }) => {
  const percent = Math.round((step / total) * 100);
  return (
    <div className="w-full rounded-full bg-slate-200/70">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

/* ------------------------------ Main Component ---------------------------- */
export default function KAT_01_KitabAtTawheed() {
  const navigate = useNavigate();

  // quiz mode toggle
  const [quizMode, setQuizMode] = useState(false);

  // quiz state
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const total = QUESTIONS.length;
  const q = QUESTIONS[index];
  const isCorrect = submitted && selected === q.answer;
  const isWrong = submitted && selected !== undefined && selected !== q.answer;

  useEffect(() => {
    if (quizMode) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [quizMode]);

  const startQuiz = () => {
    setQuizMode(true);
    setIndex(0);
    setSelected(undefined);
    setSubmitted(false);
    setScore(0);
  };

  const exitQuiz = () => {
    setQuizMode(false);
    // keep position at top for clean return
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = () => {
    if (selected === undefined) return;
    setSubmitted(true);
    if (selected === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (!submitted) return;
    if (index < total - 1) {
      setIndex(index + 1);
      setSelected(undefined);
      setSubmitted(false);
    }
  };

  const reset = () => {
    setIndex(0);
    setSelected(undefined);
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Vibrant cozy glows */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(251,191,36,0.30),rgba(255,255,255,0))]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-40 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-300/50 via-pink-300/40 to-rose-300/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-sky-300/50 via-cyan-300/40 to-emerald-300/30 blur-3xl" />

      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pt-10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/aqeedah/books/kitab-at-tawhid"
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Kitāb at-Tawḥīd
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-emerald-900">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-bold">ʿAqīdah</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">1. Kitāb at-Tawḥīd</h1>
            {!quizMode && (
              <p className="-mt-1 text-xs font-semibold text-slate-600">
                Meaning, intent, and proofs for singling out Allah in worship
              </p>
            )}
          </div>

          {!quizMode ? (
            <GradientButton onClick={startQuiz}>
              <ListChecks className="h-4 w-4" />
              Test yourself
            </GradientButton>
          ) : (
            <button
              onClick={exitQuiz}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Exit quiz
            </button>
          )}
        </div>
      </header>

      {/* ------------------------------- QUIZ MODE --------------------------- */}
      {quizMode ? (
        <main className="mx-auto max-w-3xl px-6 pb-20">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-fuchsia-700" />
              <p className="text-sm font-semibold text-slate-700">
                Question {index + 1} of {total}
              </p>
            </div>
            <span className="rounded-xl bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
              Score: {score}
            </span>
          </div>

          <ProgressBar step={index} total={total} />

          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur-sm ring-1 ring-slate-200"
          >
            <p className="text-slate-900 font-semibold">{q.stem}</p>

            <div className="mt-4 grid gap-2">
              {q.choices.map((c, idx) => {
                const chosen = selected === idx;
                const correct = submitted && idx === q.answer;
                const wrongChoice = submitted && chosen && idx !== q.answer;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => !submitted && setSelected(idx)}
                    className={[
                      "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition",
                      !submitted && chosen
                        ? "border-indigo-400 bg-gradient-to-r from-indigo-50 via-violet-50 to-fuchsia-50"
                        : "border-slate-200 bg-white hover:border-indigo-300",
                      correct && "border-emerald-400 bg-emerald-50",
                      wrongChoice && "border-rose-400 bg-rose-50",
                      submitted && !chosen && !correct && "opacity-80",
                    ].join(" ")}
                    aria-pressed={chosen}
                    disabled={submitted}
                  >
                    <span className="text-slate-800">{c}</span>
                    {correct && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                    {wrongChoice && <XCircle className="h-4 w-4 text-rose-600" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation after submit */}
            {submitted && (
              <div className="mt-4 rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-3 text-sm text-slate-800">
                <span className="font-semibold">Explanation: </span>
                {q.explanation}
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              {!submitted ? (
                <button
                  onClick={submit}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                  disabled={selected === undefined}
                >
                  Submit answer
                </button>
              ) : index < total - 1 ? (
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  Next question <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm">
                    Final score: {score}/{total}
                  </span>
                  <button
                    onClick={reset}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                  >
                    Try again
                  </button>
                  <button
                    onClick={exitQuiz}
                    className="text-sm font-medium text-emerald-700 hover:underline"
                  >
                    Back to chapter
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </main>
      ) : (
        /* ------------------------------ CHAPTER MODE ----------------------- */
        <>
          <main className="mx-auto max-w-7xl px-6 pb-20 space-y-6">
            <Section title="What this chapter sets up" Icon={Bookmark}>
              <p className="leading-7 text-slate-800">
                This opening sets the tone for the whole work: every act of <em>ʿibādah</em> must be
                directed solely to Allah, evidenced through clear verses and authentic narrations.
                The rest of the book breaks down common violations and clarifies the path of sincere worship.
              </p>
            </Section>

            <Section title="Key proofs" Icon={Quote}>
              <ul className="grid gap-3">
                {proofs.map((p, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-4 ring-1 ring-emerald-500/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400 bg-emerald-100 text-[11px] font-extrabold text-emerald-800">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-[12px] font-bold uppercase tracking-wide text-emerald-800">
                          {p.label}
                        </p>
                        <p className="mt-1 text-slate-800">{p.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Learning goals" Icon={CheckCircle2}>
              <ul className="grid gap-2">
                {learningGoals.map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 block h-2 w-2 rounded-full bg-emerald-600" />
                    <span className="text-slate-800">{g}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Glossary" Icon={Info}>
              <dl className="grid gap-3 sm:grid-cols-2">
                {glossary.map((item) => (
                  <div
                    key={item.term}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-300 hover:shadow"
                  >
                    <dt className="font-bold text-slate-900">{item.term}</dt>
                    <dd className="mt-1 text-slate-700">{item.def}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          </main>

          {/* Nav */}
          <nav className="mx-auto max-w-7xl px-6 pb-10 flex items-center justify-between">
            <Link
              to="/aqeedah/books/kitab-at-tawhid"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              ← Back to list
            </Link>
            <Link
              to="/aqeedah/books/kitab-at-tawhid/categories-of-tawheed"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Next: Categories of Tawḥīd <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/80">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-700">
          © {new Date().getFullYear()} Bayt Al Rihla
        </div>
      </footer>
    </div>
  );
}

