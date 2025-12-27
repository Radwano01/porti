import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../css/HomepageContent.css";

import Navbar from "./Navbar";
import TypingText from "./TypingText";

// 🎥 Background video
import cyberPlanet from "../assets/cyber_planet.mp4";

export default function HomepageContent({ startAnimation = true }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* 🎥 Background Video */}
<video
  className="absolute inset-0 w-full h-full object-cover z-0 hero-video"
  src={cyberPlanet}
  autoPlay
  muted
  loop
  playsInline
/>


      {/* 🔲 Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 🧭 Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* 🚀 Hero Content */}
      <div className="relative z-20 flex flex-col items-start justify-start h-screen px-12 pt-40 text-left">
        
        {/* 🔥 Title */}
        <motion.h1
          className="max-w-[616px] bg-gradient-to-br from-white bg-clip-text text-transparent font-title font-semibold leading-[0.9] tracking-tight text-[84px] lg:max-w-[528px] lg:text-[72px] md:max-w-[441px] md:text-[56px] sm:max-w-[256px] sm:text-[32px]"
          initial={{ y: -100, opacity: 0 }}
          animate={startAnimation ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Everything App for&nbsp;your teams
        </motion.h1>

        {/* ✍️ Typing Text */}
        <div className="mt-6 max-w-[600px] min-h-[160px]">
          <TypingText
            start={startAnimation}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet."
          />
        </div>

        {/* 🔘 CTA Button */}
        <div className="mt-10 btn-wrapper">
          <button
            className="button"
            onClick={() => navigate("/contact")}
          >
            <div>
              <div>
                <div>
                  <span>Contact Us</span>
                </div>
              </div>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
