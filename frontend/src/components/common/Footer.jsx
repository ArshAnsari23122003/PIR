import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { assets } from '../../assets/assets.js';

// --- DEPTH TEXT CONSTANTS & HELPERS ---
const MAX_LAYERS = 64;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getLayerColor = (faceColor, depthColor, index, total) => {
  const progress = total <= 1 ? 1 : index / total;
  const eased = progress * progress;
  const faceMix = Math.round((1 - eased) * 72 + 4);
  return `color-mix(in srgb, ${faceColor} ${faceMix}%, ${depthColor})`;
};

const getTransform = (rotateX, rotateY) => `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg)`;

// --- IN-FILE DEPTH TEXT COMPONENT ---
const DepthText = ({
  text = 'print it red',
  layers = 34,
  depth = 2.4,
  faceColor = '#ffffff',
  depthColor = '#D4020B',
  tilt = 7.5,
  pointerTracking = true,
  smoothing = 0.14,
  perspective = 900,
  autoOrbit = true,
  orbitSpeed = 0.35,
  fontSize = 'clamp(2.5rem, 9vw, 9rem)',
  fontWeight = 900,
  shadow = true,
  className = '',
  style = {}
}) => {
  const rootRef = useRef(null);
  const stageRef = useRef(null);

  const safeLayers = clamp(Math.round(Number(layers) || 1), 2, MAX_LAYERS);
  const safeDepth = clamp(Number(depth) || 0, 0, 12);
  const safeTilt = clamp(Number(tilt) || 0, 0, 12);
  const safeSmoothing = clamp(Number(smoothing) || 0.14, 0.02, 0.35);
  const safePerspective = clamp(Number(perspective) || 900, 300, 2000);
  const safeOrbitSpeed = clamp(Number(orbitSpeed) || 0, 0, 2);

  const baseRotation = useMemo(() => ({ x: -safeTilt * 0.32, y: safeTilt * 0.42 }), [safeTilt]);

  const depthLayers = useMemo(
    () =>
      Array.from({ length: safeLayers }, (_, layerIndex) => {
        const index = safeLayers - layerIndex;
        return {
          index,
          color: getLayerColor(faceColor, depthColor, index, safeLayers),
          transform: `translateZ(${-index * safeDepth}px)`
        };
      }),
    [safeLayers, safeDepth, faceColor, depthColor]
  );

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || typeof window === 'undefined') return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const canTrackPointer = pointerTracking && finePointer && !reducedMotion;

    let frameId = 0;
    let activePointer = false;
    let startTime = performance.now();
    const current = { ...baseRotation };
    const target = { ...baseRotation };

    const applyTransform = () => {
      stage.style.transform = getTransform(current.x, current.y);
    };

    if (reducedMotion) {
      stage.style.transform = getTransform(baseRotation.x, baseRotation.y);
      return undefined;
    }

    const handlePointerMove = event => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      activePointer = true;
      const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.8), -1, 1);
      const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.8), -1, 1);

      target.x = baseRotation.x - y * safeTilt;
      target.y = baseRotation.y + x * safeTilt;
    };

    const handlePointerLeave = () => {
      activePointer = false;
      target.x = baseRotation.x;
      target.y = baseRotation.y;
    };

    if (canTrackPointer) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerleave', handlePointerLeave);
      window.addEventListener('blur', handlePointerLeave);
    }

    const tick = now => {
      if ((!canTrackPointer || !activePointer) && autoOrbit) {
        const elapsed = (now - startTime) / 1000;
        const orbit = elapsed * safeOrbitSpeed * Math.PI * 2;
        const fallbackAmount = canTrackPointer ? 0.18 : 0.55;
        target.x = baseRotation.x + Math.sin(orbit) * safeTilt * fallbackAmount;
        target.y = baseRotation.y + Math.cos(orbit * 0.85) * safeTilt * fallbackAmount;
      }

      current.x += (target.x - current.x) * safeSmoothing;
      current.y += (target.y - current.y) * safeSmoothing;
      applyTransform();
      frameId = requestAnimationFrame(tick);
    };

    applyTransform();
    frameId = requestAnimationFrame(tick);

    return () => {
      if (canTrackPointer) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
        window.removeEventListener('blur', handlePointerLeave);
      }
      cancelAnimationFrame(frameId);
      startTime = 0;
    };
  }, [autoOrbit, baseRotation, pointerTracking, safeOrbitSpeed, safeSmoothing, safeTilt]);

  const rootStyle = {
    ...style,
    perspective: `${safePerspective}px`,
    display: 'inline-block',
    transformStyle: 'preserve-3d',
    fontSize: fontSize,
    fontWeight: fontWeight,
    textTransform: 'lowercase',
    lineHeight: 1,
    userSelect: 'none',
    ...style
  };

  const stageStyle = {
    display: 'inline-block',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.08s linear',
    willChange: 'transform'
  };

  const layerBaseStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    userSelect: 'none'
  };

  const faceStyle = {
    position: 'relative',
    display: 'block',
    whiteSpace: 'nowrap',
    color: faceColor,
    textShadow: shadow ? `0 22px 34px rgba(212, 2, 11, 0.4), 0 4px 8px rgba(0, 0, 0, 0.28)` : 'none'
  };

  return (
    <span ref={rootRef} className={`depth-text-root ${className}`.trim()} style={rootStyle}>
      <span ref={stageRef} style={stageStyle} className="depth-text-stage">
        {depthLayers.map(layer => (
          <span
            aria-hidden="true"
            key={layer.index}
            style={{
              ...layerBaseStyle,
              color: layer.color,
              transform: layer.transform
            }}
          >
            {text}
          </span>
        ))}
        <span style={faceStyle}>{text}</span>
      </span>
    </span>
  );
};

