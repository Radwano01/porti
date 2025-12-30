import { motion } from "framer-motion";
import StackedCards from "../components/StackedCards";

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Main Content Container - Aligned to handle right shift */}
      <div className="relative w-full max-w-7xl mx-auto px-4 py-20">
        {/* Stacked Cards - With extra right padding to accommodate shift */}
        <div className="pr-0 md:pr-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <StackedCards />
          </motion.div>
        </div>

        {/* Visual indicator of the layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 text-white/40 text-sm"
        >
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            <span>Stacked Pages</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Selected Page</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}