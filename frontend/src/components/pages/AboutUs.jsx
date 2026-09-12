import React from 'react';
import AboutUsSection from '../home/AboutUsSection';
import WorkshopShowcase from '../home/WorkshopShowcase';

const AboutUs = () => {
  return (
    <main className="pt-8 min-h-[70vh]">
      <AboutUsSection />
      <WorkshopShowcase/>
    </main>
  );
};

export default AboutUs;