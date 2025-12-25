import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfessionalCalendar from "../components/ProfessionalCalendar";
import GalaxyClock from "../components/GalaxyClock";
import FallingStarsScene from "../components/three/FallingStarsScene";
import Sun from "../components/three/Sun";
import Moon from "../components/three/Moon";
import Loader from "../components/Loader";

export default function Contact() {
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleTimeChange = (hour) => {
    const numericHour = parseInt(hour, 10);

    if (numericHour >= 6 && numericHour < 18) {
      setTimeOfDay("morning");
    } else {
      setTimeOfDay("night");
    }

    setLoading(false);
  };

  const handleDateSelect = (date) => {
    handleTimeChange(date.getHours());
  };

  // ✅ resolve loader automatically on mount
  useEffect(() => {
    const now = new Date();

    const timer = setTimeout(() => {
      handleTimeChange(now.getHours());
    }, 800); // ⏳ loader visible for 0.8s

    return () => clearTimeout(timer);
  }, []);


  const planetVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -120 : 120,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -120 : 120,
      transition: { duration: 1.0, ease: "easeIn" },
    }),
  };

  return (
    <section className="relative min-h-screen bg-black flex flex-col md:flex-row gap-10 p-10 justify-center items-center overflow-hidden">

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {/* Falling Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FallingStarsScene />
      </div>

      {/* Sun / Moon */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          {timeOfDay === "morning" && (
            <motion.div
              key="sun"
              custom="right"
              variants={planetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full"
            >
              <Sun />
            </motion.div>
          )}

          {timeOfDay === "night" && (
            <motion.div
              key="moon"
              custom="left"
              variants={planetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full"
            >
              <Moon />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Calendar */}
      <div className="flex-1 flex justify-center z-20">
        <ProfessionalCalendar
          onSelect={handleDateSelect}
          onTimeChange={handleTimeChange}
        />
      </div>

      {/* Clock */}
      <div className="flex-1 flex justify-center items-center h-[600px] z-20">
        <GalaxyClock />
      </div>
    </section>
  );
}
