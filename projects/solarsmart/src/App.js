import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi"; // آیکون منو و بستن

// صفحات پروژه
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import About from "./pages/About";
import EconomicIdeas from "./pages/EconomicIdeas";

export default function App() {
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 font-sans relative overflow-hidden">
        {/* 🌞 Navbar */}
        <nav className="flex justify-between items-center px-4 sm:px-8 py-3 sm:py-4 bg-white shadow-md backdrop-blur-sm border-b border-green-100 relative z-20">
          {/* 🖼️ لوگوی تصویری */}
          <div
            className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer"
            onClick={() => setIsLogoOpen(true)}
          >
            <motion.img
              src="/images/logo.png"
              alt="SolarSmart Logo"
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-green-300 shadow-md group-hover:shadow-green-400 object-cover transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 2 }}
            />
            <span className="text-xl sm:text-2xl font-bold text-green-700 hidden sm:inline">
              SolarSmart
            </span>
          </div>

          {/* 🔗 منوی دسکتاپ */}
          <ul className="hidden md:flex space-x-6 text-lg font-medium">
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

          {/* 🍔 دکمه همبرگری برای موبایل */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-3xl text-green-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </nav>

        {/* 📱 منوی بازشونده در موبایل */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg border-t border-green-100 flex flex-col text-center text-lg font-medium py-4 space-y-4 absolute w-full z-10"
            >
              <Link
                to="/"
                className="hover:text-green-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/calculator"
                className="hover:text-green-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link
                to="/ideas"
                className="hover:text-green-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Ideas
              </Link>
              <Link
                to="/about"
                className="hover:text-green-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🧩 محتوای صفحات */}
        <main className="p-4 sm:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/ideas" element={<EconomicIdeas />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* 🌿 Footer */}
        <footer className="text-center py-6 text-gray-600 bg-white/60 backdrop-blur-md border-t border-green-100 text-sm sm:text-base">
          © 2025 SolarSmart | Built with 🌿 React + TailwindCSS + Framer Motion
        </footer>

        {/* 🔍 Modal بزرگ‌نمایی لوگو */}
        <AnimatePresence>
          {isLogoOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoOpen(false)}
            >
              <motion.img
                src="/images/logo.png"
                alt="Logo Enlarged"
                className="w-56 h-56 sm:w-80 sm:h-80 rounded-full border-4 border-green-400 shadow-2xl object-cover cursor-pointer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}
