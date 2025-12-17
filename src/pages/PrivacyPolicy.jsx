import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FallingStarsScene from "../components/three/FallingStarsScene";
import Earth from "../components/three/Earth";

const sections = [
  {
    title: "Privacy Policy",
    content: `We value your privacy. Any personal data you provide is collected solely for improving your experience on our platform. 
    We do not share your information with third parties without your consent.`,
  },
  {
    title: "Information Collection",
    content: `We may collect your name, email, usage data, and cookies to optimize the platform and provide tailored services. 
    All data is stored securely and encrypted.`,
  },
  {
    title: "Use of Data",
    content: `Your data helps us improve functionality, customize content, and provide better support. 
    We never sell or trade your personal information.`,
  },
  {
    title: "Security Measures",
    content: `We use industry-standard security practices including HTTPS, encryption, and secure servers to protect your data. 
    However, no method of transmission is completely secure.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy occasionally. Changes will be posted on this page with an updated date. 
    Please review this page periodically.`,
  },
];

export default function PrivacyPolicy() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* 🌍 Earth Planet (SAME IMPLEMENTATION AS SUN IN ABOUT) */}
<div className="absolute inset-x-0 bottom-0 h-[55vh] z-10 pointer-events-none overflow-hidden">
  <Earth />
</div>

      {/* 🌠 Falling Stars Background (same as About page) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FallingStarsScene />
      </div>

      {/* 🌟 Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 py-20 space-y-6">

        {/* Page Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Privacy & Policy
        </motion.h1>

        {/* Accordion Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            onClick={() => toggleAccordion(index)}
            className={`
              relative p-6 rounded-2xl cursor-pointer backdrop-blur-xl
              bg-gradient-to-br from-[#0f766e]/40 to-[#0284c7]/30
              border border-cyan-400/20
              shadow-lg shadow-cyan-500/10
              transition-all duration-300
              hover:from-[#14b8a6]/50 hover:to-[#38bdf8]/40
              ${activeIndex === index ? "shadow-cyan-400/30" : ""}
            `}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
          >
            {/* Aqua Accent Line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                {section.title}
              </h2>

              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-2xl font-bold text-cyan-300"
              >
                +
              </motion.span>
            </div>

            {/* Content */}
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden mt-4 text-white/85 leading-relaxed"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
