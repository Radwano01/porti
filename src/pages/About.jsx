// src/pages/About.jsx
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import FallingStars from "../components/three/FallingStars";

export default function About() {
  const leftVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, duration: 1.5 },
    },
  };

  const titleVariant = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.5 } },
  };

  const textVariant = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1.2 } },
  };

  return (
    <section className="relative w-full min-h-screen">
      
      {/* Falling Stars Background (normal, not burning) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 15], fov: 60 }}
          gl={{ alpha: false }}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.8} />
          <FallingStars
            count={2000}
            spreadX={35}
            spreadY={40}
            burningColors={false} // normal stars, not burning
            speedMultiplier={0.2}
          />
        </Canvas>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center md:items-start justify-center max-w-7xl mx-auto px-6 py-16 md:py-24 gap-12 md:gap-40">
        
        {/* Left Text */}
        <motion.div
          className="w-full md:w-1/2 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={leftVariants}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white blue to-purple-500 bg-clip-text text-transparent"
            variants={titleVariant}
          >
            About Us
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg leading-relaxed text-white/80 max-w-lg"
            variants={textVariant}
          >
            We are a team of passionate developers and designers, delivering
            premium digital solutions with cutting-edge interactions and visuals.
          </motion.p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative rounded-2xl p-[3px] card-border-animation purple max-w-sm sm:max-w-md w-full">
            <div className="rounded-2xl bg-black/80 backdrop-blur-xl p-4 sm:p-6 aspect-[3/4]">
              <img
                src="https://via.placeholder.com/360x460"
                alt="About"
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
