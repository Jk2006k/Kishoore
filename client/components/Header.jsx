import React from 'react'
export default function Header(){
  return (
    <header className="py-8 px-10 relative z-20">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain opacity-90" />
        </div>
        <ul className="hidden md:flex gap-10">
          <li><a href="#about" className="text-gray-400 hover:text-[#D4AF37] transition">About</a></li>
          <li><a href="#skills" className="text-gray-400 hover:text-[#D4AF37] transition">Skills</a></li>
          <li><a href="#projects" className="text-gray-400 hover:text-[#D4AF37] transition">Projects</a></li>
          <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition">Contact</a></li>
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <input type="text" placeholder="Search" className="bg-white bg-opacity-10 px-4 py-2 rounded-full text-white placeholder-gray-400 outline-none w-48" />
          <i className="fas fa-search text-gray-400 cursor-pointer"></i>
        </div>
      </nav>
    </header>
  )
}
