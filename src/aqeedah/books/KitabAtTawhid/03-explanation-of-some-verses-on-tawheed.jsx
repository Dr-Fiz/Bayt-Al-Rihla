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
} from "lucide-react";

/* -------------------------------------------------------------------------
 * Kitāb at-Tawḥīd — Chapter 3: Explanation of Some Verses on Tawḥīd
 * Route: /aqeedah/books/kitab-at-tawhid/explanation-of-some-verses-on-tawheed
 * This file now contains:
 *  - Page shell + header + hero + view toggle
 *  - Question bank (10 Qs with reveal)
 *  - FULL CONTENT (Part 1): Verses 151–153, Linguistic Notes, Enjoinments,
 *    Straight Path (up to “paths of peace” and taqwā).
 * Next chunk will add: Ibn Masʿūd’s counsel, Ḥadīth of Muʿādh, 24 Important Matters.
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
const QUESTIONS = [
  {
    id: 1,
    prompt:
      "What does “ta‘ālaw” (قُلْ تَعَالَوْا) literally convey in the passage?",
    options: [
      "A neutral call with no nuance",
      "A call to rise/come up (from al-‘uluw), i.e., ‘come up to me’",
      "A command to sit and listen",
      "A call to depart and spread",
    ],
    answerIndex: 1,
    explanation:
      "Its etymology is from al-‘uluw (height). It’s as if the caller invites you to ascend: “come up to me.”",
  },
  {
    id: 2,
    prompt: "Why is “atlu” (أَتْلُ) in the jussive mood here?",
    options: [
      "Because it follows a conditional particle",
      "Because it responds to the imperative “ta‘ālaw”",
      "Because it is preceded by a negation",
      "Because it is a past-tense narrative",
    ],
    answerIndex: 1,
    explanation:
      "It is jussive in response to the imperative ta‘ālaw ('come').",
  },
  {
    id: 3,
    prompt:
      "In “أَلَّا تُشْرِكُوا بِهِ شَيْئًا”, the particle “an” (أَنْ) is used how?",
    options: [
      "Masdariyyah (infinitive), prohibiting ‘not associating’",
      "Explanatory, introducing the content to be recited (the prohibition of shirk)",
      "Causal, giving the reason",
      "Conditional, making the clause hypothetical",
    ],
    answerIndex: 1,
    explanation:
      "It’s explanatory (tafsīriyyah): “I will recite… that you do not associate [anything].” ‘Lā’ here is nugatory; the sentence carries a prohibitive sense.",
  },
  {
    id: 4,
    prompt:
      "Why does An‘ām mention 'We provide for you and for them' (parents first), whereas Isrāʾ mentions children first?",
    options: [
      "Random stylistic variation",
      "Because in An‘ām poverty already exists (min imlāq), so parents’ provision is mentioned first; in Isrāʾ it’s fear of poverty (khashyat al-imlāq).",
      "Because children are always less important",
      "Because An‘ām addresses only orphans",
    ],
    answerIndex: 1,
    explanation:
      "An‘ām treats actual poverty; Isrāʾ treats fear of poverty. Hence the order differs with the context.",
  },
  {
    id: 5,
    prompt:
      "What is the significance of the phrase “do not approach” (وَلَا تَقْرَبُوا) regarding foul deeds?",
    options: [
      "It is weaker than ‘do not commit’",
      "It forbids the act only",
      "It is more emphatic, forbidding the act and the means leading to it",
      "It applies only to private sins",
    ],
    answerIndex: 2,
    explanation:
      "‘Do not approach’ blocks the means: e.g., staring, seclusion, travel without maḥram.",
  },
  {
    id: 6,
    prompt:
      "Which souls are included in “the soul Allah has forbidden [to slay] except by right”, and what are examples of ‘by right’?",
    options: [
      "Only Muslim souls; right = any governmental order",
      "Muslim, protected non-Muslim, treaty-holder, and refugee; right = stoning married adulterer, qiṣāṣ, rebel/armed robber",
      "Any soul; right = personal vengeance",
      "Only combatants; right = imprisonment",
    ],
    answerIndex: 1,
    explanation:
      "Protected categories are listed; ‘by right’ includes specific Sharīʿah-approved cases.",
  },
  {
    id: 7,
    prompt:
      "How many enjoinments are in the first verse segment (An‘ām 151) as counted in the text?",
    options: ["Three", "Five", "Seven", "Ten"],
    answerIndex: 1,
    explanation:
      "Five: Tawḥīd; kindness to parents; do not kill children; avoid foul deeds; do not kill a soul except by right.",
  },
  {
    id: 8,
    prompt:
      "According to the commentary, the second cluster (continuation in 152) adds four ordinances. Which are they?",
    options: [
      "Jihād, zakāh, ṣawm, ḥajj",
      "Avoid backbiting, be patient, be generous, fast Mondays",
      "Do not approach orphan property except in the best way; give full measure and weight with equity; be just in speech; fulfill Allah’s covenant",
      "Shun music, wear simple clothes, avoid laughter, travel little",
    ],
    answerIndex: 2,
    explanation:
      "These four are explicitly spelled out in the passage and commentary.",
  },
  {
    id: 9,
    prompt:
      "What is the tenth ordinance emphasized in 153, and why is ‘paths’ plural elsewhere but Allah’s path singular?",
    options: [
      "To migrate; because all paths are many and equal",
      "To follow the Straight Path and avoid other ways; Allah’s path is one, deviant paths are many",
      "To debate; because plural is more eloquent",
      "To seclude; because plurality is disliked",
    ],
    answerIndex: 1,
    explanation:
      "“This is My Straight Path—follow it; do not follow other ways.” The saved path is one; deviant paths are numerous.",
  },
  {
    id: 10,
    prompt:
      "In the ḥadīth of Muʿādh, what are Allah’s right over servants and the servants’ right with Allah—and why was publicizing it initially discouraged?",
    options: [
      "Allah’s right: none; servants’ right: paradise; discouraged to keep it secret",
      "Allah’s right: zakāh only; servants’ right: no testing; discouraged to protect hypocrites",
      "Allah’s right: worship Him without shirk; servants’ right: He will not punish those who do not associate partners; discouraged to avoid people relying and becoming lax",
      "Allah’s right: obey leaders; servants’ right: wealth; discouraged due to scarcity",
    ],
    answerIndex: 2,
    explanation:
      "The Prophet ﷺ feared people might rely on the glad tidings and neglect duties.",
  },
  {
    id: "Q3-11",
    prompt:
      "In «قُلْ تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ», what does “taʿālَوْا” (come up!) linguistically derive from?",
    choices: [
      { key: "A", text: "al-khuḍūʿ (humility)" },
      { key: "B", text: "al-ʿulūw (rising/elevation)" },
      { key: "C", text: "al-bishārah (glad tidings)" },
      { key: "D", text: "al-istiwāʾ (settling)" },
    ],
    answer: "B",
    explanation:
      "‘Taʿālَوْا’ is from al-ʿulūw (to rise up), as if being called to a higher place.",
  },
  {
    id: "Q3-12",
    prompt:
      "“أَتْلُ” (I will recite) is in the jussive because it responds to which preceding form?",
    choices: [
      { key: "A", text: "A past verb" },
      { key: "B", text: "An interrogative hamzah" },
      { key: "C", text: "An imperative: «تَعَالَوْا»" },
      { key: "D", text: "A conditional particle" },
    ],
    answer: "C",
    explanation: "It is jussive as a response to the imperative ‘taʿālَوْا’.",
  },
  {
    id: "Q3-13",
    prompt:
      "Why is “رَبُّكُمْ” (your Lord) used instead of “اللَّهُ” in 6:151’s opening?",
    choices: [
      { key: "A", text: "To emphasise shared ethnicity" },
      {
        key: "B",
        text: "To stress Lordship, ownership and judgment over creation",
      },
      { key: "C", text: "Because ‘Allah’ is a Makki-only name" },
      { key: "D", text: "To avoid repetition found elsewhere" },
    ],
    answer: "B",
    explanation:
      "‘Rabb’ suits an address of commands/prohibitions—He owns, creates and commands.",
  },
  {
    id: "Q3-14",
    prompt:
      "In «أَلَّا تُشْرِكُوا», the particle “أَنْ” is best understood as…",
    choices: [
      { key: "A", text: "A pure infinitive marker (maṣdariyyah)" },
      {
        key: "B",
        text: "An explanatory particle (tafsīriyyah) clarifying what will be recited",
      },
      { key: "C", text: "A negation particle" },
      { key: "D", text: "A conditional particle" },
    ],
    answer: "B",
    explanation:
      "It explains the content being recited: the prohibition of shirk.",
  },
  {
    id: "Q3-15",
    prompt: "The “lā” in «أَلَّا تُشْرِكُوا» here is described as…",
    choices: [
      {
        key: "A",
        text: "Nugatory (zā’idah) in form; the overall sense is a command",
      },
      { key: "B", text: "Part of a conditional clause" },
      { key: "C", text: "A prohibitive ‘lā’ followed by jussive" },
      { key: "D", text: "Interrogative" },
    ],
    answer: "A",
    explanation:
      "Given ‘an’ is explanatory, the structure yields a commanding sense.",
  },
  {
    id: "Q3-16",
    prompt:
      "Which pairing correctly matches the reason-wording with provision-order?",
    choices: [
      {
        key: "A",
        text: "Al-Isrāʾ: «مِنْ إِمْلَاقٍ» → “We provide for you and them”",
      },
      {
        key: "B",
        text: "Al-Anʿām: «خَشْيَةَ إِمْلَاقٍ» → “We provide for them and you”",
      },
      {
        key: "C",
        text: "Al-Anʿām: «مِنْ إِمْلَاقٍ» → “We provide for you and for them”",
      },
      { key: "D", text: "Both sūrahs: identical order of provision" },
    ],
    answer: "C",
    explanation:
      "Here poverty already exists (min imlāq) → provision begins with parents; Isrāʾ has ‘fear of poverty’ → begins with children.",
  },
  {
    id: "Q3-17",
    prompt:
      "“Do not approach foul deeds” instead of “do not commit them” implies…",
    choices: [
      { key: "A", text: "Only major sins are meant" },
      {
        key: "B",
        text: "A stricter ban that also includes means leading to them",
      },
      { key: "C", text: "Merely a stylistic variation" },
      { key: "D", text: "It applies to rulers only" },
    ],
    answer: "B",
    explanation: "Prohibiting approach blocks the pathways leading to the sin.",
  },
  {
    id: "Q3-18",
    prompt:
      "Which is NOT cited as an interpretation of «مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ»?",
    choices: [
      { key: "A", text: "Manifest vs. hidden acts" },
      { key: "B", text: "Public acts vs. private acts" },
      { key: "C", text: "Extremely heinous vs. comparatively lesser" },
      { key: "D", text: "Sins of jinn vs. sins of humans" },
    ],
    answer: "D",
    explanation: "The three cited interpretations are (A), (B), and (C).",
  },
  {
    id: "Q3-19",
    prompt:
      "«وَلَا تَقْتُلُوا النَّفْسَ الَّتِي حَرَّمَ اللَّهُ إِلَّا بِالْحَقِّ» — here “al-ḥaqq” means:",
    choices: [
      { key: "A", text: "Whatever society accepts" },
      { key: "B", text: "What the Sharīʿah approves" },
      { key: "C", text: "Any state policy" },
      { key: "D", text: "Only battlefield rulings" },
    ],
    answer: "B",
    explanation: "Al-ḥaqq is what the Revelation authorises.",
  },
  {
    id: "Q3-20",
    prompt:
      "Which of the following is listed among cases where the Sharīʿah permits taking a life?",
    choices: [
      { key: "A", text: "Public insult" },
      { key: "B", text: "Disagreement with ruler" },
      { key: "C", text: "Adulterous muḥṣan being stoned" },
      { key: "D", text: "Failing to pay zakāh once" },
    ],
    answer: "C",
    explanation:
      "Also included: qiṣāṣ (retaliation), rebellion/armed robbery—per the text.",
  },
  {
    id: "Q3-21",
    prompt: "The prohibition of killing children appears in 6:151…",
    choices: [
      { key: "A", text: "Only implicitly inside a general verse" },
      {
        key: "B",
        text: "Twice: once specifically, and once within the general soul-prohibition",
      },
      { key: "C", text: "Only in Sūrat al-Isrāʾ" },
      { key: "D", text: "As a Meccan metaphor for poverty" },
    ],
    answer: "B",
    explanation:
      "It is mentioned specifically (children) and then covered by the general ‘do not kill the soul’.",
  },
  {
    id: "Q3-22",
    prompt:
      "In «ذَٰلِكُمْ وَصَّاكُمْ بِهِ لَعَلَّكُمْ تَعْقِلُونَ», “ʿaql” here means…",
    choices: [
      { key: "A", text: "Good disposition (rushd)" },
      { key: "B", text: "Memorisation only" },
      { key: "C", text: "Mathematical logic" },
      { key: "D", text: "Poetic eloquence" },
    ],
    answer: "A",
    explanation:
      "Here it means right-mindedness; in Zukhruf 3, it is used as ‘understanding’.",
  },
  {
    id: "Q3-23",
    prompt:
      "How many enjoinments are enumerated from the first verse (6:151) in the commentary?",
    choices: [
      { key: "A", text: "Three" },
      { key: "B", text: "Five" },
      { key: "C", text: "Seven" },
      { key: "D", text: "Ten" },
    ],
    answer: "B",
    explanation:
      "Five: Tawḥīd, kindness to parents, no killing of children, avoiding fawāḥish, and not killing the soul.",
  },
  {
    id: "Q3-24",
    prompt:
      "«وَلَا تَقْرَبُوا مَالَ الْيَتِيمِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ» obliges guardians to…",
    choices: [
      {
        key: "A",
        text: "Pursue whatever yields highest profit even with usury",
      },
      {
        key: "B",
        text: "Choose the Sharīʿah-preferred option even if materially less",
      },
      { key: "C", text: "Avoid any investment at all" },
      { key: "D", text: "Hand over wealth at any age" },
    ],
    answer: "B",
    explanation: "Religious superiority is prioritised over material gain.",
  },
  {
    id: "Q3-25",
    prompt: "“Until he reaches his maturity” refers to…",
    choices: [
      { key: "A", text: "Physical signs only" },
      { key: "B", text: "Intellectual aptitude only" },
      { key: "C", text: "Both physical and intellectual competence" },
      { key: "D", text: "Reaching 12 lunar years" },
    ],
    answer: "C",
    explanation:
      "Full bulūgh with sound judgement; signs include fifteen years, pubic hair, or ejaculation.",
  },
  {
    id: "Q3-26",
    prompt:
      "«وَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ بِالْقِسْطِ» followed by «لَا نُكَلِّفُ نَفْسًا إِلَّا وُسْعَهَا» indicates…",
    choices: [
      { key: "A", text: "Perfection is easy and mandatory" },
      { key: "B", text: "Excusable human shortfall after sincere effort" },
      { key: "C", text: "Weights matter but measures don’t" },
      { key: "D", text: "Only merchants are addressed" },
    ],
    answer: "B",
    explanation:
      "Effort is required, but beyond-capacity shortfalls are pardoned.",
  },
  {
    id: "Q3-27",
    prompt: "“When you speak, observe justice…” entails being fair…",
    choices: [
      { key: "A", text: "Only when speaking for oneself" },
      { key: "B", text: "Even against oneself and one’s relatives" },
      { key: "C", text: "Only in courtrooms" },
      { key: "D", text: "Only with oath-taking" },
    ],
    answer: "B",
    explanation:
      "Justice applies across contexts, even when the other party is a relative.",
  },
  {
    id: "Q3-28",
    prompt: "“Fulfil the covenant of Allah” in the verse primarily means…",
    choices: [
      { key: "A", text: "Tribal customs" },
      { key: "B", text: "Worldly contracts only" },
      { key: "C", text: "His worship and obedience to His commands" },
      { key: "D", text: "Pledges made to friends" },
    ],
    answer: "C",
    explanation: "It refers to Allah’s right—worship and obedience.",
  },
  {
    id: "Q3-29",
    prompt: "“This is My Straight Path—follow it” may refer to…",
    choices: [
      { key: "A", text: "Only previous prophets’ legislations" },
      {
        key: "B",
        text: "The preceding ordinances and, more broadly, the religion the Messenger brought",
      },
      { key: "C", text: "A variety of equal paths" },
      { key: "D", text: "A purely mystical experience" },
    ],
    answer: "B",
    explanation:
      "It can point to what just preceded and to the full revealed way to Allah.",
  },
  {
    id: "Q3-30",
    prompt:
      "Why is Allah’s path singular while other paths are plural in the verses?",
    choices: [
      { key: "A", text: "Rhetorical flourish only" },
      { key: "B", text: "Because Allah’s way is one, deviant ways are many" },
      { key: "C", text: "Because Arabic forbids plural for Allah" },
      { key: "D", text: "Because Medinan style is singular" },
    ],
    answer: "B",
    explanation: "The saved path is one; the deviating subul are many.",
  },
  {
    id: "Q3-31",
    prompt:
      "«فَتَفَرَّقَ بِكُمْ عَنْ سَبِيلِهِ»: grammatically, «تَفَرَّقَ» is analysed as…",
    choices: [
      {
        key: "A",
        text: "Present in the accusative after an implied ‘an’, with an omitted tāʾ (tatafarraqa → tafarraqa)",
      },
      { key: "B", text: "Past indicative" },
      { key: "C", text: "Imperative plural" },
      { key: "D", text: "Passive participle" },
    ],
    answer: "A",
    explanation:
      "It’s the present (maḍāriʿ) with elided tāʾ due to the construction.",
  },
  {
    id: "Q3-32",
    prompt:
      "How is “سُبُلَ السَّلَامِ” (5:16) not contradictory to the singular ‘path’?",
    choices: [
      { key: "A", text: "It actually is contradictory" },
      {
        key: "B",
        text: "Because ‘paths of peace’ refers to salvific rulings within the one religion",
      },
      { key: "C", text: "Because one is Makki, the other Madani" },
      { key: "D", text: "Because plural in Arabic always means ‘two’" },
    ],
    answer: "B",
    explanation: "They are avenues within the same straight path that save.",
  },
  {
    id: "Q3-33",
    prompt: "Ibn Masʿūd likened 6:151–153 to the Prophet’s ‘counsel’ because…",
    choices: [
      {
        key: "A",
        text: "They function like a comprehensive will for the Ummah",
      },
      { key: "B", text: "They were a written, signed document" },
      { key: "C", text: "They mention tribal lineages" },
      { key: "D", text: "They abrogate the rest of the Qurʾān" },
    ],
    answer: "A",
    explanation:
      "They encompass foundational guidance as if an endorsed counsel.",
  },
  {
    id: "Q3-34",
    prompt: "In the ḥadīth of Muʿādh, “kataba ʿalā nafsihi ar-raḥmah” means…",
    choices: [
      {
        key: "A",
        text: "Allah promised mercy to Himself obligatorily (awjaba)",
      },
      { key: "B", text: "People obliged Allah" },
      { key: "C", text: "Only angels are shown mercy" },
      { key: "D", text: "It refers to worldly contracts" },
    ],
    answer: "A",
    explanation: "It’s a divine favour Allah ordained upon Himself.",
  },
  {
    id: "Q3-35",
    prompt: "“Allah and His Messenger know best” is acceptable…",
    choices: [
      { key: "A", text: "In Sharʿī questions the Prophet clarified" },
      { key: "B", text: "For mundane unknowns like weather predictions" },
      { key: "C", text: "As a formula replacing study" },
      { key: "D", text: "Only before Hijrah" },
    ],
    answer: "A",
    explanation:
      "The Companions used it in matters of religion explained by the Prophet ﷺ.",
  },
  {
    id: "Q3-36",
    prompt:
      "Why did the Prophet ﷺ tell Muʿādh not to publicly announce the glad tidings?",
    choices: [
      { key: "A", text: "Because it was abrogated" },
      { key: "B", text: "To prevent people from relying and becoming lax" },
      { key: "C", text: "Because Muʿādh misheard" },
      { key: "D", text: "Because Quraysh objected" },
    ],
    answer: "B",
    explanation:
      "Fear of reliance without action; true tawḥīd necessitates leaving sins.",
  },
  {
    id: "Q3-37",
    prompt: "The text links sins to…",
    choices: [
      { key: "A", text: "Genetics only" },
      { key: "B", text: "Following desire, which is an aspect of shirk" },
      { key: "C", text: "Unavoidable fate with no accountability" },
      { key: "D", text: "Language mistakes" },
    ],
    answer: "B",
    explanation: "Cited: «أَفَرَأَيْتَ مَنِ اتَّخَذَ إِلَهَهُ هَوَاهُ».",
  },
  {
    id: "Q3-38",
    prompt:
      "True/False: One may issue blanket takfīr on anyone who performs an act of shirk without establishing proof.",
    choices: [
      { key: "A", text: "True" },
      { key: "B", text: "False" },
      { key: "C", text: "True if in public" },
      { key: "D", text: "True if illiterate" },
    ],
    answer: "B",
    explanation:
      "Judgments require conditions and absence of impediments (e.g., ignorance, ambiguity).",
  },
  {
    id: "Q3-39",
    prompt: "“Ṭāghūt” best encompasses…",
    choices: [
      { key: "A", text: "Only idols made of stone" },
      {
        key: "B",
        text: "Anything by which a servant exceeds bounds—deity, leader, or obeyed figure",
      },
      { key: "C", text: "Only tyrant rulers" },
      { key: "D", text: "Only soothsayers" },
    ],
    answer: "B",
    explanation: "As defined (per Ibn al-Qayyim), it’s comprehensive.",
  },
  {
    id: "Q3-40",
    prompt:
      "Which pair highlights the Prophet’s ﷺ humility as noted in the commentary?",
    choices: [
      { key: "A", text: "Riding a camel alone; forbidding others to ride" },
      { key: "B", text: "Riding a donkey and letting Muʿādh ride behind him" },
      { key: "C", text: "Refusing to ride mounts altogether" },
      { key: "D", text: "Travelling only in litters" },
    ],
    answer: "B",
    explanation: "He rode a simple mount and shared it—utmost modesty.",
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
            Answer each question, then reveal the correct answer and its
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
export default function Chapter03_ExplanationOfVerses() {
  const reduce = useReducedMotion();
  const [view, setView] = useState("content"); // 'content' | 'bank'

  const nav = useMemo(
    () => [
      { id: "verses", label: "The Verses (151–153)", tone: "emerald" },
      { id: "language-notes", label: "Linguistic Notes", tone: "indigo" },
      { id: "prohibitions-enjoinments", label: "Enjoinments", tone: "amber" },
      { id: "straight-path", label: "The Straight Path", tone: "sky" },
      { id: "ibn-masud", label: "Ibn Masʿūd’s Counsel", tone: "rose" },
      { id: "muadh", label: "Ḥadīth of Muʿādh", tone: "emerald" },
      { id: "important-matters", label: "Important Matters", tone: "indigo" },
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

      {/* ---------------- Hero + Mode Toggle (no extra button) ---------------- */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-white/60 bg-white/70 p-6 sm:p-8 shadow-sm backdrop-blur"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
                Explanation of Some Verses on Tawḥīd
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Al-Anʿām 151–153 • learner-friendly, colourful commentary
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="emerald">
                  <BookOpen className="h-3.5 w-3.5" /> Verses 151–153
                </Pill>
                <Pill tone="indigo">
                  <ScrollText className="h-3.5 w-3.5" /> Language Notes
                </Pill>
                <Pill tone="amber">Ten Ordinances</Pill>
              </div>
            </div>

            {/* Read / Questions toggle only */}
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
                  aria-label="Read content"
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
                  aria-label="Open question bank"
                >
                  Questions
                </button>
              </div>
            </div>
          </div>

          {/* Compact quick-nav chips (non-sticky) */}
          {view === "content" && (
            <div className="mt-4 flex flex-wrap gap-2">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() =>
                    document
                      .getElementById(n.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
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

      {/* Content (Part 1 fully populated) */}
      {view === "content" && (
        <main id="content" className="mx-auto max-w-7xl px-6 pb-16">
          <section className="mt-6 space-y-6">
            {/* VERSES */}
            <Section
              id="verses"
              title="The Verses"
              tone="emerald"
              subtitle="Al-Anʿām 151–153 (Arabic & translation)"
            >
              <Verse
                tone="emerald"
                arabic="قُلْ تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ أَلَّا تُشْرِكُوا بِهِ شَيْئًا وَبِالْوَالِدَيْنِ إِحْسَانًا وَلَا تَقْتُلُوا أَوْلَادَكُم مِّنْ إِمْلَاقٍ نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ وَلَا تَقْرَبُوا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ وَلَا تَقْتُلُوا النَّفْسَ الَّتِي حَرَّمَ اللَّهُ إِلَّا بِالْحَقِّ ذَلِكُمْ وَصَّاكُم بِهِ لَعَلَّكُمْ تَعْقِلُونَ (١٥١)"
              >
                “Say, ‘Come! I will recite to you what your Lord has forbidden,
                that you associate naught as partner with Him; and that you do
                good to your parents, and that you slay not your children out of
                poverty – it is We who provide for you and for them – and that
                you approach not foul deeds, whether open or secret; and that
                you slay not the soul the slaying of which Allah has forbidden,
                save in accordance with the demands of justice. That is what He
                has enjoined upon you, that you may understand.’”
              </Verse>

              <Verse
                tone="emerald"
                arabic="وَلَا تَقْرَبُوا مَالَ الْيَتِيمِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ حَتَّىٰ يَبْلُغَ أَشُدَّهُ وَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ بِالْقِسْطِ لَا نُكَلِّفُ نَفْسًا إِلَّا وُسْعَهَا وَإِذَا قُلْتُمْ فَاعْدِلُوا وَلَوْ كَانَ ذَا قُرْبَىٰ وَبِعَهْدِ اللَّهِ أَوْفُوا ذَٰلِكُمْ وَصَّاكُم بِهِ لَعَلَّكُمْ تَذَكَّرُونَ (١٥٢)"
              >
                “In addition, approach not the property of the orphan, except in
                a way which is best, till he attains his maturity. And give full
                measure and weigh with equity. We charge not any soul except
                according to its capacity. And when you speak, observe justice,
                even if the person concerned be a relative, and fulfil the
                covenant of Allah. That is what He enjoins upon you, that you
                may take care.”
              </Verse>

              <Verse
                tone="emerald"
                arabic="وَأَنَّ هَـٰذَا صِرَاطِي مُسْتَقِيمًا فَاتَّبِعُوهُ وَلَا تَتَّبِعُوا السُّبُلَ فَتَفَرَّقَ بِكُمْ عَن سَبِيلِهِ ذَٰلِكُمْ وَصَّاكُم بِهِ لَعَلَّكُمْ تَتَّقُونَ (١٥٣)"
              >
                “And say, ‘This is My Straight Path. So follow it; and follow
                not other ways, lest they lead you away from His way. That is
                what He enjoins upon you, that you may be able to guard against
                evils.’”
              </Verse>
            </Section>

            {/* LINGUISTIC & RHETORICAL NOTES */}
            <Section
              id="language-notes"
              title="Linguistic & Rhetorical Notes"
              tone="indigo"
              subtitle="Key expressions and grammar embedded in the verses"
            >
              <p>
                The address is to the Prophet ﷺ. Allah ordered him to tell the
                people: <HL tone="indigo">taʿālaw</HL> — “look here and come!”.
                Its etymology is from <HL tone="indigo">al-ʿuluw</HL> (to rise
                up to a height), as if the caller invites you to climb up to his
                place: “come up to me.”
              </p>
              <p>
                <HL tone="indigo">atlu</HL> (may I recite) is in the jussive
                mood in response to the imperative{" "}
                <HL tone="indigo">taʿālaw</HL> (come).
              </p>
              <p>
                <HL tone="indigo">“what your Lord has forbidden”</HL>: the
                particle <em>mā</em> (what) is a relative pronoun, object to{" "}
                <em>atlu</em> with an omitted pronoun; meaning:{" "}
                <em>mā ḥarramahu rabbukum ʿalaykum</em> (that which your Lord
                has forbidden you). He said, <HL tone="indigo">“your Lord”</HL>{" "}
                — not “Allah” — because the title “Lord” (Rabb) best fits this
                context: the Lord has absolute control over the creatures; His
                ruling over them accords with His wisdom.
              </p>
              <p>
                <HL tone="indigo">
                  “that you associate naught (an lā tushrikū)”
                </HL>
                : here <em>an</em> is explanatory (tafsīriyyah), introducing the
                content to be recited: namely, the prohibition of shirk. It is
                not infinitive in meaning. The <em>lā</em> is nugatory in form
                but the sentence carries a prohibitive sense.
              </p>
              <p>
                <HL tone="indigo">“and that you do good to parents”</HL>: i.e.,
                this is among the matters being recited — the order to be kind
                to parents.
              </p>
              <p>
                <HL tone="indigo">“and that you slay not your children”</HL>:
                after stating the rights of ancestors, He stated the rights of
                progeny. The word <em>al-awlād</em> includes both males and
                females — cf. “Allah commands you concerning your children; a
                male shall have as much as the share of two females” (Nisāʾ 11).
              </p>
              <p>
                <HL tone="indigo">min imlāq</HL> means “out of poverty”; the
                particle <em>min</em> expresses cause. Then:
                <HL tone="indigo">“We provide for you and for them”</HL> — here
                He begins with the provision of the parents; whereas in Isrāʾ He
                begins with the children. The wisdom: here poverty already
                exists (<em>min imlāq</em>), so parents are encountering it; in
                Isrāʾ it is fear (<em>khashyat al-imlāq</em>), so He mentions
                children first.
              </p>
              <p>
                Restricting the prohibition of killing children to the reason of
                fear for poverty is based on the common practice of the
                idolaters; therefore, inference (beyond that) cannot be drawn
                from it.
              </p>
              <p>
                <HL tone="indigo">“and that you approach not foul deeds”</HL>:
                He did not say “do not engage in…”, because forbidding approach
                is more emphatic, also prohibiting the means that lead to it.
                Thus, it is forbidden to stare at a strange woman, stay in
                seclusion with her, or for her to travel without a maḥram — for
                these lead to foul deeds.
              </p>
              <p>
                <HL tone="indigo">“whether open or secret”</HL>: said to mean
                manifest or hidden foul deeds; or what you show and what you
                conceal (open zina vs secret); or the gravest of major sins vs
                relatively lesser ones. The ḥadīth says: “Should I not inform
                you of the most grievous major sins?” (1) — indicating grades of
                severity.
              </p>
              <p>
                <HL tone="indigo">
                  “and that you slay not the soul… except by right”
                </HL>
                : the protected soul includes the Muslim, the non-Muslim under
                Muslim rule, the treaty-holder, and the refugee.{" "}
                <HL tone="indigo">al-ḥaqq</HL> is what the Sharīʿah approves;{" "}
                <em>al-bāṭil</em> is what it disapproves. Examples of “by
                right”: stoning the married adulterer, <em>qiṣāṣ</em>{" "}
                (retaliation), killing the rebel or armed robber. The Prophet ﷺ
                said:{" "}
                <em>
                  “It is not allowed to kill a Muslim except for one of three
                  reasons: revenge for murder, the adulterer, and the one who
                  turns apostate; a rebel against the group.”
                </em>
              </p>
              <p>
                Note the repetition: the prohibition of slaying children appears
                specifically, then again within the general prohibition of
                slaying the protected soul.
              </p>
              <p>
                <HL tone="indigo">“That is what He has enjoined upon you”</HL>:
                i.e., He has earnestly counselled you to hold to these matters.
                <HL tone="indigo">“that you may understand”</HL>: here{" "}
                <em>ʿaql</em> means good disposition. Elsewhere (Zukhruf 3) it
                means understanding: “We have made it a Book to be oft read in
                clear, eloquent language that you may understand.” Whoever
                adheres to these matters is sensible and guided; whoever
                contradicts them is a fool.
              </p>
              <Card className="border-indigo-200/70">
                <p className="font-semibold text-slate-900">
                  First cluster (Anʿām 151): Five enjoinments
                </p>
                <ul className="mt-2 list-inside space-y-1 text-slate-800">
                  <li>
                    • <HL tone="emerald">Oneness of Allah (Tawḥīd)</HL>
                  </li>
                  <li>• Being kind to parents</li>
                  <li>• Do not kill your children</li>
                  <li>• Do not approach foul deeds (open or secret)</li>
                  <li>
                    • Do not kill a soul which Allah has forbidden, except by
                    right
                  </li>
                </ul>
              </Card>
            </Section>

            {/* ENJOINMENTS & ORDINANCES */}
            <Section
              id="prohibitions-enjoinments"
              title="Further Enjoinments & Ordinances"
              tone="amber"
              subtitle="Guardian ethics, commercial justice, truthful speech, and covenants"
            >
              <p>
                <HL>
                  “And approach not the property of the orphan, except in a way
                  which is best”
                </HL>
                : This secures the wealth of the orphan so it is not approached
                except by the best manner. If two options exist, the guardian
                must choose the more beneficial. “Best” may be material or
                religious. If the more profitable route involves usury and a
                lesser profit is usury-free, the latter is{" "}
                <HL>better by Sharīʿah</HL> and must be chosen.
              </p>
              <p>
                <HL>“till he attains his maturity”</HL>: <em>ḥattā</em>{" "}
                expresses limit. When he reaches maturity, the property is
                handed over after examining his aptitude and character. Maturity
                here is physical and intellectual competence. Typical legal
                signs (for males): reaching fifteen, growth of pubic hair, or
                ejaculation. The address is to guardians of orphans (and, as
                some scholars say, to the state).
              </p>
              <p>
                <HL>“And give full measure and weigh with equity”</HL>: be fair
                in measures and weights — and, by extension, in all dealings.
                Because strict exactness can be hard, Allah follows with:{" "}
                <HL tone="emerald">
                  “We charge not any soul except according to its capacity.”
                </HL>
                After one tries his best, any minor shortfall is excused; the
                phrase also indicates pardon regarding things.
              </p>
              <p>
                <HL>“And when you speak, observe justice”</HL> — whether against
                yourself for others, for yourself against others, or between two
                parties. Justice (<em>ʿadl</em>) is uprightness; its opposite is
                injustice and bias. Hence:{" "}
                <HL>“even if the person concerned be a relative”</HL> — do not
                favour him due to kinship. Do it for Allah; you will soon return
                to Him to answer for this trust.
              </p>
              <Callout tone="amber">
                The noblest of creation, Muḥammad ﷺ, said under oath:
                <em>
                  “By Allah! If Fāṭimah, the daughter of Muḥammad, were to have
                  stolen; I would certainly cut off her hand.”
                </em>
              </Callout>
              <p>
                <HL>“and fulfill the covenant of Allah”</HL>: the object is
                fronted for emphasis. “The covenant of Allah” means what He
                enjoins: His worship and obedience. Allah said regarding Banī
                Isrāʾīl (Māʾidah 12): He took their covenant — establish prayer,
                give zakāh, believe in His messengers, honour and assist them,
                and give a goodly loan — then,{" "}
                <HL tone="emerald">
                  “I will remit your sins and admit you to Gardens…”
                </HL>
                This is the covenant from the creature’s side; the latter is
                from Allah’s side.
              </p>
              <Card className="border-amber-300">
                <p className="font-semibold text-slate-900">
                  Second cluster (Anʿām 152): Four ordinances
                </p>
                <ul className="mt-2 list-inside space-y-1 text-slate-800">
                  <li>
                    • Do not approach orphan property except in the best way
                  </li>
                  <li>• Give full measure and weight with equity</li>
                  <li>• Be just in speech</li>
                  <li>• Fulfill Allah’s covenant</li>
                </ul>
              </Card>
            </Section>

            {/* THE STRAIGHT PATH */}
            <Section
              id="straight-path"
              title="“This is My Straight Path”"
              tone="sky"
              subtitle="Follow the one straight way; avoid the many deviating ways"
            >
              <p>
                The tenth ordinance (Anʿām 153):{" "}
                <HL tone="sky">
                  “This is My Straight Path — follow it; do not follow other
                  ways…”
                </HL>
                “This” may refer to the foregoing enjoinments (which encompass
                the Sharīʿah) or, more generally, to the whole religion the
                Messenger ﷺ brought. The path is linked to Allah (as its
                Legislator and Goal) and to its followers (as those walking it).
              </p>
              <p>
                <HL tone="sky">“Straight”</HL> describes the path: upright,
                without crookedness — thus, follow it.
                <HL tone="sky">“Other ways (subul)”</HL> are deviant paths.
                Grammatically, <em>tafarraqa</em> is in the subjunctive due to
                the causal <em>an</em> after <em>fa</em>; the assimilated{" "}
                <em>tāʾ</em> explains the form (originally <em>tatafarraqa</em>
                ). Following those ways divides and leads one away from His
                path.
              </p>
              <p>
                Allah’s path is singular — <HL>“His path”</HL> — while deviant
                paths are many: hence the plural <em>subul</em>. The Prophet ﷺ
                said:{" "}
                <em>
                  “This Ummah shall split into seventy-three sects; all in Hell
                  except one.”
                </em>{" "}
                (1) So the saved path is one; the rest are deviant.
              </p>
              <p>
                This does not clash with:{" "}
                <HL>
                  “Thereby does Allah guide those who seek His pleasure on the
                  paths of peace”
                </HL>{" "}
                (Māʾidah 16), because there the plural “paths” is annexed to
                “peace,” indicating the rulings of Islam that all lead to
                salvation — while Allah’s single straight path is the singular
                way of truth.
              </p>
              <p>
                <HL tone="emerald">
                  “That is what He enjoins upon you, that you may be able to
                  guard against evils.”
                </HL>
              </p>
            </Section>

            {/* PLACEHOLDERS for next chunk */}
            {/* -------------------- REPLACE: Ibn Masʿūd’s Counsel section -------------------- */}
            <Section
              id="ibn-masud"
              title="Ibn Masʿūd’s Counsel"
              tone="rose"
              subtitle="Why these verses read like the Prophet’s encompassing ‘counsel’"
            >
              <Card className="border-rose-200/70">
                <p className="font-semibold text-slate-900">Statement</p>
                <p className="mt-2 leading-7 text-slate-800">
                  Ibn Masʿūd said:{" "}
                  <em>
                    “Whoever desires to see the counsel of Muḥammad ﷺ upon which
                    his seal had settled should read His saying the Exalted:
                    <span className="whitespace-pre"> </span>
                    <span dir="rtl" className="font-semibold">
                      قُلْ تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ
                      أَلَّا تُشْرِكُوا بِهِ شَيْئًا … وَأَنَّ هَذَا صِرَاطِي
                      مُسْتَقِيمًا فَاتَّبِعُوهُ وَلَا تَتَّبِعُوا السُّبُلَ…
                    </span>
                    (Al-Anʿām 151–153).”
                  </em>
                </p>
              </Card>

              <p>
                <HL tone="rose">Commentary:</HL> The interrogation in his phrase
                conveys <em>persuasion and motivation</em>, and the letter
                <em> lām</em> in <em>fal-yaqra</em> (let him read) expresses
                counselling.
              </p>
              <p>
                <HL tone="rose">“Counsel” (al-waṣiyyah)</HL> means advice—called
                a counsel when it concerns a matter of great importance.
              </p>
              <p>
                His wording <HL tone="rose">“Muḥammad ﷺ”</HL> shows it is
                permissible to say, “Muḥammad, the Messenger of Allah ﷺ said…”
                or “the counsel of Muḥammad ﷺ,” and it does not contradict:
              </p>
              <p dir="rtl" className="text-slate-900">
                لَا تَجْعَلُوا دُعَاءَ الرَّسُولِ بَيْنَكُمْ كَدُعَاءِ بَعْضِكُم
                بَعْضًا (النور: ٦٣)
              </p>
              <p className="text-sm">
                because that verse is about <em>addressing</em> him in
                conversation (do not say “O Muḥammad!”; say “O Messenger of
                Allah!”), whereas here it is <em>narration</em>, which is
                broader than address.
              </p>

              <p>
                His phrase <HL tone="rose">“upon which is his seal”</HL> means
                endorsement. This was not a <em>written</em> and signed will;
                the Prophet ﷺ left no such document. Evidence: Abū Juhayfah
                asked ʿAlī (raḍiyallāhu ʿanhu), “Did the Prophet ﷺ will anything
                to you?” He replied, “No, by the One Who splits the seed and
                creates the souls—except an understanding of the Qurʾān which
                Allah gives a man, and the contents of this sheet.” They asked,
                “What is in it?” He said: “Blood-money, freeing of slaves, and
                that a Muslim is not killed for a kāfir.” (1)
              </p>
              <p>
                So Ibn Masʿūd (raḍiyallāhu ʿanhu) only considered these verses
                to <HL tone="rose">encompass the whole religion</HL>—as if they
                were the Prophet’s ﷺ counsel endorsed for his Ummah. Whoever
                ponders and acts upon them gains three complete qualities:
                <HL tone="rose">understanding</HL>,{" "}
                <HL tone="rose">reminder</HL>, and <HL tone="rose">piety</HL>.
              </p>
              <p className="text-sm text-slate-700">
                His saying “let him read the saying of Allah…” to the end has
                already been explained in the preceding sections.
              </p>
            </Section>

            {/* ----------------------- REPLACE: Ḥadīth of Muʿādh section ---------------------- */}
            <Section
              id="muadh"
              title="Ḥadīth of Muʿādh ibn Jabal (raḍiyallāhu ʿanhu)"
              tone="emerald"
              subtitle="Allah’s right over the servants; the servants’ right with Allah"
            >
              <Card className="border-emerald-200/70">
                <p className="font-semibold text-slate-900">
                  Text of the ḥadīth
                </p>
                <p className="mt-2 leading-7">
                  Muʿādh ibn Jabal (raḍiyallāhu ʿanhu) said:
                  <em>
                    “I was riding behind the Prophet ﷺ on a donkey when he said
                    to me: ‘O Muʿādh! Do you know the right of Allah over the
                    servants and the right of the servants with Allah?’ I said:
                    ‘Allah and His Messenger know best.’ He said: ‘The right of
                    Allah over the servants is that they should worship Him and
                    not associate any partner with Him; and the right of the
                    servants with Allah is that He will not punish anyone who
                    does not associate any partner with Him in worship.’ I said:
                    ‘O Messenger of Allah! Shall I not give the glad tidings to
                    the people?’ He said: ‘Do not give them the glad tidings so
                    that they do not relax.’”
                  </em>
                  They both recorded it in their <em>Ṣaḥīḥs</em>. (1)
                </p>
              </Card>

              <p>
                <HL>radeef</HL> = the one riding behind (<em>rādif</em>). He was
                riding behind him ﷺ. The mount was a<HL>domestic donkey</HL>.{" "}
                <HL>atadrī</HL> means “do you know?”
              </p>
              <p>
                The Prophet ﷺ framed it as a question so it{" "}
                <HL>imprints deeper</HL> in Muʿādh’s mind.
              </p>
              <p>
                <HL>“The rights of the servants with Allah”</HL> are not
                something they imposed upon Him; rather
                <HL tone="emerald">He Himself ordained them</HL> out of favour:
              </p>
              <p dir="rtl" className="text-slate-900">
                كَتَبَ رَبُّكُمْ عَلَىٰ نَفْسِهِ الرَّحْمَةَ...
              </p>
              <p className="text-sm">
                “Your Lord has taken it upon Himself to show mercy…” (Al-Anʿām
                54). The word <em>kataba</em> means <em>awjaba</em> (He made it
                compulsory).
              </p>

              <p>
                Muʿādh’s reply, <HL>“Allah and His Messenger know best”</HL>:
                grammatically the predicate is singular although referring to
                two, because the particle “min” (for comparison) is omitted; the
                sense is: “they both know better than anyone else (and better
                than me).”
              </p>
              <p>
                <HL>“…worship Him and do not associate anything with Him.”</HL>{" "}
                The word <em>shayʾan</em> (anything) is indefinite in a context
                of negation, thus <HL>absolutely general</HL>: not a Messenger,
                nor an angel, nor a saint—none is associated with Him in
                worship.
              </p>
              <p>
                Regarding{" "}
                <HL>
                  “He will not punish anyone who does not associate any partner
                  with Him”
                </HL>
                : the complete meaning—understood from context—is
                <em>
                  “whoever worships Him and does not associate anything with
                  Him.”
                </em>{" "}
                Otherwise it would contradict the first clause about worship.
              </p>

              <Card className="border-emerald-300">
                <p className="font-semibold text-slate-900">
                  “Shall I not give the glad tidings to the people?” — syntactic
                  notes
                </p>
                <ul className="mt-2 list-inside space-y-1">
                  <li>
                    • View 1: there is an omission after the hamzah. Full sense:
                    “<em>Shall I keep silent and not give</em> the glad
                    tidings…?”
                  </li>
                  <li>
                    • View 2: no omission but <em>taqdīm/taʾkhīr</em>{" "}
                    (re-ordering): the position of <em>fa</em> precedes the
                    hamzah in meaning— “<em>So</em>, shall I not give the glad
                    tidings…?”
                  </li>
                </ul>
                <p className="mt-2 text-sm">
                  The hamzah often precedes conjunctions: e.g.,{" "}
                  <span dir="rtl">أَفَلَا يَنظُرُونَ</span> (Ghāshiyah 17),
                  <span dir="rtl">أَفَلَا يُبْصِرُونَ</span> (Sajdah 27),{" "}
                  <span dir="rtl">أَفَلَمْ يَسِيرُوا</span> (Ḥajj 46).
                </p>
              </Card>

              <p>
                <HL>al-bishārah</HL> typically means announcing pleasant things,
                though it can be used for painful tidings:
              </p>
              <p dir="rtl" className="text-slate-900">
                فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ (الإنشقاق: ٢٤)
              </p>

              <p>
                The meaning of the ḥadīth:{" "}
                <HL>Allah will not punish whoever does not commit shirk</HL>,
                and sins are forgiven when Tawḥīd is firmly established. He ﷺ
                forbade publicizing it lest people rely on it and become lax,
                for
                <HL>true Tawḥīd necessitates leaving sins</HL>. Sins spring from
                following desire, an aspect of shirk:
              </p>
              <p dir="rtl" className="text-slate-900">
                أَفَرَأَيْتَ مَنِ اتَّخَذَ إِلَٰهَهُ هَوَاهُ (الجاثية: ٢٣)
              </p>
              <p className="text-sm italic">
                Relevance to chapter title: the <HL>Tawḥīd’s primacy</HL> and
                that it is a cause of salvation from punishment.
              </p>
            </Section>

            {/* ------------------- REPLACE: Important Matters (24 Points) ------------------- */}
            <Section
              id="important-matters"
              title="Important Matters — 24 Points"
              tone="indigo"
              subtitle="Extracted benefits with proofs and notes"
            >
              <Card className="border-indigo-200/70">
                <p className="font-semibold text-slate-900">
                  Concise List (1–24)
                </p>
                <ol className="mt-2 list-decimal list-inside space-y-1 leading-7">
                  <li>The wisdom behind the creation of men and the jinns.</li>
                  <li>
                    That worship is Tawḥīd because the disagreement is regarding
                    it.
                  </li>
                  <li>
                    That whoever does not do it has not worshipped Allah —
                    implied by:{" "}
                    <span dir="rtl" className="font-semibold">
                      وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ
                    </span>{" "}
                    (Kāfirūn 3).
                  </li>
                  <li>The wisdom behind sending the prophets.</li>
                  <li>That the message reached every nation.</li>
                  <li>That the religion of the prophets is one.</li>
                  <li>
                    The great issue: worshipping Allah cannot be attained except
                    by <HL>disbelieving in ṭāghūt</HL>.
                  </li>
                  <li>
                    Proof:{" "}
                    <span dir="rtl" className="font-semibold">
                      فَمَنْ يَكْفُرْ بِالطَّاغُوتِ وَيُؤْمِنْ بِاللَّهِ فَقَدِ
                      اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَى
                    </span>{" "}
                    (Baqarah 256).
                  </li>
                  <li>
                    “Ṭāghūt” encompasses{" "}
                    <HL>everything worshipped besides Allah</HL>.
                  </li>
                  <li>
                    The significance of the three decisive verses (muḥkamāt) in
                    Anʿām—ten matters, beginning with prohibition of shirk.
                  </li>
                  <li>
                    The decisive verses in Isrāʾ contain eight matters; they
                    begin with{" "}
                    <span dir="rtl" className="font-semibold">
                      لَا تَجْعَلْ مَعَ اللَّهِ إِلَهًا آخَرَ فَتَقْعُدَ
                      مَذْمُومًا مَخْذُولًا
                    </span>{" "}
                    (Isrāʾ 22) and end with{" "}
                    <span dir="rtl" className="font-semibold">
                      ذَٰلِكَ مِمَّا أَوْحَىٰ إِلَيْكَ رَبُّكَ مِنَ الْحِكْمَةِ
                    </span>{" "}
                    (Isrāʾ 39).
                  </li>
                  <li>
                    The verses of Nisāʾ called the “ten rights” begin with{" "}
                    <span dir="rtl" className="font-semibold">
                      وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا
                    </span>{" "}
                    (Nisāʾ 36). Noting the Prophet’s counsel before his death.
                  </li>
                  <li>Knowing Allah’s right over us.</li>
                  <li>
                    Recognizing the servants’ right with Allah when they fulfil
                    His right.
                  </li>
                  <li>
                    That this matter was unknown to many companions initially.
                  </li>
                  <li>
                    Permissibility of concealing knowledge due to overriding
                    benefit.
                  </li>
                  <li>
                    Desirability of giving pleasing good news to a Muslim.
                  </li>
                  <li>Fear of relying on the vastness of Allah’s mercy.</li>
                  <li>
                    Saying, “Allah and His Messenger know best” when one does
                    not know.
                  </li>
                  <li>
                    Permissibility of teaching select people and not others.
                  </li>
                  <li>
                    His humility: riding a donkey and letting another ride with
                    him.
                  </li>
                  <li>
                    Permissibility of two riding the same animal when it won’t
                    burden it.
                  </li>
                  <li>The great significance of this matter.</li>
                  <li>
                    The excellence of Muʿādh ibn Jabal (raḍiyallāhu ʿanhu).
                  </li>
                </ol>
              </Card>

              {/* Detailed notes 1–12 */}
              <Card className="border-indigo-300">
                <p className="font-semibold">
                  1) Wisdom behind creation of men and jinn
                </p>
                <p>
                  Derived from:{" "}
                  <span dir="rtl" className="font-semibold">
                    وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ
                  </span>{" "}
                  (Dhāriyāt 56). The wisdom is to worship Allah—not merely to
                  indulge in food, drink, and desire.
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">2) Worship is Tawḥīd</p>
                <p>
                  Worship stands upon Tawḥīd; any act of devotion devoid of
                  Tawḥīd is invalid. Some Salaf explained “that they worship Me”
                  as “that they single Me out (with oneness).”
                </p>
                <p className="text-sm">
                  Ḥadīth Qudsī: “I am most free of partners. Whoever performs an
                  action in which he associates others with Me, I abandon him
                  and his association.” (1)
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  3) Whoever lacks Tawḥīd has not worshipped Allah
                </p>
                <p>
                  Implied by:{" "}
                  <span dir="rtl" className="font-semibold">
                    وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ
                  </span>{" "}
                  (Kāfirūn 3): “Nor do you worship as I worship.” Their
                  acts—devoid of sincerity and Sharīʿah-conformity—are null.
                </p>
                <p className="text-sm">
                  Cf.{" "}
                  <span dir="rtl">
                    وَمَا مَنَعَهُمْ أَنْ تُقْبَلَ مِنْهُمْ نَفَقَاتُهُمْ إِلَّا
                    أَنَّهُمْ كَفَرُوا بِاللَّهِ وَبِرَسُولِهِ
                  </span>{" "}
                  (Tawbah 54).
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  4) Wisdom behind sending prophets
                </p>
                <p>
                  From:{" "}
                  <span dir="rtl" className="font-semibold">
                    وَلَقَدْ بَعَثْنَا فِي كُلِّ أُمَّةٍ رَسُولًا أَنِ اعْبُدُوا
                    اللَّهَ وَاجْتَنِبُوا الطَّاغُوتَ
                  </span>{" "}
                  (Naḥl 36): to call to Allah’s worship and shunning ṭāghūt.
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  5) The message reached every nation
                </p>
                <p>
                  From:{" "}
                  <span dir="rtl" className="font-semibold">
                    وَلَقَدْ بَعَثْنَا فِي كُلِّ أُمَّةٍ رَسُولًا
                  </span>{" "}
                  (Naḥl 36).
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  6) The prophets’ religion is one
                </p>
                <p>
                  From the same verse and from:{" "}
                  <span dir="rtl" className="font-semibold">
                    وَمَا أَرْسَلْنَا مِنْ قَبْلِكَ مِنْ رَسُولٍ إِلَّا نُوحِي
                    إِلَيْهِ أَنَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدُونِ
                  </span>{" "}
                  (Anbiyāʾ 25).
                </p>
                <p className="text-sm">
                  This does not contradict{" "}
                  <span dir="rtl">
                    لِكُلٍّ جَعَلْنَا مِنْكُمْ شِرْعَةً وَمِنْهَاجًا
                  </span>{" "}
                  (Māʾidah 48), because procedural laws differ, while the
                  foundation of religion is one:{" "}
                  <span dir="rtl" className="font-semibold">
                    شَرَعَ لَكُمْ مِنَ الدِّينِ...
                  </span>{" "}
                  (Shūrā 13).
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  7) Worship requires disbelief in ṭāghūt
                </p>
                <p>
                  Evidence:{" "}
                  <span dir="rtl" className="font-semibold">
                    وَاجْتَنِبُوا الطَّاغُوتَ
                  </span>{" "}
                  (Naḥl 36). Whoever worships Allah yet does not disbelieve in
                  ṭāghūt is not a true monotheist.
                </p>
                <Card className="mt-3 border-indigo-200">
                  <p className="font-semibold">Important note</p>
                  <p>
                    One does not issue blanket takfīr/taʿn (cursing) upon
                    people; rulings depend on{" "}
                    <HL>conditions and impediments</HL> (ignorance, ambiguity,
                    etc.). Likewise with specific sinners (e.g., consuming
                    usury), or those committing acts of shirk: a person is not
                    labelled a mushrik until the proof is established. The
                    Prophet ﷺ said:{" "}
                    <em>“Avoid the things that induce curses.”</em> (1)
                    Supplicating at graves is shirk, but the individual is only
                    judged so after establishing the proof.
                  </p>
                </Card>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">8) “Ṭāghūt” is comprehensive</p>
                <p>
                  It includes anything by which a servant exceeds bounds—deity,
                  leader, or obeyed figure (Ibn al-Qayyim). (2)
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  9) The three decisive verses in Anʿām (151–153)
                </p>
                <p>
                  Great significance to the Salaf (per Ibn Masʿūd). They contain
                  ten matters, starting with the prohibition of shirk.
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  10) The decisive verses in Isrāʾ
                </p>
                <p>
                  Eighteen matters; begin with:
                  <span dir="rtl" className="font-semibold block">
                    وَلَا تَجْعَلْ مَعَ اللَّهِ إِلَهًا آخَرَ فَتُقْعِدَ
                    مَذْمُومًا مَخْذُولًا
                  </span>{" "}
                  (Isrāʾ 22) and end with:
                  <span dir="rtl" className="font-semibold block">
                    وَلَا تَجْعَلْ مَعَ اللَّهِ إِلَهًا آخَرَ فَتُلْقَىٰ فِي
                    جَهَنَّمَ مَلُومًا مَدْحُورًا
                  </span>{" "}
                  (Isrāʾ 39), and Allah pointed to their greatness:
                  <span dir="rtl" className="font-semibold block">
                    ذَٰلِكَ مِمَّا أَوْحَىٰ إِلَيْكَ رَبُّكَ مِنَ الْحِكْمَةِ
                  </span>{" "}
                  (Isrāʾ 39).
                </p>
                <p className="text-sm">
                  The sitter (in the first verse) has no virtue and is
                  condemned/forsaken in this world; in the last, he is
                  blamed/repelled in the Fire.
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">11) The “ten rights” in Nisāʾ</p>
                <p>
                  They begin with{" "}
                  <span dir="rtl" className="font-semibold">
                    وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا
                  </span>{" "}
                  (Nisāʾ 36). The right of Allah is the greatest; other rights
                  benefit only when His is fulfilled. Evidence: to Ḥakīm b.
                  Ḥizām, the Prophet ﷺ said:{" "}
                  <em>
                    “You have entered Islam along with the good you had already
                    done.”
                  </em>{" "}
                  (1) Without Islam, those deeds would not avail.
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  12) The Prophet’s “counsel” before his death
                </p>
                <p>
                  From the report of Ibn Masʿūd. Though he ﷺ did not leave a
                  written will, he said:{" "}
                  <em>
                    as long as you hold to the Book of Allah you will not go
                    astray
                  </em>
                  . Of the greatest messages in the Book is:
                  <span dir="rtl" className="font-semibold block">
                    قُلْ تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ...
                  </span>{" "}
                  (Anʿām 151).
                </p>
              </Card>

              {/* Detailed notes 13–24 */}
              <Card className="border-indigo-300">
                <p className="font-semibold">13) Allah’s right over us</p>
                <p>That we worship Him and associate nothing with Him.</p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  14) Servants’ right with Allah—when His right is fulfilled
                </p>
                <p>
                  That He will not punish whoever does not associate anything
                  with Him in worship; but the one who commits shirk deserves
                  punishment.
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  15) Unknown to many companions initially
                </p>
                <p>
                  Muʿādh narrated it near his death (after many companions had
                  passed), to avoid concealing knowledge. The Prophet ﷺ’s
                  earlier concern was fear of trial—people relying on the glad
                  tidings. He did not intend absolute concealment; hence he told
                  Muʿādh.
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  16) Concealing knowledge for overriding benefit
                </p>
                <p>
                  Absolute concealment is impermissible; but withholding from
                  some in specific cases is allowed when benefits require it— as
                  here: “Do not tell them so they do not relax.” (1)
                </p>
                <p className="text-sm">
                  Similar: He ﷺ told Abū Hurayrah: “Give glad tidings that
                  whoever says <em>lā ilāha illā Allāh</em> sincerely from his
                  heart will enter Paradise.” And he left demolishing and
                  rebuilding the Kaʿbah upon Ibrāhīm’s foundations to avoid
                  fitnah for a people newly leaving shirk. (1)
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  17) Giving good news to a Muslim
                </p>
                <p>
                  From Muʿādh’s, “Shall I not give glad tidings…?”—a fine
                  benefit. Angels gave Ibrāhīm glad tidings:
                  <span dir="rtl" className="font-semibold block">
                    وَبَشَّرُوهُ بِغُلَامٍ عَلِيمٍ
                  </span>{" "}
                  (Dhāriyāt 28). The Prophet ﷺ gave his household the glad
                  tidings of his son Ibrāhīm:
                  <em>
                    “A boy was born to me tonight; I named him after my father
                    Ibrāhīm.”
                  </em>{" "}
                  (2)
                </p>
                <p className="text-sm">
                  One should brighten a Muslim’s heart with good news.
                  Conversely, do not deliberately bring grief; reported (with
                  weakness): “Let none inform me about others; I like to meet
                  you with a happy mind.” (3)
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  18) Fear of relying on Allah’s mercy
                </p>
                <p>
                  From: “Do not tell them so they do not relax.” Over-reliance
                  breeds feeling secure from Allah’s plan; despair blocks
                  repentance. Aḥmad said: the seeker of Allah’s pleasure remains
                  between <HL>fear and hope</HL>; whichever dominates destroys.
                </p>
                <p className="text-sm">
                  Some said: in sickness let hope dominate; in health let fear
                  dominate. Others: when considering Allah’s mercy, hope; when
                  considering one’s deeds, fear—cf.
                  <span dir="rtl" className="font-semibold">
                    وَالَّذِينَ يُؤْتُونَ مَا آتَوا وَقُلُوبُهُمْ وَجِلَةٌ
                  </span>{" "}
                  (Muʾminūn 60).
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  19) Saying “Allah and His Messenger know best”
                </p>
                <p>
                  Approved here because the Prophet ﷺ possesses Sharʿī knowledge
                  that others lack; however, he disapproved: “If Allah{" "}
                  <em>willed and you will</em>,” saying:
                  <em>
                    “Are you making me a partner with Allah?! Rather: if Allah
                    alone willed.”
                  </em>{" "}
                  (1)
                </p>
                <p className="text-sm">
                  Use the phrase in matters of religion; not for mundane
                  unknowns (e.g., “Will it rain this month?”).
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">20) Teaching select individuals</p>
                <p>
                  The Prophet ﷺ taught Muʿādh specifically, not Abū Bakr, ʿUmar,
                  ʿUthmān, or ʿAlī (raḍiyallāhu ʿanhum), showing permissibility
                  of selective instruction when wisdom demands.
                </p>
                <p className="text-sm">
                  Ibn Masʿūd: “When you tell a people what they cannot
                  comprehend, some will be tried by it.” (1) ʿAlī: “Speak to
                  people according to what they know.” (2)
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">21) Humility of the Prophet ﷺ</p>
                <p>
                  He rode a donkey and allowed another to ride with him—utmost
                  modesty for the noblest of creation.
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">22) Two riding one animal</p>
                <p>Permissible provided it does not overburden the animal.</p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  23) Great significance of this matter
                </p>
                <p>
                  The Prophet ﷺ informed Muʿādh of it and mentioned it as glad
                  tidings.
                </p>
              </Card>

              <Card className="border-indigo-300">
                <p className="font-semibold">
                  24) Excellence of Muʿādh (raḍiyallāhu ʿanhu)
                </p>
                <p>
                  He was singled out to ride with the Prophet ﷺ and receive this
                  knowledge.
                </p>
              </Card>
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
