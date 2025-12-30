import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const sections = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
];

export default function StoryScroll() {
  const [active, setActive] = useState("top");
  const [passed, setPassed] = useState([]); // tracks which sections have been passed
  const location = useLocation();
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  if (location.pathname !== "/") return null;

  // Observe sections for active dot
  useEffect(() => {
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
  }, [active]);

  // Update passed sections for line & dot color
  useEffect(() => {
    const updatePassed = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2; // middle of viewport
      const newPassed = sections.map((section) => {
        const el = document.getElementById(section.id);
        if (!el) return false;
        return scrollPos >= el.offsetTop;
      });
      setPassed(newPassed);
    };

    window.addEventListener("scroll", updatePassed, { passive: true });
    updatePassed();
    return () => window.removeEventListener("scroll", updatePassed);
  }, []);

  // Scroll to section
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Dragging behavior
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

  useEffect(() => {
    const handleMouseUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center cursor-pointer select-none"
      onMouseDown={() => (draggingRef.current = true)}
    >
      {sections.map((s, i) => {
        const nextSection = sections[i + 1];
        const dotActive = passed[i]; // dot is active if passed
        const lineActive = passed[i]; // line active if current section passed

        return (
          <div key={s.id} className="flex flex-col items-center">
            {/* Dot */}
            <button
              onClick={() => scrollTo(s.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${dotActive
                  ? "bg-[#00caeb] scale-125 shadow-[0_0_12px_#00caeb]"
                  : "bg-white hover:bg-[#00caeb]/60"
                }`}
              aria-label={s.label}
            />
            {/* Line between dots */}
            {nextSection && (
              <div
                onClick={() => {
                  const currEl = document.getElementById(s.id);
                  const nextEl = document.getElementById(nextSection.id);
                  if (currEl && nextEl) {
                    const middle =
                      currEl.offsetTop +
                      (nextEl.offsetTop - currEl.offsetTop) / 2;
                    window.scrollTo({ top: middle, behavior: "smooth" });
                  }
                }}
                className={`w-0.5 h-6 mt-1 transition-colors duration-300 ${
                  lineActive ? "bg-[#00caeb]" : "bg-white/30"
                } hover:bg-[#00caeb]/60`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
