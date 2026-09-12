import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MacPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Junoon Engine...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Apple-style non-linear loading timeline
    const steps = [
      { target: 20, delay: 200, message: 'Initializing Junoon Core...' },
      { target: 45, delay: 350, message: 'Calibrating CMYK Color Engines...' },
      { target: 70, delay: 400, message: 'Loading Rigid Box Mesh Vectors...' },
      { target: 90, delay: 250, message: 'Rendering High-Precision Prints...' },
      { target: 100, delay: 300, message: 'Ready.' },
    ];

    let stepIndex = 0;

    const executeStep = () => {
      if (stepIndex < steps.length) {
        const current = steps[stepIndex];
        setProgress(current.target);
        setStatusText(current.message);
        stepIndex++;
        setTimeout(executeStep, current.delay);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 400);
      }
    };

    const timer = setTimeout(executeStep, 200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-between py-16 px-6 select-none font-sans"
        >
          {/* Top SEO Micro-Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-zinc-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4020B] animate-ping" />
            <span>Indore • Pan-India Premium Printing</span>
          </motion.div>

          {/* Center Apple-Inspired Boot Icon & Loading Bar */}
          <div className="flex flex-col items-center space-y-8 w-full max-w-xs">
            
            {/* Custom Brand Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-24 h-24 bg-[#D4020B]/20 rounded-full blur-2xl animate-pulse" />
              <svg
                className="w-20 h-20 text-white relative z-10"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50C85 30.67 69.33 15 50 15ZM50 77C35.09 77 23 64.91 23 50C23 35.09 35.09 23 50 23C64.91 23 77 35.09 77 50C77 64.91 64.91 77 50 77Z"
                  fill="currentColor"
                  fillOpacity="0.15"
                />
                <path
                  d="M50 25C36.19 25 25 36.19 25 50C25 63.81 36.19 75 50 75C56.9 75 63.15 72.2 67.68 67.68L58.5 58.5C56.32 60.68 53.32 62 50 62C43.37 62 38 56.63 38 50C38 43.37 43.37 38 50 38C53.32 38 56.32 39.32 58.5 41.5L67.68 32.32C63.15 27.8 56.9 25 50 25Z"
                  fill="#D4020B"
                />
              </svg>
            </motion.div>

            {/* macOS Progress Track */}
            <div className="w-full space-y-3 flex flex-col items-center">
              <div className="w-48 sm:w-56 h-[4px] bg-zinc-800 rounded-full overflow-hidden relative border border-zinc-800/80">
                <motion.div
                  className="h-full bg-gradient-to-r from-zinc-200 via-white to-[#D4020B] rounded-full shadow-[0_0_10px_#D4020B]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeInOut', duration: 0.35 }}
                />
              </div>

              {/* Status Indicator Text */}
              <p className="text-[11px] font-medium text-zinc-500 tracking-wide font-mono transition-all">
                {statusText}
              </p>
            </div>
          </div>

          {/* Bottom SEO Footnote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-1"
          >
            <h1 className="text-xs font-bold tracking-[0.3em] text-white">
              print it red
            </h1>
            <p className="text-[10px] text-zinc-400 tracking-wider">
              Luxury Rigid Boxes • Custom Packaging • Commercial Offset
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MacPreloader;