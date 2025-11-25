import { useState, useEffect, useRef } from 'react';

export default function Portfolio() {
  const [bubbles, setBubbles] = useState([]);
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  // Hero bubbles
  useEffect(() => {
    const initialBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 400 + 300,
      y: Math.random() * 600 + 100,
      size: Math.random() * 100 + 50,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setBubbles(initialBubbles);
  }, []);

  useEffect(() => {
    const animateBubbles = () => {
      setBubbles(prevBubbles =>
        prevBubbles.map(bubble => {
          let newX = bubble.x + bubble.vx;
          let newY = bubble.y + bubble.vy;
          let newVx = bubble.vx;
          let newVy = bubble.vy;

          if (newX <= 250 || newX >= 850) {
            newVx = -newVx;
            newX = Math.max(250, Math.min(850, newX));
          }
          if (newY <= 50 || newY >= 700) {
            newVy = -newVy;
            newY = Math.max(50, Math.min(700, newY));
          }

          return { ...bubble, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    };

    const interval = setInterval(animateBubbles, 30);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setBubbles(prevBubbles =>
      prevBubbles.map(bubble => {
        const dx = mouseX - bubble.x;
        const dy = mouseY - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          return {
            ...bubble,
            vx: bubble.vx - (dx / distance) * force * 2,
            vy: bubble.vy - (dy / distance) * force * 2,
          };
        }
        return bubble;
      })
    );
  };

  // Particles for About + Skills background
  useEffect(() => {
    const generatedParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 10 + 10,
    }));
    setParticles(generatedParticles);
  }, []);

  const skills = [
    "Python",
    "Java",
    "JavaScript",
    "MongoDB",
    "Django",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "Figma",
    "Express.js",
    "Git",
    "Tailwind CSS",
     "SQL",
    "AWS",
    "Docker",
    "CI/CD",
  ];

  const mid = Math.ceil(skills.length / 2);
  const row1Skills = skills.slice(0, mid);
  const row2Skills = skills.slice(mid);

  return (
    <div
      className="min-h-screen text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)",
      }}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Header */}
      <header className="py-8 px-10 relative z-20">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="JK"
              className="h-16 w-16 object-contain opacity-90"
            />
          </div>

          {/* Navigation Links */}
          <ul className="flex gap-10">
            <li>
              <a
                href="#about"
                className="text-gray-400 hover:text-[#D4AF37] transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="text-gray-400 hover:text-[#D4AF37] transition"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#D4AF37] transition"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Search Bar - hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              className="bg-white bg-opacity-10 px-4 py-2 rounded-full text-white placeholder-gray-400 outline-none w-48"
            />
            <i className="fas fa-search text-gray-400 cursor-pointer"></i>
          </div>
        </nav>
      </header>

      {/* Hero Section with Bubbles */}
      <main className="max-w-7xl mx-auto px-10 py-20 relative">
        {/* Bubbles Container */}
        <div className="absolute inset-0 pointer-events-none">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="absolute rounded-full transition-all duration-100"
              style={{
                left: `${bubble.x}px`,
                top: `${bubble.y}px`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                background:
                  "radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.4), rgba(212, 175, 55, 0.1))",
                boxShadow: "0 8px 32px 0 rgba(212, 175, 55, 0.2)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[70vh] relative z-10">
          {/* Left Content */}
          <div>
            <h2 className="text-lg text-gray-400 mb-2">I'M</h2>
            <h1
              className="text-7xl font-bold mb-6"
              style={{ color: "#D4AF37" }}
            >
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

          {/* Right Image */}
          <div className="flex justify-center items-center">
            <img
              src="/bg.png"
              alt="JK"
              className="max-w-md w-full opacity-90 relative -z-10"
            />
          </div>
        </div>
      </main>

      {/* Vertical Line */}
      <div
        className="fixed right-14 top-1/3 h-40 w-0.5 z-20"
        style={{ backgroundColor: "#D4AF37" }}
      ></div>

      {/* Social Links */}
      <div className="fixed right-10 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-20">
        <a
          href="https://www.linkedin.com/in/kishoore-j-9081b5349/"
          className="text-gray-400 hover:text-[#D4AF37] transition text-2xl"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-[#D4AF37] transition text-2xl"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://github.com/Jk2006k"
          className="text-gray-400 hover:text-[#D4AF37] transition text-2xl"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-[#D4AF37] transition text-2xl"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      {/* About + Skills + Resume with animated background */}
      <section
        className="relative min-h-screen overflow-hidden mt-10"
        style={{ background: "#000" }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full opacity-20"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: `radial-gradient(circle, #D4AF37, transparent)`,
                animation: `float ${p.speed}s infinite ease-in-out`,
                boxShadow: `0 0 ${p.size * 2}px rgba(212, 175, 55, 0.3)`,
              }}
            />
          ))}

          {/* Animated gradient orbs */}
          <div
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, #D4AF37, transparent)",
              top: "10%",
              left: "10%",
              animation: "pulse 8s infinite ease-in-out",
            }}
          />
          <div
            className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{
              background: "radial-gradient(circle, #FFD700, transparent)",
              bottom: "20%",
              right: "15%",
              animation: "pulse 10s infinite ease-in-out 2s",
            }}
          />
          <div
            className="absolute w-72 h-72 rounded-full opacity-10 blur-3xl"
            style={{
              background: "radial-gradient(circle, #D4AF37, transparent)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "pulse 12s infinite ease-in-out 4s",
            }}
          />

          {/* Animated grid lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
              animation: "gridMove 20s linear infinite",
            }}
          />
        </div>

        {/* Foreground content */}
        <div className="relative max-w-6xl mx-auto px-10 py-24">
          {/* About Section */}
          <section id="about" className="max-w-4xl mx-auto text-center mb-24">
            <h2
              className="text-5xl font-bold mb-6"
              style={{ color: "#D4AF37" }}
            >
              Who am I ?
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              I'm <span className="text-[#D4AF37] font-semibold">Kishoore J</span>, a
              <span className="text-white"> Software Product Developer</span> who loves
              turning ideas into real, working products. I focus on building smooth,
              scalable and user-friendly applications that solve practical problems.
              <br />
              <br />
              I'm deeply passionate about learning, experimenting with new technologies
              and improving my craft every day. Whether it's backend logic, frontend
              interfaces or complete product workflows, I enjoy every part of the
              creation process.
              <br />
              <br />
              Outside of development, I constantly refine my problem-solving mindset
              through competitive programming and hands-on projects. My goal is simple —
              to build meaningful digital experiences that truly make an impact.
            </p>
          </section>

          {/* Skills Section */}
          <section id="skills" className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <p className="tracking-[0.3em] text-xs md:text-sm text-gray-500">
                TECHNICAL PROFICIENCIES
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold mt-3 mb-3">
                Skills<span style={{ color: "#D4AF37" }}>.</span>
              </h2>
            </div>

            {/* Two infinite marquee rows */}
            <div className="space-y-8">
              {/* Row 1: seamless left → right (visually) */}
              <div className="skills-marquee">
                <div className="skills-track skills-track-left">
                  {[...row1Skills, ...row1Skills].map((skill, idx) => (
                    <div
                      key={`row1-${skill}-${idx}`}
                      className="relative w-24 h-28 md:w-28 md:h-32 mx-3 md:mx-5"
                    >
                      <div
                        className="w-full h-full flex items-center justify-center border border-[#2b2b2b] shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_18px_60px_rgba(212,175,55,0.7)] transition-transform duration-300 hover:-translate-y-2"
                        style={{
                          clipPath:
                            "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%)",
                          background:
                            "radial-gradient(circle at 30% 15%, rgba(212,175,55,0.4), #050505 55%)",
                        }}
                      >
                        <span className="text-xs md:text-sm font-semibold text-gray-100 px-2 text-center">
                          {skill}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: seamless right → left */}
              <div className="skills-marquee">
                <div className="skills-track skills-track-right">
                  {[...row2Skills, ...row2Skills].map((skill, idx) => (
                    <div
                      key={`row2-${skill}-${idx}`}
                      className="relative w-24 h-28 md:w-28 md:h-32 mx-3 md:mx-5"
                    >
                      <div
                        className="w-full h-full flex items-center justify-center border border-[#2b2b2b] shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_18px_60px_rgba(212,175,55,0.7)] transition-transform duration-300 hover:-translate-y-2"
                        style={{
                          clipPath:
                            "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%)",
                          background:
                            "radial-gradient(circle at 30% 15%, rgba(212,175,55,0.4), #050505 55%)",
                        }}
                      >
                        <span className="text-xs md:text-sm font-semibold text-gray-100 px-2 text-center">
                          {skill}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Resume Download Button */}
          <div className="w-full flex justify-center mt-16 mb-10 relative z-10">
            <a
              href="/resume.pdf"
              download
              className="group relative px-12 py-5 text-lg font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                color: '#000',
                boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(212, 175, 55, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(212, 175, 55, 0.3)';
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" 
                  />
                </svg>
                Download Resume
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
                }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Animation Styles – only for this page */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1) translateY(0);
            opacity: 0.2;
          }
          50% { 
            transform: scale(1.2) translateY(-20px);
            opacity: 0.3;
          }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }

        .skills-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .skills-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        .skills-track-left {
          animation: marqueeLeft 20s linear infinite;
        }

        .skills-track-right {
          animation: marqueeRight 22s linear infinite;
        }

        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
