import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useTexture, Environment, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../../assets/assets';


const categoryProductsMap = {
  "Business & Stationery": [
    { id: "visiting-cards", name: "Visiting Cards", price: "₹499 / 100pcs", desc: "Premium textured matte & gloss finishes.", image: assets.hero },
    { id: "letterheads", name: "Letterheads", price: "₹899 / 500pcs", desc: "High-grade executive bond paper.", image: assets.hero },
    { id: "custom-envelopes", name: "Custom Envelopes", price: "₹699 / 200pcs", desc: "Branded corporate sizing available.", image: assets.hero },
    { id: "id-cards", name: "ID Cards & Lanyards", price: "₹120 / pc", desc: "Durable PVC with custom woven lanyards.", image: assets.hero },
    { id: "brand-diaries", name: "Brand Diaries", price: "₹250 / pc", desc: "Foil-stamped custom executive notebooks.", image: assets.hero }
  ],
  "Marketing & Signage": [
    { id: "custom-brochures", name: "Custom Brochures", price: "₹1,499 / 100pcs", desc: "Bi-fold and tri-fold gloss prints.", image: assets.hero },
    { id: "flyers", name: "Flyers & Leaflets", price: "₹799 / 500pcs", desc: "Vibrant promotional mass prints.", image: assets.hero },
    { id: "posters", name: "Posters & Banners", price: "₹350 / pc", desc: "Weather-resistant large format prints.", image: assets.hero },
    { id: "standees", name: "Roll-up Standees", price: "₹1,299 / pc", desc: "Portable aluminum retractable stands.", image: assets.hero },
    { id: "stickers", name: "Stickers & Labels", price: "₹299 / sheet", desc: "UV DTF waterproof custom die-cut sheets.", image: assets.hero }
  ],
  "Signage & Branding": [
    { id: "acrylic-letters", name: "Acrylic Letters", price: "₹45 / inch", desc: "3D laser-cut illuminated letters.", image: assets.hero },
    { id: "neon-signs", name: "LED Neon Signs", price: "₹2,499 / pc", desc: "Custom flexible neon wall art.", image: assets.hero },
    { id: "wall-graphics", name: "Vinyl Wall Graphics", price: "₹65 / sq.ft", desc: "Matte commercial wall wraps.", image: assets.hero },
    { id: "sunpack-boards", name: "Sunpack Boards", price: "₹180 / pc", desc: "Lightweight election & outdoor display boards.", image: assets.hero }
  ],
  "Rigid & Packaging": [
    { id: "rigid-boxes", name: "Luxury Rigid Gift Boxes", price: "₹150 / pc", desc: "Magnetic closure custom foil-stamped boxes.", image: assets.hero },
    { id: "corrugated-mailers", name: "Corrugated Mailers", price: "₹35 / pc", desc: "E-commerce shipping custom printed boxes.", image: assets.hero },
    { id: "paper-bags", name: "Custom Paper Bags", price: "₹25 / pc", desc: "Matte/Gloss laminated carry bags with rope handles.", image: assets.hero },
    { id: "monocarton", name: "Monocarton Packaging", price: "₹18 / pc", desc: "Product retail folding cartons.", image: assets.hero }
  ],
  "Cards & Invitations": [
    { id: "wedding-invitations", name: "Wedding Invitations", price: "₹45 / pc", desc: "Laser-cut intricate luxury box invitations.", image: assets.hero },
    { id: "event-passes", name: "Event Pass Cards", price: "₹25 / pc", desc: "VIP holographic lamination passes.", image: assets.hero },
    { id: "greeting-cards", name: "Greeting Cards", price: "₹30 / pc", desc: "Custom textured festival cards.", image: assets.hero },
    { id: "custom-sleeves", name: "Custom Sleeves", price: "₹15 / pc", desc: "Belly bands and packaging sleeves.", image: assets.hero }
  ]
};


