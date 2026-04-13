import { useRef } from "react";
import AnimatedSection from "../components/ui/AnimatedSection";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";

const projects = [
  {
    id: "01",
    title: "Sudoku Solver",
    tagline: "Java · Backtracking Algorithm",
    description:
      "A feature-rich Sudoku game built entirely in Java featuring an interactive board, smart input validation, and an automatic solver powered by the backtracking algorithm. Designed with clean OOP principles.",
    tech: ["Java", "OOP", "Backtracking", "DSA", "Swing UI"],
    color: "#ff2d6b",
    github: "https://github.com/",
    live: null,
    featured: true,
  },
  {
    id: "02",
    title: "Hospital Management System",
    tagline: "Full-Stack · MERN",
    description:
      "A comprehensive hospital management system with features for patient records, appointment scheduling, medical history tracking, and staff management. Built with a modern tech stack for optimal performance and scalability.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT Auth", "Tailwind CSS"],
    color: "#00fff0",
    github: "https://github.com/shivam0028/Hospital-Management-System",
    live: "https://hospital-management-system-uirv.vercel.app/",
    featured: false,
  },
  {
    id: "03",
    title: "Personal Portfolio Website",
    tagline: "React · Tailwind CSS",
    description:
      "A responsive and visually appealing portfolio website built with React and Tailwind CSS. Features smooth animations, a clean design, and optimized performance for all devices.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    color: "#7b2fff",
    github: "https://github.com/shivam0028/portfolio",
    live: "https://shivam0028.github.io/portfolio/",
    featured: false,
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
    card.querySelector(".card-shine").style.opacity = 0.15;
    card.querySelector(".card-shine").style.background =
      `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, white, transparent 70%)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateZ(0)";
    card.querySelector(".card-shine").style.opacity = 0;
  };

  const isEven = index % 2 === 0;

  return (
    <AnimatedSection animation={isEven ? "reveal-left" : "reveal-right"} delay={index * 100}>
      <div
        ref={cardRef}
        className="relative border border-white/5 bg-[#0d0d14] overflow-hidden transition-all duration-200"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 0 0 1px ${project.color}10`,
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Shine overlay */}
        <div className="card-shine absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-300" />

        {/* Top accent bar */}
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

        <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
          {/* Number */}
          <div
            className="text-[6rem] font-black leading-none select-none shrink-0"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: `${project.color}12`,
            }}
          >
            {project.id}
          </div>

          {/* Content */}
          <div className="flex-1">
            {project.featured && (
              <span
                className="font-mono text-[9px] tracking-[0.35em] uppercase px-3 py-1 border mb-4 inline-block"
                style={{ borderColor: `${project.color}40`, color: project.color }}
              >
                Featured Project
              </span>
            )}

            <h3
              className="text-3xl md:text-4xl font-black text-white mb-1 glitch leading-tight"
              data-text={project.title}
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
            >
              {project.title}
            </h3>

            <p className="font-mono text-[11px] tracking-widest mb-4" style={{ color: project.color }}>
              {project.tagline}
            </p>

            <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-7">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-3 py-1.5 tracking-widest uppercase"
                  style={{
                    background: `${project.color}08`,
                    border: `1px solid ${project.color}20`,
                    color: `${project.color}cc`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button href={project.github} variant={project.color === "#ff2d6b" ? "danger" : "outline"}>
                ↗ VIEW CODE
              </Button>
              {project.live && (
                <Button href={project.live}>
                  ⚡ LIVE DEMO
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionTitle label="03. projects" title="THINGS I'VE" accent="BUILT" />
        </AnimatedSection>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={300}>
          <div className="mt-12 text-center">
            <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-4">
              More on GitHub
            </p>
            <Button href="https://github.com/shivam0028?tab=repositories" variant="outline">
              ↗ SEE ALL PROJECTS
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}