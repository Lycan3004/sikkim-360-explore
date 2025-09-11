import React from 'react';
import { Button } from '@/components/ui/button';
import MonasteryCard from './MonasteryCard';
import { ArrowRight } from 'lucide-react';
import buddhistMural from '@/assets/rumtek.jpg';
import manuscriptImage from '@/assets/pemayangtse.webp';
import heroImage from '@/assets/richenpong.jpeg';
import { Link } from 'react-router-dom';

const featuredMonasteries = [
  {
    id: '1',
    name: 'Rumtek Monastery',
    description: 'One of the most significant monasteries in Sikkim, seat of the 16th Karmapa.',
    region: 'East Sikkim',
    image: buddhistMural,
    rating: 4.8,
    yearEstablished: 1740,
    hasVirtualTour: true,
    accessibility: 'full' as const,
    link: '/rumtek-dt',
  },
  {
    id: '2',
    name: 'Pemayangtse Monastery',
    description: 'The second oldest monastery in Sikkim, known for its seven-tiered wooden sculpture.',
    region: 'West Sikkim',
    image: manuscriptImage,
    rating: 4.7,
    yearEstablished: 1705,
    hasVirtualTour: true,
    accessibility: 'partial' as const,
  },
  {
    id: '3',
    name: 'Richenpong Monastery',
    description: 'A tranquil monastery in Sikkim, revered for its spiritual significance and timeless Buddhist heritage.',
    region: 'East Sikkim',
    image: heroImage,
    rating: 4.6,
    yearEstablished: 1840,
    hasVirtualTour: false,
    accessibility: 'limited' as const,
  },
];

const FeaturedMonasteries = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-primary mb-4">
            Featured Sacred Sites
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most revered monasteries of Sikkim, each preserving centuries of Buddhist heritage and wisdom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMonasteries.map((monastery) => (
            <MonasteryCard
              key={monastery.id}
              monastery={monastery}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Monasteries
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMonasteries;
