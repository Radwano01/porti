import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import TypingText from "../components/TypingText";
import GalaxyScene from "../components/three/GalaxyScene";

export default function Homepage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <GalaxyScene />
      </div>

      {/* Navbar overlay */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-start justify-start h-screen px-12 pt-40 text-left">

        {/* Title */}
        <motion.h1
          className="relative z-30 max-w-[616px] bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent font-title font-semibold leading-[0.9] tracking-tight text-[84px] lg:max-w-[528px] lg:text-[72px] md:max-w-[441px] md:text-[56px] sm:max-w-[256px] sm:text-[32px]"
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Everything App for&nbsp;your teams
        </motion.h1>

        {/* Typing Text */}
        <div className="mt-6 max-w-[600px] min-h-[160px]">
          <TypingText
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi."
          />
        </div>
      </div>
    </div>
  );
}
