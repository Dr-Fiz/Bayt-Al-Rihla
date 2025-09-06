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
 * Kitāb at-Tawḥīd — Chapter 7
 * Title: Invitation to Testifying that Lā ilāha illa Allāh
 * Route hint: /aqeedah/books/kitab-at-tawhid/invitation-to-testifying-la-ilaha-illa-allah
 *
 * This CHUNK delivers:
 *  - Page shell (no sticky bar), hero, segmented view toggle
 *  - Reusable UI kit (Card, Pill, Section, Verse, HL, Callout)
 *  - Question Bank (10 items) w/ reveal + explanations
 *  - Content scaffold (empty sections to fill in next chunks)
 * Next chunks will add: ALL article text (verbatim) into the content sections.
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
    rose: "bg-rose-100/80 text-rose-900 ring-rose-200",
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
/** 10 questions focused on: da‘wah to tawḥīd, Yūsuf 108, Muʿādh’s mission, meaning of the shahādah, and sequencing of obligations */
const QUESTIONS = [
  {
    id: "C7-Q1",
    prompt:
      "Why does the chapter emphasize inviting others to tawḥīd after personal belief?",
    options: [
      "Because da‘wah is optional",
      "Because belief is incomplete without inviting to it",
      "Because inviting replaces worship",
      "Because only scholars should call",
    ],
    answerIndex: 1,
    explanation:
      "The commentary states: tawḥīd must be accompanied by calling to it; otherwise it’s defective.",
  },
  {
    id: "C7-Q2",
    prompt:
      "According to Yūsuf 12:108, what are the two pillars that keep da‘wah sound?",
    options: [
      "Sincerity to Allah and sure knowledge (baṣīrah)",
      "Large crowds and eloquence",
      "Miracles and lineage",
      "Anger and force",
    ],
    answerIndex: 0,
    explanation:
      "“This is my way; I call to Allah upon sure knowledge… and I am not of the polytheists.”",
  },
  {
    id: "C7-Q3",
    prompt:
      "What distinguishes “the caller to Allah” from “the caller to other than Him” in the commentary?",
    options: [
      "The caller to Allah seeks to connect people to Allah; the other calls to himself or his leader",
      "Their clothing style",
      "Their city of residence",
      "Only their age",
    ],
    answerIndex: 0,
    explanation:
      "The text contrasts sincerity vs. self-promotion/political allegiance.",
  },
  {
    id: "C7-Q4",
    prompt:
      "What does “ʿalā baṣīrah” (upon sure knowledge) entail for the dāʿī?",
    options: [
      "Only basic emotions",
      "Knowledge of Sharīʿah, the audience, and wise methods",
      "Guesswork and enthusiasm",
      "Relying on customs alone",
    ],
    answerIndex: 1,
    explanation:
      "He must know the rulings, the invitee’s state, and the path to the objective — that is wisdom.",
  },
  {
    id: "C7-Q5",
    prompt:
      "In the instruction to Muʿādh, what is the FIRST matter to invite the People of the Book to?",
    options: [
      "Fasting Ramaḍān",
      "Zakah",
      "The testimony that Lā ilāha illa Allāh / worship of Allah alone",
      "Jihād",
    ],
    answerIndex: 2,
    explanation:
      "“Let the first thing be the testimony… / that they worship Allah alone.”",
  },
  {
    id: "C7-Q6",
    prompt:
      "What sequence did the Prophet ﷺ give Muʿādh after tawḥīd is accepted?",
    options: [
      "Zakah then Ṣalāh",
      "Ṣalāh then Zakah",
      "Ḥajj then Ṣalāh",
      "Zakah only",
    ],
    answerIndex: 1,
    explanation:
      "Teach them five daily prayers, then Zakah to be taken from their rich and given to their poor.",
  },
  {
    id: "C7-Q7",
    prompt:
      "Why is defining ‘ilāh’ as merely ‘Creator’ incorrect for the shahādah’s meaning?",
    options: [
      "Because Quraysh denied creation",
      "Because ‘ilāh’ means ‘one worshipped’, not just ‘creator’",
      "Because Arabic lacks the word ‘Creator’",
      "Because philosophers prefer it",
    ],
    answerIndex: 1,
    explanation:
      "Quraysh affirmed Allah’s creating; true tawḥīd is singling Him out in worship.",
  },
  {
    id: "C7-Q8",
    prompt:
      "What instruction did the Prophet ﷺ give ʿAlī at Khaybar that shows the precedence of da‘wah?",
    options: [
      "Attack immediately in the dark",
      "Proceed slowly, invite them to Islam, then explain Allah’s rights",
      "Negotiate tribute only",
      "Withdraw and return later",
    ],
    answerIndex: 1,
    explanation:
      "He said to approach with ease, call them to Islam, and clarify obligations — guidance of one person is better than a red camel.",
  },
  {
    id: "C7-Q9",
    prompt:
      "When is swearing while giving a fatwa appropriate, per the commentary?",
    options: [
      "Never",
      "Only if the audience asks for an oath",
      "When there is benefit in emphasizing the ruling",
      "Always, to sound confident",
    ],
    answerIndex: 2,
    explanation:
      "The Prophet ﷺ swore without being asked in contexts of benefit; otherwise one should avoid needless oaths.",
  },
  {
    id: "C7-Q10",
    prompt:
      "Which statement best reflects the ‘Important Matters’ list regarding tawḥīd and da‘wah?",
    options: [
      "Da‘wah is only for prophets",
      "Tawḥīd is not the first obligation",
      "Following the Messenger includes calling to Allah upon baṣīrah",
      "Distancing from idolaters is unnecessary",
    ],
    answerIndex: 2,
    explanation:
      "It’s the way of the Messenger and his followers; tawḥīd comes first, with sincerity and knowledge.",
  },
  {
    id: "C7-Q11",
    prompt:
      "According to Sūrat al-ʿAṣr (1–4), which complete set saves a person from loss?",
    options: [
      "Imān and patience only",
      "Imān, righteous deeds, mutual exhortation to truth, mutual exhortation to patience",
      "Righteous deeds and charity only",
      "Knowledge and lineage",
    ],
    answerIndex: 1,
    explanation:
      "Al-ʿAṣr lists four qualities: īmān, ʿamal ṣāliḥ, tawāṣī bil-ḥaqq, and tawāṣī bi-ṣabr.",
  },
  {
    id: "C7-Q12",
    prompt:
      "Why is inviting to the testimony part of perfecting tawḥīd in this chapter?",
    options: [
      "Because daʿwah is superior to worship",
      "Because belief is incomplete until one invites others to it",
      "Because it replaces personal obligations",
      "Because it is only for scholars",
    ],
    answerIndex: 1,
    explanation:
      "The commentary states tawḥīd must be accompanied by calling to it; otherwise it is defective.",
  },
  {
    id: "C7-Q13",
    prompt:
      "What characterizes a caller “to other than Allah,” per the text’s critique?",
    options: [
      "He directs people to Allah alone",
      "He seeks honor for himself or promotes his leader using misapplied evidences",
      "He avoids any public speaking",
      "He only quotes poetry",
    ],
    answerIndex: 1,
    explanation:
      "The text mentions self-promotion and politicized ‘evidences’ (e.g., for socialism) as calling to other than Allah.",
  },
  {
    id: "C7-Q14",
    prompt:
      "If people do not accept the call, what should concern the dāʿī most?",
    options: [
      "That he personally was not accepted",
      "That his social media following is small",
      "That the truth was not followed",
      "That his vocabulary was too advanced",
    ],
    answerIndex: 2,
    explanation:
      "The dāʿī’s discontent should be because the truth wasn’t followed, not personal rejection.",
  },
  {
    id: "C7-Q15",
    prompt:
      "What does the report that there will be “a prophet with whom there will be no one” teach a dāʿī?",
    options: [
      "Crowd size is the ultimate metric",
      "Guidance is measured by conveying truth, not numbers",
      "Daʿwah should stop if few respond",
      "Miracles are required to call",
    ],
    answerIndex: 1,
    explanation:
      "Success is fulfilling the duty of conveyance; numbers may be few or none.",
  },
  {
    id: "C7-Q16",
    prompt:
      "Beyond knowing rulings, what facet of baṣīrah did the Prophet ﷺ model when sending Muʿādh?",
    options: [
      "Ignoring audience background",
      "Anticipating people’s dispositions and shubuhāt (doubts)",
      "Relying on custom alone",
      "Focusing on politics",
    ],
    answerIndex: 1,
    explanation:
      "He alerted Muʿādh that he was going to the People of the Book, tailoring approach to their state.",
  },
  {
    id: "C7-Q17",
    prompt:
      "Which pair in the chapter exemplifies wise methods of winning hearts?",
    options: [
      "Seclusion and harshness",
      "“The killer of the fallen takes his spoils” and appeasing at Ḥunayn with about 100 camels",
      "Mockery and debate",
      "Silence and boycott",
    ],
    answerIndex: 1,
    explanation:
      "Both examples are cited as tools of encouragement/appeasement within wisdom.",
  },
  {
    id: "C7-Q18",
    prompt: "What is said about the ignorant person engaging in daʿwah?",
    options: [
      "He is more effective than scholars",
      "He often destroys more than he rectifies",
      "He is praised for his zeal regardless",
      "He should lead communities",
    ],
    answerIndex: 1,
    explanation:
      "The commentary states the ignorant is not suitable; he ruins more than he fixes.",
  },
  {
    id: "C7-Q19",
    prompt:
      "What does “I and whoever follows me” in Yūsuf 108 indicate about the Prophet’s followers?",
    options: [
      "They do not call to Allah",
      "They call upon baṣīrah, just as he does",
      "They rely on dreams for rulings",
      "They avoid learning",
    ],
    answerIndex: 1,
    explanation: "The verse ties followers to the same baṣīrah-based call.",
  },
  {
    id: "C7-Q20",
    prompt: "How is “Subḥāna Allāh” parsed in the commentary on Yūsuf 108?",
    options: [
      "As a noun of time",
      "As a cognate accusative with an omitted verb (i.e., ‘I glorify’)",
      "As a preposition",
      "As a passive participle",
    ],
    answerIndex: 1,
    explanation:
      "It’s a maṣdar used as a cognate accusative, implying the verb ‘usabbihu’.",
  },
  {
    id: "C7-Q21",
    prompt:
      "Why is “and I am not of the idolaters” placed in the verse’s flow?",
    options: [
      "To minimize shirk",
      "To emphasize that tawḥīd entails negating shirk",
      "To introduce a new topic",
      "To abrogate earlier verses",
    ],
    answerIndex: 1,
    explanation: "It serves as emphasis; tawḥīd contains disavowal of shirk.",
  },
  {
    id: "C7-Q22",
    prompt:
      "To which locations were Muʿādh and Abū Mūsā sent, respectively, according to the commentary?",
    options: [
      "Muʿādh to ʿAdn; Abū Mūsā to Ṣanʿāʾ",
      "Muʿādh to Ṣanʿāʾ and environs; Abū Mūsā to ʿAdn and environs",
      "Both to Ṭāʾif",
      "Both to Madīnah",
    ],
    answerIndex: 1,
    explanation:
      "Muʿādh: Ṣanʿāʾ; Abū Mūsā: ʿAdn; they were told to unite and ease, give glad tidings and not make things hard.",
  },
  {
    id: "C7-Q23",
    prompt:
      "Why did the Prophet ﷺ tell Muʿādh he was going to the People of the Book?",
    options: [
      "To discourage him",
      "To inform him of their condition and prepare for their knowledge background",
      "To avoid speaking to them",
      "To change his destination",
    ],
    answerIndex: 1,
    explanation:
      "Two reasons mentioned: know their state and prepare for them.",
  },
  {
    id: "C7-Q24",
    prompt: "In the grammar notes, what does ‘lammā’ (لما) express?",
    options: [
      "Absence due to absence",
      "Presence due to presence",
      "Absence due to presence",
      "A future prohibition",
    ],
    answerIndex: 1,
    explanation:
      "Lammā indicates a thing occurs with another’s occurrence; law and law-lā differ.",
  },
  {
    id: "C7-Q25",
    prompt:
      "In the phrase about the People of the Book, what does ‘min’ function as?",
    options: [
      "A partitive preposition",
      "An oath particle",
      "An explanatory (‘bayān’) preposition",
      "A conditional particle",
    ],
    answerIndex: 2,
    explanation:
      "It is ‘min al-bayān’, clarifying who the People of the Book are.",
  },
  {
    id: "C7-Q26",
    prompt:
      "In ‘fal-yakun awwala mā tadʿūhum ilayh…’, what do the ‘fā’ and the ‘lām’ indicate?",
    options: [
      "Fā’ = negation; lām = oath",
      "Fā’ = resumption/conjunction; lām = command",
      "Fā’ = question; lām = future",
      "Fā’ = exception; lām = preposition",
    ],
    answerIndex: 1,
    explanation:
      "The text notes fā’ of resumption/conjunction and lām of imperative.",
  },
  {
    id: "C7-Q27",
    prompt:
      "Why does the commentary insist that utterance of the shahādah is required along with inner belief?",
    options: [
      "Because utterance is unrelated",
      "Because ‘I testify’ entails verbal informing; consensus cited by Ibn Taymiyyah",
      "Because action alone suffices",
      "Because secrecy is prohibited",
    ],
    answerIndex: 1,
    explanation:
      "Witnessing requires knowledgeable verbal attestation; mere inner intent does not suffice.",
  },
  {
    id: "C7-Q28",
    prompt:
      "Why is defining ‘lā ilāha illā Allāh’ as ‘no creator except Allah’ invalid here?",
    options: [
      "Because the Qurʾān denies creation",
      "Because the idolaters already affirmed Allah as Creator of heavens and earth",
      "Because Arabic lacks a word for ‘creator’",
      "Because philosophers rejected it",
    ],
    answerIndex: 1,
    explanation:
      "Verses show they would answer ‘Allah’; dispute was over worship, not creation.",
  },
  {
    id: "C7-Q29",
    prompt:
      "What does the chapter note about idolaters in calamity and their supposed ‘deities’?",
    options: [
      "They persist with idols alone",
      "They turn to Allah sincerely, proving those idols aren’t true deities",
      "They abandon prayer",
      "They deny Allah’s existence",
    ],
    answerIndex: 1,
    explanation:
      "Their resort to Allah reveals others aren’t real deities deserving worship.",
  },
  {
    id: "C7-Q30",
    prompt:
      "What structure does ‘lā ilāha illā Allāh’ have, per the commentary?",
    options: [
      "Affirmation without negation",
      "Negation without affirmation",
      "Negation of all false gods then affirmation of divinity for Allah alone",
      "A purely cultural slogan",
    ],
    answerIndex: 2,
    explanation:
      "It negates worship of others and affirms it exclusively for Allah.",
  },
  {
    id: "C7-Q31",
    prompt:
      "What is the practical distinction between ‘rāyah’ and ‘liwāʾ’ in the Khaybar narration?",
    options: [
      "They are identical in all aspects",
      "Rāyah is waved; liwāʾ is rolled (partially or entirely)",
      "Liwāʾ is waved; rāyah is rolled",
      "Both are only verbal metaphors",
    ],
    answerIndex: 1,
    explanation:
      "The text explains rāyah is waved, liwāʾ is rolled, both used as signs.",
  },
  {
    id: "C7-Q32",
    prompt: "What is the basic meaning of ‘ghad’ and ‘ams’ in the commentary?",
    options: [
      "Ghad = yesterday; ams = tomorrow",
      "Ghad = day after today; ams = day before today (with extended usage possible)",
      "Both mean last week",
      "Both are conditional particles",
    ],
    answerIndex: 1,
    explanation:
      "Ghad is the day after today; ams is yesterday; both can be extended by usage.",
  },
  {
    id: "C7-Q33",
    prompt:
      "How is Allah’s attribute of Love treated in the Khaybar discussion?",
    options: [
      "Denied as metaphor only",
      "Affirmed as a real, action-related attribute with causes",
      "Limited to reward only",
      "Declared unknowable and thus ignored",
    ],
    answerIndex: 1,
    explanation:
      "The commentary affirms Love as an attribute; Allah may love or hate due to causes.",
  },
  {
    id: "C7-Q34",
    prompt:
      "What does ‘Allah will grant victory from his hands’ mean regarding ʿAlī (raḍiyallāhu ʿanhu)?",
    options: [
      "ʿAlī independently grants victory",
      "Victory will occur through ʿAlī as a means by Allah’s decree",
      "There will be no battle",
      "It refers to future caliphs only",
    ],
    answerIndex: 1,
    explanation:
      "It signals divine help through him as the means, not independent power.",
  },
  {
    id: "C7-Q35",
    prompt:
      "What does the phrase ‘and he was brought’ imply about ʿAlī’s condition at that moment?",
    options: [
      "He was absent from the camp",
      "He couldn’t see well and was led",
      "He was on patrol",
      "He had already departed",
    ],
    answerIndex: 1,
    explanation:
      "Being ‘brought’ indicates he was led due to eye pain/impairment.",
  },
  {
    id: "C7-Q36",
    prompt:
      "What does ‘proceed slowly’ convey in the Prophet’s ﷺ instruction to ʿAlī?",
    options: [
      "Hastiness and surprise",
      "Measured ease due to danger (derived from r-s-l usage)",
      "Total inaction",
      "Immediate night attack",
    ],
    answerIndex: 1,
    explanation:
      "It means go with ease/gradually, mindful of treachery and danger.",
  },
  {
    id: "C7-Q37",
    prompt:
      "The saying, “Whenever we pass the night in a people’s area, evil is the morn for the warned,” is cited to indicate…",
    options: [
      "A boast without context",
      "Operational caution and the reality of confronting hostile groups",
      "A recommendation to avoid travel",
      "An unrelated proverb",
    ],
    answerIndex: 1,
    explanation:
      "It reflects strategic caution in such settings, per the context given.",
  },
  {
    id: "C7-Q38",
    prompt:
      "When should you explain detailed obligations (e.g., ṣalāh, zakāh) to a new invitee, per the discussion?",
    options: [
      "Only after many years",
      "Always before the call to Islam",
      "Preferably after acceptance, yet circumstances may warrant explaining first — left to prevailing benefit",
      "Never, to avoid difficulty",
    ],
    answerIndex: 2,
    explanation:
      "Baseline: after acceptance (per Muʿādh’s ḥadīth); yet the author notes contemporary cases may require explaining earlier; judge by maslaḥah.",
  },
  {
    id: "C7-Q39",
    prompt:
      "In ‘li-an yahdiya’ (because Allah guides…), what do the grammar notes specify?",
    options: [
      "Lām is for emphasis and ‘an’ is redundant",
      "Lām is answer to an oath; ‘an’ + verb form a verbal noun acting as subject; ‘khayr’ is predicate",
      "Both are particles of negation",
      "It is a poetic license only",
    ],
    answerIndex: 1,
    explanation:
      "The commentary parses lām as jawab al-qasam; the maṣdar muʾawwal is the subject; ‘khayr’ is the predicate.",
  },
  {
    id: "C7-Q40",
    prompt:
      "What guidance does the chapter give about swearing when issuing religious verdicts?",
    options: [
      "It is always discouraged",
      "Do it frequently to sound convincing",
      "It is appropriate when there is benefit in emphasis; the Prophet ﷺ swore in three Qur’ānic contexts",
      "It is only for judges in court",
    ],
    answerIndex: 2,
    explanation:
      "Swearing can be warranted to emphasize truth (e.g., Yūnus 53; Taghābun 8; Sabaʾ 3); otherwise avoid needless oaths.",
  },
];

