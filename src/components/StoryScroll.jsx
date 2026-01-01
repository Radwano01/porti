import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const sections = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
];

export default function StoryScroll() {
  const [active, setActive] = useState("top");
  const [passed, setPassed] = useState([]);
  const location = useLocation();
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  const isHome = location.pathname === "/"; // ✅ safe flag

  // Observe sections
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisibleId = active;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });
        if (mostVisibleId) setActive(mostVisibleId);
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [active, isHome]);

  // Passed sections
  useEffect(() => {
    if (!isHome) return;

    const updatePassed = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      const newPassed = sections.map((section) => {
        const el = document.getElementById(section.id);
        return el ? scrollPos >= el.offsetTop : false;
      });
      setPassed(newPassed);
    };

    window.addEventListener("scroll", updatePassed, { passive: true });
    updatePassed();
    return () => window.removeEventListener("scroll", updatePassed);
  }, [isHome]);

  // Drag behavior
  useEffect(() => {
    if (!isHome) return;

    const handleDrag = (e) => {
      if (!draggingRef.current) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const pct = Math.min(Math.max(y / rect.height, 0), 1);

      const scrollTop = pct * (document.body.scrollHeight - window.innerHeight);
      window.scrollTo({ top: scrollTop, behavior: "auto" });
    };

    const handleMouseUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isHome]);

  // ✅ Conditional render AFTER hooks
  if (!isHome) return null;

  return (
    <div
      ref={containerRef}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center cursor-pointer select-none"
      onMouseDown={() => (draggingRef.current = true)}
    >
      {sections.map((s, i) => {
        const nextSection = sections[i + 1];
        const dotActive = passed[i];

        return (
          <div key={s.id} className="flex flex-col items-center">
            <button
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
              }
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${dotActive
                  ? "bg-[#00caeb] scale-125 shadow-[0_0_12px_#00caeb]"
                  : "bg-white hover:bg-[#00caeb]/60"
                }`}
            />
            {nextSection && (
              <div
                className={`w-0.5 h-6 mt-1 transition-colors duration-300 ${
                  dotActive ? "bg-[#00caeb]" : "bg-white/30"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
