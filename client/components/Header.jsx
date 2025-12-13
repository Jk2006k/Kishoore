import React from 'react'

export default function Header() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="py-0 px-0 relative z-0">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
        <div className="hidden sm:flex items-center justify-center">
          <div className="hidden sm:flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="h-20 w-20 object-contain opacity-95" />
        </div>
        </div>
        </div>
        <ul className="hidden md:flex gap-10">
          <li>
            <button onClick={() => scrollToSection("about")} className="text-gray-400 hover:text-[#D4AF37] transition">
              About
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("skills")} className="text-gray-400 hover:text-[#D4AF37] transition">
              Skills
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("hobby")} className="text-gray-400 hover:text-[#D4AF37] transition">
              Hobby
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("freelance")} className="text-gray-400 hover:text-[#D4AF37] transition">
              Freelance
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
