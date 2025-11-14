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

/* ----------------- DATA: Community + News ------------------ */

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
    body: "Small off-grid cabin, looking for long lifespan.",
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
    title: "Battery prices drop 20% thanks to mass production",
    source: "Bloomberg",
    url: "https://www.bloomberg.com/energy",
    summary:
      "Lithium battery prices continue decreasing due to expansion of global factories.",
  },
];

const STORAGE_KEY = "solarsmart_community";

/* ---------------- TEXTS ---------------- */

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
    contactMessage: "پیام شما",
    contactSend: "ارسال پیام",
  },
  ro: {
    heroTitle: "Bun venit la SolarSmart ⚡️",
    heroDesc: "Experimentează puterea energiei solare inteligente.",
    contactTitle: "Contactează-ne",
    contactName: "Nume complet",
    contactEmail: "Email",
    contactMessage: "Mesajul tău",
    contactSend: "Trimite mesaj",
  },
};

/* ============================== HOME =============================== */

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

  /* CLOCK */
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
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5)
        el.scrollLeft = 0;
    }, 3500);
    return () => clearInterval(interval);
  }, [activeTab]);

  /* VOTE */
  const handleVote = (id, delta) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, votes: q.votes + delta } : q
      )
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

  /* ================================================================ */

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center font-[Poppins]"
      style={{ backgroundImage: "url('/images/solar-bg.jpg')" }}
    >
      {/* CLOCK */}
      <div className="absolute top-4 right-4 bg-white/80 px-4 py-2 rounded-xl shadow-md text-center">
        <p className="text-lg font-bold text-green-700">
          {time.toLocaleTimeString()}
        </p>
        <p className="text-[10px] text-gray-600">
          {time.toLocaleDateString()}
        </p>
      </div>

      {/* LANG */}
      <div className="absolute top-4 left-4 flex gap-2">
        {["en", "fa", "ro"].map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`px-3 py-1 rounded-md text-xs sm:text-sm font-semibold ${
              lang === code
                ? "bg-green-600 text-white"
                : "bg-white/90 text-green-700"
            }`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>

      {/* HERO */}
      <motion.div
        dir={lang === "fa" ? "rtl" : "ltr"}
        className="mt-24 bg-white/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl max-w-3xl text-center border border-white/70"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-green-700 mb-4">
          {t.heroTitle}
        </h1>
        <p className="text-gray-800 text-sm sm:text-lg mb-6">
          {t.heroDesc}
        </p>
      </motion.div>

      {/* DIVIDER */}
      <motion.div
        className="w-full max-w-4xl h-1 mt-10 mb-6 rounded-full bg-gradient-to-r from-emerald-400/70 via-yellow-300/80 to-emerald-500/70"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      />

      {/* TABS */}
      <div className="flex items-center gap-2 sm:gap-4 bg-white/85 px-4 py-2 rounded-2xl shadow-md mb-6">
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

      {/* CONTENT */}
      {activeTab === "news" && (
        <NewsTab sliderRef={sliderRef} autoSlide={autoSlide} />
      )}

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

      {/* DIVIDER */}
      <motion.div
        className="w-full max-w-4xl h-px mb-6 rounded-full bg-gradient-to-r from-emerald-500/70 via-white/0 to-emerald-500/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <ContactSection
        lang={lang}
        contact={contact}
        setContact={setContact}
        t={t}
      />

      <Footer />
    </div>
  );
}

/* ---------------- TAB BUTTON ---------------- */

