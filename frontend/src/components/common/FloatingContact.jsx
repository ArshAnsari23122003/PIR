import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CUSTOM SVG ICONS ---
const Icons = {
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  ),
  AppleMail: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
      <path d="M20.5 4h-17C2.12 4 1 5.12 1 6.5v11C1 18.88 2.12 20 3.5 20h17c1.38 0 2.5-1.12 2.5-2.5v-11C23 5.12 21.88 4 20.5 4zm-17 1.5h17c.55 0 1 .45 1 1v1.65l-9.5 5.94-9.5-5.94V6.5c0-.55.45-1 1-1zm17 13h-17c-.55 0-1-.45-1-1v-8.46l9.5 5.94 9.5-5.94V17.5c0 .55-.45 1-1 1z"/>
    </svg>
  ),
  ApplePhone: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
      <path d="M21.384 17.752a2.108 2.108 0 0 1-.522 2.251c-1.353 1.354-3.55 1.847-5.955.772-2.906-1.298-5.836-3.606-8.083-5.853-2.247-2.247-4.555-5.177-5.853-8.083-1.075-2.405-.582-4.602.772-5.955a2.108 2.108 0 0 1 2.251-.522c1.196.402 2.128 1.488 2.628 2.684l.654 1.567c.465 1.116.29 2.406-.447 3.336l-1.096 1.381c1.238 2.52 3.328 4.61 5.848 5.848l1.381-1.096c.93-.737 2.22-.912 3.336-.447l1.567.654c1.196.5 2.282 1.432 2.684 2.628z"/>
    </svg>
  ),
  ChatBubble: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
      <path d="M12 2C6.477 2 2 6.037 2 11c0 2.87 1.528 5.426 3.906 7.042.158.107.258.28.267.472l.07 1.523c.017.378.366.65.733.578l1.968-.394c.162-.032.33-.01.483.064A10.74 10.74 0 0 0 12 20c5.523 0 10-4.037 10-9s-4.477-9-10-9zm-2.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  )
};

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  const contactMethods = {
    whatsapp: {
      icon: <Icons.WhatsApp />,
      accent: 'bg-[#25D366]',
      glassBg: 'bg-green-900/70',
      glassBorder: 'border-green-700/50',
      label: 'WhatsApp',
      toast: 'Opening WhatsApp...',
      action: () => window.open('https://wa.me/919179107299?text=Hello%20print%20it%20red,%20I%20have%20an%20inquiry.', '_blank')
    },
    mail: {
      icon: <Icons.AppleMail />,
      accent: 'bg-[#007AFF]',
      glassBg: 'bg-blue-900/70',
      glassBorder: 'border-blue-700/50',
      label: 'Email Us',
      toast: 'Opening Mail Client...',
      action: () => window.location.href = 'mailto:info@printitred.com?subject=print%20it%20red%20Inquiry'
    },
    call: {
      icon: <Icons.ApplePhone />,
      accent: 'bg-[#D4020B]',
      glassBg: 'bg-red-900/70',
      glassBorder: 'border-red-700/50',
      label: 'Call Now',
      toast: 'Connecting Call...',
      action: () => window.location.href = 'tel:+919179107299'
    }
  };

  const handleAction = (methodKey) => {
    setIsOpen(false);
    setActiveAction(methodKey);

    setTimeout(() => {
      contactMethods[methodKey].action();
      setActiveAction(null);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {/* Top Dynamic Island Toast */}
      <AnimatePresence>
        {activeAction && (
          <motion.div 
            initial={{ y: -100, scale: 0.5, opacity: 0, x: '-50%' }}
            animate={{ y: 0, scale: 1, opacity: 1, x: '-50%' }}
            exit={{ y: -100, scale: 0.5, opacity: 0, x: '-50%' }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`absolute top-10 left-1/2 z-[110] backdrop-blur-xl text-white px-6 py-4 rounded-full flex items-center gap-4 shadow-2xl border pointer-events-none ${contactMethods[activeAction].glassBg} ${contactMethods[activeAction].glassBorder}`}
          >
            <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${contactMethods[activeAction].accent}`} />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                {contactMethods[activeAction].label}
              </span>
              <span className="text-[10px] text-white/80 mt-0.5">
                {contactMethods[activeAction].toast}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Screen Pop Animation (Tinted Glass Squircle) */}
      <AnimatePresence>
        {activeAction && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[105] flex items-center justify-center pointer-events-auto"
          >
            <motion.div 
              initial={{ y: 200, scale: 0.2, rotate: 10 }} animate={{ y: 0, scale: 1, rotate: 0 }} exit={{ y: 200, scale: 0.2, rotate: -10 }} transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className={`w-56 h-56 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-6 border backdrop-blur-2xl relative ${contactMethods[activeAction].glassBg} ${contactMethods[activeAction].glassBorder}`}
            >
              <div className="scale-[2.5] mb-6">
                {contactMethods[activeAction].icon}
              </div>
              <span className="text-white font-black text-sm tracking-widest lowercase text-center mt-4 drop-shadow-md">
                print it red
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM RIGHT FLOATING MENU */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-4 pointer-events-auto">
        
        {/* Menu Items (Vertical Stack) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8, transformOrigin: "bottom right" }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-3 mb-2"
            >
              {Object.entries(contactMethods).map(([key, method]) => (
                <button key={key} onClick={() => handleAction(key)} className="group flex items-center gap-3 justify-end cursor-pointer">
                  {/* Tinted Glass Label */}
                  <span className={`${method.glassBg} ${method.glassBorder} backdrop-blur-xl border text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0`}>
                    {method.label}
                  </span>
                  
                  {/* Tinted Glass Squircle Icon Button */}
                  <div className={`w-14 h-14 ${method.glassBg} ${method.glassBorder} backdrop-blur-xl border shadow-xl rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    {method.icon}
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button Attractor (Label Only, No Ping) */}
        <div className="relative flex items-center gap-4 justify-end">
          <AnimatePresence>
            {!isOpen && (
              <motion.span 
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                className="absolute right-20 bg-[#D4020B] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg whitespace-nowrap pointer-events-none before:content-[''] before:absolute before:right-[-4px] before:top-1/2 before:-translate-y-1/2 before:border-[6px] before:border-transparent before:border-l-[#D4020B]"
              >
                Need Help?
              </motion.span>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-16 h-16 rounded-[1.5rem] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10 ${isOpen ? 'bg-black/40 backdrop-blur-xl border border-white/10 rotate-90' : 'bg-[#D4020B] border border-red-400'}`}
          >
            {isOpen ? <Icons.Close /> : <Icons.ChatBubble />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FloatingContact;