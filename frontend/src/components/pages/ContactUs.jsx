import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Check, MessageSquare, MapPin } from 'lucide-react';

const CAROUSEL_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=1000",
    title: "High-Resolution Sticker Printing & Custom Die-Cut Labels"
  },
  {
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000",
    title: "Commercial Heavy Stock Paper & Corporate Collateral"
  },
  {
    url: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=1000",
    title: "UV DTF Transfers & Bulk 12x18 Sheet Printing"
  }
];

// Animation variants for smooth left-to-right slide transition
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function SEOCleanContactSection() {
  const [[page, direction], setPage] = useState([0, 1]);
  const [copiedField, setCopiedField] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const activeSlide = Math.abs(page % CAROUSEL_IMAGES.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-slide towards the left every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    triggerToast(`Copied ${fieldName} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-neutral-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-neutral-700"
          >
            <div className="w-2 h-2 rounded-full bg-[#D4020B] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container - -mt-24 pt-36/pt-40 guarantees content sits properly beneath fixed navbar */}
      <section className="relative pt-32 md:pt-44 pb-16 lg:pb-24 bg-white text-neutral-900 font-sans selection:bg-[#D4020B] selection:text-white overflow-hidden">
  
  {/* Optional smooth gradient background behind fixed navbar */}
  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-100/60 to-transparent pointer-events-none" />

  <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* LEFT COLUMN: Content */}
      <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
        <header className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4020B] block">
            Print It Red — Commercial Printing Studio
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.08]">
            Get in touch with <br className="hidden sm:inline" />
            our print experts.
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal pt-2">
            Looking for custom vinyl stickers, 12x18 inch bulk sheet printing, or heavy paper stock collateral in Indore? Connect with us directly for fast quotes and production updates.
          </p>
        </header>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm pt-2">
                <div className="space-y-2">
                  <h2 className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">
                    Studio & Works
                  </h2>
                  <address className="not-italic text-neutral-800 leading-relaxed font-medium">
                    Print It Red HQ<br />
                    Indore, Madhya Pradesh<br />
                    India
                  </address>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">
                      Email Address
                    </h2>
                    <div className="flex items-center space-x-2">
                      <a 
                        href="mailto:hello@printitred.com" 
                        className="text-neutral-900 hover:text-[#D4020B] transition-colors font-semibold text-base"
                      >
                        hello@printitred.com
                      </a>
                      <button 
                        onClick={() => handleCopy('hello@printitred.com', 'Email')}
                        className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
                        title="Copy Email"
                        aria-label="Copy Email Address"
                      >
                        {copiedField === 'Email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">
                      Phone & Support
                    </h2>
                    <div className="flex items-center space-x-2">
                      <a 
                        href="tel:+919179107299" 
                        className="text-neutral-900 hover:text-[#D4020B] transition-colors font-semibold text-base"
                      >
                        +91 91791 07299
                      </a>
                      <button 
                        onClick={() => handleCopy('+919179107299', 'Phone Number')}
                        className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
                        title="Copy Phone Number"
                        aria-label="Copy Phone Number"
                      >
                        {copiedField === 'Phone Number' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href="https://wa.me/919179107299?text=Hi%20Print%20It%20Red,%20I%20have%20an%20inquiry%20about%20printing%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerToast("Opening WhatsApp chat...")}
                  className="group bg-neutral-900 text-white rounded-2xl p-6 flex items-center justify-between hover:bg-[#D4020B] transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <div>
                    <span className="text-xs text-neutral-400 group-hover:text-white/80 block mb-1 font-medium">Instant Quote</span>
                    <span className="text-lg font-bold block tracking-tight flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> WhatsApp Us
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </a>

                <a
                  href="https://maps.google.com/?q=Indore+Madhya+Pradesh+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerToast("Opening Google Maps location...")}
                  className="group border border-neutral-200 bg-neutral-50 text-neutral-900 rounded-2xl p-6 flex items-center justify-between hover:border-neutral-300 hover:bg-neutral-100 transition-all duration-300"
                >
                  <div className="pr-2">
                    <span className="text-[#D4020B] text-xs font-semibold block mb-1">Local Directions</span>
                    <span className="text-lg font-bold block tracking-tight flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Find Studio
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-neutral-300 group-hover:border-neutral-500 flex items-center justify-center transition-all shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </a>
              </div>

            </div>

            {/* RIGHT COLUMN: Carousel with Swipe Left Animation */}
            <div className="lg:col-span-6 h-[480px] sm:h-[560px] lg:h-[620px] w-full relative rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xl">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={CAROUSEL_IMAGES[activeSlide].url}
                    alt={CAROUSEL_IMAGES[activeSlide].title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1 pointer-events-none">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4020B] bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-md inline-block">
                  Featured Capabilities
                </span>
                <p className="text-sm font-medium text-neutral-200">
                  {CAROUSEL_IMAGES[activeSlide].title}
                </p>
              </div>

              {/* Slide Indicators */}
              <div className="absolute top-6 right-6 z-10 flex space-x-2">
                {CAROUSEL_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const nextDir = idx > activeSlide ? 1 : -1;
                      setPage([idx, nextDir]);
                      triggerToast(`Switched to gallery image ${idx + 1}`);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1 transition-all duration-300 rounded-full ${
                      idx === activeSlide ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}