import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import globeImage from '@/assets/cropped_circle_image (1).png';

const Footer = () => {
  return (
    <footer id='about' className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">

              <img 
                src={globeImage} 
                alt="Globe" 
                className="h-8 w-8 object-contain" 
              />
              <div>
                <h3 className="text-xl font-lato font-bold">GoTrek</h3>
                <p className="text-sm opacity-80">Government of Sikkim</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Preserving and showcasing the sacred monasteries of Sikkim through digital innovation and cultural heritage.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-lato font-bold">Explore</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">Virtual Tours</a>
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">Interactive Map</a>
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">Digital Archives</a>
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">Cultural Calendar</a>
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">Audio Guides</a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-lato font-bold">Resources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">Plan Your Visit</a>
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">Community Portal</a>
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">About Sikkim</a>
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">Conservation</a>
              <a href="#" className="block text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors">Research</a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-lato font-bold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="opacity-90">Tourism Department, Gangtok, Sikkim</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-accent" />
                <span className="opacity-90">+91 3592 202688</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-accent" />
                <span className="opacity-90">info@gotrek.sikkim.gov.in</span>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-primary-light" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm opacity-80">
            © 2024 Government of Sikkim. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Accessibility</a>
            <a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
