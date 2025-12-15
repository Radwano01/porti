import { useEffect, useRef, useState } from "react";

export default function ScrollBar() {
  const barRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  /* Sync page scroll -> scrollbar */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const raw = Math.min(scrollTop / maxScroll, 1);

      // Faster fill at start
      const eased = Math.pow(raw, 0.5);

      setProgress(eased);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Drag to scroll */
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging || !barRef.current) return;

      const rect = barRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const percent = Math.min(Math.max(y / rect.height, 0), 1);

      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      window.scrollTo({
        top: maxScroll * percent,
        behavior: "auto",
      });
    };

    const onMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <div
        ref={barRef}
        onMouseDown={() => setIsDragging(true)}
        className="relative w-3 h-64 rounded-full
                   bg-white/10 backdrop-blur-xl
                   border border-white/20
                   cursor-pointer
                   overflow-hidden"
      >
        {/* Blue animated fill */}
        <div
          className="absolute bottom-0 left-0 w-full
                     bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300
                     shadow-[0_0_20px_rgba(59,130,246,0.8)]
                     transition-all duration-150"
          style={{
            height: `${progress * 100}%`,
          }}
        />

        {/* White control circle */}
        <div
          className="absolute left-1/2 -translate-x-1/2
                     w-5 h-5 rounded-full bg-white
                     shadow-[0_0_25px_rgba(255,255,255,0.9)]
                     transition-transform duration-75"
          style={{
            bottom: `calc(${progress * 100}% - 10px)`,
          }}
        />
      </div>
    </div>
  );
}
