import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PAGES = [
  { 
    id: 1, 
    color: "from-red-500 to-pink-500", 
    number: "01"
  },
  { 
    id: 2, 
    color: "from-blue-500 to-cyan-500", 
    number: "02"
  },
  { 
    id: 3, 
    color: "from-green-500 to-emerald-500", 
    number: "03"
  },
  { 
    id: 4, 
    color: "from-purple-500 to-violet-500", 
    number: "04"
  },
  { 
    id: 5, 
    color: "from-orange-500 to-amber-500", 
    number: "05"
  },
];

export default function StackedCards() {
  const [selectedIndex, setSelectedIndex] = useState(PAGES.length - 1);
  const stackGap = 15; // Gap between stacked cards on left
  const selectedOffset = 40; // How far selected page moves to the right

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < PAGES.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="relative w-full h-[700px] md:h-[800px] flex items-center justify-center">
      {/* Main Container */}
      <div className="relative w-full max-w-6xl h-[500px] md:h-[600px]">
        {PAGES.map((page, index) => {
          const isSelected = index === selectedIndex;
          const isStacked = index < selectedIndex; // Cards left of selected
          const isRight = index > selectedIndex; // Cards right of selected (should be hidden)

          // Hide cards that are to the right of selected
          if (isRight) return null;

          // Calculate positions:
          // - Selected page moves to the right
          // - Unselected pages stack on the left with offset
          let xPosition;
          let scale;
          let opacity;
          let zIndex;

          if (isSelected) {
            // Selected page: move to the right
            xPosition = selectedOffset;
            scale = 1;
            opacity = 1;
            zIndex = 100;
          } else {
            // Stacked pages: offset based on their position in stack
            const stackOffset = (selectedIndex - index - 1) * stackGap;
            xPosition = stackOffset;
            scale = 0.85 + (index * 0.02);
            opacity = 0.7 - (index * 0.1);
            zIndex = 50 - index;
          }

          return (
            <motion.div
              key={page.id}
              animate={{
                x: `${xPosition}%`,
                scale,
                opacity,
              }}
              transition={{ 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ zIndex }}
              className={`absolute top-0 h-full w-4/5 md:w-3/4 rounded-3xl overflow-hidden shadow-2xl
                ${isSelected ? 'shadow-2xl ring-2 ring-white/20' : 'shadow-xl'}`}
              onClick={() => !isSelected && setSelectedIndex(index)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${page.color}`} />
              
              {/* Subtle Pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
              
              {/* Large Page Number */}
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="text-white/20 text-[200px] md:text-[250px] font-black tracking-tighter leading-none">
                  {page.number}
                </div>
              </div>

              {/* Arrow button for stacked pages */}
              {!isSelected && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1.15 }}
                  onClick={() => setSelectedIndex(index)}
                  className="absolute top-1/2 -translate-y-1/2
                    right-8 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md
                    border-2 border-white/30 flex items-center justify-center 
                    shadow-2xl transition-all duration-300 hover:bg-white/30"
                >
                  <ChevronLeft size={32} className="rotate-180 text-white" />
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls - Positioned to the right of selected card */}
      <div className="absolute top-1/2 -translate-y-1/2"
        style={{ left: `calc(50% + ${selectedOffset/2}%)` }}>
        <div className="flex flex-col items-center space-y-6 ml-12">
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md
              border-2 border-white/30 flex items-center justify-center
              disabled:opacity-30 disabled:cursor-not-allowed
              hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-xl"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>
          
          <div className="flex flex-col space-y-3 items-center">
            {PAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300
                  ${idx === selectedIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            disabled={selectedIndex === PAGES.length - 1}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md
              border-2 border-white/30 flex items-center justify-center
              disabled:opacity-30 disabled:cursor-not-allowed
              hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-xl"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}