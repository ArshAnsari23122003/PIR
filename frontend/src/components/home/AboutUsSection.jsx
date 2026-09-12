import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headlineRef = useRef(null);
  const textRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Reveal Animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      tl.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          textRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .from(
          quoteRef.current,
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.7,
            ease: 'back.out(1.4)',
          },
          '-=0.4'
        )
        .from(
          imageRef.current,
          {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="relative w-full py-20 px-6 md:px-12 lg:px-20 bg-white overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Main Punchy Headline & Brand Origin SEO Copy */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Main Title */}
          <div ref={headlineRef} className="space-y-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              We print <br />
              with <span className="text-[#D4020B] relative inline-block">
                junoon.
              </span> <br />
              every single time.
            </h2>
            <div className="w-48 h-1.5 bg-[#D4020B] rounded-full mt-4" />
          </div>

          {/* Detailed Origin & SEO Paragraph */}
          <div ref={textRef} className="space-y-4 text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            <p>
              The name <span className="font-bold text-[#D4020B]">"print it red"</span> comes from{' '}
              <span className="font-bold text-slate-900">IK Junoon</span>, the song from{' '}
              <span className="font-semibold text-slate-900 italic">Zindagi Na Milegi Dobara</span> - about letting go of everyday worry and living with complete, wild passion.
            </p>
            <p className="font-medium">
              That's exactly how we approach every print job: no half-measures, no dull defaults, just bold color, precise execution, and the same{' '}
              <span className="font-bold text-[#D4020B]">junoon</span> whether it's 100 visiting cards or a wedding card order for 500 guests.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Quote, Mission & Image Replacement */}
        <div className="lg:col-span-6 relative flex flex-col justify-between space-y-10 pl-0 lg:pl-6">
          
          {/* Top Quote Container */}
          <div ref={quoteRef} className="relative bg-slate-50/80 backdrop-blur-sm border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-200/50 space-y-4 max-w-lg">
            {/* Red Quote Icons */}
            <div className="text-[#D4020B] text-6xl font-serif leading-none absolute -top-4 -left-2 opacity-90">
              “
            </div>

            <p className="text-lg sm:text-xl font-medium italic text-slate-800 leading-snug pt-3 pl-4">
              <span className="font-bold text-[#D4020B] not-italic">Ik Junoon</span> - the belief that whatever we create should be worth remembering
            </p>

            <div className="text-[#D4020B] text-6xl font-serif leading-none text-right pr-4 -mt-2 opacity-90">
              ”
            </div>
          </div>

          {/* Mission Box & Tagline */}
          <div className="space-y-3 max-w-lg border-l-4 border-[#D4020B] pl-6 py-1">
            <h3 className="text-lg font-bold text-[#D4020B] uppercase tracking-wider">
              Our Mission
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              To help business and individuals communicate better through high-quality printing that stands out and leaves a lasting impression.
            </p>
            <p className="text-slate-900 font-extrabold text-base sm:text-lg pt-1">
              Bold ideas. Perfect prints. Delivered with junoon.
            </p>
          </div>

          {/* Dummy Image replacing the floating 3D P */}
          <div
            ref={imageRef}
            className="absolute -right-6 -bottom-12 sm:right-0 sm:-bottom-8 pointer-events-none z-[-1] lg:z-10"
          >
            <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 relative">
              <img
                src="https://picsum.photos/id/1068/800/800"
                alt="About Us Placeholder"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                <span className="text-white text-xs sm:text-sm font-semibold text-center bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-sm">
                  Replace Image Here
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;