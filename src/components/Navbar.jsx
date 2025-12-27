import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import "../css/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const timeoutRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
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
    handleCloseDropdown();
  };

  const handleOpenDropdown = () => {
    clearTimeout(timeoutRef.current);
    setServicesOpen(true);
    setDropdownVisible(true);
  };

  const handleCloseDropdown = () => {
    setDropdownVisible(false); // triggers fade-out
    // wait for animation duration before removing from DOM
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 250); // matches CSS transition-duration
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md navbar ${
        isScrolled ? "navbar--scrolled" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <div
          className="logo-flip-wrapper cursor-pointer"
          onClick={() => scrollTo("top")}
        >
          <div className="logo-flip-inner">
            <img src={logo1} alt="Logo front" className="logo-face logo-front" />
            <img src={logo2} alt="Logo back" className="logo-face logo-back" />
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">

          {/* SERVICES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={handleOpenDropdown}
            onMouseLeave={handleCloseDropdown}
          >
            <button
              onClick={dropdownVisible ? handleCloseDropdown : handleOpenDropdown}
              className="nav-link services-button"
            >
              SERVICES
              <span className="services-underline"></span>
            </button>

            {servicesOpen && (
              <div
                className={`absolute left-1/2 top-full mt-4 -translate-x-1/2 z-50 transition-opacity duration-250 ${
                  dropdownVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-[720px] rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl text-white animate-services-menu">
                  {/* HEADER */}
                  <div className="border-b border-white/10 px-6 py-4 text-center">
                    <h3 className="text-sm tracking-widest uppercase text-white/80">
                      Services
                    </h3>
                  </div>

                  {/* CONTENT */}
                  <div className="grid grid-cols-3 gap-10 px-8 py-8 text-sm">
                    <ul className="space-y-4">
                      <li onClick={() => scrollTo("web")} className="hover:text-white transition cursor-pointer animate-option-left">Web Development</li>
                      <li onClick={() => scrollTo("uiux")} className="hover:text-white transition cursor-pointer animate-option-left">UI / UX Design</li>
                      <li onClick={() => scrollTo("branding")} className="hover:text-white transition cursor-pointer animate-option-left">Branding</li>
                    </ul>
                    <ul className="space-y-4">
                      <li onClick={() => scrollTo("motion")} className="hover:text-white transition cursor-pointer animate-option-right">Motion & 3D</li>
                      <li className="hover:text-white transition cursor-pointer animate-option-right">Paid Ads Services</li>
                      <li className="hover:text-white transition cursor-pointer animate-option-right">Shooting Services</li>
                    </ul>
                    <ul className="space-y-4">
                      <li className="hover:text-white transition cursor-pointer animate-option-left">Graphic Design Services</li>
                      <li className="hover:text-white transition cursor-pointer animate-option-left">Photo Section</li>
                    </ul>
                  </div>

                  {/* FOOTER */}
                  <div className="border-t border-white/10 px-6 py-3 text-center">
                    <button onClick={handleCloseDropdown} className="text-xs text-white/60 hover:text-white transition">Minimize</button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ABOUT */}
          <button onClick={() => scrollTo("about")} className="nav-link">
            ABOUT US
          </button>

          {/* CONTACT */}
          <button className="contact-btn" onClick={() => navigate("/contact")}>
            <span>CONTACT</span>
          </button>

        </div>
      </div>
    </nav>
  );
}

