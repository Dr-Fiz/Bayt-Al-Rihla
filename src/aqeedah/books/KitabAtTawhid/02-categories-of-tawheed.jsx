// src/aqeedah/books/KitabAtTawhid/02-categories-of-tawheed.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Sparkles,
  ListChecks,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Quote,
  Info,
  Bookmark,
  Timer,
} from "lucide-react";

/* ------------------------------ UI bits (same feel as 01) ------------------------------ */
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

const AyahCard = ({ arabic, translation, refText, tone = "emerald" }) => {
  const border =
    tone === "sky"
      ? "border-sky-300"
      : tone === "indigo"
      ? "border-indigo-300"
      : tone === "amber"
      ? "border-amber-300"
      : tone === "rose"
      ? "border-rose-300"
      : "border-emerald-300";
  const title =
    tone === "sky"
      ? "text-sky-900"
      : tone === "indigo"
      ? "text-indigo-900"
      : tone === "amber"
      ? "text-amber-900"
      : tone === "rose"
      ? "text-rose-900"
      : "text-emerald-900";
  return (
    <div className={`rounded-xl border ${border} bg-gradient-to-br from-white to-slate-50 p-4`}>
      {arabic && (
        <p dir="rtl" lang="ar" className={`text-2xl leading-relaxed font-semibold ${title}`}>
          {arabic}
        </p>
      )}
      {translation && <p className="mt-2 text-slate-800">{translation}</p>}
      {refText && <p className="mt-1 text-[11px] font-extrabold text-slate-600">{refText}</p>}
    </div>
  );
};

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