const Room = () => {
  const [frontTex, leftTex, rightTex, floorTex, doorTex, ceilingTex] = useTexture([
    assets.receptionWall, assets.leftWall, assets.rightWall, assets.floor, assets.doors, assets.ceiling
  ]);

  floorTex.wrapS = THREE.RepeatWrapping; floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(4, 4);

  return (
    <group>
      <mesh position={[0, 0, -8]}><planeGeometry args={[16, 9]} /><meshStandardMaterial map={frontTex} /></mesh>
      <mesh position={[-8, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[16, 9]} /><meshStandardMaterial map={leftTex} /></mesh>
      <mesh position={[8, 0, 0]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[16, 9]} /><meshStandardMaterial map={rightTex} /></mesh>
      <mesh position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[16, 16]} /><meshStandardMaterial map={floorTex} /></mesh>
      <mesh position={[0, 4.5, 0]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[16, 16]} /><meshStandardMaterial map={ceilingTex} /></mesh>
      <mesh position={[0, 0, 8]} rotation={[0, Math.PI, 0]}><planeGeometry args={[16, 9]} /><meshStandardMaterial map={doorTex} transparent={true} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
};

// --- CAMERA CONTROLLER ---
const CameraManager = ({ hasEntered, activeCategory }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (!hasEntered) {
      // Start outside/at the doors
      camera.position.set(0, 0, 6);
      camera.quaternion.set(0, 0, 0, 1);
    } else if (hasEntered && !activeCategory) {
      // Animate into the center of the room, or reset to center from a shelf
      gsap.to(camera.position, { x: 0, y: 0, z: 1, duration: 1.5, ease: 'power3.inOut' });
      gsap.to(camera.quaternion, { x: 0, y: 0, z: 0, w: 1, duration: 1.5, ease: 'power3.inOut' });
    }
  }, [hasEntered, activeCategory, camera]);
  
  return null;
};

// --- FLOATING UI BUTTONS ---
const CategoryMarker = ({ position, rotation, label, targetPos, lookAtPos, onShelfArrived, activeCategory, hasEntered }) => {
  const { camera } = useThree();

  const handleNavigate = () => {
    gsap.to(camera.position, { x: targetPos[0], y: targetPos[1], z: targetPos[2], duration: 1.5, ease: 'power3.inOut' });
    const dummyCamera = camera.clone();
    dummyCamera.position.set(...targetPos);
    dummyCamera.lookAt(...lookAtPos);
    gsap.to(camera.quaternion, {
      x: dummyCamera.quaternion.x, y: dummyCamera.quaternion.y, z: dummyCamera.quaternion.z, w: dummyCamera.quaternion.w,
      duration: 1.5, ease: 'power3.inOut', onComplete: () => onShelfArrived(label)
    });
  };

  if (!hasEntered || activeCategory) return null;

  return (
    <mesh position={position} rotation={rotation}>
      <Html transform distanceFactor={3}>
        <button 
          onClick={handleNavigate}
          className="bg-[#D4020B] text-white px-5 py-2.5 font-bold uppercase tracking-widest text-xs rounded shadow-2xl hover:bg-white hover:text-[#D4020B] transition-colors border-2 border-transparent hover:border-[#D4020B] cursor-pointer whitespace-nowrap"
        >
          {label}
        </button>
      </Html>
    </mesh>
  );
};

