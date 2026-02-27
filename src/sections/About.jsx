import AnimatedSection from "../components/ui/AnimatedSection";
import SectionTitle from "../components/ui/SectionTitle";

const facts = [
  { label: "Role", value: "Full-Stack Dev", icon: "⚡" },
  { label: "Stack", value: "MERN", icon: "🔥" },
  { label: "Focus", value: "DSA + WebDev", icon: "🎯" },
  { label: "Status", value: "Open to Work", icon: "✅" },
];

const codeLines = [
  { indent: 0, text: "const shivam = {", color: "text-white" },
  { indent: 1, text: 'name: "Shivam",', color: "text-[#00fff0]" },
  { indent: 1, text: 'role: "Full-Stack Dev",', color: "text-[#00fff0]" },
  { indent: 1, text: "skills: [", color: "text-[#00fff0]" },
  { indent: 2, text: '"React", "Node.js",', color: "text-[#ff2d6b]" },
  { indent: 2, text: '"Java", "DSA",', color: "text-[#ff2d6b]" },
  { indent: 1, text: "],", color: "text-[#00fff0]" },
  { indent: 1, text: "passion: () => {", color: "text-[#7b2fff]" },
  { indent: 2, text: 'return "building stuff";', color: "text-gray-400" },
  { indent: 1, text: "},", color: "text-[#7b2fff]" },
  { indent: 1, text: "available: true,", color: "text-green-400" },
  { indent: 0, text: "};", color: "text-white" },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionTitle label="01. about me" title="WHO I" accent="AM" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <AnimatedSection animation="reveal-left">
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Hey 👋 I'm <span className="text-white font-bold">Shivam</span> — a passionate
                full-stack developer who loves turning ideas into fast, beautiful web experiences.
              </p>
              <p>
                I specialize in the <span className="text-[#00fff0] font-semibold">MERN stack</span>,
                with strong foundations in <span className="text-white">Java, C, and DSA</span>.
                I believe great software is built at the intersection of clean code and sharp design.
              </p>
              <p>
                Currently sharpening my algorithmic thinking and building projects that solve
                real problems.
              </p>
            </div>

            {/* Fact cards */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {facts.map((f, i) => (
                <AnimatedSection key={f.label} delay={i * 100}>
                  <div className="border-glow border border-[#00fff0]/10 bg-[#0d0d14] p-5 group">
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <p className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-1">
                      {f.label}
                    </p>
                    <p className="text-white font-bold text-sm">{f.value}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: terminal */}
          <AnimatedSection animation="reveal-right">
            <div className="relative">
              {/* Terminal window */}
              <div className="bg-[#0a0a10] border border-[#00fff0]/15 rounded-sm overflow-hidden shadow-2xl shadow-[#00fff0]/5">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#00fff0]/8 bg-[#0d0d16]">
                  <div className="w-3 h-3 rounded-full bg-[#ff2d6b]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="font-mono text-[10px] text-gray-600 ml-3 tracking-widest">
                    shivam.js
                  </span>
                </div>
                {/* Code */}
                <div className="p-6 font-mono text-sm leading-8">
                  {codeLines.map((line, i) => (
                    <div
                      key={i}
                      className={`${line.color} transition-all duration-300`}
                      style={{ paddingLeft: `${line.indent * 20}px` }}
                    >
                      <span className="text-gray-700 select-none mr-4 text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {line.text}
                    </div>
                  ))}
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-gray-700 text-xs mr-4">13</span>
                    <span className="blink text-[#00fff0] text-lg">█</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-5 -right-5 bg-[#ff2d6b] text-white font-black text-xs px-4 py-2 tracking-widest uppercase float"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}
              >
                OPEN TO WORK
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}