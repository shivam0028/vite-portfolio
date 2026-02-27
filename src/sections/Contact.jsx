import { useState } from "react";
import AnimatedSection from "../components/ui/AnimatedSection";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";

const socials = [
  { label: "GitHub", handle: "@shivam", href: "https://github.com/shivam0028", color: "#00fff0" },
  { label: "LinkedIn", handle: "in/shivam", href: "https://linkedin.com/in/shivam-kumar-18242a288/", color: "#ff2d6b" },
  { label: "Email", handle: "shivamk211471@gmail.com", href: "https://mail.google.com/mail/?view=cm&to=shivamk211471@gmail.com", color: "#7b2fff" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3000);
  };

  return (
    <section id="contact" className="py-32 px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionTitle label="04. contact" title="LET'S" accent="TALK" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left */}
          <AnimatedSection animation="reveal-left">
            <div>
              <p className="text-gray-400 text-xl leading-relaxed mb-10">
                I'm currently{" "}
                <span className="text-[#00fff0] font-semibold neon">open to new opportunities</span>.
                Whether you have a project, a question, or just want to say hi — let's connect.
              </p>

              {/* Social links */}
              <div className="space-y-4 mb-12">
                {socials.map((s, i) => (
                  <AnimatedSection key={s.label} delay={i * 100}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 group p-4 border border-white/5 bg-[#0d0d14] hover:border-white/15 transition-all duration-400 hover:-translate-y-1"
                      data-hover
                      style={{
                        "--hover-color": s.color,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${s.color}40`;
                        e.currentTarget.style.boxShadow = `0 10px 30px ${s.color}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center font-mono text-xs font-bold shrink-0"
                        style={{ background: `${s.color}15`, color: s.color }}
                      >
                        {s.label[0]}
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">
                          {s.label}
                        </div>
                        <div className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm font-mono">
                          {s.handle}
                        </div>
                      </div>
                      <span
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-lg"
                        style={{ color: s.color }}
                      >
                        →
                      </span>
                    </a>
                  </AnimatedSection>
                ))}
              </div>

              {/* Big quote */}
              <div className="border-l-2 border-[#00fff0]/40 pl-5">
                <p className="font-mono text-gray-600 text-xs tracking-widest leading-7 italic">
                  "Code is like humor. When you have to explain it,<br />it's bad."
                  <span className="block mt-1 text-[#00fff0]/40 not-italic">— Cory House</span>
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection animation="reveal-right">
            <form
              onSubmit={onSubmit}
              className="border border-[#00fff0]/10 bg-[#0d0d14] p-8 relative overflow-hidden"
            >
              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#00fff0]/30" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#ff2d6b]/30" />

              <p className="font-mono text-[10px] text-[#00fff0] tracking-[0.4em] uppercase mb-8 flex items-center gap-2">
                <span className="w-4 h-px bg-[#00fff0]" />
                Send a message
              </p>

              <div className="space-y-5">
                {[
                  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <label
                      className={`font-mono text-[10px] tracking-widest uppercase block mb-2 transition-colors duration-300 ${
                        focused === field.name ? "text-[#00fff0]" : "text-gray-600"
                      }`}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={onChange}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-transparent border-b border-white/10 py-3 text-gray-300 font-mono text-sm placeholder-gray-700 focus:outline-none focus:border-[#00fff0]/60 transition-colors duration-300"
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#00fff0] transition-all duration-500 ${
                        focused === field.name ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                ))}

                <div className="relative">
                  <label
                    className={`font-mono text-[10px] tracking-widest uppercase block mb-2 transition-colors duration-300 ${
                      focused === "message" ? "text-[#00fff0]" : "text-gray-600"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="What's on your mind?"
                    rows={5}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 text-gray-300 font-mono text-sm placeholder-gray-700 focus:outline-none focus:border-[#00fff0]/60 transition-colors duration-300 resize-none"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#00fff0] transition-all duration-500 ${
                      focused === "message" ? "w-full" : "w-0"
                    }`}
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full justify-center">
                    {sent
                      ? "✓ MESSAGE SENT!"
                      : "SEND MESSAGE →"}
                  </Button>
                </div>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}