import { useEffect, useRef } from "react";

export default function AnimatedSection({
  children,
  className = "",
  animation = "reveal", // reveal | reveal-left | reveal-right
  delay = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add(animation);
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}