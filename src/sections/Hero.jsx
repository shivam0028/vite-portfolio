import { useEffect, useState } from "react";
import Button from "../components/ui/Button";

const roles = [
  "FULL-STACK DEVELOPER",
  "MERN STACK ENGINEER",
  "REACT SPECIALIST",
  "PROBLEM SOLVER",
];

const marqueeItems = [
  "REACT", "NODE.JS", "MONGODB", "JAVA", "DSA", "TAILWIND",
  "JAVASCRIPT", "C", "EXPRESS", "MERN", "REST API", "GIT",
  "REACT", "NODE.JS", "MONGODB", "JAVA", "DSA", "TAILWIND",
  "JAVASCRIPT", "C", "EXPRESS", "MERN", "REST API", "GIT",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = roles[roleIdx];
    let i = typing ? 0 : role.length;
    let timer;

    if (typing) {
      timer = setInterval(() => {
        setText(role.slice(0, ++i));
        if (i >= role.length) { clearInterval(timer); setTimeout(() => setTyping(false), 2000); }
      }, 55);
    } else {
      timer = setInterval(() => {
        setText((p) => p.slice(0, -1));
        i--;
        if (i <= 0) { clearInterval(timer); setRoleIdx((p) => (p + 1) % roles.length); setTyping(true); }
      }, 30);
    }
    return () => clearInterval(timer);
  }, [roleIdx, typing]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] right-[8%] w-64 h-64 border border-[#00fff0]/10 rounded-full float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-[20%] right-[10%] w-40 h-40 border border-[#ff2d6b]/10 rounded-full float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-[20%] left-[5%] w-48 h-48 border border-[#7b2fff]/10 rounded-full float"
          style={{ animationDelay: "0.8s" }}
        />

        {/* Spinning ring */}
        <div className="absolute top-[18%] right-[12%] w-52 h-52 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border border-dashed border-[#00fff0]/15 spin-slow"
          />
          <div className="text-[#00fff0]/20 font-mono text-xs">{"</>"}</div>
        </div>

        {/* Pulse ring */}
        <div className="absolute bottom-[30%] right-[20%]">
          <div className="w-3 h-3 bg-[#ff2d6b] rounded-full relative">
            <div className="absolute inset-0 rounded-full bg-[#ff2d6b] pulse-ring" />
          </div>
        </div>
        <div className="absolute top-[45%] left-[12%]">
          <div className="w-2 h-2 bg-[#00fff0] rounded-full relative">
            <div className="absolute inset-0 rounded-full bg-[#00fff0] pulse-ring" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-28">
        <div className="overflow-hidden mb-3">
          <p className="font-mono text-[#00fff0] text-xs tracking-[0.6em] uppercase slide-up-1 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00fff0]" />
            Available for work
            <span className="w-2 h-2 rounded-full bg-[#00fff0] inline-block" style={{ boxShadow: "0 0 8px #00fff0" }} />
          </p>
        </div>

        {/* Giant name */}
        <div className="overflow-hidden mb-1">
          <h1
            className="slide-up-2 text-[clamp(5rem,18vw,17rem)] font-black text-white leading-none tracking-tighter select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            SHIVAM
          </h1>
        </div>

        {/* Accent line with role */}
        <div className="overflow-hidden mb-8">
          <div className="slide-up-3 flex items-center gap-4 flex-wrap">
            <span
              className="text-[clamp(1.2rem,3vw,2.5rem)] font-black neon"
              style={{ color: "#00fff0", fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {text}
              <span className="blink text-white">_</span>
            </span>
          </div>
        </div>

        {/* Bio */}
        <div className="overflow-hidden mb-10">
          <p className="slide-up-4 text-gray-400 text-lg max-w-xl leading-relaxed font-light">
            Full-stack web developer focused on building{" "}
            <span className="text-white font-semibold">modern, responsive</span> and{" "}
            <span className="text-white font-semibold">user-friendly</span> web applications.
            Turning ideas into real products with clean code.
          </p>
        </div>

        {/* Buttons */}
        <div className="overflow-hidden mb-12">
          <div className="slide-up-5 flex gap-4 flex-wrap">
            <Button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              VIEW PROJECTS →
            </Button>
            <Button href="/shivam_resume.pdf" variant="outline">
              DOWNLOAD CV ↓
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="slide-up-6 flex gap-10 flex-wrap">
          {[
            { num: "2+", label: "Years Coding" },
            { num: "5+", label: "Projects Built" },
            { num: "8+", label: "Technologies" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-4xl font-black text-[#00fff0] neon leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {s.num}
              </div>
              <div className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-b border-[#00fff0]/8 overflow-hidden bg-[#00fff0]/[0.02] py-3">
        <div className="marquee-inner flex gap-8 whitespace-nowrap w-max">
          {marqueeItems.map((item, i) => (
            <span key={i} className="font-mono text-[10px] text-[#00fff0]/30 tracking-[0.3em] uppercase flex items-center gap-8">
              {item}
              <span className="w-1 h-1 rounded-full bg-[#ff2d6b]/40 inline-block" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}