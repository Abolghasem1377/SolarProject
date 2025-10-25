import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Calculator() {
  const [consumption, setConsumption] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!consumption) return;
    const needed = (consumption / 30 / 5).toFixed(1);
    setResult(needed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-sky-50 to-blue-100 flex flex-col items-center justify-center font-[Poppins]">
      <motion.div
        className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/40 w-96 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Solar Calculator 🌞
        </h2>
        <p className="text-gray-700 mb-6">
          Estimate how much solar power you need.
        </p>
        <input
          type="number"
          placeholder="Enter monthly consumption (kWh)"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full mb-4 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={calculate}
          className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
        >
          Calculate
        </button>

        {result && (
          <motion.div
            className="mt-6 text-lg text-gray-800 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            You’ll need approximately{" "}
            <span className="text-green-700 font-semibold">{result}</span> kW of
            solar power.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
