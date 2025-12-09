import React, { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [bubbles, setBubbles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const initial = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 400 + 300,
      y: Math.random() * 600 + 100,
      size: Math.random() * 100 + 50,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    setBubbles(initial);
  }, []);

  useEffect(() => {
    const animate = () => {
      setBubbles((prev) =>
        prev.map((b) => {
          let newX = b.x + b.vx;
          let newY = b.y + b.vy;
          let newVx = b.vx;
          let newVy = b.vy;

          if (newX <= 250 || newX >= 850) {
            newVx = -newVx;
            newX = Math.max(250, Math.min(850, newX));
          }

          if (newY <= 50 || newY >= 700) {
            newVy = -newVy;
            newY = Math.max(50, Math.min(700, newY));
          }

          return {
            ...b,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );
    };

    const interval = setInterval(animate, 30);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setBubbles((prev) =>
      prev.map((b) => {
        const dx = mouseX - b.x;
        const dy = mouseY - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;

          return {
            ...b,
            vx: b.vx - (dx / distance) * force * 2,
            vy: b.vy - (dy / distance) * force * 2,
          };
        }

        return b;
      })
    );
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full transition-all duration-100"
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              background:
                "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.4), rgba(212,175,55,0.1))",
              boxShadow: "0 8px 32px rgba(212,175,55,0.2)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[70vh] relative z-10">
        <div>
          <h2 className="text-lg text-gray-400 mb-2">I'M</h2>
          <h1 className="text-7xl font-bold mb-6" style={{ color: "#D4AF37" }}>
            Kishoore J
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Software Product Developer with a passion <br />
            for Competitive Programming
          </p>
          <a
            href="#about"
            className="inline-block px-8 py-3 border-2 transition"
            style={{
              borderColor: "#D4AF37",
              color: "#D4AF37",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#D4AF37";
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#D4AF37";
            }}
          >
            Who am I ?
          </a>
        </div>

        <div className="flex justify-center items-center">
          <img
            src="/bg.png"
            alt="Hero"
            className="max-w-md w-full opacity-90 relative -z-10"
          />
        </div>
      </div>
    </div>
  );
}
