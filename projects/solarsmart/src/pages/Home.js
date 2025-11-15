import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaRegNewspaper,
  FaBookOpen,
  FaComments,
} from "react-icons/fa";

const INITIAL_QUESTIONS = [
  {
    id: 1,
    title: "How many panels do I need for 5 kWh/day?",
    body: "Location: Europe, south-facing roof, good sun.",
    tag: "System sizing",
    votes: 4,
  },
  {
    id: 2,
    title: "Is LiFePO4 better than lead-acid?",
    body: "Off-grid cabin, long lifespan required.",
    tag: "Batteries",
    votes: 7,
  },
];

const NEWS_DATA = [
  {
    title: "Global solar power hits record growth in 2025",
    source: "Reuters",
    url: "https://www.reuters.com/business/sustainable-business/",
    summary:
      "Global solar capacity reached a record high as countries accelerate clean energy adoption.",
  },
  {
    title: "EU launches new incentives for renewable energy",
    source: "Euronews",
    url: "https://www.euronews.com/green",
    summary:
      "The EU introduces new incentives to speed up renewable energy projects across member states.",
  },
  {
    title: "Battery prices drop thanks to mass production",
    source: "Bloomberg",
    url: "https://www.bloomberg.com/energy",
    summary:
      "Lithium battery prices continue decreasing due to global factory expansions.",
  },
];

const STORAGE_KEY = "solarsmart_community";

const uiTexts = {
  en: {
    heroTitle: "Welcome to SolarSmart ⚡️",
    heroDesc: "Experience the power of clean, intelligent solar energy.",
    contactTitle: "Contact Us",
    contactName: "Full Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSend: "Send Message",
  },
  fa: {
    heroTitle: "به سولار اسمارت خوش آمدید ⚡️",
    heroDesc: "قدرت انرژی خورشیدی هوشمند را تجربه کنید.",
    contactTitle: "ارتباط با ما",
    contactName: "نام و نام خانوادگی",
    contactEmail: "ایمیل",
    contactMessage: "پیام",
    contactSend: "ارسال پیام",
  },
  ro: {
    heroTitle: "Bun venit la SolarSmart ⚡️",
    heroDesc: "Experimentează puterea energiei solare inteligente.",
    contactTitle: "Contactează-ne",
    contactName: "Nume complet",
    contactEmail: "Email",
    contactMessage: "Mesaj",
    contactSend: "Trimite mesaj",
  },
};

