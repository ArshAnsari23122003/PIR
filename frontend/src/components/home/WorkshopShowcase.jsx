import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import DriftWall from '../ui/DriftWall'

// Optional local asset import with fallback protection
let assets = {}
try {
  assets = require('../assets/assets').default || require('../assets/assets')
} catch (e) {
  // Asset fallback handling
}

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 2C6.477 2 2 6.477 2 12c0 2.159.685 4.158 1.854 5.793L2.5 21.5l3.863-1.314A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.727 0-3.33-.483-4.707-1.321l-.338-.207-2.292.78.793-2.228-.227-.361A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
  </svg>
)

const workshopItems = [
  { image: 'https://picsum.photos/id/1015/600/400', title: 'Digital Printing Press' },
  { image: 'https://picsum.photos/id/1025/600/400', title: 'Flatbed Cutting Machine' },
  { image: 'https://picsum.photos/id/1039/600/400', title: 'Wide Format Printer' },
  { image: 'https://picsum.photos/id/1043/600/400', title: 'UV Flatbed Printing' },
  { image: 'https://picsum.photos/id/1044/600/400', title: 'DTF Sticker Workshop' },
  { image: 'https://picsum.photos/id/1050/600/400', title: 'Laser Cutting Machine' },
  { image: 'https://picsum.photos/id/1062/600/400', title: 'Heavy Paper Binder' },
  { image: 'https://picsum.photos/id/1069/600/400', title: 'Custom Stationery Press' },
  { image: 'https://picsum.photos/id/1074/600/400', title: 'Vinyl Banner Cutter' },
  { image: 'https://picsum.photos/id/1080/600/400', title: 'Packaging & Box Print' },
  { image: 'https://picsum.photos/id/1084/600/400', title: 'Card Finishing Press' },
  { image: 'https://picsum.photos/id/106/600/400', title: 'Screen Printing Unit' },
]

const WorkshopShowcase = () => {
  return (
    <section className="relative w-full py-12 bg-white text-black overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION TITLE */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Our <span className="relative inline-block border-b-4 border-[#D4020B] pb-1">Workshop.</span> Real People. Real Passion
          </h2>
        </div>

        {/* 3D DRIFTWALL SHOWCASE */}
        <div className="relative w-full h-[450px] sm:h-[550px] mb-12 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-950 shadow-lg">
          <DriftWall
            items={workshopItems}
            columns={5}
            tileWidth={220}
            tileHeight={140}
            gap={16}
            tilt={14}
            turn={-12}
            perspective={1100}
            depth={100}
            speed={38}
            direction="up"
            variance={0.4}
            parallax={0.5}
            lift={50}
            fade={0.5}
            dim={0.7}
            overlayColor="#0a0a0a"
          />
        </div>

        {/* PROUDLY SERVING INDIA CONTENT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
              <MapPin className="w-6 h-6 text-[#D4020B] shrink-0" />
              <span>Proudly Serving <span className="text-[#D4020B]">India</span></span>
            </div>

            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-[#D4020B]">print it red</span> is a trusted printing company based in Indore. For years, we’ve been helping businesses, shops, startups, schools, event planners and individuals across <span className="font-semibold text-black">India</span> with high-quality, affordable and reliable printing solutions. From visiting cards to large flex banners and wedding invitations, we deliver with speed, precision and passion.
            </p>

            <p className="text-neutral-800 text-sm sm:text-base font-medium">
              When you search for <span className="text-[#D4020B] font-bold">“printing near me”</span> in India, we want to be the name you trust.
            </p>
          </div>

          {/* VECTOR CITY SKYLINE ILLUSTRATION */}
          <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
            <svg className="w-full h-32 text-[#D4020B]" viewBox="0 0 500 120" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 100 H490 M30 100 V70 H50 V100 M60 100 V50 H90 V100 M100 100 V80 H120 V100 M130 100 C130 60, 170 60, 170 100 M180 100 V40 H220 V100 M230 100 C230 40, 270 40, 270 100 M280 100 V60 H310 V100 M320 100 V30 L340 10 L360 30 V100 M370 100 V70 H400 V100 M410 100 C410 70, 450 70, 450 100 M460 100 V80 H480 V100" />
              <circle cx="75" cy="30" r="10" strokeDasharray="2 2" />
              <path d="M245 25 L255 15 L265 25 M335 15 L340 5 L345 15" />
            </svg>
            <div className="flex items-center gap-2 mt-4 text-[#D4020B] font-bold text-base sm:text-lg">
              <MapPin className="w-5 h-5 fill-current" />
              <span>Trusted by thousands across India</span>
            </div>
          </div>

        </div>

        {/* RED FOOTER CTA BANNER */}
        <div className="bg-[#D4020B] text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          
          <div className="text-center lg:text-left space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              See what we print
            </h3>
            <p className="text-white/90 text-xs sm:text-sm font-medium">
              explore our 17+ categories and order online in minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            
            {/* EXPLORE PRODUCTS BUTTON */}
            <a
              href="#products"
              className="relative group overflow-hidden bg-white text-[#D4020B] text-sm font-bold px-6 py-3.5 rounded-full shadow-md flex items-center gap-2 transition-all duration-300 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>explore products</span>
                <div className="relative w-4 h-4 overflow-hidden">
                  <motion.div
                    className="flex w-8"
                    initial={{ x: 0 }}
                    whileHover={{ x: -16 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4 shrink-0" />
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </motion.div>
                </div>
              </span>

              <span className="absolute inset-0 bg-neutral-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>

            {/* WHATSAPP OUTLINE BUTTON */}
            <a
              href="https://wa.me/yournumber"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden border-2 border-white text-white text-sm font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:text-[#D4020B]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Chat on WhatsApp</span>
              </span>

              <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}

export default WorkshopShowcase