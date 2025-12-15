export default function BorderWrapper({ children }) {
  return (
    <div className="relative isolate h-full w-full p-[3px] rounded-3xl card-border-animation">
      <div className="relative h-full w-full rounded-3xl bg-[#05060f]">
        {children}
      </div>
    </div>
  );
}
