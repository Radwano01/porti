import { motion } from "framer-motion";
import FallingStarsScene from "../components/three/FallingStarsScene";

export default function Services() {
  const fromRight = {
    hidden: { x: 200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1.2 } },
  };

  const fromLeft = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1.2 } },
  };

  const fromBottom = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.2 } },
  };

  return (
    <section
      id="services"
      className="relative min-h-screen bg-[#05060f] px-12 py-24 text-white overflow-hidden"
    >
      {/* ⭐ FALLING STARS BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FallingStarsScene />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* TITLE */}
        <motion.h2
          className="text-5xl font-semibold tracking-tight
          bg-gradient-to-br from-white via-[#cfd4ff] to-white
          bg-clip-text text-transparent mb-20"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5 }}
        >
          Services
        </motion.h2>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[fromRight, fromBottom, fromLeft, fromRight, fromBottom, fromLeft].map(
            (variant, i) => (
              <motion.div
                key={i}
                className="relative card-border-animation purple rounded-2xl p-[3px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={variant}
              >
                <div className="rounded-2xl bg-[#05060f]/90 backdrop-blur-xl p-8 h-full">
                  <h3 className="text-2xl font-semibold mb-4">
                    {["Web Development", "UI / UX Design", "Motion & Interaction"][i % 3]}
                  </h3>
                  <p className="text-white/75 leading-relaxed">
                    Premium digital solutions with performance, interaction, and modern visuals.
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
