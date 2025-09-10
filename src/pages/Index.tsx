import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedMonasteries from '@/components/FeaturedMonasteries';
import DigitalArchives from '@/components/DigitalArchives';
import CulturalCalendar from '@/components/CulturalCalendar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedMonasteries />
      <DigitalArchives />
      <CulturalCalendar />
      <Footer />
    </div>
  );
};

export default Index;
