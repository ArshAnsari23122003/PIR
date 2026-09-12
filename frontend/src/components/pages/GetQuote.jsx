import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  Star, 
  ChevronRight, 
  FileCheck, 
  Sparkles, 
  MapPin, 
  Plus, 
  Minus,
  ExternalLink
} from 'lucide-react';

export default function GetQuoteSection() {
  // --- Dynamic Island State ---
  const [toast, setToast] = useState({ show: false, title: '', subtext: '', icon: null });

  const showIslandToast = (title, subtext, icon = <Sparkles className="w-4 h-4 text-emerald-400" />) => {
    setToast({ show: true, title, subtext, icon });
    setTimeout(() => {
      setToast({ show: false, title: '', subtext: '', icon: null });
    }, 4000);
  };

  // --- Form States ---
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    quantity: 100,
    deliveryDate: '',
    requirements: ''
  });

  const [uploadState, setUploadState] = useState({
    file: null,
    progress: 0,
    isUploading: false,
    isCompleted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Handlers ---
  const handleQuantity = (delta) => {
    setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity + delta) }));
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploadState({ file: selectedFile, progress: 0, isUploading: true, isCompleted: false });

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 15;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadState({ file: selectedFile, progress: 100, isUploading: false, isCompleted: true });
        showIslandToast("File Ready!", `${selectedFile.name} attached successfully`, <FileCheck className="w-4 h-4 text-emerald-400" />);
      } else {
        setUploadState(prev => ({ ...prev, progress: currentProgress }));
      }
    }, 150);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showIslandToast(
        "Quote Request Sent!",
        "We'll get back to you with the best quote shortly.",
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      );
    }, 1800);
  };

  const openGoogleMaps = () => {
    showIslandToast("Opening Google Maps", "Navigating to Print It Red HQ", <MapPin className="w-4 h-4 text-red-400" />);
    setTimeout(() => {
      window.open("https://maps.google.com/?q=Print+It+Red+Indore", "_blank");
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-white pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-12 font-sans select-none overflow-x-hidden">
      
      {/* Dynamic Island Toast */}
      <AnimatePresence>
        {toast.show && (
          <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
            <motion.div 
              initial={{ y: -60, scale: 0.7, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -50, scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="pointer-events-auto bg-black/90 text-white px-5 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl flex items-center space-x-3 border border-white/10 min-w-[290px] max-w-md"
            >
              <div className="p-2 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/5">
                {toast.icon}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-xs sm:text-sm font-semibold text-slate-100 leading-tight truncate">{toast.title}</h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{toast.subtext}</p>
              </div>
              <div className="flex items-center space-x-1 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HERO HEADER */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            let’s <span className="text-[#D4020B] relative inline-block">
              print it red.
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#D4020B]" />
            </span><br />
            Reach out now.
          </h1>
          <p className="text-slate-600 font-medium text-sm sm:text-base max-w-lg">
            Have a project in mind? Share your requirements and we’ll get back to you with the best quote in no time.
          </p>
        </div>

        {/* TOP TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 bg-white border border-red-300/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-red-500/5 relative flex flex-col justify-between">
            <div>
              <div className="space-y-1 mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Get a Quote</h2>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Fill the details below and we'll get back to you with the best possible quote.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4020B]/40 focus:border-[#D4020B] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4020B]/40 focus:border-[#D4020B] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4020B]/40 focus:border-[#D4020B] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Product Category</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#D4020B]/40 focus:border-[#D4020B] transition-all"
                  >
                    <option value="" disabled>Select a product category</option>
                    <option value="stickers">Stickers (UV DTF / Regular)</option>
                    <option value="visiting_cards">Visiting & Business Cards</option>
                    <option value="12x18_prints">12x18 Inch Sheets</option>
                    <option value="invitations">Event Invitation Cards</option>
                    <option value="id_cards">ID Cards & Lanyards</option>
                    <option value="other">Custom Printing Service</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Quantity</label>
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden px-2 py-1 bg-white">
                      <button
                        type="button"
                        onClick={() => handleQuantity(-50)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                        className="w-full text-center text-sm font-semibold border-none focus:ring-0 text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => handleQuantity(50)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Preferred Delivery Date</label>
                    <input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#D4020B]/40 focus:border-[#D4020B] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Message / Requirements</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us more about your project, size, paper stock, finishing details, etc."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4020B]/40 focus:border-[#D4020B] transition-all resize-none"
                  />
                </div>

                {/* Upload Zone */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Upload Design (pdf, cdr, jpg, png, ai)</label>
                  <div className="relative border-2 border-dashed border-red-300 hover:border-[#D4020B] rounded-2xl p-6 transition-all bg-red-50/20 text-center overflow-hidden">
                    <input
                      type="file"
                      accept=".pdf,.cdr,.jpg,.png,.ai"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    
                    {uploadState.isUploading && (
                      <motion.div 
                        className="absolute top-0 left-0 h-1 bg-[#D4020B]"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadState.progress}%` }}
                      />
                    )}

                    {!uploadState.file ? (
                      <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-[#D4020B] flex items-center justify-center">
                          <UploadCloud className="w-6 h-6 animate-bounce" />
                        </div>
                        <p className="text-sm font-bold text-slate-800">
                          Drag & drop your file here <br />
                          <span className="font-normal text-slate-500 text-xs">or click to browse</span>
                        </p>
                        <span className="text-[11px] font-semibold text-slate-400">Max file size: 50MB</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative z-20">
                        <div className="flex items-center space-x-3 text-left">
                          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            {uploadState.isCompleted ? <FileCheck className="w-5 h-5" /> : <UploadCloud className="w-5 h-5 animate-pulse" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 truncate max-w-[200px] sm:max-w-xs">{uploadState.file.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">
                              {uploadState.isCompleted ? "Uploaded & Verified" : `Uploading... ${uploadState.progress}%`}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                          {uploadState.isCompleted ? "Verified" : "Processing"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitted 
                      ? 'bg-emerald-600 shadow-emerald-600/30' 
                      : 'bg-[#D4020B] hover:bg-red-700 shadow-red-600/30'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Quote...</span>
                    </div>
                  ) : isSubmitted ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Submitted! We'll reply fast</span>
                    </div>
                  ) : (
                    <span>Send Quote Request</span>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTION CARDS */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Google Review Card */}
              <motion.a 
                href="https://www.google.com/search?q=Print+It+Red+Indore" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-white border border-slate-200/90 rounded-3xl p-5 shadow-lg shadow-slate-100/80 flex items-center space-x-4 cursor-pointer transition-all block"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0 shadow-sm">
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-black text-slate-900">4.9</span>
                      <div className="flex text-[#D4020B]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">250+ Verified Google Reviews</p>
                    <span className="text-xs font-bold text-[#D4020B] inline-flex items-center mt-1 group">
                      Read customer reviews on Google 
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.a>

              {/* Interactive Swipe Action Cards */}
              <SwipeActionCard
                title="Call Us"
                value="+91-91791 07299"
                subtitle="Mon - Sat: 9:00 AM - 8:00 PM"
                icon={<Phone className="w-6 h-6 text-white" />}
                onSwipeComplete={() => {
                  showIslandToast("Initiating Call", "Dialing +91-91791 07299", <Phone className="w-4 h-4 text-emerald-400" />);
                  window.location.href = "tel:+919179107299";
                }}
              />

              <SwipeActionCard
                title="WhatsApp Us"
                value="+91-91791 07299"
                subtitle="We reply in a few minutes"
                icon={<MessageSquare className="w-6 h-6 text-white" />}
                onSwipeComplete={() => {
                  showIslandToast("Opening WhatsApp", "Connecting with our print expert", <MessageSquare className="w-4 h-4 text-emerald-400" />);
                  window.open("https://wa.me/919179107299", "_blank");
                }}
              />

              {/* Email Card (Click to Copy) */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  navigator.clipboard.writeText("hello@printitred.com");
                  showIslandToast("Email Copied!", "hello@printitred.com saved to clipboard", <Mail className="w-4 h-4 text-emerald-400" />);
                }}
                className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-lg shadow-slate-100/80 flex items-center space-x-4 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#D4020B] flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500">Email Us</p>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#D4020B]">hello@printitred.com</h3>
                  <p className="text-[11px] font-medium text-slate-400">We reply within a few hours</p>
                </div>
              </motion.div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-lg shadow-slate-100/80 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-50 rounded-xl text-[#D4020B]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Business Hours</h3>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex justify-between items-center">
                  <span>Monday - Saturday :</span>
                  <span className="font-bold text-slate-800">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-2">
                  <span>Sunday :</span>
                  <span className="font-bold text-slate-800">10:00 AM - 6:00 PM</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 text-center">
                <p className="text-xs font-black text-[#D4020B]">
                  Open all days (excluding national holidays)
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* FULL WIDTH GOOGLE MAP EMBED AT BOTTOM */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-red-50 text-[#D4020B] rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Visit Print It Red HQ</h3>
                <p className="text-xs text-slate-500 font-medium">Indore, Madhya Pradesh 452001</p>
              </div>
            </div>
            <button
              onClick={openGoogleMaps}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-[#D4020B] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-red-600/20"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
            <iframe
              title="Print It Red Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14720.598075354922!2d75.8577258!3d22.7195687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Enhanced iPhone Swipe-to-Action Sub-Component ---
function SwipeActionCard({ title, value, subtitle, icon, onSwipeComplete }) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 140], [1, 0.1]);
  const handleBg = useTransform(x, [0, 160], ["#D4020B", "#10B981"]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 140) {
      onSwipeComplete();
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-lg shadow-slate-100/80 relative overflow-hidden">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-full bg-[#D4020B] flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-500">{title}</p>
          <h3 className="text-xl sm:text-2xl font-black text-[#D4020B] tracking-tight">{value}</h3>
          <p className="text-[11px] font-medium text-slate-400">{subtitle}</p>
        </div>
      </div>

      {/* Swipe Track */}
      <div 
        ref={containerRef}
        className="mt-4 relative bg-slate-100/90 h-11 rounded-full p-1 flex items-center overflow-hidden border border-slate-200/70"
      >
        <motion.p 
          style={{ opacity }}
          className="w-full text-center text-[10px] sm:text-xs font-extrabold text-slate-400 uppercase tracking-wider pointer-events-none"
        >
          Slide to interact &gt;&gt;
        </motion.p>
        
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 200 }}
          dragElastic={0.15}
          dragSnapToOrigin
          onDragEnd={handleDragEnd}
          style={{ x, backgroundColor: handleBg }}
          className="absolute left-1 top-1 bottom-1 w-9 rounded-full shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing z-10 text-white"
          whileTap={{ scale: 1.08 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </div>
    </div>
  );
}