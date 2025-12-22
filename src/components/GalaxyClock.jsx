import { useState, useEffect } from "react";

export default function GalaxyClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 50); // smooth seconds
    return () => clearInterval(timer);
  }, []);

  const secondsDeg = now.getSeconds() * 6 + now.getMilliseconds() * 0.006;
  const minutesDeg = now.getMinutes() * 6 + now.getSeconds() * 0.1;
  const hoursDeg = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;

  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Clock wrapper */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Orbiting glowing rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-72 h-72 rounded-full border border-cyan-400/50 animate-spin-slow glow-ring" />
          <div className="absolute w-56 h-56 rounded-full border border-purple-500/50 animate-spin-slower glow-ring" />
        </div>

        {/* Clock face with dark blur background */}
        <div className="relative w-full h-full rounded-full flex items-center justify-center
                        bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,255,255,0.3)]">
          {/* Center dot */}
          <div className="absolute w-4 h-4 bg-white rounded-full z-20 shadow-[0_0_15px_rgba(255,255,255,0.9)]" />

          {/* Numeric time under center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-6 text-white text-sm font-mono z-20">
            {((now.getHours() % 12) || 12).toString().padStart(2, "0")}:
            {now.getMinutes().toString().padStart(2, "0")}:
            {now.getSeconds().toString().padStart(2, "0")}{" "}
            {now.getHours() >= 12 ? "PM" : "AM"}
          </div>

          {/* Hour hand */}
          <div
            className="absolute w-2 h-20 bg-white rounded origin-bottom shadow-[0_0_25px_cyan] transition-transform duration-100"
            style={{
              transform: `translateX(-50%) rotate(${hoursDeg}deg)`,
              left: "50%",
              bottom: "50%",
            }}
          />

          {/* Minute hand */}
          <div
            className="absolute w-1.5 h-28 bg-cyan-400 rounded origin-bottom shadow-[0_0_30px_cyan] transition-transform duration-100"
            style={{
              transform: `translateX(-50%) rotate(${minutesDeg}deg)`,
              left: "50%",
              bottom: "50%",
            }}
          />

          {/* Second hand */}
          <div
            className="absolute w-1 h-32 bg-purple-500 rounded origin-bottom shadow-[0_0_35px_purple] transition-transform duration-50"
            style={{
              transform: `translateX(-50%) rotate(${secondsDeg}deg)`,
              left: "50%",
              bottom: "50%",
            }}
          />
        </div>

        {/* Date below clock */}
        <div className="absolute bottom-[-2.5rem] text-center">
          <p className="text-gray-300 text-lg font-mono">
            {day}/{month}/{year}
          </p>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .glow-ring {
          box-shadow: 0 0 40px rgba(0, 255, 255, 0.4),
            0 0 80px rgba(128, 0, 255, 0.3);
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slower {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
