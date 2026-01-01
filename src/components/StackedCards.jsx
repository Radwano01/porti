import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PAGES = [
  { id: 1, label: "Page1" },
  { id: 2, label: "Page2" },
  { id: 3, label: "Page3" },
  { id: 4, label: "Page4" },
  { id: 5, label: "Page5" },
];

const CARD_WIDTH = 520;
const STACK_PEEK = 0.11;

export default function StackedCards() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [stack, setStack] = useState(
    PAGES.map((_, i) => i).filter(i => i !== 0)
  );

  function swapToSelected(nextIndex) {
    if (nextIndex === selectedIndex) return;

    setStack(prev => {
      const filtered = prev.filter(i => i !== nextIndex);
      return [selectedIndex, ...filtered];
    });

    setSelectedIndex(nextIndex);
  }

  function nextPage() {
    swapToSelected((selectedIndex + 1) % PAGES.length);
  }

  function prevPage() {
    swapToSelected((selectedIndex - 1 + PAGES.length) % PAGES.length);
  }

  /* ===== SHARED NAV (DESKTOP + MOBILE) ===== */
  const Navigation = (
    <div className="flex items-center gap-6 mt-6">
      {/* PREV */}
      <button
        onClick={prevPage}
        className="group w-12 h-12 rounded-full
          bg-white hover:bg-[#00caeb]/15
          transition flex items-center justify-center"
      >
        <ChevronLeft
          className="w-6 h-6 text-black
            group-hover:text-[#00caeb] transition"
        />
      </button>

      {/* DOTS */}
      <div className="flex items-center gap-3">
        {PAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => swapToSelected(index)}
            className={`w-3 h-3 rounded-full transition
              ${
                index === selectedIndex
                  ? "bg-[#00caeb] scale-125"
                  : "bg-white hover:bg-[#00caeb]/60"
              }`}
          />
        ))}
      </div>

      {/* NEXT */}
      <button
        onClick={nextPage}
        className="group w-12 h-12 rounded-full
          bg-white hover:bg-[#00caeb]/15
          transition flex items-center justify-center"
      >
        <ChevronRight
          className="w-6 h-6 text-black
            group-hover:text-[#00caeb] transition"
        />
      </button>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex w-full h-[700px] items-center justify-center">
        <div className="w-full max-w-7xl h-[620px] flex items-center justify-center">

          {/* LEFT STACK */}
          <div className="flex-1 h-full flex items-center justify-end pr-24">
            <div className="relative h-full w-[720px]">
              {stack.map((pageIndex, depth) => {
                const x = depth * CARD_WIDTH * STACK_PEEK;
                const opacity = 1 - depth * 0.15;

                return (
                  <motion.div
                    key={PAGES[pageIndex].id}
                    animate={{ x, scale: 0.9, opacity }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{ zIndex: 50 - depth }}
                    onClick={() => swapToSelected(pageIndex)}
                    className="absolute inset-0 w-[700px]
                      rounded-3xl shadow-2xl cursor-pointer bg-white"
                  >
                    <Page label={PAGES[pageIndex].label} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SELECTED */}
          <div className="flex-1 h-full flex items-center justify-start pl-24">
            <div className="relative h-full w-[900px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={PAGES[selectedIndex].id}
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0
                    rounded-3xl shadow-2xl bg-white"
                >
                  <Page label={PAGES[selectedIndex].label} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex">{Navigation}</div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden w-full flex flex-col items-center gap-6 px-4 min-h-[900px]">

        {/* SELECTED */}
        <div className="relative w-full h-[300px] sm:h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={PAGES[selectedIndex].id}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0
                rounded-2xl shadow-2xl bg-white"
            >
              <Page label={PAGES[selectedIndex].label} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* STACK */}
        <div className="relative w-full h-[320px] sm:h-[360px]">
          {stack.map((pageIndex, depth) => {
            const y = depth * 18;
            const scale = 1 - depth * 0.05;
            const opacity = 1 - depth * 0.15;

            return (
              <motion.div
                key={PAGES[pageIndex].id}
                animate={{ y, scale, opacity }}
                transition={{ duration: 0.4 }}
                style={{ zIndex: 20 - depth }}
                onClick={() => swapToSelected(pageIndex)}
                className="absolute inset-0
                  rounded-2xl shadow-xl cursor-pointer bg-white"
              >
                <Page label={PAGES[pageIndex].label} />
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE NAV — SAME AS DESKTOP */}
        {Navigation}
      </div>
    </div>
  );
}

/* ================= PAGE ================= */
function Page({ label }) {
  return (
    <>
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 opacity-10
        bg-[radial-gradient(#000_1px,transparent_1px)]
        [background-size:22px_22px]"
      />
      <div className="relative h-full flex items-center justify-center">
        <div className="text-black/20 text-[120px] font-black">
          {label}
        </div>
      </div>
    </>
  );
}
