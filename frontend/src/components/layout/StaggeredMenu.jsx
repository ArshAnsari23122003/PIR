import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#D4020B', '#1e1e22'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  logoUrl = '',
  menuButtonColor = '#000000',
  openMenuButtonColor = '#D4020B',
  accentColor = '#D4020B',
  changeMenuColorOnOpen = true,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const panelRef = useRef(null)
  const preLayersRef = useRef(null)
  const preLayerElsRef = useRef([])
  const plusHRef = useRef(null)
  const plusVRef = useRef(null)
  const iconRef = useRef(null)
  const textInnerRef = useRef(null)
  const textWrapRef = useRef(null)
  const [textLines, setTextLines] = useState(['Menu', 'Close'])

  const openTlRef = useRef(null)
  const closeTweenRef = useRef(null)
  const spinTweenRef = useRef(null)
  const textCycleAnimRef = useRef(null)
  const colorTweenRef = useRef(null)
  const toggleBtnRef = useRef(null)
  const busyRef = useRef(false)
  const itemEntranceTweenRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const preContainer = preLayersRef.current
      const plusH = plusHRef.current
      const plusV = plusVRef.current
      const icon = iconRef.current
      const textInner = textInnerRef.current
      if (!panel || !plusH || !plusV || !icon || !textInner) return

      let preLayers = []
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'))
      }
      preLayerElsRef.current = preLayers

      const offscreen = position === 'left' ? -100 : 100
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 })
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 })
      }
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 })
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 })
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' })
      gsap.set(textInner, { yPercent: 0 })
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor })
    })
    return () => ctx.revert()
  }, [menuButtonColor, position])

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return null

    openTlRef.current?.kill()
    if (closeTweenRef.current) {
      closeTweenRef.current.kill()
      closeTweenRef.current = null
    }
    itemEntranceTweenRef.current?.kill()

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'))
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-item-number'))
    const socialTitle = panel.querySelector('.sm-socials-title')
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'))

    const offscreen = position === 'left' ? -100 : 100
    const layerStates = layers.map(el => ({ el, start: offscreen }))
    const panelStart = offscreen

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 })
    }
    if (numberEls.length) {
      gsap.set(numberEls, { opacity: 0 })
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 })
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 })
    }

    const tl = gsap.timeline({ paused: true })

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07)
    })
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0)
    const panelDuration = 0.65
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    )

    if (itemEls.length) {
      const itemsStartRatio = 0.15
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.8,
          ease: 'power4.out',
          stagger: { each: 0.08, from: 'start' }
        },
        itemsStart
      )
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.5,
            ease: 'power2.out',
            opacity: 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        )
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4
      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: 'power2.out' },
          socialsStart
        )
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' })
            }
          },
          socialsStart + 0.04
        )
      }
    }

    openTlRef.current = tl
    return tl
  }, [position])

  const playOpen = useCallback(() => {
    if (busyRef.current) return
    busyRef.current = true
    const tl = buildOpenTimeline()
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false
      })
      tl.play(0)
    } else {
      busyRef.current = false
    }
  }, [buildOpenTimeline])

  const playClose = useCallback(() => {
    openTlRef.current?.kill()
    openTlRef.current = null
    itemEntranceTweenRef.current?.kill()

    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return

    const all = [...layers, panel]
    closeTweenRef.current?.kill()
    const offscreen = position === 'left' ? -100 : 100
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'))
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 })
        }
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-item-number'))
        if (numberEls.length) {
          gsap.set(numberEls, { opacity: 0 })
        }
        const socialTitle = panel.querySelector('.sm-socials-title')
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'))
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })
        busyRef.current = false
      }
    })
  }, [position])

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current
    if (!icon) return
    spinTweenRef.current?.kill()
    if (opening) {
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.6, ease: 'power4.out', overwrite: 'auto' })
    } else {
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' })
    }
  }, [])

  const animateColor = useCallback(
    opening => {
      const btn = toggleBtnRef.current
      if (!btn) return
      colorTweenRef.current?.kill()
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.1,
          duration: 0.3,
          ease: 'power2.out'
        })
      } else {
        gsap.set(btn, { color: menuButtonColor })
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  )

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor
        gsap.set(toggleBtnRef.current, { color: targetColor })
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor })
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor])

  const animateText = useCallback(opening => {
    const inner = textInnerRef.current
    if (!inner) return
    textCycleAnimRef.current?.kill()

    const currentLabel = opening ? 'Menu' : 'Close'
    const targetLabel = opening ? 'Close' : 'Menu'
    const seq = [currentLabel, targetLabel]
    setTextLines(seq)

    gsap.set(inner, { yPercent: 0 })
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -50,
      duration: 0.4,
      ease: 'power4.out'
    })
  }, [])

  const toggleMenu = useCallback(() => {
    const target = !openRef.current
    openRef.current = target
    setOpen(target)
    if (target) {
      onMenuOpen?.()
      playOpen()
    } else {
      onMenuClose?.()
      playClose()
    }
    animateIcon(target)
    animateColor(target)
    animateText(target)
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose])

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false
      setOpen(false)
      onMenuClose?.()
      playClose()
      animateIcon(false)
      animateColor(false)
      animateText(false)
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose])

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return

    const handleClickOutside = event => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeOnClickAway, open, closeMenu])

  return (
    <div
      className={`relative w-full z-50 pointer-events-none ${isFixed ? 'fixed inset-0 w-screen h-screen overflow-hidden' : ''} ${className}`}
      style={{ '--sm-accent': accentColor }}
    >
      {/* Background Prelayers */}
      <div
        ref={preLayersRef}
        className={`absolute top-0 bottom-0 w-full sm:w-[420px] pointer-events-none z-[45] opacity-0 ${
          position === 'left' ? 'left-0' : 'right-0'
        }`}
        aria-hidden="true"
      >
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c']
          let arr = [...raw]
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2)
            arr.splice(mid, 1)
          }
          return arr.map((c, i) => (
            <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full opacity-0" style={{ background: c }} />
          ))
        })()}
      </div>

      {/* Header Bar */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 sm:p-6 bg-transparent pointer-events-none z-[60]" aria-label="Main navigation header">
        <div className="flex items-center select-none pointer-events-auto" aria-label="Logo">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              className="h-7 sm:h-8 w-auto object-contain block"
              draggable={false}
            />
          ) : (
            <span className="font-black text-xl sm:text-2xl tracking-tight text-neutral-900">
              print it red<span className="text-[#D4020B]">.</span>
            </span>
          )}
        </div>

        <button
          ref={toggleBtnRef}
          className="relative inline-flex items-center gap-2 bg-transparent border-none cursor-pointer font-bold leading-none overflow-visible pointer-events-auto select-none px-2 py-1"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={textWrapRef} className="relative inline-block h-[1.2em] w-[42px] text-right overflow-hidden whitespace-nowrap" aria-hidden="true">
            <span ref={textInnerRef} className="flex flex-col leading-tight">
              {textLines.map((l, i) => (
                <span className="block h-[1.2em] leading-tight text-sm sm:text-base font-semibold" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="relative w-4 h-4 flex-none inline-flex items-center justify-center will-change-transform" aria-hidden="true">
            <span ref={plusHRef} className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform" />
            <span ref={plusVRef} className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform" />
          </span>
        </button>
      </header>

      {/* Sliding Menu Panel */}
      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className={`absolute top-0 w-full sm:w-[420px] h-full bg-white/95 backdrop-blur-xl flex flex-col pt-24 px-6 sm:px-10 pb-8 overflow-y-auto z-[50] pointer-events-auto opacity-0 ${
          position === 'left' ? 'left-0' : 'right-0'
        }`}
        aria-hidden={!open}
      >
        <div className="flex-1 flex flex-col justify-between gap-6">
          <ul className="list-none m-0 p-0 flex flex-col gap-4" role="list">
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="relative overflow-hidden leading-none" key={it.label + idx}>
                  <a
                    className="group relative text-neutral-900 font-extrabold text-3xl sm:text-5xl cursor-pointer leading-none tracking-tight uppercase transition-colors duration-200 inline-flex items-baseline gap-3 no-underline pr-8 hover:text-[var(--sm-accent)]"
                    href={it.link}
                    aria-label={it.ariaLabel}
                    onClick={closeMenu}
                  >
                    <span className="sm-panel-itemLabel inline-block will-change-transform origin-bottom-left">
                      {it.label}
                    </span>
                    {displayItemNumbering && (
                      <span className="sm-panel-item-number text-xs font-bold text-[var(--sm-accent)] tracking-normal pointer-events-none select-none opacity-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    )}
                  </a>
                </li>
              ))
            ) : (
              <li className="relative overflow-hidden leading-none" aria-hidden="true">
                <span className="text-neutral-900 font-extrabold text-3xl uppercase">
                  <span className="sm-panel-itemLabel inline-block">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="pt-6 border-t border-neutral-200 flex flex-col gap-3" aria-label="Social links">
              <h3 className="sm-socials-title text-xs font-bold text-[var(--sm-accent)] uppercase tracking-wider">
                Socials
              </h3>
              <ul className="group/socials list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-sm font-medium text-neutral-800 no-underline relative py-0.5 inline-block transition-opacity duration-300 group-hover/socials:opacity-40 hover:!opacity-100 hover:text-[var(--sm-accent)]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

export default StaggeredMenu