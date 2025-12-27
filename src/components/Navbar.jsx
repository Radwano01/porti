import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import "../css/navbar.css";

export default function Navbar() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [open, setOpen] = useState(false);

  // ✅ NEW: scroll state
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ NEW: scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md navbar ${isScrolled ? "navbar--scrolled" : ""
        }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <div className="logo-flip-wrapper" onClick={() => scrollTo("top")}>
          <div className="logo-flip-inner">
            <img
              src={logo1}
              alt="Logo front"
              className="logo-face logo-front"
            />
            <img
              src={logo2}
              alt="Logo back"
              className="logo-face logo-back"
            />
          </div>
        </div>

        {/* LINKS */}
        <div className="flex items-center gap-6">
          <button onClick={() => scrollTo("about")} className="nav-link">
            ABOUT US
          </button>

          <div className="relative group">
            <span
              className="nav-link cursor-pointer"
              onClick={() => scrollTo("services")}
            >
              SERVICES
            </span>
          </div>

          {/* CONTACT BUTTON */}
          <button
            className="contact-btn"
            onClick={() => navigate("/contact")}
          >
            <span>CONTACT</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