/* ================= HOME COMPONENT ================= */

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("news");

  const sliderRef = useRef(null);
  const autoSlide = useRef(true);

  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [form, setForm] = useState({ title: "", body: "", tag: "" });

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  /* LIVE CLOCK */
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* LOAD COMMUNITY */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setQuestions(JSON.parse(saved));
      } catch {}
    }
  }, []);

  /* SAVE COMMUNITY */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  /* AUTO SLIDER */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoSlide.current || activeTab !== "news") return;
      const el = sliderRef.current;
      if (!el) return;

      el.scrollLeft += 340;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
        el.scrollLeft = 0;
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [activeTab]);

  /* VOTING */
  const handleVote = (id, delta) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, votes: q.votes + delta } : q))
    );
  };

  /* ADD QUESTION */
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setQuestions((prev) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        body: form.body.trim(),
        tag: form.tag.trim() || "General",
        votes: 0,
      },
      ...prev,
    ]);

    setForm({ title: "", body: "", tag: "" });
  };

  const t = uiTexts[lang];

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center font-[Poppins]"
      style={{ backgroundImage: "url('/images/solar-bg.jpg')" }}
    >
      {/* ================= HERO TOP ================= */}
      <div className="relative w-full flex flex-col items-center pt-10">

        {/* Elegant Clock */}
        <div className="absolute top-4 right-6 bg-white/70 backdrop-blur-xl px-5 py-2 rounded-xl shadow-lg border border-white/40 text-right">
          <p className="text-green-800 font-bold text-sm">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-gray-700 text-xs">{time.toLocaleDateString()}</p>
        </div>

        {/* Language Switch */}
        <div className="absolute top-4 left-6 flex gap-2">
          {["en", "fa", "ro"].map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                lang === code
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white/80 text-green-700 border"
              }`}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        {/* HERO CARD */}
        <motion.div
          dir={lang === "fa" ? "rtl" : "ltr"}
          className="bg-white/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl max-w-3xl text-center border border-white/70 mx-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-green-700 mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-gray-800 text-sm sm:text-lg mb-6 leading-relaxed">
            {t.heroDesc}
          </p>
        </motion.div>

      </div>

      {/* DIVIDER */}
      <motion.div
        className="w-full max-w-4xl h-1 mt-10 mb-6 rounded-full bg-gradient-to-r from-emerald-400/70 via-yellow-300/80 to-emerald-500/70"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      />

      {/* ================= TABS ================= */}
      <div className="flex items-center gap-2 bg-white/85 px-4 py-2 rounded-2xl shadow-md mb-6">
        <TabButton
          active={activeTab === "news"}
          onClick={() => setActiveTab("news")}
          icon={<FaRegNewspaper />}
          text="News"
        />
        <TabButton
          active={activeTab === "learning"}
          onClick={() => setActiveTab("learning")}
          icon={<FaBookOpen />}
          text="Learning"
        />
        <TabButton
          active={activeTab === "community"}
          onClick={() => setActiveTab("community")}
          icon={<FaComments />}
          text="Community"
        />
      </div>

      {/* ================= CONTENT ================= */}
      {activeTab === "news" && <NewsTab sliderRef={sliderRef} autoSlide={autoSlide} />}
      {activeTab === "learning" && <LearningTab />}
      {activeTab === "community" && (
        <CommunityTab
          form={form}
          setForm={setForm}
          handleQuestionSubmit={handleQuestionSubmit}
          handleVote={handleVote}
          questions={questions}
        />
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

/* ================= COMPONENTS ================= */

function TabButton({ active, onClick, icon, text }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
        active ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

function NewsTab({ sliderRef, autoSlide }) {
  return (
    <div className="w-full max-w-6xl px-4 mb-16">
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        Latest Energy News
      </h2>

      <div
        className="relative"
        onMouseEnter={() => (autoSlide.current = false)}
        onMouseLeave={() => (autoSlide.current = true)}
      >
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-3"
          style={{ scrollbarWidth: "none" }}
        >
          {NEWS_DATA.map((n, i) => (
            <div
              key={i}
              onClick={() => window.open(n.url, "_blank")}
              className="min-w-[300px] bg-white/90 rounded-2xl shadow-md border p-5 cursor-pointer hover:shadow-xl transition"
            >
              <p className="text-xs text-gray-500 mb-1">
                Source: {n.source}
              </p>
              <h3 className="font-semibold text-green-700 mb-2">
                {n.title}
              </h3>
              <p className="text-sm text-gray-700">{n.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LearningTab() {
  return (
    <div className="w-full max-w-5xl px-4 mb-16">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Solar Energy — Beginner Guide ☀️
      </h2>

      <div className="bg-white/95 rounded-2xl shadow-md border p-6 text-gray-800 leading-relaxed text-base">

        <h3 className="text-xl font-bold text-green-700 mb-3">
          What is Solar Energy?
        </h3>
        <p className="mb-4">
          Solar energy is clean, renewable, and abundant. It is produced when sunlight 
          is converted into usable electricity or heat.
        </p>

        <h3 className="text-xl font-bold text-green-700 mb-3">
          How Solar Panels Work
        </h3>
        <p className="mb-3">
          Solar panels contain photovoltaic (PV) cells. Sunlight causes electrons to move 
          in the material, generating direct current (DC) electricity. An inverter converts 
          it to AC power for home use.
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>Sunlight hits the PV cells</li>
          <li>Electrons move → electricity is produced</li>
          <li>Panels output DC power</li>
          <li>Inverter converts DC → AC</li>
        </ul>

        <h3 className="text-xl font-bold text-green-700 mb-3">
          Types of Systems
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li><strong>On-grid:</strong> connected to utility grid</li>
          <li><strong>Off-grid:</strong> uses batteries, independent</li>
          <li><strong>Hybrid:</strong> combination of both</li>
        </ul>

        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
          <strong>Summary:</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Solar converts sunlight into electricity</li>
            <li>Inverter is essential for AC power</li>
            <li>Hybrid systems are most flexible</li>
            <li>Solar reduces electricity costs</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

function CommunityTab({ form, setForm, handleQuestionSubmit, handleVote, questions }) {
  return (
    <div className="w-full max-w-6xl px-4 mb-16">
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        SolarSmart Community 💬
      </h2>

      <div className="bg-white/95 rounded-2xl shadow-md p-5 mb-6">
        <h3 className="text-base font-semibold text-green-700 mb-2">
          Ask a question
        </h3>

        <form onSubmit={handleQuestionSubmit} className="space-y-3">
          <input
            className="w-full px-3 py-2 rounded-xl border"
            placeholder="Question title…"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />

          <textarea
            className="w-full px-3 py-2 rounded-xl border"
            rows="3"
            placeholder="Describe your situation…"
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          />

          <input
            className="w-full px-3 py-2 rounded-xl border"
            placeholder="Tag (optional)"
            value={form.tag}
            onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
          />

          <button className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold">
            Post
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {questions.map((q) => (
          <div key={q.id} className="flex gap-3 bg-white/95 rounded-2xl border p-4">

            <div className="flex flex-col items-center justify-center w-12">
              <button
                onClick={() => handleVote(q.id, +1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border text-green-700"
              >
                +
              </button>
              <p className="text-sm font-semibold">{q.votes}</p>
              <button
                onClick={() => handleVote(q.id, -1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border text-red-600"
              >
                –
              </button>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-green-700">{q.title}</h3>
              <p className="text-sm text-gray-700 mb-1">{q.body}</p>
              <span className="px-2 py-1 text-xs bg-emerald-50 border rounded-full">
                {q.tag}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex gap-6 my-10">
      {[FaLinkedin, FaInstagram, FaEnvelope].map((Icon, i) => (
        <a key={i} href="#" className="text-3xl text-green-700">
          <Icon />
        </a>
      ))}
    </div>
  );
}
