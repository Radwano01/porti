import { useState, useRef } from "react";
import "../css/ProfessionalCalendar.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function ProfessionalCalendar() {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");

  const cardRef = useRef(null);

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    if (monthIndex === 0) { setMonthIndex(11); setYear(year - 1); }
    else setMonthIndex(monthIndex - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (monthIndex === 11) { setMonthIndex(0); setYear(year + 1); }
    else setMonthIndex(monthIndex + 1);
    setSelectedDay(null);
  };

  const handleSubmit = () => {
    if (!selectedDay) { alert("Please select a day"); return; }
    const selectedDate = new Date(year, monthIndex, selectedDay, parseInt(hour, 10), parseInt(minute, 10));
    if (onSelect) onSelect(selectedDate);
    alert(`Selected: ${selectedDate}`);
  };

  // Mouse move handler for 3D tilt
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="mx-auto perspective-wrapper w-full max-w-md">
      <div
        ref={cardRef}
        className="relative rounded-2xl card-border-animation purple max-w-sm sm:max-w-md w-full calendar-3d-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="calendar-inner-card rounded-2xl border border-white/10 p-4 sm:p-6 w-full"
          style={{ backgroundColor: "rgba(11, 13, 26, 0.9)", backdropFilter: "blur(10px)" }}
        >
          {/* Month / Year Navigation */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={prevMonth} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">◀</button>
            <span className="font-semibold text-lg">{months[monthIndex]} {year}</span>
            <button onClick={nextMonth} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">▶</button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-center mb-1 font-semibold text-gray-300">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map(day => (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`cursor-pointer p-2 text-center rounded-lg transition-all
                  ${selectedDay === day ? "bg-blue-500 text-white shadow-lg" : "hover:bg-gray-700"}`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Time Selection */}
          <div className="flex space-x-4 mt-2 justify-center">
            <div>
              <label className="block mb-1 text-sm">Hour</label>
              <select
                value={hour}
                onChange={e => {
                  setHour(e.target.value);
                  if (onTimeChange) onTimeChange(e.target.value); // UPDATE planet live
                }}
                className="bg-gray-800 p-1 rounded text-sm"
              >
                {Array.from({ length: 24 }, (_, i) => i).map(h => (
                  <option key={h} value={h < 10 ? `0${h}` : `${h}`}>
                    {h < 10 ? `0${h}` : h}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm">Minute</label>
              <select
                value={minute}
                onChange={e => setMinute(e.target.value)}
                className="bg-gray-800 p-1 rounded text-sm"
              >
                {Array.from({ length: 60 }, (_, i) => i).map(m => (
                  <option key={m} value={m < 10 ? `0${m}` : `${m}`}>
                    {m < 10 ? `0${m}` : m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 p-2 rounded-lg hover:bg-blue-500 font-semibold mt-2"
          >
            Save Selection
          </button>
        </div>
      </div>
    </div>
  );
}
