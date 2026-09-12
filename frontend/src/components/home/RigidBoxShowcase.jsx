import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import assets from '../../assets/assets'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const products = [
  {
    id: 'rigid-gift-box',
    title: 'Rigid Gift Box',
    tagline: 'Luxury, magnetic closure, foil-ready',
    desc: 'Engineered with 2mm high-density chipboard wrapped in soft-touch paper. Perfect for high-end retail, tech, and luxury gift sets.',
    image: assets?.rigidBoxImg || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
    specs: ['Magnetic Lid', 'Custom Foam Insert', 'Embossing Ready']
  },
  {
    id: 'corrugated-box',
    title: 'Corrugated Box',
    tagline: 'Sturdy, shipping-ready, brand-printed',
    desc: 'Heavy-duty double-wall corrugated design built for e-commerce logistics without sacrificing unboxing elegance.',
    image: assets?.corrugatedBoxImg || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop',
    specs: ['E-Flute / B-Flute', 'Crush Resistant', 'Eco-Soy Inks']
  },
  {
    id: 'art-paper-box',
    title: 'Art Paper Box',
    tagline: 'Elegant, retail-ready, premium finish',
    desc: 'Precision folded 350 GSM virgin art cardstock with spot UV and metallic accents for maximum shelf appeal.',
    image: assets?.artPaperBoxImg || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    specs: ['Spot UV Coating', 'FSC Certified', 'Vibrant Color Match']
  }
]

const RigidBoxShowcase = () => {
  const targetSectionRef = useRef(null)
  const pinnedWrapperRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)
  const cardsRef = useRef([])
  const ctaRef = useRef(null)

  useGSAP(() => {
    const section = targetSectionRef.current
    const headline = headlineRef.current
    const subhead = subheadRef.current
    const cards = cardsRef.current
    const cta = ctaRef.current

    if (!section || !cards.length) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: pinnedWrapperRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    })

    // Beat 1: Big Commitment Headline Entrance
    tl.fromTo(
      headline,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )

    // Beat 2: Supporting Copy
    tl.fromTo(
      subhead,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '+=0.2'
    )

    // Beat 3: Staggered Product Cards (3D Slide & Tilt)
    cards.forEach((card, idx) => {
      tl.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.88,
          rotateY: -15,
          y: 50,
          transformPerspective: 1000
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
        },
        `card-${idx}`
      )
    })

    // Beat 4: Closing CTA Reveal
    tl.fromTo(
      cta,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '+=0.3'
    )

  }, { scope: targetSectionRef })

  return (
    <section 
      ref={targetSectionRef} 
      className="relative w-full bg-neutral-950 text-white overflow-hidden"
      style={{ height: '400vh' }}
    >
      <div 
        ref={pinnedWrapperRef}
        className="sticky top-0 w-full h-[100vh] min-h-[100svh] flex flex-col justify-between py-10 md:py-16 px-4 md:px-8 overflow-hidden"
      >
        {/* Top Beats: Header Block */}
        <div className="max-w-4xl mx-auto text-center z-10">
          <h2 
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-balance leading-none"
          >
            premium packaging.<br />
            <span className="text-neutral-400">built to be unboxed.</span>
          </h2>
          <p 
            ref={subheadRef}
            className="mt-4 text-xs sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto text-balance font-normal"
          >
            Rigid boxes, corrugated boxes, and art-paper boxes — precision-crafted for brands that take their packaging as seriously as their product.
          </p>
        </div>

        {/* Middle Beat: 3D Staggered Cards Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-auto z-10 px-2">
          {products.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-neutral-900/90 border border-neutral-800/80 rounded-2xl p-4 md:p-6 flex flex-col justify-between shadow-2xl backdrop-blur-md transition-shadow hover:border-neutral-700"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="aspect-[4/3] w-full bg-neutral-800 rounded-xl overflow-hidden mb-4 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-[#D4020B] uppercase tracking-wider mt-1">
                  {item.tagline}
                </p>
                <p className="text-xs md:text-sm text-neutral-400 mt-2 line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-wrap gap-1.5">
                {item.specs.map((spec) => (
                  <span
                    key={spec}
                    className="text-[10px] uppercase font-bold px-2 py-0.5 bg-neutral-800/80 text-neutral-300 rounded"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Beat: CTA Button */}
        <div ref={ctaRef} className="text-center z-10 pt-2">
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 text-xs md:text-sm font-bold uppercase tracking-widest bg-[#D4020B] text-white rounded-full hover:bg-[#b00108] transition-all transform hover:scale-105 shadow-lg shadow-red-900/20"
          >
            Get a Custom Quote for Your Packaging
          </a>
        </div>
      </div>
    </section>
  )
}

export default RigidBoxShowcase