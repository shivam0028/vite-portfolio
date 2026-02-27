import { useEffect, useRef } from "react";

const organisms = [
  { id: 1, size: 420, x: 80, y: 10,  color: "#00fff0", speed: 0.08, driftX: 0.012,  driftY: 0.008,  opacity: 0.07, morphDuration: "12s" },
  { id: 2, size: 320, x: 5,  y: 50,  color: "#ff2d6b", speed: 0.05, driftX: -0.009, driftY: 0.011,  opacity: 0.06, morphDuration: "16s" },
  { id: 3, size: 260, x: 50, y: 75,  color: "#7b2fff", speed: 0.12, driftX: 0.007,  driftY: -0.013, opacity: 0.07, morphDuration: "10s" },
  { id: 4, size: 200, x: 70, y: 55,  color: "#00fff0", speed: 0.06, driftX: -0.011, driftY: 0.007,  opacity: 0.05, morphDuration: "20s" },
  { id: 5, size: 150, x: 20, y: 20,  color: "#ff2d6b", speed: 0.15, driftX: 0.015,  driftY: 0.009,  opacity: 0.05, morphDuration: "8s"  },
  { id: 6, size: 180, x: 40, y: 40,  color: "#7b2fff", speed: 0.04, driftX: -0.006, driftY: -0.008, opacity: 0.04, morphDuration: "14s" },
];

export default function BackgroundGrid() {
  const canvasRef   = useRef(null);
  const blobRefs    = useRef([]);
  const scrollY     = useRef(0);
  const targetScroll = useRef(0);
  const driftTime   = useRef(0);
  const rafBlobs    = useRef(null);

  /* ── smooth scroll + drift animation ── */
  useEffect(() => {
    const onScroll = () => { targetScroll.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      driftTime.current += dt;

      // lerp scroll
      scrollY.current += (targetScroll.current - scrollY.current) * 0.06;

      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = organisms[i];
        const parallaxY = scrollY.current * o.speed;
        const driftX    = Math.sin(driftTime.current * o.driftX * 60) * 30;
        const driftY    = Math.cos(driftTime.current * o.driftY * 60) * 25;
        el.style.transform = `translate(${driftX}px, ${-parallaxY + driftY}px)`;
      });

      rafBlobs.current = requestAnimationFrame(tick);
    };
    rafBlobs.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafBlobs.current);
    };
  }, []);

  /* ── particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.4 + 0.08,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,240,${0.06*(1-d/120)})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,240,${p.a})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

      {/* particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-50" />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,240,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,240,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* morphing organisms */}
      {organisms.map((org, i) => (
        <div
          key={org.id}
          ref={(el) => (blobRefs.current[i] = el)}
          className="absolute will-change-transform"
          style={{
            left: `${org.x}%`,
            top:  `${org.y}%`,
            width:  org.size,
            height: org.size,
            marginLeft: -org.size / 2,
            marginTop:  -org.size / 2,
          }}
        >
          {/* outer glow */}
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${org.color}${toHex(org.opacity)}, transparent 70%)`,
              animation: `blob-morph-${org.id} ${org.morphDuration} ease-in-out infinite`,
            }}
          />
          {/* inner core */}
          <div
            className="absolute inset-[20%] rounded-full blur-2xl"
            style={{
              background: `radial-gradient(circle, ${org.color}${toHex(Math.min(org.opacity * 2, 1))}, transparent 65%)`,
              animation: `blob-morph-${org.id} ${org.morphDuration} ease-in-out infinite reverse`,
            }}
          />
        </div>
      ))}

      {/* morph keyframes */}
      <style>{`
        @keyframes blob-morph-1 {
          0%,100%{ border-radius:60% 40% 70% 30%/50% 60% 40% 70%; }
          25%    { border-radius:40% 60% 30% 70%/70% 40% 60% 30%; }
          50%    { border-radius:70% 30% 50% 50%/30% 70% 50% 50%; }
          75%    { border-radius:30% 70% 60% 40%/60% 30% 70% 40%; }
        }
        @keyframes blob-morph-2 {
          0%,100%{ border-radius:50% 50% 30% 70%/60% 40% 60% 40%; }
          33%    { border-radius:70% 30% 60% 40%/40% 70% 30% 60%; }
          66%    { border-radius:30% 70% 40% 60%/70% 30% 60% 40%; }
        }
        @keyframes blob-morph-3 {
          0%,100%{ border-radius:40% 60% 50% 50%/50% 40% 60% 50%; }
          50%    { border-radius:60% 40% 70% 30%/30% 60% 40% 70%; }
        }
        @keyframes blob-morph-4 {
          0%,100%{ border-radius:55% 45% 60% 40%/45% 55% 40% 60%; }
          40%    { border-radius:35% 65% 40% 60%/65% 35% 60% 40%; }
          80%    { border-radius:65% 35% 55% 45%/35% 65% 45% 55%; }
        }
        @keyframes blob-morph-5 {
          0%,100%{ border-radius:70% 30% 40% 60%/40% 70% 60% 30%; }
          50%    { border-radius:30% 70% 60% 40%/60% 30% 40% 70%; }
        }
        @keyframes blob-morph-6 {
          0%,100%{ border-radius:45% 55% 65% 35%/55% 45% 35% 65%; }
          33%    { border-radius:65% 35% 45% 55%/35% 65% 55% 45%; }
          66%    { border-radius:35% 65% 55% 45%/65% 35% 45% 55%; }
        }
      `}</style>
    </div>
  );
}