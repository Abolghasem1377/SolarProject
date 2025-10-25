import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-[Poppins] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/solar-bg.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ☀️ Sun */}
      <motion.div
        className="absolute top-16 right-28 w-40 h-40 bg-yellow-300 rounded-full shadow-[0_0_80px_rgba(255,210,0,0.7)]"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ☁️ Clouds */}
      <motion.div
        className="absolute top-40 left-[-200px] w-72 h-24 bg-white/70 rounded-full blur-lg"
        animate={{ x: [0, 500, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-60 right-[-250px] w-80 h-28 bg-white/60 rounded-full blur-md"
        animate={{ x: [0, -600, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Overlay to soften image */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-green-100/50 backdrop-blur-[2px]" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center p-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl max-w-3xl border border-white/40"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-6 drop-shadow-lg">
          Welcome to <span className="text-sky-600">SolarSmart</span> ☀️
        </h1>

        <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
          Experience the future of clean energy. Join the solar revolution and see how sunlight can power your world.
        </p>

        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 40px rgba(16,185,129,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          Explore More
        </motion.button>
      </motion.div>
    </div>
  );
}
