import React from 'react'
const skills=["Python","Java","JavaScript","MongoDB","Django","React","Node.js","HTML","CSS","Figma","Express.js","Git","Tailwind CSS","SQL","AWS","Docker","CI/CD"]
const mid=Math.ceil(skills.length/2)
const row1=skills.slice(0,mid)
const row2=skills.slice(mid)
export default function Skills(){
  return (
    <section id="skills" className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <p className="tracking-[0.3em] text-xs md:text-sm text-gray-500">TECHNICAL PROFICIENCIES</p>
        <h2 className="text-5xl md:text-6xl font-extrabold mt-3 mb-3">Skills<span style={{color:"#D4AF37"}}>.</span></h2>
      </div>
      <div className="space-y-8">
        <div className="skills-marquee">
          <div className="skills-track skills-track-left">
            {[...row1,...row1].map((skill,idx)=>(
              <div key={`row1-${skill}-${idx}`} className="relative w-24 h-28 md:w-28 md:h-32 mx-3 md:mx-5">
                <div className="w-full h-full flex items-center justify-center border border-[#2b2b2b] shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_18px_60px_rgba(212,175,55,0.7)] transition-transform duration-300 hover:-translate-y-2" style={{clipPath:"polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%)",background:"radial-gradient(circle at 30% 15%, rgba(212,175,55,0.4), #050505 55%)"}}>
                  <span className="text-xs md:text-sm font-semibold text-gray-100 px-2 text-center">{skill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="skills-marquee">
          <div className="skills-track skills-track-right">
            {[...row2,...row2].map((skill,idx)=>(
              <div key={`row2-${skill}-${idx}`} className="relative w-24 h-28 md:w-28 md:h-32 mx-3 md:mx-5">
                <div className="w-full h-full flex items-center justify-center border border-[#2b2b2b] shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_18px_60px_rgba(212,175,55,0.7)] transition-transform duration-300 hover:-translate-y-2" style={{clipPath:"polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%)",background:"radial-gradient(circle at 30% 15%, rgba(212,175,55,0.4), #050505 55%)"}}>
                  <span className="text-xs md:text-sm font-semibold text-gray-100 px-2 text-center">{skill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
