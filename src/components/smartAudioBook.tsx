import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  BookOpen,
  MapPin,
  Clock,
  Star,
  Download,
  Share2,
  Settings,
  X,
  List,
  Info,
} from "lucide-react";

// Sample audio guide data for Sikkim attractions
const audioGuides = [
  {
    id: 1,
    title: "Gangtok - The Capital City",
    location: "Gangtok",
    duration: "12:30",
    description: "Discover the vibrant capital of Sikkim with its monasteries, markets, and mountain views.",
    audioUrl: "/audio/gangtok-guide.mp3",
    image: "/images/gangtok.jpg",
    category: "City",
    rating: 4.8,
    highlights: ["MG Marg", "Enchey Monastery", "Ganesh Tok", "Hanuman Tok"]
  },
  {
    id: 2,
    title: "Tsomgo Lake - Sacred Alpine Lake",
    location: "East Sikkim",
    duration: "8:45",
    description: "Learn about the sacred glacial lake and its cultural significance.",
    audioUrl: "/audio/tsomgo-guide.mp3",
    image: "/images/tsomgo.jpg",
    category: "Nature",
    rating: 4.9,
    highlights: ["Glacial Formation", "Local Legends", "Yak Rides", "Baba Mandir"]
  },
  {
    id: 3,
    title: "Rumtek Monastery - Dharma Chakra Centre",
    location: "Rumtek",
    duration: "15:20",
    description: "Explore the largest monastery in Sikkim and seat of the Karmapa.",
    audioUrl: "/audio/rumtek-guide.mp3",
    image: "/images/rumtek.jpg",
    category: "Heritage",
    rating: 4.7,
    highlights: ["Tibetan Architecture", "Golden Stupa", "Meditation Halls", "Prayer Wheels"]
  },
  {
    id: 4,
    title: "Nathula Pass - Historic Trade Route",
    location: "Indo-China Border",
    duration: "10:15",
    description: "Journey through the historic Silk Route pass at 14,140 feet.",
    audioUrl: "/audio/nathula-guide.mp3",
    image: "/images/nathula.jpg",
    category: "Adventure",
    rating: 4.6,
    highlights: ["Silk Route History", "Border Trade", "Mountain Views", "War Memorial"]
  },
  {
    id: 5,
    title: "Pelling - Gateway to Kanchenjunga",
    location: "West Sikkim",
    duration: "11:30",
    description: "Experience the majestic views of the world's third highest peak.",
    audioUrl: "/audio/pelling-guide.mp3",
    image: "/images/pelling.jpg",
    category: "Nature",
    rating: 4.8,
    highlights: ["Kanchenjunga Views", "Pemayangtse Monastery", "Rabdentse Ruins", "Skywalk"]
  }
];

// Audio Guide Player Component
const AudioGuidePlayer = ({ guide, onClose }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [guide]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleSpeedChange = (speed) => {
    setPlaybackRate(speed);
    audioRef.current.playbackRate = speed;
    setShowSettings(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipTime = (seconds) => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-1">{guide.title}</h2>
            <p className="text-sm opacity-90 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {guide.location}
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Guide Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {guide.category}
              </span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{guide.rating}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {guide.duration}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{guide.description}</p>
            
            {/* Highlights */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Key Highlights:</h4>
              <div className="flex flex-wrap gap-2">
                {guide.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="bg-gray-50 rounded-lg p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <div
                className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-150"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => skipTime(-10)}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="h-12 w-12"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => skipTime(10)}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Volume Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16"
                />
              </div>

              {/* Settings */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                {showSettings && (
                  <div className="absolute right-0 bottom-full mb-2 bg-white border rounded-lg shadow-lg p-2 min-w-32">
                    <div className="text-sm font-medium mb-2">Playback Speed</div>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                          playbackRate === speed ? 'bg-blue-100 text-blue-800' : ''
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-2 mt-4 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Info className="h-4 w-4 mr-1" />
                More Info
              </Button>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={guide.audioUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      </div>
    </div>
  );
};

// Main Smart Audio Guide Component
const SmartAudioGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [sortBy, setSortBy] = useState("rating");

  const categories = ["All", "City", "Nature", "Heritage", "Adventure"];

  const filteredGuides = audioGuides
    .filter(guide => {
      const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "duration") return a.duration.localeCompare(b.duration);
      return a.title.localeCompare(b.title);
    });

  const addToPlaylist = (guide) => {
    if (!playlist.find(item => item.id === guide.id)) {
      setPlaylist([...playlist, guide]);
    }
  };

  const removeFromPlaylist = (guideId) => {
    setPlaylist(playlist.filter(item => item.id !== guideId));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Smart Audio Guide</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover Sikkim's hidden treasures with our expertly crafted audio guides. 
          Learn about history, culture, and natural wonders from local experts.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search guides or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort & Playlist */}
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="duration">Sort by Duration</option>
              <option value="title">Sort by Name</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="relative"
            >
              <List className="h-4 w-4 mr-1" />
              Playlist
              {playlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {playlist.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Playlist Sidebar */}
      {showPlaylist && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-40 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">My Playlist</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPlaylist(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {playlist.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">No guides in playlist</p>
          ) : (
            <div className="space-y-2">
              {playlist.map(guide => (
                <div key={guide.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{guide.title}</p>
                    <p className="text-xs text-gray-600">{guide.duration}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromPlaylist(guide.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Audio Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map(guide => (
          <div key={guide.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                {guide.category}
              </div>
              <div className="absolute top-3 right-3 flex items-center bg-black/70 text-white text-xs rounded px-2 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {guide.duration}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
              <p className="text-gray-600 text-sm mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {guide.location}
              </p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {guide.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{guide.rating}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addToPlaylist(guide)}
                  disabled={playlist.find(item => item.id === guide.id)}
                >
                  <List className="h-3 w-3 mr-1" />
                  {playlist.find(item => item.id === guide.id) ? 'Added' : 'Add to Playlist'}
                </Button>
              </div>
              
              <Button
                className="w-full"
                onClick={() => setSelectedGuide(guide)}
              >
                <Play className="h-4 w-4 mr-2" />
                Listen Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No audio guides found</p>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Audio Player Modal */}
      {selectedGuide && (
        <AudioGuidePlayer
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      )}
    </div>
  );
};

export default SmartAudioGuide;
