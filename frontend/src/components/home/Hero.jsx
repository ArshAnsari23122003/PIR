import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const HERO_SLIDES = [
  {
    id: 1,
    title: "Paper Printing",
    tagline: "Your design, our junoon — offset & digital precision.",
    cta: "Get a Quote",
    video: "https://assets.mixkit.co/videos/preview/mixkit-printing-machine-printing-a-publication-41315-large.mp4",
    poster: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    title: "Rigid Box Making",
    tagline: "Bespoke luxury packaging crafted for premium brands.",
    cta: "Explore Packaging",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-working-with-paper-41312-large.mp4",
    poster: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    title: "Brand Brochures",
    tagline: "Custom folding, foil embossing & corporate collateral.",
    cta: "Order Brochures",
    video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-printing-press-in-operation-41313-large.mp4",
    poster: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1920&q=80",
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[650px] bg-black overflow-hidden flex items-center justify-start">
      {/* Background Video Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={HERO_SLIDES[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={HERO_SLIDES[currentSlide].poster}
            className="w-full h-full object-cover object-center brightness-[0.4]"
          >
            <source src={HERO_SLIDES[currentSlide].video} type="video/mp4" />
          </video>
        </motion.div>
      </AnimatePresence>

      {/* Full Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent w-full h-full pointer-events-none z-10" />

      {/* Left-Aligned Container */}
      <div className="relative z-20 px-6 sm:px-12 md:px-20 text-left text-white flex flex-col items-start justify-center max-w-3xl gap-4">
        {/* PERMANENT SEO HEADLINE */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-sans">
          Your Design.<span className="text-[#D4020B]"> Our Junoon.</span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-neutral-200">
          Printed in red-hot time.
        </h2>

        {/* PERMANENT SEO SUPPORTING COPY */}
        <p className="text-sm sm:text-base md:text-lg font-light text-neutral-300 max-w-xl leading-relaxed">
          From visiting cards to wedding invitations— Upload your file, we print it right, and deliver it red-hot-fast.
        </p>

        {/* DYNAMIC SLIDE CONTENT */}
        <div className="min-h-[70px] flex flex-col justify-center pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={HERO_SLIDES[currentSlide].id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-1 border-l-2 border-[#D4020B] pl-4"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4020B]">
                Specialty 0{HERO_SLIDES[currentSlide].id} — {HERO_SLIDES[currentSlide].title}
              </span>
              <p className="text-sm sm:text-base text-neutral-200 font-medium">
                {HERO_SLIDES[currentSlide].tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA BUTTONS */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <AnimatePresence mode="wait">
            <motion.a
              key={HERO_SLIDES[currentSlide].id + '-cta'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              href="#upload"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all transform hover:-translate-y-0.5 shadow-xl"
            >
              {HERO_SLIDES[currentSlide].cta}
            </motion.a>
          </AnimatePresence>
          <a
            href="https://wa.me/yournumber"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D4020B] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#b00108] transition-all transform hover:-translate-y-0.5 shadow-xl"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === idx
                ? "bg-[#D4020B] scale-125"
                : "border border-white/60 bg-transparent hover:bg-white/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/70">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero