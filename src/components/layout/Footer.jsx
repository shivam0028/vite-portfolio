export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-10 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span
          className="text-2xl font-black text-white tracking-widest"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          SHIVAM<span className="text-[#00fff0] neon">.</span>
          <span className="text-[#ff2d6b]">DEV</span>
        </span>
        <p className="font-mono text-[10px] text-gray-700 tracking-[0.3em] uppercase">
          Designed & Built by Shivam · {new Date().getFullYear()}
        </p>
        <p className="font-mono text-[10px] text-gray-700 tracking-widest">
          React · Tailwind · Vite
        </p>
      </div>
    </footer>
  );
}