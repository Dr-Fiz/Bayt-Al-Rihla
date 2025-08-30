// src/aqeedah/books/kitab-at-tawhid/02-categories-of-tawheed.jsx
import React, { useMemo, useState, Suspense } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Timer,
  ChevronLeft,
  BookOpen,
} from "lucide-react";

/* ─────────────────────────── Tiny UI helpers (vibrant) ─────────────────────────── */

function Pill({ children, tone = "emerald" }) {
  const tones = {
    emerald:
      "border-emerald-500/80 bg-emerald-100 text-emerald-950 shadow-[inset_0_1px_0_#34d399]",
    sky: "border-sky-500/80 bg-sky-100 text-sky-950 shadow-[inset_0_1px_0_#38bdf8]",
    indigo:
      "border-indigo-500/80 bg-indigo-100 text-indigo-950 shadow-[inset_0_1px_0_#6366f1]",
    amber:
      "border-amber-500/80 bg-amber-100 text-amber-950 shadow-[inset_0_1px_0_#f59e0b]",
    rose: "border-rose-500/80 bg-rose-100 text-rose-950 shadow-[inset_0_1px_0_#f43f5e]",
    gray: "border-slate-400 bg-slate-100 text-slate-900",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function SectionTitle({ id, title, kicker, tone = "emerald" }) {
  const bars = {
    emerald: "from-emerald-500 to-emerald-400",
    sky: "from-sky-500 to-sky-400",
    indigo: "from-indigo-600 to-indigo-400",
    amber: "from-amber-500 to-amber-400",
    rose: "from-rose-500 to-rose-400",
  };
  return (
    <div id={id} className="not-prose">
      <div
        className={`h-1.5 w-28 rounded-full bg-gradient-to-r ${bars[tone]} drop-shadow`}
      />
      <div className="mt-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-slate-600">
        {kicker}
      </div>
      <h2 className="mt-1 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
        {title}
      </h2>
    </div>
  );
}

function SoftCard({ children, tone = "emerald", className = "" }) {
  const frames = {
    emerald:
      "border-emerald-400 ring-emerald-500/20 bg-gradient-to-br from-emerald-50 to-white",
    sky: "border-sky-400 ring-sky-500/20 bg-gradient-to-br from-sky-50 to-white",
    indigo:
      "border-indigo-400 ring-indigo-500/20 bg-gradient-to-br from-indigo-50 to-white",
    amber:
      "border-amber-400 ring-amber-500/20 bg-gradient-to-br from-amber-50 to-white",
    rose: "border-rose-400 ring-rose-500/20 bg-gradient-to-br from-rose-50 to-white",
    gray: "border-slate-300 ring-slate-400/15 bg-white",
  };
  return (
    <section
      className={`rounded-3xl border p-5 shadow-md ring-1 ${frames[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

function AyahCard({ arabic, translation, refText, tone = "sky" }) {
  const borders = {
    sky: "border-sky-300 from-sky-50",
    emerald: "border-emerald-300 from-emerald-50",
    indigo: "border-indigo-300 from-indigo-50",
    amber: "border-amber-300 from-amber-50",
    rose: "border-rose-300 from-rose-50",
    gray: "border-slate-300 from-white",
  }[tone];

  const titleColor = {
    sky: "text-sky-900",
    emerald: "text-emerald-900",
    indigo: "text-indigo-900",
    amber: "text-amber-900",
    rose: "text-rose-900",
    gray: "text-slate-900",
  }[tone];

  const refColor = {
    sky: "text-sky-800",
    emerald: "text-emerald-800",
    indigo: "text-indigo-800",
    amber: "text-amber-800",
    rose: "text-rose-800",
    gray: "text-slate-700",
  }[tone];

  return (
    <div
      className={`rounded-2xl border ${borders} bg-gradient-to-br to-white p-5 shadow-sm`}
    >
      {arabic && (
        <p
          dir="rtl"
          lang="ar"
          className={`text-2xl leading-relaxed font-semibold ${titleColor}`}
        >
          {arabic}
        </p>
      )}
      {translation && <p className="mt-3 text-slate-800">{translation}</p>}
      {refText && (
        <div className={`mt-2 text-[11px] font-extrabold ${refColor}`}>
          {refText}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────── Page ───────────────────────────────── */

export default function KTT_02() {
  const base = "/aqeedah/books/kitab-at-tawhid";
  const meta = { no: 2, title: "The Three Categories (Tawḥīd)" };
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("quiz") === "1" ? "quiz" : "article";

  if (mode === "quiz") {
    return <KTT02_QuizScreen setSearchParams={setSearchParams} />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(16,185,129,0.35),transparent),radial-gradient(900px_500px_at_90%_-10%,rgba(56,189,248,0.35),transparent)]">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <Link
            to={base}
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to index
          </Link>
          <div className="flex items-center gap-2 text-emerald-900">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-bold">Bayt Al Rihla • ʿAqīdah</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            <span className="mr-2 text-emerald-700">
              {String(meta.no).padStart(2, "0")}.
            </span>
            {meta.title}
          </h1>
          <p className="-mt-1 text-xs font-extrabold text-slate-600">
            Rubūbiyyah • Ulūhiyyah • Asmāʾ wa Ṣifāt — clear, vibrant, and
            proof-based
          </p>
        </div>

        <button
          onClick={() => setSearchParams({ quiz: "1" })}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-md hover:bg-emerald-700"
        >
          Test yourself
        </button>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 pb-20">
        {/* Overview & Map */}
        <SoftCard tone="emerald">
          <div className="flex items-center gap-2">
            <Pill>Overview &amp; Map</Pill>
          </div>
          <p className="mt-3 text-slate-800">
            The scholars explain <span className="font-semibold">Tawḥīd</span>{" "}
            in three complementary angles:{" "}
            <span className="font-semibold">Rubūbiyyah</span> (Lordship),
            <span className="font-semibold"> Ulūhiyyah/ʿIbādah</span> (Worship),
            and <span className="font-semibold">Asmāʾ wa Ṣifāt</span> (Names
            &amp; Attributes). Below are concise definitions with core proofs.
          </p>
        </SoftCard>

        {/* First Category: Rubūbiyyah — CREATION */}
        <SoftCard tone="emerald" className="mt-5">
          <div className="flex items-center gap-2">
            <Pill tone="emerald">1) at-Tawḥīd ar-Rubūbiyyah — Lordship</Pill>
          </div>

          <p className="mt-3 text-[15px] leading-7 text-slate-800">
            This is to single out Allah—the Mighty and Sublime—with{" "}
            <strong>creation</strong>, <strong>ownership</strong>, and{" "}
            <strong>control</strong>.
          </p>

          {/* Creation */}
          <div className="mt-5">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Creation
            </p>

            <AyahCard
              tone="sky"
              arabic="أَلَا لَهُ الْخَلْقُ وَالْأَمْرُ ۗ تَبَارَكَ اللَّهُ رَبُّ الْعَالَمِينَ"
              translation="“Surely His is the creation and commandment…”"
              refText="Al-Aʿrāf 7:54"
            />

            <SoftCard tone="gray" className="mt-3">
              <p className="text-[14px] leading-7 text-slate-800">
                In Arabic rhetoric this construction indicates <em>al-ḥaṣr</em>{" "}
                (restriction): the predicate is brought forward, which restricts
                creation and command to Allah alone.
              </p>
            </SoftCard>

            <AyahCard
              tone="emerald"
              arabic="هَلْ مِنْ خَالِقٍ غَيْرُ اللَّهِ يَرْزُقُكُمْ مِنَ السَّمَاءِ وَالْأَرْضِ ۚ"
              translation="“Is there any creator other than Allah who provides for you from the sky and the earth?”"
              refText="Fāṭir 35:3"
            />

            <SoftCard tone="gray" className="mt-3">
              <p className="text-[14px] leading-7 text-slate-800">
                This verse demonstrates exclusivity: the interrogative is a{" "}
                <em>challenge</em>, showing that none can claim real creation
                besides Him.
              </p>
            </SoftCard>

            <AyahCard
              tone="indigo"
              arabic="فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ"
              translation="“Blessed is Allah, the best of creators.”"
              refText="Al-Muʾminūn 23:14"
            />

            <SoftCard tone="gray" className="mt-3">
              <div className="text-[14px] leading-7 text-slate-800">
                <p className="font-semibold">Clarification:</p>
                <ul className="mt-1 list-disc pl-5">
                  <li>
                    Reports like the statement to picture-makers, “Bring to life
                    what you have created,” do <em>not</em> refer to true
                    creation from nothing. It is only transforming forms.
                  </li>
                  <li>
                    Human “creation” is restricted to what people can manipulate
                    and is extremely limited. True creation belongs to Allah
                    alone.
                  </li>
                </ul>
              </div>
            </SoftCard>
          </div>
        </SoftCard>

        {/* ── Rational proof: only One Creator ───────────────────────────────── */}
        <SoftCard tone="indigo" className="mt-5">
          <div className="flex items-center gap-2">
            <Pill tone="indigo">Rational Proof — Only One Creator</Pill>
          </div>

          <AyahCard
            tone="indigo"
            arabic="مَا اتَّخَذَ اللَّهُ مِنْ وَلَدٍ وَمَا كَانَ مَعَهُ مِنْ إِلَٰهٍ ۚ إِذًا لَذَهَبَ كُلُّ إِلَٰهٍ بِمَا خَلَقَ وَلَعَلَا بَعْضُهُمْ عَلَىٰ بَعْضٍ ۚ سُبْحَانَ اللَّهِ عَمَّا يَصِفُونَ"
            translation="“Allah has not taken a son, nor is there any god along with Him; if there had been many gods, each would have taken away what he created, and some would have tried to overcome others.”"
            refText="Al-Muʾminūn 23:91"
          />

          <SoftCard tone="gray" className="mt-3">
            <p className="text-[14px] leading-7 text-slate-800">
              If two creators existed, each would keep his own creation to
              himself—as kings deny rivals. Seeking sole authority, either one{" "}
              <strong>dominates</strong> the other (then he alone is Lord), or
              each is <strong>unable</strong> to overcome the other (then
              neither is fit for Lordship). Hence, the Creator is{" "}
              <strong>One</strong>.
            </p>
          </SoftCard>
        </SoftCard>

        {/* First Category continued — OWNERSHIP */}
        <SoftCard tone="amber" className="mt-6">
          <div className="flex items-center gap-2">
            <Pill tone="amber">Ownership</Pill>
          </div>

          <p className="mt-3 text-[15px] leading-7 text-slate-800">
            Singling out Allah with <strong>ownership</strong> means believing
            that no one owns the creatures except their Creator.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <AyahCard
              tone="amber"
              translation="“Allah’s is the dominion of the heavens and the earth.”"
              refText="Āl ʿImrān 3:189"
            />
            <AyahCard
              tone="amber"
              translation="“Say: in whose hand is the sovereignty of everything?”"
              refText="Al-Muʾminūn 23:88"
            />
          </div>

          <SoftCard tone="gray" className="mt-4">
            <div className="text-[14px] leading-7 text-slate-800">
              <p className="font-semibold">Human ownership is limited:</p>
              <ul className="mt-2 list-disc pl-5">
                <li>
                  It is <strong>restricted</strong> — one only “owns” what is in
                  his possession, not what belongs to others.
                </li>
                <li>
                  It is <strong>defective</strong> — a person may lack full
                  control over what he “owns”.
                </li>
                <li>
                  It is <strong>conditional</strong> — bound by Sharīʿah; one
                  cannot use property except as Allah has permitted (e.g.,
                  burning wealth or harming an animal is not permissible).
                </li>
              </ul>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <AyahCard
                  tone="gray"
                  translation="“Except from their wives or (the captives and slaves) that their right hands possess — for then they are free of blame.”"
                  refText="Al-Muʾminūn 23:6"
                />
                <AyahCard
                  tone="gray"
                  translation="“Or from that whereof you possess its keys.”"
                  refText="An-Nūr 24:61"
                />
              </div>

              <p className="mt-3">
                Contrast this with Allah: He owns{" "}
                <em>generally, perfectly, and unrestrictedly</em>.
              </p>
            </div>
          </SoftCard>
        </SoftCard>

        {/* First Category continued — CONTROL */}
        <SoftCard tone="sky" className="mt-6">
          <div className="flex items-center gap-2">
            <Pill tone="sky">Control (Tadbīr)</Pill>
          </div>

          <p className="mt-3 text-[15px] leading-7 text-slate-800">
            Singling out Allah with <strong>control</strong> means believing
            that no one disposes the affairs of the universe except Allah alone.
          </p>

          <div className="mt-4 grid gap-4">
            <AyahCard
              tone="sky"
              arabic="قُلْ مَن يَرْزُقُكُم مِّنَ السَّمَاءِ وَالْأَرْضِ أَمَّن يَمْلِكُ السَّمْعَ وَالْأَبْصَارَ وَمَن يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَيُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَمَن يُدَبِّرُ الْأَمْرَ ۚ فَسَيَقُولُونَ اللَّهُ ۚ فَقُلْ أَفَلَا تَتَّقُونَ ۝ فَذَٰلِكُمُ اللَّهُ رَبُّكُمُ الْحَقُّ ۖ فَمَاذَا بَعْدَ الْحَقِّ إِلَّا الضَّلَالُ ۖ فَأَنَّىٰ تُصْرَفُونَ"
              translation="“Say (O Muhammad ﷺ): Who provides for you from the sky and the earth? Or Who owns hearing and sight? And Who brings out the living from the dead and brings out the dead from the living? And Who disposes the affairs? They will say: Allah. Say: Will you not then be afraid? That is Allah, your Lord in truth. So after the truth what is there except error? How then are you turned away?”"
              refText="Yūnus 10:31–32"
            />
            <AyahCard
              tone="sky"
              arabic="وَلَئِن سَأَلْتَهُم مَّنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ لَيَقُولُنَّ خَلَقَهُنَّ الْعَزِيزُ الْعَلِيمُ"
              translation="“If you ask them, ‘Who created the heavens and the earth?’ they will surely say: ‘The All-Mighty, the All-Knower created them.’”"
              refText="Az-Zukhruf 43:9"
            />
          </div>

          <SoftCard tone="gray" className="mt-4">
            <p className="text-[14px] leading-7 text-slate-800">
              Human “control” is <strong>restricted</strong> to what one
              possesses and <strong>only</strong> as permitted by the Sharīʿah.
              True, comprehensive disposal of affairs is Allah’s alone.
            </p>
          </SoftCard>
        </SoftCard>

        {/* Pagans’ admission of Rubūbiyyah */}
        <SoftCard tone="indigo" className="mt-6">
          <div className="flex items-center gap-2">
            <Pill tone="indigo">Pagans’ Admission</Pill>
          </div>
          <p className="mt-3 text-[15px] leading-7 text-slate-800">
            The polytheists among whom the Messengers were sent generally
            acknowledged Allah’s Rubūbiyyah — that He alone created, owns, and
            controls. No people are known to have asserted two <em>equal</em>{" "}
            creators. Their error was in worship, not in Lordship.
          </p>
        </SoftCard>

        {/* The case of Firʿawn (arrogant denial) */}
        <SoftCard tone="rose" className="mt-6">
          <div className="flex items-center gap-2">
            <Pill tone="rose">Firʿawn’s Arrogant Denial</Pill>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <AyahCard
              tone="rose"
              translation="“I am your Lord, the Most Exalted.”"
              refText="An-Nāziʿāt 79:24"
            />
            <AyahCard
              tone="rose"
              translation="“I do not know for you any deity other than me.”"
              refText="Al-Qaṣaṣ 28:38"
            />
          </div>

          <AyahCard
            tone="rose"
            translation="“They denied them (the signs) wrongfully and arrogantly, though their souls were convinced thereof.”"
            refText="An-Naml 27:14"
          />

          <AyahCard
            tone="rose"
            translation="“(Mūsā said to Firʿawn): Verily, you know that none has sent down these (signs) except the Lord of the heavens and the earth.”"
            refText="Al-Isrāʾ 17:102"
          />

          <SoftCard tone="gray" className="mt-3">
            <p className="text-[14px] leading-7 text-slate-800">
              Thus Firʿawn’s rejection was not ignorance but{" "}
              <strong>arrogance</strong>: he knew the truth inwardly yet refused
              to submit.
            </p>
          </SoftCard>
        </SoftCard>

        {/* Dualists (fire-worshippers) */}
        <SoftCard tone="amber" className="mt-6">
          <div className="flex items-center gap-2">
            <Pill tone="amber">Fire-Worshippers’ Claim</Pill>
          </div>
          <div className="mt-3 text-[15px] leading-7 text-slate-800">
            <p>
              Some dualists claimed two creators: <strong>light</strong> (for
              good) and <strong>darkness</strong> (for evil). Even by their own
              reasoning this fails:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                They considered light inherently superior; the superior cannot
                be an equal rival to the inferior.
              </li>
              <li>
                Darkness is mere <em>absence</em> (non-existence), while light
                is positive existence and illumination — hence essentially
                better.
              </li>
              <li>
                Among philosophers they even differed whether darkness is
                pre-existent or created — a further inconsistency.
              </li>
            </ul>
          </div>
        </SoftCard>

        {/* =========================================================
   CHUNK 3 — Second Category (Ulūhiyyah / ʿIbādah)
   Paste this block inside <main>…</main> after CHUNK 2.
   ========================================================= */}

        <SoftCard tone="sky" className="p-5 mt-10">
          <div className="flex items-center gap-2">
            <Pill tone="sky">Second Category</Pill>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
              at-Tawḥīd al-Ulūhiyyah (al-ʿIbādah) — Singling out Allah in
              Worship
            </h3>
          </div>

          <p className="mt-3 text-[15px] leading-7 text-slate-800">
            Also called <strong>Tawḥīd al-ʿIbādah</strong>. When mentioned in
            connection with Allah, it is called <em>Tawḥīd al-Ulūhiyyah</em>;
            and when mentioned in connection with the servants, it is called{" "}
            <em>al-ʿIbādah</em> (worship). It is to single out Allah the Mighty
            and Sublime with <strong>every act of worship</strong>.
          </p>

          <AyahCard
            tone="sky"
            arabic="ذَٰلِكَ بِأَنَّ اللَّهَ هُوَ الْحَقُّ وَأَنَّ مَا يَدْعُونَ مِن دُونِهِ هُوَ الْبَاطِلُ وَأَنَّ اللَّهَ هُوَ الْعَلِيُّ الْكَبِيرُ"
            translation="That is because it is Allah alone Who is the True God, and whatever they call upon besides Him is false; and because it is Allah alone Who is the Most High, the Incomparably Great."
            refText="(Luqmān 31:30)"
          />

          {/* Meaning of al-ʿIbādah */}
          <div className="mt-4 rounded-2xl border border-sky-300 bg-gradient-to-br from-sky-50 to-white p-5">
            <p className="text-[13px] font-extrabold uppercase tracking-wide text-sky-700">
              Meaning of al-ʿIbādah — Two Usages
            </p>
            <ol className="mt-2 list-decimal pl-5 text-[15px] leading-7 text-slate-800">
              <li className="mb-2">
                <strong>Worship itself:</strong> submitting to Allah by doing
                His commands and avoiding His prohibitions, out of love and
                reverence for Him.
              </li>
              <li>
                <strong>The means by which worship is done:</strong> everything
                Allah loves and is pleased with — sayings and deeds, outward and
                inward.{" "}
                <span className="block mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-[14px]">
                  <span className="font-semibold">Ibn Taymiyyah:</span> “An
                  inclusive word for all that Allah loves and is pleased with;
                  of utterances and deeds — manifest and hidden.”
                </span>
              </li>
            </ol>

            <p className="mt-3 text-[15px] leading-7 text-slate-800">
              <strong>Example — Ṣalāh (prayer):</strong> its performance is
              worship itself, and it is also a vehicle by which worship is
              performed.
            </p>
          </div>

          {/* Requirements / proofs */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 to-white p-5">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-amber-700">
                Requirements of Tawḥīd al-ʿIbādah
              </p>
              <ul className="mt-2 list-disc pl-5 text-[15px] leading-7 text-slate-800">
                <li>Be subservient to Allah alone.</li>
                <li>Submit to Him out of love and reverence.</li>
                <li>Worship Him with what He has legislated and approved.</li>
              </ul>
              <div className="mt-3 space-y-3">
                <AyahCard
                  tone="amber"
                  translation="So set up not another god with Allah lest He sit you down condemned and forsaken."
                  refText="(Al-Isrāʾ 17:22)"
                />
                <AyahCard
                  tone="amber"
                  translation="All praise is due to Allah, Lord of the worlds."
                  refText="(Al-Fātiḥah 1:1) — His Lordship is the reason He alone deserves worship."
                />
                <AyahCard
                  tone="amber"
                  translation="O mankind! Worship your Lord Who created you and those before you so that you may attain righteousness."
                  refText="(Al-Baqarah 2:21)"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-rose-300 bg-gradient-to-br from-rose-50 to-white p-5">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-rose-700">
                Refutation of False Worship
              </p>
              <p className="mt-2 text-[15px] leading-7 text-slate-800">
                The One set apart with creation is the One Who deserves worship.
                It is sheer foolishness to worship created things which perish
                and cannot benefit, give life, sustain, or extend lifespan.
              </p>
              <ul className="mt-2 list-disc pl-5 text-[15px] leading-7 text-slate-800">
                <li>
                  Created things will perish and cannot benefit or harm you.
                </li>
                <li>
                  They cannot give life, sustain provision, or extend lifespan.
                </li>
                <li>
                  Worshipping the dead (e.g., calling upon someone rotting in
                  his grave) is irrational — he cannot benefit himself, let
                  alone you. In reality, he is in need of <em>your</em>{" "}
                  supplication, not the reverse.
                </li>
              </ul>
            </div>
          </div>

          {/* Most rejected category */}
          <div className="mt-6 rounded-2xl border border-indigo-300 bg-gradient-to-br from-indigo-50 to-white p-5">
            <p className="text-[13px] font-extrabold uppercase tracking-wide text-indigo-700">
              The Most Rejected Category of Tawḥīd
            </p>
            <p className="mt-2 text-[15px] leading-7 text-slate-800">
              This is the category most people denied. They often admitted
              Allah’s Lordship (Rubūbiyyah) but rejected His sole right to
              worship.
            </p>
            <div className="mt-3 space-y-3">
              <AyahCard
                tone="indigo"
                translation="We did not send any Messenger before you (O Muḥammad ﷺ) except that We revealed to him: ‘None has the right to be worshipped but I, so worship Me alone.’"
                refText="(Al-Anbiyāʾ 21:25)"
              />
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-[14px] leading-6 text-slate-700">
                <span className="font-semibold">Ḥadīth:</span> “I saw a prophet
                with a group; a prophet with one or two persons; and a prophet
                with whom there was nobody.”{" "}
                <span className="text-slate-500">
                  (al-Bukhārī &amp; Muslim)
                </span>
              </div>
            </div>
          </div>

          {/* Important note */}
          <div className="mt-6 rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5">
            <p className="text-[13px] font-extrabold uppercase tracking-wide text-emerald-700">
              Important Note
            </p>
            <p className="mt-2 text-[15px] leading-7 text-slate-800">
              Many later writers over-emphasized Rubūbiyyah as if addressing
              people who deny Allah’s existence. Although such deniers exist,
              many Muslims slip into <em>shirk</em> in worship without realizing
              it. Therefore, scholars stress teaching
              <strong> Tawḥīd al-Ulūhiyyah</strong> clearly so that those who
              claim Islam do not unknowingly commit acts of worship for other
              than Allah.
            </p>
          </div>
        </SoftCard>

        {/* -------------- CHUNK 3 end.
    Ask me for CHUNK 4 and I’ll add the Third Category:
    Asmāʾ & Ṣifāt — affirmation & negation; avoid Taḥrīf, Taʿṭīl,
    Takyīf, Tamthīl; quotes of al-Ghazālī and ar-Rāzī; and the
    Qurʾānic anchors (42:11, 20:5, 35:10, 20:110) with guidance.
   ----------------------------------------------------------- */}

        {/* =========================================================
   CHUNK 4 — Third Category (Asmāʾ & Ṣifāt)
   Paste this block after CHUNK 3, still inside <main>.
   ========================================================= */}

        <SoftCard tone="amber" className="p-5 mt-10">
          <div className="flex items-center gap-2">
            <Pill tone="amber">Third Category</Pill>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
              at-Tawḥīd al-Asmāʾ waṣ-Ṣifāt — Singling out Allah in His Names &
              Attributes
            </h3>
          </div>

          <p className="mt-3 text-[15px] leading-7 text-slate-800">
            This means to single out Allah the Mighty and Sublime with His{" "}
            <strong>Names</strong> and
            <strong> Attributes</strong>. It entails two obligations:
          </p>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-emerald-700">
                1) Affirmation (Ithbāt)
              </p>
              <p className="mt-1 text-[15px] leading-7 text-slate-800">
                Affirm for Allah everything He affirmed for Himself in the
                Qurʾān and what the Prophet ﷺ affirmed for Him in the Sunnah —
                without distortion or speculation.
              </p>
            </div>

            <div className="rounded-2xl border border-rose-300 bg-gradient-to-br from-rose-50 to-white p-5">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-rose-700">
                2) Negation (Nafy)
              </p>
              <p className="mt-1 text-[15px] leading-7 text-slate-800">
                Negate likeness and partners in His Names and Attributes; none
                of creation is like Him in any respect.
              </p>
            </div>
          </div>

          <AyahCard
            tone="indigo"
            arabic="لَيْسَ كَمِثْلِهِ شَيْءٌ وَهُوَ السَّمِيعُ الْبَصِيرُ"
            translation="There is nothing whatever like unto Him, and He is the All-Hearing, the All-Seeing."
            refText="(Ash-Shūrā 42:11)"
          />

          {/* Affirmation & Negation Examples */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-emerald-700">
                Examples of Affirmation
              </p>
              <div className="mt-2 space-y-3">
                <AyahCard
                  tone="emerald"
                  arabic="الرَّحْمَٰنُ عَلَى الْعَرْشِ اسْتَوَى"
                  translation="He is the Gracious God Who has settled Himself firmly over the Throne."
                  refText="(Ṭāhā 20:5)"
                />
                <AyahCard
                  tone="emerald"
                  arabic="إِلَيْهِ يَصْعَدُ الْكَلِمُ الطَّيِّبُ"
                  translation="Unto Him ascend pure words."
                  refText="(Fāṭir 35:10)"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-rose-300 bg-gradient-to-br from-rose-50 to-white p-5">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-rose-700">
                Examples of Negation
              </p>
              <div className="mt-2 space-y-3">
                <AyahCard
                  tone="rose"
                  arabic="لَيْسَ كَمِثْلِهِ شَيْءٌ"
                  translation="There is nothing whatever like unto Him."
                  refText="(Ash-Shūrā 42:11)"
                />
                <AyahCard
                  tone="rose"
                  arabic="وَلَا يُحِيطُونَ بِهِ عِلْمًا"
                  translation="…but they cannot compass Him with their knowledge."
                  refText="(Ṭāhā 20:110)"
                />
              </div>
            </div>
          </div>

          {/* The Four Errors to Avoid */}
          <div className="mt-6 rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="text-[13px] font-extrabold uppercase tracking-wide text-amber-700">
              Avoid These Four Errors
            </p>
            <ul className="mt-2 list-disc pl-5 text-[15px] leading-7 text-slate-800">
              <li>
                <strong>Taḥrīf (Distortion):</strong> twisting words away from
                their apparent meanings.
              </li>
              <li>
                <strong>Taʿṭīl (Negation):</strong> denying what Allah affirmed
                of His Names/Attributes.
              </li>
              <li>
                <strong>Takyīf (Asking “How”):</strong> claiming to know the
                modality or “how-ness” of His Attributes.
              </li>
              <li>
                <strong>Tamthīl (Likeness):</strong> likening Allah’s Attributes
                to those of creation. (Whoever makes <em>Tamthīl</em> has
                necessarily made <em>Takyīf</em>, though not vice-versa.)
              </li>
            </ul>
          </div>

          {/* On Ta'wīl vs Tafsīr */}
          <div className="mt-6 rounded-2xl border border-sky-300 bg-gradient-to-br from-sky-50 to-white p-5">
            <p className="text-[13px] font-extrabold uppercase tracking-wide text-sky-700">
              “Taʾwīl” vs. Tafsīr — What Counts as Distortion?
            </p>
            <p className="mt-2 text-[15px] leading-7 text-slate-800">
              Some call themselves <em>Ahl al-Taʾwīl</em> (“the people of
              interpretation”) to soften the word
              <em> Taḥrīf</em>. But the criterion is clear:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[15px] leading-7 text-slate-800">
              <li>
                If an interpretation is supported by{" "}
                <strong>sound evidence</strong>, it is proper{" "}
                <strong>Tafsīr</strong> (explanation).
              </li>
              <li>
                If it lacks sound proof and merely diverts a text from its
                apparent meaning, it is <strong>Taḥrīf</strong> (distortion).
              </li>
            </ul>
            <p className="mt-2 text-[15px] leading-7 text-slate-800">
              Those who tread this path ended up affirming some attributes but
              with distortion — a way contrary to Ahl as-Sunnah wal-Jamāʿah;
              their writings contain interpolations and contradictions.
            </p>
          </div>

          {/* Scholars' admissions (al-Ghazālī & ar-Rāzī) */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">
                Imām al-Ghazālī on Theological Rhetoric
              </p>
              <blockquote className="mt-2 text-[14px] leading-6 text-slate-700">
                He noted the <em>errors, inconsistency, and contradiction</em>{" "}
                found among the practitioners of kalām and that their method
                lacks certainty.
              </blockquote>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">
                Imām Fakhr ad-Dīn ar-Rāzī
              </p>
              <ul className="mt-2 list-disc pl-5 text-[14px] leading-6 text-slate-700 space-y-1">
                <li>
                  “The ultimate end of preferring intellect (over revelation) is
                  vanity.”
                </li>
                <li>
                  “Most of the efforts of the scholars of theological rhetoric
                  is misguidance.”
                </li>
                <li>“Our souls are in desolation inside our bodies.”</li>
                <li>
                  “The ultimate goal of our lives is toward harmful and bad
                  consequences.”
                </li>
                <li>
                  “We have not gained from our researches except hearsay.”
                </li>
                <li>
                  “I scrutinized the paths of freethinkers and philosophers; I
                  found no cure in them nor water for the thirsty. The best way
                  is the Qurʾān. I read and affirm:
                  <span className="block mt-1 font-semibold">
                    الرَّحْمَٰنُ عَلَى الْعَرْشِ اسْتَوَى (Ṭāhā 20:5); إِلَيْهِ
                    يَصْعَدُ الْكَلِمُ الطَّيِّبُ (Fāṭir 35:10)
                  </span>
                  and I negate likeness and encompassing knowledge, as in:
                  <span className="block mt-1 font-semibold">
                    لَيْسَ كَمِثْلِهِ شَيْءٌ (Ash-Shūrā 42:11); وَلَا يُحِيطُونَ
                    بِهِ عِلْمًا (Ṭāhā 20:110)
                  </span>
                  Whoever experiences what I experienced will recognize what I
                  recognized.”
                </li>
              </ul>
            </div>
          </div>

          {/* Method of Ahl as-Sunnah */}
          <div className="mt-6 rounded-2xl border border-indigo-300 bg-gradient-to-br from-indigo-50 to-white p-5">
            <p className="text-[13px] font-extrabold uppercase tracking-wide text-indigo-700">
              The Way of Ahl as-Sunnah wal-Jamāʿah
            </p>
            <ul className="mt-2 list-disc pl-5 text-[15px] leading-7 text-slate-800">
              <li>Read and submit to the Qurʾān and the authentic Sunnah.</li>
              <li>
                Affirm what Allah affirmed for Himself; negate any likeness to
                creation.
              </li>
              <li>Avoid Taḥrīf, Taʿṭīl, Takyīf, and Tamthīl.</li>
            </ul>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <AyahCard
                tone="indigo"
                translation="Allah desires to make clear to you…"
                refText="(An-Nisāʾ 4:26)"
              />
              <AyahCard
                tone="indigo"
                translation="Allah explains so that you do not go astray…"
                refText="(An-Nisāʾ 4:176)"
              />
              <AyahCard
                tone="indigo"
                translation="We have sent down to you the Book to explain everything."
                refText="(An-Naḥl 16:89)"
              />
              <AyahCard
                tone="indigo"
                translation="…and who is more truthful in word than Allah?"
                refText="(An-Nisāʾ 4:122; see also 4:87)"
              />
            </div>
            <p className="mt-3 text-[15px] leading-7 text-slate-800">
              These texts show that Allah provided sufficient clarity regarding
              the path to Him — and the greatest need is clarity about Allah
              Himself, His Names, and His Attributes so that He is worshipped
              upon clear knowledge.
            </p>
          </div>
        </SoftCard>
        {/* =========================================================
   CHUNK 5 — Method of the Salaf • Istiwāʾ • Descent ḥadīth • Duty
   Paste this block right after CHUNK 4, still inside <main>.
   ========================================================= */}

        <SoftCard tone="rose" className="p-5 mt-10">
          <div className="flex items-center gap-2">
            <Pill tone="rose">Methodology</Pill>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
              Hold back from “how?” and “why?” — the Way of the Salaf
            </h3>
          </div>

          <p className="mt-3 text-[15px] leading-7 text-slate-800">
            One must not transgress bounds by asking about the <em>how-ness</em>{" "}
            (<strong>takyīf</strong>) or attempting likeness (
            <strong>tamthīl</strong>) of Allah’s Attributes. If a person cannot
            fully comprehend his own self, he is even further from encompassing
            the reality of the Creator’s Attributes. Our path:{" "}
            <strong>affirm</strong> what Allah affirmed, <strong>negate</strong>{" "}
            any likeness, and <strong>submit</strong> without delving into
            modality.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <AyahCard
              tone="rose"
              arabic="لَيْسَ كَمِثْلِهِ شَيْءٌ"
              translation="There is nothing whatever like unto Him."
              refText="(Ash-Shūrā 42:11)"
            />
            <AyahCard
              tone="rose"
              arabic="وَلَا يُحِيطُونَ بِهِ عِلْمًا"
              translation="…but they cannot compass Him with their knowledge."
              refText="(Ṭāhā 20:110)"
            />
          </div>
        </SoftCard>

        <SoftCard tone="indigo" className="p-5 mt-6">
          <div className="flex items-center gap-2">
            <Pill tone="indigo">Statement of Imām Mālik</Pill>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
              On al-Istiwāʾ
            </h3>
          </div>

          <div className="mt-3 rounded-2xl border border-indigo-300 bg-gradient-to-br from-indigo-50 to-white p-5">
            <p
              dir="rtl"
              lang="ar"
              className="text-2xl leading-relaxed font-semibold text-indigo-900"
            >
              الرَّحْمَٰنُ عَلَى الْعَرْشِ اسْتَوَى
            </p>
            <div className="mt-3 text-[15px] leading-7 text-slate-800">
              <p>
                <strong>Imām Mālik (رحمه الله)</strong> said: “
                <em>al-Istiwāʾ</em> is known; its ‘how’ is unknown; belief in it
                is obligatory; and asking about it is innovation. I consider you
                an innovator.” This is the way of the Salaf:{" "}
                <strong>affirm without takyīf or tamthīl</strong>.
              </p>
            </div>
          </div>
        </SoftCard>

        <SoftCard tone="sky" className="p-5 mt-6">
          <div className="flex items-center gap-2">
            <Pill tone="sky">Hadīth Clarification</Pill>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
              Allah’s Descent in the Last Third of the Night
            </h3>
          </div>

          <p className="mt-3 text-[15px] leading-7 text-slate-800">
            Some imagine this implies that Allah remains in the worldly heaven
            throughout the entire global night because of time-zones. The
            Companions never understood it that way; had such a reading been
            intended, Allah or His Messenger ﷺ would have clarified it
            explicitly.
          </p>

          <ul className="mt-3 list-disc pl-5 text-[15px] leading-7 text-slate-800">
            <li>
              Ahl as-Sunnah affirm the descent{" "}
              <em>in a manner befitting His Majesty</em> — without asking how
              and without likeness.
            </li>
            <li>
              The descent occurs during the{" "}
              <strong>last third of the night in each locality</strong>; it is
              not a single continuous “global” presence.
            </li>
            <li>
              The descent <strong>ends at Fajr</strong> for that locality. There
              is no contradiction with{" "}
              <em>“There is nothing like unto Him.”</em> (42:11)
            </li>
          </ul>

          <div className="mt-4">
            <AyahCard
              tone="sky"
              arabic="لَيْسَ كَمِثْلِهِ شَيْءٌ وَهُوَ السَّمِيعُ الْبَصِيرُ"
              translation="There is nothing whatever like unto Him, and He is the All-Hearing, the All-Seeing."
              refText="(Ash-Shūrā 42:11)"
            />
          </div>
        </SoftCard>

        <SoftCard tone="emerald" className="p-5 mt-6">
          <div className="flex items-center gap-2">
            <Pill tone="emerald">Our Duty</Pill>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
              Submission, Worship, and Purpose
            </h3>
          </div>

          <p className="mt-3 text-[15px] leading-7 text-slate-800">
            Our stance is to say:{" "}
            <strong>We hear, we obey, we follow, and we believe</strong>. Do not
            go beyond the Qurʾān and authentic ḥadīth. Worship is built on
            clarity regarding Allah’s perfection, not speculative how-ness.
          </p>

          <div className="mt-4">
            <AyahCard
              tone="emerald"
              arabic="وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ"
              translation="And I have not created the jinn and the men except that they may worship Me."
              refText="(Adh-Dhāriyāt 51:56)"
            />
          </div>
        </SoftCard>

        {/* -------------- CHUNK 5 end.
    You now have the full article content rendered across vibrant sections.
    If you want, I can add a compact “Key Takeaways” box or a printable summary.
   ----------------------------------------------------------- */}

        {/* ===================== INSERT NEXT CHUNKS ABOVE THIS LINE ===================== */}
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200/80 bg-white/80">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-700">
          © {new Date().getFullYear()} Bayt Al Rihla
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   QUIZ BLOCK — Categories of Tawḥīd (30 Qs)
   - Paste inside this file (outside your main article layout)
   - Requires: SoftCard, Pill, AyahCard helpers (already on page)
   - Toggles by ?quiz=1 (uses useSearchParams above)
   ========================================================= */

// ------------- Question data -------------
const KTT02_QUESTIONS = [
  {
    id: 1,
    q: "Tawḥīd ar-Rubūbiyyah means singling Allah out in which of the following?",
    choices: [
      "Creation only",
      "Ownership only",
      "Control only",
      "Creation, ownership, and control",
    ],
    a: 3,
    exp: "Rubūbiyyah covers all three: creation, ownership and control (tadbīr).",
  },
  {
    id: 2,
    q: "“Surely His is the creation and commandment” is from which sūrah/āyah?",
    choices: [
      "Al-Aʿrāf 7:54",
      "Fāṭir 35:3",
      "Al-Muʾminūn 23:14",
      "Yūnus 10:31",
    ],
    a: 0,
    exp: "Al-Aʿrāf 7:54 indicates ḥaṣr (restriction): predicate brought forward restricts creation/command to Allah.",
  },
  {
    id: 3,
    q: "“Is there any creator other than Allah who provides for you from the sky and the earth?”",
    choices: [
      "Al-Muʾminūn 23:88",
      "Fāṭir 35:3",
      "Az-Zukhruf 43:9",
      "Yūnus 10:32",
    ],
    a: 1,
    exp: "Fāṭir 35:3 poses a challenge, proving creation is exclusive to Allah.",
  },
  {
    id: 4,
    q: "“Blessed is Allah, the best of creators” (23:14) means human 'creation' is:",
    choices: [
      "Equal to Allah’s creation",
      "Bringing from nothing",
      "Only transforming forms (limited)",
      "Independent origination",
    ],
    a: 2,
    exp: "Humans only transform; real creation is bringing into existence from nothing. See hadīth of image-makers.",
  },
  {
    id: 5,
    q: "Human ownership in Sharīʿah texts is best described as:",
    choices: [
      "Absolute and unrestricted",
      "Restricted, defective, and conditional",
      "Equal to Allah’s ownership",
      "Irrelevant",
    ],
    a: 1,
    exp: "Texts like 23:6 and 24:61 show that human ownership is limited and regulated by Sharīʿah.",
  },
  {
    id: 6,
    q: "“Allah’s is the dominion of the heavens and the earth” is from:",
    choices: [
      "Āl ʿImrān 3:189",
      "Al-Baqarah 2:21",
      "Al-Fātiḥah 1:1",
      "An-Nūr 24:61",
    ],
    a: 0,
    exp: "Āl ʿImrān 3:189 establishes exclusive dominion for Allah.",
  },
  {
    id: 7,
    q: "Which āyah enumerates: Provider, Owner of hearing and sight, Bringer of life/death, and Disposer of affairs?",
    choices: [
      "Yūnus 10:31–32",
      "Az-Zukhruf 43:9",
      "Al-Aʿrāf 7:54",
      "Fāṭir 35:3",
    ],
    a: 0,
    exp: "Yūnus 10:31–32 concludes: “That is Allah, your Lord in truth.”",
  },
  {
    id: 8,
    q: "Pagans at the Prophet’s time typically:",
    choices: [
      "Denied any Creator exists",
      "Admitted Allah created but associated partners in worship",
      "Worshipped Allah alone",
      "Believed in many creators equally",
    ],
    a: 1,
    exp: "They admitted Rubūbiyyah (e.g., 43:9) but rejected Ulūhiyyah; messengers disputed them about worship.",
  },
  {
    id: 9,
    q: "Firʿawn’s rejection of Rubūbiyyah was due to:",
    choices: [
      "Ignorance of the signs",
      "Arrogance despite knowing (27:14)",
      "Lack of evidence",
      "A misunderstanding of language",
    ],
    a: 1,
    exp: "Allah says they denied out of arrogance while their souls were convinced (An-Naml 27:14).",
  },
  {
    id: 10,
    q: "Identify the āyah: “I am your Lord, the Most Exalted.”",
    choices: [
      "Al-Qasas 28:38",
      "An-Nāziʿāt 79:24",
      "Al-Isrāʾ 17:102",
      "Al-Muʾminūn 23:88",
    ],
    a: 1,
    exp: "An-Nāziʿāt 79:24 quotes Firʿawn’s arrogance.",
  },
  {
    id: 11,
    q: "Rational proof in 23:91 shows that if there were many gods:",
    choices: [
      "They would cooperate perfectly",
      "Each would take what he created and overpower others, or all would be weak",
      "Creation would be better",
      "Morality would be relative",
    ],
    a: 1,
    exp: "Either one dominates (so he alone is Lord) or none can (so all are incapable). Hence, only One True Lord.",
  },
  {
    id: 12,
    q: "Tawḥīd al-Ulūhiyyah means:",
    choices: [
      "Singling Allah out with all acts of worship",
      "Acknowledging Allah created the heavens and earth",
      "Believing in angels",
      "Affirming Qadar only",
    ],
    a: 0,
    exp: "Ulūhiyyah/al-ʿIbādah is directing all devotion to Allah alone (31:30; 17:22; 2:21).",
  },
  {
    id: 13,
    q: "Which āyah states: “O mankind! Worship your Lord who created you…”?",
    choices: [
      "Al-Baqarah 2:21",
      "Al-Fātiḥah 1:1",
      "Āl ʿImrān 3:189",
      "Al-Isrāʾ 17:22",
    ],
    a: 0,
    exp: "Al-Baqarah 2:21 ties obligation to worship with the cause of creation by Allah.",
  },
  {
    id: 14,
    q: "Meaning of al-ʿIbādah per Ibn Taymiyyah:",
    choices: [
      "Only ritual acts",
      "An inclusive term for all that Allah loves and is pleased with—sayings and deeds, outward and inward",
      "Only inward acts",
      "Only outward acts",
    ],
    a: 1,
    exp: "Worship includes all that Allah loves and is pleased with; sayings/deeds, outward/inward.",
  },
  {
    id: 15,
    q: "Ṣalāh (prayer) in relation to ʿIbādah is:",
    choices: [
      "Only the means of worship",
      "Only worship itself",
      "Both worship itself and a means by which worship is performed",
      "Neither",
    ],
    a: 2,
    exp: "It is an act of worship and also a vehicle of worship.",
  },
  {
    id: 16,
    q: "Refutation of worshipping the dead includes that the dead:",
    choices: [
      "Can grant benefit independently",
      "Control provisions",
      "Cannot benefit/harm themselves, let alone others",
      "Know the unseen",
    ],
    a: 2,
    exp: "The dead are in need of your duʿāʾ; calling upon them is irrational and unscriptural.",
  },
  {
    id: 17,
    q: "Messengers were sent primarily to call people to:",
    choices: [
      "Acknowledge a Creator",
      "Social reform",
      "Worship Allah alone and avoid ṭāghūt",
      "Political unity",
    ],
    a: 2,
    exp: "Al-Anbiyāʾ 21:25: “None has the right to be worshipped but I, so worship Me.”",
  },
  {
    id: 18,
    q: "The ḥadīth about some prophets having only a few or no followers indicates:",
    choices: [
      "Prophethood can fail",
      "People often rejected Tawḥīd al-Ulūhiyyah",
      "Numbers determine truth",
      "They lacked miracles",
    ],
    a: 1,
    exp: "Bukhārī/Muslim; many nations rejected exclusive worship despite proofs.",
  },
  {
    id: 19,
    q: "Tawḥīd al-Asmāʾ waṣ-Ṣifāt obligates two things:",
    choices: [
      "Taʿṭīl and Tamthīl",
      "Affirmation of what Allah affirmed and negation of likeness",
      "Takyīf and Taḥrīf",
      "Ignoring the texts",
    ],
    a: 1,
    exp: "Ahl as-Sunnah affirm without distortion and deny any likeness to creation (42:11).",
  },
  {
    id: 20,
    q: "“There is nothing like unto Him, and He is the All-Hearing, the All-Seeing” is:",
    choices: ["Ṭāhā 20:5", "Fāṭir 35:10", "Ash-Shūrā 42:11", "An-Nūr 24:61"],
    a: 2,
    exp: "Ash-Shūrā 42:11 anchors both tanzīh (no likeness) and ithbāt (affirmation of attributes).",
  },
  {
    id: 21,
    q: "Which of the following is NOT among the four errors Ahl as-Sunnah avoid?",
    choices: ["Taḥrīf", "Taʿṭīl", "Takyīf", "Tafsīr"],
    a: 3,
    exp: "The four to avoid are Taḥrīf, Taʿṭīl, Takyīf, and Tamthīl.",
  },
  {
    id: 22,
    q: "Imām Mālik’s principle regarding Istiwāʾ includes:",
    choices: [
      "The how is known",
      "Asking how is innovation; belief is obligatory; the how is unknown",
      "Deny the attribute",
      "Interpret it metaphorically only",
    ],
    a: 1,
    exp: "“Al-Istiwāʾ is known; its how is unknown; belief is obligatory; asking about it is innovation.”",
  },
  {
    id: 23,
    q: "Correct stance on the ḥadīth of Allah’s descent in the last third of the night:",
    choices: [
      "He remains in the worldly heaven all night globally",
      "It contradicts 42:11",
      "He descends in a manner befitting His Majesty; descent ends at Fajr in each locality",
      "It must be rejected",
    ],
    a: 2,
    exp: "Affirm without asking how; locality-based last third resolves timing; ends at Fajr.",
  },
  {
    id: 24,
    q: "“He settled firmly over the Throne” and “Unto Him ascend pure words” teach:",
    choices: [
      "Negation only",
      "Affirmation only",
      "Affirmation of attributes/actions befitting His Majesty",
      "Pure metaphor",
    ],
    a: 2,
    exp: "Examples of ithbāt without takyīf or tamthīl (Ṭāhā 20:5; Fāṭir 35:10).",
  },
  {
    id: 25,
    q: "“Do not set up another god with Allah” refers to:",
    choices: [
      "Al-Isrāʾ 17:22",
      "Al-Fātiḥah 1:1",
      "Āl ʿImrān 3:189",
      "An-Nisāʾ 4:26",
    ],
    a: 0,
    exp: "A direct prohibition of shirk in worship.",
  },
  {
    id: 26,
    q: "Fire-worshippers’ claim of two creators fails because:",
    choices: [
      "Darkness is mere absence, not a rival existent; light’s superiority undercuts dualism",
      "Darkness is stronger",
      "The Qurʾān never addresses it",
      "All polytheism is equally valid",
    ],
    a: 0,
    exp: "Reason and revelation refute dualism; darkness is non-existence, not a co-eternal rival.",
  },
  {
    id: 27,
    q: "“All praise is due to Allah, Lord of the worlds” (1:1) supports:",
    choices: [
      "Rubūbiyyah only",
      "Ulūhiyyah only",
      "That the Lord of all is the One to be worshipped",
      "None",
    ],
    a: 2,
    exp: "The One Who is Rabb of all deserves all ḥamd and exclusive worship.",
  },
  {
    id: 28,
    q: "“Say: In whose hand is the sovereignty of everything?” is from:",
    choices: [
      "Al-Muʾminūn 23:88",
      "Az-Zukhruf 43:9",
      "Fāṭir 35:3",
      "Al-Baqarah 2:21",
    ],
    a: 0,
    exp: "A proof of exclusive mulk (ownership/sovereignty) for Allah.",
  },
  {
    id: 29,
    q: "Why is worshipping created things irrational per the article?",
    choices: [
      "Because they perish, cannot benefit/harm, nor sustain or extend life",
      "Because they are beautiful",
      "Because people dislike it",
      "Because it is traditional",
    ],
    a: 0,
    exp: "Only the Creator sustains and controls; the created are needy and perishing.",
  },
  {
    id: 30,
    q: "A concise way Salafiyyah frames the method in Names & Attributes:",
    choices: [
      "Deny all attributes to avoid likeness",
      "Affirm what Allah affirmed, negate what He negated, without Taḥrīf, Taʿṭīl, Takyīf, or Tamthīl",
      "Interpret everything figuratively",
      "Suspend judgment entirely",
    ],
    a: 1,
    exp: "Balanced path of Ahl as-Sunnah; see 42:11 and statements from the Salaf like Imām Mālik.",
  },
];

// ------------- Quiz UI -------------
function KTT02_QuizView({ onBack }) {
  const questions = useMemo(() => KTT02_QUESTIONS, []);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState([]); // {id, correct, selected}
  const [startTime] = useState(Date.now());
  const [showReview, setShowReview] = useState(false);

  const q = questions[idx];

  const submit = () => {
    if (selected == null) return;
    const correct = selected === q.a;
    setAnswered(true);
    setRecord((r) => [...r, { id: q.id, correct, selected }]);
    if (correct) setScore((s) => s + 1);
  };

  const next = () => {
    setSelected(null);
    setAnswered(false);
    if (idx + 1 < questions.length) setIdx((i) => i + 1);
  };

  const finished = idx === questions.length - 1 && answered;
  const totalMs = Date.now() - startTime;

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-emerald-400 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 drop-shadow" />
              <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                Quiz Completed — Your Results
              </h2>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-slate-700 flex items-center gap-2 justify-end">
                <Timer className="h-4 w-4 text-slate-600" />
                {(totalMs / 1000).toFixed(1)}s
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                Correct
              </div>
              <div className="mt-1 text-3xl font-black text-emerald-700">
                {score}
              </div>
            </div>
            <div className="rounded-2xl border border-rose-300 bg-rose-50 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-rose-800">
                Incorrect
              </div>
              <div className="mt-1 text-3xl font-black text-rose-700">
                {questions.length - score}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-amber-800">
                Percentage
              </div>
              <div className="mt-1 text-3xl font-black text-amber-700">
                {percent}%
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => setShowReview(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-extrabold text-white shadow-md hover:bg-indigo-700"
            >
              Review Answers
            </button>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-md hover:bg-emerald-700"
            >
              Retry Quiz
            </button>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-extrabold text-white shadow-md hover:bg-rose-700"
            >
              Back to Article
            </button>
          </div>
        </div>

        {showReview && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">
              Review
            </p>
            <ol className="mt-3 space-y-3">
              {questions.map((qq, i) => {
                const rec = record[i];
                return (
                  <li
                    key={qq.id}
                    className="rounded-xl border border-slate-200 p-3"
                  >
                    <div className="flex items-start gap-2">
                      {rec?.correct ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-rose-600 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">
                          {i + 1}. {qq.q}
                        </p>
                        <div className="mt-1 text-sm">
                          <div>
                            <span className="font-semibold">Your answer:</span>{" "}
                            {qq.choices[rec?.selected] ?? "—"}
                          </div>
                          <div>
                            <span className="font-semibold">
                              Correct answer:
                            </span>{" "}
                            {qq.choices[qq.a]}
                          </div>
                          <div className="mt-2 text-slate-700">{qq.exp}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-indigo-400 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 drop-shadow" />
            <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
              Categories of Tawḥīd — 30-Question Bank
            </h2>
          </div>
          <div className="text-right">
            <div className="text-xs font-extrabold text-slate-600">
              Question <span className="text-indigo-700">{idx + 1}</span> /{" "}
              {questions.length}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
            <p className="font-semibold text-slate-900">{q.q}</p>
          </div>

          <div className="mt-3 grid gap-2">
            {q.choices.map((c, i) => {
              const isSelected = selected === i;
              const isCorrect = answered && i === q.a;
              const isWrong = answered && isSelected && i !== q.a;
              return (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => setSelected(i)}
                  className={[
                    "text-left rounded-xl border px-3 py-2 text-sm font-semibold transition",
                    isCorrect
                      ? "border-emerald-500 bg-emerald-50"
                      : isWrong
                      ? "border-rose-500 bg-rose-50"
                      : isSelected
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-200 bg-white hover:border-indigo-300",
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {!answered ? (
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={submit}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-extrabold text-white shadow-md hover:bg-indigo-700"
              >
                Submit
              </button>
              <button
                onClick={onBack}
                className="text-sm font-semibold text-slate-600 hover:text-rose-600"
              >
                Back to Article
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <SoftCard tone="emerald" className="p-4">
                <div className="text-[15px] leading-7 text-slate-800">
                  <p className="font-semibold">Explanation</p>
                  <p className="mt-1">{q.exp}</p>
                </div>
              </SoftCard>
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-extrabold text-white shadow-md hover:bg-indigo-700"
                >
                  Next
                </button>
                <button
                  onClick={onBack}
                  className="text-sm font-semibold text-slate-600 hover:text-rose-600"
                >
                  Back to Article
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick progress pills */}
      <div className="flex flex-wrap gap-1">
        {questions.map((_, i) => {
          const done = i < record.length;
          const correct = record[i]?.correct;
          return (
            <span
              key={i}
              className={[
                "inline-flex h-2 w-4 rounded-full",
                done
                  ? correct
                    ? "bg-emerald-500"
                    : "bg-rose-500"
                  : "bg-slate-300",
              ].join(" ")}
              title={`Q${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

// ------------- Quiz-mode switch -------------
function KTT02_QuizScreen({ setSearchParams }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(900px_500px_at_90%_-10%,rgba(16,185,129,0.25),transparent)]">
      <header className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to article
          </button>
          <div className="flex items-center gap-2 text-emerald-900">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-bold">Bayt Al Rihla • Aqīdah</span>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Kitāb at-Tawḥīd — The Three Categories{" "}
            <span className="ml-2 rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-extrabold text-white">
              Quiz Mode
            </span>
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <KTT02_QuizView onBack={() => setSearchParams({})} />
      </main>

      <footer className="mt-10 border-t border-slate-200/80 bg-white/80">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-700">
          © {new Date().getFullYear()} Bayt Al Rihla
        </div>
      </footer>
    </div>
  );
}

/* ---------- Render quiz when ?quiz=1 ----------
   Place this INSIDE your component’s body, just BEFORE
   you return the large article <div>…</div>:

   if (mode === "quiz") {
     return <KTT02_QuizScreen setSearchParams={setSearchParams} />;
   }

   That’s all — the article shows normally otherwise.
------------------------------------------------ */
