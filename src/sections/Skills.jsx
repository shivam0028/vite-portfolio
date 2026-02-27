import { useEffect, useRef } from "react";
import AnimatedSection from "../components/ui/AnimatedSection";
import SectionTitle from "../components/ui/SectionTitle";

const skillGroups = [
  {
    category: "Frontend",
    color: "#00fff0",
    skills: [
      { name: "React", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    category: "Backend",
    color: "#ff2d6b",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    category: "CS Fundamentals",
    color: "#7b2fff",
    skills: [
      { name: "Java", level: 82 },
      { name: "C", level: 75 },
      { name: "DSA", level: 78 },
    ],
  },
];

const techPills = [
  "React", "JavaScript", "Node.js", "Express",
  "MongoDB", "Java", "C", "DSA",
  "Tailwind", "Git", "REST API", "MERN",
];

function SkillBar({ name, level, color, visible }) {
  return (
    <div className="mb-6 group">
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
          {name}
        </span>
        <span
          className="font-mono text-xs font-bold transition-all duration-300"
          style={{ color }}
        >
          {level}%
        </span>
      </div>
      <div className="h-[4px] bg-white/5 rounded-full overflow-hidden relative">
        <div
          className="h-full rounded-full fill-bar absolute left-0 top-0"
          style={{
            width: visible ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: visible ? `0 0 10px ${color}60` : "none",
            transition: visible
              ? "width 1.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s"
              : "none",
          }}
        />
      </div>
    </div>
  );
}

function SkillCard({ group, index }) {
  const ref = useRef(null);
  const visibleRef = useRef(false);
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visibleRef.current) {
          visibleRef.current = true;
          barsRef.current.forEach((bar, i) => {
            if (bar) {
              setTimeout(() => {
                bar.style.width = `${group.skills[i].level}%`;
                bar.style.boxShadow = `0 0 10px ${group.color}60`;
              }, i * 120 + 200);
            }
          });
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [group]);

  return (
    <AnimatedSection delay={index * 120}>
      <div
        ref={ref}
        className="border border-white/5 bg-[#0d0d14] p-7 hover:border-white/15 transition-all duration-500 group relative overflow-hidden"
        style={{
          boxShadow: `0 0 0 1px ${group.color}08`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 1px ${group.color}40, 0 20px 60px ${group.color}08`;
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 1px ${group.color}08`;
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Top accent */}
        <div className="h-[3px] w-full absolute top-0 left-0"
          style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }}
        />
        <h3
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-7"
          style={{ color: group.color }}
        >
          {group.category}
        </h3>
        {group.skills.map((skill, i) => (
          <div key={skill.name} className="mb-6 group/bar">
            <div className="flex justify-between mb-2">
              <span className="font-mono text-sm text-gray-300 group-hover/bar:text-white transition-colors duration-300">
                {skill.name}
              </span>
              <span className="font-mono text-xs font-bold" style={{ color: group.color }}>
                {skill.level}%
              </span>
            </div>
            <div className="h-[4px] bg-white/5 rounded-full overflow-hidden">
              <div
                ref={(el) => (barsRef.current[i] = el)}
                className="h-full rounded-full transition-all duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)]"
                style={{
                  width: "0%",
                  background: `linear-gradient(90deg, ${group.color}, ${group.color}80)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionTitle label="02. skills" title="WHAT I" accent="KNOW" />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>

        {/* Tech pills */}
        <AnimatedSection>
          <p className="font-mono text-[10px] text-gray-600 tracking-[0.4em] uppercase mb-5 flex items-center gap-3">
            <span className="w-4 h-px bg-gray-600" />
            Technologies
          </p>
          <div className="flex flex-wrap gap-3">
            {techPills.map((tech, i) => (
              <span
                key={tech}
                className="font-mono text-xs px-4 py-2 border border-white/8 text-gray-500
                  hover:text-[#00fff0] hover:border-[#00fff0]/40 hover:shadow-[0_0_15px_rgba(0,255,240,0.15)]
                  transition-all duration-300 cursor-default"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}