import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Megaphone, Flag, Package, Mail } from "lucide-react";

const CATEGORIES = [
  {
    id: "business-stationery",
    name: "Business & Stationery",
    tagline: "Corporate identity & office essentials",
    icon: Briefcase,
    bgImage:
      "https://images.unsplash.com/photo-1542744094-3a3172720177?auto=format&fit=crop&w=800&q=80",
    items: [
      "Visiting Cards",
      "Letterheads",
      "Custom Envelopes",
      "ID Cards & Lanyards",
      "Brand Diaries",
    ],
    messages: [
      "Nice choice! Elevate your professional identity!",
      "Sleek & professional! Make high-impact first impressions.",
      "Top pick for corporate networking & executive branding!",
    ],
  },
  {
    id: "marketing-signage",
    name: "Marketing & Signage",
    tagline: "High-visibility promo material",
    icon: Megaphone,
    bgImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    items: [
      "Custom Brochures",
      "Flyers & Leaflets",
      "Posters & Banners",
      "Roll-up Standees",
      "Stickers & Labels",
    ],
    messages: [
      "Great choice! Stand out in any crowded market!",
      "Bold choice! Drive customer attention instantly.",
      "Vibrant prints that get your product noticed!",
    ],
  },
  {
    id: "signage-branding",
    name: "Signage & Branding",
    tagline: "Architectural & illuminated displays",
    icon: Flag,
    bgImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    items: [
      "Acrylic Letters",
      "LED Neon Signs",
      "Vinyl Wall Graphics",
      "Sunpack Boards",
      "3D Lettering",
    ],
    messages: [
      "Awesome pick! Light up your brand space!",
      "Eye-catching & modern indoor/outdoor displays.",
      "Pure visual impact for modern retail spaces!",
    ],
  },
  {
    id: "rigid-packaging",
    name: "Rigid & Packaging",
    tagline: "Premium unboxing & luxury boxes",
    icon: Package,
    bgImage:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    items: [
      "Luxury Rigid Gift Boxes",
      "Corrugated Mailers",
      "Custom Paper Bags",
      "Monocarton Packaging",
      "Custom Sleeves",
    ],
    messages: [
      "Luxury choice! Unboxing experiences clients will love!",
      "Tactile elegance & premium structural strength.",
      "High-end packaging that turns products into gifts!",
    ],
  },
  {
    id: "cards-invitations",
    name: "Cards & Invitations",
    tagline: "Bespoke event invites & passes",
    icon: Mail,
    bgImage:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    items: [
      "Wedding Invitations",
      "Event Pass Cards",
      "Greeting Cards",
      "Custom Sleeves",
      "Foil Stamped Invites",
    ],
    messages: [
      "Exquisite choice! Make every moment memorable!",
      "Elegantly crafted for unforgettable celebrations.",
      "Beautiful textures and delicate foil accents!",
    ],
  },
];

export default function ProductFaceCards() {
  const [hoveredCat, setHoveredCat] = useState(null);
  const [activeMessage, setActiveMessage] = useState(
    "Hover over any category to explore & get recommendations!"
  );

  const pointerRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 3 : 0,
  });

  const centerPupilsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const handlePointer = (e) => {
      const point = e.touches ? e.touches[0] : e;
      pointerRef.current = { x: point.clientX, y: point.clientY };
    };
    window.addEventListener("mousemove", handlePointer);
    window.addEventListener("touchmove", handlePointer, { passive: true });

    const tick = () => {
      const { x: mx, y: my } = pointerRef.current;

      centerPupilsRef.current.forEach((pupil) => {
        if (!pupil) return;
        const socket = pupil.parentElement;
        if (!socket) return;

        const rect = socket.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const angle = Math.atan2(dy, dx);
        const dist = Math.hypot(dx, dy);
        const maxTravel = rect.width * 0.22;
        const travel = Math.min(maxTravel, (dist / 220) * maxTravel);

        pupil.style.transform = `translate(${Math.cos(angle) * travel}px, ${
          Math.sin(angle) * travel
        }px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("touchmove", handlePointer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseEnter = (cat) => {
    setHoveredCat(cat);
    const randomMsg =
      cat.messages[Math.floor(Math.random() * cat.messages.length)];
    setActiveMessage(randomMsg);
  };

  const handleMouseLeave = () => {
    setHoveredCat(null);
    setActiveMessage(
      "Hover over any category to explore & get recommendations!"
    );
  };

  return (
    <section className="relative w-full min-h-screen bg-white text-neutral-900 px-6 sm:px-12 md:px-20 py-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,2,11,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Heading Section */}
      <div className="relative z-10 text-center max-w-3xl mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[#D4020B]">
          Shop By Category
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans mt-2 text-black">
          Pick a Craft.<span className="text-[#D4020B]"> Discover Quality.</span>
        </h2>
      </div>

      {/* Single Central Interactive Mascot Section */}
      <div className="relative z-10 flex flex-col items-center mb-12">
        {/* Interactive Speech Bubble */}
        <div className="min-h-[50px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMessage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white border border-neutral-200 text-neutral-800 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full shadow-lg text-center max-w-sm mb-4"
            >
              {activeMessage}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Single Center Character Face */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#D4020B] to-[#900107] flex items-center justify-center shadow-[0_10px_30px_rgba(212,2,11,0.3)] border border-[#ff3b44]/40 transform transition-transform duration-300 hover:scale-105">
          {/* Eyes */}
          <div className="absolute top-8 flex gap-4">
            {[0, 1].map((idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center relative overflow-hidden shadow-inner"
              >
                <div
                  ref={(el) => (centerPupilsRef.current[idx] = el)}
                  className="w-3.5 h-3.5 rounded-full bg-black relative will-change-transform after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-1 after:h-1 after:bg-white after:rounded-full"
                />
              </div>
            ))}
          </div>

          {/* Blush */}
          <div className="absolute bottom-6 left-3 w-3.5 h-2 rounded-full bg-white/20 blur-[0.5px]" />
          <div className="absolute bottom-6 right-3 w-3.5 h-2 rounded-full bg-white/20 blur-[0.5px]" />

          {/* Mouth */}
          <div className="absolute bottom-5 w-8 h-3 border-b-4 border-black/80 rounded-b-full" />
        </div>
      </div>

      {/* 5 Category Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-7xl">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          const isHovered = hoveredCat?.id === cat.id;

          return (
            <div
              key={cat.id}
              onMouseEnter={() => handleMouseEnter(cat)}
              onMouseLeave={handleMouseLeave}
              className={`cursor-target group relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between text-left transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border shadow-sm ${
                isHovered
                  ? "border-[#D4020B] shadow-xl"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {/* Card Background Image with Gradient Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/40 transition-opacity duration-300 group-hover:via-white/85" />

              {/* Top Row: Icon Badge */}
              <div className="relative z-10 flex justify-between items-center mb-16">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 flex items-center justify-center text-[#D4020B] shadow-sm">
                  <IconComponent size={18} />
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10">
                <h3 className="text-base font-bold text-neutral-900 tracking-wide group-hover:text-[#D4020B] transition-colors duration-200">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1 mb-4 min-h-[32px] leading-relaxed">
                  {cat.tagline}
                </p>

                {/* Sub-Items List */}
                <ul className="w-full border-t border-neutral-200/80 pt-3 flex flex-col gap-1.5 text-left">
                  {cat.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs text-neutral-700 flex items-center gap-2 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4020B]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}