// --- MAIN COMPONENT ---
const Products = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Flipkart form states
  const [quantity, setQuantity] = useState(100);
  const [hasFile, setHasFile] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showCheckoutAnimation, setShowCheckoutAnimation] = useState(false);
  const [toastMessage, setToastMessage] = useState(false);

  // Auto-hide help prompt
  useEffect(() => {
    if (showHelp) {
      const timer = setTimeout(() => setShowHelp(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showHelp]);

  const handleEnterStore = () => {
    setHasEntered(true);
    setTimeout(() => {
      setShowHelp(true);
    }, 1500); // Show help after camera finishes moving in
  };

  const handleResetCamera = () => {
    setActiveCategory(null);
    setSelectedProduct(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  const handleRequestQuote = () => {
    setShowCheckoutAnimation(true);
    setTimeout(() => {
      setShowCheckoutAnimation(false);
      setToastMessage(true);
      
      const phone = "919179107299";
      const designStatus = hasFile ? `File uploaded: ${uploadedFile ? uploadedFile.name : 'Pending'}` : "Needs graphic designer";
      const message = encodeURIComponent(`Hello Print It Red, I would like to request a quote:\n\n*Product:* ${selectedProduct.name}\n*Quantity:* ${quantity}\n*Design:* ${designStatus}\n\nPlease contact me.`);
      
      setTimeout(() => {
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        setToastMessage(false);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden pt-20 md:pt-28">
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} className="z-10">
        <ambientLight intensity={1.5} />
        <Suspense fallback={null}>
          <Room />
          <CameraManager hasEntered={hasEntered} activeCategory={activeCategory} />
          
          <CategoryMarker label="Business & Stationery" position={[-7.9, 1, -3]} rotation={[0, Math.PI / 2, 0]} targetPos={[-4, 0, -3]} lookAtPos={[-8, 0, -3]} onShelfArrived={setActiveCategory} activeCategory={activeCategory} hasEntered={hasEntered} />
          <CategoryMarker label="Marketing & Signage" position={[-7.9, 1, 0]} rotation={[0, Math.PI / 2, 0]} targetPos={[-4, 0, 0]} lookAtPos={[-8, 0, 0]} onShelfArrived={setActiveCategory} activeCategory={activeCategory} hasEntered={hasEntered} />
          <CategoryMarker label="Signage & Branding" position={[-7.9, 1, 3]} rotation={[0, Math.PI / 2, 0]} targetPos={[-4, 0, 3]} lookAtPos={[-8, 0, 3]} onShelfArrived={setActiveCategory} activeCategory={activeCategory} hasEntered={hasEntered} />
          <CategoryMarker label="Rigid & Packaging" position={[7.9, 1, -2]} rotation={[0, -Math.PI / 2, 0]} targetPos={[4, 0, -2]} lookAtPos={[8, 0, -2]} onShelfArrived={setActiveCategory} activeCategory={activeCategory} hasEntered={hasEntered} />
          <CategoryMarker label="Cards & Invitations" position={[7.9, 1, 2]} rotation={[0, -Math.PI / 2, 0]} targetPos={[4, 0, 2]} lookAtPos={[8, 0, 2]} onShelfArrived={setActiveCategory} activeCategory={activeCategory} hasEntered={hasEntered} />

          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* ENTRY SCREEN OVERLAY */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-auto"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg">
              Virtual 3D Store
            </h1>
            <p className="text-neutral-300 text-sm md:text-base uppercase tracking-widest mb-8 text-center max-w-md">
              Step inside our digital shop to explore premium printing & packaging solutions.
            </p>
            <button 
              onClick={handleEnterStore}
              className="bg-[#D4020B] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm rounded shadow-2xl hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Enter Store
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HELP PROMPT */}
      <AnimatePresence>
        {showHelp && !activeCategory && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur shadow-2xl text-black px-6 py-3 rounded-full flex items-center gap-4 pointer-events-auto border border-neutral-200"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#D4020B] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Look around and click the red category buttons on the walls.
            </span>
            <button onClick={() => setShowHelp(false)} className="text-neutral-400 hover:text-black font-bold ml-2">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS-Hidden Reset Camera Button (Fixes Cursor Glitch) */}
      <button 
        onClick={handleResetCamera} 
        className={`absolute top-24 left-6 z-40 px-5 py-2.5 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded shadow-2xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer border border-red-500 ${activeCategory ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        ⟲ Reset Camera
      </button>

      {/* 2D Overlay: Sub-Products Grid */}
      <AnimatePresence>
        {activeCategory && !selectedProduct && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="absolute inset-x-0 bottom-0 top-20 bg-black/90 backdrop-blur-md z-30 p-6 md:p-12 overflow-y-auto flex flex-col items-center pointer-events-auto"
          >
            <div className="max-w-6xl w-full pt-12">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-2 border-b border-red-600 pb-2">
                {activeCategory}
              </h2>
              <p className="text-neutral-400 text-xs uppercase tracking-widest mb-8">Select a product to view specifications & pricing</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-20">
                {categoryProductsMap[activeCategory]?.map((prod, idx) => (
                  <motion.div
                    key={prod.id}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedProduct(prod)}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden cursor-pointer hover:border-[#D4020B] transition-all group shadow-xl flex flex-col pointer-events-auto"
                  >
                    <div className="h-48 w-full bg-neutral-800 overflow-hidden relative">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg group-hover:text-[#D4020B] transition-colors">{prod.name}</h3>
                        <p className="text-neutral-400 text-xs mt-1">{prod.desc}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between items-center">
                        <span className="text-[#D4020B] font-black text-sm">{prod.price}</span>
                        <span className="text-xs uppercase tracking-widest text-white font-bold underline">Explore →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2D Overlay: Product Detail Page */}
      <AnimatePresence>
        {selectedProduct && !showCheckoutAnimation && !toastMessage && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: "tween", duration: 0.3 }}
            className="absolute inset-0 bg-white text-black z-40 pt-24 md:pt-28 overflow-y-auto px-6 md:px-16 pb-12 pointer-events-auto"
          >
            <div className="max-w-6xl mx-auto">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-[#D4020B] mb-8 cursor-pointer pointer-events-auto transition-colors"
              >
                ← Back to {activeCategory}
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-neutral-100 rounded-2xl h-[500px] overflow-hidden flex items-center justify-center p-8 border border-neutral-200">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain drop-shadow-xl" />
                </div>

                <div className="flex flex-col justify-center">
                  <h1 className="text-4xl font-black uppercase tracking-tight">{selectedProduct.name}</h1>
                  <p className="text-2xl font-black text-[#D4020B] mt-2">{selectedProduct.price}</p>
                  <p className="text-neutral-600 text-sm mt-4 leading-relaxed">{selectedProduct.desc}</p>

                  <div className="mt-8 border-t border-neutral-200 pt-6">
                    <label className="block text-xs uppercase font-bold tracking-widest mb-3 text-neutral-500">Select Quantity</label>
                    <div className="flex items-center gap-4 bg-neutral-100 w-fit p-1.5 rounded-xl border border-neutral-200">
                      <button onClick={() => setQuantity(Math.max(50, quantity - 50))} className="w-10 h-10 bg-white rounded-lg shadow hover:bg-[#D4020B] hover:text-white transition-colors font-bold text-lg cursor-pointer">-</button>
                      <motion.span key={quantity} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-16 text-center font-black text-xl">
                        {quantity}
                      </motion.span>
                      <button onClick={() => setQuantity(quantity + 50)} className="w-10 h-10 bg-white rounded-lg shadow hover:bg-[#D4020B] hover:text-white transition-colors font-bold text-lg cursor-pointer">+</button>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-neutral-200 pt-6">
                    <label className="block text-xs uppercase font-bold tracking-widest mb-4 text-neutral-500">Artwork & Design</label>
                    <div className="flex bg-neutral-100 p-1 rounded-xl w-fit mb-6 border border-neutral-200">
                      <button onClick={() => setHasFile(true)} className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${hasFile ? 'bg-white shadow text-black' : 'text-neutral-500 hover:text-black'}`}>I have a file</button>
                      <button onClick={() => setHasFile(false)} className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${!hasFile ? 'bg-white shadow text-black' : 'text-neutral-500 hover:text-black'}`}>Need a Designer</button>
                    </div>

                    <AnimatePresence mode="wait">
                      {hasFile ? (
                        <motion.div key="upload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer hover:border-[#D4020B] hover:bg-red-50/50 transition-colors pointer-events-auto">
                            <span className="text-sm font-bold text-neutral-600 mb-1">Upload .CDR or .PDF</span>
                            <span className="text-xs text-neutral-400">Max file size 50MB</span>
                            <input type="file" accept=".cdr,.pdf" className="hidden" onChange={handleFileUpload} />
                          </label>
                          {uploadedFile && (
                            <div className="mt-4 p-4 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#D4020B] text-white rounded flex items-center justify-center text-[10px] font-bold">FILE</div>
                              <span className="text-sm font-bold truncate text-black">{uploadedFile.name}</span>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div key="designer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 bg-neutral-100 border border-neutral-200 rounded-xl">
                          <p className="text-sm font-bold text-black mb-1">We'll design it for you!</p>
                          <p className="text-xs text-neutral-500 leading-relaxed">Our design team will contact you on WhatsApp to discuss your vision after you place the request.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-10">
                    <button onClick={handleRequestQuote} className="w-full py-4 bg-[#D4020B] text-white font-bold uppercase tracking-widest rounded shadow-xl hover:bg-black transition-colors cursor-pointer pointer-events-auto">
                      Request Quote & Order via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Red Carry Bag Animation Drop */}
      <AnimatePresence>
        {showCheckoutAnimation && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-sm z-[60] flex items-center justify-center pointer-events-auto"
          >
            <motion.div 
              initial={{ y: -500, scale: 0.5, rotate: -10 }} animate={{ y: 0, scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="w-64 h-80 bg-[#D4020B] rounded-b-3xl shadow-2xl flex flex-col items-center justify-center p-6 border-4 border-[#b00108] relative"
            >
              <div className="absolute -top-10 w-24 h-12 border-4 border-[#b00108] rounded-t-full"></div>
              <span className="text-white font-black text-4xl tracking-tighter uppercase font-serif">P</span>
              <span className="text-white/90 text-xs tracking-widest uppercase mt-3 font-bold">Print It Red</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Island Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ y: -100, scale: 0.5, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: -100, scale: 0.5, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 z-[70] bg-black text-white px-6 py-4 rounded-full flex items-center gap-4 shadow-2xl pointer-events-none border border-neutral-800"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-white">Quote Requested</span>
              <span className="text-[10px] text-neutral-400 mt-0.5">Redirecting to WhatsApp...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Products;