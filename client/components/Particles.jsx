import React, {useEffect,useState} from 'react'
export default function Particles(){
  const [particles,setParticles]=useState([])
  useEffect(()=>{const generated=Array.from({length:40},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*8+4,speed:Math.random()*10+10}));setParticles(generated)},[])
  return (
    <>
      {particles.map(p=>(
        <div key={p.id} className="absolute rounded-full opacity-20" style={{left:`${p.x}%`,top:`${p.y}%`,width:`${p.size}px`,height:`${p.size}px`,background:'radial-gradient(circle, #D4AF37, transparent)',animation:`float ${p.speed}s infinite ease-in-out`,boxShadow:`0 0 ${p.size*2}px rgba(212, 175, 55, 0.3)`}} />
      ))}
      <div className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl" style={{background:"radial-gradient(circle, #D4AF37, transparent)",top:"10%",left:"10%",animation:"pulse 8s infinite ease-in-out"}} />
      <div className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl" style={{background:"radial-gradient(circle, #FFD700, transparent)",bottom:"20%",right:"15%",animation:"pulse 10s infinite ease-in-out 2s"}} />
      <div className="absolute w-72 h-72 rounded-full opacity-10 blur-3xl" style={{background:"radial-gradient(circle, #D4AF37, transparent)",top:"50%",left:"50%",transform:"translate(-50%, -50%)",animation:"pulse 12s infinite ease-in-out 4s"}} />
      <div className="absolute inset-0" style={{backgroundImage:`linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)`,backgroundSize:"100px 100px",animation:"gridMove 20s linear infinite"}} />
    </>
  )
}
