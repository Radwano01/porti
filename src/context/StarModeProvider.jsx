import { createContext, useContext, useState } from "react";

const StarModeContext = createContext();

export function StarModeProvider({ children }) {
  const [starMode, setStarMode] = useState("color"); 
  // "color" | "white"

  return (
    <StarModeContext.Provider value={{ starMode, setStarMode }}>
      {children}
    </StarModeContext.Provider>
  );
}

export function useStarMode() {
  return useContext(StarModeContext);
}
