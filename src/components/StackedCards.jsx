import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PAGES = [
  { id: 1, color: "from-red-500 to-pink-500", number: "01" },
  { id: 2, color: "from-blue-500 to-cyan-500", number: "02" },
  { id: 3, color: "from-green-500 to-emerald-500", number: "03" },
  { id: 4, color: "from-purple-500 to-violet-500", number: "04" },
  { id: 5, color: "from-orange-500 to-amber-500", number: "05" },
];

export default function StackedCards() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cardWidth = 400; // px
  const peek = 0.2; // right cards visible percentage

  const handlePrev = () => setSelectedIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setSelectedIndex((prev) => Math.min(prev + 1, PAGES.length - 1));

  return (
    <div className="relative w-full h-[700px] md:h-[800px] flex flex-col items-center justify-center overflow-hidden">
      {/* Card Container */}
      <div className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center">
        {PAGES.map((page, index) => {
          const offsetIndex = index - selectedIndex;
          const isSelected = index === selectedIndex;

          // calculate x position
          let x = offsetIndex * cardWidth * peek;
          if (offsetIndex < 0) x = offsetIndex * cardWidth * 0.8; // left stack

          const scale = isSelected ? 1 : 0.85;
          const zIndex = isSelected ? 100 : 50 - Math.abs(offsetIndex);

          return (
            <motion.div
              key={page.id}
              animate={{ x, scale }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex }}
              className="absolute top-0 h-full w-[400px] md:w-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
              onClick={() => setSelectedIndex(index)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${page.color}`} />
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="text-white/20 text-[200px] md:text-[250px] font-black tracking-tighter leading-none">
                  {page.number}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Arrows at the Bottom */}
      <div className="mt-8 flex items-center gap-8">
        <button
          onClick={handlePrev}
          disabled={selectedIndex === 0}
          className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30
            flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed
            hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-xl"
        >
          <ChevronLeft size={28} className="text-white" />
        </button>

        <button
          onClick={handleNext}
          disabled={selectedIndex === PAGES.length - 1}
          className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30
            flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed
            hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-xl"
        >
          <ChevronRight size={28} className="text-white" />
        </button>
      </div>
    </div>
  );
}
