import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Globe, Map, Archive, Calendar, MapPin, Users, Info } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Globe className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-lato font-bold text-primary">Monastery360</h1>
            <p className="text-xs text-muted-foreground">Government of Sikkim</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" className="font-medium">
            <Globe className="h-4 w-4" />
            Virtual Tours
          </Button>
          <Button variant="ghost" className="font-medium">
            <Map className="h-4 w-4" />
            Map
          </Button>
          <Button variant="ghost" className="font-medium">
            <Archive className="h-4 w-4" />
            Archives
          </Button>
          <Button variant="ghost" className="font-medium">
            <Calendar className="h-4 w-4" />
            Calendar
          </Button>
          <Button variant="ghost" className="font-medium">
            <MapPin className="h-4 w-4" />
            Plan Visit
          </Button>
          <Button variant="ghost" className="font-medium">
            <Users className="h-4 w-4" />
            Community
          </Button>
          <Button variant="ghost" className="font-medium">
            <Info className="h-4 w-4" />
            About
          </Button>
        </div>
        
        {/* CTA Button */}
        <div className="hidden md:block">
          <Button variant="hero" size="lg">
            Start Tour
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;