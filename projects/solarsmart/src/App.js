import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 text-gray-800 font-sans">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
          <motion.h1
            className="text-2xl font-bold text-green-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SolarSmart 🌞
          </motion.h1>

          <ul className="flex space-x-6 text-lg">
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
                to="/about"
                className="hover:text-green-600 transition duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Page Content */}
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="text-center py-4 text-gray-600">
          © 2025 SolarSmart | Built with 🌿 React + Tailwind + Framer Motion
        </footer>
      </div>
    </Router>
  );
}

export default App;
