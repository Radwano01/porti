import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import HomepageContent from "../components/HomepageContent";

export default function Homepage() {
  const [loading, setLoading] = useState(true);

  // Called from HomepageContent when video is loaded
  const handleVideoLoaded = () => {
    setLoading(false); // hide loader
  };

  return (
    <div className="relative w-full h-screen">

      {/* Homepage content always rendered, animations start after video loaded */}
      <HomepageContent startAnimation={!loading} onVideoLoaded={handleVideoLoaded} />

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>
    </div>
  );
}
