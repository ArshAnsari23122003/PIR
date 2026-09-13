import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Layout & Common Components
import TopOfferBar from './components/layout/TopOfferBar'
import Navbar from './components/layout/Navbar'
import Footer from './components/common/Footer'
import TargetCursor from './components/common/TargetCursor'

// Home Components
import Hero from './components/home/Hero'
import ProductCategories from './components/home/ProductCategories'
import ProductFaceCards from './components/home/ProductFaceCards'
import RigidBoxShowcase from './components/home/RigidBoxShowcase'
import Products from './components/pages/Products'
import MachineShowcase from './components/home/MachineShowcase'
import WhyPrintItRed from './components/home/WhyPrintItRed'
import TestimonialsAndFaq from './components/home/TestimonialsAndFaq'
import MacPreloader from './components/home/MacPreloader'

// Pages
import AboutUs from './components/pages/AboutUs'
import GetQuoteSection from './components/pages/GetQuote'
import Contact5Section from './components/pages/ContactUs'

// Helper component to auto-scroll to top on page route changes
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Homepage keeping ProductCategories as it was
const HomePage = () => {
  return (
    <main id="home">
      <Hero />
      <ProductCategories />
      <WhyPrintItRed />
      <TestimonialsAndFaq />
      <RigidBoxShowcase />
      <MachineShowcase />
    </main>
  )
}


const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen w-full bg-white text-black font-sans antialiased overflow-x-hidden">
        {isLoading && (
          <MacPreloader onComplete={() => setIsLoading(false)} />
        )}

        <div
          className={`transition-opacity duration-700 ease-out ${
            isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <TargetCursor cursorColor="#D4020B" cursorColorOnTarget="#D4020B" />
          <TopOfferBar />
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/get-quote" element={<GetQuoteSection />} />
            <Route path="/contact" element={<Contact5Section />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App