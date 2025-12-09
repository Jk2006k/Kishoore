import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Hobby from '../components/Hobby';
import Particles from '../components/Particles';
import Freelance from '../components/Freelance';

export default function Home() {

  const OWNER_WHATSAPP = "919025513821";
  const prefilledMessage = "Hello!";
  const waLink = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(prefilledMessage)}`;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    let timeoutId = null;

    const onLoad = () => {
      setTimeout(() => setLoading(false), 300);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 6000);
    }

    return () => {
      window.removeEventListener('load', onLoad);
      if (timeoutId) clearTimeout(timeoutId);
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)" }}>
      {loading && (
        <div
          aria-hidden={loading ? "false" : "true"}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 transition-opacity duration-500"
        >
          <div className="flex flex-col items-center gap-6 px-6">
            <img src="/logo.png" alt="Logo" className="h-20 w-20 object-contain opacity-95" />
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 animate-spin text-yellow-400" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(212,175,55,0.15)" strokeWidth="4" />
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <p className="text-gray-300 text-lg font-medium">Loading — please wait</p>
            </div>
            <p className="text-gray-400 text-sm text-center max-w-xs">Preparing the experience. This may take a moment on first load.</p>
          </div>
        </div>
      )}

      <Header />
      <main className="max-w-7xl mx-auto px-10 py-20 relative">
        <Particles />
        <Hero />
      </main>

      <div className="fixed right-14 top-1/3 h-40 w-0.5 z-20" style={{ backgroundColor: "#D4AF37" }} />
      <div className="fixed right-10 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-20">
        <a href="https://www.linkedin.com/in/kishoore-j-9081b5349/" className="text-gray-400 hover:text-[#D4AF37] transition text-2xl" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
        <a href="https://www.instagram.com/kishoore_jk?igsh=aXF0ZG1paXR6bGRz" className="text-gray-400 hover:text-[#D4AF37] transition text-2xl" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        <a href="https://github.com/Jk2006k" className="text-gray-400 hover:text-[#D4AF37] transition text-2xl" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>

        <a
          href={waLink}
          className="text-gray-400 hover:text-[#D4AF37] transition text-2xl"
          aria-label="WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      <section className="relative min-h-screen overflow-hidden mt-10" style={{ background: "#000" }}>
        <div className="absolute inset-0 overflow-hidden">
        </div>
        <div className="relative max-w-6xl mx-auto px-10 py-24">
          <About />
          <Skills />
          <div className="w-full flex justify-center mt-16 mb-10 relative z-10">
            <a href="/resume.pdf" download className="group relative px-12 py-5 text-lg font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)', color: '#000', boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3)' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 15px 50px rgba(212, 175, 55, 0.5)' }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 10px 40px rgba(212, 175, 55, 0.3)' }}>
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Download Resume
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)' }} />
            </a>
          </div>
          <Projects />
          <Hobby />
          <Freelance />
        </div>
      </section>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style>{`@keyframes float {0%,100%{transform:translateY(0px) translateX(0px);}25%{transform:translateY(-20px) translateX(10px);}50%{transform:translateY(-10px) translateX(-10px);}75%{transform:translateY(-30px) translateX(5px);}}@keyframes pulse {0%,100%{transform:scale(1) translateY(0);opacity:0.2;}50%{transform:scale(1.2) translateY(-20px);opacity:0.3;}}@keyframes gridMove {0%{transform:translateY(0);}100%{transform:translateY(100px);}}.skills-marquee{position:relative;width:100%;overflow:hidden}.skills-track{display:inline-flex;align-items:center;white-space:nowrap}.skills-track-left{animation:marqueeLeft 20s linear infinite}.skills-track-right{animation:marqueeRight 22s linear infinite}@keyframes marqueeLeft{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}@keyframes marqueeRight{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}.scrollbar-thin{scrollbar-width:thin}.scrollbar-thumb-white\\/20::-webkit-scrollbar{height:8px}.scrollbar-thumb-white\\/20::-webkit-scrollbar-track{background:transparent}.scrollbar-thumb-white\\/20::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:999px}.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}@media (max-width:767px){.grid-cols-1.md\\\\:grid-cols-\\\\[1fr_1.4fr\\\\]{grid-template-columns:1fr}}`}</style>
    </div>
  );
}
