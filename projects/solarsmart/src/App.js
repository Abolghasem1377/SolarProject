import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// صفحات پروژه
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import About from "./pages/About";
import EconomicIdeas from "./pages/EconomicIdeas";

export default function App() {
  const [isLogoOpen, setIsLogoOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 font-sans relative overflow-hidden">
        {/* 🌞 Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md backdrop-blur-sm border-b border-green-100 relative z-10">
          {/* 🖼️ لوگوی تصویری با قابلیت بزرگ‌نمایی */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setIsLogoOpen(true)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <motion.img
                src="/images/logo.png"
                alt="SolarSmart Logo"
                className="w-14 h-14 rounded-full border-2 border-green-300 shadow-md group-hover:shadow-green-400 transition-all duration-300 object-cover"
                whileHover={{ scale: 1.1, rotate: 2 }}
              />

              {/* افکت نور سبز پشت لوگو */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 bg-green-300 blur-xl"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
              />
            </motion.div>

            <span className="text-2xl font-bold text-green-700 hidden sm:inline">
              SolarSmart
            </span>
          </div>

          {/* 🔗 لینک‌های منو */}
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-green-600 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/calculator"
                className="hover:text-green-600 transition duration-300"
              >
                Calculator
              </Link>
            </li>
            <li>
              <Link
                to="/ideas"
                className="hover:text-green-600 transition duration-300"
              >
                Ideas
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-green-600 transition duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* 🧩 محتوای صفحات */}
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/ideas" element={<EconomicIdeas />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* 🌿 Footer */}
        <footer className="text-center py-6 text-gray-600 bg-white/60 backdrop-blur-md border-t border-green-100">
          © 2025 SolarSmart | Built with 🌿 React + TailwindCSS + Framer Motion
        </footer>

        {/* 🔍 Modal بزرگ‌نمایی لوگو */}
        <AnimatePresence>
          {isLogoOpen && (
            <>
              {/* پس‌زمینه تار */}
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLogoOpen(false)}
              >
                {/* تصویر بزرگ لوگو */}
                <motion.img
                  src="/images/logo.png"
                  alt="Logo Enlarged"
                  className="w-80 h-80 rounded-full border-4 border-green-400 shadow-2xl object-cover cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 10 }}
                  onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن هنگام کلیک روی خود تصویر
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}
