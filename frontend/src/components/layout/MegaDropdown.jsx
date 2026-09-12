import React from 'react'
import { motion } from 'framer-motion'

const CATEGORY_COLUMNS = [
  {
    title: "Business & Stationery",
    items: ["Visiting Cards", "Letterheads", "Custom Envelopes", "ID Cards & Lanyards", "Brand Diaries"],
  },
  {
    title: "Marketing & Signage",
    items: ["Custom Brochures", "Flyers & Leaflets", "Posters & Banners", "Roll-up Standees", "Stickers & Labels"],
  },
  {
    title: "Signage & Branding",
    items: ["Acrylic Letters", "LED Neon Signs", "Vinyl Wall Graphics", "Sunpack Boards"],
  },
  {
    title: "Rigid & Packaging",
    items: ["Luxury Rigid Gift Boxes", "Corrugated Mailers", "Custom Paper Bags", "Monocarton Packaging"],
  },
  {
    title: "Cards & Invitations",
    items: ["Wedding Invitations", "Event Pass Cards", "Greeting Cards", "Custom Sleeves"],
  },
]

const MegaDropdown = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-white text-black shadow-2xl border-t border-neutral-100 z-40"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-8">
        <div className="col-span-9 grid grid-cols-5 gap-6">
          {CATEGORY_COLUMNS.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#D4020B]">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-medium text-neutral-600">
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href="#products"
                      className="hover:text-black transition-colors block py-0.5"
                      onClick={onClose}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-3 bg-neutral-50 rounded-xl p-4 flex flex-col justify-between border border-neutral-100 group cursor-pointer">
          <div className="relative w-full h-44 rounded-lg overflow-hidden mb-3 bg-neutral-200">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
              alt="Custom Rigid Gift Boxes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-[#D4020B] tracking-widest">
              Craftsmanship
            </span>
            <h5 className="font-bold text-sm text-neutral-900 leading-snug">
              Luxury Rigid Gift Boxes
            </h5>
            <p className="text-xs text-neutral-500 mt-1">
              Custom foil stamping & magnetic closures.
            </p>
            <a
              href="#products"
              onClick={onClose}
              className="text-xs font-bold text-black mt-3 inline-flex items-center gap-1 group-hover:text-[#D4020B] transition-colors"
            >
              Explore Craft &rarr;
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MegaDropdown