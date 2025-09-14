import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Users, Calendar, House } from 'lucide-react';
import heroImage from '@/assets/richenpong.jpeg';

const Hero = () => {
  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 monastery-hero"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <Badge variant="secondary" className="mb-6 bg-accent/90 text-accent-foreground font-medium">
          Government of Sikkim Initiative
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-lato font-black mb-6 leading-tight">
          Explore the Sacred
          <br />
          <span className="text-accent">Monasteries of Sikkim</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
          360° tours • Digital archives • Guided audio • Cultural calendar
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold font-lato text-accent">25+</div>
            <div className="text-sm opacity-80">Monasteries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-lato text-accent">500+</div>
            <div className="text-sm opacity-80">Archives</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-lato text-accent">12</div>
            <div className="text-sm opacity-80">Festivals</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-3">
            <Play className="h-5 w-5" />
            Start Virtual Tour
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-white/30 text-white hover:bg-white/10">
            <Star className="h-5 w-5" />
            Explore Archives
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Users className="h-8 w-8 text-accent mb-3 mx-auto" />
            <h3 className="font-lato font-bold mb-2">Cultural Experience</h3>
            <p className="text-sm opacity-80">Join monks in daily rituals and meditation sessions</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Star className="h-8 w-8 text-accent mb-3 mx-auto" />
            <h3 className="font-lato font-bold mb-2">Heritage Archives</h3>
            <p className="text-sm opacity-80">Discover ancient manuscripts and sacred art</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Calendar className="h-8 w-8 text-accent mb-3 mx-auto" />
            <h3 className="font-lato font-bold mb-2">Festival Calendar</h3>
            <p className="text-sm opacity-80">Experience vibrant Sikkimese Buddhist festivals</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;