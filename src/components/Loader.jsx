import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: { duration: 0.3 } }}
    >
      {/* Full-page white mirror background */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl" />

      {/* Spinner */}
      <motion.div
        className="relative w-16 h-16 border-4 border-t-purple-500 border-b-purple-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />
    </motion.div>
  );
}
