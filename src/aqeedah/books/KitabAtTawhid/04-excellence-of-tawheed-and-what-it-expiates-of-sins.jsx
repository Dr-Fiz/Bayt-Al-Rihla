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
 * Kitāb at-Tawḥīd — Chapter 4
 * Title: Excellence of Tawḥīd & What It Expiates of Sins
 * Route hint: /aqeedah/books/kitab-at-tawhid/excellence-of-tawheed
 * This CHUNK delivers:
 *  - Page shell (no sticky bar), hero, segmented view toggle
 *  - Reusable UI kit (Card, Pill, Section, Verse, HL, Callout)
 *  - Robust Question Bank (10 items) w/ reveal + explanations
 * Next chunks will add: full content sections (ALL article text), organized
 * with colorful highlights for easy learning.
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
/** 10 questions focused on excellence of Tawḥīd, An‘ām 82, and ḥadīth points */
const QUESTIONS = [
  {
    id: "C4-Q1",
    prompt:
      "Why does the chapter pair “Excellence of Tawḥīd” with “What it expiates of sins”?",
    options: [
      "To show tawḥīd is optional",
      "Because expiation is unrelated to tawḥīd",
      "To show that among its virtues is expiation of sins",
      "To contrast two opposing ideas",
    ],
    answerIndex: 2,
    explanation:
      "The author highlights tawḥīd’s virtue and one of its outcomes: it expiates sins.",
  },
  {
    id: "C4-Q2",
    prompt:
      "According to the commentary, what does “Those who believe and do not mix their belief with injustice” (6:82) mean by ‘injustice’?",
    options: [
      "Any legal shortcoming only",
      "Shirk (associating partners with Allah)",
      "Only oppression of people",
      "Missing optional deeds",
    ],
    answerIndex: 1,
    explanation:
      "The Prophet ﷺ explained ‘ẓulm’ here as shirk, citing Luqmān 31:13.",
  },
  {
    id: "C4-Q3",
    prompt:
      "What level of security (amn) does a believer who commits major sins have, per the text?",
    options: [
      "Absolute security in all respects",
      "No security at all",
      "Security from eternal Hell but not necessarily from punishment",
      "Security only if he performs ḥajj",
    ],
    answerIndex: 2,
    explanation:
      "He’s under Allah’s will: safe from eternal Hell yet not fully secure from punishment.",
  },
  {
    id: "C4-Q4",
    prompt:
      "What is wrong with defining tawḥīd as merely ‘no creator but Allah’ (theologians’ definition)?",
    options: [
      "It is identical to Quraysh’s creed",
      "It reduces tawḥīd to rubūbiyyah and ignores ulūhiyyah (exclusive worship)",
      "It is a weak Arabic phrasing only",
      "It rejects Allah’s names and attributes",
    ],
    answerIndex: 1,
    explanation:
      "Quraysh affirmed Allah as Creator; true tawḥīd demands singling Allah out in worship.",
  },
  {
    id: "C4-Q5",
    prompt:
      "What does the testimony ‘lā ilāha illā Allāh’ require beyond utterance?",
    options: [
      "Nothing at all",
      "Only belief in the heart, no actions",
      "Acknowledgement by tongue, belief in the heart, and attestation by deeds",
      "Seasonal charity",
    ],
    answerIndex: 2,
    explanation:
      "Shahādah is tongue + heart + limbs; mere words (like the hypocrites) don’t suffice.",
  },
  {
    id: "C4-Q6",
    prompt:
      "In the ḥadīth of ‘Ubādah, what is affirmed about ʿĪsā عليه السلام to refute extremes?",
    options: [
      "He is an independent deity",
      "He is a servant and messenger, a word cast to Mary, and a spirit from Him",
      "He is only a spirit, not a human",
      "He is a prophet with no revelation",
    ],
    answerIndex: 1,
    explanation:
      "The text clarifies he is a human messenger created by Allah—neither divine nor illegitimate.",
  },
  {
    id: "C4-Q7",
    prompt:
      "What condition accompanies “Allah has made Hell forbidden for the one who says lā ilāha illā Allāh” (ḥadīth of ‘Itbān)?",
    options: [
      "Reciting it only once in life",
      "Saying it loudly",
      "Saying it seeking Allah’s Face (ikhlāṣ), which entails obedience",
      "Saying it in a group",
    ],
    answerIndex: 2,
    explanation:
      "The wording adds the condition of sincerity—seeking Allah’s Face—implying righteous action.",
  },
  {
    id: "C4-Q8",
    prompt:
      "What does the ḥadīth qudsī to Ibn Ādam teach regarding tawḥīd and massive sins?",
    options: [
      "Massive sins are unforgivable even with tawḥīd",
      "Forgiveness like the earth’s size if one meets Allah without shirk",
      "Only minor sins are forgiven",
      "Forgiveness is guaranteed without conditions",
    ],
    answerIndex: 1,
    explanation:
      "If one meets Allah not associating partners, Allah comes with forgiveness of like magnitude.",
  },
  {
    id: "C4-Q9",
    prompt:
      "How does the text respond to claims that the Prophet ﷺ possessed superhuman ‘light’ eliminating shadows?",
    options: [
      "It accepts them as sound creed",
      "It suspends judgment",
      "It rejects them as extremism; he is a human servant and messenger",
      "It only criticizes poetry about it",
    ],
    answerIndex: 2,
    explanation:
      "The commentary rebuts exaggerations and reaffirms his servitude and messengership.",
  },
  {
    id: "C4-Q10",
    prompt:
      "Why does the author stress planting tawḥīd al-ulūhiyyah among Muslims today?",
    options: [
      "Because most people deny creation",
      "Because rubūbiyyah is the controversial point",
      "Because many fall into worship-related shirk while affirming rubūbiyyah",
      "Because it is a purely academic topic",
    ],
    answerIndex: 2,
    explanation:
      "People rarely deny rubūbiyyah, but many slip into acts that compromise exclusive worship.",
  },
  {
    id: "Q4-01",
    prompt:
      "What does the chapter title “Excellence of Tawḥīd & What It Expiates of Sins” mainly set out to prove?",
    choices: [
      { key: "A", text: "That tawḥīd is optional" },
      { key: "B", text: "Its virtue and that it erases sins" },
      { key: "C", text: "That actions are unnecessary" },
      { key: "D", text: "That only scholars benefit from tawḥīd" },
    ],
    answer: "B",
    explanation:
      "The author clarifies tawḥīd’s superiority and that among its fruits is expiation of sins.",
  },
  {
    id: "Q4-02",
    prompt:
      "Does establishing a virtue for something (faḍl) mean it is not obligatory?",
    choices: [
      { key: "A", text: "Yes; virtue negates obligation" },
      { key: "B", text: "No; virtue can be for the most obligatory acts" },
      { key: "C", text: "Only if there is consensus" },
      { key: "D", text: "Only in Medinan verses" },
    ],
    answer: "B",
    explanation:
      "Like congregational prayer: it has great virtue and is still obligatory. Tawḥīd is most obligatory and has special virtues.",
  },
  {
    id: "Q4-03",
    prompt:
      "How is Dhāriyāt 56 (“I did not create jinn and mankind except to worship Me”) explained in the chapter?",
    choices: [
      { key: "A", text: "Worship = culture and arts" },
      { key: "B", text: "Worship is only fear" },
      { key: "C", text: "Acts of worship are unacceptable without tawḥīd" },
      { key: "D", text: "It refers only to angels" },
    ],
    answer: "C",
    explanation:
      "The wisdom of creation is Allah’s worship, and that worship is not valid without tawḥīd.",
  },
  {
    id: "Q4-04",
    prompt:
      "One virtue of tawḥīd mentioned is that it is the ‘mainstay of zeal’ to obey Allah. Why?",
    choices: [
      { key: "A", text: "Because it removes all desires" },
      {
        key: "B",
        text: "Because a muwaḥḥid acts for Allah in secret and public, not for people",
      },
      { key: "C", text: "Because it guarantees wealth" },
      { key: "D", text: "Because it abolishes obligations" },
    ],
    answer: "B",
    explanation:
      "Sincerity to Allah makes one consistent in private and public action.",
  },
  {
    id: "Q4-05",
    prompt:
      "In Anʿām 82, “those who believe and do not mix their faith with ẓulm” — what is ẓulm here?",
    choices: [
      { key: "A", text: "Minor sins" },
      { key: "B", text: "Shirk" },
      { key: "C", text: "Bad manners" },
      { key: "D", text: "Only injustice to people" },
    ],
    answer: "B",
    explanation:
      "The Prophet ﷺ explained it with Luqmān 13: “Indeed, shirk is a great ẓulm.”",
  },
  {
    id: "Q4-06",
    prompt:
      "What level of security (amn) does a believer receive who has some sins but no shirk?",
    choices: [
      { key: "A", text: "No security at all" },
      {
        key: "B",
        text: "Partial security; not eternal Hell, but punishment is possible",
      },
      { key: "C", text: "Guaranteed no punishment whatsoever" },
      { key: "D", text: "Security only in the dunya" },
    ],
    answer: "B",
    explanation:
      "Perfect īmān yields complete amn; deficient īmān yields general/partial amn.",
  },
  {
    id: "Q4-07",
    prompt:
      "Which verse states that Allah forgives everything short of shirk for whom He wills?",
    choices: [
      { key: "A", text: "Nisāʾ 116" },
      { key: "B", text: "Fātiḥah 4" },
      { key: "C", text: "Baqarah 255" },
      { key: "D", text: "Kahf 110" },
    ],
    answer: "A",
    explanation:
      "“Indeed, Allah does not forgive shirk, but forgives less than that for whom He wills.”",
  },
  {
    id: "Q4-08",
    prompt:
      "Ibrāhīm’s argument with his people in Anʿām 81–82 highlights what principle?",
    choices: [
      { key: "A", text: "Fear the idols more than Allah" },
      {
        key: "B",
        text: "Who abandons shirk is more entitled to security and guidance",
      },
      { key: "C", text: "Only heritage matters" },
      { key: "D", text: "Security belongs to idol-worshippers" },
    ],
    answer: "B",
    explanation:
      "Security and guidance are for believers who do not mix faith with shirk.",
  },
  {
    id: "Q4-09",
    prompt:
      "In the ḥadīth of ʿUbādah, what is Allah’s right over His servants?",
    choices: [
      { key: "A", text: "To obey leaders unconditionally" },
      { key: "B", text: "To be worshipped without any shirk" },
      { key: "C", text: "To be described without Names" },
      { key: "D", text: "To be known philosophically only" },
    ],
    answer: "B",
    explanation: "Allah’s right is His exclusive worship with no partners.",
  },
  {
    id: "Q4-10",
    prompt:
      "What is the servants’ right with Allah mentioned alongside His right?",
    choices: [
      { key: "A", text: "Wealth in this world" },
      { key: "B", text: "Paradise without actions" },
      { key: "C", text: "That He will not punish those who avoid shirk" },
      { key: "D", text: "Exemption from trials" },
    ],
    answer: "C",
    explanation:
      "He will not punish whoever worships Him without associating partners.",
  },
  {
    id: "Q4-11",
    prompt:
      "Why did the Prophet ﷺ initially discourage publicizing the glad tidings to people?",
    choices: [
      { key: "A", text: "It was abrogated" },
      { key: "B", text: "Fear they rely on it and become lax" },
      { key: "C", text: "Companions refused it" },
      { key: "D", text: "It concerned only angels" },
    ],
    answer: "B",
    explanation:
      "To prevent people from neglecting deeds by over-relying on the news.",
  },
  {
    id: "Q4-12",
    prompt:
      "In this chapter, what is the meaning of ‘ilāh’ in lā ilāha illā Allāh?",
    choices: [
      { key: "A", text: "The Creator only" },
      { key: "B", text: "The One worshipped with love and veneration" },
      { key: "C", text: "A tribal chief" },
      { key: "D", text: "Any unseen force" },
    ],
    answer: "B",
    explanation:
      "Ilāh is the object of worship; Quraysh believed in a Creator but rejected exclusive worship.",
  },
  {
    id: "Q4-13",
    prompt:
      "Why would Quraysh not have opposed the Prophet ﷺ if tawḥīd meant only ‘no creator but Allah’?",
    choices: [
      { key: "A", text: "Because they opposed only charity" },
      { key: "B", text: "They already affirmed a sole Creator" },
      { key: "C", text: "They disliked Arabic grammar" },
      { key: "D", text: "They wanted more idols" },
    ],
    answer: "B",
    explanation:
      "Their dispute was Ulūhiyyah (exclusive worship), not Rubūbiyyah (creation/lordship).",
  },
  {
    id: "Q4-14",
    prompt:
      "Which set correctly lists the four categories mentioned: major/minor and shirk/sin?",
    choices: [
      { key: "A", text: "Major sin, minor sin, harshness, negligence" },
      { key: "B", text: "Major shirk, minor shirk, major sin, minor sin" },
      { key: "C", text: "Kufr, nifāq, bidʿah, fisq" },
      { key: "D", text: "Hawl, quwwah, sabr, shukr" },
    ],
    answer: "B",
    explanation:
      "The text divides wrongs into four: two of shirk, two of sins.",
  },
  {
    id: "Q4-15",
    prompt:
      "What did Ibn ʿAbbās say when told the Jews ‘don’t get whispers in prayer’?",
    choices: [
      { key: "A", text: "They are the most devout" },
      { key: "B", text: "Shayṭān attacks only ruined houses" },
      { key: "C", text: "Whispers prove hypocrisy" },
      { key: "D", text: "Whispers are always kufr" },
    ],
    answer: "B",
    explanation:
      "He likened the heart without faith to a ruined house Shayṭān leaves; whispers target a sound heart.",
  },
  {
    id: "Q4-16",
    prompt: "What are the components of a valid testimony (shahādah) in Islam?",
    choices: [
      { key: "A", text: "Tongue only" },
      { key: "B", text: "Heart only" },
      { key: "C", text: "Tongue + belief in heart + limb compliance" },
      { key: "D", text: "Public acclaim" },
    ],
    answer: "C",
    explanation:
      "The hypocrites’ verbal witness didn’t benefit them due to lack of belief and action.",
  },
  {
    id: "Q4-17",
    prompt:
      "When threatened by the Bedouin with the drawn sword, the Prophet ﷺ said, “Allah will protect me.” This illustrates…",
    choices: [
      { key: "A", text: "Tawḥīd ar-Rubūbiyyah and tawakkul" },
      { key: "B", text: "Seeking help only from companions" },
      { key: "C", text: "Permissibility of despair" },
      { key: "D", text: "Fatalism" },
    ],
    answer: "A",
    explanation:
      "He placed reliance on Allah, the sole Disposer of harm and benefit.",
  },
  {
    id: "Q4-18",
    prompt:
      "Claiming the Prophet ﷺ has no shadow or that his light illuminates his shadow is…",
    choices: [
      { key: "A", text: "Sound ʿaqīdah" },
      { key: "B", text: "A moderate view" },
      { key: "C", text: "An unfounded exaggeration" },
      { key: "D", text: "A necessary belief" },
    ],
    answer: "C",
    explanation:
      "The chapter refutes such ghulūw; ʿĀʾishah’s report about no lamps shows normal human qualities.",
  },
  {
    id: "Q4-19",
    prompt:
      "What does it mean that ʿĪsā (AS) is ‘His word’ and ‘a spirit from Him’?",
    choices: [
      { key: "A", text: "He is Allah’s literal attribute" },
      {
        key: "B",
        text: "He is a created being by the word ‘Be’, honoured with a created spirit from Allah",
      },
      { key: "C", text: "He is part of Allah" },
      { key: "D", text: "He is only a spirit with no body" },
    ],
    answer: "B",
    explanation:
      "‘Word’ = created by ‘Be’; ‘spirit from Him’ = a created spirit originating from Allah, not a part of Him.",
  },
  {
    id: "Q4-20",
    prompt:
      "The preposition “min” in “rūḥun minhu” (a spirit from Him) indicates…",
    choices: [
      { key: "A", text: "Partitive (a piece of Allah)" },
      { key: "B", text: "Origination/source, not part of the Divine Essence" },
      { key: "C", text: "Locality" },
      { key: "D", text: "Plurality" },
    ],
    answer: "B",
    explanation: "It shows origin/honour, not division of Allah’s Essence.",
  },
  {
    id: "Q4-21",
    prompt: "Which classification about things linked to Allah is correct?",
    choices: [
      { key: "A", text: "All are uncreated" },
      { key: "B", text: "All are created" },
      {
        key: "C",
        text: "Separate entities (created), specific creatures linked for honour (created), and pure attributes (uncreated)",
      },
      { key: "D", text: "It cannot be discussed" },
    ],
    answer: "C",
    explanation:
      "The chapter lists three: created entities, honoured created specifics, and attributes attached to His Essence.",
  },
  {
    id: "Q4-22",
    prompt: "Which Qur’ānic statement proves the humanity of ʿĪsā and Maryam?",
    choices: [
      { key: "A", text: "They walked on water" },
      { key: "B", text: "They both ate food" },
      { key: "C", text: "They never slept" },
      { key: "D", text: "They pre-existed creation" },
    ],
    answer: "B",
    explanation:
      "Māʾidah 75: ‘They both used to eat food’ — clear evidence of humanity.",
  },
  {
    id: "Q4-23",
    prompt: "What are the two kinds of admission into Paradise discussed?",
    choices: [
      { key: "A", text: "Immediate for all; delayed for prophets" },
      {
        key: "B",
        text: "Complete (no prior punishment) and incomplete (after due punishment)",
      },
      { key: "C", text: "By lineage and by wealth" },
      { key: "D", text: "By dreams and by visions" },
    ],
    answer: "B",
    explanation:
      "Perfect doers enter without punishment; others may be punished then admitted.",
  },
  {
    id: "Q4-24",
    prompt:
      "In the ḥadīth of ʿItbān, what condition is attached to ‘Hell is forbidden’?",
    choices: [
      { key: "A", text: "Merely saying the words once" },
      {
        key: "B",
        text: "Saying lā ilāha illā Allāh seeking Allah’s Face (sincerity)",
      },
      { key: "C", text: "Avoiding minor sins only" },
      { key: "D", text: "Memorising the Qurʾān" },
    ],
    answer: "B",
    explanation:
      "Ikhlāṣ is explicit: ‘seeking the Face of Allah’ — not mere utterance.",
  },
  {
    id: "Q4-25",
    prompt:
      "In the report of Mūsā (AS) and ‘lā ilāha illā Allāh’, what was taught about its weight?",
    choices: [
      { key: "A", text: "Equal to a mountain" },
      {
        key: "B",
        text: "Heavier than the seven heavens and seven earths together",
      },
      { key: "C", text: "Lighter than deeds" },
      { key: "D", text: "Only for Banī Isrāʾīl" },
    ],
    answer: "B",
    explanation:
      "The statement outweighs the sum of the heavens and earths, showing its supreme virtue.",
  },
  {
    id: "Q4-26",
    prompt:
      "The ḥadīth qudsī ‘O son of Ādam…’ promises massive forgiveness under what condition?",
    choices: [
      { key: "A", text: "Performing Ḥajj once" },
      { key: "B", text: "Meeting Allah without associating anything with Him" },
      { key: "C", text: "Building a masjid" },
      { key: "D", text: "Giving half one’s wealth" },
    ],
    answer: "B",
    explanation:
      "The text conditions forgiveness of sins ‘like the earth’ upon meeting Allah free of shirk.",
  },
  {
    id: "Q4-27",
    prompt:
      "What does the phrase ‘seeking Allah’s Face’ indicate theologically?",
    choices: [
      { key: "A", text: "A metaphor denying attributes" },
      {
        key: "B",
        text: "Affirmation of the Face attribute and the intention of ikhlāṣ",
      },
      { key: "C", text: "Only direction" },
      { key: "D", text: "An angelic title" },
    ],
    answer: "B",
    explanation:
      "It signals sincerity and affirms the attribute as taught by Ahl al-Sunnah.",
  },
  {
    id: "Q4-28",
    prompt:
      "Why did the Prophet ﷺ answer, “Allah and His Messenger know best,” receive approval in this context?",
    choices: [
      { key: "A", text: "Because it was small talk" },
      {
        key: "B",
        text: "Because it was a Sharʿī question he ﷺ had revelation about",
      },
      { key: "C", text: "Because it was about weather" },
      { key: "D", text: "Because grammar requires it" },
    ],
    answer: "B",
    explanation:
      "The phrase is appropriate in Sharʿī matters clarified by the Prophet ﷺ, not mundane unknowns.",
  },
  {
    id: "Q4-29",
    prompt:
      "According to the chapter, sins often stem from what underlying problem?",
    choices: [
      { key: "A", text: "Genetics" },
      { key: "B", text: "Following one’s desire (a facet of shirk)" },
      { key: "C", text: "Calendar differences" },
      { key: "D", text: "Language barriers" },
    ],
    answer: "B",
    explanation:
      "Cited: ‘Have you seen he who takes his desire as his god?’ (Jāthiyah 23).",
  },
  {
    id: "Q4-30",
    prompt:
      "How does the chapter treat claims that ‘lā ilāha illā Allāh’ alone, without its conditions, guarantees salvation?",
    choices: [
      { key: "A", text: "Approves without condition" },
      {
        key: "B",
        text: "Rejects; it must be with sincerity and the deeds it necessitates",
      },
      { key: "C", text: "Only for scholars" },
      { key: "D", text: "Only during Ramadan" },
    ],
    answer: "B",
    explanation:
      "The texts tie salvation to ikhlāṣ and the practice that true tawḥīd entails.",
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
/* ------------------------ Content: Part 1 (Chunk 2) ------------------------ */

function ContentPart1() {
  return (
    <>
      <Section
        id="c4-aims"
        tone="indigo"
        title="Why this chapter matters"
        subtitle="Excellence of Tawḥīd and how it expiates sins."
      >
        <p>
          The author first established that <HL>tawḥīd is obligatory</HL> and
          the key by which all worship is accepted (cf.{" "}
          <HL tone="sky">51:56</HL>). Here he shows its{" "}
          <HL>excellence (faḍl)</HL> and <HL tone="amber">what it expiates</HL>{" "}
          of sins.
        </p>

        <Callout tone="sky">
          A deed can be both <em>obligatory</em> and <em>virtuous</em>. Tawḥīd
          is the most obligatory of deeds, yet it also has distinct virtues and
          outcomes.
        </Callout>
      </Section>

      <Section
        id="c4-virtues"
        tone="emerald"
        title="From the virtues of Tawḥīd"
        subtitle="Sincerity in every state; true security and guidance."
      >
        <ul className="list-disc pl-6 space-y-2">
          <li>
            It is the <HL>mainstay of zeal to obey Allah</HL>. The muwaḥḥid acts
            for Allah in secret and in public, unlike a show-off who performs
            only when seen. One of the salaf said:
            <blockquote className="mt-2 rounded-lg border border-slate-200 bg-white/70 p-3 italic">
              “I strongly wish to seek nearness to Allah with an act of
              obedience not known to anyone except Him.”
            </blockquote>
          </li>
          <li>
            The people of tawḥīd are the <HL>secure</HL> and <HL>guided</HL>:
          </li>
        </ul>

        <div className="mt-4 space-y-3">
          <Verse
            tone="emerald"
            arabic="ٱلَّذِينَ آمَنُوا وَلَمْ يَلْبِسُوا۟ إِيمَـٰنَهُم بِظُلْمٍ أُو۟لَـٰٓئِكَ لَهُمُ ٱلْأَمْنُ وَهُم مُّهْتَدُونَ"
          >
            “Those who believe and do not mix their belief with injustice — for
            them is security, and they are rightly guided.” (Al-An‘ām 6:82)
          </Verse>

          <p>
            <strong>“Mix not up”</strong> = do not combine īmān with ẓulm. Here{" "}
            <HL>ẓulm means shirk</HL>. When the verse came, the Companions were
            distressed — “Who among us is not unjust to himself?” — so the
            Prophet ﷺ clarified it with Luqmān’s words:
          </p>

          <Verse tone="amber" arabic="إِنَّ ٱلشِّرْكَ لَظُلْمٌ عَظِيمٌ">
            “Indeed, shirk is a tremendous injustice.” (Luqmān 31:13)
          </Verse>

          <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
            <p className="font-semibold">Levels of ẓulm mentioned:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                <HL tone="rose">Worst ẓulm:</HL> shirk — against Allah’s right.
              </li>
              <li>
                <HL>Against oneself:</HL> e.g., excesses like standing all night
                without rest.
              </li>
              <li>
                <HL>Against others:</HL> oppression by striking, killing, or
                usurping wealth.
              </li>
            </ul>
          </div>

          <p className="mt-3">
            <strong>Security (amn) follows īmān.</strong> If īmān is{" "}
            <HL>perfect</HL> (untainted), security is <HL>complete</HL>. If īmān
            is <HL>deficient</HL>, then security is partial: for major sinners,
            there is security from <em>eternity</em> in Hell, but not
            necessarily from punishment; they are under Allah’s Will. As Allah
            says:
          </p>

          <Verse
            tone="rose"
            arabic="إِنَّ ٱللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِۦ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَآءُ"
          >
            “Allah does not forgive that partners be associated with Him, but He
            forgives whatever is less than that for whom He wills.” (An-Nisāʾ
            4:116)
          </Verse>
        </div>
      </Section>

      <Section
        id="c4-ibrahim"
        tone="sky"
        title="Ibrāhīm’s argument and the promised security"
        subtitle="Security belongs to those who avoid shirk."
      >
        <Verse
          tone="sky"
          arabic="وَكَيْفَ أَخَافُ مَآ أَشْرَكْتُمْ وَلَا تَخَافُونَ أَنَّكُمْ أَشْرَكْتُم بِٱللَّهِ مَا لَمْ يُنَزِّلْ بِهِۦ عَلَيْكُمْ سُلْطَـٰنًا"
        >
          “How should I fear what you associate [with Allah], while you do not
          fear that you have associated with Allah that for which He has sent
          down no authority?” (Al-An‘ām 6:81)
        </Verse>

        <p>
          Allah then judged in his favour and linked guidance and security to
          pure īmān (6:82), and said:
        </p>

        <Verse
          tone="indigo"
          arabic="وَتِلْكَ حُجَّتُنَآ ءَاتَيْنَـٰهَآ إِبْرَٰهِيمَ عَلَىٰ قَوْمِهِۦ"
        >
          “That was Our argument which We gave Ibrāhīm against his people.”
          (Al-An‘ām 6:83)
        </Verse>

        <p>As for the wrongdoers in the Hereafter:</p>

        <Verse
          tone="rose"
          arabic="ٱحْشُرُوا ٱلَّذِينَ ظَلَمُوا وَأَزْوَٰجَهُمْ وَمَا كَانُوا۟ يَعْبُدُونَ مِن دُونِ ٱللَّهِ فَٱهْدُوهُمْ إِلَىٰ صِرَٰطِ ٱلْجَحِيمِ"
        >
          “Assemble those who acted wrongfully along with their kinds and what
          they used to worship beside Allah, and lead them to the path of Hell.”
          (As-Ṣāffāt 37:22–23)
        </Verse>

        <Callout tone="emerald">
          <strong>Relevance to the chapter:</strong> Allah promises{" "}
          <HL>security and guidance</HL> for the one who does not associate
          partners with Him — a core virtue of Tawḥīd.
        </Callout>
      </Section>
    </>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function ExcellenceOfTawheedPage() {
  const [view, setView] = useState("read"); // 'read' | 'questions'
  const reduce = useReducedMotion();

  return (
    <main className="relative mx-auto max-w-7xl px-6 pb-16">
      {/* Back link (optional) */}
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
              Excellence of <span className="text-emerald-700">Tawḥīd</span> &
              What It Expiates of Sins
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-7 text-slate-700">
              Explore why <HL>tawḥīd</HL> is the heart of Islam and how, when
              fulfilled sincerely, it becomes a cause for{" "}
              <HL tone="sky">security</HL>, guidance, and the
              <HL tone="amber">expiation of sins</HL>.
            </p>
          </div>

          {/* Segmented view toggle (Read / Questions) */}
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

      {/* READ view (content will be inserted in next chunks) */}
      {view === "read" ? (
        <div className="mt-6 space-y-6">
          <main id="content" className="mx-auto max-w-7xl px-6 pb-16">
            <section className="mt-6 space-y-6">
              {/* INTRO / WHY THIS CHAPTER MATTERS */}
              <Section
                id="intro"
                tone="emerald"
                title="Chapter overview"
                subtitle="Tawḥīd is obligatory—and it has distinct virtues that expiate sins."
              >
                <p>
                  The author first established that{" "}
                  <HL>tawḥīd is obligatory</HL> and the key by which all worship
                  is accepted (cf. <HL tone="sky">51:56</HL>). Here he shows its{" "}
                  <HL>excellence (faḍl)</HL> and{" "}
                  <HL tone="amber">what it expiates</HL> of sins.
                </p>
                <Callout tone="sky">
                  A deed may be both <em>obligatory</em> and <em>virtuous</em>.
                  Tawḥīd is the most obligatory of deeds; yet it also carries
                  unique virtues and fruits.
                </Callout>
              </Section>

              {/* VIRTUES OF TAWḤĪD */}
              <Section
                id="virtues"
                tone="emerald"
                title="From the virtues of Tawḥīd"
                subtitle="Sincerity in every state; true security and guidance."
              >
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    It is the <HL>mainstay of zeal to obey Allah</HL>. The
                    muwaḥḥid acts for Allah in secret and in public, unlike a
                    show-off who performs only when seen. One of the salaf said:
                    <blockquote className="mt-2 rounded-lg border border-slate-200 bg-white/70 p-3 italic">
                      “I strongly wish to seek nearness to Allah with an act of
                      obedience not known to anyone except Him.”
                    </blockquote>
                  </li>
                  <li>
                    The people of tawḥīd are the <HL>secure</HL> and{" "}
                    <HL>guided</HL>.
                  </li>
                </ul>

                <div className="mt-4 space-y-3">
                  <Verse
                    tone="emerald"
                    arabic="ٱلَّذِينَ آمَنُوا وَلَمْ يَلْبِسُوا۟ إِيمَـٰنَهُم بِظُلْمٍ أُو۟لَـٰٓئِكَ لَهُمُ ٱلْأَمْنُ وَهُم مُّهْتَدُونَ"
                  >
                    “Those who believe and do not mix their belief with
                    injustice — for them is security, and they are rightly
                    guided.” (Al-Anʿām 6:82)
                  </Verse>

                  <p>
                    <strong>“Mix not up”</strong> = do not combine īmān with
                    ẓulm. Here <HL>ẓulm means shirk</HL>. When the verse came,
                    the Companions said, “Who among us is not unjust to
                    himself?” The Prophet ﷺ clarified it with Luqmān’s words:
                  </p>

                  <Verse tone="amber" arabic="إِنَّ ٱلشِّرْكَ لَظُلْمٌ عَظِيمٌ">
                    “Indeed, shirk is a tremendous injustice.” (Luqmān 31:13)
                  </Verse>

                  <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                    <p className="font-semibold">Levels of ẓulm:</p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>
                        <HL tone="rose">Worst ẓulm:</HL> shirk — against Allah’s
                        right.
                      </li>
                      <li>
                        <HL>Against oneself:</HL> excesses like standing all
                        night without rest, etc.
                      </li>
                      <li>
                        <HL>Against others:</HL> oppression by striking,
                        killing, or usurping wealth.
                      </li>
                    </ul>
                  </div>

                  <p className="mt-3">
                    <strong>Security (amn) follows īmān.</strong> If īmān is{" "}
                    <HL>perfect</HL> (untainted), security is <HL>complete</HL>.
                    If īmān is <HL>deficient</HL>, then security is partial: the
                    major sinner is secure from <em>eternity</em> in Hell, but
                    not necessarily from punishment; he is under Allah’s Will:
                  </p>

                  <Verse
                    tone="rose"
                    arabic="إِنَّ ٱللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِۦ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَآءُ"
                  >
                    “Allah does not forgive that partners be associated with
                    Him, but He forgives whatever is less than that for whom He
                    wills.” (An-Nisāʾ 4:116)
                  </Verse>
                </div>
              </Section>

              {/* IBRAHĪM'S ARGUMENT & HEREAFTER SCENE */}
              <Section
                id="ibrahim"
                tone="sky"
                title="Ibrāhīm’s argument and the promised security"
                subtitle="Security belongs to those who avoid shirk."
              >
                <Verse
                  tone="sky"
                  arabic="وَكَيْفَ أَخَافُ مَآ أَشْرَكْتُمْ وَلَا تَخَافُونَ أَنَّكُمْ أَشْرَكْتُم بِٱللَّهِ مَا لَمْ يُنَزِّلْ بِهِۦ عَلَيْكُمْ سُلْطَـٰنًا"
                >
                  “How should I fear what you associate [with Allah], while you
                  do not fear that you have associated with Allah that for which
                  He has sent down no authority?” (Al-Anʿām 6:81)
                </Verse>

                <p>
                  Allah then judged in his favour and linked guidance and
                  security to pure īmān (6:82), and said:
                </p>

                <Verse
                  tone="indigo"
                  arabic="وَتِلْكَ حُجَّتُنَآ ءَاتَيْنَـٰهَآ إِبْرَٰهِيمَ عَلَىٰ قَوْمِهِۦ"
                >
                  “That was Our argument which We gave Ibrāhīm against his
                  people.” (Al-Anʿām 6:83)
                </Verse>

                <p>As for the wrongdoers in the Hereafter:</p>

                <Verse
                  tone="rose"
                  arabic="ٱحْشُرُوا ٱلَّذِينَ ظَلَمُوا وَأَزْوَٰجَهُمْ وَمَا كَانُوا۟ يَعْبُدُونَ مِن دُونِ ٱللَّهِ فَٱهْدُوهُمْ إِلَىٰ صِرَٰطِ ٱلْجَحِيمِ"
                >
                  “Assemble those who acted wrongfully along with their kinds
                  and what they used to worship beside Allah, and lead them to
                  the path of Hell.” (As-Ṣāffāt 37:22–23)
                </Verse>

                <Callout tone="emerald">
                  <strong>Relevance to the chapter:</strong> Allah promises{" "}
                  <HL>security and guidance</HL> for one who does not associate
                  partners with Him — a central virtue of Tawḥīd.
                </Callout>
              </Section>

              {/* ʿUBĀDAH’S ḤADĪTH: THE COMPREHENSIVE TESTIMONY */}
              <Section
                id="ubadah"
                tone="emerald"
                title="Whoever testifies — the comprehensive testimony"
                subtitle="ʿUbādah b. aṣ-Ṣāmit’s narration and what it entails"
              >
                <Card className="border-emerald-200/70">
                  <p className="font-semibold text-slate-900">Text</p>
                  <p className="mt-2 leading-7">
                    <em>
                      “Whoever testifies that none has the right to be
                      worshipped except Allah alone with no partner; that
                      Muḥammad is His servant and Messenger; that ʿĪsā is a
                      servant of Allah, His Messenger, His word which He cast to
                      Maryam, and a spirit from Him; and that Paradise is true
                      and Hell is true — Allah will admit him to Paradise
                      according to his deeds.”
                    </em>
                  </p>
                </Card>

                <p>
                  The formula <HL>“lā ilāha illā Allāh”</HL> means “no{" "}
                  <em>deity</em> in truth except Allah” — i.e., none deserves
                  worship out of love and reverence but Him.
                </p>

                <div className="space-y-3">
                  <Verse
                    tone="sky"
                    arabic="أَجَعَلَ ٱلْـَٔالِهَةَ إِلَـٰهًا وَٰحِدًا إِنَّ هَـٰذَا لَشَىْءٌ عُجَابٌ"
                  >
                    “Has he made the deities a single God? This is indeed
                    astonishing!” (Ṣād 38:5)
                  </Verse>

                  <Verse
                    tone="sky"
                    arabic="وَمَا نَفَعَتْهُمْ آلِهَتُهُمُ ٱلَّتِى يَدْعُونَ مِن دُونِ ٱللَّهِ مِن شَىْءٍ"
                  >
                    “Their deities they called besides Allah availed them
                    nothing.” (Hūd 11:101)
                  </Verse>

                  <Verse
                    tone="indigo"
                    arabic="وَمَا مِنْ إِلَـٰهٍ إِلَّا ٱللَّهُ"
                  >
                    “There is no deity except Allah.” (Āl ʿImrān 3:62)
                  </Verse>

                  <Verse
                    tone="indigo"
                    arabic="إِنْ هِىَ إِلَّآ أَسْمَآءٌ سَمَّيْتُمُوهَآ أَنتُمْ وَءَابَآؤُكُم مَّآ أَنزَلَ ٱللَّهُ بِهَا مِن سُلْطَـٰنٍ"
                  >
                    “They are but names you and your fathers invented; Allah
                    sent down no authority for them.” (Yūsuf 12:40)
                  </Verse>
                </div>

                <Callout tone="emerald">
                  The theologians who defined “ilāh” merely as “creator-capable”
                  reduced tawḥīd to <em>lordship</em> (rubūbiyyah). Quraysh
                  already affirmed that Allah alone creates and provides — yet
                  they opposed the Prophet ﷺ because he called them to{" "}
                  <HL>tawḥīd al-ulūhiyyah</HL>: singling Allah out in worship.
                </Callout>

                <Verse tone="rose" arabic="مَا لَكُم مِّنْ إِلَـٰهٍ غَيْرُهُ">
                  “You have no deity other than Him.” (al-Aʿrāf 7:59)
                </Verse>
              </Section>

              {/* LIVING LĀ ILĀHA ILLĀ ALLĀH */}
              <Section
                id="living-shahadah"
                tone="amber"
                title="Living the shahādah"
                subtitle="Tongue, heart, and limbs — not a slogan"
              >
                <p>
                  True testimony requires:{" "}
                  <HL>acknowledgement by the tongue</HL>,{" "}
                  <HL>belief in the heart</HL>, and{" "}
                  <HL>attestation by action</HL>. Hypocrites said, “We bear
                  witness you are Allah’s Messenger,” yet Allah declared them
                  liars because their hearts and deeds contradicted it (see
                  <em>al-Munāfiqūn 63:1</em>).
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="border-amber-200">
                    <p className="font-semibold">
                      What negates/diminishes its reality
                    </p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>
                        <HL tone="rose">Major shirk</HL> (nullifies it
                        entirely).
                      </li>
                      <li>
                        <HL>Minor shirk</HL> (e.g., showing off) — diminishes
                        its fruits.
                      </li>
                      <li>
                        <HL>Major & minor sins</HL> — chip away at its
                        perfection.
                      </li>
                      <li>
                        <HL>Innovation</HL> in religion — seeking nearness by
                        what Allah did not legislate.
                      </li>
                    </ul>
                  </Card>
                  <Card className="border-amber-200">
                    <p className="font-semibold">Hardest struggle: sincerity</p>
                    <p className="mt-1">
                      The Salaf said, “I do not wrestle with anything like I do
                      with <em>ikhlāṣ</em>.” When a man complained of whispers
                      too heavy to mention, the Prophet ﷺ said:{" "}
                      <em>“That is pure īmān.”</em> It strikes a sound heart;
                      Shayṭān does not demolish what is already in ruins.
                    </p>
                  </Card>
                </div>

                <Verse
                  tone="indigo"
                  arabic="أَفَرَءَيْتَ مَنِ ٱتَّخَذَ إِلَـٰهَهُ هَوَىٰهُ"
                >
                  “Have you seen the one who takes his desire as his god?”
                  (al-Jāthiyah 45:23)
                </Verse>
              </Section>

              {/* “ALONE, WITHOUT PARTNER” — AND MUḤAMMAD HIS SERVANT & MESSENGER */}
              <Section
                id="muhammad"
                tone="sky"
                title="“Alone, without partner” — and Muḥammad ﷺ His servant and Messenger"
                subtitle="Guarding the middle path between neglect and exaggeration"
              >
                <p>
                  “Alone, without partner” negates partners in{" "}
                  <HL>rubūbiyyah</HL>,<HL>ulūhiyyah</HL>, and{" "}
                  <HL>Names & Attributes</HL>. The Prophet ﷺ himself
                  demonstrated this reliance when threatened by a Bedouin who
                  seized his sword: he said, <em>“Allah will protect me.”</em>
                </p>

                <div className="space-y-3">
                  <Verse
                    tone="indigo"
                    arabic="قُلْ لَّآ أَمْلِكُ لِنَفْسِى نَفْعًا وَلَا ضَرًّا إِلَّا مَا شَآءَ ٱللَّهُ"
                  >
                    “Say: I do not control benefit or harm for myself except as
                    Allah wills.” (al-Aʿrāf 7:188)
                  </Verse>
                  <Verse
                    tone="indigo"
                    arabic="قُلْ إِنِّى لَآ أَمْلِكُ لَكُمْ ضَرًّا وَلَا رَشَدًا • قُلْ إِنِّى لَن يُجِيرَنِى مِنَ ٱللَّهِ أَحَدٌ"
                  >
                    “Say: I do not possess for you harm or guidance. Say: None
                    can protect me from Allah…” (al-Jinn 72:21–22)
                  </Verse>
                  <Verse
                    tone="indigo"
                    arabic="قُلْ إِنَّمَآ أَنَا۠ بَشَرٌۭ مِّثْلُكُمْ يُوحَىٰٓ إِلَىَّ أَنَّمَآ إِلَـٰهُكُمْ إِلَـٰهٌۭ وَٰحِدٌۭ"
                  >
                    “Say: I am only a human like you; it is revealed to me that
                    your God is one God.” (Fuṣṣilat 41:6)
                  </Verse>
                </div>

                <Callout tone="sky">
                  Myths like “the Prophet ﷺ had no shadow” or that his light
                  outshone the sun are <strong>false</strong>. ʿĀʾishah
                  (raḍiyallāhu ʿanhā) said she would stretch her legs before him
                  in the dark house (no lamps then) — had he been self-luminous
                  as claimed, there would be no need for that excuse.
                </Callout>

                <Card className="border-sky-200">
                  <p className="font-semibold">Against exaggeration</p>
                  <p className="mt-1">
                    Statements like some verses of al-Būṣīrī’s{" "}
                    <em>al-Burdah</em> (“From your bounty is the world and its
                    hardship… from your knowledge is the Lawḥ and the Pen…”)
                    exceed all bounds. Love the Messenger ﷺ as{" "}
                    <HL>the most obedient servant of Allah</HL> and follow him —
                    do not raise him to what Allah did not grant.
                  </p>
                </Card>

                <p>
                  He ﷺ endured harm, had camel entrails placed on his back in
                  sujūd, and was patient until Allah gave him victory. His
                  worship was immense; when his feet swelled in night prayer he
                  said: <em>“Should I not be a grateful servant?”</em>
                </p>

                <Card className="border-slate-200">
                  <p className="font-semibold">
                    Two things that undercut this testimony
                  </p>
                  <ol className="mt-2 list-decimal list-inside space-y-1">
                    <li>
                      <HL>Sinning</HL> — it contradicts full following, though
                      it does not expel from Islam unless it reaches disbelief.
                    </li>
                    <li>
                      <HL>Innovation</HL> — seeking closeness by what Allah and
                      His Messenger did not legislate. Excuse exists for the
                      truly ignorant follower; not for one who knows the truth
                      and rejects it out of status. See{" "}
                      <span dir="rtl" className="font-semibold">
                        بَلْ قَالُوٓا إِنَّا وَجَدْنَآ ءَابَآءَنَا عَلَىٰٓ
                        أُمَّةٍ وَإِنَّا عَلَىٰٓ ءَاثَـٰرِهِم مُّهْتَدُونَ
                      </span>{" "}
                      (az-Zukhruf 43:22).
                    </li>
                  </ol>
                </Card>
              </Section>

              {/* ʿĪSĀ عليه السلام — SERVANT, MESSENGER, WORD, SPIRIT */}
              <Section
                id="jesus"
                tone="rose"
                title="ʿĪsā عليه السلام — servant, messenger, ‘word’ to Maryam, and a spirit from Him"
                subtitle="Between the extremes of Jews and Christians"
              >
                <div className="space-y-3">
                  <p>
                    Two extremes: the Jews denied and slandered him, claiming to
                    have killed him; the Christians deified him as son of God
                    and one of a trinity. Our creed: he is{" "}
                    <HL>servant and messenger</HL>; his mother is truthful and
                    chaste; and he was created by Allah’s command.
                  </p>

                  <Verse
                    tone="rose"
                    arabic="إِنَّ مَثَلَ عِيسَىٰ عِندَ ٱللَّهِ كَمَثَلِ ءَادَمَ ۖ خَلَقَهُۥ مِن تُرَابٍۢ ثُمَّ قَالَ لَهُۥ كُن فَيَكُونُ"
                  >
                    “The likeness of ʿĪsā with Allah is as that of Ādam: He
                    created him from dust, then said to him ‘Be!’ — and he was.”
                    (Āl ʿImrān 3:59)
                  </Verse>

                  <p>
                    He is called “a word” because he was brought into being by
                    the <em>word</em> “Be”. He is <strong>not</strong> Allah’s
                    attribute; he is a created being who ate and drank:
                  </p>

                  <Verse tone="rose" arabic="كَانَا يَأْكُلَانِ ٱلطَّعَامَ">
                    “They both used to eat food.” (al-Māʾidah 5:75)
                  </Verse>

                  <p>
                    <HL>“A spirit from Him”</HL>: an honorific attribution —
                    from Him in <em>origin</em>, not a part of Him. As in:
                  </p>

                  <Verse
                    tone="indigo"
                    arabic="وَسَخَّرَ لَكُم مَّا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ جَمِيعًۭا مِّنْهُ"
                  >
                    “He has subjected to you whatever is in the heavens and the
                    earth —<em>all from Him</em>.” (al-Jāthiyah 45:13)
                  </Verse>

                  <Card className="border-rose-200">
                    <p className="font-semibold">
                      What Allah attributes to Himself — three kinds
                    </p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>
                        <strong>Created entities (general):</strong> “My earth,”
                        “from Him.”
                      </li>
                      <li>
                        <strong>Created entities (specific, honorific):</strong>{" "}
                        “the House of Allah,” “the she-camel of Allah,” “a
                        spirit from Him.”
                      </li>
                      <li>
                        <strong>Attributes (uncreated):</strong> “My Speech,”
                        “My Messages.”
                      </li>
                    </ul>
                  </Card>
                </div>
              </Section>

              {/* PARADISE “ACCORDING TO HIS DEEDS” */}
              <Section
                id="according-to-deeds"
                tone="indigo"
                title="“Allah will admit him to Paradise according to his deeds”"
                subtitle="Complete vs. incomplete admission"
              >
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <HL>Complete admission:</HL> no prior punishment — for those
                    who perfect īmān and tawḥīd.
                  </li>
                  <li>
                    <HL>Incomplete admission:</HL> preceded by punishment per
                    Allah’s Will — for believers whose sins outweighed, yet
                    without shirk.
                  </li>
                </ul>

                <Verse
                  tone="indigo"
                  arabic="إِنَّ ٱللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِۦ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَآءُ"
                >
                  “Allah does not forgive shirk, but He forgives less than that
                  for whom He wills.” (an-Nisāʾ 4:116)
                </Verse>
              </Section>

              {/* ʿITBĀN’S REPORT — HELL FORBIDDEN FOR THE SINCERE UTTERER */}
              <Section
                id="itbaan"
                tone="emerald"
                title="“Hell is forbidden for the one who says it seeking Allah’s Face”"
                subtitle="ʿItbān b. Mālik’s story and the sincerity condition"
              >
                <Card className="border-emerald-200/70">
                  <p className="font-semibold text-slate-900">Text & setting</p>
                  <p className="mt-2 leading-7">
                    ʿItbān b. Mālik (raḍiyallāhu ʿanhu) invited the Prophet ﷺ to
                    pray at a spot in his house due to weak eyesight so he could
                    use it as a place of ṣalāh. The Prophet ﷺ came (with Abū
                    Bakr & ʿUmar), prayed two rakʿahs, then sat and they spoke.
                    Someone mentioned Mālik b. Dukhshum and said, “He is a
                    hypocrite.” The Prophet ﷺ replied:{" "}
                    <em>
                      “Do not say that! Does he not say lā ilāha illā Allāh
                      seeking thereby the Face of Allah? Surely Allah has made
                      the Fire forbidden for the one who says lā ilāha illā
                      Allāh, seeking the Face of Allah thereby.”
                    </em>
                  </p>
                </Card>

                <p>
                  The Prophet ﷺ did <em>not</em> testify specifically for that
                  man’s heart; he stated a <HL>general rule</HL> and forbade
                  speaking about people’s inner states when their outward is
                  Islam.
                </p>

                <Card className="border-emerald-300">
                  <p className="font-semibold">Sincerity is the key’s teeth</p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>
                      Saying the word benefits only with <HL>ikhlāṣ</HL> —
                      “seeking Allah’s Face.” Mere utterance (as the hypocrites
                      did) does not save.
                    </li>
                    <li>
                      From the Salaf:{" "}
                      <em>
                        “The key to Paradise is lā ilāha illā Allāh; but no door
                        opens with a key that has no teeth.”
                      </em>
                    </li>
                    <li>
                      Ibn Taymiyyah: if one <HL>fulfils its requirements</HL>,
                      the Fire is absolutely forbidden for him; if he comes with
                      deficiency, then the prevention may be non-absolute — yet
                      his tawḥīd guarantees he will not remain in Hell forever.
                    </li>
                  </ul>
                </Card>

                <Callout tone="emerald">
                  Guard your tongue: the scholars even said it is{" "}
                  <strong>prohibited</strong>
                  to harbour سوء الظن (evil suspicion) of a Muslim whose outward
                  is sound — let alone voicing it.
                </Callout>
              </Section>

              {/* MŪSĀ’S REQUEST — THE WEIGHT OF LĀ ILĀHA ILLĀ ALLĀH */}
              <Section
                id="musa-weight"
                tone="indigo"
                title="“Teach me something to remember You” — the supreme remembrance"
                subtitle="Mūsā (ʿalayhi as-salām) and the cosmic weight of the testimony"
              >
                <Card className="border-indigo-200/70">
                  <p className="font-semibold text-slate-900">Text</p>
                  <p className="mt-2 leading-7">
                    Mūsā (ʿalayhi as-salām) said:{" "}
                    <em>
                      “My Lord, teach me something with which I will remember
                      You and supplicate to You.”
                    </em>{" "}
                    He said:
                    <em>“O Mūsā, say: lā ilāha illā Allāh.”</em> He said:{" "}
                    <em>“My Lord, all Your servants say this.”</em> He replied:{" "}
                    <em>
                      “O Mūsā! If the seven heavens and all within them besides
                      Me, and the seven earths, were placed in one pan of the
                      scale and lā ilāha illā Allāh in the other, the testimony
                      would outweigh them.”
                    </em>
                  </p>
                </Card>

                <ul className="mt-2 list-disc pl-6 space-y-2">
                  <li>
                    This shows the <HL>excellence of tawḥīd</HL>; yet its fruits
                    appear only when its <HL>conditions</HL> are met and its{" "}
                    <HL>impediments</HL> are absent.
                  </li>
                  <li>
                    “Besides Me” clarifies that praise does not outweigh the
                    Praised; and Allah’s being “in the heavens” (other texts) is
                    not like the angels’ containment —{" "}
                    <HL>the creation does not encompass the Creator</HL>.
                  </li>
                  <li>
                    The ḥadīth also alludes to the <HL>Mīzān with two pans</HL>;
                    and the “seven earths” as in other texts.
                  </li>
                </ul>
              </Section>

              {/* ḤADĪTH QUDSĪ — O SON OF ĀDAM… */}
              <Section
                id="hadith-qudsi"
                tone="sky"
                title="Ḥadīth Qudsī: “O son of Ādam… I will meet you with forgiveness like it”"
                subtitle="Massive forgiveness with tawḥīd and no shirk"
              >
                <Card className="border-sky-200/70">
                  <p className="font-semibold text-slate-900">Text</p>
                  <p className="mt-2 leading-7">
                    Allah said:{" "}
                    <em>
                      “O son of Ādam! If you come to Me with sins filling the
                      earth, then meet Me not associating anything with Me, I
                      will come to you with forgiveness like it.”
                    </em>
                  </p>
                </Card>

                <p>
                  <HL>Meaning:</HL> the virtue of tawḥīd is so great that it
                  expiates even massive sins — provided one meets Allah without{" "}
                  <HL>any shirk</HL> (major or minor).
                </p>

                <Card className="border-sky-300">
                  <p className="font-semibold">
                    Ḥadīth qudsī vs. Qurʾān — quick guide
                  </p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        Two scholarly views: its <HL>wording</HL> is from Allah,
                        or its <HL>meaning</HL> is from Allah and the wording
                        from the Prophet ﷺ.
                      </li>
                      <li>
                        Not recited as worship in ṣalāh; no
                        ten-rewards-per-letter rule.
                      </li>
                      <li>
                        No challenge (taḥaddī) to produce its like; the Qurʾān
                        is uniquely inimitable and divinely guarded.
                      </li>
                    </ul>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        Ḥadīth qudsī can be ṣaḥīḥ/ḥasan/ḍaʿīf (ascribed reports
                        vary); the Qurʾān is mutawātir letter-for-letter.
                      </li>
                      <li>
                        One may narrate a ḥadīth’s <em>meaning</em>; the Qurʾān
                        must be quoted verbatim.
                      </li>
                    </ul>
                  </div>
                </Card>
              </Section>

              {/* IMPORTANT MATTERS — 20 KEY TAKEAWAYS */}
              <Section
                id="important-matters-04"
                tone="amber"
                title="Important Matters — 20 Key Takeaways"
                subtitle="Excellence of tawḥīd and what it expiates"
              >
                <Card className="border-amber-200/70">
                  <p className="font-semibold text-slate-900">
                    Concise list (1–20)
                  </p>
                  <ol className="mt-2 list-decimal list-inside space-y-1">
                    <li>Vastness of Allah’s favour.</li>
                    <li>Abundance of reward for tawḥīd.</li>
                    <li>How tawḥīd expiates sins.</li>
                    <li>Right reading of Anʿām 82 (ẓulm = shirk).</li>
                    <li>The five issues within ʿUbādah’s ḥadīth.</li>
                    <li>
                      Reconciling with ʿItbān’s report clarifies the meaning of
                      the testimony and the error of the deluded who rely on
                      words alone.
                    </li>
                    <li>Note the sincerity condition in ʿItbān’s ḥadīth.</li>
                    <li>
                      Even prophets are reminded of lā ilāha illā Allāh’s
                      virtue.
                    </li>
                    <li>
                      Its weight over all creation, though many utter it lightly
                      without fulfilling its terms.
                    </li>
                    <li>
                      Textual proof the earths are seven (as the heavens).
                    </li>
                    <li>
                      They have inhabitants (angels for the heavens, etc.).
                    </li>
                    <li>
                      Affirming Allah’s Attributes (Face, Speech, Saying) —
                      against the deniers.
                    </li>
                    <li>
                      ʿItbān’s wording shows that mere utterance is not enough —
                      shirk must be rejected in reality.
                    </li>
                    <li>
                      Reconciling how ʿĪsā and Muḥammad ﷺ are both servants{" "}
                      <em>and</em> messengers (against extremism).
                    </li>
                    <li>
                      Understanding ʿĪsā’s being a “word” of Allah (by the
                      command “Be”).
                    </li>
                    <li>
                      Understanding his being “a spirit from Him” (honorific
                      origin).
                    </li>
                    <li>Excellence of believing in Paradise and Hell.</li>
                    <li>
                      “According to his deeds” — deeds are still required.
                    </li>
                    <li>Knowing the Scale (Mīzān) has two pans.</li>
                    <li>
                      Mention of the Face of Allah (seeking it) in the ḥadīth.
                    </li>
                  </ol>
                </Card>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="border-amber-300">
                    <p className="font-semibold">
                      1–3: Favor, reward, expiation
                    </p>
                    <p className="mt-1">
                      <HL>Tawḥīd’s reward is immense</HL>; it fuels obedience
                      and wipes out sins when shirk is absent.
                    </p>
                  </Card>
                  <Card className="border-amber-300">
                    <p className="font-semibold">4–7: Verses & conditions</p>
                    <p className="mt-1">
                      Ẓulm in 6:82 = shirk. ʿUbādah’s five points: two
                      testimonies; ʿĪsā’s status; truth of Paradise/Hell. ʿItbān
                      adds the <HL>ikhlāṣ</HL>
                      condition.
                    </p>
                  </Card>
                  <Card className="border-amber-300">
                    <p className="font-semibold">8–12: Weight & attributes</p>
                    <p className="mt-1">
                      The word’s preponderance, seven earths, and affirmation of
                      Allah’s Attributes appear across the evidences.
                    </p>
                  </Card>
                  <Card className="border-amber-300">
                    <p className="font-semibold">13–20: Practice & creed</p>
                    <p className="mt-1">
                      Rejecting shirk in reality, balanced belief regarding ʿĪsā
                      and the Messenger ﷺ, belief in the unseen (Jannah/Fire),
                      necessity of deeds, reality of the Mīzān, and sincerity
                      for Allah’s Face.
                    </p>
                  </Card>
                </div>
              </Section>
            </section>
          </main>
        </div>
      ) : (
        <QuestionBank />
      )}
    </main>
  );
}
