import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../css/HomepageContent.css";
import TypingText from "./TypingText";

// 🎥 Background video
import vid from "../assets/white_planet.mp4";

export default function HomepageContent({ startAnimation = true, onVideoLoaded }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0 hero-video"
        src={vid}
        onLoadedData={onVideoLoaded} // ← notify parent when video is loaded
      />

      {/* 🌑 Dark Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black opacity-50 z-10" />

      {/* 🚀 Hero Content */}
      <div className="relative z-20 flex flex-col items-start justify-start h-screen px-12 pt-40 text-left">

        {/* 🔥 Title */}
        <motion.h1
          className="w-full bg-gradient-to-br from-white bg-clip-text text-transparent font-heading font-semibold leading-[0.9] tracking-tight text-[84px] lg:text-[72px] md:text-[56px] sm:text-[32px]"
          initial={{ y: -100, opacity: 0 }}
          animate={startAnimation ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Mordev Arcane
        </motion.h1>

        {/* ✍️ Typing Text */}
        <div className="mt-6 max-w-[600px] min-h-[160px]">
          <TypingText
            start={startAnimation}
            text="Digital marketing is the strategic use of digital channels, platforms, and technologies to promote a brand, connect with current and prospective customers, and drive business growth. Unlike traditional marketing, it operates primarily through the internet and electronic devices, allowing for targeted, measurable, and interactive communication."
          />
        </div>

        {/* 🔘 CTA Button */}
        <div className="mt-10 btn-wrapper">
          <button
            className="button"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate("/contact")}
          >
            <div className="btn-border">
              <div className="btn-inner">
                {/* RADIAL FOLLOW CIRCLE */}
                <span
                  className="btn-hover-circle"
                  style={{
                    background: `radial-gradient(
                      circle 120px at ${pos.x}px ${pos.y}px,
                      rgba(255,255,255),
                      rgba(255,255,255),
                      transparent 20%
                    )`,
                    opacity: hover ? 1 : 0,
                  }}
                />
                <span className="btn-text">Contact Us</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
