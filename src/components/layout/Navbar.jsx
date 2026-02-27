import { useState, useEffect } from "react";

const links = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (link) => {
    setActive(link);
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060608]/85 backdrop-blur-xl border-b border-[#00fff0]/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => go("Home")}
          className="font-black text-xl tracking-widest text-white hover:text-[#00fff0] transition-colors duration-300"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.15em" }}
          data-hover
        >
          SHIVAM
          <span className="text-[#00fff0] neon">.</span>
          <span className="text-[#ff2d6b]">DEV</span>
        </button>

        {/* Links */}
        <ul className="flex gap-1">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => go(link)}
                className={`relative px-4 py-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-300 group ${
                  active === link ? "text-[#00fff0]" : "text-gray-500 hover:text-gray-200"
                }`}
                data-hover
              >
                {active === link && (
                  <span className="absolute inset-0 bg-[#00fff0]/5 border border-[#00fff0]/20 rounded-sm" />
                )}
                <span className="relative">{link}</span>
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#00fff0] transition-all duration-300 ${
                    active === link ? "w-full" : "w-0 group-hover:w-1/2"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}