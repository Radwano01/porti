import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Services from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function App() {
  return (
    <>
      {/* HOME */}
      <section id="top" className="h-screen">
        <Homepage />
      </section>

      {/* SERVICES */}
      <Services />
      
      {/* ABOUT */}
      <About />

      {/* PRIVACY */}
      <PrivacyPolicy />

      <ScrollToTopButton />
    </>
  );
}