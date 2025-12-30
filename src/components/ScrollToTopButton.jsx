import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false); // Start hidden

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setVisible(true); // Show button when user scrolls down
      } else {
        setVisible(false); // Hide button at top
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    setVisible(false); // Hide button while scrolling

    const topEl = document.getElementById("top");
    if (topEl) {
      topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return visible ? (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full 
        border border-white/30 bg-white/10 text-white shadow-lg shadow-white backdrop-blur-md
        transition duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 
        hover:shadow-white focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M12 19V5" />
        <path d="M6 11l6-6 6 6" />
      </svg>
    </button>
  ) : null;
}