// --- FOOTER COMPONENT ---
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#0A0A0A] text-white pt-16 pb-6 px-6 md:px-12 font-sans border-t border-zinc-800 relative overflow-hidden">
      
      {/* Background Subtle Printing Registration Crosses */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex justify-between px-10 items-center">
        <span className="text-6xl font-mono">+</span>
        <span className="text-6xl font-mono">+</span>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Upper Grid: Link Columns + Newsletter Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sitemap Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] tracking-wider font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 uppercase">
                Navigation
              </span>
              <ul className="space-y-2.5 text-sm text-zinc-400 font-medium">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#corporate" className="hover:text-white transition-colors">Corporate & Bulk Orders</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] tracking-wider font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 uppercase">
                Customer Care
              </span>
              <ul className="space-y-2.5 text-sm text-zinc-400 font-medium">
                <li><a href="#quote" className="hover:text-white transition-colors">Get a Quote</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#track" className="hover:text-white transition-colors">Track Your Order</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#refund" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] tracking-wider font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 uppercase">
                Contact
              </span>
              <div className="space-y-3 text-sm text-zinc-400">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D4020B] shrink-0" />
                  <span>info@printitred.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4020B] shrink-0" />
                  <span>+91 xxxxxxxxxx</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D4020B] shrink-0 mt-0.5" />
                  <span>LG-6 Balaji Tower, Khajuri Bazar, Indore, M.P.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Box (4 cols) */}
          <div className="lg:col-span-4 bg-[#121212] border border-zinc-800/80 p-6 rounded-3xl space-y-5 flex flex-col items-start">
            <h3 className="text-base font-bold text-white tracking-wide">Stay connected</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get direct updates on premium prints, rigid box packaging showcases, and custom orders.
            </p>
            
            <form onSubmit={handleSubmit} className="w-full pt-1">
              <div className="flex items-center justify-between w-full bg-[#1A1A1E] border border-zinc-800/80 rounded-2xl p-2 gap-2 focus-within:border-[#D4020B] transition-colors">
                <div className="flex items-center gap-2.5 flex-1 pl-2">
                  <div className="w-7 h-7 rounded-xl bg-[#D4020B] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full bg-transparent text-white text-xs font-semibold tracking-wide placeholder-zinc-500 uppercase focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4020B] hover:bg-[#b00108] text-white text-[11px] font-bold rounded-xl flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95 shrink-0 uppercase shadow-lg cursor-pointer"
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Social Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-zinc-800/60">
          <div className="flex items-center gap-3">
            <img
              src={assets.logo}
              alt={assets.logoAlt || "PRINT IT RED"}
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <span className="text-xs text-zinc-500 font-medium">
              — every print, made with Junoon.
            </span>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full">
            <span className="text-xs font-semibold text-zinc-400">Follow us</span>
            <div className="flex items-center space-x-2.5">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-zinc-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-zinc-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-zinc-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* 3D EXTRUDED PRINT EFFECT WORDMARK */}
        <div className="pt-10 pb-6 border-t border-zinc-800/80 flex flex-col items-center justify-center overflow-hidden text-center">
          <DepthText
            text="print it red"
            layers={24}
            depth={2.2}
            faceColor="#ffffff"
            depthColor="#D4020B"
            tilt={6}
            autoOrbit={true}
            orbitSpeed={0.25}
            fontSize="clamp(2.5rem, 10vw, 11rem)"
            fontWeight={900}
            className="cursor-default tracking-tighter"
          />
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mt-4 font-mono">
            3D EXTRUDED PRESS // PREMIUM FINISH
          </p>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 pt-4 font-medium border-t border-zinc-900">
          <p>© 2026 print it red</p>
          <div className="flex items-center space-x-6 tracking-wider">
            <a href="#privacy" className="hover:text-zinc-300 transition-colors">PRIVACY</a>
            <a href="#terms" className="hover:text-zinc-300 transition-colors">TERMS</a>
            <a href="#security" className="hover:text-zinc-300 transition-colors">SECURITY</a>
            <a href="#cookies" className="hover:text-zinc-300 transition-colors">COOKIES</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;