function TabButton({ active, onClick, icon, text }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold ${
        active ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

/* ---------------- NEWS TAB ---------------- */

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

/* ---------------- LEARNING TAB ---------------- */

function LearningTab() {
  return (
    <div className="w-full max-w-5xl px-4 mb-16">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Solar Energy — Complete Beginner Guide ☀️
      </h2>

      <div className="bg-white/95 rounded-2xl shadow-md border p-6 text-gray-800 leading-relaxed text-sm sm:text-base">

        <h3 className="text-xl font-bold text-green-700 mb-3">
          What is Solar Energy?
        </h3>
        <p className="mb-4">
          Solar energy is the cleanest and most abundant renewable energy source.
          It is produced when sunlight is converted into usable electricity or heat.
        </p>

        <h3 className="text-xl font-bold text-green-700 mb-3">
          How Solar Panels Work
        </h3>
        <p className="mb-3">
          Solar panels contain photovoltaic (PV) cells. When sunlight hits them,
          electrons move and create direct current (DC) electricity.
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>Sunlight hits the PV cells</li>
          <li>Electrons move → electricity is produced</li>
          <li>Panels generate DC electricity</li>
          <li>An inverter converts DC to AC</li>
        </ul>

        <h3 className="text-xl font-bold text-green-700 mb-3">
          Types of Solar Systems
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>On-grid:</strong> no batteries, cheapest option
          </li>
          <li>
            <strong>Off-grid:</strong> independent, uses batteries
          </li>
          <li>
            <strong>Hybrid:</strong> combines both, most flexible
          </li>
        </ul>

        <h3 className="text-xl font-bold text-green-700 mb-3">
          Why Solar Energy Matters
        </h3>
        <p className="mb-4">
          Solar energy reduces bills, increases independence, and has almost no
          environmental impact.
        </p>

        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-700 text-sm">
          <strong>Quick Summary:</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Solar turns sunlight into electricity.</li>
            <li>Panels + inverter are the main components.</li>
            <li>Hybrid systems are the most efficient today.</li>
            <li>Solar is renewable, clean, and cost-effective.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

/* ---------------- COMMUNITY TAB ---------------- */

function CommunityTab({
  form,
  setForm,
  handleQuestionSubmit,
  handleVote,
  questions,
}) {
  return (
    <div className="w-full max-w-6xl px-4 mb-16">
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        SolarSmart Community 💬
      </h2>

      {/* Ask form */}
      <div className="bg-white/95 rounded-2xl shadow-md p-5 mb-6">
        <h3 className="text-base font-semibold text-green-700 mb-2">
          Ask a new question
        </h3>
        <form onSubmit={handleQuestionSubmit} className="space-y-3">
          <input
            className="w-full px-3 py-2 rounded-xl border"
            placeholder="Question title…"
            value={form.title}
            onChange={(e) =>
              setForm((f) => ({ ...f, title: e.target.value }))
            }
          />
          <textarea
            className="w-full px-3 py-2 rounded-xl border"
            rows="3"
            placeholder="Describe your situation…"
            value={form.body}
            onChange={(e) =>
              setForm((f) => ({ ...f, body: e.target.value }))
            }
          />
          <input
            className="w-full px-3 py-2 rounded-xl border"
            placeholder="Tag (optional)"
            value={form.tag}
            onChange={(e) =>
              setForm((f) => ({ ...f, tag: e.target.value }))
            }
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold"
          >
            Post question
          </button>
        </form>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {questions.map((q) => (
          <div
            key={q.id}
            className="flex gap-3 bg-white/95 rounded-2xl border p-4"
          >
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
              <p className="text-sm text-gray-700">{q.body}</p>
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

/* ---------------- CONTACT SECTION ---------------- */

function ContactSection({ lang, contact, setContact, t }) {
  return (
    <motion.div
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border p-6 mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-2xl font-bold text-green-700 text-center mb-4">
        {t.contactTitle}
      </h3>
      <form className="space-y-3">
        <input
          placeholder={t.contactName}
          className="w-full px-4 py-2 rounded-xl border"
          value={contact.name}
          onChange={(e) =>
            setContact((c) => ({ ...c, name: e.target.value }))
          }
        />
        <input
          placeholder={t.contactEmail}
          className="w-full px-4 py-2 rounded-xl border"
          value={contact.email}
          onChange={(e) =>
            setContact((c) => ({ ...c, email: e.target.value }))
          }
        />
        <textarea
          placeholder={t.contactMessage}
          className="w-full px-4 py-2 rounded-xl border"
          rows="3"
          value={contact.message}
          onChange={(e) =>
            setContact((c) => ({ ...c, message: e.target.value }))
          }
        />
        <button className="w-full py-2 rounded-xl bg-green-600 text-white font-semibold">
          {t.contactSend}
        </button>
      </form>
    </motion.div>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <div className="flex gap-6 mb-10">
      {[FaLinkedin, FaInstagram, FaEnvelope].map((Icon, i) => (
        <a key={i} href="#" className="text-3xl text-green-700">
          <Icon />
        </a>
      ))}
    </div>
  );
}
