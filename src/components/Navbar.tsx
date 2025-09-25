import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Globe,
  Map,
  Archive,
  Calendar,
  MapPin,
  Users,
  Info,
  X,
  BookOpen,
  LogIn, // Add LogIn icon
} from "lucide-react";
import globePng from "@/assets/cropped_circle_image (1).png";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleArchivesClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleAudioGuideClick = () => {
    navigate("/audio-guide");
    setMobileMenuOpen(false);
  };

  const handleAccomodationClick = () => {
    navigate("/accomodation");
    setMobileMenuOpen(false);
  };

  const handleMapClick = () => {
    navigate("/map");
    setMobileMenuOpen(false);
  };

  const handleCalendarClick = () => {
    navigate("/calendar");
    setMobileMenuOpen(false);
  };

  // Add login handler
  const handleLoginClick = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-40">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={globePng}
            alt="Globe Icon"
            style={{ width: 44, height: 44 }}
          />
          <div>
            <h1 className="text-xl font-lato font-bold text-primary">GoTrek</h1>
            <p className="text-xs text-muted-foreground">Government of Sikkim</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" className="font-medium">
            <Globe className="h-4 w-4" />
            Virtual Tours
          </Button>
          <Button
            variant="ghost"
            className="font-medium"
            onClick={handleMapClick}
          >
            <Map className="h-4 w-4" />
            Map
          </Button>
          <Button
            variant="ghost"
            className="font-medium"
            onClick={handleArchivesClick}
          >
            <Archive className="h-4 w-4" />
            Archives
          </Button>
          <Button
            variant="ghost"
            className="font-medium"
            onClick={handleCalendarClick}
          >
            <Calendar className="h-4 w-4" />
            Calendar
          </Button>
          <Button variant="ghost" className="font-medium" onClick={handleAccomodationClick}>
            <MapPin className="h-4 w-4" />
            Accomodation
          </Button>
          <Button variant="ghost" className="font-medium">
            <Users className="h-4 w-4" />
            Community
          </Button>
          <Button variant="ghost" className="font-medium">
            <Info className="h-4 w-4" />
            About
          </Button>
          <Button
            variant="ghost"
            className="font-medium"
            onClick={handleAudioGuideClick}
          >
            <BookOpen className="h-4 w-4" />
            Audio Guide
          </Button>
        </div>

        {/* Updated: Login Button */}
        <div className="hidden md:block">
          <Button variant="hero" size="lg" onClick={handleLoginClick}>
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
        </div>

        {/* Mobile Menu Button - FIXED */}
        <Button 
          variant="outline" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start font-medium">
              <Globe className="h-4 w-4 mr-2" />
              Virtual Tours
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-medium"
              onClick={() => {
                handleMapClick();
                setMobileMenuOpen(false);
              }}
            >
              <Map className="h-4 w-4 mr-2" />
              Map
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-medium"
              onClick={() => {
                handleArchivesClick();
                setMobileMenuOpen(false);
              }}
            >
              <Archive className="h-4 w-4 mr-2" />
              Archives
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-medium"
              onClick={() => {
                handleCalendarClick();
                setMobileMenuOpen(false);
              }}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button variant="ghost" className="w-full justify-start font-medium" onClick={() => {
                handleAccomodationClick();
                setMobileMenuOpen(false);
              }}>
              <MapPin className="h-4 w-4 mr-2" />
              Accomodation
            </Button>
            <Button variant="ghost" className="w-full justify-start font-medium">
              <Users className="h-4 w-4 mr-2" />
              Community
            </Button>
            <Button variant="ghost" className="w-full justify-start font-medium">
              <Info className="h-4 w-4 mr-2" />
              About
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-medium"
              onClick={handleAudioGuideClick}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Audio Guide
            </Button>
            {/* Updated: Mobile Login Button */}
            <div className="pt-2">
              <Button variant="hero" size="lg" className="w-full" onClick={handleLoginClick}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Popups */}
    </header>
  );
};

export default Navbar;
