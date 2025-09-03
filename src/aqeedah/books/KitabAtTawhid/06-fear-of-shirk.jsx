import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ListChecks,
  Lightbulb,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * Kitāb at-Tawḥīd — Chapter 6
 * Title: Fear of Shirk
 * Route: /aqeedah/books/kitab-at-tawhid/fear-of-shirk
 * This CHUNK delivers:
 *  - Page shell (no sticky bar), hero, segmented view toggle
 *  - Reusable UI kit (Card, Pill, Section, Verse, HL, Callout)
 *  - Question Bank (10 items) w/ reveal + explanations
 *  - COMPLETE placeholders for ALL article sections (so nothing is lost)
 * Next chunks will add: full content text for every section below.
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
        "rounded-2xl border border-white/60 bg-white/80 p-4 sm:p-5 shadow-sm ring-1 ring-slate-200/60 backdrop-blur-sm",
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
          <BookOpen className="h-4 w-4" aria-hidden="true" />
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
/** 10 questions aligned with the article (4:116; 14:35; riyaa’; du‘ā types; etc.) */
const QUESTIONS = [
  {
    id: "C6-Q1",
    prompt:
      "Why does ‘Fear of Shirk’ follow the two chapters on tawḥīd’s excellence and entering Jannah without reckoning?",
    options: [
      "To switch subjects to history",
      "Because a person may assume he perfected tawḥīd while he hasn’t; one must fear shirk and guard sincerity",
      "Because shirk is only for non-Muslims",
      "To downplay tawḥīd",
    ],
    answerIndex: 1,
    explanation:
      "The commentary warns: one might think he truly realized tawḥīd; hence fear of shirk and vigilance over ikhlāṣ are essential.",
  },
  {
    id: "C6-Q2",
    prompt:
      "According to An-Nisāʾ 4:116, which sin is never forgiven if one dies upon it?",
    options: [
      "Theft",
      "Zinā",
      "Drinking alcohol",
      "Shirk (associating partners with Allah)",
    ],
    answerIndex: 3,
    explanation:
      "“Indeed, Allah does not forgive that partners be associated with Him…” (4:116).",
  },
  {
    id: "C6-Q3",
    prompt:
      "The phrase “أَن يُشْرَكَ بِهِ” (with ‘an’ + imperfect) indicates what scope, per the commentary?",
    options: [
      "A single specific case",
      "Indefinite in a negation → generalization: any associating of partners",
      "Only past events",
      "Only minor infractions",
    ],
    answerIndex: 1,
    explanation:
      "‘an + verb’ yields a maṣdar sense; with negation, it generalizes: any form of shirk is unforgiven if one dies upon it.",
  },
  {
    id: "C6-Q4",
    prompt: "“وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ” means:",
    options: [
      "All other sins less than shirk are under His will",
      "Only minor sins are auto-forgiven",
      "Sins greater than shirk are forgiven",
      "It refers to civil crimes only",
    ],
    answerIndex: 0,
    explanation:
      "“Mā dūna dhālik” = what is less than shirk; those sins are under Allah’s will to forgive.",
  },
  {
    id: "C6-Q5",
    prompt:
      "In Ibrāhīm’s supplication (14:35), what does “وَاجْنُبْنِي” linguistically convey?",
    options: [
      "Let me debate the idols",
      "Place me on one side and idols apart (firm distancing)",
      "Teach me their names",
      "Destroy idols instantly",
    ],
    answerIndex: 1,
    explanation:
      "The verb conveys being placed to one side away from idols — stronger than a simple ‘keep me away’.",
  },
  {
    id: "C6-Q6",
    prompt:
      "What is the difference between “ṣanam” and “wathan” in the article?",
    options: [
      "They’re identical",
      "Ṣanam = any object of worship; Wathan = only statues",
      "Ṣanam = fashioned idol/image; Wathan = anything worshipped besides Allah (broader)",
      "Wathan is a nickname",
    ],
    answerIndex: 2,
    explanation:
      "Ṣanam: fashioned idol. Wathan: anything taken as a deity — broader.",
  },
  {
    id: "C6-Q7",
    prompt: "Define riyāʾ (show-off) as minor shirk according to this chapter.",
    options: [
      "Directing worship to people explicitly (that’s major shirk)",
      "Doing worship to be seen/praised while intending it for Allah",
      "Leading the prayer",
      "Teaching others by example",
    ],
    answerIndex: 1,
    explanation:
      "Riyāʾ: seeking people’s gaze/praise in worship. If one directs worship to people, that would be major shirk.",
  },
  {
    id: "C6-Q8",
    prompt:
      "If riyāʾ intrudes during a deed originally for Allah, what is the ruling?",
    options: [
      "Always valid",
      "If repelled → safe; if indulged → the affected portion is invalid (and may nullify interdependent acts like ṣalāh)",
      "Only affects charity",
      "Only affects fasting",
    ],
    answerIndex: 1,
    explanation:
      "Repel it and you’re safe; yield to it and you corrupt the affected part — in ṣalāh it can void the whole.",
  },
  {
    id: "C6-Q9",
    prompt:
      "Which pairing correctly matches the two types of duʿāʾ and their rulings about shirk?",
    options: [
      "Duʿāʾ al-ʿIbādah = worship; directing it to other than Allah is shirk. Duʿāʾ al-Masʾalah = requests; allowed from creation within their ability.",
      "Both always shirk",
      "Both always permissible to any being",
      "Only Duʿāʾ al-Masʾalah exists",
    ],
    answerIndex: 0,
    explanation:
      "Acts of worship to other than Allah are shirk. Requests from people are fine within their capacity; beyond that is shirk.",
  },
  {
    id: "C6-Q10",
    prompt:
      "How do the two ḥadīths balance ‘threat’ and ‘promise’ in this chapter?",
    options: [
      "(a) “Whoever dies calling upon others…” → Hell for shirk; (b) “Whoever meets Allah not associating…” → Jannah for pure tawḥīd (other sins under Allah’s will).",
      "They contradict each other",
      "They apply only to non-Muslims",
      "They refer to minor sins only",
    ],
    answerIndex: 0,
    explanation:
      "Major shirk entails Hell; meeting Allah without shirk entails Paradise. Other sins fall under Divine Will.",
  },
  {
    id: "C6-Q11",
    prompt:
      "What is the core reason Allah does not forgive shirk in An-Nisā’ 4:116?",
    options: [
      "Because it harms other people directly",
      "Because it violates Allah’s exclusive right of tawḥīd",
      "Because it is rarer than other sins",
      "Because it is easy to repent from",
    ],
    answerIndex: 1,
    explanation:
      "Shirk infringes Allah’s unique right to be worshipped alone; other sins are under His Will.",
  },
  {
    id: "C6-Q12",
    prompt:
      "The phrase “أَنْ يُشْرَكَ بِهِ” in 4:116 is grammatically an infinitive construction. What implication does that carry here?",
    options: [
      "It restricts forgiveness to only one type of shirk",
      "It generalizes to any form of associating partners",
      "It cancels the verse’s meaning",
      "It refers only to past actions",
    ],
    answerIndex: 1,
    explanation:
      "Turning the verb into a maṣdar (infinitive) yields a generalized sense: any association is unforgiven.",
  },
  {
    id: "C6-Q13",
    prompt:
      "According to the commentary, what does “مَا دُونَ ذَٰلِكَ” (all else) in 4:116 mean?",
    options: [
      "Sins equal to shirk",
      "Only minor sins",
      "All sins less than shirk",
      "Good deeds done without sincerity",
    ],
    answerIndex: 2,
    explanation:
      "‘Dūna’ here means everything short of shirk—those are under Allah’s Will.",
  },
  {
    id: "C6-Q14",
    prompt:
      "Which nuanced view is reported from Ibn Taymiyyah regarding minor shirk?",
    options: [
      "He consistently held minor shirk is always forgiven",
      "He consistently held minor shirk is never forgiven",
      "Reports vary: at times he included minor shirk under the unforgiven; elsewhere he limited it to major shirk",
      "He considered all shirk imaginary",
    ],
    answerIndex: 2,
    explanation:
      "The text notes differing attributions: sometimes including minor shirk, sometimes restricting to major.",
  },
  {
    id: "C6-Q15",
    prompt:
      "In Ibrāhīm’s duʿāʾ (14:35), “وَاجْنُبْنِي” best conveys which sense?",
    options: [
      "Teach me",
      "Bring me close to",
      "Set me apart from and keep me distant",
      "Forgive me after",
    ],
    answerIndex: 2,
    explanation:
      "‘Wajnubnī’ literally places him on a side away from idols, expressing emphatic distancing.",
  },
  {
    id: "C6-Q16",
    prompt:
      "Who are included in “بَنِيَّ” (my progeny) in 14:35 according to the stronger view?",
    options: [
      "Only Ismāʿīl and Isḥāq",
      "All of his descendants and offspring broadly",
      "Only his immediate household in Shām",
      "Only prophets after him",
    ],
    answerIndex: 1,
    explanation:
      "The more preponderant reading includes his broader lineage, not just two sons.",
  },
  {
    id: "C6-Q17",
    prompt:
      "What is the difference between صَنَم (ṣanam) and وَثَن (wathan) mentioned in the chapter?",
    options: [
      "Ṣanam is broader; wathan is only human-shaped",
      "Both are identical",
      "Wathan is broader (anything worshipped), ṣanam is a fashioned image",
      "Ṣanam refers only to stones; wathan only to trees",
    ],
    answerIndex: 2,
    explanation:
      "Ṣanam is an idol/image; wathan covers anything taken as an object of worship besides Allah.",
  },
  {
    id: "C6-Q18",
    prompt:
      "Why did the author place “Fear of Shirk” after affirming tawḥīd and its reward?",
    options: [
      "To discuss grammar rules",
      "To warn that one may think he has attained tawḥīd while he has not",
      "To change the topic to fiqh of vows",
      "To refute the concept of sincerity",
    ],
    answerIndex: 1,
    explanation:
      "Many assume they’re upon perfected tawḥīd while hidden defects (e.g., riyāʾ) remain.",
  },
  {
    id: "C6-Q19",
    prompt:
      "Which term refers to reports attributed to the Companions and those after them (unless specified otherwise)?",
    options: ["Ḥadīth", "Khabar", "Athar", "Isnād"],
    answerIndex: 2,
    explanation:
      "Athar typically denotes narrations from other than the Prophet unless specified.",
  },
  {
    id: "C6-Q20",
    prompt: "What is riyāʾ (showing off) as defined in this chapter?",
    options: [
      "Doing worship solely to be seen and praised by people",
      "Doing worship publicly to teach others",
      "Doing charity to relieve the poor",
      "Hiding all acts of worship absolutely",
    ],
    answerIndex: 0,
    explanation:
      "Riyāʾ is performing ʿibādah for people’s gaze; intending people as recipients would be major shirk.",
  },
  {
    id: "C6-Q21",
    prompt:
      "If riyāʾ is the original motive for an act of worship, the act is…",
    options: [
      "Valid but deficient",
      "Null and returned upon its doer",
      "Valid if repeated three times",
      "Makrūh but accepted",
    ],
    answerIndex: 1,
    explanation:
      "Allah says He abandons the deed performed with partners; the act is invalid.",
  },
  {
    id: "C6-Q22",
    prompt:
      "If riyāʾ intrudes mid-act and the worshipper fights it off, the ruling is…",
    options: [
      "The whole worship collapses",
      "Only the first half is invalid",
      "It does not harm him",
      "He must restart the act",
    ],
    answerIndex: 2,
    explanation: "If he repels the intrusive riyāʾ, he is not harmed by it.",
  },
  {
    id: "C6-Q23",
    prompt:
      "Which act is cited as interdependent such that riyāʾ can void the entire act if indulged?",
    options: ["Wuḍūʾ", "Ṣalāh", "Zakāh on crops", "Sadaqat al-Fiṭr"],
    answerIndex: 1,
    explanation:
      "Ṣalāh’s integrals are tightly linked; deliberate additions/riya can corrupt the whole.",
  },
  {
    id: "C6-Q24",
    prompt:
      "Charity split into two separate donations—first sincere, second for riyāʾ—leads to which outcome?",
    options: [
      "Both invalid",
      "First accepted, second rejected",
      "Second accepted, first rejected",
      "Both accepted but reduced",
    ],
    answerIndex: 1,
    explanation:
      "Separable acts: the sincere portion stands; the ostentatious portion is void.",
  },
  {
    id: "C6-Q25",
    prompt:
      "Why is the wuḍūʾ case considered nuanced compared to ṣalāh regarding riyāʾ and repetition?",
    options: [
      "Because repeating limbs in wuḍūʾ never matters",
      "Because repeating a limb can be tolerated unlike adding integrals in ṣalāh",
      "Because wuḍūʾ has no sequence at all",
      "Because wuḍūʾ must always be in private",
    ],
    answerIndex: 1,
    explanation:
      "Repeating a washed limb doesn’t inherently void wuḍūʾ, unlike additions in ṣalāh.",
  },
  {
    id: "C6-Q26",
    prompt:
      "What is the meaning of the Bukhārī ḥadīth: “Whoever dies calling upon other than Allah in equality with Him…”?",
    options: [
      "Asking people for permissible help",
      "Treating others as equals in worship and ultimate request",
      "Only praising scholars excessively",
      "Making duʿāʾ in Arabic only",
    ],
    answerIndex: 1,
    explanation:
      "It condemns equating others with Allah in worship; that is major shirk.",
  },
  {
    id: "C6-Q27",
    prompt: "Which is an example of permissible Duʿāʾ al-Masʾalah (request)?",
    options: [
      "Asking a saint in his grave to grant children",
      "Asking a friend to hand you water",
      "Asking a living person to bring rain by their will",
      "Asking a dead person to cure you",
    ],
    answerIndex: 1,
    explanation:
      "Requests within human capability are allowed; asking for divine prerogatives is shirk.",
  },
  {
    id: "C6-Q28",
    prompt:
      "What did the Prophet ﷺ rule when asked if one should stoop to greet his brother?",
    options: ["Yes, for respect", "Only for elders", "No", "Only on Fridays"],
    answerIndex: 2,
    explanation:
      "He forbade stooping as a greeting; such reverence belongs to Allah alone.",
  },
  {
    id: "C6-Q29",
    prompt:
      "According to the chapter, what is the fate of one who dies upon major shirk?",
    options: [
      "Temporary punishment then Paradise",
      "Immediate entrance to Paradise",
      "Forgiven if he did good deeds",
      "Hell forever and Paradise forbidden",
    ],
    answerIndex: 3,
    explanation:
      "Texts specify permanence of punishment and prohibition of Paradise for major shirk.",
  },
  {
    id: "C6-Q30",
    prompt:
      "Which Qurʾānic passage is cited to show losing both world and Hereafter due to unstable worship?",
    options: [
      "Al-Anʿām 6:116",
      "Al-Ḥajj 22:11-13",
      "Az-Zumar 39:15",
      "Al-Isrāʾ 17:70",
    ],
    answerIndex: 1,
    explanation:
      "Al-Ḥajj 22:11-13 depicts worship on the edge and loss in both abodes.",
  },
  {
    id: "C6-Q31",
    prompt: "What three things follow the dead according to the ḥadīth cited?",
    options: [
      "Deeds, intentions, and family",
      "Family, wealth, and deeds",
      "Wealth, home, and lineage",
      "Deeds, lineage, and friends",
    ],
    answerIndex: 1,
    explanation: "Family and wealth return; only deeds remain with the person.",
  },
  {
    id: "C6-Q32",
    prompt:
      "If a man does not care to swear by Allah but insists on swearing by a revered thing, what is the preferred judicial approach?",
    options: [
      "Let him swear by the revered thing to get the truth",
      "Force him to swear by Allah even if he lies",
      "No oath is needed",
      "Make him swear by either; both equal",
    ],
    answerIndex: 1,
    explanation:
      "He should be made to swear by Allah; we do not aid someone in shirk.",
  },
  {
    id: "C6-Q33",
    prompt:
      "The chapter raises a discussion: Does entering Hell for shirk always imply eternity?",
    options: [
      "Yes, even for minor shirk",
      "No, never for major shirk",
      "Depends: eternity is for major shirk; minor shirk does not necessitate eternity",
      "It is unknown",
    ],
    answerIndex: 2,
    explanation:
      "Eternity is attached to major shirk; minor shirk does not necessitate abiding forever.",
  },
  {
    id: "C6-Q34",
    prompt:
      "Which of the following best captures the practical purpose of recounting Ibrāhīm’s praise?",
    options: [
      "To admire his genealogy",
      "So we love whom Allah praises and imitate those qualities",
      "To debate ancient history",
      "To dismiss contemporary shirk as impossible",
    ],
    answerIndex: 1,
    explanation:
      "Allah’s praise guides love/loyalty and motivates emulation of praised traits.",
  },
  {
    id: "C6-Q35",
    prompt:
      "What did Ibn Abī Mulaykah report about the Companions’ attitude toward hypocrisy?",
    options: [
      "They felt totally safe from it",
      "They feared it for themselves",
      "They accused others only",
      "They denied hypocrisy exists",
    ],
    answerIndex: 1,
    explanation: "He met thirty Companions; each feared hypocrisy for himself.",
  },
  {
    id: "C6-Q36",
    prompt: "Which statement about riyāʾ and public worship is correct?",
    options: [
      "Any public worship is riyāʾ",
      "Public worship to model Sunnah and teach is not riyāʾ",
      "Only hidden worship counts",
      "Teaching intentions are invalid",
    ],
    answerIndex: 1,
    explanation:
      "Acting publicly to teach/encourage others is daʿwah, not riyāʾ.",
  },
  {
    id: "C6-Q37",
    prompt:
      "What is the key ethical takeaway regarding people’s acceptance or rejection of one’s statements?",
    options: [
      "Seek acceptance because it validates you",
      "Avoid truth if it is unpopular",
      "Be pleased if truth is accepted and not saddened if it is rejected",
      "Silence is always better than speaking",
    ],
    answerIndex: 2,
    explanation:
      "Sincerity: rejoice at acceptance of truth itself, not personal credit; don’t grieve at rejection.",
  },
  {
    id: "C6-Q38",
    prompt:
      "What distinction does the chapter draw between “many” and “majority” using 17:70?",
    options: [
      "They are identical in Qurʾānic usage",
      "‘Many’ (kathīr) does not equal ‘most’ (akthar); wording is precise",
      "‘Many’ always means ‘all’",
      "‘Majority’ is never used in Qurʾān",
    ],
    answerIndex: 1,
    explanation:
      "The verse says ‘above many’, not ‘most’; precision matters in deriving implications.",
  },
  {
    id: "C6-Q39",
    prompt:
      "According to Muslim’s report from Jābir, what dual outcome is tied to meeting Allah?",
    options: [
      "Wealth or poverty",
      "Paradise without any judgment for all",
      "Paradise for those without shirk; Hell for those with shirk",
      "Equal outcomes regardless of belief",
    ],
    answerIndex: 2,
    explanation:
      "Who meets Allah without shirk enters Paradise; with shirk, enters Hell.",
  },
  {
    id: "C6-Q40",
    prompt: "Why is fear of minor shirk emphasized even for the righteous?",
    options: [
      "Because it is obvious and easy to notice",
      "Because it is rare and theoretical",
      "Because it is subtle, beloved to the soul, and can creep into deeds",
      "Because it only affects sinners",
    ],
    answerIndex: 2,
    explanation:
      "Riyāʾ is hidden and attractive to the ego; thus most feared even for the pious.",
  },
];

