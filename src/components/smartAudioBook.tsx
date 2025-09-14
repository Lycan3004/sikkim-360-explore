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
    image: "https://images.pexels.com/photos/910368/pexels-photo-910368.jpeg?cs=srgb&dl=pexels-peng-lim-6377-910368.jpg&fm=jpg",
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
    image: "https://media.istockphoto.com/id/691765264/photo/meteora-monastery-greece-unesco-heritage-list.jpg?s=612x612&w=0&k=20&c=dxxbQCyHqipk3fSLOLEPrD9IVw31JR3c7ckRd6gUiJk=",
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
    audioUrl: ".src/assets/luvvoice.com-20250914-SJIoWP.mp3",
    image: "data:image/jpeg;base64,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",
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
    image: "https://www.shutterstock.com/image-photo/beautiful-buddhist-monastery-architecture-design-260nw-2008446959.jpg",
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
    image: "https://media.istockphoto.com/id/916913314/photo/zangdog-palri-golden-temple-of-namdroling-buddhist-monastery-coorg-india.jpg?s=612x612&w=0&k=20&c=3ihAvDVZxD-Ow7YUJvwn3-oOcHXjhCpz4GrzMyQXAFo=",
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