/* --------------------------------- Quiz Data --------------------------------- */
const QUESTIONS = [
  { id: 1, q: "Tawḥīd ar-Rubūbiyyah means singling Allah out in which of the following?", choices: ["Creation only", "Ownership only", "Control only", "Creation, ownership, and control"], a: 3, exp: "Rubūbiyyah covers all three: creation, ownership and control (tadbīr)." },
  { id: 2, q: "“Surely His is the creation and commandment” is from which sūrah/āyah?", choices: ["Al-Aʿrāf 7:54", "Fāṭir 35:3", "Al-Muʾminūn 23:14", "Yūnus 10:31"], a: 0, exp: "Al-Aʿrāf 7:54 indicates ḥaṣr (restriction): creation and command belong to Allah alone." },
  { id: 3, q: "“Is there any creator other than Allah who provides for you from the sky and the earth?”", choices: ["Al-Muʾminūn 23:88", "Fāṭir 35:3", "Az-Zukhruf 43:9", "Yūnus 10:32"], a: 1, exp: "Fāṭir 35:3 poses a challenge proving creation is exclusive to Allah." },
  { id: 4, q: "“Blessed is Allah, the best of creators” (23:14) means human 'creation' is:", choices: ["Equal to Allah’s creation", "Bringing from nothing", "Only transforming forms (limited)", "Independent origination"], a: 2, exp: "Humans transform; real creation is bringing into existence from nothing." },
  { id: 5, q: "Human ownership in Sharīʿah texts is best described as:", choices: ["Absolute and unrestricted", "Restricted, defective, and conditional", "Equal to Allah’s ownership", "Irrelevant"], a: 1, exp: "Texts like 23:6 and 24:61 show limited, regulated human ownership." },
  { id: 6, q: "“Allah’s is the dominion of the heavens and the earth” is from:", choices: ["Āl ʿImrān 3:189", "Al-Baqarah 2:21", "Al-Fātiḥah 1:1", "An-Nūr 24:61"], a: 0, exp: "Āl ʿImrān 3:189 establishes exclusive dominion for Allah." },
  { id: 7, q: "Which āyah enumerates: Provider, Owner of hearing and sight, Bringer of life/death, and Disposer of affairs?", choices: ["Yūnus 10:31–32", "Az-Zukhruf 43:9", "Al-Aʿrāf 7:54", "Fāṭir 35:3"], a: 0, exp: "Yūnus 10:31–32 concludes: “That is Allah, your Lord in truth.”" },
  { id: 8, q: "Pagans at the Prophet’s time typically:", choices: ["Denied any Creator exists", "Admitted Allah created but associated partners in worship", "Worshipped Allah alone", "Believed in many creators equally"], a: 1, exp: "They admitted Rubūbiyyah (e.g., 43:9) but rejected Ulūhiyyah." },
  { id: 9, q: "Firʿawn’s rejection of Rubūbiyyah was due to:", choices: ["Ignorance of the signs", "Arrogance despite knowing (27:14)", "Lack of evidence", "A misunderstanding of language"], a: 1, exp: "Allah says they denied out of arrogance while their souls were convinced (27:14)." },
  { id: 10, q: "Identify the āyah: “I am your Lord, the Most Exalted.”", choices: ["Al-Qasas 28:38", "An-Nāziʿāt 79:24", "Al-Isrāʾ 17:102", "Al-Muʾminūn 23:88"], a: 1, exp: "An-Nāziʿāt 79:24 quotes Firʿawn’s arrogance." },
  { id: 11, q: "Rational proof in 23:91 shows that if there were many gods:", choices: ["They would cooperate perfectly", "Each would take what he created and overpower others, or all would be weak", "Creation would be better", "Morality would be relative"], a: 1, exp: "Either one dominates (so he alone is Lord) or none can (so all are incapable)." },
  { id: 12, q: "Tawḥīd al-Ulūhiyyah means:", choices: ["Singling Allah out with all acts of worship", "Acknowledging Allah created the heavens and earth", "Believing in angels", "Affirming Qadar only"], a: 0, exp: "Ulūhiyyah/al-ʿIbādah is directing all devotion to Allah alone." },
  { id: 13, q: "Which āyah states: “O mankind! Worship your Lord who created you…”?", choices: ["Al-Baqarah 2:21", "Al-Fātiḥah 1:1", "Āl ʿImrān 3:189", "Al-Isrāʾ 17:22"], a: 0, exp: "Al-Baqarah 2:21 ties obligation of worship to creation by Allah." },
  { id: 14, q: "Meaning of al-ʿIbādah per Ibn Taymiyyah:", choices: ["Only ritual acts", "An inclusive term for all that Allah loves and is pleased with—sayings and deeds, outward and inward", "Only inward acts", "Only outward acts"], a: 1, exp: "A comprehensive definition: sayings/deeds, outward/inward." },
  { id: 15, q: "Ṣalāh (prayer) in relation to ʿIbādah is:", choices: ["Only the means of worship", "Only worship itself", "Both worship itself and a means by which worship is performed", "Neither"], a: 2, exp: "It is worship itself and a vehicle of worship." },
  { id: 16, q: "Refutation of worshipping the dead includes that the dead:", choices: ["Can grant benefit independently", "Control provisions", "Cannot benefit/harm themselves, let alone others", "Know the unseen"], a: 2, exp: "The dead are in need of your duʿāʾ; calling upon them is baseless." },
  { id: 17, q: "Messengers were sent primarily to call people to:", choices: ["Acknowledge a Creator", "Social reform", "Worship Allah alone and avoid ṭāghūt", "Political unity"], a: 2, exp: "Al-Anbiyāʾ 21:25." },
  { id: 18, q: "The ḥadīth about some prophets having only a few or no followers indicates:", choices: ["Prophethood can fail", "People often rejected Tawḥīd al-Ulūhiyyah", "Numbers determine truth", "They lacked miracles"], a: 1, exp: "Reported by Bukhārī/Muslim; many rejected exclusive worship." },
  { id: 19, q: "Tawḥīd al-Asmāʾ waṣ-Ṣifāt obligates two things:", choices: ["Taʿṭīl and Tamthīl", "Affirmation of what Allah affirmed and negation of likeness", "Takyīf and Taḥrīf", "Ignoring the texts"], a: 1, exp: "Affirm without distortion and deny likeness (42:11)." },
  { id: 20, q: "“There is nothing like unto Him, and He is the All-Hearing, the All-Seeing” is:", choices: ["Ṭāhā 20:5", "Fāṭir 35:10", "Ash-Shūrā 42:11", "An-Nūr 24:61"], a: 2, exp: "42:11 anchors both tanzīh and ithbāt." },
  { id: 21, q: "Which of the following is NOT among the four errors Ahl as-Sunnah avoid?", choices: ["Taḥrīf", "Taʿṭīl", "Takyīf", "Tafsīr"], a: 3, exp: "The four: Taḥrīf, Taʿṭīl, Takyīf, Tamthīl." },
  { id: 22, q: "Imām Mālik’s principle regarding Istiwāʾ includes:", choices: ["The how is known", "Asking how is innovation; belief is obligatory; the how is unknown", "Deny the attribute", "Interpret it metaphorically only"], a: 1, exp: "“Al-Istiwāʾ is known; its how is unknown…”" },
  { id: 23, q: "Correct stance on the ḥadīth of Allah’s descent in the last third of the night:", choices: ["He remains in the worldly heaven all night globally", "It contradicts 42:11", "He descends in a manner befitting His Majesty; descent ends at Fajr in each locality", "It must be rejected"], a: 2, exp: "Affirm without asking how; locality-based timing." },
  { id: 24, q: "“He settled firmly over the Throne” and “Unto Him ascend pure words” teach:", choices: ["Negation only", "Affirmation only", "Affirmation of attributes/actions befitting His Majesty", "Pure metaphor"], a: 2, exp: "Examples of ithbāt without takyīf or tamthīl." },
  { id: 25, q: "“Do not set up another god with Allah” refers to:", choices: ["Al-Isrāʾ 17:22", "Al-Fātiḥah 1:1", "Āl ʿImrān 3:189", "An-Nisāʾ 4:26"], a: 0, exp: "A direct prohibition of shirk." },
  { id: 26, q: "Fire-worshippers’ claim of two creators fails because:", choices: ["Darkness is mere absence, not a rival existent; light’s superiority undercuts dualism", "Darkness is stronger", "The Qurʾān never addresses it", "All polytheism is equally valid"], a: 0, exp: "Reason/revelation refute dualism; darkness is non-existence." },
  { id: 27, q: "“All praise is due to Allah, Lord of the worlds” (1:1) supports:", choices: ["Rubūbiyyah only", "Ulūhiyyah only", "That the Lord of all is the One to be worshipped", "None"], a: 2, exp: "The One Who is Rabb of all deserves exclusive worship." },
  { id: 28, q: "“Say: In whose hand is the sovereignty of everything?” is from:", choices: ["Al-Muʾminūn 23:88", "Az-Zukhruf 43:9", "Fāṭir 35:3", "Al-Baqarah 2:21"], a: 0, exp: "A proof of exclusive mulk for Allah." },
  { id: 29, q: "Why is worshipping created things irrational per the article?", choices: ["Because they perish, cannot benefit/harm, nor sustain or extend life", "Because they are beautiful", "Because people dislike it", "Because it is traditional"], a: 0, exp: "Only the Creator sustains/controls; the created are needy." },
  { id: 30, q: "A concise way Salafiyyah frames the method in Names & Attributes:", choices: ["Deny all attributes to avoid likeness", "Affirm what Allah affirmed, negate what He negated, without Taḥrīf, Taʿṭīl, Takyīf, or Tamthīl", "Interpret everything figuratively", "Suspend judgment entirely"], a: 1, exp: "Balanced path of Ahl as-Sunnah; see 42:11 and statements of the Salaf." },
];

