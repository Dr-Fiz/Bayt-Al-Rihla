import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  Sparkles,
  BookOpen,
  ScrollText,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ListChecks,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * Kitāb at-Tawḥīd — Chapter 2: Categories of Tawḥīd (Learner Edition)
 * Route: /aqeedah/books/kitab-at-tawhid/categories-of-tawheed
 * Focus: readable layout, vibrant accents, inline highlights, no sticky UI
 * ------------------------------------------------------------------------- */

/* ----------------------------- Tiny UI Helpers ---------------------------- */
const cx = (...a) => a.filter(Boolean).join(" ");

function Pill({ children, tone = "emerald" }) {
  const tones = {
    emerald: "border-emerald-400 bg-emerald-50 text-emerald-900",
    sky: "border-sky-400 bg-sky-50 text-sky-900",
    indigo: "border-indigo-400 bg-indigo-50 text-indigo-900",
    rose: "border-rose-400 bg-rose-50 text-rose-900",
    amber: "border-amber-400 bg-amber-50 text-amber-950",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm ring-1 ring-slate-200/60 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

/* --------------------------- Tone & Section Kit -------------------------- */
const TONES = {
  emerald: {
    bar: "bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400",
    badge: "bg-emerald-100 text-emerald-900 border border-emerald-300",
    border: "border-emerald-200/70",
    soft: "from-emerald-50/70 via-teal-50/60 to-sky-50/70",
    icon: "from-emerald-500 via-teal-500 to-sky-500",
  },
  amber: {
    bar: "bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400",
    badge: "bg-amber-100 text-amber-950 border border-amber-300",
    border: "border-amber-200/70",
    soft: "from-amber-50/70 via-orange-50/60 to-rose-50/70",
    icon: "from-amber-500 via-orange-500 to-rose-500",
  },
  sky: {
    bar: "bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400",
    badge: "bg-sky-100 text-sky-950 border border-sky-300",
    border: "border-sky-200/70",
    soft: "from-sky-50/70 via-cyan-50/60 to-emerald-50/70",
    icon: "from-sky-500 via-cyan-500 to-emerald-500",
  },
  indigo: {
    bar: "bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400",
    badge: "bg-indigo-100 text-indigo-950 border border-indigo-300",
    border: "border-indigo-200/70",
    soft: "from-indigo-50/70 via-violet-50/60 to-fuchsia-50/70",
    icon: "from-indigo-500 via-violet-500 to-fuchsia-500",
  },
  rose: {
    bar: "bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400",
    badge: "bg-rose-100 text-rose-950 border border-rose-300",
    border: "border-rose-200/70",
    soft: "from-rose-50/70 via-pink-50/60 to-fuchsia-50/70",
    icon: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
};

function Section({ id, title, tone = "emerald", children, subtitle }) {
  const t = TONES[tone] || TONES.emerald;
  return (
    <Card
      id={id}
      className={cx(
        t.border,
        "relative overflow-hidden ring-1 ring-black/5",
        "bg-gradient-to-br",
        t.soft
      )}
    >
      <div
        className={cx("absolute inset-x-0 top-0 h-1.5", t.bar)}
        aria-hidden
      />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            <span
              className={cx(
                "inline-flex items-center rounded-lg px-2.5 py-1 text-sm font-bold",
                t.badge
              )}
            >
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm font-medium text-slate-700">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-4 leading-7 text-slate-800">{children}</div>
    </Card>
  );
}

function Verse({ arabic, children, tone = "emerald" }) {
  const t = TONES[tone] || TONES.emerald;
  return (
    <div
      className={cx(
        "rounded-xl border bg-white/70 p-3 shadow-sm",
        t.border.replace("/70", "")
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cx(
            "rounded-lg p-2 text-white shadow-md bg-gradient-to-br",
            t.icon
          )}
        >
          <ScrollText className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p
            dir="rtl"
            className="text-lg font-semibold leading-8 text-slate-900"
          >
            {arabic}
          </p>
          {children && (
            <p className="mt-2 text-sm text-slate-700">{children}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* Highlight: for key definitions/lines inside the article text (no content removed) */
function HL({ children, tone = "amber" }) {
  const tones = {
    amber: "bg-amber-100/80 text-amber-900 ring-1 ring-amber-200",
    sky: "bg-sky-100/80 text-sky-900 ring-1 ring-sky-200",
    emerald: "bg-emerald-100/80 text-emerald-900 ring-1 ring-emerald-200",
    rose: "bg-rose-100/80 text-rose-900 ring-1 ring-rose-200",
    indigo: "bg-indigo-100/80 text-indigo-900 ring-1 ring-indigo-200",
  };
  return (
    <mark className={cx("rounded px-1.5 py-0.5 font-semibold", tones[tone])}>
      {children}
    </mark>
  );
}

/* Soft callout boxes to draw attention without adding/removing text meaning */
function Callout({ icon, tone = "emerald", children }) {
  const border = {
    emerald: "border-emerald-300 bg-emerald-50",
    amber: "border-amber-300 bg-amber-50",
    sky: "border-sky-300 bg-sky-50",
    indigo: "border-indigo-300 bg-indigo-50",
    rose: "border-rose-300 bg-rose-50",
  }[tone];
  const Icon = icon || Lightbulb;
  return (
    <div className={cx("rounded-xl border p-3 text-sm leading-7", border)}>
      <div className="mb-1 flex items-center gap-2 font-bold">
        <Icon className="h-4 w-4" /> Study Tip
      </div>
      <div className="text-slate-800">{children}</div>
    </div>
  );
}

/* ------------------------------ Question Bank ----------------------------- */
const QUESTIONS = [
  {
    id: 1,
    prompt: "What is Tawḥīd ar-Rubūbiyyah as defined in the text?",
    options: [
      "Singling out Allah with creation, ownership and control.",
      "Singling out Allah with worship alone.",
      "Affirming Allah's Names and Attributes only.",
      "Believing angels control affairs by His leave.",
    ],
    answerIndex: 0,
    explanation:
      "Rubūbiyyah is to single out Allah the Mighty and Sublime with creation, ownership and control (creation, mulk, tadbīr).",
  },
  {
    id: 2,
    prompt: "What does 'singling out Allah with creation' entail?",
    options: [
      "That humans cannot build anything.",
      "That there is no Creator except Allah, while human 'creation' is mere transformation.",
      "That artists create from nothing.",
      "That angels share creation.",
    ],
    answerIndex: 1,
    explanation:
      "Real creation (from nothing) is exclusive to Allah. Human 'creating' like picture-making is a limited transformation.",
  },
  {
    id: 3,
    prompt:
      "How is the verse 'Blessed is Allah, the best of creators' understood?",
    options: [
      "It contradicts exclusivity of creation.",
      "It proves multiple equal creators.",
      "It does not contradict exclusivity because human 'creation' is not ex nihilo.",
      "It is abrogated.",
    ],
    answerIndex: 2,
    explanation:
      "The phrase recognizes limited making (taṣwīr/taḥwīl), not creating from nothing.",
  },
  {
    id: 4,
    prompt:
      "How does the text contrast Allah’s ownership with human ownership?",
    options: [
      "Both are absolute and identical.",
      "Human ownership is comprehensive but Allah's is restricted.",
      "Human ownership is restricted and defective; Allah's ownership is general and perfect.",
      "Neither owns anything in reality.",
    ],
    answerIndex: 2,
    explanation:
      "Allah’s dominion is perfect (3:189; 23:88); human ownership is narrow and regulated by Sharīʿah.",
  },
  {
    id: 5,
    prompt: "What is intended by singling out Allah with control (tadbīr)?",
    options: [
      "Only prophets control affairs.",
      "No one disposes affairs except Allah alone, as in Yūnus 31–32.",
      "Humans control all outcomes by effort.",
      "Saints share cosmic control.",
    ],
    answerIndex: 1,
    explanation:
      "Provision, senses, life from death, and disposing of affairs belong to Allah alone.",
  },
  {
    id: 6,
    prompt: "Did the pagans generally deny Rubūbiyyah?",
    options: [
      "Yes, most denied it outright.",
      "No; they affirmed Allah as Creator/Disposer, with Firʿawn a notable rejecter out of arrogance.",
      "They believed in two equal creators.",
      "They considered the universe ownerless.",
    ],
    answerIndex: 1,
    explanation:
      "They would answer 'Allah' (43:9). Firʿawn denied despite inner certainty (27:14; 17:102).",
  },
  {
    id: 7,
    prompt: "Summarize the rational proof from 23:91 for one Creator.",
    options: [
      "Multiple gods would cooperate harmoniously forever.",
      "Each would take away what he created, or one would overpower the others—negating true Lordship.",
      "The gods would merge.",
      "Creation would stop existing.",
    ],
    answerIndex: 1,
    explanation:
      "Multiplicity implies division or domination; either way, no true co-Lordship.",
  },
  {
    id: 8,
    prompt: "Define Tawḥīd al-Ulūhiyyah / al-ʿIbādah.",
    options: [
      "Singling out Allah with Names and Attributes.",
      "Singling out Allah with worship, acting upon His commands out of love and reverence.",
      "Believing messengers are divine.",
      "Affirming that humans control destiny.",
    ],
    answerIndex: 1,
    explanation:
      "ʿIbādah = doing what Allah loves of words/deeds, outward and inward.",
  },
  {
    id: 9,
    prompt: "Why did messengers chiefly emphasize Ulūhiyyah?",
    options: [
      "Because most people already worshipped correctly.",
      "Because most denied Rubūbiyyah only.",
      "Because most associated partners in worship; hence books and messengers were sent.",
      "Because Names and Attributes were easy to grasp.",
    ],
    answerIndex: 2,
    explanation:
      "See Anbiyāʾ 25; the ḥadīth shows few followers despite the call to exclusive worship.",
  },
  {
    id: 10,
    prompt:
      "What are the two pillars of Tawḥīd al-Asmāʾ waṣ-Ṣifāt and the four prohibitions?",
    options: [
      "Affirmation & likeness; prohibited: tahrīf, taʿṭīl, takyīf, tamthīl.",
      "Affirmation & negation of likeness; prohibited: taḥrīf, taʿṭīl, takyīf, tamthīl.",
      "Negation & likeness; prohibited: taʿṭīl only.",
      "Affirmation only; no prohibitions.",
    ],
    answerIndex: 1,
    explanation:
      "Affirm what Allah affirmed; deny likeness (42:11); avoid taḥrīf, taʿṭīl, takyīf, and tamthīl.",
  },
];

function Question({ q }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const correct = selected === q.answerIndex;

  return (
    <Card className="border-emerald-200/70">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-2 text-white shadow-md">
          <HelpCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-900">{q.prompt}</p>
          <div className="mt-3 grid gap-2">
            {q.options.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrect = q.answerIndex === idx;
              const showState = revealed && (isSelected || isCorrect);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => !revealed && setSelected(idx)}
                  className={cx(
                    "flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2 text-left text-sm shadow-sm transition",
                    isSelected ? "border-emerald-400" : "border-slate-200",
                    revealed && isCorrect && "bg-emerald-50",
                    revealed && isSelected && !isCorrect && "bg-rose-50",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  )}
                >
                  <span className="pr-3 text-slate-800">{opt}</span>
                  {showState &&
                    (isCorrect ? (
                      <CheckCircle2
                        className="h-5 w-5 text-emerald-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircle
                        className="h-5 w-5 text-rose-500"
                        aria-hidden="true"
                      />
                    ))}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!revealed ? (
              <button
                disabled={selected === null}
                onClick={() => setRevealed(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-3 py-1.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reveal answer
              </button>
            ) : (
              <>
                <span
                  className={cx(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold",
                    correct
                      ? "border-emerald-500/60 bg-emerald-100 text-emerald-900"
                      : "border-rose-500/60 bg-rose-100 text-rose-900"
                  )}
                >
                  {correct ? "Correct" : "Not quite"}
                </span>
                <button
                  onClick={() => {
                    setSelected(null);
                    setRevealed(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Try again
                </button>
              </>
            )}
          </div>

          {revealed && (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <p className="font-semibold">Explanation</p>
              <p className="mt-1 leading-7">{q.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function QuestionBank() {
  const reduce = useReducedMotion();
  return (
    <section id="bank" className="mx-auto max-w-7xl px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.35 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Question Bank
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Answer each question, then reveal the correct answer and
            explanation.
          </p>
        </div>
        <Pill tone="sky">
          <ListChecks className="h-3.5 w-3.5" aria-hidden="true" /> 10 questions
        </Pill>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {QUESTIONS.map((q) => (
          <Question key={q.id} q={q} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function Chapter02_CategoriesOfTawheed() {
  const reduce = useReducedMotion();
  const [view, setView] = useState("content"); // 'content' | 'bank'

  const nav = useMemo(
    () => [
      { id: "rububiyyah", label: "Rubūbiyyah", tone: "emerald" },
      { id: "rational", label: "Rational Proofs", tone: "amber" },
      { id: "uluhiyyah", label: "Ulūhiyyah / ʿIbādah", tone: "sky" },
      { id: "note", label: "Note", tone: "indigo" },
      { id: "asma-sifat", label: "Asmāʾ wa Ṣifāt", tone: "rose" },
    ],
    []
  );

  const scrollToId = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Soft glows */}
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
      <header className="mx-auto max-w-7xl px-6 pt-8 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/aqeedah/books/kitab-at-tawhid"
              className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back to
              Kitāb at-Tawḥīd
            </Link>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-emerald-900">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-bold">ʿAqīdah</span>
          </div>
        </div>
      </header>

      {/* Hero + Mode Toggle */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.35 }}
          className="rounded-3xl border border-white/60 bg-white/70 p-6 sm:p-8 shadow-sm backdrop-blur"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
                Categories of Tawḥīd
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-600">
                تصنيفات التوحيد — learner-friendly layout
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="emerald">
                  <BookOpen className="h-3.5 w-3.5" /> Rubūbiyyah
                </Pill>
                <Pill tone="sky">
                  <ScrollText className="h-3.5 w-3.5" /> Ulūhiyyah / ʿIbādah
                </Pill>
                <Pill tone="rose">Asmāʾ wa Ṣifāt</Pill>
              </div>
            </div>

            {/* Read / Questions toggle */}
            <div className="rounded-xl border border-slate-200 bg-white/80 p-1 shadow-sm">
              <div className="grid grid-cols-2 overflow-hidden rounded-lg">
                <button
                  onClick={() => setView("content")}
                  className={cx(
                    "px-3 py-1.5 text-xs font-semibold transition",
                    view === "content"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  Read
                </button>
                <button
                  onClick={() => setView("bank")}
                  className={cx(
                    "px-3 py-1.5 text-xs font-semibold transition",
                    view === "bank"
                      ? "bg-gradient-to-r from-indigo-600 to-sky-600 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  Questions
                </button>
              </div>
            </div>
          </div>

          {/* Quick Nav (non-sticky, compact chips) */}
          {view === "content" && (
            <div className="mt-4 flex flex-wrap gap-2">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollToId(n.id)}
                  className={cx(
                    "rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-sm transition",
                    n.tone === "emerald" &&
                      "border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100",
                    n.tone === "amber" &&
                      "border-amber-200 bg-amber-50 text-amber-950 hover:bg-amber-100",
                    n.tone === "sky" &&
                      "border-sky-200 bg-sky-50 text-sky-950 hover:bg-sky-100",
                    n.tone === "indigo" &&
                      "border-indigo-200 bg-indigo-50 text-indigo-950 hover:bg-indigo-100",
                    n.tone === "rose" &&
                      "border-rose-200 bg-rose-50 text-rose-950 hover:bg-rose-100"
                  )}
                >
                  {n.label}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Content */}
      {view === "content" && (
        <main id="content" className="mx-auto max-w-7xl px-6 pb-16">
          <section id="content-body" className="mt-6 space-y-6">
            {/* 1) Rubūbiyyah */}
            <Section
              id="rububiyyah"
              title="The First Category: at-Tawheed ar-Ruboobiyyah"
              tone="emerald"
            >
              <p>
                <HL tone="emerald">
                  This is to single out Allah the Mighty and Sublime with
                  creation, ownership and control.
                </HL>
              </p>

              <p>
                <strong>To single out Allah with creation</strong> is for one to
                believe that there is no creator except Allah. He, the Exalted
                says:
              </p>
              <Verse
                tone="emerald"
                arabic="أَلَا لَهُ الْخَلْقُ وَالْأَمْرُ ۗ تَبَارَكَ اللَّهُ رَبُّ الْعَالَمِينَ"
              >
                “Surely His is creation and commandment…” (A’raaf: 54).
              </Verse>
              <p>
                This sentence (in Arabic lexicon) indicates al-hasr
                (restriction) since the predicate was brought forward because to
                bring forward what should only come later shows restriction.
              </p>

              <p>He the Exalted says:</p>
              <Verse
                tone="emerald"
                arabic="هَلْ مِنْ خَالِقٍ غَيْرُ اللَّهِ يَرْزُقُكُمْ مِنَ السَّمَاءِ وَالْأَرْضِ ۚ"
              >
                “Is there any creator other than Allah who provides for you from
                the sky and the earth?” (Faatir: 3).
              </Verse>
              <p>
                <HL tone="amber">
                  This verse demonstrates that creation is exclusive to Allah
                  alone because the interrogative came in the sense of
                  challenge.
                </HL>{" "}
                As for what has come (in the texts) which affirms a creator
                other than Allah as in His saying, the Exalted:
              </p>
              <Verse
                tone="emerald"
                arabic="فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ"
              >
                “Blessed is Allah, the best of creators” (Mu’minoon, 14)
              </Verse>
              <p>
                And such as the statement of the Prophet ﷺ regarding
                picture-makers when they would be told: “bring to life what you
                have created.” (1) This does not (refer to) real creation. It is
                not creation from nothingness; rather it is transformation of a
                thing from one state to the other. In addition, it is not
                inclusive; it is only restricted to things humankind can
                manipulate which is very restricted in scope.
              </p>
              <p>
                Therefore, it does not actually contradict our saying:{" "}
                <HL>
                  to single out Allah the Mighty and Sublime for creation.
                </HL>
              </p>

              <p>
                <strong>
                  As for singling out Allah the Mighty and Sublime with
                  ownership:
                </strong>{" "}
                it is to believe that no one owns the creatures except their
                Creator, as Allah the Exalted says:
              </p>
              <Verse
                tone="emerald"
                arabic="وَلِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ"
              >
                “Allah’s is the dominion of the heavens and the earth” (Aali
                Imraan: 189)
              </Verse>
              <p>He also says:</p>
              <Verse
                tone="emerald"
                arabic="قُلْ مَنْ بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍ"
              >
                “Say: in whose hand is the sovereignty of everything (i.e.
                treasures of each and everything)” (Mu’minoon, 88)
              </Verse>
              <p>
                As regards what has come (in the texts) that affirm ownership
                for other than Allah such as His saying the Exalted:
              </p>
              <Verse
                tone="emerald"
                arabic="إِلَّا عَلَىٰ أَزْوَاجِهِمْ أَوْ مَا مَلَكَتْ أَيْمَانُهُمْ"
              >
                “Except from their wives or (the captives and slaves) that their
                right hands possess - for then, they are free of blame.”
                (al-Mu’minoon: 6)
              </Verse>
              <p>And His saying:</p>
              <Verse tone="emerald" arabic="أَوْ مَا مَلَكْتُمْ مَفَاتِحَهُ">
                “Or from that whereof you possess its keys” (Noor: 61),
              </Verse>
              <p>
                These texts only refer to{" "}
                <HL tone="sky">restricted ownership</HL> which only covers a
                very small aspect of creation. (For example), a man can only own
                what he possesses and not what belongs to someone else. As such,
                it is a defective ownership in its attribute. Also, one may not
                have full control over what he possesses, and for that reason,
                he may not use them except as he is permitted according to the
                Sharee’ah. For example, if he intends to burn his property or
                punish his animal, we would say: ‘it is not permissible’.
                However, Allah Glorious is He, generally and perfectly owns
                everything.
              </p>

              <p>
                <strong>As for singling out Allah with control:</strong> it is
                for a person to believe that no one controls affairs except
                Allah alone as He the Exalted says:
              </p>
              <Verse
                tone="emerald"
                arabic="قُلْ مَنْ يَرْزُقُكُمْ مِنَ السَّمَاءِ وَالْأَرْضِ أَمَّنْ يَمْلِكُ السَّمْعَ وَالْأَبْصَارَ وَمَنْ يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَيُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَمَنْ يُدَبِّرُ الْأَمْرَ ۚ فَسَيَقُولُونَ اللَّهُ ۚ فَقُلْ أَفَلَا تَتَّقُونَ"
              />
              <Verse
                tone="emerald"
                arabic="فَذَٰلِكُمُ اللَّهُ رَبُّكُمُ الْحَقُّ ۖ فَمَاذَا بَعْدَ الْحَقِّ إِلَّا الضَّلَالُ ۖ فَأَنَّىٰ تُصْرَفُونَ"
              >
                “Say (O Muhammad ﷺ): ‘Who provides for you from the sky and from
                the earth? Or Who owns hearing and sight? And Who brings out the
                living from the dead and brings out the dead from the living?
                And Who disposes the affairs?’ They will say: ‘Allah’. Say:
                ‘Will you not then be afraid of Allah’s punishment (for setting
                up rivals in worship with Allah)?’ Such is Allah, your Lord in
                truth. So after the truth what else can there be, save error?
                How then are you turned away?” (Yoonus: 31-32).
              </Verse>
              <p>
                As regards man’s control, it is restricted to what he possesses
                and what he is permitted in the Sharee’ah.
              </p>

              <Callout tone="emerald" icon={Lightbulb}>
                The pagans acknowledged Rubūbiyyah—this chapter shows how that
                still doesn’t equal correct worship (Ulūhiyyah).
              </Callout>

              <p>
                This form of Tawheed was not opposed by the polytheists amongst
                whom the Messengers were raised; they affirmed it as Allah the
                most High says:
              </p>
              <Verse
                tone="emerald"
                arabic="وَلَئِنْ سَأَلْتَهُمْ مَنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضِ لَيَقُولُنَّ اللَّهُ"
              >
                “And indeed if you ask them, ‘who has created the heavens and
                the earth’ they will say: ‘the All- Mighty, the All- Knower
                created them’ (Zukhruf: 9)
              </Verse>
              <p>
                So, they affirm that Allah is the One Who disposes affairs and
                it is He in Whose Hand is the dominion of the heavens and the
                earth. No one is known among humankind to have rejected it. No
                creature has ever said that the universe has two equal creators.
              </p>
              <p>
                So, no one ever denied Tawheed ar-Ruboobiyyah whether by way of
                rejection or associating partners (with Him in that) except what
                Fir’awn did. He rejected it out of arrogance. He rejected
                Allah’s Lordship and His existence.
              </p>

              <p>Allah says, telling about him:</p>
              <Verse
                tone="emerald"
                arabic="فَقَالَ أَنَا رَبُّكُمُ الْأَعْلَىٰ"
              >
                “And he said: ‘I am your Lord, the most exalted.” (Naazi’aat:
                24).
              </Verse>
              <Verse
                tone="emerald"
                arabic="مَا عَلِمْتُ لَكُمْ مِنْ إِلَٰهٍ غَيْرِي"
              >
                “I do not know of any other deity for you other than me.”
                (Qasas: 38)
              </Verse>
              <p>
                He said this out of arrogance, for he knew certainly that he is
                not the Lord as Allah the Exalted says:
              </p>
              <Verse
                tone="emerald"
                arabic="وَجَحَدُوا بِهَا وَاسْتَيْقَنَتْهَا أَنْفُسُهُمْ ظُلْمًا وَعُلُوًّا ۚ فَانْظُرْ كَيْفَ كَانَ عَاقِبَةُ الْمُفْسِدِينَ"
              >
                “And they belied them (the signs) wrongfully and arrogantly
                though their ownselves were convinced thereof…” (Naml: 14).
              </Verse>
              <p>
                Allah also says, while quoting Moosaa (عليه السلام) during his
                argument with him (Fir’awn):
              </p>
              <Verse
                tone="emerald"
                arabic="قَالَ لَقَدْ عَلِمْتَ مَا أَنْزَلَ هَٰؤُلَاءِ إِلَّا رَبُّ السَّمَاوَاتِ وَالْأَرْضِ بَصَائِرَ ۖ وَإِنِّي لَأَظُنُّكَ يَا فِرْعَوْنُ مَثْبُورًا"
              >
                “Verily, you know that these signs have been sent down by none
                but the Lord of the heavens and the earth.” (Israa: 102)
              </Verse>
              <p>
                He, in his self affirms that the Lord is Allah the Mighty and
                Sublime.
              </p>

              <p>
                Similarly, the fire-worshippers deny Tawheed ar-Ruboobiyyah by
                way of associating partners with Him because they say: ‘the
                universe has two creators; light and darkness’ even though they
                did not regard both creators as equals.
              </p>
              <p>
                So they say, ‘Light is better than darkness because it brings
                goodness while darkness brings evil; and the one who creates
                good is better than the one who creates evil. Also, darkness is
                non-existent; it brings no brightness but light is existence, it
                illuminates and as such, is essentially better’.
              </p>
              <p>
                They also mention a third difference that light is pre-existent
                in the parlance of the philosophers while they differ regarding
                darkness; was it pre-existent too or later created? They hold
                these two views.
              </p>
            </Section>

            {/* Rational proofs */}
            <Section
              id="rational"
              title="Rational proofs that the Creator of the universe is One:"
              tone="amber"
            >
              <p>Allah the Exalted says:</p>
              <Verse
                tone="amber"
                arabic="مَا اتَّخَذَ اللَّهُ مِنْ وَلَدٍ وَمَا كَانَ مَعَهُ مِنْ إِلَٰهٍ ۚ إِذًا لَذَهَبَ كُلُّ إِلَٰهٍ بِمَا خَلَقَ وَلَعَلَا بَعْضُهُمْ عَلَىٰ بَعْضٍ ۚ سُبْحَانَ اللَّهِ عَمَّا يَصِفُونَ"
              >
                “No son did Allah beget nor is there any ilaah (god) along with
                him; (if there had been many gods), Behold! Each god would have
                taken away what he created, and some would have tried to
                overcome others.” (Mu’minoon: 91)
              </Verse>
              <p>
                <HL tone="amber">
                  If we affirm two creators for the universe, each creator would
                  have wished to hold on to what he has created…
                </HL>{" "}
                reserved them for himself alone as is the practice of the Kings
                who would never allow anyone to share (anything with them).
              </p>
              <p>
                When he is alone in its ownership, he would wish for another
                thing, and that is, that the authority belongs to him alone. No
                one should share (anything with him in it). So when he desires
                the authority, each of them is either unable to overcome the
                other or one of them holds sway over the other. If one of them
                both dominates the other then his Ruboobiyyah (Lordship) over
                him is established. However, if either of them is incapable of
                overcoming the other, the Ruboobiyyah (Lordship) ceases to exist
                with them because the incapable is not worthy of being a Lord.
              </p>
            </Section>

            {/* Ulūhiyyah / ʿIbādah */}
            <Section
              id="uluhiyyah"
              title="The Second Form: Tawheed al-Uloohiyyah"
              tone="sky"
              subtitle="Also called Tawheed al-‘Ibaadah (singling out Allah with worship)."
            >
              <p>
                <HL tone="sky">
                  It is also called Tawheed al-‘Ibaadah… When it is mentioned in
                  connection with Allah, it is called Tawheed al-Uloohiyyah; but
                  if it is mentioned in connection with the creatures, it is
                  called Tawheed al-‘Ibaadah.
                </HL>
              </p>
              <p>
                It is to single out Allah the Mighty and Sublime with worship.
                Therefore, the One deserving of worship is Allah the Exalted. He
                says:
              </p>
              <Verse
                tone="sky"
                arabic="ذَٰلِكَ بِأَنَّ اللَّهَ هُوَ الْحَقُّ وَأَنَّ مَا يَدْعُونَ مِنْ دُونِهِ هُوَ الْبَاطِلُ وَأَنَّ اللَّهَ هُوَ الْعَلِيُّ الْكَبِيرُ"
              >
                “That is because it is Allah alone Who is the True God, and
                whatever they call upon beside Him is false, and because it is
                Allah alone Who is the Most High, the Incomparably Great.”
                (Luqman: 30)
              </Verse>
              <p>The term Al-‘Ibaadah is widely used for two things:</p>
              <p>
                <strong>First:</strong> Worship; that is submitting to Allah the
                Mighty and Sublime by acting upon His orders and abstaining from
                His prohibitions out of love and reverence (for Him).
              </p>
              <p>
                <strong>Second:</strong> What by which worship is done. This is,
                according to Shaykh al-Islam Ibn Taymiyyah: “An inclusive word
                for all that Allah loves and is pleased with; of utterances and
                deeds both manifest and hidden”.
              </p>
              <p>
                For example, the Salat; its observance is worship, it is
                worshipping. The same Salat is worship, that is, what with which
                one worships.
              </p>
              <p>
                To single out Allah with this form of Tawheed is to be
                subservient to Allah alone, submitting to Him alone out of love
                and reverence for Him, and worshipping Him with what He has
                approved.
              </p>
              <p>Allah the Exalted says:</p>
              <Verse
                tone="sky"
                arabic="فَلَا تَجْعَلُوا لِلَّهِ أَنْدَادًا وَأَنْتُمْ تَعْلَمُونَ"
              >
                “So set up not another god with lest Allah sits you down
                condemned and forsaken.” (Israai: 22).
              </Verse>
              <p>He the most High also says:</p>
              <Verse tone="sky" arabic="الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ">
                “All praise is due to Allah alone, Lord of all the worlds.”
                (Faatiha: 1)
              </Verse>
              <p>
                By describing Himself as the Lord of the worlds, it is like
                stating the reason for His deserving of being worshipped: He is
                the only worthy Deity since He is the Lord of the worlds. Allah
                the Exalted says:
              </p>
              <Verse
                tone="sky"
                arabic="يَا أَيُّهَا النَّاسُ اعْبُدُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ وَالَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ"
              >
                “O you mankind! Worship your Lord Who created you and those
                before you, so that you may attain righteousness.” (al-Baqarah:
                21).
              </Verse>
              <p>
                <HL>
                  {" "}
                  The One Who is set apart with creation is the One deserving of
                  been worshipped.
                </HL>
              </p>
              <p>
                It is from sheer foolishness to make a creature which was only
                brought into existence and will perish a deity whom you worship
                when in reality, it cannot benefit you. It can neither bring you
                to life nor sustain you nor extend your lifespan.
              </p>
              <p>
                As such, it is also from stupidity that you go to the grave of
                someone who is already rotten in the grave, to supplicate to him
                and worship him. He is rather in need of your supplications
                while you are not in any need of supplicating to him. He cannot
                bring benefit or harm to himself; how could he then have such an
                ability regarding others?!
              </p>
              <p>
                This category of Tawheed is disbelieved and rejected by the
                majority of creation, and owing to this fact; Allah sent the
                Messengers (عليهم السلام) and sent down books to them. Allah the
                Exalted says:
              </p>
              <Verse
                tone="sky"
                arabic="وَمَا أَرْسَلْنَا مِنْ قَبْلِكَ مِنْ رَسُولٍ إِلَّا نُوحِي إِلَيْهِ أَنَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدُونِ"
              >
                “And we did not send any Messenger before You (O Muhammad ﷺ) but
                we inspired Him (saying): none has the Right to be worshipped
                but I (Allah), so Worship Me (Alone and none else).” (Anbiyaa:
                25)
              </Verse>
              <p>
                Yet, the followers of the Messengers (عليهم السلام) were very
                few. Allah’s Messenger ﷺ said, “…and I saw a prophet with a
                group of people; and a prophet with one or two persons and a
                prophet with whom there was nobody”. (1)
              </p>

              <Callout tone="sky" icon={AlertTriangle}>
                Most people stumble in <strong>Ulūhiyyah (worship)</strong>, not
                in acknowledging a Creator—so this is where your attention
                should be strongest.
              </Callout>
            </Section>

            {/* Note */}
            <Section id="note" title="Note:" tone="indigo">
              <p>
                It is amazing that most of the later authors on the subject of
                Tawheed emphasize Tawheed ar-Ruboobiyyah (Allah’s oneness in His
                Lordship) as if they are addressing a people who reject the
                existence of the Lord. Although those who reject the Lord may be
                found, quite a large number (of even) Muslims fall into
                associating partners with Allah in worship.
              </p>
              <p>
                <HL tone="indigo">
                  Therefore, it is essential to pay attention to this aspect of
                  Tawheed…
                </HL>{" "}
                so that we make it known to those Muslims who say they are
                Muslims but are actually polytheists while they know not.
              </p>
            </Section>

            {/* Asmāʾ wa Ṣifāt */}
            <Section
              id="asma-sifat"
              title="The Third Category: Tawheed al-Asmaa was-Sifaat"
              tone="rose"
            >
              <p>
                <HL tone="rose">
                  This is to single out Allah the Mighty and Sublime with His
                  Names and Attributes.
                </HL>{" "}
                This entails two things:
              </p>
              <p>
                <strong>Firstly: Affirmation;</strong> that is, we should affirm
                for Allah the Mighty and Sublime, all His Names and Attributes
                which He affirmed for Himself in His Book or in the Sunnah of
                His Prophet ﷺ.
              </p>
              <p>
                <strong>Secondly: Rejection of Like;</strong> that is, we should
                not associate any partner with Allah in His Names and Attributes
                as He the Exalted says:
              </p>
              <Verse
                tone="rose"
                arabic="لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ"
              >
                “There is nothing whatever like unto Him, and He is the
                All-Hearing, the All-Seeing.” (Ash Shuraa: 11)
              </Verse>
              <p>
                This verse proves that in all His Attributes, no one is like Him
                among the creatures. Even if they share in the basic meaning (of
                the word), they actually differ in its essence. Therefore,
                whoever does not affirm what Allah has affirmed for Himself is a
                Mu’attl (denier) and this rejection of his is like that of
                Fir’awn.
              </p>
              <p>
                But whoever affirms them but makes Tashbeeh (giving semblance of
                Human attributes to Allah) is like the idolaters who join
                partners with Allah in worship while the one who affirms the
                Names and Attributes without joining equals (with Allah) is from
                the monotheists.
              </p>
              <p>
                It is regarding this category of Tawheed that some among the
                Muslims went astray and got split into many sects. Some of them
                followed the path of Ta’teel (rejection of Allah’s Names and
                Attributes) and reject them. They reject the Attributes claiming
                to uphold Allah’s greatness thereby, but they are astray! This
                is owing to the fact that He Whose greatness is been actually
                defended is He regarding Whom defective attributes and blemishes
                are rejected. His words will be defended so that it is not
                unclear or misleading.
              </p>
              <p>
                So if one says, ‘Allah does not have hearing, sight, knowledge
                or ability,’ he has not upheld perfection for Allah, but rather,
                he has attributed the worst of deficiencies to Him, and ascribed
                confusion and misguidance to His words because Allah repeatedly
                mentions and affirms in His speech that He is:
              </p>
              <p dir="rtl" className="font-semibold">
                السَّمِيعُ الْبَصِيرُ
              </p>
              <p>“Al-Hearing, the All-Seeing”</p>
              <p dir="rtl" className="font-semibold">
                الْعَزِيزُ الْحَكِيمُ
              </p>
              <p>“The Noble, the Wise”</p>
              <p dir="rtl" className="font-semibold">
                الْغَفُورُ الرَّحِيمُ
              </p>
              <p>“The Oft Forgiving, the Merciful”</p>
              <p>
                So, if He affirms them (i.e. the Attributes) in His Speech while
                He does not possess them, it is from the worst of confusions,
                misguidance and great defect in the Speech of Allah the Mighty
                and Sublime!
              </p>
              <p>
                Some of them took to making Tamtheel (likening Allah’s
                Attributes to those of the creatures) claiming to affirm what
                Allah describes Himself with! They are astray because they have
                not estimated Allah His Right estimate since they ascribe
                blemish and defect to Him by considering the One who is perfect
                in every respect like the one who is defective in every respect.
              </p>
              <blockquote className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-900 leading-7">
                Don’t you see that the sword is been under-estimated If it is
                said that the sword was no more than a stick?!
              </blockquote>
              <p>
                How about comparing the Perfect with the defective? This is from
                the most serious crime against Allah the Mighty and Sublime!
              </p>
              <p>
                However, the Mu’attiloon (deniers of Allah’s Names and
                Attributes) are far more grievous in their rejection although
                both parties have not estimated Allah in His right estimate.
              </p>
              <p>
                So, what is obligatory for us is to believe in whatever Allah
                describes and names Himself with in His Book and upon the tongue
                of His Messenger ﷺ without making Tahreef (distortion) or
                Ta’teel (rejection) or Takyeef (saying how) or Tamtheel
                (likening).
              </p>
              <p>
                This was the position of Shaykh al-Islam Ibn Taymiyyah رحمه الله
                and others among the people of knowledge.
              </p>
              <p>
                Tahreef (distortion) is with regards to the texts, Ta’teel
                (rejection) is concerning the beliefs, Takyeef (saying how) is
                about the attribute, Tamtheel (likening) is with respect to the
                attribute too except that it is more specific than Takyeef.
                Whoever makes Tamtheel (likening) has made Takyeef (saying how)
                but not the other way round. So it is pertinent that our creed
                is free from these four things.
              </p>
              <p>
                What we meant by Tahreef here is: the Ta’weel (interpretation)
                done by those who distort the texts regarding the Attributes
                because they call themselves Ahl al-Ta’weel (the people of
                interpretation) due to the toning down approach that they follow
                since the heart basically detests the word, Tahreef
                (distortion). However, this is from word decoration and
                allurement to the people so that they do not refuse it.
              </p>
              <p>
                The Ta’weel (interpretation) they make is in essence, Tahreef
                (distortion) which is to twist the word from its apparent
                meaning. So we say: if this twist is proven by sound evidence,
                then it is not Ta’weel (interpretation) in the manner you
                intend; it is rather Tafseer, explanation. However, if it is not
                supported by any sound proof, it is Tahreef (distortion) and
                twisting the words away from their places.
              </p>
              <p>
                Those are the people who went astray through this path. They
                began to affirm attributes but with Tahreef (distortion). They
                are astray, and are on a path contrary to that of the People of
                the Sunnah and the Jama’ah.
              </p>
              <p>
                In this regard, they should not to be described as Ahl as-Sunnah
                wal-Jama’ah since affiliation necessitates ascription. The Ahl
                as-Sunnah wal-Jama’ah are ascribed to the Sunnah because they
                stick to it; but those people do not stick to the Sunnah
                regarding their position of Tahreef.
              </p>
              <p>
                Also, the word Jama’ah basically means: gathering, whereas they
                are not agreed in their creed. Their books contain
                interpolations, contradictions, and inconsistencies so much so
                that a group among them would declare another as being misguided
                while it still contradicts itself!
              </p>
              <p>
                The one who gave the commentary of the book, at-Tahaawiyyah, did
                quote a statement of al-Ghazalee – one of those who attained the
                apex in theological rhetoric – when he read those statements of
                error, inconsistency and the contradiction upon which the
                theological rhetoricians are, and the fact that they are not
                upon any certainty about their views. (1)
              </p>
              <p>Ar-Raazee was one of their leaders too, he said:</p>
              <blockquote className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-900 leading-7">
                The ultimate end of giving preference to the intellect (over
                revelation) is vanity!
                <br />
                And most of the efforts of the scholars (of theological
                rhetorics) is misguidance!
                <br />
                Our souls are in desolation inside our bodies.
                <br />
                While the ultimate goal of our lives is towards harmful and bad
                consequences.
                <br />
                We have not gained from our researches throughout our lives
                Other than that we compiled hearsays!
              </blockquote>
              <p>
                He also said: “I had scrutinized the path of the freethinkers
                and the methodology of the philosophers but I have not seen in
                it healing any sick, neither does it satiate the thirsty.
                However, I found the best way to be that of the Qur’an; I read
                the following and affirm;
              </p>
              <Verse tone="rose" arabic="الرَّحْمَٰنُ عَلَى الْعَرْشِ اسْتَوَى">
                “He is the Gracious God Who has settled Himself firmly on the
                throne.” (Taahaa: 5),
              </Verse>
              <Verse
                tone="rose"
                arabic="إِلَيْهِ يَصْعَدُ الْكَلِمُ الطَّيِّبُ"
              >
                “Unto Him ascend pure words…” (Faatir: 10)
              </Verse>
              <p>I also read the following and negate accordingly;</p>
              <Verse
                tone="rose"
                arabic="لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ"
              >
                “There is nothing whatever like unto Him, and He is the
                All-Hearing, the All-Seeing.” (Ash Shuraa: 11)
              </Verse>
              <Verse tone="rose" arabic="وَلَا يُحِيطُونَ بِهِ عِلْمًا">
                “…but they cannot compass it with their knowledge.” (Taahaa:
                110),
              </Verse>
              <p>
                That is, I negate likening anything to Him and compassing Him
                with knowledge. Whoever experiences the like of what I
                experienced will recognize what I have recognized.” (1)
              </p>
              <p>
                You will find them confused and inconsistent, not having any
                certainty about what they are upon. However, you will find the
                one Allah has guided to the straight path tranquil and
                delighted, calm.
              </p>
              <p>
                He reads from the Book of Allah and the Sunnah of His Prophet ﷺ.
                He would affirm whatever Allah affirms for himself of Names and
                Attributes since no one knows Allah better than Allah, and no
                one is truer in Speech than Allah or more explicit than Him the
                Mighty and Sublime as He the Exalted says:
              </p>
              <Verse tone="rose" arabic="يُرِيدُ اللَّهُ لِيُبَيِّنَ لَكُمْ">
                “Allah desires to make clear to you…” (Nisaa: 26)
              </Verse>
              <Verse
                tone="rose"
                arabic="يُرِيدُ اللَّهُ أَنْ يُخَفِّفَ عَنْكُمْ"
              >
                “Allah explains this to you lest you go astray…” (Nisaa: 176)
              </Verse>
              <Verse
                tone="rose"
                arabic="وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ"
              >
                “And We have sent down to thee the Book to explain everything.”
                (Nahl: 89)
              </Verse>
              <Verse tone="rose" arabic="وَمَنْ أَصْدَقُ مِنَ اللَّهِ قِيلًا">
                “…and who can be more truthful than Allah in word?” (Nisaa:
                122).
              </Verse>
              <Verse tone="rose" arabic="وَمَنْ أَصْدَقُ مِنَ اللَّهِ حَدِيثًا">
                “…And who is more truthful in his word than Allah?” (Nisaa: 87)
              </Verse>
              <p>
                These and other verses prove that Allah gives the fullest
                explanations to the creatures regarding the path that leads them
                unto Him. And the greatest explanation that mankind needs are
                those regarding Allah the Exalted, His Names and Attributes so
                that we may worship Allah based on clear knowledge. This is
                because to worship the one whose attributes are unknown to us or
                one who does not have attributes is never possible. Thus, you
                must know the attributes of the deity which will in turn, make
                you turn towards Him and truly worship Him.
              </p>
              <p>
                One must not go beyond his bounds by engaging in Takyeef (saying
                how) or Tamtheel (likening) for if he is unable to totally grasp
                whom he is – and he is just between his two sides – then it is
                with a greater reason that he is unable to completely grasp the
                true essence of those Attributes with which Allah has described
                Himself.
              </p>
              <p>
                For this reason, it is obligatory that one holds back from
                asking the question, ‘why?’ and ‘how?’ regarding Allah’s Names
                and Attributes. Similarly, he should avoid contemplating about
                the ‘how’ of existence. If one threads this path, he will have
                much rest of mind, and this was the way of the righteous
                predecessors (rahimahumullaah).
              </p>
              <p>
                Thus, when someone approached Imam Malik (رحمه الله) and said:{" "}
                <em>“O Abu Abdullah,</em>
              </p>
              <Verse tone="rose" arabic="الرَّحْمَٰنُ عَلَى الْعَرْشِ اسْتَوَى">
                “He is the Gracious God Who has settled Himself firmly on the
                throne.” (Taahaa: 5)
              </Verse>
              <p>
                How did He settle? The Imam bowed his head and said: “al-Istiwaa
                is not unknown, ‘the how’ is not understandable, to believe in
                it is obligatory and to ask questions about it is innovation; I
                consider you an innovator
              </p>
              <p>
                Nevertheless in our times, we have those that say that: ‘Allah
                descends to the earthly heaven in third part of every night
                which necessitates that He is in the earthly heaven throughout
                the nights since the night changes from one place to another
                across the earth’.
              </p>
              <p>
                The companions (رضي الله عنهم) did not hold such view. Had it
                been that this thinking should cross the mind of the true
                believer, Allah would have explained it in the first place or
                through the tongue of His Messenger ﷺ. He would also have sent
                someone to ask him about it so that he ﷺ would respond as the
                companions asked the Messenger of Allah ﷺ about: ‘Where was
                Allah before He created the heavens and the earth?’ And he ﷺ
                answered them. (1)
              </p>
              <p>
                This great question proves that Allah explains all that humanity
                would need in one of the three ways (mentioned above).
              </p>
              <p>
                However, the response to the question on the hadeeth of Allah’s
                descent (2) is that; as long as the third part of the night
                remains at a particular location, the descent takes place there
                while the descent will not occur in other places before the
                third part of the night or the midnight. There is none like unto
                Allah the Mighty and Sublime. The hadeeth also proves that the
                period of the descent ends at the beginning of dawn.
              </p>
              <p>
                It is for us to submit and say: ‘We hear, we obey, we follow and
                we believe’. This is our duty; we must not go beyond the Qur’an
                and the hadeeth.
              </p>
              <p>And His saying, the Exalted:</p>
              <Verse
                tone="rose"
                arabic="وَمَا خَلَقْتُ الْجِنَّ وَالْإِنْسَ إِلَّا لِيَعْبُدُونِ"
              >
                “And I have not created the jinn and the men but that they may
                worship Me…” (Dhaariyaat: 56)
              </Verse>
            </Section>
          </section>
        </main>
      )}

      {view === "bank" && <QuestionBank />}

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
