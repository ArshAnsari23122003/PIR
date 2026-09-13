import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ChevronDown, Search, X } from 'lucide-react'
import MegaDropdown from './MegaDropdown'
import StaggeredMenu from './StaggeredMenu'
import assets from '../../assets/assets'

const WhatsAppIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 2C6.477 2 2 6.477 2 12c0 2.159.685 4.158 1.854 5.793L2.5 21.5l3.863-1.314A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.727 0-3.33-.483-4.707-1.321l-.338-.207-2.292.78.793-2.228-.227-.361A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
  </svg>
)

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Products', ariaLabel: 'View our products', link: '/products' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
]

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isStaggeredMenuOpen, setIsStaggeredMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isGetQuotePage = location.pathname === '/get-quote'
  const isContactPage = location.pathname === '/contact'
  const { scrollY } = useScroll()

  // Reset states on route transition
  useEffect(() => {
    setIsMegaOpen(false)
    setIsSearchOpen(false)
  }, [location.pathname])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > 36) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }

    if (latest > 150 && latest > previous && !isMegaOpen && !isSearchOpen && !isStaggeredMenuOpen) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  })

  // Solid navbar if on non-home pages, scrolled, hovered, or dropdown opened
  const isSolid = !isHomePage || isScrolled || isHovered || isMegaOpen || isStaggeredMenuOpen

  // Prevent re-navigation loops when already on /get-quote
  const handleGetQuoteClick = (e) => {
    if (isGetQuotePage) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Print It Red',
    description: 'Every print, made with junoon. Premier offset & digital printing services.',
    url: 'https://printitred.com',
    logo: assets.logo
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed left-0 w-full z-40 transition-all duration-300 top-0 md:top-9 ${
          isSolid
            ? "bg-white text-black shadow-md border-b border-neutral-200/80"
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 grid grid-cols-3 items-center relative">
          
          {/* LEFT COLUMN */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold">
              <Link
                to="/"
                className={`transition-opacity hover:opacity-70 ${
                  isHomePage ? 'text-[#D4020B] font-bold' : ''
                }`}
              >
                Home
              </Link>
              <div
                className="relative h-20 flex items-center cursor-pointer"
                onMouseEnter={() => setIsMegaOpen(true)}
              >
                <Link to="/products" className="flex items-center gap-1 hover:opacity-70 transition-opacity outline-none uppercase font-semibold">
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMegaOpen ? "rotate-180" : ""}`} />
                </Link>
              </div>
              <Link
                to="/about"
                className={`transition-opacity hover:opacity-70 ${
                  location.pathname === '/about' ? 'text-[#D4020B] font-bold' : ''
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`transition-opacity hover:opacity-70 ${
                  isContactPage ? 'text-[#D4020B] font-bold' : ''
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* CENTER COLUMN: Logo */}
          <div className="flex justify-center items-center">
            <Link to="/" className="flex items-center gap-2">
              {assets.logo ? (
                <img
                  src={assets.logo}
                  alt={assets.logoAlt || "Print It Red"}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-lg md:text-2xl font-black tracking-tighter lowercase font-serif whitespace-nowrap">
                  print it red<span className="text-[#D4020B]">.</span>
                </span>
              )}
            </Link>
          </div>

          {/* RIGHT COLUMN: Utilities */}
          <div className="flex items-center justify-end gap-2 md:gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Toggle Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919179107299"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full border transition-colors ${
                isSolid
                  ? "border-neutral-300/80 text-black hover:bg-black/5"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            {/* GET QUOTE BUTTON */}
            <Link
              to="/get-quote"
              onClick={handleGetQuoteClick}
              className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-widest px-4 md:px-5 py-2.5 bg-[#D4020B] text-white rounded-full hover:bg-[#b00108] transition-colors shadow-sm active:scale-95"
            >
              Get Quote
            </Link>
          </div>
        </div>

        {/* MOBILE STAGGERED MENU OVERLAY */}
        <div className="md:hidden">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering={true}
            menuButtonColor={isSolid ? '#000000' : '#ffffff'}
            openMenuButtonColor="#000000"
            changeMenuColorOnOpen={true}
            colors={['#B497CF', '#D4020B']}
            logoUrl={assets.logo}
            accentColor="#D4020B"
            isFixed={true}
            onMenuOpen={() => setIsStaggeredMenuOpen(true)}
            onMenuClose={() => setIsStaggeredMenuOpen(false)}
          />
        </div>

        {/* SEARCH BAR OVERLAY */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full bg-white/95 backdrop-blur-md border-t border-neutral-200 text-black px-4 md:px-6 py-3 md:py-4 shadow-inner overflow-hidden"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (searchQuery.trim()) {
                    window.location.href = `/#search?q=${encodeURIComponent(searchQuery)}`
                    setIsSearchOpen(false)
                  }
                }}
                className="max-w-3xl mx-auto flex items-center gap-3"
              >
                <Search className="w-5 h-5 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent text-xs md:text-sm focus:outline-none placeholder:text-neutral-400 text-neutral-800"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 hover:text-[#D4020B] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DESKTOP MEGA DROPDOWN */}
        <AnimatePresence>
          {isMegaOpen && <MegaDropdown onClose={() => setIsMegaOpen(false)} />}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default Navbar