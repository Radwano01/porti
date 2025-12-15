import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <div className="text-lg font-bold text-white">LOGO</div>

        {/* LINKS */}
        <div className="flex items-center gap-6">
          <button onClick={() => scrollTo("top")} className="nav-link">
            HOMEPAGE
          </button>

          <button onClick={() => scrollTo("about")} className="nav-link">
            ABOUT US
          </button>

          {/* SERVICES DROPDOWN */}
        <div className="relative group">
          {/* Trigger */}
          <span className="nav-link cursor-pointer">
            SERVICES
          </span>

          {/* Dropdown */}
          <div
            className="
              absolute
              left-0
              top-full
              mt-4
              w-56
              rounded-xl
              bg-[#0b0d1a]/90
              backdrop-blur-xl
              border
              border-white/10
              shadow-2xl
              opacity-0
              invisible
              translate-y-2
              transition-all
              duration-200
              group-hover:opacity-100
              group-hover:visible
              group-hover:translate-y-0
            "
          >
            <ul className="py-2">
              {[
                "Web Development",
                "UI / UX Design",
                "3D Animation",
                "AI Integration",
              ].map((item) => (
                <li
                  key={item}
                  className="
                    px-5
                    py-3
                    text-sm
                    text-white/80
                    hover:text-white
                    hover:bg-white/5
                    transition
                    cursor-pointer
                  "
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

          <button onClick={() => scrollTo("privacy")} className="nav-link">
            PRIVACY & POLICY
          </button>
        </div>
      </div>
    </nav>
  );
}
