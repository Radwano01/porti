import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Services from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import ScrollToTopButton from "./components/ScrollToTopButton";
import BrandsMarquee from "./pages/BrandsMarquee";
import StoryScroll from "./components/StoryScroll";

export default function App() {
  return (
    <Router>
      <Navbar />
      <StoryScroll />

      <Routes>
        {/* SINGLE PAGE ROUTE */}
        <Route
          path="/"
          element={
            <>
              {/* HOME */}
              <section id="top">
                <Homepage />
              </section>

              {/* SERVICES */}
              <section id="services">
                <Services />
              </section>

              {/* BRANDS */}
              <section id="brand">
                <BrandsMarquee />
              </section>

              {/* ABOUT */}
              <section id="about">
                <About />
              </section>

              {/* PRIVACY */}
              <section id="privacy">
                <PrivacyPolicy />
              </section>

              {/* SCROLL TO TOP BUTTON */}
              <ScrollToTopButton />
            </>
          }
        />

        {/* CONTACT PAGE */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
