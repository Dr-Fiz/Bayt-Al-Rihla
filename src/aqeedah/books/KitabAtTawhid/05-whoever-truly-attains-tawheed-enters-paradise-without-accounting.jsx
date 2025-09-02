// src/aqeedah/books/kitab-at-tawhid/05-whoever-truly-attains-tawheed-enters-paradise-without-accounting.jsx
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
 * Kitāb at-Tawḥīd — Chapter 5
 * Title: Whoever Truly Attains Tawḥīd Enters Paradise Without Accounting
 * Route hint:
 * /aqeedah/books/kitab-at-tawhid/whoever-truly-attains-tawheed-enters-paradise-without-accounting
 *
 * This CHUNK delivers:
 *  - Page shell (no sticky bar), hero, segmented view toggle
 *  - Reusable UI kit (Card, Pill, Section, Verse, HL, Callout)
 *  - Question Bank (10 items) w/ reveal + explanations
 * Next chunks will paste ALL article text into the content sections verbatim (ignore page numbers).
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
        "rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm ring-1 ring-slate-200/60 backdrop-blur-sm",
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
const QUESTIONS = [
  {
    id: "C5-Q1",
    prompt:
      "In this chapter, what is the precise meaning of “tahqīq at-tawḥīd” (truly attaining tawḥīd)?",
    options: [
      "Merely uttering the shahādah once",
      "Affirming rubūbiyyah only (that Allah creates and provides)",
      "Fulfilling tawḥīd’s rights while negating shirk and its diminishers",
      "Abandoning all worldly means completely",
    ],
    answerIndex: 2,
    explanation:
      "The article states tahqīq requires freeing tawḥīd of shirk; this is realized by knowledge, belief, and submission to its implications.",
  },
  {
    id: "C5-Q2",
    prompt:
      "Which three components does the article name as prerequisites to truly attain tawḥīd?",
    options: [
      "Knowledge, belief, and submission to its teachings",
      "Genealogy, language, and dress",
      "Travel, solitude, and silence",
      "Wealth, status, and eloquence",
    ],
    answerIndex: 0,
    explanation:
      "First: knowledge (Muḥammad 47:19), Second: belief (Ṣād 38:5 shows deniers rejected ulūhiyyah), Third: submission (Ṣāffāt 37:35–36).",
  },
  {
    id: "C5-Q3",
    prompt:
      "In An-Naḥl 16:120, the word “Ummah” describing Ibrāhīm عليه السلام is explained in the article to mean:",
    options: [
      "A time period",
      "A path/religion",
      "A group of people",
      "A leader/exemplar",
    ],
    answerIndex: 3,
    explanation:
      "Here “Ummah” means a leader and exemplar—one modelled in deeds and trials.",
  },
  {
    id: "C5-Q4",
    prompt:
      "According to the article, “qānit” and “ḥanīf” together describe Ibrāhīm. What do they indicate?",
    options: [
      "Occasional obedience and social prestige",
      "Continuous obedience and turning away from shirk",
      "Political power and miracles",
      "Tribal loyalty and poetry",
    ],
    answerIndex: 1,
    explanation:
      "Qunūt = continuous obedience in all states; ḥanīf = turning away from shirk, inclining to pure obedience.",
  },
  {
    id: "C5-Q5",
    prompt:
      "“Whoever truly attains tawḥīd enters Paradise without reckoning.” In the heading’s logic, “man … ḥaqqaqa … fala-hu bilā ḥisāb” conveys:",
    options: [
      "A hopeful wish only",
      "A conditional legal ruling whose response is: without reckoning",
      "A metaphor for quick judgment",
      "A statement restricted to prophets",
    ],
    answerIndex: 1,
    explanation:
      "The article parses it as a conditional sentence: ‘man’ (condition), predicate ‘ḥaqqaqa’, and response ‘bilā ḥisāb’.",
  },
  {
    id: "C5-Q6",
    prompt:
      "Which statement best captures the traits of the 70,000 who enter without reckoning?",
    options: [
      "They never perform ruqyah under any circumstance",
      "They do not seek ruqyah, do not (seek to) be cauterized, avoid omens, and rely upon Allah",
      "They abandon all medical treatment",
      "They are only those who migrated with the Prophet ﷺ",
    ],
    answerIndex: 1,
    explanation:
      "Per the report: ‘lā yastarqun, lā yaktawūn, lā yatatayyaron, wa ʿalā rabbihim yatawakkalūn.’",
  },
  {
    id: "C5-Q7",
    prompt: "How does the article reconcile ruqyah with perfected tawakkul?",
    options: [
      "Ruqyah is always forbidden",
      "Ruqyah is permissible (esp. for evil eye and venom), but requesting it conflicts with the highest level of reliance",
      "Ruqyah is obligatory for every illness",
      "Ruqyah only works if done in groups",
    ],
    answerIndex: 1,
    explanation:
      "“No ruqyah except for evil eye or sting/bite” shows permissibility. Avoiding request signals more complete tawakkul.",
  },
  {
    id: "C5-Q8",
    prompt:
      "Who asked, “Pray that I be among them,” and was told by the Prophet ﷺ, “You are among them”?",
    options: [
      "Abū Hurayrah",
      "ʿUkāshah b. Miḥṣan",
      "Ibn ʿAbbās",
      "Sahl b. Ḥanīf",
    ],
    answerIndex: 1,
    explanation:
      "ʿUkāshah b. Miḥṣan; another man asked and was told, “ʿUkāshah has preceded you,” a gentle closure to prevent opening the door to all.",
  },
  {
    id: "C5-Q9",
    prompt:
      "From the ‘Important Matters,’ which lesson cautions against being deceived by large numbers?",
    options: [
      "That most of the earth follows the truth",
      "That numbers are the main criterion of guidance",
      "Not to be deluded by many on misguidance nor arrogant due to many on the truth",
      "That only a minority can be upon the truth",
    ],
    answerIndex: 2,
    explanation:
      "The article cites Qur’ān (e.g., 6:116) and explains both sides: don’t follow crowds into error, and don’t be conceited by large followings.",
  },
  {
    id: "C5-Q10",
    prompt:
      "Does taking lawful means (medicine, surgery) negate tawakkul according to the article?",
    options: [
      "Yes—true reliance requires abandoning means",
      "No—one takes means while the heart relies solely on Allah",
      "Means are only for prophets",
      "Means are only spiritual (adhkār), never physical",
    ],
    answerIndex: 1,
    explanation:
      "The Sunnah balances asbāb (means) with tawakkul; abandoning means isn’t the Prophetic way.",
  },
  {
    id: "C5-Q11",
    prompt:
      "Why does the chapter heading state the ruling categorically (without saying “in shā’ Allāh”)?",
    options: [
      "Because all rulings must omit in shā’ Allāh",
      "Because it’s a general, legally established rule; in shā’ Allāh is for specific individuals",
      "Because the author disliked the phrase",
      "Because this matter is only a hope, not a ruling",
    ],
    answerIndex: 1,
    explanation:
      "The chapter states a general legal ruling: whoever truly realizes tawḥīd enters without reckoning. For specific persons we say in shā’ Allāh.",
  },
  {
    id: "C5-Q12",
    prompt:
      "Which of the following is NOT one of the three prerequisites to truly attain tawḥīd?",
    options: ["Knowledge", "Belief", "Submission", "Lineage"],
    answerIndex: 3,
    explanation:
      "Tahqīq at-tawḥīd requires knowledge, belief, and submission to its implications—not lineage.",
  },
  {
    id: "C5-Q13",
    prompt:
      "The word “Ummah” in the Qur’ān can mean several things. Which list matches the four meanings mentioned?",
    options: [
      "Leader, time period, group of people, religion/way",
      "Tribe, language, scripture, miracle",
      "City, family, kingdom, army",
      "Sunnah, bid‘ah, madhhab, fatwā",
    ],
    answerIndex: 0,
    explanation:
      "The commentary lists four Qur’ānic usages: leader, period of time, a group, and a way/religion.",
  },
  {
    id: "C5-Q14",
    prompt:
      "Why is Ibrāhīm’s test with his son described as especially weighty in the commentary?",
    options: [
      "Because his son was already a prophet",
      "Because the son was at an age that the heart is deeply attached to",
      "Because animal sacrifice is forbidden",
      "Because angels opposed the command",
    ],
    answerIndex: 1,
    explanation:
      "The son had reached puberty—an age that intensifies attachment—yet both submitted fully.",
  },
  {
    id: "C5-Q15",
    prompt:
      "In the phrase “satajidūnī in shā’ Allāh,” what does the letter sīn (سـ) in “satajidūnī” indicate according to the commentary?",
    options: [
      "Affirmation and resolve while still relying upon Allah",
      "Doubt about the command",
      "Negation of patience",
      "Past tense",
    ],
    answerIndex: 0,
    explanation:
      "The sīn here conveys assured promise/affirmation, yet he still attached it to Allah’s will.",
  },
  {
    id: "C5-Q16",
    prompt:
      "What is the commentary’s verdict on reports like “the knife turned” or “his neck became iron” during the sacrifice?",
    options: [
      "They are sound tafsīr",
      "They are plausible poetry",
      "They are wrong claims",
      "They are obligatory to believe",
    ],
    answerIndex: 2,
    explanation:
      "Such embellishments are rejected; the Qur’ān suffices without these stories.",
  },
  {
    id: "C5-Q17",
    prompt: "“Qānitًا” (قانتًا) describing Ibrāhīm means:",
    options: [
      "Occasionally obedient",
      "Continuously obedient in all circumstances",
      "Politically dominant",
      "Endowed with prophecy from birth",
    ],
    answerIndex: 1,
    explanation: "Al-qunūt = continual obedience and devotion in every state.",
  },
  {
    id: "C5-Q18",
    prompt: "“Ḥanīfًا” (حنيفًا) in 16:120 indicates that Ibrāhīm was:",
    options: [
      "Neutral regarding shirk",
      "Inclined away from shirk toward pure obedience",
      "Devoted to his tribe",
      "Following multiple deities",
    ],
    answerIndex: 1,
    explanation:
      "Ḥanīf means turning away from shirk and inclining to pure tawḥīd.",
  },
  {
    id: "C5-Q19",
    prompt:
      "What two purposes does Allah’s praise of His servants (like Ibrāhīm) serve, per the commentary?",
    options: [
      "Love the praised and imitate them",
      "Study their genealogy and debate their lineage",
      "Compose poetry and celebrate festivals",
      "Predict the future and interpret dreams",
    ],
    answerIndex: 0,
    explanation:
      "So we love whom Allah praises and imitate their praised qualities.",
  },
  {
    id: "C5-Q20",
    prompt: "What is said about Ibrāhīm’s father Āzar in the commentary?",
    options: [
      "He died upon Islam",
      "He died upon disbelief; Ibrāhīm initially promised to seek forgiveness but dissociated when it was clear he was an enemy to Allah",
      "He was a prophet",
      "His identity is unknown in the Qur’ān",
    ],
    answerIndex: 1,
    explanation:
      "Verses (e.g., 6:74; 9:114; 19:47) show Āzar’s disbelief and Ibrāhīm’s eventual dissociation.",
  },
  {
    id: "C5-Q21",
    prompt: "According to the commentary, Nūḥ’s parents were:",
    options: ["Disbelievers", "Unknown", "Believers", "Angels"],
    answerIndex: 2,
    explanation: "Nūḥ 71:28 indicates both his parents were believers.",
  },
  {
    id: "C5-Q22",
    prompt:
      "Imām Aḥmad said “three subjects lack basis” (i.e., many reports lack chains). Which are they?",
    options: [
      "Fiqh, uṣūl, and ḥadīth",
      "Maghāzī, Malāḥim, and Tafsīr",
      "Grammar, logic, and rhetoric",
      "Seerah, kalām, and astronomy",
    ],
    answerIndex: 1,
    explanation:
      "He named al-Maghāzī (expeditions), al-Malāḥim (tribulations), and Tafsīr.",
  },
  {
    id: "C5-Q23",
    prompt:
      "How does the commentary say knowledge of ancient nations is known?",
    options: [
      "Through archaeology only",
      "Through reliable oral tradition",
      "Only through revelation from Allah",
      "Through philosophy",
    ],
    answerIndex: 2,
    explanation:
      "Citing 14:9 — “None knows them now save Allah.” The principle: past nations are known via revelation.",
  },
  {
    id: "C5-Q24",
    prompt:
      "Al-Mu’minūn 57–61 lists qualities of Allah’s close servants. Which option best summarizes them?",
    options: [
      "Worldly power and wealth",
      "Fear of their Lord, belief in His āyāt, no shirk, and giving while hearts fear their return to Him",
      "Performing miracles and long travel",
      "Tribal nobility and poetry",
    ],
    answerIndex: 1,
    explanation:
      "Those verses describe awe, īmān in āyāt, avoidance of shirk, and fearful giving.",
  },
  {
    id: "C5-Q25",
    prompt:
      "Why are sins called “from shirk” in the general sense in the commentary?",
    options: [
      "Because all sinners leave Islam",
      "Because sins arise from following desire in opposition to Sharī‘ah",
      "Because prophets sinned frequently",
      "Because shirk only means tyranny",
    ],
    answerIndex: 1,
    explanation:
      "General sense: sin follows hawa (desire) against revelation; hence ‘from shirk’ broadly.",
  },
  {
    id: "C5-Q26",
    prompt:
      "In the more specific classification, the commentary divides sins into:",
    options: [
      "Major and minor only",
      "Sins of the heart and tongue",
      "Shirk and immorality",
      "Public and private",
    ],
    answerIndex: 2,
    explanation: "A specific breakdown given: shirk and fujūr/immorality.",
  },
  {
    id: "C5-Q27",
    prompt:
      "According to Āl ‘Imrān 3:135 cited, what do the righteous do after a sin?",
    options: [
      "Persist knowingly",
      "Despair of Allah’s mercy",
      "Remember Allah, seek forgiveness, and do not persist knowingly",
      "Announce it publicly",
    ],
    answerIndex: 2,
    explanation: "They remember Allah, ask forgiveness, and avoid persistence.",
  },
  {
    id: "C5-Q28",
    prompt: "In the ḥadīth of the nations, “raht” refers to:",
    options: [
      "One person",
      "Three to nine persons",
      "Ten to twenty",
      "A full tribe",
    ],
    answerIndex: 1,
    explanation: "Raht denotes a small group: 3–9.",
  },
  {
    id: "C5-Q29",
    prompt: "In the narration, “as-sawād” (السواد) refers to:",
    options: [
      "Black clothing",
      "A dark cloud",
      "A dense mass of people (a huge crowd)",
      "A volcanic rock",
    ],
    answerIndex: 2,
    explanation:
      "As-sawād literally ‘blackness’, intended here as the dense multitude of people.",
  },
  {
    id: "C5-Q30",
    prompt:
      "Which of the following was NOT among the Companions’ proposed identities for the 70,000?",
    options: [
      "Those who accompanied the Messenger ﷺ",
      "Those born in Islam who never associated partners",
      "Those present at the Conquest of Makkah",
      "Those who performed Ḥajj with him at ʿArafah",
    ],
    answerIndex: 3,
    explanation:
      "The three propositions discussed were companionship, being born in Islam, and the Conquest—Ḥajj at ʿArafah was not cited.",
  },
  {
    id: "C5-Q31",
    prompt:
      "Does accepting ruqyah offered without asking diminish perfect reliance (tawakkul)?",
    options: [
      "Yes, always",
      "No; the ḥadīth targets requesting it, not accepting unsolicited help",
      "Only if done at night",
      "Only if done by a relative",
    ],
    answerIndex: 1,
    explanation:
      "The Prophet ﷺ did not prevent ʿĀʾishah from treating him; accepting unsolicited ruqyah does not negate perfected tawakkul.",
  },
  {
    id: "C5-Q32",
    prompt:
      "Why is the variant reading “lā yarqūn” (they do not perform ruqyah) judged incorrect according to the commentary?",
    options: [
      "Because ruqyah is forbidden in Islam",
      "Because the Prophet ﷺ performed ruqyah, Jibrīl performed it on him, and the Companions practiced it",
      "Because Qur’ān forbids medical treatment",
      "Because angels cannot recite ruqyah",
    ],
    answerIndex: 1,
    explanation:
      "Ibn Taymiyyah preferred “lā yastarqun” (they do not seek ruqyah). Ruqyah itself is established and permissible.",
  },
  {
    id: "C5-Q33",
    prompt:
      "When would seeking cauterization not entail lowering oneself according to the commentary?",
    options: [
      "When done as a state-appointed service where one merely reports need",
      "When done secretly",
      "When paid for in gold",
      "When done by a family member only",
    ],
    answerIndex: 0,
    explanation:
      "If the cauterizer is officially appointed, informing him of need isn’t abasement like begging.",
  },
  {
    id: "C5-Q34",
    prompt:
      "What is the ruling on ṭiyarah (taking omens) in Islam as explained here?",
    options: [
      "Permissible if it improves motivation",
      "Recommended if elders practice it",
      "Prohibited and harmful; reliance should be on Allah",
      "Only disliked in travel",
    ],
    answerIndex: 2,
    explanation:
      "Islam nullified omens due to their psychological harm and contradiction to tawakkul.",
  },
  {
    id: "C5-Q35",
    prompt:
      "How does the commentary contrast ruqyah and medication regarding potential harm?",
    options: [
      "Both are always harmless",
      "Ruqyah, if it doesn’t benefit, does not harm; medicines can harm if misused",
      "Medication never harms; ruqyah does",
      "Both are forbidden",
    ],
    answerIndex: 1,
    explanation:
      "Ruqyah is dhikr/duʿā. Medicines may harm if taken inappropriately.",
  },
  {
    id: "C5-Q36",
    prompt:
      "What is the ‘fruit’ of knowing that some prophets had very few followers?",
    options: [
      "Pursue numbers at all costs",
      "Not to be deluded by large numbers nor arrogant due to them; the few may be better",
      "Abandon daʿwah completely",
      "Judge truth only by majority",
    ],
    answerIndex: 1,
    explanation:
      "Truth isn’t measured by crowds (cf. 6:116); don’t follow the many into error nor boast because many follow the truth.",
  },
  {
    id: "C5-Q37",
    prompt:
      "Which statement best reflects the commentary’s balance on means and reliance?",
    options: [
      "Perfect tawakkul means abandoning all means",
      "Taking lawful means and relying on Allah is the Prophetic way",
      "Means are only spiritual (adhkār), never physical",
      "Medicine contradicts īmān",
    ],
    answerIndex: 1,
    explanation:
      "The Sunnah combines taking means with the heart’s reliance on Allah alone.",
  },
  {
    id: "C5-Q38",
    prompt:
      "Regarding the conditional phrasing “man ḥaqqaqa at-tawḥīd… falahu bilā ḥisāb,” which part is the jawāb ash-sharṭ (response)?",
    options: [
      "man (whoever)",
      "ḥaqqaqa (truly attains)",
      "bilā ḥisāb (without reckoning)",
      "lā ilāha illā Allāh",
    ],
    answerIndex: 2,
    explanation:
      "‘bilā ḥisāb’ is the response to the condition introduced by ‘man’.",
  },
  {
    id: "C5-Q39",
    prompt:
      "When should we attach “in shā’ Allāh” in this topic, per the commentary?",
    options: [
      "Never",
      "Always, even for general truths",
      "For specific individuals (e.g., ‘so-and-so is in Jannah’), not for the general rule stated",
      "Only when speaking Arabic",
    ],
    answerIndex: 2,
    explanation:
      "General legal maxims stand categorically; for particular persons, we say in shā’ Allāh.",
  },
  {
    id: "C5-Q40",
    prompt:
      "What are the two benefits of the Prophet ﷺ being shown the nations?",
    options: [
      "Entertainment and travel planning",
      "Solace (seeing some prophets with few/no followers) and manifesting his excellence as the most followed",
      "Choosing his successor and dividing spoils",
      "Dating Qur’ānic revelation chronologically",
    ],
    answerIndex: 1,
    explanation:
      "Benefit 1: solace; Benefit 2: showing his unmatched following and virtue.",
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
            Answer, reveal the correct option, and read the explanation.
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

/* --------------------------------- Page ---------------------------------- */
export default function AttainsTawheedNoAccountingPage() {
  const [view, setView] = useState("read"); // 'read' | 'questions'
  const reduce = useReducedMotion();

  return (
    <main className="relative mx-auto max-w-7xl px-3 sm:px-6 pb-16">
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
              Whoever Truly Attains{" "}
              <span className="text-emerald-700">Tawḥīd</span> Enters Paradise
              Without Accounting
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-7 text-slate-700">
              The chapter completes the previous theme (faḍl at-tawḥīd): its
              highest fruit is admission into Jannah{" "}
              <HL tone="sky">without reckoning or punishment</HL>, by realizing
              tawḥīd through <HL>knowledge, belief, and submission</HL> and
              embodying <HL>tawakkul</HL>.
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

      {/* READ view (content progressively filled over chunks) */}
      {view === "read" ? (
        <div className="mt-6 space-y-6">
          <main id="content" className="mx-auto max-w-7xl px-0 sm:px-6 pb-16">
            <section className="mt-6 space-y-6">
              {/* INTRO / WHY THIS CHAPTER MATTERS — pp. 97–98 */}
              <Section
                id="intro-05"
                tone="emerald"
                title="Chapter overview"
                subtitle="Tahqīq at-tawḥīd and the promise of entering without reckoning."
              >
                <Card className="border-emerald-200/70">
                  <p className="font-semibold">
                    WHOEVER TRULY ATTAINS Tawheed WILL BE ADMITTED INTO THE
                    PARADISE WITHOUT ACCOUNTING
                  </p>
                </Card>

                <p>
                  This chapter is like the completion of the preceding one:{" "}
                  <em>
                    “Chapter on The Excellence of Tawheed And How It Expiates
                    Sins”.
                  </em>{" "}
                  From its excellence is this great virtue towards which every
                  sensible person aspires: admission into the Paradise without
                  accounting.
                </p>

                <p>
                  His statement: <em>man</em> (whoever) is an article of
                  condition, its predicate is <em>ḥaqqaqa</em> (to truly attain)
                  and its response is <em>bilā ḥisāb</em> (without accounts).
                  That is; he will not be called to account concerning his sins
                  and other things. <strong>To truly attain Tawheed</strong>:
                  means making it free of Shirk; and this cannot be achieved
                  except through three things:
                </p>

                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Knowledge:</strong> It is not possible to truly
                    attain a thing before knowing it.
                    <Verse
                      tone="indigo"
                      arabic="فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ"
                    >
                      “Know, therefore, that there is no god worthy of worship
                      in truth other than Allah” (Muḥammad 47:19).
                    </Verse>
                  </li>
                  <li>
                    <strong>Belief:</strong> If you know but do not believe,
                    being arrogant, you cannot truly achieve it. Allah said
                    concerning the disbelievers:
                    <Verse
                      tone="sky"
                      arabic="أَجَعَلَ الْآلِهَةَ إِلَٰهًا وَاحِدًا إِنَّ هَٰذَا لَشَيْءٌ عُجَابٌ"
                    >
                      “What! Has he made all the gods into one God? This is,
                      indeed, an astounding thing.” (Ṣād 38:5)
                    </Verse>
                    So, they did not believe singling out Allah for worship.
                  </li>
                  <li>
                    <strong>Submitting to its teachings:</strong> If you know
                    and believe but do not submit then you cannot attain it.
                    Allah the Exalted says:
                    <Verse
                      tone="amber"
                      arabic="إِنَّهُمْ كَانُوا إِذَا قِيلَ لَهُمْ لَا إِلَٰهَ إِلَّا اللَّهُ يَسْتَكْبِرُونَ وَيَقُولُونَ أَئِنَّا لَتَارِكُوا آلِهَتِنَا لِشَاعِرٍ مَّجْنُونٍ"
                    >
                      “For when it was said to them, ‘There is no god but
                      Allah’, they behaved arrogantly and said, ‘Shall we give
                      up our gods for a mad poet?’” (Aṣ-Ṣāffāt 37:35–36).
                    </Verse>
                  </li>
                </ol>

                <p>
                  Therefore, when these things materialize and Tawheed is
                  attained; the Paradise is guaranteed for such without
                  accounting. <strong>We need not say, Inshāʾ Allāh</strong> (If
                  Allah wills) since this is the implication of a legally
                  established ruling. It is for this reason that the author
                  stated it categorically in the chapter heading without saying
                  Inshāʾ Allāh. However, with respect to any specific
                  individual, we should say Inshāʾ Allāh.
                </p>

                <p>
                  The author has cited two verses in this chapter and their
                  relevance to the chapter points to truly affirming Tawheed and
                  that it cannot materialise except with the negation of all
                  forms of Shirk.
                </p>
              </Section>

              {/* IBRAHĪM (16:120): UMMATAN QĀNITAN ḤANĪFAN — pp. 98–102 */}
              <Section
                id="ibrahim-16-120"
                tone="sky"
                title="Ibrāhīm عليه السلام: ‘Ummatan Qānitًا Ḥanīfan’"
                subtitle="An-Naḥl 16:120 and the meanings of Ummah, Qānit, Ḥanīf."
              >
                <Verse
                  tone="sky"
                  arabic="إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِلَّهِ حَنِيفًا وَلَمْ يَكُ مِنَ الْمُشْرِكِينَ"
                >
                  “Verily, Ibrahim (Abraham) was an Ummah (a leader having all
                  the good righteous qualities), or a nation, obedient to Allah,
                  Haneefa (i.e. to worship none but Allah), and he was not one
                  of those who were Al-Mushrikūn.” (An-Naḥl 16:120)
                </Verse>

                <p>
                  His statement: <em>Ummatan</em>, that is, a leader. It had
                  been mentioned earlier that the word, <em>Ummah</em> comes in
                  the Qur’ān with four meanings:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>a leader,</li>
                  <li>period of time,</li>
                  <li>a group of people,</li>
                  <li>
                    and way of life (religion).
                    <span className="opacity-70"> (1)</span>
                  </li>
                </ul>

                <p>
                  His statement: <em>Ibrāhīm was indeed an Ummah</em>: This is
                  praise from Allah the Exalted for Ibrāhīm (ʿalayh as-salām)
                  that he was an exemplary leader since he was one of the
                  eminent messengers, from amongst the messengers of strong will
                  and for the fact that he was a model in his deeds and
                  struggles; He tried hard over his people and they did what
                  they did: He was thrown into the fire, yet he remained
                  patient.
                </p>

                <p>
                  Thereafter, Allah tested him by commanding him to sacrifice
                  his only son who had attained puberty. The son was neither an
                  old man the mind may give up nor a kid to whom the mind might
                  not have gotten so attached to. He was at an age in which the
                  mind gets so connected (to a person).
                </p>

                <p>
                  So, Ibrāhīm was granted a pious child, obedient to Allah.
                  Allah the Exalted said concerning him:
                </p>
                <Verse
                  tone="indigo"
                  arabic="قَالَ يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ"
                >
                  “He said: ‘O my father! Do that which you are commanded;
                  Inshāʾ Allāh (if Allah wills), you shall find me of the
                  patient.’” (Aṣ-Ṣāffāt 37:102)
                </Verse>

                <p>
                  He did not disobey his father, rebel and runaway; he rather
                  wanted his father to carry out his Lord’s order. This shows
                  his kindness to his father and obedience to his Lord the
                  Exalted. You could imagine this great power with reliance on
                  Allah in his saying:
                </p>

                <Verse
                  tone="indigo"
                  arabic="سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ"
                >
                  “…you shall find me, if Allah pleases, steadfast in my faith.”
                  (Aṣ-Ṣāffāt 37:102)
                </Verse>

                <p>
                  The letter <em>sīn</em> in his saying, <em>satajidunī</em>{" "}
                  expresses affirmation; yet he did not rely on himself, he
                  rather sought help with Allah by saying: Inshāʾ Allāh. So they
                  both obeyed and submitted to Allah the Mighty and Sublime. He
                  made him lie with his face towards the ground in order to
                  slaughter him without taking pity on him. But the solution
                  came from Allah – the Exalted:
                </p>

                <Verse
                  tone="indigo"
                  arabic="وَنَادَيْنَاهُ أَنْ يَا إِبْرَاهِيمُ • قَدْ صَدَّقْتَ الرُّؤْيَا إِنَّا كَذَٰلِكَ نَجْزِي الْمُحْسِنِينَ"
                >
                  “We called to him, ‘O Abraham, you have indeed fulfilled the
                  dream.’ Thus, indeed, do We reward those who do good.”
                  (Aṣ-Ṣāffāt 37:104–105)
                </Verse>

                <Callout tone="sky">
                  What some people have said, that the knife turned round or
                  that his neck became iron and things like that are wrong.
                </Callout>

                <p>
                  His saying: <strong>qānitًا</strong>: <em>al-Qunūt</em> means
                  being obedient continuously no matter the situation. So, such
                  is dutiful to Allah, steadfast upon obeisance at all times
                  just as his son, Muḥammad (ﷺ) gives remembrance of Allah in
                  all conditions.<span className="opacity-70"> (1)</span> When
                  he stands, he remembers Allah, when he sits, he remembers Him
                  and during his sleep too. Likewise when he eats or even
                  empties his bowels, he remembers Allah. He is ever conscious
                  of Allah through the day and night.
                </p>

                <p>
                  His saying: <strong>ḥanīfan</strong> i.e. keeping away from
                  Shirk and avoiding whatever negates obedience. Thus, he is
                  described with an affirmatory and nugatory i.e. with two
                  attributes; positive and negative.
                </p>

                <p>
                  His saying:{" "}
                  <strong>
                    “and he was not of those who set up equals with Allah”
                  </strong>{" "}
                  is an emphasis because of his steadfastness upon Tawheed.
                  Prophet Ibrāhīm (ʿalayhis salām) was divinely protected from
                  joining partners with Allah even though his kinsmen were all
                  idolaters. So, Allah described his keeping away from Shirk
                  with a continual in His saying: “...and he was not of those
                  who set up equals with Allah”. The proof for this is that
                  Allah made him a leader, and Allah never makes anyone who does
                  not truly affirm Tawheed an exemplary for people.
                </p>

                <p>
                  Whoever considers the situation of Ibrāhīm – peace be upon him
                  – would realize that he was most patient, full of certainty of
                  faith because no one will be so patient over these great
                  trials except the one very sure of the reward. Whoever has
                  doubt or is inconsistent cannot exercise that level of
                  patience. This is because the soul would prefer something
                  dearer to it, from which it hopes or is certain to gain.
                </p>

                <p>
                  It is also pertinent to note that Allah’s praising any of His
                  creatures is not only intended to make the praise reach us;
                  they have two purposes:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    that we may <strong>love</strong> the one Allah praises just
                    as we should <strong>hate</strong> and detest the one whom
                    Allah disparages. So, we love Ibrāhīm (ʿalayh as-salām)
                    because he was an exemplary leader, ever conscious of Allah
                    and was never among those who set up partners with Allah.
                    And we detest his people because they were misguided. We
                    love the angels – even though they are not of our sort –
                    because they uphold Allah’s orders. And we hate the shayāṭīn
                    because they disobey Allah and are our enemies and Allah’s
                    enemies. We also hate the followers of the devils since they
                    also disobey Allah and are His and our enemies.
                  </li>
                  <li>
                    that we may <strong>imitate</strong> him in these qualities
                    for which Allah praised him because they are laudable and we
                    will also be commended according to level of following him
                    in them.
                  </li>
                </ol>

                <Verse
                  tone="sky"
                  arabic="لَقَدْ كَانَ فِي قَصَصِهِمْ عِبْرَةٌ لِأُولِي الْأَلْبَابِ"
                >
                  “Assuredly, in their stories is a lesson for men of
                  understanding…” (Yūsuf 12:111).
                </Verse>
                <Verse
                  tone="sky"
                  arabic="قَدْ كَانَتْ لَكُمْ أُسْوَةٌ حَسَنَةٌ فِي إِبْرَاهِيمَ وَالَّذِينَ مَعَهُ"
                >
                  “Indeed there is a good example for you in Abraham and those
                  who were with him…” (Al-Mumtaḥanah 60:4).
                </Verse>
                <Verse
                  tone="sky"
                  arabic="لَقَدْ كَانَ لَكُمْ فِيهِمْ أُسْوَةٌ حَسَنَةٌ لِمَنْ كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ"
                >
                  “Surely, there is a good example in them for you – for all who
                  have hope to see Allah and the Last Day.” (Al-Mumtaḥanah
                  60:6).
                </Verse>

                <Card className="border-sky-200">
                  <p className="font-semibold">A point of benefit</p>
                  <p className="mt-1">
                    The father of Ibrāhīm died upon disbelief, and the most
                    preponderant opinion, which is our opinion, is that his name
                    is Āzar as Allah the Exalted says:
                  </p>
                  <Verse
                    tone="indigo"
                    arabic="وَإِذْ قَالَ إِبْرَاهِيمُ لِأَبِيهِ آزَرَ أَتَتَّخِذُ أَصْنَامًا آلِهَةً"
                  >
                    “And remember the time when Abraham said to his father,
                    Āzar, ‘Dost thou take idols for gods?’” (Al-Anʿām 6:74).
                  </Verse>
                  <p>
                    Allah the Exalted also says:
                    <Verse
                      tone="indigo"
                      arabic="وَمَا كَانَ اسْتِغْفَارُ إِبْرَاهِيمَ لِأَبِيهِ إِلَّا عَنْ مَوْعِدَةٍ وَعَدَهَا إِيَّاهُ"
                    >
                      “And Abraham asking forgiveness for his father was only
                      because of a promise he has made to him…” (At-Tawbah
                      9:114)
                    </Verse>
                    because he had said:
                  </p>
                  <Verse
                    tone="indigo"
                    arabic="سَأَسْتَغْفِرُ لَكَ رَبِّي إِنَّهُ كَانَ بِي حَفِيًّا"
                  >
                    “…I will ask forgiveness of my Lord for thee. He is indeed
                    gracious to me” (Maryam 19:47)
                  </Verse>
                  <Verse
                    tone="indigo"
                    arabic="فَلَمَّا تَبَيَّنَ لَهُ أَنَّهُ عَدُوٌّ لِلَّهِ تَبَرَّأَ مِنْهُ إِنَّ إِبْرَاهِيمَ لَأَوَّاهٌ حَلِيمٌ"
                  >
                    “…but when it became clear to him that he was an enemy of
                    Allah, he dissociated himself from him. Surely, Abraham was
                    most tender-hearted and forbearing.” (At-Tawbah 9:114).
                  </Verse>
                  <p>In Sūrat Ibrāhīm, he (ʿalayhis salām) also said:</p>
                  <Verse
                    tone="indigo"
                    arabic="رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ"
                  >
                    “Our Lord, forgive me and my parents and the believers on
                    the day when the reckoning will take place.” (Ibrāhīm 14:41)
                  </Verse>
                  <p>However, he later dissociated himself from him.</p>
                  <p>As for Nūḥ (ʿalayh as-salām), he said:</p>
                  <Verse
                    tone="indigo"
                    arabic="رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ"
                  >
                    “My Lord! Forgive me and my parents, and him who enters my
                    house as a believer, and the believing men and the believing
                    women…” (Nūḥ 71:28).
                  </Verse>
                  <p>
                    Therefore, this shows that the two parents of Nūḥ were
                    believers.
                  </p>
                </Card>

                <Card className="border-sky-200">
                  <p className="font-semibold">Another point of benefit</p>
                  <p className="mt-1">
                    Imām Aḥmad رحمه الله said: “Three subjects lack basis:
                    Al-Maghāzī (The Prophet’s Expeditions), Al-Malāḥim
                    (Tribulations) and Tafsīr (Qur’ān Exegesis)”. So, most of
                    what is mentioned in these subjects are without chains of
                    transmission. As such, that the exegetes would mention the
                    story of Ādam regarding the verse:
                    <em> ‘But when He gave them a righteous child…’</em>{" "}
                    (Al-Aʿrāf 7:190), only a few of them refute the false
                    stories narrated about it.
                    <span className="opacity-70"> (1)</span>
                  </p>
                </Card>
              </Section>

              {/* AL-MU’MINŪN 57–61 & LA YUSHRIKŪN — pp. 103–104 */}
              <Section
                id="mu-minun-57-61"
                tone="indigo"
                title="‘And those who do not associate partners with their Lord’"
                subtitle="Al-Mu’minūn 57–61: awe, īmān in āyāt, no shirk, giving with fearful hearts."
              >
                <p>
                  So, the rule is that: No one knows anything about the past
                  generations except through revelation. Allah the Exalted says:
                </p>
                <Verse
                  tone="indigo"
                  arabic="أَلَمْ يَأْتِكُمْ نَبَؤُا الَّذِينَ مِنْ قَبْلِكُمْ قَوْمِ نُوحٍ وَعَادٍ وَثَمُودَ وَالَّذِينَ مِنْ بَعْدِهِمْ لَا يَعْلَمُهُمْ إِلَّا اللَّهُ"
                >
                  “Have not the tidings come to you of those before you, the
                  people of Noah and the tribes of ʿĀd and Thamūd and those
                  after them? None knows them now save Allah.” (Ibrāhīm 14:9).
                </Verse>

                <Verse
                  tone="indigo"
                  arabic="وَالَّذِينَ هُمْ بِرَبِّهِمْ لَا يُشْرِكُونَ"
                >
                  “And those who ascribe not partners to their Lord.”
                  (Al-Mu’minūn 23:59).
                </Verse>

                <p>
                  <strong>Commentary:</strong> The second verse “And those who
                  ascribe not partners to their Lord” (Al-Mu’minūn 23:59), is
                  preceded by the verse: “Verily, those who tremble with fear of
                  their Lord” (23:57). However, the author only mentioned the
                  point of reference.
                </p>

                <p>
                  His saying: <em>min khashyati rabbihim</em> “…with fear of
                  their Lord”—that is, due to their fear of Him, out of
                  knowledge. And His saying: <em>mushfiqūn</em>; i.e. they fear
                  His punishment should they disobey Him.
                </p>

                <p>
                  Sins, in the general sense – as has preceded
                  <span className="opacity-70"> (1)</span> – are all from Shirk
                  since they spring from following the desire contrary to the
                  Sharīʿah.
                </p>

                <Verse
                  tone="indigo"
                  arabic="أَفَرَأَيْتَ مَنِ اتَّخَذَ إِلَٰهَهُ هَوَاهُ"
                >
                  “Have you considered the case of him who has taken his own
                  self desire for his god.” (Al-Jāthiyah 45:23).
                </Verse>

                <p>
                  However, in a more specific sense, the scholars have graded it
                  into two categories:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Shirk.</strong>
                  </li>
                  <li>
                    <strong>Immorality.</strong>
                  </li>
                </ul>

                <p>
                  His saying: <em>lā yushrikūn</em> refers to Shirk in the
                  general sense since Tawheed cannot be truly attained except by
                  shunning Shirk in its general sense. Although this does not
                  mean that they will not fall into sins because all sons of
                  Ādam commit sins and are weak. But when they fall into sins,
                  they repent and do not continue with it as Allah the Exalted
                  says:
                </p>

                <Verse
                  tone="indigo"
                  arabic="وَالَّذِينَ إِذَا فَعَلُوا فَاحِشَةً أَوْ ظَلَمُوا أَنفُسَهُمْ ذَكَرُوا اللَّهَ فَاسْتَغْفَرُوا لِذُنُوبِهِمْ وَمَن يَغْفِرُ الذُّنُوبَ إِلَّا اللَّهُ وَلَمْ يُصِرُّوا عَلَىٰ مَا فَعَلُوا وَهُمْ يَعْلَمُونَ"
                >
                  “And those, who, when they commit a foul deed or wrong
                  themselves, remember Allah and ask forgiveness for their sins
                  – and who forgives sins except Allah? – and do not knowingly
                  persist in what they do.” (Āl ʿImrān 3:135).
                </Verse>
              </Section>

              {/* RUQYAH, KAYY, OMENS & THE 70,000 — to be added next chunk */}
              <Section
                id="seventy-thousand"
                tone="amber"
                title="The 70,000 who enter without reckoning"
                subtitle="Ruqyah (yastarqun), cauterization, omens — and reliance on Allah."
              >
                {/* Setup: Husayn → Sa‘īd b. Jubayr & the ruqyah question */}
                <Card className="border-amber-300">
                  <p className="font-semibold">Narration setup</p>
                  <p className="mt-2 leading-7">
                    Ḥusayn b. ʿAbdir-Raḥmān said: &ldquo;I was with Saʿīd b.
                    Jubayr when he said: &lsquo;Who among you saw the star that
                    fell last night?&rsquo; I answered: &lsquo;I did.&rsquo;
                    Then I said: &lsquo;But I was not in prayer; rather, I was
                    bitten.&rsquo; He asked: &lsquo;So, what did you do?&rsquo;
                    I replied: &lsquo;I used ruqyah (exorcism).&rsquo; He asked:
                    &lsquo;What made you do that?&rsquo; I replied: &lsquo;A
                    ḥadīth which Ash-Shaʿbī narrated to us.&rsquo; He said:
                    &lsquo;What did he tell you?&rsquo; I responded: &lsquo;He
                    reported from Buraydah b. al-Ḥuṣayb that there should be no
                    exorcism except for evil eye or bite.&rsquo; Saʿīd said:
                    &lsquo;He has done well. The one who holds onto what he has
                    learnt has done well! However, Ibn ʿAbbās narrated to us
                    that…&rsquo;&rdquo;
                  </p>
                </Card>

                {/* The long hadith of the nations & the 70,000 */}
                <Card className="border-amber-300">
                  <p className="font-semibold">
                    Text of the ḥadīth (summary, with key lines verbatim)
                  </p>
                  <p className="mt-2 leading-7">
                    &ldquo;…the Prophet (ﷺ) said:{" "}
                    <em>
                      ‘Nations were shown to me and I saw a prophet with one or
                      two persons, and another prophet with no people. Then I
                      was shown a huge crowd and I thought they were my people.
                      I was told: This is Mūsā (ʿalayhi as-salām) and his
                      people. I looked up and saw another large multitude and I
                      was told: These are your people, and among them will be
                      seventy thousand who will enter Paradise without
                      accounting or punishment.’
                    </em>{" "}
                    He (ﷺ) then stood up and entered his house. The people
                    discussed who those might be: some said perhaps those who
                    accompanied the Messenger (ﷺ); others said those born in
                    Islam who never associated partners. The Messenger (ﷺ) came
                    out and said:{" "}
                    <em>
                      ‘They are those who do not seek to be cauterized, they are
                      those who do not get cauterized, they do not see omens,
                      and they rely only on their Lord.’
                    </em>{" "}
                    ʿUkāshah b. Miḥṣan stood and said:{" "}
                    <em>‘Ask Allah to make me one of them.’</em> He (ﷺ) said:{" "}
                    <em>‘You are among them.’</em> Another man stood and asked,
                    and he (ﷺ) replied: <em>‘ʿUkāshah has preceded you.’</em>
                    &rdquo;
                  </p>
                </Card>

                {/* Linguistic & contextual notes from the commentary */}
                <Card className="border-amber-200">
                  <p className="font-semibold">Notes from the commentary</p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>
                      <strong>al-Banātiḥān</strong> refers to the{" "}
                      <em>shooting star</em>. The phrasing “fell last night”
                      ties to Arab usage counting the night to the following
                      day; some grammarians distinguish forms like
                      <em> al-Banātiḥā</em> vs <em>al-Banātiḥāʾ</em> depending
                      on reference.
                    </li>
                    <li>
                      Ḥusayn added “I was not in prayer” to avoid being praised
                      for something he did not do — unlike those pleased to be
                      thought praying; such seeking of reputation is a flaw in
                      tawḥīd.
                    </li>
                    <li>
                      He was <em>bitten</em> (likely by a scorpion or similar),
                      severe enough to keep him from sleep, hence he sought
                      ruqyah.
                    </li>
                    <li>
                      The Salaf dialogued to reach truth: Saʿīd didn’t rush to
                      refute Ḥusayn but asked for his <em>evidence</em>.
                    </li>
                  </ul>
                </Card>

                {/* Ruqyah: definitions, scope, permissibility */}
                <Section
                  id="ruqyah-scope"
                  tone="emerald"
                  title="Ruqyah: scope & cases"
                >
                  <p>
                    <strong>“No ruqyah except for evil eye or bite.”</strong>{" "}
                    This shows its permissibility for these harms. The{" "}
                    <em>evil eye</em> (often called
                    <em> an-nuhaatah</em>, <em>an-nafs</em>, or{" "}
                    <em>al-ḥasad</em>) is a look from an envious heart that can
                    manifest harm. <em>al-humah</em> covers venomous creatures
                    (e.g., scorpions).
                  </p>

                  <Card className="border-emerald-200">
                    <p className="font-semibold">
                      Prophetic case study: ruqyah with al-Fātiḥah
                    </p>
                    <p className="mt-1">
                      A detachment asked for hospitality and were refused. The
                      local chief was stung; they asked, “Who knows ruqyah?” One
                      companion recited Sūrat al-Fātiḥah{" "}
                      <em>three or seven times</em> over him; he rose as if
                      freed from shackles. The Prophet (ﷺ) later asked, “How did
                      you know it is ruqyah?” — confirming its benefit by
                      Allah’s permission.
                    </p>
                  </Card>

                  <Card className="border-emerald-200">
                    <p className="font-semibold">
                      Evil eye — additional remedies
                    </p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>
                        <strong>Bathing method:</strong> The one suspected of
                        giving the eye performs wuḍūʾ; the collected water is
                        poured over the afflicted (and may be drunk) — a known
                        cure by Allah’s leave.
                      </li>
                      <li>
                        <strong>Contact traces:</strong> Using damp earth from
                        his footprint or a garment that directly touched his
                        skin (robe, cap, trousers); water is poured over it,
                        then sprinkled on the afflicted.
                      </li>
                      <li>
                        The one who is impressed should say:{" "}
                        <em>Bārakallāhu ʿalayk</em>
                        (“May Allah bless you”). The Prophet (ﷺ) said to ʿĀmir
                        b. Rabīʿah, when he stared at Sahl b. Ḥanīf:{" "}
                        <em>
                          “You would have sought Allah’s blessing for him.”
                        </em>
                        <span className="opacity-70"> (1)</span>
                      </li>
                    </ul>
                  </Card>
                </Section>

                {/* The nations: counts, crowds, and lessons */}
                <Section
                  id="nations-counts"
                  tone="indigo"
                  title="The nations shown to the Prophet ﷺ"
                >
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      It appears this was <em>a dream-vision</em> (see Fatḥ
                      al-Bārī 11/407).
                      <em>Umam</em> is the plural of <em>ummah</em>, i.e., each
                      prophet’s people.
                    </li>
                    <li>
                      <em>Raht</em> denotes a group from{" "}
                      <strong>three to nine</strong>.
                    </li>
                    <li>
                      “A prophet with one or two persons” — the conjunction “or”
                      clarifies: one prophet had <em>one</em> follower, another
                      had <em>two</em>.
                    </li>
                    <li>
                      <em>as-Sawād</em> (literally “blackness”) refers to the
                      dense mass of people — “a huge crowd.”
                    </li>
                    <li>
                      The first multitude seen was Mūsā’s people; the second,
                      even larger, was the Ummah of Muḥammad ﷺ, within whom are
                      the seventy thousand who enter without reckoning.
                    </li>
                  </ul>

                  <Card className="border-indigo-200">
                    <p className="font-semibold">
                      Who are the 70,000? Companions’ proposals
                    </p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>
                        <strong>General companionship?</strong> Possibly — but
                        if so, they might have said “<em>we</em>,” since the
                        discussants were themselves companions.
                      </li>
                      <li>
                        <strong>Those who accompanied the Hijrah?</strong> This
                        matches the usage in &ldquo;Do not abuse my
                        companions&rdquo; (re: those who migrated) — yet their
                        number did not reach 70,000.
                      </li>
                      <li>
                        <strong>Those at the Conquest?</strong> After the
                        Conquest, people entered Islam in groups; also
                        plausible. The matter “deserves further research,” as
                        the commentary notes.
                      </li>
                    </ul>
                  </Card>
                </Section>

                {/* Traits of the 70,000, with variant readings discussion */}
                <Section
                  id="traits-70000"
                  tone="amber"
                  title="The defining traits"
                >
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>
                        “They do not seek ruqyah” (lā <em>yastarqun</em>):
                      </strong>{" "}
                      Some narrations read “they do not perform ruqyah” (lā
                      <em> yarqūn</em>), but Ibn Taymiyyah رحمه الله judged the
                      <em> yastarqun</em> wording correct, since the Prophet (ﷺ){" "}
                      <em>did</em>
                      perform ruqyah; Jibrīl performed ruqyah on him, and
                      ʿĀʾishah (رضي الله عنها) did so as well — as did the
                      companions. The point here is{" "}
                      <strong>not requesting</strong> it, which signals a higher
                      rung of <HL>tawakkul</HL>.
                    </li>
                    <li>
                      <strong>
                        “They do not get cauterized” (lā <em>yaktawūn</em>):
                      </strong>{" "}
                      i.e., they do not <em>request</em> it. If a
                      state-appointed cauterizer performs his duty without one
                      lowering himself to beg, that’s different (reporting a
                      need vs. abasing oneself).
                    </li>
                    <li>
                      <strong>
                        “They do not see omens” (lā <em>yatatayyaron</em>):
                      </strong>{" "}
                      From <em>ṭayr</em> (birds). Pre-Islamic Arabs took omens
                      from birds, sounds, times, and places. Islam nullified
                      this for its harmful psychological effects.
                      <Card className="mt-2 border-amber-200">
                        <p className="font-semibold">
                          Examples the commentary mentions
                        </p>
                        <ul className="mt-2 list-disc pl-6 space-y-1">
                          <li>
                            Pessimism about marriage in <em>Shawwāl</em> —
                            refuted by ʿĀʾishah: &ldquo;The Messenger of Allah
                            (ﷺ) married me in Shawwāl and consummated the
                            marriage with me in Shawwāl. Who among you is more
                            fortunate than me?&rdquo;
                          </li>
                          <li>
                            Ill-omens from certain weekdays (e.g., Wednesdays)
                            or months (e.g., Ṣafar).
                          </li>
                        </ul>
                      </Card>
                    </li>
                    <li>
                      <strong>“And they rely upon their Lord”</strong> — the
                      capstone that explains the rest: abandoning omens, not
                      requesting ruqyah/cautery, flows from{" "}
                      <HL>pure reliance</HL>.
                    </li>
                  </ul>

                  <Callout tone="amber">
                    Does lacking these traits make one <em>blameworthy</em>? The
                    commentary clarifies: seeking treatment is allowed, but
                    requesting ruqyah/cautery means missing a degree of{" "}
                    <em>perfection</em> in tawakkul — not falling into sin
                    (unlike taking omens, which is prohibited and harmful).
                  </Callout>

                  <Card className="border-amber-200">
                    <p className="font-semibold">Ruqyah vs. medication</p>
                    <p className="mt-1">
                      If ruqyah does not benefit, it doesn’t harm; medicines can
                      harm if misused. The Sunnah balances lawful means (
                      <em>asbāb</em>) with sincere reliance — abandoning means
                      altogether is not the Prophetic path.
                    </p>
                  </Card>

                  <Card className="border-amber-200">
                    <p className="font-semibold">
                      Being treated without asking
                    </p>
                    <p className="mt-1">
                      If someone offers ruqyah to you without request, accepting
                      it does <em>not</em> diminish perfect reliance. The
                      Prophet (ﷺ) did not prevent ʿĀʾishah from treating him,
                      and he is the most perfect in tawakkul. The ḥadīth’s
                      phrase targets <strong>seeking</strong> these treatments.
                    </p>
                  </Card>
                </Section>

                {/* ‘Ukāshah’s request and the Prophet’s two replies */}
                <Section
                  id="ukasha"
                  tone="emerald"
                  title="ʿUkāshah — “You are among them”"
                >
                  <p>
                    Is &ldquo;You are among them&rdquo; pure{" "}
                    <em>information</em> (khabar) or a <em>supplication</em>{" "}
                    granted? The version in al-Bukhārī has the duʿāʾ:
                    <em> “O Allah! Make him one of them.”</em> That indicates
                    the report, &ldquo;You are among them,&rdquo; conveys
                    acceptance.
                  </p>
                  <p className="mt-2">
                    As for the second man, the Prophet (ﷺ) said, &ldquo;ʿUkāshah
                    has preceded you.&rdquo; The commentary mentions two
                    wisdoms: (1) the man may have been a hypocrite and the
                    Prophet avoided confronting him; (2) to prevent opening the
                    floodgates for everyone to demand this station. The phrase
                    has since become proverbial.
                  </p>
                </Section>
              </Section>

              <Section
                id="important-matters-05"
                tone="rose"
                title="Important Matters — 22 Points"
                subtitle="From the chapter: Whoever truly attains Tawḥīd enters Paradise without accounting."
              >
                {/* 1) The list exactly as in the article */}
                <Card className="border-rose-200/70">
                  <p className="font-semibold text-slate-900">
                    Concise list (1–22)
                  </p>
                  <ol className="mt-2 list-decimal list-inside space-y-1">
                    <li>
                      Knowing of the categories of people regarding Tawheed.
                    </li>
                    <li>What does truly affirming it mean?</li>
                    <li>
                      His praise for Ibraheem (alayh as-salaam) for the fact
                      that he was not one of those who associate partners with
                      Allah.
                    </li>
                    <li>
                      His praise for eminent friends of Allah for their
                      abandonment of Shirk.
                    </li>
                    <li>
                      The fact that leaving exorcism and cauterization is from
                      true affirmation of Tawheed.
                    </li>
                    <li>
                      The fact that the one with all those qualities is the
                      truly reliant on Allah.
                    </li>
                    <li>
                      The depth of the knowledge of the companions for the fact
                      that they knew that they can not achieve that except with
                      deeds.
                    </li>
                    <li>Their zeal for good.</li>
                    <li>The excellence of this Ummah in number and manner.</li>
                    <li>
                      The excellence of the followers of Moosa (alayh
                      as-salaam).
                    </li>
                    <li>Showing the nations to him (ﷺ).</li>
                    <li>
                      That every nation will be raised separately with its
                      prophet.
                    </li>
                    <li>Fewness of those who accepted the prophets.</li>
                    <li>
                      That anyone who was not accepted by anybody will be raised
                      alone.
                    </li>
                    <li>
                      The fruit of this knowledge: not been deluded with large
                      numbers and not been sufficed with small numbers.
                    </li>
                    <li>
                      Permissibility of exorcizing against the evil eye and
                      bite.
                    </li>
                    <li>
                      The in-depth knowledge of the pious predecessors as
                      evident in his saying: “he who holds on to what he has
                      learnt has really done well”. So it became known that the
                      first hadeeth does not contradict the second.
                    </li>
                    <li>
                      The pious predecessors were far from praising a person for
                      the quality he does not have.
                    </li>
                    <li>
                      His saying: ‘you are among them’ is one of the signs of
                      prophethood.
                    </li>
                    <li>The excellence of ‘Ukaashah.</li>
                    <li>(The allowance of the) use of indirect expressions.</li>
                    <li>His noble character (ﷺ).</li>
                  </ol>
                </Card>

                {/* 2) Commentary — item-by-item as in the article */}
                <Card className="border-rose-300">
                  <p className="font-semibold">Commentary overview</p>
                  <p className="mt-1">
                    <strong>Important Matters</strong> = issues contained in
                    this chapter and expounded by the author.
                  </p>
                </Card>

                {/* 1–2 */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    1) Categories of people &nbsp; 2) Meaning of true
                    affirmation
                  </p>
                  <p className="mt-1">
                    <HL>1)</HL> Derived from the Prophet’s description of those
                    who enter without reckoning: “They do not seek to be
                    exorcised, they do not get cauterized, they do not seek evil
                    omens, and upon their Lord they rely.”
                  </p>
                  <p className="mt-1">
                    <HL>2)</HL> True affirmation ={" "}
                    <strong>freeing Tawḥīd from shirk</strong>. This was stated
                    at the beginning of the chapter.
                  </p>
                </Card>

                {/* 3) Praise for Ibrahim via 16:120 */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    3) Praise for Ibrāhīm for abandoning shirk
                  </p>
                  <Verse
                    tone="indigo"
                    arabic="إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِلَّهِ حَنِيفًا وَلَمْ يَكُ مِنَ الْمُشْرِكِينَ"
                  >
                    “Verily, Ibrāhīm was an Ummah, obedient to Allah, ḥanīf, and
                    he was not of the polytheists.” (An-Naḥl 16:120)
                  </Verse>
                  <p className="mt-1">
                    The verse is praise for Ibrāhīm (ʿalayhi as-salām); thus
                    anyone who is free of shirk is praiseworthy before Allah.
                  </p>
                </Card>

                {/* 4) Praise for the eminent awliyā’ — Al-Mu’minūn 57–61 */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    4) Praise for the eminent friends of Allah for leaving shirk
                  </p>
                  <Verse
                    tone="indigo"
                    arabic="إِنَّ الَّذِينَ هُمْ مِّنْ خَشْيَةِ رَبِّهِمْ مُّشْفِقُونَ (57) وَالَّذِينَ هُم بِآيَاتِ رَبِّهِمْ يُؤْمِنُونَ (58) وَالَّذِينَ هُم بِرَبِّهِمْ لَا يُشْرِكُونَ (59) وَالَّذِينَ يُؤْتُونَ مَا آتَوا وَّقُلُوبُهُمْ وَجِلَةٌ أَنَّهُمْ إِلَىٰ رَبِّهِمْ رَاجِعُونَ (60) أُولَٰئِكَ يُسَارِعُونَ فِي الْخَيْرَاتِ وَهُمْ لَهَا سَابِقُونَ (61)"
                  >
                    (Al-Mu’minūn 57–61)
                  </Verse>
                  <p className="mt-1">
                    These are the eminent friends of Allah. The author’s
                    phrasing attributes the adjective to the noun:{" "}
                    <em>the friends of Allah who are eminent</em>.
                  </p>
                </Card>

                {/* 5–6: Ruqyah/cautery & tawakkul */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    5) Leaving ruqyah/cauterization &nbsp; 6) True reliance
                  </p>
                  <p className="mt-1">
                    By “leaving,” the intent here is{" "}
                    <strong>not seeking</strong> (istirqā’) and{" "}
                    <strong>not requesting</strong> cauterization (iktawā’). The
                    one who has all four qualities is truly reliant upon Allah.
                  </p>
                </Card>

                {/* 7–8: Companions’ understanding & zeal */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    7) Depth of the Companions’ knowledge &nbsp; 8) Their zeal
                    for good
                  </p>
                  <p className="mt-1">
                    They understood this rank is not achieved except by deeds,
                    hence they discussed who those people might be — in order to
                    act accordingly.
                  </p>
                </Card>

                {/* 9–10: Excellence of this Ummah and of Mūsā’s followers */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    9) Excellence of this Ummah (number & manner) &nbsp; 10)
                    Excellence of Mūsā’s followers
                  </p>
                  <p className="mt-1">
                    Number: the Prophet ﷺ saw a multitude larger than that of
                    Mūsā (ʿalayh as-salām). Manner: among them are those who
                    rely purely, shun omens, and do not seek ruqyah/cautery.
                  </p>
                  <p className="mt-1">
                    The ḥadīth’s wording “a great crowd… I thought they were my
                    people” shows the numerousness of Mūsā’s people as well.
                  </p>
                </Card>

                {/* 11–12: Showing the nations; raised with their prophet */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    11) Nations shown to him ﷺ &nbsp; 12) Every nation raised
                    with its prophet
                  </p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>
                      Benefit 1: solace — he sees prophets with only one, two,
                      or no followers and says:
                      <Verse
                        tone="indigo"
                        arabic="وَمَا كُنتُ بِدْعًا مِّنَ الرُّسُلِ"
                      >
                        “I am not a novelty among the messengers.” (Al-Aḥqāf
                        46:9)
                      </Verse>
                    </li>
                    <li>
                      Benefit 2: making his excellence known — he is the most
                      followed and most eminent.
                    </li>
                  </ul>
                  <Verse
                    tone="indigo"
                    arabic="وَتَرَىٰ كُلَّ أُمَّةٍ جَاثِيَةً ۚ كُلُّ أُمَّةٍ تُدْعَىٰ إِلَىٰ كِتَابِهَا"
                  >
                    “You will see every nation on its knees; every nation will
                    be called to its Book.” (Al-Jāthiyah 45:28)
                  </Verse>
                </Card>

                {/* 13–14: Fewness of acceptance; raised alone if none accepted */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    13) Fewness of those who accepted the prophets &nbsp; 14)
                    Raised alone
                  </p>
                  <p className="mt-1">
                    Evidenced by “a prophet with some, another with one or two,
                    another with none” — whoever had none will be raised alone.
                  </p>
                </Card>

                {/* 15: Fruit — don’t be deceived by large numbers */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    15) Fruit of this knowledge: beware the numbers trap
                  </p>
                  <Verse
                    tone="indigo"
                    arabic="وَإِن تُطِعْ أَكْثَرَ مَن فِي الْأَرْضِ يُضِلُّوكَ عَن سَبِيلِ اللَّهِ"
                  >
                    “If you obey most of those on earth, they will mislead you
                    from Allah’s path.” (Al-Anʿām 6:116)
                  </Verse>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>
                      Don’t be destroyed following the many upon destruction.
                    </li>
                    <li>
                      Don’t become arrogant due to many upon salvation — the few
                      may be better than the many.
                    </li>
                  </ul>
                </Card>

                {/* 16–17: Ruqyah permissibility; salaf precision & three categories */}
                <Card className="border-rose-200">
                  <p className="font-semibold">
                    16) Ruqyah for evil eye & stings &nbsp; 17) Salaf precision
                  </p>
                  <p className="mt-1">
                    “No ruqyah except for evil eye or bite” establishes
                    permissibility. The statement “he who holds on to what he
                    has learnt has done well” shows careful adherence and that
                    the first ḥadīth doesn’t contradict the second.
                  </p>
                  <p className="mt-2">
                    The commentary then mentions{" "}
                    <strong>three categories</strong> regarding ruqyah:
                  </p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>
                      <strong>First:</strong> the one who does not reject to be
                      exorcized. He has missed the perfection since he has not
                      requested to be exorcized.
                    </li>
                    <li>
                      <strong>Second:</strong> the one who rejects to be
                      exorcized; he has also missed the perfection since his
                      rejection does not affect reliance on Allah.
                    </li>
                    <li>
                      <strong>Third:</strong> the one who rejects to be
                      exorcized in conformity with the Sunnah; because the
                      Prophet (ﷺ) did not prevent ʿĀʾishah from exorcising him.
                      This one has not also missed the perfection since his
                      rejection is perfect.
                    </li>
                  </ul>
                </Card>

                {/* 18–22: Further etiquettes and signs */}
                <Card className="border-rose-200">
                  <p className="font-semibold">18)–22) Final notes</p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>
                      <strong>18)</strong> The salaf avoided praising people for
                      qualities they did not have.
                    </li>
                    <li>
                      <strong>19)</strong> “You are among them” is a sign of
                      prophethood — revelation informed the Prophet (ﷺ) about
                      ʿUkāshah b. Miḥṣan.
                    </li>
                    <li>
                      <strong>20)</strong> The excellence of ʿUkāshah — among
                      those who will enter without reckoning; Ibn Ḥajar mentions
                      a specific report regarding him.
                    </li>
                    <li>
                      <strong>21)</strong> <em>Taʿrīḍ</em> (indirect expression)
                      is permitted; “ʿUkāshah has preceded you” became
                      proverbial.
                    </li>
                    <li>
                      <strong>22)</strong> His noble character (ﷺ): he closed
                      the matter graciously, without causing hurt or opening a
                      door to claims.
                    </li>
                  </ul>
                </Card>
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
