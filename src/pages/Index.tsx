import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedMonasteries from '@/components/FeaturedMonasteries';
import DigitalArchives from '@/components/DigitalArchives';
import CulturalCalendar from '@/components/CulturalCalendar';
import Footer from '@/components/Footer';

// Import the chatbot widget
import ChatbotWidget from '@/components/chatbot/chatbotwidget'; // Adjust path as needed

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedMonasteries />
      <DigitalArchives />
      <CulturalCalendar />
      <Footer />
      <ChatbotWidget /> {/* <-- Add chatbot here, so it's rendered on homepage */}
    </div>
  );
};

export default Index;
