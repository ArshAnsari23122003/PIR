import React, { useState } from 'react';
import { Plus, X, Upload, MessageCircle, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Arjun Verma',
    company: 'Verma Organics Pvt Ltd',
    quote: 'Best Quality packaging we’ve received so far. The rigid box structural integrity and gold foil stamping exceeded our expectations. Will definitely reorder.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 2,
    name: 'Rohan Malhotra',
    company: 'Apex Retail Solutions',
    quote: 'The print sharpness and color accuracy on our large-format outdoor displays were spot on. Turnaround time was incredibly fast without sacrificing quality.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 3,
    name: 'Priya Sundaram',
    company: 'Elegance Luxury Apparel',
    quote: 'Their attention to detail on customized garment tags and frosted lanyard cards is top-notch. Print It Red has completely transformed our brand presentation.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 4,
    name: 'Vikramaditya Shah',
    company: 'Shah Packaging Hub',
    quote: 'Partnering with Print It Red elevated our B2B promotional collateral. Their zero-compromise approach to color accuracy gives us complete peace of mind.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

const faqs = [
  {
    question: 'What is the Minimum Order Quantity (MOQ)?',
    answer: 'We cater to both emerging brands and large enterprises. Standard MOQ starts as low as 50 units for custom rigid packaging and promotional items, while offset print jobs like business cards start at 100 units.'
  },
  {
    question: 'What is the standard Turnaround Time for custom print orders?',
    answer: 'Express local print orders are processed within 24–48 hours. Custom rigid boxes, premium foil packaging, and bulk corporate merchandise typically ship within 5 to 7 business days following digital proof approval.'
  },
  {
    question: 'What file formats and color profiles do you accept for printing?',
    answer: 'For optimal print quality, we recommend vectorized PDF, AI, or EPS formats set in CMYK color profile at 300+ DPI with minimum 3mm bleed margins. High-resolution PNG and TIFF files are also accepted.'
  },
  {
    question: 'Do you deliver across all major cities and pan-India locations?',
    answer: 'Yes, we provide expedited doorstep pan-India delivery through leading logistics partners. Real-time tracking details are automatically dispatched upon shipping.'
  },
  {
    question: 'Can I request a sample proof before placing a bulk manufacturing order?',
    answer: 'Absolutely. We provide physical digital proofs and structural prototypes upon request so you can inspect material weight, color fidelity, and finish before final production.'
  }
];

// Interactive 3D Tilt Card Component
const TiltCard = ({ item }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 12);
    setRotateY(x / 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-1000 py-6 px-3 shrink-0">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: rotateX === 0 ? 'transform 0.5s ease-out' : 'none'
        }}
        className="w-[320px] sm:w-[380px] h-[260px] bg-white rounded-2xl border-2 border-[#D4020B] p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative flex flex-col justify-between transform-gpu select-none"
      >
        <div className="absolute top-4 left-4 text-[#D4020B]">
          <Quote className="w-6 h-6 fill-[#D4020B] rotate-180" />
        </div>

        <p className="text-slate-700 text-sm md:text-base leading-relaxed pl-6 pt-2 mb-4 font-medium line-clamp-4">
          {item.quote}
        </p>

        <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#D4020B] shrink-0"
          />
          <div className="overflow-hidden">
            <h4 className="font-bold text-slate-900 text-sm md:text-base truncate">{item.name}</h4>
            <p className="text-slate-500 text-xs md:text-sm font-medium truncate">{item.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsAndFaq = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white overflow-hidden space-y-24">
      {/* Self-contained CSS Animations */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes customMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-custom-marquee {
          display: flex;
          width: max-content;
          animation: customMarquee 28s linear infinite;
        }
        .animate-custom-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. Testimonials Section with Lamination Roller Frame */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            What our Customers say
          </h2>
          <div className="w-32 h-1 bg-[#D4020B] mx-auto rounded-full" />
        </div>

        {/* Lamination Machine Assembly */}
        <div className="relative w-full rounded-3xl bg-zinc-900/5 p-2 sm:p-4 border border-zinc-200">
          
          {/* LEFT LAMINATION ROLLER */}
          <div className="absolute left-0 top-0 bottom-0 z-30 w-12 sm:w-16 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 shadow-2xl rounded-l-3xl border-r-2 border-[#D4020B] flex flex-col justify-between items-center py-6 pointer-events-none">
            <div className="w-8 h-8 rounded-full border-4 border-zinc-500 bg-zinc-800 shadow-inner animate-spin" style={{ animationDuration: '6s' }} />
            <div className="h-1/2 w-1.5 bg-[#D4020B] rounded-full animate-pulse shadow-[0_0_12px_#D4020B]" />
            <div className="w-8 h-8 rounded-full border-4 border-zinc-500 bg-zinc-800 shadow-inner animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          {/* RIGHT LAMINATION ROLLER */}
          <div className="absolute right-0 top-0 bottom-0 z-30 w-12 sm:w-16 bg-gradient-to-l from-zinc-900 via-zinc-700 to-zinc-900 shadow-2xl rounded-r-3xl border-l-2 border-[#D4020B] flex flex-col justify-between items-center py-6 pointer-events-none">
            <div className="w-8 h-8 rounded-full border-4 border-zinc-500 bg-zinc-800 shadow-inner animate-spin" style={{ animationDuration: '6s' }} />
            <div className="h-1/2 w-1.5 bg-[#D4020B] rounded-full animate-pulse shadow-[0_0_12px_#D4020B]" />
            <div className="w-8 h-8 rounded-full border-4 border-zinc-500 bg-zinc-800 shadow-inner animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          {/* Glossy Overlay Sheen (Simulating Plastic Lamination Foil) */}
          <div className="absolute inset-x-12 inset-y-0 z-20 pointer-events-none bg-gradient-to-b from-white/20 via-transparent to-white/20" />

          {/* Infinite Marquee Track */}
          <div className="relative w-full overflow-hidden px-10 sm:px-14">
            <div className="animate-custom-marquee flex items-center">
              {[...testimonials, ...testimonials].map((item, index) => (
                <TiltCard key={`${item.id}-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. FAQ Section with Dynamic Island Pop-out */}
      <div className="max-w-4xl mx-auto space-y-10 relative">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-32 h-1 bg-[#D4020B] mx-auto rounded-full" />
        </div>

        <div className="space-y-4 relative">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              className="rounded-full border-2 border-[#D4020B]/30 bg-white overflow-hidden shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => setActiveFaq(faq)}
                className="w-full flex items-center justify-between py-4 px-6 text-left font-bold text-slate-800 text-sm md:text-base hover:text-[#D4020B] transition-colors"
              >
                <span>{faq.question}</span>
                <div className="w-8 h-8 rounded-full bg-red-50 text-[#D4020B] flex items-center justify-center shrink-0 ml-4">
                  <Plus className="w-5 h-5" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Island Expand Modal */}
        <AnimatePresence>
          {activeFaq && (
            <>
              {/* Dark Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveFaq(null)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              />

              {/* Dynamic Island Box */}
              <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="pointer-events-auto w-full max-w-2xl bg-white rounded-3xl border-2 border-[#D4020B] p-6 md:p-8 shadow-2xl relative space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                      {activeFaq.question}
                    </h3>
                    <button
                      onClick={() => setActiveFaq(null)}
                      className="w-10 h-10 rounded-full bg-red-50 text-[#D4020B] hover:bg-[#D4020B] hover:text-white flex items-center justify-center transition-all shrink-0"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 pt-4">
                    {activeFaq.answer}
                  </p>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Bottom Banner Call-To-Action */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#D4020B] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-500/20">
          <div className="flex items-center space-x-4 text-white">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 shrink-0">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black tracking-wide uppercase">
                Have a design ready?
              </h3>
              <p className="text-white/90 font-medium text-sm md:text-base">
                Let’s print it red today.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href="#upload"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#D4020B] font-bold px-6 py-3.5 rounded-full shadow-md hover:bg-slate-100 transition-all text-sm md:text-base whitespace-nowrap"
            >
              <Upload className="w-4 h-4" />
              Upload & Get Quote
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-6 py-3.5 rounded-full hover:bg-white hover:text-[#D4020B] transition-all text-sm md:text-base whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndFaq;