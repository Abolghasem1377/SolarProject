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
      location: "Our Location",
      follow: "Follow Us",
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
      location: "موقعیت ما",
      follow: "ما را دنبال کنید",
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
      location: "Locația noastră",
      follow: "Urmărește-ne",
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
      {/* ⚡️ Background energy beams */}
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

      {/* 🕒 Time */}
      <motion.div
        className="absolute top-8 z-20 bg-white/70 backdrop-blur-md px-8 py-4 rounded-3xl shadow-xl border border-white/40 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-3xl font-bold text-green-700">{formattedTime}</p>
        <p className="text-md text-gray-800 mt-1">{formattedDate}</p>
      </motion.div>

      {/* 🌍 Language */}
      <div className="absolute top-8 right-8 flex space-x-3 z-20">
        {["en", "fa", "ro"].map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              lang === code
                ? "bg-green-600 text-white shadow-md scale-105"
                : "bg-white/70 text-green-700 hover:bg-green-100"
            }`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🌞 Hero */}
      <motion.div
        dir={lang === "fa" ? "rtl" : "ltr"}
        className={`relative z-10 text-center p-10 bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl max-w-3xl border border-white/40 mt-24 transition-all duration-500 ${
          lang === "fa" ? "font-[Vazirmatn]" : ""
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-6 drop-shadow-lg">
          {texts[lang].title}
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
          {texts[lang].description}
        </p>
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 40px rgba(16,185,129,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          {texts[lang].button}
        </motion.button>
      </motion.div>

      {/* 📬 Contact Section with energy effect */}
      <div className="relative z-20 mt-24 mb-10 w-full max-w-2xl">
        {/* ⚡️ moving electric pulses behind form */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-[150px] bg-gradient-to-r from-green-400 via-yellow-300 to-transparent opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                rotate: `${Math.random() * 45}deg`,
              }}
              animate={{
                x: ["-200%", "200%"],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          dir={lang === "fa" ? "rtl" : "ltr"}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6">
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
              className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/90 transition-all duration-200"
            />
            <input
              type="email"
              name="email"
              placeholder={texts[lang].email}
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/90 transition-all duration-200"
            />
            <textarea
              rows="4"
              name="message"
              placeholder={texts[lang].message}
              value={formData.message}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/90 transition-all duration-200 resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              className={`w-full mt-3 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${
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
      </div>

      {/* 🗺️ Google Map */}
      <motion.div
        className="relative z-10 w-full max-w-4xl h-[350px] rounded-3xl overflow-hidden shadow-xl border border-white/40 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <iframe
          title="SolarSmart Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.021802438709!2d26.096306215517967!3d44.43531797910286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93b0ef2a92d%3A0x4e38ebdfd4b6f3c6!2sRomanian-American%20University!5e0!3m2!1sen!2sro!4v1684941012345!5m2!1sen!2sro"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </motion.div>

      {/* 🌐 Social Icons */}
      <motion.div
        className="flex space-x-6 mb-12 z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {[
          {
            icon: <FaLinkedin />,
            color: "#0077b5",
            link: "https://linkedin.com",
          },
          {
            icon: <FaInstagram />,
            color: "#e1306c",
            link: "https://instagram.com",
          },
          {
            icon: <FaEnvelope />,
            color: "#16a34a",
            link: "mailto:info@solarsmart.com",
          },
        ].map(({ icon, color, link }, i) => (
          <motion.a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, color }}
            className="text-3xl text-green-700 hover:text-green-600 transition-colors"
          >
            {icon}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
