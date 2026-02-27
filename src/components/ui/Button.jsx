import { useRef } from "react";

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
}) {
  const btnRef = useRef(null);

  const onMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const onMouseLeave = () => {
    if (btnRef.current)
      btnRef.current.style.transform = "translate(0,0)";
  };

  const base =
    "relative inline-flex items-center gap-2 px-7 py-3.5 font-mono text-xs tracking-[0.2em] uppercase font-bold overflow-hidden transition-all duration-300";

  const variants = {
    primary: `
      bg-[#00fff0] text-[#060608]
      before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-110%] before:skew-x-[-20deg] before:transition-transform before:duration-500
      hover:before:translate-x-[110%]
      hover:shadow-[0_0_30px_rgba(0,255,240,0.5)]
      active:scale-95
    `,
    outline: `
      border border-[#00fff0]/40 text-[#00fff0]
      before:absolute before:inset-0 before:bg-[#00fff0]/5 before:translate-x-[-110%] before:skew-x-[-20deg] before:transition-transform before:duration-500
      hover:before:translate-x-[110%]
      hover:border-[#00fff0] hover:shadow-[0_0_20px_rgba(0,255,240,0.25)]
      active:scale-95
    `,
    danger: `
      border border-[#ff2d6b]/40 text-[#ff2d6b]
      hover:border-[#ff2d6b] hover:shadow-[0_0_20px_rgba(255,45,107,0.3)] hover:bg-[#ff2d6b]/5
      active:scale-95
    `,
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        data-hover
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={cls}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-hover
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}