import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [username, setUsername] = useState < string | null > (null);
    const navigate = useNavigate();

    useEffect(() => {
        // On mount, load username from localStorage if logged in
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setUsername(storedUser);
        }
    }, []);

    const handleArchivesClick = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    const handleAudioGuideClick = () => {
        navigate("/audio-guide");
        setMobileMenuOpen(false);
    };

    const handleLoginClick = () => {
        navigate("/login");
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        // Remove stored data on logout
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUsername(null);
        navigate("/"); // redirect to home after logout if desired
    };

    const MapPopup = ({ onClose }) => (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-full flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-blue-50">
                    <h2 className="text-lg font-bold text-gray-800">Sikkim Map</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="p-6 flex-1 min-h-0 bg-gray-50">
                    {/* Embed map of Sikkim */}
                    <iframe
                        title="Sikkim Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d736059.1161389172!2d88.16531865046078!3d27.53297781477273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a5779e5d4c1b%3A0x47c53c24d90228f!2sSikkim!5e0!3m2!1sen!2sin!4v1694422387567!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        className="rounded-md border border-gray-200"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );

    const CalendarPopup = ({ onClose }) => {
        const [selectedDate, setSelectedDate] = useState(null);
        const [tags, setTags] = useState({});
        const [inputValue, setInputValue] = useState("");

        const today = new Date();
        const days = Array.from({ length: 30 }, (_, i) => i + 1); // demo: 30 days

        const handleDateClick = (day) => {
            setSelectedDate(day);
        };

        const handleAddTag = () => {
            if (inputValue.trim() !== "") {
                setTags({ ...tags, [selectedDate]: inputValue });
                setInputValue("");
            }
        };

        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                {/* Updated: Pure white background for entire popup */}
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-full flex flex-col">
                    {/* Updated Header: White background with centered text */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
                        <div className="flex-1"></div> {/* Left spacer for centering */}
                        <h2 className="text-lg font-bold text-gray-800 text-center">Calendar</h2>
                        <div className="flex-1 flex justify-end"> {/* Right spacer with close button */}
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Updated Body: White background */}
                    <div className="p-4 flex-1 min-h-0 bg-white">
                        <div className="grid grid-cols-7 gap-2 mb-4">
                            {days.map((day) => (
                                <button
                                    key={day}
                                    onClick={() => handleDateClick(day)}
                                    className={`p-2 rounded-md text-sm transition ${tags[day]
                                        ? "bg-blue-600 text-white"
                                        : selectedDate === day
                                            ? "bg-blue-200 text-blue-800"
                                            : "bg-white border border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        {selectedDate && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm mb-2 font-medium text-gray-700">
                                    Add tag for <b>{today.getMonth() + 1}/{selectedDate}</b>
                                </p>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                        placeholder="Enter tag..."
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddTag();
                                            }
                                        }}
                                    />
                                    <Button size="sm" onClick={handleAddTag} className="bg-blue-600 hover:bg-blue-700 text-white">
                                        Save
                                    </Button>
                                </div>
                                {tags[selectedDate] && (
                                    <p className="text-xs text-gray-600 mt-2">
                                        Current tag: <span className="font-medium text-blue-600">{tags[selectedDate]}</span>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-40">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo and branding */}
                <div className="flex items-center space-x-3">
                    <a href="#" aria-label="Globe">
                        <img
                            src={globePng}
                            alt="Globe Icon"
                            style={{ width: 44, height: 44 }}
                        />
                    </a>
                    <div>
                        <h1 className="text-xl font-lato font-bold text-primary">GoTrek</h1>
                        <p className="text-xs text-muted-foreground">Government of Sikkim</p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                    <Button
                        variant="ghost"
                        className="font-medium"
                        onClick={() => {
                            const el = document.getElementById("sacred-monasteries");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        <Globe className="h-4 w-4" />
                        Virtual Tours
                    </Button>
                    <Button
                        variant="ghost"
                        className="font-medium"
                        onClick={() => setShowMap(true)}
                    >
                        <Map className="h-4 w-4" />
                        Map
                    </Button>
                    <Button
                        variant="ghost"
                        className="font-medium"
                        onClick={() => {
                            const el = document.getElementById("digital-archives");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}


                    >
                        <Archive className="h-4 w-4" />
                        Archives
                    </Button>
                    <Button
                        variant="ghost"
                        className="font-medium"
                        onClick={() => setShowCalendar(true)}
                    >
                        <Calendar className="h-4 w-4" />
                        Calendar
                    </Button>
                    <Button variant="ghost" className="font-medium"
                        onClick={() => {
                            const el = document.getElementById("accmd");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}>
                        <MapPin className="h-4 w-4" />
                        Plan Visit
                    </Button>
                    <Button variant="ghost" className="font-medium">
                        <Users className="h-4 w-4" />
                        Community
                    </Button>
                    <Button variant="ghost" className="font-medium"
                        onClick={() => {
                            const el = document.getElementById("about");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}>
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

                    {/* Login/Username button */}
                    {username ? (
                        <button
                            onClick={handleLogout}
                            className="h-10 w-10 rounded-full bg-blue-600 text-white text-lg font-bold flex items-center justify-center"
                            title={`Logged in as ${username}. Click to log out`}
                            aria-label="User menu"
                        >
                            {username.charAt(0).toUpperCase()}
                        </button>
                    ) : (
                        <Button
                            variant="hero"
                            size="lg"
                            onClick={handleLoginClick}
                            className="flex items-center gap-2"
                        >
                            <LogIn className="h-4 w-4" />
                            Login
                        </Button>
                    )}
                </div>

                {/* Mobile Menu Button */}
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
                                setShowMap(true);
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
                                setShowCalendar(true);
                                setMobileMenuOpen(false);
                            }}
                        >
                            <Calendar className="h-4 w-4 mr-2" />
                            Calendar
                        </Button>
                        <Button variant="ghost" className="w-full justify-start font-medium">
                            <MapPin className="h-4 w-4 mr-2" />
                            Plan Visit
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
                        <div className="pt-2">
                            {username ? (
                                <button
                                    onClick={handleLogout}
                                    className="h-10 w-10 rounded-full bg-blue-600 text-white text-lg font-bold flex items-center justify-center"
                                    title={`Logged in as ${username}. Click to log out`}
                                    aria-label="User menu"
                                >
                                    {username.charAt(0).toUpperCase()}
                                </button>
                            ) : (
                                <Button
                                    variant="hero"
                                    size="lg"
                                    className="w-full"
                                    onClick={handleLoginClick}
                                >
                                    <LogIn className="h-4 w-4 mr-2" />
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Popups (calendar, map, etc.) */}
            {showCalendar && <CalendarPopup onClose={() => setShowCalendar(false)} />}
            {showMap && <MapPopup onClose={() => setShowMap(false)} />}
        </header>
    );
};

export default Navbar;
