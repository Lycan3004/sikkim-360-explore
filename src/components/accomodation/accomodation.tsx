import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import hotelImg from "@/assets/hotel-img.jpg";
import homestayImg from "@/assets/homestay-img.jpg";
import resortImg from "@/assets/resort-img.jpg";
import guesthouseImg from "@/assets/guesthouse-img.jpg";
import { MapPin, Home, Sun, Stars } from "lucide-react";

const accommodations = [
  {
    id: "1",
    name: "Mayal Retreat",
    type: "Resort",
    district: "East Sikkim",
    image: resortImg,
    address: "MG Marg, Gangtok, East Sikkim",
    rating: 4.7,
    highlight: "Scenic views, eco-friendly rooms",
  },
  {
    id: "2",
    name: "Staynest Homestay",
    type: "Homestay",
    district: "East Sikkim",
    image: homestayImg,
    address: "Near Mall Road, Gangtok, East Sikkim",
    rating: 4.5,
    highlight: "Authentic Sikkimese hospitality",
  },
  {
    id: "3",
    name: "Dungmali Heritage Resort",
    type: "Resort",
    district: "South Sikkim",
    image: resortImg,
    address: "Solophok, Namchi, South Sikkim",
    rating: 4.8,
    highlight: "Himalayan views & peaceful gardens",
  },
  {
    id: "4",
    name: "Red Cherry Residency",
    type: "Hotel",
    district: "West Sikkim",
    image: hotelImg,
    address: "Pelling, West Sikkim",
    rating: 4.4,
    highlight: "Central location for sightseeing",
  },
  {
    id: "5",
    name: "Alpine Crest Guesthouse",
    type: "Guesthouse",
    district: "North Sikkim",
    image: guesthouseImg,
    address: "Lachung, North Sikkim",
    rating: 4.6,
    highlight: "Family-run, cozy rooms",
  },
];

const districts = ["All", "East Sikkim", "West Sikkim", "South Sikkim", "North Sikkim"];

const SikkimAccommodations: React.FC = () => {
  // In a full app, you'd use useState for district filtering
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #141a26 15%, #1e283e 85%)",
        color: "#c7f6ef",
        fontFamily: "'Montserrat', sans-serif",
        padding: "4rem 6vw",
      }}
    >
      {/* Header and Description */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem", maxWidth: "700px", margin: "0 auto", paddingBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "2.7rem",
            fontWeight: 700,
            color: "#31ffb1",
            letterSpacing: "1.2px",
            marginBottom: "1.3rem",
          }}
        >
          Sikkim Accommodations
        </h1>
        <p
          style={{
            color: "#a1dad7",
            fontSize: "1.18rem",
            letterSpacing: "0.1px",
            paddingBottom: "1.2rem",
          }}
        >
          Browse a curated list of hotels, resorts, homestays, and guesthouses across Sikkim’s districts. All are government-compliant, comfortable, and designed for an authentic mountain experience.
        </p>
        {/* District Filters */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          {districts.map((district) => (
            <Button
              key={district}
              variant="monastery"
              size="sm"
              style={{
                borderRadius: "999px",
                backgroundColor: "#1e283e",
                color: "#31ffb1",
                border: "1px solid #31ffb1",
                fontWeight: 600,
                padding: "0.5rem 1.4rem",
              }}
            >
              {district}
            </Button>
          ))}
        </div>
      </div>

      {/* Accommodation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ maxWidth: "1300px", margin: "0 auto" }}>
        {accommodations.map(acc => (
          <Card key={acc.id} className="monastery-card bg-card overflow-hidden hover:bg-card-hover">
            <div className="relative">
              <img
                src={acc.image}
                alt={acc.name}
                className="w-full h-48 object-cover"
                style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
              />
              <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                {acc.type === "Resort" ? <Sun className="h-4 w-4 mr-1" /> : acc.type === "Homestay" ? <Home className="h-4 w-4 mr-1" /> : <Stars className="h-4 w-4 mr-1" />}
                {acc.type}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-lato text-primary line-clamp-2">{acc.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{acc.address}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Stars className="h-4 w-4 text-accent mr-1" />
                <span>{acc.rating} / 5.0</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2 italic">{acc.highlight}</div>
              <div className="flex gap-2">
                <Button variant="monastery" size="sm" className="flex-1">Details</Button>
                <Button variant="outline" size="sm" className="border-primary text-primary">
                  Book
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SikkimAccommodations;
