import React, { useRef, useEffect, useState } from 'react'

export default function Hobby() {
  const hobbyVideoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = hobbyVideoRef.current
    if (!video) return

    // ensure video starts muted so autoplay works
    video.muted = isMuted

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    // try to autoplay (muted) and use IntersectionObserver to play/pause in view
    const tryPlay = () => {
      const p = video.play()
      if (p && p.catch) p.catch(() => {})
    }
    tryPlay()

    let observer
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tryPlay()
            } else {
              video.pause()
            }
          })
        },
        { threshold: 0.5 }
      )
      observer.observe(video)
    } catch (e) {
      // ignore observer errors
    }

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      if (observer && video) observer.unobserve(video)
    }
  }, [isMuted])

  const toggleMute = async (e) => {
    // prevent anchor navigation when clicking the mute/unmute button
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation()

    const video = hobbyVideoRef.current
    if (!video) return
    const newMuted = !isMuted
    setIsMuted(newMuted)
    video.muted = newMuted
    // when unmuting, try to play in case it was paused
    if (!newMuted) {
      try {
        await video.play()
      } catch (err) {
        // ignore play errors
      }
    }
  }

  const handleVideoClick = async () => {
    const video = hobbyVideoRef.current
    if (!video) return
    if (video.paused) {
      try {
        await video.play()
      } catch {}
    } else {
      video.pause()
    }
  }

  return (
    <section id="hobby" className="mt-12 relative z-10 max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="tracking-[0.3em] text-xs font-medium text-yellow-500/80 uppercase">PERSONAL</p>
          <h3 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Hobby — Listening to songs
          </h3>
        </div>
      </div>

      <div className="group rounded-3xl overflow-hidden border border-yellow-900/30 bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 hover:shadow-yellow-500/20 hover:border-yellow-700/50">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-0 items-stretch">
          <div className="flex flex-col">
            <a href="https://almostus.vercel.app" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden flex-shrink-0">
              <div style={{ aspectRatio: '1 / 1', width: '100%' }} className="overflow-hidden relative">
                <video
                  ref={hobbyVideoRef}
                  className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                  src="/head.mp4"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Headset video — click to play or pause"
                  onClick={handleVideoClick}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <button
                  onClick={toggleMute}
                  aria-pressed={!isMuted}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="absolute right-3 top-3 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-xl transition-opacity hover:opacity-100 opacity-90 border border-yellow-700/40"
                  type="button"
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
              </div>
            </a>

            <div className="hidden md:flex flex-col justify-center flex-1 p-6 bg-gradient-to-br from-yellow-950/20 to-black/40 border-t border-yellow-900/20">
              <div className="space-y-4">
                <div className="flex items-center gap-3 group/stat">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 group-hover/stat:bg-yellow-500/20 transition-colors">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-300">1,247</p>
                    <p className="text-xs text-gray-400">Songs Played</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group/stat">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 group-hover/stat:bg-yellow-500/20 transition-colors">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-300">340</p>
                    <p className="text-xs text-gray-400">Hours Listening</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group/stat">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 group-hover/stat:bg-yellow-500/20 transition-colors">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-300">42</p>
                    <p className="text-xs text-gray-400">Playlists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 md:p-8 bg-gradient-to-br from-zinc-900/50 to-black/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32" />
            <div className="relative z-10 w-full">
              <img src="/headimg.jpeg" alt="listening to music" className="hidden md:block w-full h-full max-h-[560px] object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105 border border-yellow-900/20" />
            </div>
          </div>
        </div>

        <div className="px-6 py-6 border-t border-yellow-900/20 bg-gradient-to-r from-zinc-900 to-black">
          <div className="flex items-center justify-center gap-3 max-w-3xl mx-auto">
            <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
            <p className="text-gray-300 text-center leading-relaxed">
              I enjoy listening to songs — it's how I unwind and find inspiration. <span className="text-yellow-400 font-medium ml-1 inline-flex items-center gap-1 group-hover:text-yellow-300 transition-colors">Click the player to open the music site<svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
