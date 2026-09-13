import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, Repeat2, Heart, Plus, X, ArrowUpRight, BadgeCheck, Mail } from 'lucide-react';

// --- SPOTLIGHT CARD COMPONENT ---
const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(212, 2, 11, 0.15)' }) => {
  const divRef = useRef(null);

  const handleMouseMove = e => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove} 
      className={`relative rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl group ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--spotlight-color': spotlightColor,
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const testimonials = [
  {
    id: 1,
    name: 'Arjun Verma',
    handle: '@arjun_organics',
    date: 'Mar 12',
    company: 'Verma Organics Pvt Ltd',
    quote: 'Best Quality packaging we’ve received so far. The rigid box structural integrity and gold foil stamping exceeded our expectations. Will definitely reorder.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    stats: { replies: 12, retweets: 48, likes: '1.2k' }
  },
  {
    id: 2,
    name: 'Rohan Malhotra',
    handle: '@rohan_apex',
    date: 'Feb 28',
    company: 'Apex Retail Solutions',
    quote: 'The print sharpness and color accuracy on our large-format outdoor displays were spot on. Turnaround time was incredibly fast without sacrificing quality.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    stats: { replies: 4, retweets: 19, likes: 342 }
  },
  {
    id: 3,
    name: 'Priya Sundaram',
    handle: '@priya_elegance',
    date: 'Feb 15',
    company: 'Elegance Luxury Apparel',
    quote: 'Their attention to detail on customized garment tags and frosted lanyard cards is top-notch. print it red has completely transformed our brand presentation.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    stats: { replies: 38, retweets: 102, likes: '2.4k' }
  },
  {
    id: 4,
    name: 'Vikramaditya Shah',
    handle: '@vikram_packhub',
    date: 'Jan 30',
    company: 'Shah Packaging Hub',
    quote: 'Partnering with print it red elevated our B2B promotional collateral. Their zero-compromise approach to color accuracy gives us complete peace of mind.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    stats: { replies: 9, retweets: 27, likes: 891 }
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
  },
  {
    question: 'Do you offer custom metallic foiling and embossing finishes?',
    answer: 'Yes! We specialize in hot foil stamping (gold, silver, rose gold, holographic), spot UV lamination, and multi-level blind debossing to make your packaging stand out.'
  },
  {
    question: 'How do I track my active print production order?',
    answer: 'Once your artwork is approved and pushed to the press floor, you will receive real-time status updates via SMS and WhatsApp, complete with live courier tracking links.'
  },
  {
    question: 'Can your team help design artwork if I only have a brand logo?',
    answer: 'Definitely. Our in-house graphic design studio can adapt your raw assets into print-ready layouts with proper bleed lines and color separation.'
  }
];

const FaqAccordion = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`border rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-300 ${isOpen ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-bold text-sm md:text-base leading-snug pr-4">
          {faq.question}
        </h4>
        <button className={`shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? 'rotate-45 text-[#D4020B]' : 'text-slate-400'}`}>
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <p className={`text-sm md:text-base leading-relaxed ${isOpen ? 'text-slate-300' : 'text-slate-600'}`}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestimonialsAndFaq = () => {
  const [showToast, setShowToast] = useState(false);

  const handleEmailClick = () => {
    setShowToast(true);
    setTimeout(() => {
      window.location.href = 'mailto:info@printitred.com?subject=print%20it%20red%20Inquiry';
      setShowToast(false);
    }, 1800);
  };

  return (
    <div className="w-full bg-white min-h-screen py-24 px-4 sm:px-6 md:px-12 lg:px-20 font-sans space-y-32 relative overflow-hidden">
      
      {/* Toast Notification with Dark Glassmorphism */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: -100, scale: 0.5, opacity: 0, x: '-50%' }}
            animate={{ y: 0, scale: 1, opacity: 1, x: '-50%' }}
            exit={{ y: -100, scale: 0.5, opacity: 0, x: '-50%' }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-10 left-1/2 z-[110] bg-blue-950/80 backdrop-blur-xl text-white px-6 py-4 rounded-full flex items-center gap-4 shadow-2xl border border-blue-500/30 pointer-events-none"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                Email Support
              </span>
              <span className="text-[10px] text-blue-200 mt-0.5">
                Opening Mail Client...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SECTION 1: SOCIAL PROOF --- */}
      <section className="max-w-[1400px] mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4020B]">Client Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Featured Pull-Quote with Spotlight */}
          <div className="lg:col-span-5">
            <SpotlightCard className="h-full flex flex-col justify-between border-slate-200 bg-slate-50">
              <div>
                <div className="flex items-center gap-1.5 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4020B] text-[#D4020B]" />
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight mb-10">
                  "print it red made our packaging and brand materials feel ten times more premium without adding a single delay to our timeline."
                </h3>
                
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                    alt="Reviewer" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D4020B]"
                  />
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm md:text-base">Meera Desai</h4>
                    <p className="text-slate-500 text-xs font-medium">Head of Marketing, Northstar</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-slate-200">
                <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">
                  In Good Company
                </p>
                <div className="flex items-center gap-6 text-slate-600 font-bold text-sm">
                  <span>Apex</span>
                  <span>Relay</span>
                  <span>Forma</span>
                  <span>Alpenglow</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Panel: Verified Social Grid with Spotlight Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <SpotlightCard key={t.id} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-slate-900 font-bold text-sm">{t.name}</h4>
                          <BadgeCheck className="w-3.5 h-3.5 text-[#D4020B]" />
                        </div>
                        <p className="text-slate-500 text-xs">{t.handle}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">{t.date}</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                    {t.quote}
                  </p>
                </div>
                
                <div className="flex items-center gap-6 text-slate-400">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4020B] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{t.stats.replies}</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4020B] transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-xs">{t.stats.retweets}</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4020B] transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{t.stats.likes}</span>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
          
        </div>
      </section>

      {/* --- SECTION 2: FAQ & SUPPORT PANEL --- */}
      <section className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
          
          {/* Left Panel: Sticky Support Contact */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 border border-slate-800 lg:sticky lg:top-10 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4020B]">Help Center</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mt-2 mb-4">
              Questions that need a human?
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 pr-4">
              The answers here cover the basics. For complex die-cuts, bulk corporate pricing, or specialized material sourcing, send us your requirements: a real printing expert replies.
            </p>
            
            <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-800 mb-8">
              <div>
                <p className="text-3xl font-black text-white mb-1">2h</p>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Median first reply</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white mb-1">98%</p>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Support CSAT</p>
              </div>
            </div>

            <button 
              onClick={handleEmailClick}
              className="w-full bg-[#D4020B] hover:bg-red-700 text-white font-bold rounded-full py-4 px-6 flex items-center justify-between transition-colors cursor-pointer shadow-lg shadow-red-600/20"
            >
              <span className="uppercase tracking-widest text-xs">Email the team</span>
              <ArrowUpRight className="w-5 h-5 text-white" />
            </button>
            
            <p className="text-slate-500 text-xs mt-6 text-center">
              Weekdays 9:00–18:00 IST, pan-India delivery.
            </p>
          </div>

          {/* Right Panel: FAQ Masonry Grid */}
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-4 md:gap-6">
            
            {/* Column 1 (Odds) */}
            <div className="flex-1 space-y-4 md:space-y-6">
              {faqs.filter((_, i) => i % 2 === 0).map((faq, index) => (
                <FaqAccordion key={`col1-${index}`} faq={faq} />
              ))}
            </div>

            {/* Column 2 (Evens) */}
            <div className="flex-1 space-y-4 md:space-y-6">
              {faqs.filter((_, i) => i % 2 !== 0).map((faq, index) => (
                <FaqAccordion key={`col2-${index}`} faq={faq} />
              ))}
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
};

export default TestimonialsAndFaq;