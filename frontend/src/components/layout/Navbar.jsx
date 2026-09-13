import React, { useState, useEffect, useRef, useId, useLayoutEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ChevronDown, Search, X, Mail, ArrowRight } from 'lucide-react'
import MegaDropdown from './MegaDropdown'
import StaggeredMenu from './StaggeredMenu'
import assets from '../../assets/assets'

// --- CURVED INPUT COMPONENT & HELPERS ---
const DEG = 180 / Math.PI;
const round2 = n => Math.round(n * 100) / 100;

const hexToRgba = (hex, alpha) => {
  let h = String(hex).replace('#', '');
  if (h.length === 3)
    h = h.split('').map(c => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(n)) return hex;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const SHADOWS = { sm: [5, 12, 0.3], md: [10, 24, 0.4], lg: [16, 40, 0.52] };

const THEMES = {
  dark: {
    backgroundColor: '#0a0a0a',
    textColor: '#f5f5f5',
    placeholderColor: '#a1a1aa',
    borderColor: '#27272a',
    buttonColor: '#D4020B',
    buttonTextColor: '#ffffff',
    shadowColor: '#000000'
  }
};

const buildGeometry = (width, bend, thickness, pad) => {
  const W = width;
  const T = thickness;
  const s = Math.max(-W * 0.35, Math.min(bend, W * 0.35));
  const a = Math.abs(s);
  const dir = s >= 0 ? 1 : -1;
  const svgH = T + a + pad * 2;

  if (a < 0.75) {
    const midY = pad + T / 2;
    return {
      straight: true, W, T, svgH, uPerLen: 1,
      point: (u, v) => [u, midY + v],
      angleAt: () => 0,
      uFromPoint: x => x
    };
  }

  const R = (W * W * 0.25 + a * a) / (2 * a);
  const cx = W / 2;
  const apexY = pad + T / 2 + (dir > 0 ? 0 : a);
  const cy = apexY + dir * R;
  const phi = Math.asin(Math.min(1, W / (2 * R)));

  return {
    straight: false, W, T, svgH, R, dir,
    uPerLen: W / (2 * R * phi),
    point: (u, v) => {
      const th = ((u - cx) / cx) * phi;
      const rho = R - dir * v;
      return [cx + rho * Math.sin(th), cy - dir * rho * Math.cos(th)];
    },
    angleAt: u => dir * ((u - cx) / cx) * phi * DEG,
    uFromPoint: (x, y) => {
      const th = Math.atan2(x - cx, dir * (cy - y));
      return cx + (th / phi) * cx;
    }
  };
};

const fmt = (g, u, v) => {
  const [x, y] = g.point(u, v);
  return `${round2(x)} ${round2(y)}`;
};

const edgeSeg = (g, uTo, v, ltr) => {
  if (g.straight) return `L ${fmt(g, uTo, v)}`;
  const rho = round2(g.R - g.dir * v);
  const sweep = ltr === g.dir > 0 ? 1 : 0;
  return `A ${rho} ${rho} 0 0 ${sweep} ${fmt(g, uTo, v)}`;
};

const bentRectPath = (g, u0, u1, vTop, vBot, radius) => {
  const rc = Math.max(0, Math.min(radius, (vBot - vTop) / 2, (u1 - u0) / 2));
  return [
    `M ${fmt(g, u0 + rc, vTop)}`,
    edgeSeg(g, u1 - rc, vTop, true),
    `Q ${fmt(g, u1, vTop)} ${fmt(g, u1, vTop + rc)}`,
    `L ${fmt(g, u1, vBot - rc)}`,
    `Q ${fmt(g, u1, vBot)} ${fmt(g, u1 - rc, vBot)}`,
    edgeSeg(g, u0 + rc, vBot, false),
    `Q ${fmt(g, u0, vBot)} ${fmt(g, u0, vBot - rc)}`,
    `L ${fmt(g, u0, vTop + rc)}`,
    `Q ${fmt(g, u0, vTop)} ${fmt(g, u0 + rc, vTop)}`,
    'Z'
  ].join(' ');
};

const bentLinePath = (g, u0, u1, v) => `M ${fmt(g, u0, v)} ${edgeSeg(g, u1, v, true)}`;

const CurvedInput = ({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  placeholder = 'Search products...',
  buttonText = 'Search',
  type = 'search',
  name,
  ariaLabel,
  theme = 'dark',
  width = '100%',
  bend = 20,
  height = 58,
  cornerRadius = 18,
  borderWidth = 1.5,
  fontSize = 15,
  backgroundColor,
  textColor,
  placeholderColor,
  borderColor,
  buttonColor,
  buttonTextColor,
  iconColor,
  shadowSize = 'md',
  shadowColor,
  showButton = true,
  showIcon = true,
  icon,
  className = '',
  style
}) => {
  const uid = useId().replace(/:/g, '');
  const layoutPathId = `ci-text-${uid}`;
  const buttonPathId = `ci-btn-${uid}`;
  const clipId = `ci-clip-${uid}`;

  const rootRef = useRef(null);
  const svgRef = useRef(null);
  const inputRef = useRef(null);
  const textRef = useRef(null);
  const btnMeasureRef = useRef(null);
  const scrollRef = useRef(0);

  const [w, setW] = useState(0);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [caretIndex, setCaretIndex] = useState(defaultValue.length);
  const [focused, setFocused] = useState(false);
  const [caretU, setCaretU] = useState(0);
  const [scrollLen, setScrollLen] = useState(0);
  const [btnTextW, setBtnTextW] = useState(0);

  const val = value !== undefined ? value : innerValue;
  const display = val;

  const palette = THEMES[theme] || THEMES.dark;
  const bgColor = backgroundColor ?? palette.backgroundColor;
  const fgColor = textColor ?? palette.textColor;
  const phColor = placeholderColor ?? palette.placeholderColor;
  const strokeColor = borderColor ?? palette.borderColor;
  const accentColor = buttonColor ?? palette.buttonColor;
  const btnFgColor = buttonTextColor ?? palette.buttonTextColor;
  const shColor = shadowColor ?? palette.shadowColor;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const cw = entries[0]?.contentRect?.width ?? el.clientWidth;
      setW(Math.round(cw));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pad = Math.ceil(borderWidth / 2) + 6;
  const geom = useMemo(() => (w > 2 ? buildGeometry(w, bend, height, pad) : null), [w, bend, height, pad]);

  const layout = useMemo(() => {
    if (!geom) return null;
    const T = height;
    const btnInset = Math.max(5, borderWidth + 4);
    const chipH = Math.min(34, Math.max(16, T * 0.34));
    const chipW = chipH * 1.25;
    const iconU = 22 + chipW / 2;
    const textStartU = showIcon ? 22 + chipW + 13 : 24;
    const btnW = showButton ? Math.max(btnTextW + fontSize * 2.7, T * 1.35) : 0;
    const btnU1 = geom.W - btnInset;
    const btnU0 = btnU1 - btnW;
    const textEndU = Math.max(textStartU + 20, showButton ? btnU0 - 14 : geom.W - 24);
    const winLen = (textEndU - textStartU) / geom.uPerLen;
    return { btnInset, chipH, chipW, iconU, textStartU, textEndU, btnU0, btnU1, winLen };
  }, [geom, height, borderWidth, btnTextW, fontSize, showIcon, showButton]);

  useLayoutEffect(() => {
    if (btnMeasureRef.current) {
      const bw = btnMeasureRef.current.getComputedTextLength();
      setBtnTextW(prev => (Math.abs(prev - bw) > 0.5 ? bw : prev));
    }
    if (!geom || !layout) return;
    const textEl = textRef.current;
    const caret = Math.min(caretIndex, display.length);
    let caretLen = 0;
    let totalLen = 0;
    if (textEl && display.length) {
      try {
        totalLen = textEl.getSubStringLength(0, display.length);
        caretLen = caret > 0 ? textEl.getSubStringLength(0, caret) : 0;
      } catch {
        totalLen = 0; caretLen = 0;
      }
    }
    let next = scrollRef.current;
    if (caretLen - next > layout.winLen - 2) next = caretLen - layout.winLen + 2;
    if (caretLen - next < 0) next = caretLen;
    if (totalLen - next < layout.winLen) next = Math.max(0, totalLen - layout.winLen);
    next = Math.max(0, next);
    if (Math.abs(next - scrollRef.current) > 0.5) {
      scrollRef.current = next;
      setScrollLen(next);
    }
    setCaretU(layout.textStartU + (caretLen - next) * geom.uPerLen);
  });

  const commitValue = v => {
    if (value === undefined) setInnerValue(v);
    onChange?.(v);
  };

  const handleInputChange = e => {
    commitValue(e.target.value);
    setCaretIndex(e.target.selectionStart ?? e.target.value.length);
  };

  const handleSelect = e => {
    setCaretIndex(e.target.selectionStart ?? e.target.value.length);
  };

  const handleSubmit = e => {
    if (e?.preventDefault) e.preventDefault();
    if (onSubmit) onSubmit(val);
  };

  const handleSurfaceClick = e => {
    const input = inputRef.current;
    if (!input) return;
    input.focus();
  };

  const shadow = SHADOWS[shadowSize];
  const svgStyle = shadow ? { filter: `drop-shadow(0 ${shadow[0]}px ${shadow[1]}px ${hexToRgba(shColor, shadow[2])})` } : undefined;

  let content = null;
  if (geom && layout) {
    const T = height;
    const vBase = fontSize * 0.34;
    const scrollU = scrollLen * geom.uPerLen;
    const bandPath = bentRectPath(geom, 0, geom.W, -T / 2, T / 2, cornerRadius);
    const layoutPath = bentLinePath(geom, layout.textStartU - scrollU, geom.W, vBase);
    const clipPath = bentRectPath(geom, layout.textStartU - 6, layout.textEndU + 8, -T / 2, T / 2, 0);

    const chipFill = iconColor || accentColor;
    const { chipW, chipH } = layout;
    const [ix, iy] = geom.point(layout.iconU, 0);
    const iconAngle = geom.angleAt(layout.iconU);

    const [caretX, caretY] = geom.point(caretU, 0);
    const caretAngle = geom.angleAt(caretU);
    const caretH = Math.min(T * 0.58, fontSize * 1.45);

    const btnH = T - layout.btnInset * 2;
    const buttonPath = showButton ? bentRectPath(geom, layout.btnU0, layout.btnU1, -T / 2 + layout.btnInset, T / 2 - layout.btnInset, Math.min(cornerRadius * 0.72, btnH / 2)) : '';
    const buttonTextPath = showButton ? bentLinePath(geom, layout.btnU0, layout.btnU1, vBase) : '';

    content = (
      <svg
        ref={svgRef}
        className="overflow-visible w-full cursor-text select-none"
        width={geom.W}
        height={round2(geom.svgH)}
        viewBox={`0 0 ${geom.W} ${round2(geom.svgH)}`}
        style={svgStyle}
        onPointerDown={e => e.preventDefault()}
        onClick={handleSurfaceClick}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={clipPath} />
          </clipPath>
        </defs>

        <path d={bandPath} fill={bgColor} stroke={strokeColor} strokeWidth={borderWidth} />
        <path id={layoutPathId} d={layoutPath} fill="none" />

        {showIcon && (
          <g transform={`translate(${round2(ix)} ${round2(iy)}) rotate(${round2(iconAngle)})`}>
            {icon || (
              <rect x={-chipW / 2} y={-chipH / 2} width={chipW} height={chipH} rx={chipH * 0.27} fill={chipFill} />
            )}
          </g>
        )}

        <g clipPath={`url(#${clipId})`}>
          <text ref={textRef} style={{ fontSize: `${fontSize}px`, fontWeight: 500 }} fill={fgColor} xmlSpace="preserve">
            <textPath href={`#${layoutPathId}`}>{display}</textPath>
          </text>
          {!display && placeholder && (
            <text style={{ fontSize: `${fontSize}px`, fontWeight: 500 }} fill={phColor} xmlSpace="preserve">
              <textPath href={`#${layoutPathId}`}>{placeholder}</textPath>
            </text>
          )}
          {focused && (
            <g transform={`translate(${round2(caretX)} ${round2(caretY)}) rotate(${round2(caretAngle)})`}>
              <line y1={-caretH / 2} y2={caretH / 2} stroke={fgColor} strokeWidth="1.5" strokeLinecap="round">
                <animate attributeName="opacity" values="1;0" dur="1.06s" calcMode="discrete" repeatCount="indefinite" />
              </line>
            </g>
          )}
        </g>

        {showButton && (
          <g
            role="button"
            tabIndex={0}
            aria-label={buttonText}
            className="cursor-pointer outline-none"
            onClick={e => { e.stopPropagation(); handleSubmit(); }}
            onPointerDown={e => e.stopPropagation()}
          >
            <path d={buttonPath} fill={accentColor} />
            <path id={buttonPathId} d={buttonTextPath} fill="none" />
            <text fill={btnFgColor} textAnchor="middle" style={{ fontSize: `${fontSize}px`, fontWeight: 600, pointerEvents: 'none' }}>
              <textPath href={`#${buttonPathId}`} startOffset="50%">{buttonText}</textPath>
            </text>
          </g>
        )}
      </svg>
    );
  }

  return (
    <form ref={rootRef} className={`relative block w-full ${className}`} style={{ width: typeof width === 'number' ? `${width}px` : width, ...style }} onSubmit={handleSubmit}>
      {content}
      <input
        ref={inputRef}
        className="absolute inset-0 w-full h-full opacity-0 border-0 p-0 m-0 bg-transparent text-transparent caret-transparent pointer-events-none outline-none"
        type="search"
        name={name}
        value={val}
        onChange={handleInputChange}
        onSelect={handleSelect}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
    </form>
  );
};

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
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

  const isSolid = !isHomePage || isScrolled || isHovered || isMegaOpen || isStaggeredMenuOpen

  const handleGetQuoteClick = (e) => {
    if (isGetQuotePage) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'print it red',
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
              <Link to="/" className={`transition-opacity hover:opacity-70 ${isHomePage ? 'text-[#D4020B] font-bold' : ''}`}>
                Home
              </Link>
              <div className="relative h-20 flex items-center cursor-pointer" onMouseEnter={() => setIsMegaOpen(true)}>
                <Link to="/products" className="flex items-center gap-1 hover:opacity-70 transition-opacity outline-none uppercase font-semibold">
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMegaOpen ? "rotate-180" : ""}`} />
                </Link>
              </div>
              <Link to="/about" className={`transition-opacity hover:opacity-70 ${location.pathname === '/about' ? 'text-[#D4020B] font-bold' : ''}`}>
                About
              </Link>
              <Link to="/contact" className={`transition-opacity hover:opacity-70 ${isContactPage ? 'text-[#D4020B] font-bold' : ''}`}>
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
                  alt={assets.logoAlt || "print it red"}
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
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:opacity-70 transition-opacity cursor-pointer"
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

        {/* CENTERED FULLSCREEN BLURRED SEARCH OVERLAY */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-xl flex flex-col items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.8, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full max-w-2xl relative flex flex-col items-center"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute -top-16 right-0 w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer shadow-xl"
                  aria-label="Close search"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Search Bar Container */}
                <div className="w-full">
                  <CurvedInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search business cards, packaging, banners..."
                    buttonText="Search"
                    theme="dark"
                    bend={24}
                    height={70}
                    width="100%"
                    onSubmit={(val) => {
                      if (val.trim()) {
                        window.location.href = `/#search?q=${encodeURIComponent(val)}`
                        setIsSearchOpen(false)
                      }
                    }}
                  />
                </div>
                
                <p className="text-neutral-400 text-xs mt-6 tracking-widest uppercase font-mono">
                  Press enter or click search to find products
                </p>
              </motion.div>
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