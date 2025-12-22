import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import HomepageContent from "../components/HomepageContent";

export default function Homepage() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show loader immediately
    const loaderTimer = setTimeout(() => {
      setLoading(false);        // start fade out
    }, 1800); // total loader display time

    // Delay showing homepage content until loader starts fade-out
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 200); // small delay (0.2s) so loader background covers page first

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Render homepage content only after small delay */}
      {showContent && <HomepageContent startAnimation={!loading} />}

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>
    </div>
  );
}