/* -------------------------------- Component -------------------------------- */
export default function KAT_02_CategoriesOfTawheed() {
  const base = "/aqeedah/books/kitab-at-tawhid";
  const prev = { slug: "kitab-at-tawheed", title: "1. Kitāb at-Tawḥīd" };
  const next = {
    slug: "explanation-of-some-verses-on-tawheed",
    title: "3. Explanation of Some Verses on Tawḥīd",
  };

  // quiz mode toggle (same-page)
  const [quizMode, setQuizMode] = useState(false);
  useEffect(() => {
    if (quizMode) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [quizMode]);

  // quiz state
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const total = QUESTIONS.length;
  const q = QUESTIONS[index];

  const submit = () => {
    if (selected === undefined) return;
    setSubmitted(true);
    if (selected === q.a) setScore((s) => s + 1);
  };
  const nextQ = () => {
    if (!submitted) return;
    if (index < total - 1) {
      setIndex(index + 1);
      setSelected(undefined);
      setSubmitted(false);
    }
  };
  const resetQuiz = () => {
    setIndex(0);
    setSelected(undefined);
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Cozy glows */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(251,191,36,0.30),rgba(255,255,255,0))]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-40 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-300/50 via-pink-300/40 to-rose-300/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-sky-300/50 via-cyan-300/40 to-emerald-300/30 blur-3xl" />

      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pt-10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {quizMode ? (
            <button
              onClick={() => setQuizMode(false)}
              className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800"
            >
              <ChevronLeft className="h-4 w-4" /> Back to article
            </button>
          ) : (
            <Link to={base} className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800">
              <ChevronLeft className="h-4 w-4" /> Back to index
            </Link>
          )}
          <div className="hidden sm:flex items-center gap-2 text-emerald-900">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-bold">ʿAqīdah</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              2. The Three Categories (Tawḥīd)
            </h1>
            {!quizMode && (
              <p className="-mt-1 text-xs font-semibold text-slate-600">
                Rubūbiyyah • Ulūhiyyah • Asmāʾ wa Ṣifāt — clear, vibrant, and proof-based
              </p>
            )}
          </div>

          {!quizMode ? (
            <GradientButton onClick={() => { setQuizMode(true); resetQuiz(); }}>
              <ListChecks className="h-4 w-4" />
              Test yourself
            </GradientButton>
          ) : (
            <span className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm">
              Focused quiz
            </span>
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
            <p className="text-slate-900 font-semibold">{q.q}</p>

            <div className="mt-4 grid gap-2">
              {q.choices.map((c, idx) => {
                const chosen = selected === idx;
                const correct = submitted && idx === q.a;
                const wrongChoice = submitted && chosen && idx !== q.a;
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
                {q.exp}
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              {!submitted ? (
                <button
                  onClick={submit}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                  disabled={selected === undefined}
                >
                  Submit
                </button>
              ) : index < total - 1 ? (
                <button
                  onClick={nextQ}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm">
                    Final score: {score}/{total}
                  </span>
                  <button
                    onClick={resetQuiz}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                  >
                    Try again
                  </button>
                  <button
                    onClick={() => setQuizMode(false)}
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
        /* ------------------------------ ARTICLE MODE ----------------------- */
        <>
          <main className="mx-auto max-w-7xl px-6 pb-20 space-y-6">
            {/* Overview */}
            <Section title="Overview & Map" Icon={Bookmark}>
              <p className="leading-7 text-slate-800">
                The scholars explain Tawḥīd in three complementary angles:{" "}
                <strong>Rubūbiyyah</strong> (Lordship), <strong>Ulūhiyyah/ʿIbādah</strong> (Worship),
                and <strong>Asmāʾ wa Ṣifāt</strong> (Names & Attributes). Below are concise definitions with core proofs.
              </p>
            </Section>

            {/* Rububiyyah */}
            <Section title="1) at-Tawḥīd ar-Rubūbiyyah — Lordship" Icon={Info}>
              <p className="text-slate-800">
                Single out Allah with <strong>creation</strong>, <strong>ownership</strong>, and <strong>control</strong>.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wide text-emerald-800">Creation</h4>
                  <AyahCard
                    tone="sky"
                    arabic="أَلَا لَهُ الْخَلْقُ وَالْأَمْرُ"
                    translation="“Surely His is the creation and commandment…”"
                    refText="Al-Aʿrāf 7:54"
                  />
                  <AyahCard
                    tone="emerald"
                    arabic="هَلْ مِنْ خَالِقٍ غَيْرُ اللَّهِ يَرْزُقُكُم مِّنَ السَّمَاءِ وَالْأَرْضِ"
                    translation="“Is there any creator other than Allah who provides for you from the sky and the earth?”"
                    refText="Fāṭir 35:3"
                  />
                  <AyahCard
                    tone="indigo"
                    arabic="فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ"
                    translation="“Blessed is Allah, the best of creators.”"
                    refText="Al-Muʾminūn 23:14"
                  />
                  <p className="text-sm text-slate-700">
                    Human “creation” only <em>transforms forms</em> — real creation is bringing into existence from nothing.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wide text-amber-800">Ownership & Control</h4>
                  <AyahCard tone="amber" translation="“Allah’s is the dominion of the heavens and the earth.”" refText="Āl ʿImrān 3:189" />
                  <AyahCard tone="amber" translation="“Say: In whose hand is the sovereignty of everything?”" refText="Al-Muʾminūn 23:88" />
                  <AyahCard
                    tone="sky"
                    arabic="مَن يُدَبِّرُ الْأَمْرَ ... فَسَيَقُولُونَ اللَّهُ"
                    translation="“Who disposes the affairs? They will say: Allah.”"
                    refText="Yūnus 10:31–32"
                  />
                  <p className="text-sm text-slate-700">
                    Human ownership is <strong>restricted</strong>, <strong>defective</strong>, and <strong>conditional</strong> (23:6; 24:61).
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <AyahCard tone="rose" translation="“I am your Lord, the Most Exalted.”" refText="An-Nāziʿāt 79:24" />
                <AyahCard tone="indigo" translation="“…they belied them out of arrogance, though their souls were convinced.”" refText="An-Naml 27:14" />
              </div>
            </Section>

            {/* Uluhiyyah / Ibadah */}
            <Section title="2) at-Tawḥīd al-Ulūhiyyah (al-ʿIbādah) — Worship" Icon={Quote}>
              <p className="text-slate-800">
                Single out Allah with <strong>all acts of worship</strong> — love, fear, hope, duʿāʾ, slaughter, vow, tawakkul…
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <AyahCard
                  tone="sky"
                  arabic="ذَٰلِكَ بِأَنَّ اللَّهَ هُوَ الْحَقُّ ..."
                  translation="“That is because Allah alone is the True God, and whatever they call besides Him is false …”"
                  refText="Luqmān 31:30"
                />
                <AyahCard tone="amber" translation="“Do not set up another god with Allah …”" refText="Al-Isrāʾ 17:22" />
                <AyahCard tone="amber" translation="“O mankind! Worship your Lord Who created you …”" refText="Al-Baqarah 2:21" />
                <AyahCard tone="amber" translation="“All praise is due to Allah, Lord of the worlds.”" refText="Al-Fātiḥah 1:1" />
              </div>
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <p className="font-semibold">Meaning of ʿIbādah (Ibn Taymiyyah):</p>
                <p>
                  “A comprehensive term for all that Allah loves and is pleased with — sayings and deeds, outward and inward.”
                </p>
                <p className="mt-2">
                  Example: <strong>Ṣalāh</strong> is worship itself and also a <em>means</em> of worship.
                </p>
              </div>
              <div className="mt-3 rounded-xl border border-rose-300 bg-gradient-to-br from-rose-50 to-white p-4">
                <p className="font-semibold text-rose-800">Refutation of false worship</p>
                <ul className="mt-2 list-disc pl-5 text-slate-800 text-[15px]">
                  <li>Created things perish; cannot benefit/harm; cannot sustain or extend life.</li>
                  <li>Worshipping the dead is irrational; they cannot help themselves, let alone others.</li>
                </ul>
                <div className="mt-3 text-sm text-slate-700">
                  Most disbelievers <em>admitted</em> Rubūbiyyah yet rejected Ulūhiyyah. <strong>Core</strong> mission of the prophets:{" "}
                  <em>Worship Allah alone</em> (Al-Anbiyāʾ 21:25).
                </div>
              </div>
            </Section>

            {/* Asma wa Sifat */}
            <Section title="3) at-Tawḥīd al-Asmāʾ waṣ-Ṣifāt — Names & Attributes" Icon={Info}>
              <p className="text-slate-800">
                Affirm what Allah affirmed for Himself and deny likeness to creation — without <em>Taḥrīf</em>, <em>Taʿṭīl</em>,
                <em> Takyīf</em>, or <em>Tamthīl</em>.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <AyahCard
                  tone="indigo"
                  arabic="لَيْسَ كَمِثْلِهِ شَيْءٌ وَهُوَ السَّمِيعُ الْبَصِيرُ"
                  translation="“There is nothing like unto Him, and He is the All-Hearing, the All-Seeing.”"
                  refText="Ash-Shūrā 42:11"
                />
                <AyahCard tone="indigo" translation="“Unto Him ascend pure words.”" refText="Fāṭir 35:10" />
              </div>
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <p className="font-semibold">Imām Mālik on Istiwāʾ:</p>
                <p>
                  “The Istiwāʾ is known; its how is unknown; belief in it is obligatory; asking about it is innovation.”
                </p>
                <p className="mt-2">Affirm without asking how; deny likeness — the balanced path of Ahl as-Sunnah.</p>
              </div>
            </Section>
          </main>

          {/* Prev / Next */}
          <nav className="mx-auto max-w-7xl px-6 pb-10 flex items-center justify-between">
            <Link
              to={`${base}/${prev.slug}`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-emerald-400"
            >
              <ArrowLeft className="h-4 w-4" />
              {prev.title}
            </Link>
            <Link
              to={`${base}/${next.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              {next.title} <ArrowRight className="h-4 w-4" />
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
