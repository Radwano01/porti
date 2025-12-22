import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfessionalCalendar from "../components/ProfessionalCalendar";
import GalaxyClock from "../components/GalaxyClock";
import FallingStarsScene from "../components/three/FallingStarsScene";
import Sun from "../components/three/Sun";
import Moon from "../components/three/Moon";

export default function Contact() {
  const [timeOfDay, setTimeOfDay] = useState(null); // "morning" | "night" | null

  const handleTimeChange = (hour) => {
    const numericHour = parseInt(hour, 10);
    if (numericHour >= 6 && numericHour < 18) setTimeOfDay("morning");
    else setTimeOfDay("night");
  };

  const handleDateSelect = (date) => {
    handleTimeChange(date.getHours());
  };

  const planetVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: { opacity: 1, x: 0, transition: { duration: 1.2 } },
    exit: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
      transition: { duration: 1.0 },
    }),
  };

  return (
    <section className="relative min-h-screen bg-black flex flex-col md:flex-row gap-10 p-10 justify-center items-center overflow-hidden">
      {/* Falling Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FallingStarsScene />
      </div>

      {/* Sun / Moon */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
<AnimatePresence mode="wait">
  {timeOfDay === "morning" && (
    <motion.div
      key={`sun-${timeOfDay}`} // unique key ensures remount
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
      key={`moon-${timeOfDay}`} // unique key ensures remount
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

      {/* Left: Calendar */}
      <div className="flex-1 flex justify-center z-20">
        <ProfessionalCalendar
          onSelect={handleDateSelect}
          onTimeChange={handleTimeChange}
        />
      </div>

      {/* Right: Galaxy Clock */}
      <div className="flex-1 flex justify-center items-center h-[600px] z-20">
        <GalaxyClock />
      </div>
    </section>
  );
}
