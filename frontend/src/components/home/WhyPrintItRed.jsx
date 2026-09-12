import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Upload, CheckCircle2, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const portfolioGrid = [
  { id: 1, title: 'Business Cards', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Gold Foil Cards', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Outdoor Billboard', isTall: true, img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200' },
  { id: 4, title: 'Custom Rigid Boxes', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Wedding Invitations', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Lanyards & ID Cards', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: 'Large Scale Banner', img: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'Product Packaging', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800' },
  { id: 9, title: 'Thank You Cards', img: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800' },
  { id: 10, title: 'Luxury Black Gold Packaging', img: 'https://images.unsplash.com/photo-1620987278429-ab178d6eb547?auto=format&fit=crop&q=80&w=800' },
];

const steps = [
  { id: 1, icon: ShoppingBag, title: '1. Choose your product', desc: 'Pick what you need from our wide range' },
  { id: 2, icon: Upload, title: '2. Upload your design', desc: 'Upload your file or ask our designer.' },
  { id: 3, icon: CheckCircle2, title: '3. Approve the proof', desc: 'We share a proof, you approve it.' },
  { id: 4, icon: Truck, title: '4. We print & deliver', desc: 'We print with perfection & deliver it fast.' },
];

const WhyPrintItRed = () => {
  const containerRef = useRef(null);
  const stepsRef = useRef([]);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Banner animation
      gsap.from('.banner-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.banner-card',
          start: 'top 85%',
        },
      });

      // Steps stagger animation
      gsap.from(stepsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.steps-container',
          start: 'top 80%',
        },
      });

      // Grid items staggered reveal
      gsap.from('.portfolio-item', {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotationY: x / 20,
      rotationX: -y / 20,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.3,
    });
  };

  const handleCardMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power2.out',
      duration: 0.4,
    });
  };

  return (
    <section ref={containerRef} className="w-full py-12 px-4 md:px-8 bg-white overflow-hidden select-none">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Top Pink Banner */}
        <div className="banner-card relative w-full bg-[#FAD2CE]/80 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Outline Heart Icon */}
            <div className="hidden sm:flex items-center justify-center shrink-0">
              <svg className="w-20 h-20 text-[#D4020B]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Why <span className="text-[#D4020B]">print it red</span>?
              </h2>
              <div className="text-slate-800 text-xs md:text-sm leading-snug space-y-0.5">
                <p>Because printing isn't just our business, it's our <span className="font-bold text-[#D4020B]">junoon</span>.</p>
                <p>We believe in bold colors, sharp details, and zero compromises.</p>
                <p>Every print we deliver carries our passion and promise.</p>
              </div>
            </div>
          </div>

          <a
            href="#about-us"
            className="inline-flex items-center justify-center bg-[#D4020B] hover:bg-red-700 text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-2xl transition-all duration-200 shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            know more about us
          </a>
        </div>

      {/* How It Works Section */}
<div className="space-y-8">
  {/* Header Box */}
  <div className="flex justify-center">
    <div className="border-2 border-[#D0402B] px-10 py-1">
      <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-wide uppercase">
        How it works
      </h3>
    </div>
  </div>

  {/* Steps Timeline Container */}
  <div className="steps-container relative max-w-5xl mx-auto py-4">
    {/* Desktop Horizontal Connecting Line - Dynamic Centering */}
    <div className="hidden md:block absolute top-11 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0 border-t-2 border-dashed border-[#D4020B] z-0 -translate-y-1/2" />

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={step.id}
            ref={(el) => (stepsRef.current[index] = el)}
            className="flex flex-col items-center text-center space-y-2 group relative"
          >
            {/* Mobile Vertical Connecting Line */}
            {index !== steps.length - 1 && (
              <div className="md:hidden absolute top-14 bottom-[-32px] w-0 border-l-2 border-dashed border-[#D4020B] left-1/2 -translate-x-1/2 -z-10" />
            )}

            {/* Step Icon Container */}
            <div className="w-14 h-14 rounded-full bg-[#D4020B] text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 z-10 shrink-0">
              <Icon className="w-7 h-7" />
            </div>

            {/* Step Title & Description */}
            <h4 className="font-extrabold text-slate-900 text-sm md:text-base pt-1">
              {step.title}
            </h4>
            <p className="text-slate-600 text-xs leading-tight max-w-[170px]">
              {step.desc}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</div>

        {/* Portfolio Dynamic Layout Grid */}
        <div className="space-y-8">
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-5 gap-3">
            
            {/* Column 1 */}
            <div className="space-y-3">
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-44 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[0].img} alt={portfolioGrid[0].title} className="w-full h-full object-cover" />
              </div>
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-44 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[5].img} alt={portfolioGrid[5].title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-44 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[1].img} alt={portfolioGrid[1].title} className="w-full h-full object-cover" />
              </div>
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-44 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[6].img} alt={portfolioGrid[6].title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Column 3 (Tall Billboard + Small Package Box) */}
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-60 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[2].img} alt={portfolioGrid[2].title} className="w-full h-full object-cover" />
              </div>
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-28 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[7].img} alt={portfolioGrid[7].title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Column 4 */}
            <div className="space-y-3">
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-44 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[3].img} alt={portfolioGrid[3].title} className="w-full h-full object-cover" />
              </div>
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-44 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[8].img} alt={portfolioGrid[8].title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Column 5 */}
            <div className="space-y-3">
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-44 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[4].img} alt={portfolioGrid[4].title} className="w-full h-full object-cover" />
              </div>
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="portfolio-item rounded-2xl overflow-hidden shadow-sm h-44 border border-slate-100 bg-slate-100"
              >
                <img src={portfolioGrid[9].img} alt={portfolioGrid[9].title} className="w-full h-full object-cover" />
              </div>
            </div>

          </div>

          {/* Bottom Pill Button */}
          <div className="flex justify-center pt-2">
            <a
              href="#products"
              className="inline-flex items-center justify-center px-8 py-2 rounded-full border-2 border-[#D4020B] text-[#D4020B] font-semibold text-xs md:text-sm hover:bg-[#D4020B] hover:text-white transition-all duration-300 shadow-sm"
            >
              View more work
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyPrintItRed;