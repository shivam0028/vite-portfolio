export default function SectionTitle({ label, title, accent }) {
  return (
    <div className="mb-16">
      <p className="font-mono text-[#00fff0] text-[10px] tracking-[0.5em] uppercase mb-4 flex items-center gap-3">
        <span className="w-8 h-px bg-[#00fff0] opacity-60" />
        {label}
      </p>
      <h2
        className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
      >
        {title}
        {accent && (
          <span className="neon-red text-[#ff2d6b]"> {accent}</span>
        )}
      </h2>
      <div className="mt-5 flex gap-2">
        <div className="w-12 h-[3px] bg-[#00fff0]" />
        <div className="w-4 h-[3px] bg-[#ff2d6b]" />
        <div className="w-2 h-[3px] bg-[#7b2fff]" />
      </div>
    </div>
  );
}