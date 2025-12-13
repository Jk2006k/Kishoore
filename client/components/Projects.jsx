import React, { useState, useEffect, useRef } from 'react'

const projects = [
  {id:1,title:'VoteAura',desc:'A secure online e-ballot application with UD-ID verification and admin approval flow.',imageSrc:'./voteaura.jpg',href:'https://voteaura.onrender.com'},
  {id:2,title:'HP',desc:'Not quite love. Not just friends. But the music knows.',imageSrc:'./hp.png',href:'https://github.com/Jk2006k/hearpoint'},
  {id:3,title:'Note Your Day',desc:'"Capture your day, cherish your moments — write, save, and relive your memories."',imageSrc:'./Note.jpg',href:'https://note-your-day-hkp.vercel.app/'},
  {id:4,title:'Karangal',desc:'Booknearby professionals in minutes , Fast service. Trusted Hands',imageSrc:'./karangal.png',href:'https://karangal.online'},
  {id:5,title:'RTR',desc:'Transform your web React applications into native mobile apps in seconds',imageSrc:'./rtr.png',href:'https://rtr-puce.vercel.app/'},
  {id:6,title:'Zenth',desc:'Upload PDFs and auto-generate potential questions using OCR + AI (prototype).',imageSrc:'./zenth.png',href:'https://zenth-iota.vercel.app'},
  {id:7,title:'Task Management System',desc:'An app that lets users create projects, track time spent, and analyze productivity efficiently.',imageSrc:'./tsm.png',href:'https://task-management-system-one-roan.vercel.app'}
]

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const per = window.innerWidth >= 768 ? 3 : 1

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + per) % projects.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [per])

  const change = dir => {
    if (dir === 'next') {
      setCurrent(prev => (prev + per) % projects.length)
    } else {
      setCurrent(prev => (prev - per + projects.length) % projects.length)
    }
  }

  const visible = () => {
    const out = []
    for (let i = 0; i < per; i++) {
      out.push(projects[(current + i) % projects.length])
    }
    return out
  }

  const onTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchMove = e => {
    touchEndX.current = e.touches[0].clientX
  }

  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      diff > 0 ? change('next') : change('prev')
    }
  }

  return (
    <section id="projects" className="mt-6 relative z-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="tracking-[0.3em] text-xs text-gray-500">WORK</p>
          <h3 className="text-3xl font-bold mt-2">Selected Projects</h3>
        </div>
      </div>

      <div
        className="relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button onClick={() => change('prev')} className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 transition">
          <i className="fas fa-chevron-left"></i>
        </button>

        <button onClick={() => change('next')} className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 transition">
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible().map((project, idx) => (
            <a key={`${project.id}-${idx}`} href={project.href} className="block bg-[#070707] rounded-2xl border border-[#2b2b2b] overflow-hidden shadow-lg transition transform hover:-translate-y-1">
              <div className="w-full h-48 md:h-44 overflow-hidden">
                <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h4 className="text-xl md:text-lg font-semibold mb-2">{project.title}</h4>
                <p className="text-sm text-gray-300 line-clamp-2 mb-3">{project.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">React • Node</span>
                  <span className="text-xs text-[#D4AF37]">View Project →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