/* ---------- Robust Question component (handles any question shape) -------- */
function Question({ q }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  // Normalize shapes: {options, answerIndex} OR {choices:[{key,text}], answer:'B'}
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

/* ------------------------ Content: Scaffold (to be filled) ----------------- */
/* NOTE: In the next chunks, we will insert the full article verbatim across these sections. */
function ContentPart1() {
  return (
    <>
      <Section
        id="intro-commentary"
        tone="indigo"
        title="Commentary — Why invite to the testimony?"
        subtitle="Belief + invitation; Al-ʿAṣr 1–4"
      >
        <p>
          <strong>INVITATION TO TESTIFYING THAT Laa ’Ilaaha Illa Allah</strong>
        </p>
        <p>(THERE IS NO DEITY WORTHY OF WORSHIP EXCEPT ALLAH)</p>

        <p>
          <strong>COMMENTARY</strong>
        </p>
        <p>
          This arrangement by the author, is the most appropriate. Because after
          mentioning a person believing in Tawheed himself, he mentioned his
          inviting others to it since belief is incomplete until one invites to
          it. Allah the Exalted says:
        </p>

        <Verse
          tone="indigo"
          arabic="﴿وَالْعَصْرِ ﴿١ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ﴿٢ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ ﴿٣-٤"
        >
          “By the declining day, surely man is in loss. Save those who exhort
          one another to truth and exhort one another to endurance.” (Al-’Asr:
          1-4).
        </Verse>

        <p>
          So, Tawheed must be accompanied with inviting to it. Otherwise it will
          be defective. Undoubtedly, the one who follows the path of Tawheed
          does so because he considers it the best path. If he is truthful in
          his belief, then he will definitely invite others to it. Thus,
          inviting to the testification that laa ilaaha illa Allah is from
          perfecting the Tawheed, and Tawheed is defective except with it.
        </p>
      </Section>

      <Section
        id="yusuf-108"
        tone="emerald"
        title="“This is my way” (Yūsuf 108)"
        subtitle="Calling to Allah upon baṣīrah; sincerity vs. calling to oneself"
      >
        <p>
          <strong>Allah – The Exalted – says:</strong>
        </p>

        <Verse
          tone="emerald"
          arabic="﴿قُلْ هَـٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ عَلَىٰ بَصِيرَةٍ أَنَا۠ وَمَنِ ٱتَّبَعَنِي ۖ وَسُبْحَـٰنَ ٱللَّهِ وَمَآ أَنَا۠ مِنَ ٱلْمُشْرِكِينَ ﴿١٠٨"
        >
          “Say (O Muhammad): ‘This is My Way; I invite unto Allah (i.e. to the
          Oneness of Allah – Islamic Monotheism) with sure knowledge, I and
          Whosoever follows Me (also must invite others to Allah i.e to the
          Oneness of Allah – Islamic Monotheism) with sure knowledge and
          Glorified and Exalted be Allah (above all that they associate as
          partners with Him). And I am not of the Mushrikūn (polytheists,
          pagans, idolaters and disbelievers In the Resurrection).’” (Yoosuf:
          108).
        </Verse>

        <p>
          <strong>COMMENTARY</strong>
        </p>

        <p>
          His saying: Say: ‘this is my way’: what is referred to is what the
          Prophet (ﷺ) came with of rulings in worship and invitation to Allah.
        </p>
        <p>
          <em>My way:</em> My path.
        </p>
        <p>
          His saying: I invite expresses the circumstance of the yaa (in
          Sabeelee). It could also express a recommencement to explain that
          path.
        </p>
        <p>
          His saying: to Allah: because the callers to Allah are divided into
          two:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>1- The caller to Allah</li>
          <li>2- The caller to other than Him.</li>
        </ul>
        <p>
          The caller to Allah the Exalted is the sincere who wants to connect
          the people to Allah the Exalted. As for the caller to other than Him,
          he could be a caller to himself who would invite to the truth to be
          venerated and honored among the people. So, you see him getting angry
          when the people do not adhere to what he orders, and he rejoices when
          they adhere to what he orders. He will not call them to shun it.
        </p>
        <p>
          He may also be a caller to his leader as is in many countries of
          misguided scholars of the government – not scholars of the path – who
          invite to their leaders. For instance, when (calls for) Socialism
          started in the Arab world, some misguided scholars started to cook-up
          evidences with irrelevant verses and Ahaadeeth. Those people call to
          other than Allah.
        </p>
        <p>
          Whoever invites unto Allah and sees people staying away from him, he
          should not despair nor leave the call. The Prophet (ﷺ) told ’Alee ibn
          Abee Taalib (رضي الله عنه), “Proceed slowly, for by Allah! That Allah
          guides a person through you is better for you than a red camel!”(1)
          That is, that the guidance of a single man from among the Jewish
          tribes is better for you than the red camel. So when he invites unto
          Allah and is not answered, his discontentment should be because the
          truth was not being followed and not because he was not accepted. If
          his anger is for this reason, it means that he is calling unto Allah,
          and if
        </p>
        <p>
          just one person accepts, it suffices him. And if no one accepts, he
          has discharged his duty. It’s been reported in hadeeth that there will
          be: “A prophet with who there will be no one.”(2)
        </p>
        <p>
          Also it would suffice as from calling to the truth and warning against
          evil that it becomes clear to the people that this is the truth and
          such-and-such is falsehood. This is because when people do not explain
          the truth and falsehood becomes established over time, the truth will
          be thought to be false and falsehood, true.
        </p>
      </Section>

      <Section
        id="yusuf-108-wisdom"
        tone="sky"
        title="Baṣīrah & Wisdom in Daʿwah"
        subtitle="Sharīʿah knowledge, condition of invitee, and means to the goal"
      >
        <p>
          His saying: ’alaa baseerah (with sure knowledge) that is, knowledge.
          So, this call involves sincerity and knowledge because what mostly
          destroys Da’wah is lack of sincerity or lack of knowledge. The
          knowledge referred to in the verse: “with sure knowledge” is that of
          the Sharee’ah alone. It includes the knowledge of the Sharee’ah, the
          condition of the one being invited and knowledge of the path that
          leads to the objective. This is wisdom.
        </p>

        <p>
          So, he should be well-acquainted with the rulings of the Sharee’ah,
          the condition of the one being invited and how to actually attain the
          call. Thus, the Prophet (ﷺ) said, “You are going to a people from the
          People of the Book.”(3) And these are not all from the knowledge of
          the rulings of Sharee’ah because by knowing that this person responds
          to Da’wah with gentleness and the other will respond to it with
          sternness, or that the other will present some ambiguities is
          something beyond the rulings of the Sharee’ah alone.
        </p>

        <p>
          Likewise, the knowledge of the methods that will attract the invited,
          such as encouraging them with a particular thing and cheering them up
          such as his saying (ﷺ): “The killer of the fallen takes his
          spoils.”(3) Or by assuaging them; the Prophet (ﷺ) gave about a hundred
          camels to those who were to be appeased during the Hunayn
          expedition.(1) All of this is from wisdom. The ignorant is not
          suitable for Da’wah and is not praise-worthy and his approach is not
          in line with that of the Messenger (ﷺ) since the ignorant destroys
          more than he rectifies.
        </p>

        <p>
          His saying: I and whosoever follows me: Two opinions are mentioned
          here:
        </p>
        <p>
          First - the word, anaa (I), is the subject, and its predicate is ’alaa
          baseerah (upon sure knowledge); wa man it-taba’anee (and whosoever
          followed me) is connected with anaa meaning: I, along with those who
          follow me are upon sure knowledge; i.e. in my worship and call.
        </p>
        <p>
          Second - the word anaa is a stress for the concealed pronoun in His
          saying: ad’oo (I call); i.e. ‘I, as a person invite unto Allah and
          those who follow me also invite, and we are upon sure knowledge.’
        </p>

        <p>
          His saying: Glory be to Allah! That is, glorious is Allah that I
          should call (unto Him) based on clear knowledge!
        </p>
        <p>
          The parsing of subhaana: it is a cognate accusative with an omitted
          active element, fully meaning: usabbihu, I glorify.
        </p>
        <p>
          His saying: and I am not of the idolaters: Its place in this context
          is to express emphasis since Tawheed implies negating Shirk.
        </p>
      </Section>

      <Section
        id="muadh-mission"
        tone="amber"
        title="Muʿādh’s Mission to Yemen"
        subtitle="Start with tawḥīd; then ṣalāh; then zakāh; cautions and oaths"
      >
        <p>
          Likewise, Ibn ’Abbaas (رضي الله عنهما) narrated that when the
          Messenger of Allah (ﷺ) sent Mu’aadh as an emissary to Yemen, he said
          him, “You are going to the people of the Book, so the first thing you
          should invite them to should be: the testimony that laa ilaaha illa
          Allah (there is no deity worthy of worship except Allah).” In another
          version, it says: “that they should worship Allah alone. If they
          follow you in that, teach them that Allah has made obligatory on them,
          five prayers during every day and night. If they follow you in that,
          teach them that Allah has made compulsory on them charity, to be taken
          from the rich among them and given to the poor among them. If they
          follow you in that, you should be careful with their valuables and be
          fearful of the curse of the wronged because there is no barrier
          between it and Allah.” They both recorded it.(1)
        </p>

        <p>
          <strong>COMMENTARY</strong>
        </p>

        <p>
          His saying (that is, Ibn ’Abbaas): sent Mu’aadh: i.e. he sent him. He
          sent him as an envoy as a teacher, judge, and caller to Islaam. He
          sent him in Rabee’ Al-Awwal in the tenth year of Hijrah. This is the
          most popular opinion. He sent him and Aboo Moosaa Al-Ash’aree – also.
          He sent Mu’aadh to San’aa and its environs and Aboo Moosaa to ’Adn and
          its environs, and ordered both of them to: come together, agree and
          not divide. Ease things and not bring difficulty, give glad tidings
          and not frighten them.(2)
        </p>

        <p>
          His saying: lammaa (when): It is a conditional particle considering
          its parsing. It is a particle that expresses the presence of a thing
          due to the presence of another. As for law (if), it expresses absence
          due to an absence, and law laa shows absence due to presence.
        </p>

        <p>
          His saying: you are going to the People of the Book: He said that to
          guide him. This is evidence that he (ﷺ) was well-acquainted with
          people’s condition. What he knows of their state is from two sources:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>1- Revelation.</li>
          <li>2- Knowledge and experience.</li>
        </ul>

        <p>
          His saying: min here expresses explanation. The Book implies the
          Tawraah and the Injeel. So, the intended meaning of the People of the
          Book2 is the Jews and Christians. They formed the majority of people
          in Yemen during that time although there were polytheists in Yemen.
          However, the Jews and Christians formed the majority; thus, he
          concentrated on the majority. The Prophet (ﷺ) told him this for two
          reasons:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            First - that he may be acquainted with the condition of those he
            will be inviting.
          </li>
          <li>
            Second - that he may prepare for them; since they are people of the
            Book who have some knowledge.
          </li>
        </ul>

        <p>
          His saying: faliyakun: the letter, faa (as it appears in the Arabic
          text) expresses a reopening or conjunction. The letter, laam (i.e. li
          in faliyakum) conveys an order. The word Awwal (first) is the subject
          of
          <em> yakun</em> while its predicate is <em>shahaadah</em> (testimony).
          It is said that the case is vice-versa; that is, Awwal is the
          predicate, put forward while shahaadah is the subject of{" "}
          <em>yakun</em> made to appear later. Apparently he (ﷺ) wants to show
          that the first thing should be the testimony; and in that case, the
          word, Awwal will be nominative on the consideration that it is the
          subject of <em>yakun</em>, meaning: the first thing you should invite
          them to is the testimony that laa ilaaha illa Allaah (there is no
          deity worthy of worship except Allah).
        </p>
      </Section>

      <Section
        id="meaning-of-shahadah"
        tone="indigo"
        title="Meaning of Lā ilāha illa Allāh"
        subtitle="Ilāh = the One worshipped; negation and affirmation; refuting kalām definitions"
      >
        <p>
          His saying: <em>shahaadah</em> (testimony): the attestation here is
          out of knowledge. Allah the Exalted says:
        </p>
        <p className="italic">
          “Only to those who had bore witness to this truth and are aware.”
          (Az-Zukhruf: 86)
        </p>
        <p>
          So here, testimony refers to knowledge and utterance with the tongue
          because the witness informs of particular knowledge. In this
          situation, merely informing does not suffice; there must be knowledge
          and informing, acceptance, attesting and submitting.
        </p>
        <p>
          If he believes in his heart but does not utter with his tongue that:
          ‘I testify that there is no deity worthy of worship except Allah,’
          Shaykh al-Islaam Ibn Taymiyyah (رحمه الله) said such is not a Muslim
          by consensus (of the scholars) until he utters it. This is because the
          phrase, ‘I testify’ expresses informing which entails utterance. As
          such, utterance is a must and merely intending will not suffice nor
          profit him before Allah until he utters it. The Prophet (ﷺ) told his
          uncle, Aboo Taalib: “Say”(3) and not: ‘believe that there is no deity
          worthy of worship except Allah.’
        </p>

        <p>
          His saying: there is no deity (<em>laa ilaaha</em>): that is, there is
          no object of worship. The word <em>ilaah</em> means deified. The
          theological rhetoricians hold that it is <em>ilaah</em>, deity,
          meaning also <em>aaliha</em>, deities; such that it is a nomen
          agentis. Thus, <em>laa ilaaha illa Allah</em> would mean: ‘there is no
          one capable of creation’ and this is invalid. If this meaning is held,
          the polytheists whom the Prophet (ﷺ) fought will be regarded as
          monotheists since they attest to that. Allah the Exalted says:
        </p>
        <p className="italic">
          “And if you ask them who created them, they will surely say: ‘Allah’.”
          (Az-Zukhruf: 87).
        </p>
        <p className="italic">
          “And verily, if you should ask them who created the heavens and the
          earth, they will say: ‘Allah.’” (Az-Zumar: 38).
        </p>

        <p>
          If it is said: Why is it said: there is no deity other than Allah
          whereas the idolaters worship idols!?
        </p>
        <p>
          I will respond that: they worship them without right. So even if they
          refer to them as deities, their deification is wrong; they are
          deserving of been worshipped. Thus, when calamity afflicts them, they
          have recourse to Allah the Exalted and worship him sincerely.
          Therefore they (i.e. the deities) are not deserving of been called
          deities. They worship them but confess that they only do that so that
          they help them get closer to Allah. So, they make them means and path.
          With this understanding, we will have no problems with the saying of
          the Prophets – عليهم السلام –
        </p>
        <p className="italic">
          “O my people! Worship Allah, you have no other God save Him.”
          (Al-A’raaf: 59)
        </p>
        <p>
          since these gods (they have and worship) are not deserving of been
          worshipped; rather, The Deity who is actually worthy of worship is
          Allah – Glorified is He and most Exalted.
        </p>

        <p>
          His saying: <em>laa ilaaha illa Allah</em>: is negation of the right
          of being worshipped for other than Allah, and establishing such for
          Allah. Therefore, the expression is restrictive.
        </p>
      </Section>

      <Section
        id="khaybar-flag"
        tone="rose"
        title="The Banner at Khaybar & Guiding One Soul"
        subtitle="ʿAlī (رضي الله عنه); ‘proceed slowly’; invitation before fighting"
      >
        <Card className="border-rose-200/70">
          <p className="font-semibold text-slate-900">Text</p>
          <p className="mt-2 leading-7">
            They both also reported from Sahl bin Sa’d (رضي الله عنه) that the
            Prophet (ﷺ) said on the day of the Khaybar expedition,{" "}
            <em>
              “I shall give the flag tomorrow to a man who loves Allah and His
              Messenger and whom Allah and His messenger also love. Allah will
              grant victory from his hands.”
            </em>{" "}
            People spent that night talking about whom it will be given to. When
            they woke up, they went to the Messenger of Allah (ﷺ) early in the
            morning with each of them hoping that it will be given to him. He
            then asked, <em>“Where is ’Alee bin Abee Taalib?”</em> He was told
            that he was complaining of pains in his eyes. So, they sent for him
            and he was brought. He (ﷺ) spat into his eyes and he was healed as
            if he had never suffered any pain. He (ﷺ) then handed over the flag
            to him and said,{" "}
            <em>
              “Proceed slowly until you get to their area. Then invite them to
              Islam and tell them what is obligatory on them in it of the rights
              of Allah the Exalted. For by Allah! That Allah guides a person
              through you is better for you than a red camel!”
            </em>
            (1)
          </p>
        </Card>

        <p>
          <strong>COMMENTARY</strong>
        </p>

        <p>
          His saying: <em>I shall give</em>: this sentence is being stressed
          with three elements of emphasis: a concealed article of oath, letters{" "}
          <em>laam</em> and <em>noon</em> such that it fully means: ‘By Allah! I
          shall give’.
        </p>

        <p>
          His saying: <em>the flag</em>: is called <em>ar-raayah</em> because it
          is seen. It is what the commander uses to indicate where he is. The
          word, <em>al-liwaa</em> is said to also mean <em>ar-raayah</em>. It is
          also said that it is: something whose top is rolled or that entirely
          rolled. Thus, the difference between them is: the <em>raayah</em>
          is waved, not rolled, while the <em>liwaa</em> is rolled either at its
          top or entirely but they are both used as indicators and are as such
          referred to as <em>’alaam</em> (signs).
        </p>

        <p>
          His saying: <em>gadan</em> (tomorrow): he meant by that, the day after
          today while <em>ams</em>, yesterday, refers to the day before today.
          Basically, <em>al-gadd</em> means the day that follows today while{" "}
          <em>al-ams</em> refers to the day today followed. <em>Gadd</em> could
          mean the day further than that. Allah the Exalted says:
        </p>

        <Verse tone="rose" arabic="﴿وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ ﴾">
          “And let every soul look to that which he sends-on before for the
          morrow” (Hashr: 18) i.e. the Day of Resurrection.
        </Verse>

        <p>
          Similarly, <em>ams</em> could be used for days beyond that; that is,
          the days further before yesterday.
        </p>

        <p>
          His saying:{" "}
          <em>
            who loves Allah and His Messenger and whom Allah and His messenger
            also love
          </em>
          : He affirmed the attribute of love for Allah from the two angles:
          that is, Allah the Exalted Loves and is Loved. The Deniers deny this
          attribute. They say: what is meant with the Allah’s love for a person
          is His rewarding him or His intention to reward him and the meaning of
          the servant’s love for Allah is his love for His reward. This is
          perversion statement from its apparent meaning contrary to the
          consensus of the pious predecessors among the companions, their
          successors and the guided scholars after them.
        </p>

        <p>
          Allah’s attribute of Love is well-established with Him and is from His
          action-related Attributes. Every Attribute of Allah with a{" "}
          <em>sabab</em> (cause) is from His Action-related Attributes. Love has
          cause; Allah may hate a person at a particular time and love him at
          another time owing to a specific cause.
        </p>

        <p>
          His saying: <em>from his hands</em>: i.e. Allah will give victory over
          Khaybar through him. This contains good news of divine help.
        </p>

        <p>
          His saying: <em>talking about</em>: i.e. they got engrossed in it. The
          phrase, <em>talking about</em> expresses what they spent the night
          doing.
        </p>

        <p>
          His saying:{" "}
          <em>they went to the Messenger of Allah (ﷺ) early in the morning</em>:
          i.e. they went early to him in the morning, with each of them
          expecting to be given, to attain Allah’s love and the Messenger’s.
        </p>

        <p>
          His saying: He then asked, ‘Where is ’Alee bin Abee Taalib?’ The
          speaker was the Messenger (ﷺ).
        </p>

        <p>
          His saying: <em>He was complaining of pains in his eyes</em>: That is,
          he feels pain in them. However, he was complaining to Allah because he
          took ill in his eyes.
        </p>

        <p>
          His saying: <em>So, they sent for him</em>: By the order of the
          Messenger (ﷺ).
        </p>

        <p>
          His saying: <em>and he was brought</em>: As if he – may Allah be
          pleased with him – could not see because his statement,{" "}
          <em>he was brought</em>, means ‘he was lead.’
        </p>

        <p>
          His saying: <em>as if he had never suffered any pain</em>: That is,
          without leaving behind any red traces or any other thing.
        </p>

        <p>
          His saying: <em>he was healed</em>: This from Allah’s signs pointing
          to His Ability and and the truthfulness of His Prophet (ﷺ). This is
          among the virtue of the Leader of the Faithfuls, Alee bin Abee Taalib
          (رضي الله عنه): that he loves Allah and His Messenger, and that Allah
          and His Messenger also love him since the Prophet (ﷺ) selected him
          amongst other companions.
        </p>

        <p>
          His saying: <em>Proceed slowly</em>: i.e. take your time, taken from{" "}
          <em>rsl</em> an-Naaqat meaning, its milk is taken gradually. However,
          it is used to say, ‘go with ease’ owing to the dangerous circumstance;
          the Kameen tribe is feared and the Jews are wicked and treacherous.
        </p>

        <p>
          His saying: <em>until you get to their area</em>: i.e. near and around
          them. The Prophet (ﷺ) would say:
          <em>
            “Whenever we pass the night in a people’s area, evil is the morn for
            the warned.”
          </em>
          (1) This if we were to be in the situation the Messenger (ﷺ) was along
          with his companions. But if we are partisan; even if we camp in their
          midst they may stand up and we will be overwhelmed!
        </p>

        <p>
          His saying: <em>Then invite them</em>: That is, the people of Khaybar.{" "}
          <em>To Islaam</em>: i.e. submission to Allah.
        </p>

        <p>
          His saying: <em>tell them what is obligatory on them</em>: that is,
          just inviting to Islaam does not suffice; he should also inform them
          of what is compulsory for them so that they would understand it and
          stick to them. However, it should be in the sequence contained in the
          hadeeth of Mu’aadh’s mission.
        </p>

        <p>
          One becomes unclear regarding this matter: should he tell them what is
          obligatory on them of Allah’s rights in Islaam before they accept
          Islaam? He should after that they accept it? If we consider the most
          apparent thing in the hadeeth of Mu’aadh and Sahl, we would say: the
          preferred thing is for him to invite to Islaam, and after they accept
          Islaam, he should tell them. But if we consider the situation of the
          people today; they do not accept Islaam out of conviction. He may
          accept Islaam and when you tell him, he may retract.
        </p>

        <p>
          We would say: they should be informed first about what is obligatory
          on them from the rights of Allah in it so that they do not apostatize
          from Islaam after telling them their obligations. In that case, it
          will be obligatory to execute them (if they apostatize) because they
          are apostates. We may also say that: leave the issue to the prevailing
          situation and the desired benefits to determine what to do first
          before the other.
        </p>

        <p>
          His saying: <em>That Allah guides</em>: the letter, <em>laam</em> (in{" "}
          <em>li-an</em>) occurs as a response to the oath. The particle{" "}
          <em>ani</em>, with a <em>fathah</em> sign on the hamzah is in the
          infinitive. The word <em>yahdee</em> was changed by the infinitive,
          becoming the subject. The word, <em>khayr</em> (better) is the
          predicate; such as Allah’s saying:
        </p>

        <p className="italic">
          ﴿… وَأَن تَصُومُوا۟ خَيْرٌۭ لَّكُمْ﴾ (Al-Baqarah: 184).
        </p>

        <p>
          His saying: <em>red camel</em>, the word <em>humr</em> is the plural
          form of the word <em>’ahmar</em> (red colour) but if it is read:{" "}
          <em>humur</em>, it is the plural word for <em>himaar</em> (donkey).
          The first meaning is intended here.
        </p>

        <p>
          He mentioned the red camel because the Arabs so much admire it as it
          is the most valuable and precious camels to them.
        </p>

        <p>
          His saying: <em>‘That Allah guides someone through you,’</em> he did
          not say: ‘that you guide…’ since the One Who guides is Allah. The
          guidance meant here is that of success from Allah and been shown the
          way.
        </p>

        <p>
          Is the guidance referred to that from disbelief to Islam, or it
          includes all forms of guidance?
        </p>

        <p>
          We say: it was addressed to a people he was going to invite to Islam.
        </p>

        <p>
          Should we say that the circumstance demonstrates restriction, and that
          the one in whose hands an individual gets guided about a subsidiary
          issue of the religion will not get that reward based on circumstantial
          evidencing because Alee was sent to unbelievers to invite them to
          Islam? Allah knows best.
        </p>
      </Section>

      <Section
        id="important-matters-list"
        tone="emerald"
        title="Important Matters — 1 to 30"
        subtitle="A structured list extracted from the chapter"
      >
        <p className="font-semibold">Important Matters:</p>

        <ul className="mt-2 list-disc pl-6 space-y-2">
          <li>
            <strong>First:</strong> Invitation to Allah is the way of those who
            follow the Messenger of Allah (ﷺ).
          </li>
          <li>
            <strong>Second:</strong> Exhortation on sincerity; because for many
            of the people, if they would call, they invite to themselves.
          </li>
          <li>
            <strong>Third:</strong> That sure knowledge is from the obligations.
          </li>
          <li>
            <strong>Fourth:</strong> From the proofs of perfect Tawheed is that
            one holds Allah the Exalted far above any comparison.
          </li>
          <li>
            <strong>Fifth:</strong> From the ugliness of Shirk is that it
            involves comparing Allah (with His creatures).
          </li>
          <li>
            <strong>Sixth:</strong> And is one of the most important –
            distancing the Muslim from the Idolaters so that he does not become
            amongst them even if he does not commit Shirk.
          </li>
          <li>
            <strong>Seventh:</strong> That Tawheed is the first obligation.
          </li>
          <li>
            <strong>Eighth:</strong> That he should start with it before
            anything else; even <span className="italic">Salaah</span>.
          </li>
          <li>
            <strong>Ninth:</strong> That the meaning of: ‘that they should
            declare Allah’s oneness’ is in the meaning of the testimony that:
            laa ilaaha illa Allah (there is no deity worthy of worship except
            Allah).
          </li>
          <li>
            <strong>Tenth:</strong> That a person may be one of the people of
            the Book without knowing it (i.e. the statement: laa ilaaha illa
            Allah) or that may be aware of it and not act upon it.
          </li>
          <li>
            <strong>Eleventh:</strong> Exhortation towards teaching in
            piecemeal.
          </li>
          <li>
            <strong>Twelfth:</strong> Starting with the most important and then,
            the next in importance.
          </li>
          <li>
            <strong>Thirteenth:</strong> How Zakat is given.
          </li>
          <li>
            <strong>Fourteenth:</strong> The scholar should explain ambiguities
            to the student.
          </li>
          <li>
            <strong>Fifteenth:</strong> Prohibition of tampering with people’s
            wealth.
          </li>
          <li>
            <strong>Sixteenth:</strong> Avoiding the curse of the wronged.
          </li>
          <li>
            <strong>Seventeenth:</strong> Information that it (i.e. the curse)
            is not obstructed.
          </li>
          <li>
            <strong>Eighteenth:</strong> From the proofs of Tawheed is what
            befell the leader of the Prophets (ﷺ) and the leading beloved
            servants of Allah of difficulty, hunger and trials.
          </li>
          <li>
            <strong>Nineteenth:</strong> His statement: “I shall give the flag
            to a man…” is one of the signs of prophethood.
          </li>
          <li>
            <strong>Twentieth:</strong> His spitting – peace and blessings be
            upon him – into his eyes is also one of its signs.
          </li>
          <li>
            <strong>Twenty-first:</strong> The excellence of Alee (رضي الله
            عنه).
          </li>
          <li>
            <strong>Twenty-second:</strong> The excellence of the companions for
            their gathering that night and being busy from talking about the
            glad tidings of the conquest.
          </li>
          <li>
            <strong>Twenty-third:</strong> Belief in Preordainment since it
            (i.e. the banner) came to the one who had not striven for it and its
            been kept from the one who strove for it.
          </li>
          <li>
            <strong>Twenty-fourth:</strong> The mannerliness in his saying:
            ‘proceed slowly’.
          </li>
          <li>
            <strong>Twenty-fifth:</strong> that inviting to Islam comes before
            fighting.
          </li>
          <li>
            <strong>Twenty-sixth:</strong> It is legitimate vis-à-vis those who
            had been invited previously and even fought.
          </li>
          <li>
            <strong>Twenty-seventh:</strong> Invitation should be with wisdom
            based on his saying: “…and tell them what is obligatory on them.”
          </li>
          <li>
            <strong>Twenty-eight:</strong> Knowing Allah’s rights in Islam.
          </li>
          <li>
            <strong>Twenty-ninth:</strong> The reward of the one from whose
            hands a single person becomes guided.
          </li>
          <li>
            <strong>Thirtieth:</strong> Swearing while giving religious
            verdicts.
          </li>
        </ul>
      </Section>

      <Section
        id="important-matters-commentary"
        tone="sky"
        title="Important Matters — Commentary Expansion"
        subtitle="Detailed explanations for each item"
      >
        <p className="font-semibold">COMMENTARY — Important Matters:</p>

        <p>
          <strong>The first</strong> – Invitation to Allah is the way of those
          who follow the Messenger of Allah (ﷺ). This is derived from His saying
          – The Exalted:
        </p>

        <Verse
          tone="sky"
          arabic="﴿قُلْ هَـٰذِهِۦ سَبِيلِىٓ أَدْعُوا۟ إِلَى ٱللَّهِ عَلَىٰ بَصِيرَةٍ أَنَا۠ وَمَنِ ٱتَّبَعَنِى ۖ وَسُبْحَـٰنَ ٱللَّهِ وَمَآ أَنَا۠ مِنَ ٱلْمُشْرِكِينَ﴾"
        >
          “Say (O Muhammad): ‘This is My Way; I invite unto Allah (i.e. to the
          Oneness of Allah) with sure knowledge, I and Whosoever follows Me
          (also must invite others to Allah i.e to the Oneness of Allah) with
          sure knowledge. And glorified and Exalted be Allah (above all that
          they associate as partners with Him). And I am not of the Mushrikūn…’”
          (Yoosuf: 108).
        </Verse>

        <p>
          It will be more encompassing and eloquent considering the verse to say
          that, “Invitation to Allah is the way of the messengers – عليهم السلام
          – and their followers.”
        </p>

        <p>
          <strong>The second matter:</strong> Exhortation towards sincerity
          taken from His saying: ‘I invite unto Allah’ and that is why he said,
          “because for many of the people, if they would call, they invite to
          themselves.” The one who truly calls to Allah is the one who only
          intends to establish Allah’s religion while the one who calls to
          himself is the one who wills that his saying – whether right or wrong
          – be accepted.
        </p>

        <p>
          <strong>The third matter:</strong> That sure knowledge is from the
          obligations. It is deduced from His saying: ‘I invite unto Allah upon
          sure knowledge’. That sure knowledge is from the obligations stems
          from the fact that the caller must have knowledge of what he calls to,
          and Da’wah is obligatory. Therefore, the knowledge of that is also
          obligatory.
        </p>

        <p>
          <strong>The fourth matter</strong> – From the proofs of perfect
          Tawheed is that one holds Allah the Exalted far above any comparison:
          This is derived from His saying: “Glory be to Allah and I am not of
          the idolaters”. The phrase, ‘Subhaanallaah’ (glory be to Allah) is
          proof that He is One owing to His perfection.
        </p>
        <p>
          What is the meaning of al-Masaabbah (comparison)? That is, the
          comparing the Creator to the creature; since comparing the perfect
          with the defective renders the perfect defective.
        </p>
        <p className="italic">
          A poet said: <br />
          Don’t you see that the sword is under-estimated <br />
          When it is said: the sword cuts more than a stick.
        </p>

        <p>
          <strong>The fifth matter:</strong> From the ugliness of Shirk is that
          it involves comparing Allah (with His creatures); this is taken from
          His saying: “and I am not of the idolaters” after saying: “Glory be to
          Allah”.
        </p>

        <p>
          <strong>The sixth matter:</strong> And is one of the most important –
          distancing the Muslim from the Idolaters so that he does not become
          amongst them even if he does not commit Shirk based on Allah’s saying
          the Exalted: “and I am not of the idolaters”. He did not say: ‘I am an
          Idolater because if he should be amongst them, even if he is not an
          idolater, he will be apparently with them. Thus, Allah said to the
          angels:
        </p>

        <Verse tone="sky" arabic="﴿فَسَجَدُوا۟ إِلَّآ إِبْلِيسَ﴾">
          “Prostrate yourself before Aadam, they fell prostrate, all save
          Iblees” (Baqarah: 34).
        </Verse>

        <p>
          <strong>The seventh matter:</strong> That Tawheed is the first
          obligation; taken from his saying: “so, invite them first to the
          testimony that there is no deity worthy of worship in truth except
          Allah”. In another version, it reads: “That they should worship Allah
          alone”. Some scholars have said that the first obligation is
          “Meditation”; but the correct position is that Tawheed is the first
          obligation because knowing the Lord is pointed to by natural
          instincts.
        </p>

        <p>
          <strong>The eighth matter:</strong> That he should start with it
          before anything else; taken from his saying, “invite them to Islam and
          tell them what is obligatory on them in it of the rights of Allah the
          Exalted.”
        </p>

        <p>
          <strong>The ninth matter:</strong> That the meaning of, “that they
          should worship Allah alone” is in the meaning of the testimony: laa
          ilaaha illa Allah (there is no deity worthy of worship except Allah);
          deduced from the expression of the companion in one of the versions
          ‘the testimony that there is no deity worthy of worship except Allah’
          and in another, he said, ‘that they should worship Allah alone’.
        </p>

        <p>
          <strong>The tenth matter:</strong> That a person may be one of the
          people of the Book without knowing it or that he may be aware of it
          and not act upon it. What he means by his saying: ‘without knowing it
          or that he may be aware of it’ is the testimony that: laa ilaaha illa
          Allah (there is no deity worthy of worship except Allah). And it is
          deduced from his saying, ‘the first thing you should invite them to
          should be: the testimony that laa ilaaha illa Allah (there is no deity
          worthy of worship except Allah)’ since if they had known laa ‘ilaaha
          illa Allah and acted upon it, they would not need to be invited to it.
        </p>

        <p>
          <strong>The eleventh matter:</strong> Exhortation towards teaching in
          piecemeals; taken from his statement (ﷺ) to Mu’aadh (رضي الله عنه):
          ‘invite them to worship Allah alone. If they follow you in that, then
          teach them that Allah has made obligatory on them…’ to the end of the
          hadeeth.
        </p>

        <p>
          <strong>The twelfth matter:</strong> Starting with the most important,
          then the next in importance; deduced from his order – peace and
          blessings be upon him – to Mu’aadh to firstly invite to Tawheed, and
          then, the Salaah followed by Zakaah.
        </p>

        <p>
          <strong>The thirteenth matter:</strong> How Zakaah is given; taken
          from his saying, ‘and given to the poor among them’.
        </p>

        <p>
          <strong>The fourteenth matter:</strong> The scholar should explain
          ambiguities to the student. The meaning of ‘ambiguity’ here is,
          aspects of knowledge that are unclear; that is, of which he is
          ignorant. This is derived from his saying, Allah has made compulsory
          on them charity, to be taken from the rich among them and given to the
          poor among them. So, he explained that this charity is to be taken
          from the rich and that its receivers are the poor.
        </p>

        <p>
          <strong>The fifteenth matter:</strong> Prohibition of tampering with
          people’s wealth; derived from his saying, ‘you should be careful with
          their valuables’ the word, Iyyaka, (be careful) expresses warning, and
          to be warned (against a thing) necessitates its prohibition.
        </p>

        <p>
          <strong>The sixteenth matter:</strong> Avoiding the curse of the
          wronged. It is taken from his saying, ‘and be fearful of the curse of
          the wronged’.
        </p>

        <p>
          <strong>The seventeenth matter:</strong> Information that it (i.e. the
          curse) is not obstructed; derived from his saying, ‘because there is
          no barrier between it and Allah’. So, he connected exhortation or
          warning with the rulings (of the Sharee’ah) such that the exhortation
          prompts the mind while the warning restrains and keeps him from it.
          This is according to his saying, ‘and be fearful of the curse of the
          wronged. The soul may not keep off from it but when it is said:
          ‘because there is no barrier between it and Allah,’ it fears and hates
          it.
        </p>

        <p>
          <strong>The eighteenth matter:</strong> From the proofs of Tawheed is
          what befell the leader of the Prophets (ﷺ) and the leading beloved
          servants of Allah of difficulty, hunger and trials. Apparently, that
          the author (رحمه الله) was referring to the story of Khaybar owing to
          the severe hunger that it experienced during the time of the Prophet
          (ﷺ) to the extent that they ate donkey meat and garlic.(1) As for the
          trials, it is in reference to what happened during the caliphate of
          Alee (رضي الله عنه). As regards the difficulty, it is clear. The
          reason why those are from the proofs of these things demonstrates
          being patient and persevering in the face of these things demonstrates
          an individual’s sincerity in his Tawheed and that his goal is Allah
          and for that reason, he was patient over the difficulties.
        </p>

        <p>
          <strong>The nineteenth matter:</strong> His statement: “I shall give
          the flag to a man…” is one of the signs of prophethood because it
          actually happened. Thus, Alee (رضي الله عنه) truly loves Allah and His
          Prophet, and Allah and His prophet love him too.
        </p>

        <p>
          <strong>The twentieth matter:</strong> His spitting – peace and
          blessings be upon him – into his eyes is also one of its signs; owing
          to his spitting into his eyes and he got healed as if he had never
          suffered any pains.
        </p>

        <p>
          <strong>The twenty-first matter:</strong> The excellence of Alee (رضي
          الله عنه); this is clear because he loves Allah and His Prophet, and
          Allah and His Prophet love him too.
        </p>

        <p>
          <strong>The twenty-second matter:</strong> The excellence of the
          companions for their gathering that night and being busy away from the
          glad tidings of the conquest for the fact that they busied themselves
          with trying to find out the one who loves Allah and His Prophet, and
          that Allah and His Prophet love and not the gladditings of the
          conquest.
        </p>

        <p>
          <strong>The twenty-third matter:</strong> Belief in Preordainment
          since it (i.e. the banner) came to the one who had not striven for it
          and its been kept from the one who strove for it owing to the fact
          that the companions (رضي الله عنهم) went early in the morning to the
          messenger of Allah (ﷺ) with everyone hoping to be given (the flag) but
          none of them was given. However, Alee bin Abee Taalib (رضي الله عنه)
          was sick and could not vie for it, yet he was given the flag.
        </p>

        <p>
          <strong>The twenty-fourth matter:</strong> The mannerliness in his
          saying: ‘proceed slowly’; and that is from the perspective that he
          ordered him to be at ease and hasty.
        </p>

        <p>
          <strong>The twenty-fifth matter:</strong> That inviting to Islam comes
          before fighting; based on his statement, ‘When you get to their area,
          invite them to Islam.’
        </p>

        <p>
          <strong>The twenty-sixth matter:</strong> It (i.e. fighting) is
          legitimate vis-à-vis those who had been invited previously and even
          fought.
        </p>

        <p>
          <strong>The twenty-seventh matter:</strong> Invitation should be with
          wisdom based on his saying: “…and tell them what is obligatory on
          them”; since it is from wisdom that the invitation is completed by
          first telling them about Islam and then, telling them the obligations
          upon him from Allah’s rights. It does not suffice that you introduce
          Islam to him since he may or may not act upon it. Infact, he has to be
          given attention so that he does not return to disbelief.
        </p>

        <p>
          <strong>The twenty-eight matter:</strong> Knowing Allah’s rights in
          Islam taken from his saying, ‘…and tell them what is obligatory on
          them in it of the rights of Allah the Exalted.’
        </p>

        <p>
          <strong>The twenty-ninth matter:</strong> The reward of the one from
          whose hands a single person becomes guided; based on his statement,
          ‘That Allah guides a person through you is better for you than a red
          camel’. That is, it is better for you than all that is desired in this
          world. The meaning is not as some put it, ‘it is better for you than
          for you to give a red camel in charity’.
        </p>

        <p>
          <strong>The thirtieth matter:</strong> Swearing while giving religious
          verdicts; so, the Prophet (ﷺ) swore while he was not requested to do
          so. The point in that is to exhort him being a means of Allah’s
          guidance and stress it.
        </p>
        <p>
          However, it is not right to swear while giving religious verdicts
          except due to a benefit or advantage because the listener may feel
          that the legal authority would not have sworn if not for some doubts
          he had.
        </p>

        <p>
          Imaam Ahmad (رحمه الله) would sometimes say in his responses, “By
          Allah!” Allah ordered His Prophet (ﷺ) to swear on three occasions in
          the Qur’aan:
        </p>

        <Verse
          tone="sky"
          arabic="﴿وَيَسْتَنبِـُٔونَكَ أَحَقٌّ هُوَ ۖ قُلْ إِى وَرَبِّىٓ إِنَّهُۥ لَحَقٌّۭ وَمَآ أَنتُم بِمُعْجِزِينَ ﴾"
        >
          “And they asked you to inform them (saying): is it true? Say: Yea, by
          my Lord, verily it is true.” (Yoonus: 53).
        </Verse>

        <Verse
          tone="sky"
          arabic="﴿زَعَمَ ٱلَّذِينَ كَفَرُوٓا۟ أَن لَّن يُبْعَثُوا۟ ۚ قُلْ بَلَىٰ وَرَبِّى لَتُبْعَثُنَّ ثُمَّ لَتُنَبَّؤُنَّ بِمَا عَمِلْتُمْ ۚ وَذَٰلِكَ عَلَى ٱللَّهِ يَسِيرٌۭ ﴾"
        >
          “Those who disbelieve assert that they would not be raised again. Say
          (unto them O Muhammad): Yea, verily, by my Lord! You will be raised
          again.” (Taghābun: 8).
        </Verse>

        <Verse
          tone="sky"
          arabic="﴿وَقَالَ ٱلَّذِينَ كَفَرُوا۟ لَا تَأْتِينَا ٱلسَّاعَةُ ۖ قُلْ بَلَىٰ وَرَبِّى لَتَأْتِيَنَّكُمْ ﴾"
        >
          “Those who disbelieve say: ‘The hour will never come to us,’ Say:
          ‘Nay, by my Lord, but it is coming unto you surely…’” (Saba’: 3).
        </Verse>

        <p>
          So if there is an advantage in swearing whether ordinarily or in
          response to a question, such is allowed and in certain instances
          infact, it may be required.
        </p>
      </Section>
    </>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function InvitationToTestifyingPage() {
  const [view, setView] = useState("read"); // 'read' | 'questions'
  const reduce = useReducedMotion();

  return (
    <main className="relative mx-auto max-w-7xl px-6 pb-16">
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
        className="mt-6 rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 p-6 ring-1 ring-black/5"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Invitation to Testifying that{" "}
              <span className="text-emerald-700">Lā ilāha illa Allāh</span>
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-7 text-slate-700">
              Why īmān is <HL>incomplete without da‘wah</HL>, how to call upon{" "}
              <HL tone="sky">baṣīrah</HL>, and the Prophet’s ﷺ method with
              Muʿādh and ʿAlī — placing <HL>tawḥīd</HL> first, then prayer, then
              alms.
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

      {/* READ view */}
      {view === "read" ? (
        <div className="mt-6 space-y-6">
          <main id="content" className="mx-auto max-w-7xl px-6 pb-16">
            <section className="mt-6 space-y-6">
              <Section
                id="chapter-overview"
                tone="emerald"
                title="Chapter overview"
                subtitle="Belief + invitation; the prophetic model"
              >
                <p>
                  The author first shows that <HL>belief in tawḥīd</HL> must be
                  accompanied by <HL>inviting others to it</HL> — otherwise it
                  is defective. This page gathers the evidences, method, and the
                  “Important Matters” list, and presents them with clear
                  highlights.
                </p>
                <Callout tone="sky">
                  In the next chunks, we’ll insert the chapter’s{" "}
                  <em>verbatim text</em> into the sections below (Qur’ān,
                  ḥadīth, commentary, grammar notes), preserving every detail.
                </Callout>
              </Section>

              {/* EMPTY SCAFFOLD SECTIONS TO FILL WITH ARTICLE TEXT (next chunks) */}
              <ContentPart1 />
            </section>
          </main>
        </div>
      ) : (
        <QuestionBank />
      )}
    </main>
  );
}
