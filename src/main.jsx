import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, useParams, Link } from "react-router-dom"; // ⬅️ HashRouter
import App from "./App.jsx";
import AqeedahBooksPage from "./aqeedah/AqeedahBooksPage.jsx";
import KitabAtTawhidPage from "./aqeedah/books/KitabAtTawhid/KitabAtTawhidPage.jsx";
import "./index.css";

/* ---------- Shared page shell (for simple placeholders/fallbacks) ---------- */
function PageShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      <header className="mx-auto max-w-7xl px-6 pt-10 pb-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-800">
          ← Back to home
        </Link>
        <span className="text-sm font-bold text-emerald-900">{subtitle}</span>
      </header>
      <main className="mx-auto max-w-7xl px-6 pb-20">
        {title && <h1 className="text-3xl font-black tracking-tight text-slate-900">{title}</h1>}
        <div className={title ? "mt-4" : ""}>{children}</div>
      </main>
      <footer className="border-t border-slate-200/70 bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Bayt Al Rihla. Viewing only — no sign-in required.
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------- Scholars -------------------------------- */
function ScholarPage() {
  const { slug } = useParams();
  return (
    <PageShell title="Scholar" subtitle="Scholars">
      <p className="text-slate-700">
        You opened: <span className="font-semibold">{slug}</span>
      </p>
      <p className="mt-2 text-sm text-slate-600">Replace this with your full scholar profile page.</p>
    </PageShell>
  );
}

/* -------------------- Kitab at-Tawhid chapter auto-loader ------------------ */
const chapterModules = import.meta.glob("./aqeedah/books/KitabAtTawhid/*.jsx"); // lazy by default

function ChapterViewer() {
  const { chapterSlug } = useParams();
  const match = Object.entries(chapterModules).find(([p]) => p.endsWith(`-${chapterSlug}.jsx`));

  if (!match) {
    return (
      <PageShell title="Chapter not found" subtitle="Kitāb at-Tawḥīd">
        <p className="text-slate-700">
          We couldn’t find <span className="font-semibold">{chapterSlug}</span>.
        </p>
        <p className="mt-2">
          <Link className="text-emerald-700 underline" to="/aqeedah/books/kitab-at-tawhid">
            Back to chapters
          </Link>
        </p>
      </PageShell>
    );
  }

  const LazyComp = React.lazy(match[1]);
  return (
    <Suspense
      fallback={
        <PageShell title="Loading chapter…" subtitle="Kitāb at-Tawḥīd">
          <p className="text-slate-600">Please wait…</p>
        </PageShell>
      }
    >
      <LazyComp />
    </Suspense>
  );
}

/* ---------------------------- Other books stubs ---------------------------- */
function NullifiersPage() {
  return (
    <PageShell title="Nullifiers of ʿAqīdah" subtitle="ʿAqīdah • Book">
      <p className="text-slate-700">Scaffold this page when ready.</p>
    </PageShell>
  );
}
function UsulThalathaPage() {
  return (
    <PageShell title="Uṣūl ath-Thalātha" subtitle="ʿAqīdah • Book">
      <p className="text-slate-700">Scaffold this page when ready.</p>
    </PageShell>
  );
}
function WasitiyyahPage() {
  return (
    <PageShell title="al-ʿAqīdah al-Wāsiṭiyyah" subtitle="ʿAqīdah • Book">
      <p className="text-slate-700">Scaffold this page when ready.</p>
    </PageShell>
  );
}

/* --------------------------------- 404 ------------------------------------ */
function NotFound() {
  return (
    <PageShell title="Page not found" subtitle="404">
      <p className="text-slate-700">The page you’re looking for doesn’t exist.</p>
    </PageShell>
  );
}

/* --------------------------------- Mount ---------------------------------- */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter> {/* ← GitHub Pages-safe routing (/#/...) */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/aqeedah" element={<AqeedahBooksPage />} />

        {/* Books */}
        <Route path="/aqeedah/books/kitab-at-tawhid" element={<KitabAtTawhidPage />} />
        <Route path="/aqeedah/books/kitab-at-tawhid/:chapterSlug" element={<ChapterViewer />} />

        {/* Stubs */}
        <Route path="/aqeedah/books/nullifiers" element={<NullifiersPage />} />
        <Route path="/aqeedah/books/usul-ath-thalatha" element={<UsulThalathaPage />} />
        <Route path="/aqeedah/books/wasitiyyah" element={<WasitiyyahPage />} />

        {/* Scholars */}
        <Route path="/scholars/:slug" element={<ScholarPage />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
