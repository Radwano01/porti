import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import TypingText from "./TypingText";
import GalaxyScene from "./three/GalaxyScene";
import { useNavigate } from "react-router-dom";

export default function HomepageContent({ startAnimation = true }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const navigate = new useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <GalaxyScene />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-start justify-start h-screen px-12 pt-40 text-left">
        {/* Title */}
        <motion.h1
          className="relative z-30 max-w-[616px] bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent font-title font-semibold leading-[0.9] tracking-tight text-[84px] lg:max-w-[528px] lg:text-[72px] md:max-w-[441px] md:text-[56px] sm:max-w-[256px] sm:text-[32px]"
          initial={{ y: -100, opacity: 0 }}
          animate={startAnimation ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Everything App for&nbsp;your teams
        </motion.h1>

        {/* Typing Text */}
        <div className="mt-6 max-w-[600px] min-h-[160px]">
          <TypingText
            start={startAnimation} // ensure TypingText only types after loader
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet."
          />
        </div>

        {/* BUTTON */}
        <div className="mt-10 btn-wrapper">
          <div className="btn-glow-layer"></div>
          <div className="btn-glow-layer-mirror"></div>

          <button
            className="btn-main group"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPos({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              });
            }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {/* RADIAL FOLLOW CIRCLE */}
            <span
              className="btn-hover-circle"
              style={{
                background: `radial-gradient(
      circle 120px at ${pos.x}% ${pos.y}%,
      rgba(168,85,247,0.55),
      rgba(255,255,255,0.35),
      transparent 70%
    )`,
              }}
            />

            {/* TEXT */}
            <button onClick={() => navigate("/contact")}>
              <span className="relative z-10">Contact Us</span></button>
          </button>
        </div>
      </div>
    </div>
  );
}
