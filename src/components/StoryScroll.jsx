import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const sections = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
];

export default function StoryScroll() {
  const [active, setActive] = useState("top");
  const location = useLocation();

  if (location.pathname !== "/") return null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible section
        let maxRatio = 0;
        let mostVisibleId = active;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });

        if (mostVisibleId) {
          setActive(mostVisibleId);
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [active]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className={`w-3 h-3 rounded-full transition-all duration-300
            ${
              active === s.id
                ? "bg-white scale-125 shadow-[0_0_12px_white]"
                : "bg-white/30 hover:bg-white/60"
            }`}
          aria-label={s.label}
        />
      ))}
    </div>
  );
}
