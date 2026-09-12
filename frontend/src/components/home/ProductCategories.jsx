import React, { useRef, useState, useEffect } from 'react'
import TiltedCard from './TiltedCard'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

const categories = [
  {
    id: 'business-stationery',
    categoryName: 'Business & Stationery',
    title: 'Visiting Cards, Letterheads & Envelopes',
    description: 'Establish ultimate corporate identity with premium tactile finishes, luxury cotton stocks, and metallic foil accents.',
    items: ['Visiting Cards', 'Letterheads', 'Custom Envelopes', 'ID Cards & Lanyards', 'Brand Diaries'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
    tag: 'Corporate Essentials'
  },
  {
    id: 'marketing-signage',
    categoryName: 'Marketing & Signage',
    title: 'Brochures, Flyers, Posters & Standees',
    description: 'High-impact promotional media engineered with ultra-vibrant archival inks and weather-resistant UV coatings.',
    items: ['Custom Brochures', 'Flyers & Leaflets', 'Posters & Banners', 'Roll-up Standees', 'Stickers & Labels', 'Vinyl Wall Graphics', 'Sunpack Boards'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    tag: 'High Visibility'
  },
  {
    id: 'rigid-packaging',
    categoryName: 'Rigid & Packaging',
    title: 'Luxury Rigid Boxes & Custom Mailers',
    description: 'Bespoke structural packaging solutions engineered to elevate unboxing experiences for elite luxury brands.',
    items: ['Luxury Rigid Gift Boxes', 'Corrugated Mailers', 'Custom Paper Bags', 'Monocarton Packaging'],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
    tag: 'Hero Products'
  },
  {
    id: 'cards-invitations',
    categoryName: 'Cards & Invitations',
    title: 'Wedding Invitations & Event Pass Cards',
    description: 'Intricately laser-cut stationery featuring embossed textures, deckled edges, and custom foil stampings.',
    items: ['Wedding Invitations', 'Event Pass Cards', 'Greeting Cards', 'Custom Sleeves'],
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    tag: 'Bespoke Finishes'
  }
]

const ProductCategories = () => {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollContainerRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll)
      checkScroll()
    }
    return () => el?.removeEventListener('scroll', checkScroll)
  }, [])

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return
    const scrollAmount = direction === 'left' ? -420 : 420
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="w-full bg-white text-neutral-900 py-20 px-4 sm:px-8 md:px-12 border-t border-neutral-100 relative">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* SEO Optimized Heading Block */}
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4020B] bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Industrial Printing & Packaging Solutions
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight mt-3">
            Custom Commercial Printing <br />
            <span className="text-neutral-500">& Bespoke Packaging Catalogue</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed text-balance">
            Explore our precision-crafted print collections designed for leading corporate brands. From high-finish visiting cards and custom corrugated mailers to luxury rigid gift boxes and high-durability promotional signage — engineered with state-of-the-art offset and digital printing technology.
          </p>
        </div>

        {/* Apple-style Glassmorphism Navigation Controls */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll Left"
            className={`p-3.5 rounded-full transition-all duration-300 border backdrop-blur-xl ${
              canScrollLeft
                ? 'bg-white/80 hover:bg-neutral-100 text-black border-neutral-300 shadow-md hover:scale-105 active:scale-95'
                : 'bg-neutral-100/50 text-neutral-300 border-neutral-200 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll Right"
            className={`p-3.5 rounded-full transition-all duration-300 border backdrop-blur-xl ${
              canScrollRight
                ? 'bg-white/80 hover:bg-neutral-100 text-black border-neutral-300 shadow-md hover:scale-105 active:scale-95'
                : 'bg-neutral-100/50 text-neutral-300 border-neutral-200 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 max-w-7xl mx-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex-none w-[310px] sm:w-[380px] md:w-[420px] snap-start"
          >
            <TiltedCard
              imageSrc={cat.image}
              altText={cat.title}
              captionText={`Explore ${cat.categoryName}`}
              containerHeight="480px"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.03}
              rotateAmplitude={10}
              displayOverlayContent={true}
              overlayContent={
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-white border border-white/20">
                      {cat.tag}
                    </span>
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block">
                      {cat.categoryName}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight leading-snug mt-0.5">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                    {cat.items.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-medium bg-black/40 text-neutral-200 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                    {cat.items.length > 4 && (
                      <span className="text-[10px] font-bold bg-red-600/80 text-white px-2 py-0.5 rounded">
                        +{cat.items.length - 4} More
                      </span>
                    )}
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductCategories