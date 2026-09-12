import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const machineSteps = [
  {
    step: '01',
    title: 'Automatic Die-Cutting Precision',
    description: 'High-speed registration sensors ensure ±0.05mm accuracy across 8,000 sheets per hour.',
    coords: 'top-[20%] left-[10%]'
  },
  {
    step: '02',
    title: 'Thermal Foil Stamping Module',
    description: 'Multi-zone heat controls allow complex metallic micro-embossing without paper warping.',
    coords: 'top-[45%] right-[10%]'
  },
  {
    step: '03',
    title: 'Integrated QC Vision Inspection',
    description: 'AI optical cameras scan every pass, automatically rejecting sub-pixel register defects in real-time.',
    coords: 'bottom-[15%] left-[15%]'
  }
]

const MachineShowcase = () => {
  const containerRef = useRef(null)
  const pinnedRef = useRef(null)
  const stepsRef = useRef([])

  useGSAP(() => {
    const container = containerRef.current
    const pinned = pinnedRef.current
    const steps = stepsRef.current

    if (!container || !pinned) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: pinned,
        start: 'top top',
        end: '+=250%',
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    })

    steps.forEach((stepEl, i) => {
      tl.fromTo(
        stepEl,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      if (i < steps.length - 1) {
        tl.to(stepEl, { opacity: 0.15, scale: 0.95, duration: 0.8 }, '+=0.5')
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full bg-black text-white" style={{ height: '350vh' }}>
      <div 
        ref={pinnedRef}
        className="sticky top-0 w-full h-[100vh] min-h-[100svh] flex flex-col justify-between p-6 md:p-12 overflow-hidden"
      >
        <div className="z-10 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4020B]">Engineering Excellence</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase mt-1">Our Printing Machinery</h2>
        </div>

        {/* Central Machine Visualization Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
          <div className="w-[85%] md:w-[60%] aspect-video bg-neutral-900 border border-neutral-800 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
            <span className="text-neutral-700 font-mono text-sm tracking-widest">
              [ 3D/CANVAS MACHINE ROTATION ENGINE ]
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-red-950/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Sequenced Feature Cards */}
        <div className="relative w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
          {machineSteps.map((item, idx) => (
            <div
              key={item.step}
              ref={(el) => (stepsRef.current[idx] = el)}
              className="my-2 md:my-0 md:absolute max-w-md bg-neutral-900/90 border border-neutral-700/60 rounded-xl p-5 shadow-2xl backdrop-blur-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-[#D4020B] text-white text-xs font-bold rounded">
                  {item.step}
                </span>
                <h4 className="text-base font-bold">{item.title}</h4>
              </div>
              <p className="text-xs md:text-sm text-neutral-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MachineShowcase