/* ---------- Robust Question component (handles any question shape) -------- */
function Question({ q }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const opts = useMemo(() => {
    if (Array.isArray(q?.options)) return q.options;
    if (Array.isArray(q?.choices)) return q.choices.map((c) => c.text);
    return [];
  }, [q]);

  const answerIdx = useMemo(() => {
    if (Number.isInteger(q?.answerIndex)) return q.answerIndex;
    if (Array.isArray(q?.choices))
      return q.choices.findIndex((c) => c.key === q.answer);
    return 0;
  }, [q]);

  const correct = selected === answerIdx;

  return (
    <Card className="border-emerald-200/70">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-2 text-white shadow-md">
          <HelpCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-900">{q.prompt}</p>

          <div className="mt-3 grid gap-2">
            {opts.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrect = answerIdx === idx;
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

          {revealed && q.explanation && (
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
  const items = Array.isArray(QUESTIONS) ? QUESTIONS : [];
  return (
    <section id="bank" className="mx-auto max-w-7xl px-3 sm:px-6 pb-16">
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
            Answer each question, then reveal the correct answer and its
            explanation.
          </p>
        </div>
        <Pill tone="sky">
          <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />{" "}
          {items.length} questions
        </Pill>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((q) => (
          <Question key={q.id} q={q} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------ Content Placeholders (ALL topics) --------------- */
/* These placeholders ensure we won't miss ANY part of your article. */

function ContentPlaceholders_All() {
  return (
    <>
      {/* Intro & Relevance */}
      <Section
        id="intro"
        tone="emerald"
        title="Chapter overview"
        subtitle="Why fearing shirk completes the previous two chapters."
      >
        <p>
          <strong>FEAR OF SHIRK</strong>
        </p>

        <Verse
          tone="indigo"
          arabic="إِنَّ اللَّهَ لَا يَغْفِرُ أَنْ يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَنْ يَشَاءُ"
        >
          “Never shall Allah forgive the incorporation with Him of other
          deities, but He forgives all else to whom He wills.” (An-Nisāʾ 116)
        </Verse>

        <p className="font-semibold">
          COMMENTARY — The Relevance of This Chapter to the Two Preceding
          Chapters
        </p>
        <p>
          In the first chapter, the author mentioned affirmation of{" "}
          <HL>tawḥīd</HL>; in the second chapter, he mentioned that whoever
          truly affirms tawḥīd will enter Paradise without accounting and
          without any punishment. He then followed with this chapter as the
          third because an individual may think that he has truly affirmed
          tawḥīd while he did not. This was why some of the pious predecessors
          would say,
          <em>
            “I do not struggle against my soul for anything as I do on
            Sincerity.”
          </em>
        </p>
        <p>
          This is because the human mind is connected to worldly things; it
          desires to share from material possessions, fame and positions of
          leadership in this world — it may even desire that using the deeds of
          the hereafter — which shows great weakness in the person’s sincerity.
          Only a few have the hereafter as their ultimate aim in every deed.
          Thus, the author followed the two aforementioned chapters with this
          chapter:
          <HL tone="rose">Fear of Shirk</HL>. He cited two verses therein.
        </p>
      </Section>

      {/* 4:116 — scope and grammar */}
      <Section
        id="verse-4-116"
        tone="indigo"
        title="Allah does not forgive shirk — An-Nisāʾ 4:116"
        subtitle="Grammar of ‘an yushraka bihi’ and scope of ‘mā dūna dhālik’."
      >
        <Verse
          tone="indigo"
          arabic="إِنَّ اللَّهَ لَا يَغْفِرُ أَنْ يُشْرَكَ بِهِ"
        >
          “Never shall Allah forgive the incorporation with Him of other
          deities.”
        </Verse>

        <p>
          The article <em>lā</em> is of negation, and{" "}
          <em>أَنْ يُشْرَكَ بِهِ</em> (the incorporation with Him of other
          deities) is a present tense connected with the infinitive article{" "}
          <em>an</em>, turning to the infinitive mood such that it fully occurs
          as: <em>“Never shall Allah forgive association partners with Him”</em>{" "}
          or
          <em>
            “Never shall Allah forgive any form of association of partners with
            Him.”
          </em>
        </p>
        <p>
          <strong>Allah will never forgive shirk</strong> because it is a
          serious crime against the exclusive right of Allah — the{" "}
          <HL>tawḥīd</HL>. As for other sins, such as fornication and theft,
          humans may be affected in his passion. But for shirk, it is violation
          of Allah’s rights. Humans don’t have any share thereof; it is not for
          any passion a person seeks to fulfill. It is an act of injustice!
          Allah the Exalted says:
        </p>

        <Verse tone="rose" arabic="إِنَّ الشِّرْكَ لَظُلْمٌ عَظِيمٌ">
          “Polytheism is a grave injustice (and an unforgivable sin) indeed.”
          (Luqmān 13)
        </Verse>

        <p>
          However, is the polytheism mentioned here the major one or just
          general shirk? Some scholars hold that it is general, including every
          form of shirk — even the minor ones such as swearing with other than
          Allah — for the reason that Allah will not pardon it. As for the major
          sins such as theft and consuming intoxicants, it is under Allah’s
          Will; Allah may forgive it. Even Shaykh al-Islām Ibn Taymiyyah — an
          erudite scholar in this field — had different views on this issue:
          once he said that Allah will not forgive shirk even if it is the minor
          one; and at another instance he said the form of shirk that Allah will
          not forgive is the major one.
        </p>
        <p>
          Anyway, one must be cautious of shirk in its entirety since the minor
          form could fall under the general. This is because the statement of
          Allah
          <em>أَنْ يُشْرَكَ بِهِ</em> — the article <em>an</em> and what comes
          after it change the sentence to the infinitive — comes fully as,
          <em>“any form of joining any partner with.”</em> So it is the syntax
          of an <em>indefinite</em> noun in the context of <em>negation</em>,
          therefore implying
          <HL>generalization</HL>.
        </p>

        <Verse
          tone="indigo"
          arabic="وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَنْ يَشَاءُ"
        >
          “But He forgives all else to whom He wills.”
        </Verse>

        <p>
          What is meant with <em>dūna</em> (“all else”) here is all other sins{" "}
          <em>lesser than shirk</em> and not any other than shirk.
        </p>
      </Section>

      {/* 14:35 — Ibrāhīm’s du‘āʾ & fearing nifāq */}
      <Section
        id="verse-14-35"
        tone="sky"
        title="Ibrāhīm’s supplication — keep us from idols (Ibrāhīm 14:35)"
        subtitle="‘Wajnubnī’ emphasis, who ‘banīyya’ covers, and fearing hypocrisy."
      >
        <Verse
          tone="sky"
          arabic="وَاجْنُبْنِي وَبَنِيَّ أَنْ نَعْبُدَ الْأَصْنَامَ"
        >
          “And guard me O Allah, my Creator, and my progeny from idol worship.”
          (Ibrāhīm 35)
        </Verse>

        <p className="font-semibold">COMMENTARY</p>
        <p>
          It is said that what he means with the word <em>banīyya</em> (“my
          progeny”) is: his sons from his loins. And we do not know of any from
          his loins except Ismāʿīl and Isḥāq (ʿalayhimā as-salām). Some have
          also said that it refers to his progeny and descendants, and this is
          the most preponderant — based on the verses which indicate his
          supplications for people among his progeny.
        </p>
        <p>
          However, from Allah’s wisdom is that He did not answer his
          supplication regarding some of them — as the Messenger ﷺ also did
          supplicate that the problem of his Ummah should not be from amongst
          themselves and Allah did not accept his supplication. Additionally,
          the first position will not hold for the fact that the verse is in the
          plural tense while Ibrāhīm — peace be upon him — only had Isḥāq and
          Ismāʿīl.
        </p>
        <p>
          <strong>“…and guard me”</strong> means: put me on one side and the
          idols apart. This is more eloquent than for him to say, “keep me and
          my progeny away from shirk,” because if he is on one side away from
          it, he is more far away.
        </p>
        <p>
          Ibrāhīm (ʿalayhis-salām) <HL>feared shirk for himself</HL> despite
          being the Khaleel (the bosom friend) of the Most Merciful and the
          leader of monotheists.
          <em>What then shall we say about our own case?!</em> So, do not feel
          secured from shirk or nifāq, because it is only the hypocrites who do
          feel safe from hypocrisy, and no one fears hypocrisy except the
          believer. Thus, Ibn Abī Mulaykah said, “I met thirty companions of the
          Prophet ﷺ; each of them feared hypocrisy for himself.”
        </p>
        <p>
          Even ʿUmar b. al-Khaṭṭāb (may Allah be pleased with him) feared
          hypocrisy for himself. So he told Ḥudhayfah b. al-Yamān (may Allah be
          pleased with him) — to whom the Prophet ﷺ confided the names of some
          of the hypocrites: “I adjure you by Allah, did the Prophet ﷺ mention
          my name among those he mentioned from the hypocrites?” Ḥudhayfah
          replied, “No, but I shall not sanctify any other person after you.”
          ʿUmar only sought to be more convinced; otherwise, the Prophet ﷺ had
          already affirmed that he will enter Paradise.
        </p>
        <p>
          It should not be said that ʿUmar only wanted to encourage people to
          beware of hypocrisy but did not worry about it himself — since this
          assumption contradicts what is apparent from the expression; and the
          basic rule is to consider expressions based on their apparent
          meanings.
        </p>
        <p>
          A similar statement is what some of the scholars have said about some
          things the Prophet ﷺ would attribute to himself. They say: he ﷺ only
          aimed to teach by it; he only intended to explain to others — as it is
          said that the Messenger ﷺ did not say <em>Rabbi-ghfir lī</em> (“O my
          Lord, forgive me”) because he had sins but because he wanted to teach
          the people how to seek forgiveness.{" "}
          <strong>This assumption contradicts the basic rule!</strong> Likewise,
          some say that he ﷺ would loudly recite the words of remembrance after
          the obligatory prayers in order to teach the people remembrance of
          Allah — and not because loudly reciting it is from the Sunnah. The
          apparent practice indicates its legitimacy unless another proof
          restricts it.
        </p>
        <p>
          Grammatically, the article <em>an</em> and the verb after it in{" "}
          <em>أَنْ نَعْبُدَ</em> turns to the infinitive and is a second
          predicate for the expression
          <em>wajnubnī</em>. The word <em>al-aṣnām</em> is the plural of{" "}
          <em>ṣanam</em> (idol): what is made in the image of man or others
          which is worshipped besides Allah. As for <em>al-wathan</em>, it
          refers to all that is worshipped besides Allah in whatever form it is.
          In a ḥadīth it says:
          <em>“Do not make my grave an object of worship.”</em> So{" "}
          <em>wathan</em> is more general than <em>ṣanam</em>.
        </p>
        <p>
          There is no doubt that Ibrāhīm (ʿalayhis-salām) asked his Lord for
          steadfastness upon tawḥīd since if He distanced him from shirk, he
          remains firm upon tawḥīd. The point of reference from the verse is
          that: Ibrāhīm feared shirk even though he was the leader of the
          monotheists; he was their leader — with the exception of the Messenger
          of Allah ﷺ.
        </p>
      </Section>

      {/* Ḥadīth threat: dies calling others → Fire */}
      <Section
        id="whoever-dies"
        tone="indigo"
        title="Whoever dies while calling upon other than Allah…"
        subtitle="Bukhārī report and detailed commentary on duʿāʾ and its types."
      >
        <Card className="border-indigo-200/70">
          <p className="font-semibold">Text</p>
          <p className="mt-2 leading-7">
            Ibn Masʿūd (may Allah be pleased with him) reported that the
            Messenger of Allah ﷺ said,
            <em>
              “Whoever dies while calling unto other than Allah in equality with
              Him will enter the Hell.”
            </em>
            Reported by al-Bukhārī.
          </p>
        </Card>

        <p className="font-semibold">COMMENTARY</p>
        <p>
          His saying: <em>man</em> (Whoever), is particle of condition serving a
          generality for both males and the females.
        </p>
        <p>
          His saying:{" "}
          <em>while calling unto other than Allah in equality with Him</em>:
          That is, joining an equal with Allah either by supplicating to it by
          way of worship or requesting; because supplications are of two
          divisions:
        </p>

        <Card className="border-slate-200">
          <p className="font-semibold">Two types of duʿāʾ</p>
          <ol className="mt-2 list-decimal list-inside space-y-2">
            <li>
              <HL>Duʿāʾ al-ʿIbādah</HL> (Supplication of Worship) such as
              fasting, the ṣalāh and other forms of worship. When a person
              observes the ṣalāh or fasts, he has called upon his Lord in the
              circumstance to forgive him, save him from His punishment and
              grant his requests; this is during the ṣalāh. Such also entails
              clearcut supplications. This division is evinced by His saying the
              Exalted:
              <Verse
                tone="indigo"
                arabic="وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ ۚ إِنَّ الَّذِينَ يَسْتَكْبِرُونَ عَنْ عِبَادَتِي سَيَدْخُلُونَ جَهَنَّمَ دَاخِرِينَ"
              >
                “And your Lord says, ‘Pray unto Me; I will answer your prayer.
                But those who are too proud to worship Me shall enter Hell
                humiliated.’” (Ghāfir 40:60)
              </Verse>
              So He made supplication an act of worship. In this division,
              whoever directs any act of worship to other than Allah has
              apostated out of the fold of Islām. If he bows to a person or
              prostrates for a thing revered, or requests Allah during the
              bowing — the Prophet ﷺ forbade <strong>stooping</strong>
              while greeting one another when he was asked concerning the one
              who meets his brother; should he stoop for him? He answered,{" "}
              <em>“No!”</em> This is contrary to what some ignoramuses do; when
              they greet you they stoop for you. So, it is pertinent for every
              believer in Allah to disapprove of it since such a person is
              revering you at the expense of his religion.
            </li>
            <li>
              <HL>Duʿāʾ al-Masʾalah</HL> (Supplication of Request). It does not
              all entail shirk; it has aspects. If the creature has the ability
              to grant the request, then it is not shirk — such as your saying:
              ‘give me water’ to a person who can do that. He ﷺ said,{" "}
              <em>“Whoever requests of you, grant him.”</em> Allah the Exalted
              says:
              <Verse
                tone="indigo"
                arabic="وَإِذَا حَضَرَ الْقِسْمَةَ أُولُوا الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينُ فَارْزُقُوهُمْ مِنْهُ وَقُولُوا لَهُمْ قَوْلًا مَعْرُوفًا"
              >
                “And should the relatives, the orphans and the needy be present
                (at the occasion of dividing the heritage), then provide them
                with some portion of it and say to them good words.” (An-Nisāʾ
                4:8)
              </Verse>
              So, when a poor stretches his hand and says, ‘give me’; it is not
              shirk as Allah says: “then provide them with some portion of it.”
              But when he requests a creature of what Allah alone can grant,
              then his supplication is an act of shirk which removes a person
              from the fold of Islām — e.g., requesting a person to cause
              rainfall believing that such is capable of that.
            </li>
          </ol>
        </Card>

        <p>
          The meaning of the Messenger’s ﷺ saying:{" "}
          <em>
            “Whoever dies while calling unto other than Allah in equality with
            Him…”
          </em>{" "}
          is an equal in worship. As for an equal in request; that entails the
          aforementioned explanation. Unfortunately, in some Islamic lands, some
          believe that a particular person buried in the grave — whose remains
          may still be in the ground or might have been eaten up by the earth —
          could grant benefit or cause harm! Or that such dead person could
          provide progeny for the barren.{" "}
          <HL tone="rose">This is major shirk</HL> which throws a person out of
          the fold of Islām. To affirm this is worse than affirming alcohol
          consumption, illicit intercourse and homosexuality because it is an
          affirmation of disbelief and not just an affirmation of lewdness.
        </p>

        <p>
          His saying: <em>will enter the Hell</em>: that is, forever — even
          though the expression has not pointed to that (since <em>dakhalā</em>{" "}
          describes an action which is not limited). Similarly, Allah the
          Exalted says:
        </p>

        <Verse
          tone="rose"
          arabic="إِنَّهُۥ مَن يُشْرِكْ بِٱللَّهِ فَقَدْ حَرَّمَ ٱللَّهُ عَلَيْهِ ٱلْجَنَّةَ وَمَأْوَىٰهُ ٱلنَّارُ ۖ وَمَا لِلظَّـٰلِمِينَ مِنْ أَنصَارٍۢ"
        >
          “Verily, whosoever sets up partners in worship with Allah, then Allah
          has forbidden Paradise for him, and the Fire will be his abode; and
          for the wrongdoers there are no helpers.” (Al-Māʾidah 5:72)
        </Verse>

        <p>
          So, if such is forbidden entrance into the Paradise, then it implies
          that he will be in the Hell forever. Therefore, it is obligatory to{" "}
          <HL>fear shirk</HL>
          considering its punishment. The polytheist will lose in the Hereafter
          because he will be in Hell forever. He will also lose this world
          because he would not have benefitted anything from it. The evidence
          had been established against him; the warner had come to him but he
          lost — and the refuge is with Allah. He did not gain anything from
          this world! Allah the Exalted says:
        </p>

        <Verse
          tone="indigo"
          arabic="أَوَلَمْ نُعَمِّرْكُمْ مَا يَتَذَكَّرُ فِيهِ مَنْ تَذَكَّرَ وَجَاءَكُمُ النَّذِيرُ ۖ فَذُوقُوا فَمَا لِلظَّالِمِينَ مِنْ نَصِيرٍ"
        >
          “Did We not give you life long enough to give a chance to him who was
          willing to remember! You received Allah’s warner. So taste (the
          punishment); for the wrongdoers there is no helper.” (Fāṭir 35:37)
        </Verse>

        <Verse
          tone="indigo"
          arabic="وَمِنَ النَّاسِ مَن يَعْبُدُ اللَّهَ عَلَىٰ حَرْفٍۢ فَإِنْ أَصَابَهُ خَيْرٌ ٱطْمَأَنَّ بِهِۦ وَإِنْ أَصَابَتْهُ فِتْنَةٌ ٱنقَلَبَ عَلَىٰ وَجْهِهِ خَسِرَ ٱلدُّنْيَا وَٱلْـَٔاخِرَةَ ۚ ذَٰلِكَ هُوَ ٱلْخُسْرَانُ ٱلْمُبِينُ (١١) يَدْعُوا۟ مِن دُونِ ٱللَّهِ مَا لَا يَضُرُّهُۥ وَمَا لَا يَنفَعُهُۥ ۚ ذَٰلِكَ هُوَ ٱلضَّلَـٰلُ ٱلْبَعِيدُ (١٢) يَدْعُوا۟ لَمَن ضَرُّهُۥٓ أَقْرَبُ مِن نَّفْعِهِۦ ۚ لَبِئْسَ ٱلْمَوْلَىٰ وَلَبِئْسَ ٱلْعَشِيرُ (١٣)"
        >
          “And among mankind is he who worships Allah as it were, upon the very
          edge; if good befalls him, he is content therewith; but if a trial
          befalls him, he turns back on his face. He loses both this world and
          the Hereafter — that is the evident loss. He calls besides Allah unto
          that which neither hurts him nor profits him — that is a straying far
          away. He calls unto one whose harm is nearer than his profit;
          certainly an evil patron and an evil friend!” (Al-Ḥajj 22:11–13)
        </Verse>

        <Verse
          tone="indigo"
          arabic="قُلْ إِنَّ ٱلْخَـٰسِرِينَ ٱلَّذِينَ خَسِرُوٓا۟ أَنفُسَهُمْ وَأَهْلِيهِمْ يَوْمَ ٱلْقِيَـٰمَةِ ۗ أَلَا ذَٰلِكَ هُوَ ٱلْخُسْرَانُ ٱلْمُبِينُ"
        >
          “Say (O Muḥammad), ‘The losers are those who will lose themselves and
          their families on the Day of Resurrection. Verily, that will be a
          manifest loss!’” (Az-Zumar 39:15)
        </Verse>

        <p>
          Thus, he lost his soul since he did not gain anything! He lost his
          family because if they were from the believers they will be in the
          Paradise — so he will not enjoy them in the Hereafter. And if they
          enter the Hell, it is the same! Because whenever any group enters, it
          curses the other.
        </p>

        <Callout tone="rose">
          <strong>Shirk is sneaky</strong>; it may be in a person while he knows
          not except after succinct contemplation. One of the pious predecessors
          said:
          <em>
            “I have not struggled against my soul as I did over Sincerity.”
          </em>
        </Callout>

        <p>
          But Allah makes sincerity easy for the servant when he pays serious
          attention to it — seeking Allah’s Face with his actions, not seeking
          people’s praise or avoiding their disparagement. The people will never
          benefit him even if they come out with him to follow his corpse; they
          will not benefit him except his deeds.
        </p>

        <Card className="border-slate-200">
          <p className="font-semibold">Three that follow the dead</p>
          <p className="mt-1">
            He ﷺ said,{" "}
            <em>
              “…three things follow the dead, two of which return while one
              remains. His family, wealth and deeds follow him. His family and
              wealth return while the deeds remain.”
            </em>
          </p>
        </Card>

        <p>
          Likewise, it is necessary that one is not delighted that the people
          accept his statements just because they are his. He should rather be
          happy that his statements are accepted when seen to be the truth — not
          necessarily because they are his. Similarly, it should not sadden him
          that the people reject his statements because it is the truth. In this
          manner, sincerity becomes truly attained. It is actually a difficult
          thing — except for the one who is truly and submissively devoted to
          Allah and upon the straight path; for Allah will help him achieve it
          and make it easy for him.
        </p>
      </Section>

      {/* Ḥadīth promise: meets Allah w/o shirk → Jannah */}
      <Section
        id="whoever-meets"
        tone="sky"
        title="Whoever meets Allah not joining any partner with Him…"
        subtitle="Muslim report; grammar and legal inferences."
      >
        <Card className="border-sky-200/70">
          <p className="font-semibold">Text</p>
          <p className="mt-2 leading-7">
            Muslim also reported from Jābir (may Allah be pleased with him) that
            the Messenger of Allah ﷺ said,
            <em>
              “Whoever meets Allah not joining any partner with Him will enter
              the Paradise. And whoever meets Him while joining any partner with
              Him will enter the Hell.”
            </em>
          </p>
        </Card>

        <p className="font-semibold">COMMENTARY</p>
        <p>
          His saying: <em>man</em> (whoever) is a particle of condition serving
          a generality. The accompanying predicate is <em>laqiya</em> (meets)
          while the response is his statement <em>dakhala al-Jannah</em> (will
          enter Paradise).
        </p>
        <p>
          <strong>This admission into the Paradise does not negate</strong> his
          being punished according to his sins if he has sins — as is pointed to
          by the Texts of Threat — and that is if Allah does not forgive him
          since it falls under His Will.
        </p>
        <p>
          His saying: <em>lā yushrik</em> (not joining any partner) serves in
          the accusative mood showing the condition of the subject of the verb{" "}
          <em>laqiya</em> (meets). His saying: <em>shayʾan</em> (any partner) is
          an indefinite noun in the context of a conditional expression thereby
          including <HL>all forms of shirk</HL>: even if he joins the noblest
          creature — the Messenger ﷺ — he will enter the Hell. So, what about
          the one who regards the Messenger ﷺ as greater than Allah and
          therefore turns to him during calamities?! He would not turn to Allah;
          in fact he may even turn towards something below the Prophet ﷺ?!
        </p>

        <Card className="border-slate-200">
          <p className="font-semibold">On oaths and uncovering truth</p>
          <p>
            There are those who care not about swearing with Allah — whether
            upon the truth or while lying. As such, there is difference
            concerning the one who bothers not about swearing by Allah but would
            only swear with his creed or something he reveres upon the truth.
            Should he be requested to swear by Allah or by these things (he
            reveres)?
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              It is said that he should be made to swear by <HL>Allah</HL> even
              if he lies in that — since he should not be assisted upon shirk.{" "}
              <em>This is the correct opinion.</em>
            </li>
            <li>
              It is also said that he should be made to swear with{" "}
              <em>other than Allah</em> since the aim is to get to reveal the
              truth which will not be achieved when he would lie on oath.{" "}
              <strong>We however say:</strong> But if he is being truthful he
              will swear and fall into shirk.
            </li>
          </ul>
        </Card>

        <Card className="border-rose-200">
          <p className="font-semibold">A matter for discussion</p>
          <p>
            Does entering the Hell for the one who commits shirk necessarily
            mean being in it forever? This will depend on the category of shirk.
            If it is a<HL tone="rose">minor shirk</HL>, that does not
            necessarily mean being in the Hell forever. But if it is the{" "}
            <HL>major shirk</HL>, he will definitely abide in Hell forever as
            the texts evince.
          </p>
          <p className="mt-2">
            However, if we consider the discussion to be about the major shirk
            in the two cases:{" "}
            <em>
              “Whoever meets Allah not joining any partner with Him will enter
              the Paradise”
            </em>{" "}
            and his saying:{" "}
            <em>
              “Whoever meets Allah while joining any partner with Him will enter
              the Hell”
            </em>{" "}
            and say: Whoever meets Allah, not committing major shirk will enter
            the Paradise — even if he is punished in Hell as appropriate — his
            eventual place of abode will be in the Paradise. And that whoever
            meets Him while upon major shirk will enter the Hell and abide
            therein forever; <strong>without this elaboration</strong> (the
            ḥadīth may not be put in the right place).
          </p>
        </Card>
      </Section>

      {/* Important Matters — concise list */}
      <Section
        id="important-matters-list"
        tone="amber"
        title="Important Matters (Concise List)"
        subtitle="Key outcomes and takeaways of the chapter."
      >
        <ol className="list-decimal list-inside space-y-1">
          <li>First – Fear of Shirk.</li>
          <li>Second – That show-off is a form of Shirk.</li>
          <li>Third – That it is a minor Shirk.</li>
          <li>Fourth – That it is what is most feared for the righteous.</li>
          <li>Fifth – The proximity of the Paradise and Hell (to a person).</li>
          <li>
            Sixth – Connecting between their proximities in one ḥadīth: “Whoever
            meets Allah not joining any partner with Him…”
          </li>
          <li>
            Seventh – That whoever meets Him joining any partner with Him will
            enter the Hell even if he is among the most worshipful of the
            people.
          </li>
          <li>
            Eighth – The great issue of Khaleel’s supplication for himself and
            his children for protection from idol worship.
          </li>
          <li>
            Ninth – Considering it (i.e. Shirk) as the condition with greater
            multitude based on His saying: “O Allah, my Creator, surely they
            have strayed the minds of the many among people…” (Ibrāhīm: 36).
          </li>
          <li>
            Tenth – It contains the explanation of <em>lā ilāha illā Allāh</em>{" "}
            as mentioned by al-Bukhārī.
          </li>
          <li>Eleventh – The excellence of the one free from Shirk.</li>
        </ol>
      </Section>

      {/* Important Matters — detailed commentary */}
      <Section
        id="important-matters-commentary"
        tone="emerald"
        title="Important Matters — Commentary"
        subtitle="Evidence and explanations for each point."
      >
        {/* #1 Fear of Shirk */}
        <Card className="border-emerald-200">
          <p className="font-semibold">First – Fear of Shirk</p>
          <p>Based on His saying:</p>
          <Verse
            tone="indigo"
            arabic="إِنَّ اللَّهَ لَا يَغْفِرُ أَنْ يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَنْ يَشَاءُ وَمَنْ يُشْرِكْ بِاللَّهِ فَقَدْ ضَلَّ ضَلَالًا بَعِيدًا"
          >
            “Verily! Allah forgives not (the sin of) setting up partners in
            worship with Him, but He forgives whom He pleases sins other than
            that; and whoever sets up partners in worship with Allah has indeed
            strayed far away.” (An-Nisāʾ 4:116)
          </Verse>
          <p>And His saying:</p>
          <Verse
            tone="sky"
            arabic="وَاجْنُبْنِي وَبَنِيَّ أَنْ نَعْبُدَ الْأَصْنَامَ"
          >
            “And keep me and my sons away from worshipping idols.” (Ibrāhīm
            14:35)
          </Verse>
        </Card>

        {/* #2 Show-off is shirk */}
        <Card className="border-emerald-200">
          <p className="font-semibold">
            Second – That show-off is a form of Shirk
          </p>
          <p>
            Based on the ḥadīth,{" "}
            <em>“What I fear most for you is the minor shirk.”</em> He was asked
            about it and he replied, <em>“Show-off.”</em> Its rulings vis-à-vis
            invalidation of deeds were explained earlier.
          </p>
        </Card>

        {/* #3 Minor shirk nuance */}
        <Card className="border-emerald-200">
          <p className="font-semibold">Third – That it is a minor Shirk</p>
          <p>
            Because the Prophet ﷺ when asked about it answered that it is,{" "}
            <em>“Show-off.”</em> So he called it minor shirk. But can it advance
            to a major one? From the apparent meaning of the ḥadīth, that is not
            possible because he said, “minor shirk,” and when asked about it he
            said it is “show-off.”
          </p>
          <p className="mt-2">
            However, in the statements of Ibn al-Qayyim رحمه الله, when he
            mentions minor shirk, he would say,{" "}
            <em>“such as some show-off.”</em> This shows that much of it is not
            from minor (shirk). Nevertheless, if he meant <em>number</em>, he
            will be right — because if such a person shows-off in all actions,
            he would have been committing the major shirk due to the absence of
            sincerity in every deed he performs. But if he meant that it (i.e.,
            show-off) is entirely minor, that would not hold.
          </p>
        </Card>

        {/* #4 Most feared for the righteous */}
        <Card className="border-emerald-200">
          <p className="font-semibold">
            Fourth – What is most feared for the righteous
          </p>
          <p>
            It is deduced from his saying,{" "}
            <em>“What I fear most for you is the minor shirk,”</em> and because
            it may cross a person’s mind surreptitiously owing to its being
            hidden and endearing to the soul: many souls love to be praised for
            worshiping Allah.
          </p>
        </Card>

        {/* #5–#6 Nearness of Jannah & Hell and their linkage */}
        <Card className="border-emerald-200">
          <p className="font-semibold">
            Fifth – The proximity of the Paradise and Hell (to a person)
          </p>
          <p className="font-semibold">
            Sixth – Connecting both proximities in one ḥadīth
          </p>
          <p>
            Both are derived from:{" "}
            <em>
              “Whoever meets Allah not joining any partner with Him will enter
              the Paradise. And whoever meets Him while joining any partner with
              Him will enter the Hell.”
            </em>
          </p>
        </Card>

        {/* #7 Entering Hell even if very worshipful (with verse) */}
        <Card className="border-emerald-200">
          <p className="font-semibold">
            Seventh – Whoever meets Him joining any partner with Him will enter
            the Hell even if he is among the most worshipful
          </p>
          <p>
            Derived from the generality of <em>“Whoever meets Allah…”</em> since{" "}
            <em>man</em> serves the general sense. If the shirk he commits is
            major, he will not enter Paradise even if he is among the most
            worshipful based on His saying:
          </p>
          <Verse
            tone="rose"
            arabic="إِنَّهُۥ مَن يُشْرِكْ بِٱللَّهِ فَقَدْ حَرَّمَ ٱللَّهُ عَلَيْهِ ٱلْجَنَّةَ وَمَأْوَىٰهُ ٱلنَّارُ"
          >
            “And he who incorporates with Him other deities shall be denied
            Paradise; his abode is the Fire.” (Al-Māʾidah 5:72)
          </Verse>
          <p>
            However, if it is the minor one, he will be punished to the degree
            of his sins and then will enter the Paradise.
          </p>
        </Card>

        {/* #8 Ibrahim’s du‘ā’ again */}
        <Card className="border-emerald-200">
          <p className="font-semibold">
            Eighth – The great issue of Khaleel’s supplication
          </p>
          <p>
            For himself and his children for protection from idol worship —
            taken from His saying:
          </p>
          <Verse
            tone="sky"
            arabic="وَاجْنُبْنِي وَبَنِيَّ أَنْ نَعْبُدَ الْأَصْنَامَ"
          >
            “And guard me O Allah, my Creator, and my progeny from idol
            worship.” (Ibrāhīm 14:35)
          </Verse>
        </Card>

        {/* #9 Many vs Majority with 14:36 and 17:70 */}
        <Card className="border-emerald-200">
          <p className="font-semibold">
            Ninth – Considering shirk the condition of the many
          </p>
          <p>Based on His saying:</p>
          <Verse
            tone="indigo"
            arabic="رَبِّ إِنَّهُنَّ أَضْلَلْنَ كَثِيرًا مِّنَ النَّاسِ"
          >
            “O Allah, my Creator, surely they have strayed the minds of the many
            among people…” (Ibrāhīm 14:36)
          </Verse>
          <p>
            There is an ambiguity because the author said, “with the majority,”
            while the verse reads, “many among people,” and there is difference
            between “majority” and “many.” Thus, Allah the Exalted says
            concerning the descendants of Ādam:
          </p>
          <Verse
            tone="indigo"
            arabic="وَلَقَدْ كَرَّمْنَا بَنِي آدَمَ ... وَفَضَّلْنَاهُمْ عَلَىٰ كَثِيرٍ مِمَّنْ خَلَقْنَا تَفْضِيلًا"
          >
            “…And We placed them in a class distinctly above many of Our
            creatures.” (Al-Isrāʾ 17:70)
          </Verse>
          <p>
            He did neither say, “above most of the creatures” nor “above the
            creatures.” Therefore, the children of Ādam were preferred over many
            of Allah’s creatures but are not the most preferred creatures to
            Allah even though He favoured them.
          </p>
        </Card>

        {/* #10 Lā ilāha illā Allāh explanation */}
        <Card className="border-emerald-200">
          <p className="font-semibold">
            Tenth – It contains the explanation of <em>lā ilāha illā Allāh</em>{" "}
            (There is no deity worthy of worship except Allah)
          </p>
          <p>
            As mentioned by al-Bukhārī — apparently taken from the entire
            chapter — because <em>lā ilāha illā Allāh</em> entails{" "}
            <HL>negation and affirmation</HL>.
          </p>
        </Card>

        {/* #11 Excellence of one free from shirk */}
        <Card className="border-emerald-200">
          <p className="font-semibold">
            Eleventh – The excellence of the one free from Shirk
          </p>
          <p>Based on His saying:</p>
          <Verse
            tone="indigo"
            arabic="وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَنْ يَشَاءُ"
          >
            “…but He forgives all else to whom He wills.” (An-Nisāʾ 4:116)
          </Verse>
          <p>
            And the Prophet’s statement,{" "}
            <em>
              “Whoever meets Allah not joining any partner with Him will enter
              the Paradise.”
            </em>
          </p>
        </Card>
      </Section>

      {/* Rulings of Riyāʾ — nullification logic */}
      <Section
        id="riyaa-rulings"
        tone="rose"
        title="When riyāʾ nullifies deeds"
        subtitle="Base-intention vs intrusive riyāʾ; ṣalāh vs wuḍūʾ vs charity."
      >
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>First:</strong> When it forms the <HL>basic reason</HL> for
            carrying out the act of worship — i.e., he stood up worshiping only
            to show off. The action of such is null and void, rejected to him
            based on the ḥadīth of Abū Hurayrah in the <em>Ṣaḥīḥ</em> from the
            Prophet ﷺ that Allah the Exalted said:{" "}
            <em>
              “I am the most undeserving to be joined in worship with partners.
              Whoever does an act and joins any other with Me in it, I will
              abandon him with his association.”
            </em>
          </li>
          <li>
            <strong>Second:</strong> When riyāʾ <HL>crosses</HL> the act of
            worship. Meaning that the worship is basically for Allah; riyāʾ
            suddenly comes into it. This is also in two sub-divisions:
            <ul className="mt-2 list-[circle] pl-6 space-y-1">
              <li>
                <strong>He repels it</strong> — then it will not affect him (he
                struggled against it).
              </li>
              <li>
                <strong>He goes along with it</strong> — the affected actions
                are nullified. For example, when he lengthens the
                standing/bowing/prostration or pretends to weep.
              </li>
            </ul>
          </li>
        </ul>

        <Card className="border-rose-200">
          <p className="font-semibold">Does it corrupt the whole act?</p>
          <p>
            It depends on whether the act is <strong>interdependent</strong> or{" "}
            <strong>separable</strong>:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>Ṣalāh</strong> is interdependent: if riyāʾ is indulged
              during it, it can <HL>void the whole</HL>.
            </li>
            <li>
              <strong>Charity</strong> sums separable givings: if he gave 50
              sincerely and later 50 by riyāʾ, the first is accepted, the second
              rejected.
            </li>
            <li>
              <strong>Wuḍūʾ</strong>: nuanced. If he repeats a washed limb due
              to riyāʾ, wuḍūʾ may still stand since repeating a limb does not
              inherently void it; unlike ṣalāh where adding a bowing/prostration
              invalidates.{" "}
              <em>
                “In essence, there is difference between the ablution and ṣalāh;
                thus, I will not sleep tonight until I have made further
                research about it — Allah willing.”
              </em>
            </li>
          </ul>
        </Card>
      </Section>
    </>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function FearOfShirkPage() {
  const [view, setView] = useState("read"); // 'read' | 'questions'
  const reduce = useReducedMotion();

  return (
    <main className="relative mx-auto max-w-7xl px-3 sm:px-6 pb-16">
      {/* Back link */}
      <div className="pt-6">
        <Link
          to="/aqeedah/books/kitab-at-tawhid"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Kitāb at-Tawḥīd
        </Link>
      </div>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.35 }}
        className="mt-6 rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 p-4 sm:p-6 ring-1 ring-black/5"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Fear of <span className="text-emerald-700">Shirk</span>
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-7 text-slate-700">
              After learning the excellence of <HL>tawḥīd</HL> and that the one
              who <HL>truly realizes it</HL> may enter{" "}
              <HL tone="sky">without reckoning</HL>, this chapter trains the
              heart to <HL tone="rose">fear shirk</HL> and protect{" "}
              <HL>ikhlāṣ</HL>.
            </p>
          </div>

          {/* Segmented view toggle */}
          <div className="rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <div className="grid grid-cols-2">
              {[
                { key: "read", label: "Read" },
                { key: "questions", label: "Questions" },
              ].map((tab) => {
                const active = view === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setView(tab.key)}
                    className={cx(
                      "px-4 py-2 text-sm font-semibold rounded-full transition",
                      active
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* READ vs QUESTIONS */}
      {view === "read" ? (
        <div className="mt-6 space-y-6">
          <main id="content" className="mx-auto max-w-7xl px-0 sm:px-6 pb-16">
            <section className="mt-6 space-y-6">
              <ContentPlaceholders_All />
            </section>
          </main>
        </div>
      ) : (
        <QuestionBank />
      )}
    </main>
  );
}
