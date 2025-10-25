import React from "react";
import { motion } from "framer-motion";
import {
  FaSolarPanel,
  FaSeedling,
  FaLaptopCode,
  FaIndustry,
  FaChartLine,
  FaLeaf,
} from "react-icons/fa";

export default function EconomicIdeas() {
  const ideas = [
    {
      title: "🌞 Servicii Solare",
      desc: "Instalare, întreținere și curățare a panourilor solare pentru clienți rezidențiali și industriali.",
      icon: <FaSolarPanel className="text-yellow-500 text-4xl" />,
    },
    {
      title: "🌱 Agricultură Verde",
      desc: "Culturi organice, sere inteligente și irigații alimentate cu energie solară.",
      icon: <FaSeedling className="text-green-600 text-4xl" />,
    },
    {
      title: "💻 Servicii Digitale Eco",
      desc: "Creare website-uri, branding și educație online pentru companii verzi.",
      icon: <FaLaptopCode className="text-blue-500 text-4xl" />,
    },
    {
      title: "🏭 Producție Locală Sustenabilă",
      desc: "Fabrici mici cu emisii reduse, produse biodegradabile și ambalaje ecologice.",
      icon: <FaIndustry className="text-orange-500 text-4xl" />,
    },
    {
      title: "📈 Investiții & Startups",
      desc: "Consultanță pentru fonduri europene, green startups și proiecte sustenabile.",
      icon: <FaChartLine className="text-emerald-600 text-4xl" />,
    },
    {
      title: "🍃 Energie Verde pentru Comunități",
      desc: "Stații de încărcare solară pentru telefoane, biciclete electrice și spații publice.",
      icon: <FaLeaf className="text-lime-500 text-4xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 flex flex-col items-center py-16 px-6 font-[Poppins]">
      <motion.h1
        className="text-5xl font-bold text-green-700 mb-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        💼 Economic Ideas for Romania 🇷🇴
      </motion.h1>

      <motion.p
        className="text-gray-700 text-lg mb-12 max-w-2xl text-center leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Discover sustainable, profitable business ideas that you can start in
        Romania — focusing on green energy, innovation, and digital growth.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {ideas.map((idea, index) => (
          <motion.div
            key={index}
            className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-green-200 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex justify-center mb-4">{idea.icon}</div>
            <h2 className="text-xl font-bold text-green-700 mb-3 text-center">
              {idea.title}
            </h2>
            <p className="text-gray-700 text-center">{idea.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
