import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [lang, setLang] = useState("en");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  // 📰 Energy News Auto Slider
  const [newsIndex, setNewsIndex] = useState(0);

  const newsData = [
    {
      title: "Global solar power hits record growth in 2025",
      source: "Reuters",
      url: "https://www.reuters.com/business/sustainable-business/",
      image:
        "https://www.reuters.com/pf/resources/images/reuters-default.png?d=123",
    },
    {
      title: "EU announces new incentives for renewable energy projects",
      source: "Euronews",
      url: "https://www.euronews.com/green",
      image:
        "https://static.euronews.com/articles/stories/08/62/64/58/1440x810_cmsv2_5ee7e068-2b8e-5e52-a0d5-5521bdc90a3d-8626458.jpg",
    },
    {
      title: "Battery prices drop by 20% due to mass production",
      source: "Bloomberg",
      url: "https://www.bloomberg.com/energy",
      image:
        "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iV3cLOb8t5xo/v1/1200x800.jpg",
    },
    {
      title: "Middle East expands solar mega-projects rapidly",
      source: "Al Jazeera",
      url: "https://www.aljazeera.com/economy",
      image:
        "https://www.aljazeera.com/wp-content/uploads/2023/09/000_33TZ6V7.jpg?resize=770%2C513&quality=80",
    },
    {
      title: "Romania approves major solar farm investments",
      source: "Romania Insider",
      url: "https://www.romania-insider.com",
      image:
        "https://www.romania-insider.com/sites/default/files/styles/article_main_image/public/2023-06/solar-panels-green-energy-dreamstime.jpg?itok=Ytd1Z4qV",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🕒 Time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Translations
  const texts = {
    en: {
      title: "Welcome to SolarSmart ⚡️",
      description:
        "Experience the power of solar innovation — clean energy flowing like light itself.",
      button: "Explore More",
      contactTitle: "Contact Us",
      name: "Full Name",
      email: "Email Address",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      sent: "✅ Message Sent Successfully!",
      newsTitle: "Latest Energy News 🌍",
      newsSource: "Source",
    },
    fa: {
      title: "به سولار اسمارت خوش آمدید ⚡️",
      description:
        "قدرت انرژی خورشیدی را حس کنید — جریان پاکی از نور و فناوری در حرکت است.",
      button: "بیشتر ببین",
      contactTitle: "ارتباط با ما",
      name: "نام و نام خانوادگی",
      email: "ایمیل",
      message: "پیام شما",
      send: "ارسال پیام",
      sending: "در حال ارسال...",
      sent: "✅ پیام با موفقیت ارسال شد!",
      newsTitle: "🌍 آخرین اخبار انرژی",
      newsSource: "منبع",
    },
    ro: {
      title: "Bun venit la SolarSmart ⚡️",
      description:
        "Experimentează puterea inovației solare — energie curată, la viteza luminii.",
      button: "Descoperă mai mult",
      contactTitle: "Contactează-ne",
      name: "Nume complet",
      email: "Adresă de email",
      message: "Mesajul tău",
      send: "Trimite mesaj",
      sending: "Se trimite...",
      sent: "✅ Mesaj trimis cu succes!",
      newsTitle: "🌍 Ultimele știri despre energie",
      newsSource: "Sursa",
    },
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 2000);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-[Poppins] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/solar-bg.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ⚡ Background Beams */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[400px] bg-gradient-to-r from-yellow-300 via-orange-400 to-transparent opacity-70 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: "-400px",
              filter: "drop-shadow(0 0 6px rgba(255,200,0,0.8))",
            }}
            animate={{ x: ["-400px", "120%"] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Time */}
      <motion.div
        className="absolute top-4 right-4 sm:right-8 z-20 bg-white/70 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg border border-white/40 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-xl sm:text-2xl font-bold text-green-700">
          {formattedTime}
        </p>
        <p className="text-xs sm:text-sm text-gray-800 mt-1">{formattedDate}</p>
      </motion.div>

      {/* Language Buttons */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-8 flex space-x-1 sm:space-x-3 z-[50]">
        {["en", "fa", "ro"].map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`px-2 sm:px-3 py-[2px] sm:py-1 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300 ${
              lang === code
                ? "bg-green-600 text-white shadow-md scale-105"
                : "bg-white/80 text-green-700 hover:bg-green-100"
            }`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        dir={lang === "fa" ? "rtl" : "ltr"}
        className={`relative z-10 text-center p-6 sm:p-10 bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl max-w-[90%] sm:max-w-3xl border border-white/40 mt-24 ${
          lang === "fa" ? "font-[Vazirmatn]" : ""
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-green-700 mb-4 sm:mb-6">
          {texts[lang].title}
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
          {texts[lang].description}
        </p>
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 40px rgba(16,185,129,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg hover:shadow-2xl"
        >
          {texts[lang].button}
        </motion.button>
      </motion.div>

      {/* 📰 Energy News */}
      <motion.div
        dir={lang === "fa" ? "rtl" : "ltr"}
        className="relative z-20 mt-20 w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-6 sm:p-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center">
          {texts[lang].newsTitle}
        </h2>

        <motion.div
          key={newsIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="cursor-pointer"
          onClick={() => window.open(newsData[newsIndex].url, "_blank")}
        >
          <img
            src={newsData[newsIndex].image}
            alt="news"
            className="w-full h-60 object-cover rounded-2xl shadow-md"
          />

          <h3 className="text-xl font-semibold mt-4 text-green-700">
            {newsData[newsIndex].title}
          </h3>

          <p className="text-gray-600 text-sm mt-1">
            {texts[lang].newsSource}: {newsData[newsIndex].source}
          </p>
        </motion.div>

        <div className="flex justify-center mt-4 space-x-2">
          {newsData.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === newsIndex ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        dir={lang === "fa" ? "rtl" : "ltr"}
        className="relative z-20 mt-16 sm:mt-24 mb-10 w-full max-w-lg sm:max-w-2xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-6 sm:p-8 text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6">
          {texts[lang].contactTitle}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-left"
        >
          <input
            type="text"
            name="name"
            placeholder={texts[lang].name}
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/90"
          />
          <input
            type="email"
            name="email"
            placeholder={texts[lang].email}
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/90"
          />
          <textarea
            rows="4"
            name="message"
            placeholder={texts[lang].message}
            value={formData.message}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/90 resize-none"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === "sending"}
            className={`w-full mt-3 py-3 text-base sm:text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${
              status === "sending"
                ? "bg-yellow-400 text-white"
                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-2xl"
            }`}
            type="submit"
          >
            {status === "sending"
              ? texts[lang].sending
              : status === "success"
              ? texts[lang].sent
              : texts[lang].send}
          </motion.button>
        </form>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        className="flex space-x-6 mb-12 z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {[FaLinkedin, FaInstagram, FaEnvelope].map((Icon, i) => (
          <motion.a
            key={i}
            href="#"
            whileHover={{ scale: 1.3 }}
            className="text-2xl sm:text-3xl text-green-700 hover:text-green-600 transition-colors"
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
