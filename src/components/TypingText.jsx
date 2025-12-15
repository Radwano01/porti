import { useEffect, useState } from "react";

export default function TypingText({ text, speed = 50, pause = 1000 }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (!deleting) {
        setDisplayed(text.slice(0, index + 1));
        if (index + 1 === text.length) {
          setDeleting(true);
        } else {
          setIndex(index + 1);
        }
      } else {
        setDisplayed(text.slice(0, index - 1));
        if (index - 1 === 0) {
          setDeleting(false);
          setIndex(0);
        } else {
          setIndex(index - 1);
        }
      }
    }, speed);

    return () => clearTimeout(handle);
  }, [index, deleting, text, speed]);

  return (
    <p className="mt-6 text-white/90 text-xl sm:text-lg max-w-md whitespace-pre-wrap font-['Fira_Code']">
      {displayed}
      <span className="inline-block ml-1 h-6 w-1 bg-white animate-blink"></span>
    </p>
  );
}
