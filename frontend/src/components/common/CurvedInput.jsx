import React, { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

const CurvedInput = ({
  onSubmit,
  placeholder = "ENTER YOUR EMAIL",
  buttonText = "Get Started",
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && email) onSubmit(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md mx-auto h-[70px] flex items-center justify-center select-none"
    >
      {/* SVG Background Curve */}
      <svg
        viewBox="0 0 400 70"
        className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_4px_20px_rgba(212,2,11,0.15)]"
        preserveAspectRatio="none"
      >
        {/* Curved Main Container Path */}
        <path
          d="M 10,15 Q 200,45 390,15 L 390,55 Q 200,85 10,55 Z"
          className="fill-zinc-900 stroke-zinc-800"
          strokeWidth="1.5"
        />
      </svg>

      {/* Interactive Form Overlay */}
      <div className="relative z-10 flex items-center justify-between w-full px-6 gap-3">
        {/* Left Icon & Input */}
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 rounded-lg bg-[#D4020B] flex items-center justify-center text-white shrink-0 shadow-md">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-white text-xs md:text-sm font-medium tracking-wide placeholder-zinc-500 focus:outline-none"
            required
          />
        </div>

        {/* Curved Button */}
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#D4020B] hover:bg-[#b00108] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95 shrink-0 shadow-lg"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
};

export default CurvedInput;