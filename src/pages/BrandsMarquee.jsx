export default function BrandsMarquee() {
  const brands = [
    "Google",
    "Meta",
    "Amazon",
    "Netflix",
    "Apple",
    "Microsoft",
    "Adobe",
    "Spotify",
  ];

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] w-screen py-14 overflow-hidden
                    bg-white backdrop-blur-md">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white/20 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white/20 to-transparent z-10" />

      {/* TRACK */}
      <div className="flex w-max animate-marquee">
        {/* SET A */}
        <div className="flex items-center gap-28">
          {brands.map((brand, i) => (
            <span
              key={`a-${i}`}
              className="text-black text-lg font-medium whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>

        {/* GAP BETWEEN SETS */}
        <div className="w-28 shrink-0" />

        {/* SET B */}
        <div className="flex items-center gap-28">
          {brands.map((brand, i) => (
            <span
              key={`b-${i}`}
              className="text-black text-lg font-medium whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
