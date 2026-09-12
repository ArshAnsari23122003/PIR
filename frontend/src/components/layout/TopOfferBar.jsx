import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const ANNOUNCEMENTS = [
  "FREE DESIGN SUPPORT ON EVERY BULK ORDER — CHAT ON WHATSAPP",
  "PREMIUM RIGID BOXES & CUSTOM BROCHURES PRINTED TO PERFECTION",
  "17+ PRINT CATEGORIES • 26+ YEARS FAMILY LEGACY",
]

const TopOfferBar = () => {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? ANNOUNCEMENTS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
  }

  if (!isVisible) return null

  return (
    <div className="relative w-full bg-[#D4020B] text-white text-[11px] md:text-[12px] font-semibold tracking-wider uppercase h-9 flex items-center justify-between px-4 md:px-8 z-50 select-none">
      <button
        onClick={handlePrev}
        className="text-white/70 hover:text-white transition-colors p-1"
        aria-label="Previous Announcement"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-center gap-2 overflow-hidden max-w-[80%] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 cursor-pointer truncate"
            onClick={() => window.open("https://wa.me/yournumber", "_blank")}
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="truncate">{ANNOUNCEMENTS[index]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleNext}
          className="text-white/70 hover:text-white transition-colors p-1"
          aria-label="Next Announcement"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/70 hover:text-white transition-colors p-1 ml-1"
          aria-label="Close Announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default TopOfferBar