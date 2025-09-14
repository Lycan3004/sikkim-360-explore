import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Star, House } from 'lucide-react';

const events = [
  {
    id: '1',
    title: 'Monastic Festival',
    monastery: 'Rumtek Monastery',
    date: '2025-10-10',
    time: '09:00 AM',
    duration: '3 days',
    participants: 150,
    price: 'Free',
    description: 'Annual celebration featuring traditional mask dances and sacred rituals',
    type: 'festival',
    isPopular: true,
  },
  {
    id: '2',
    title: 'Sacred Mask Dance',
    monastery: 'Pemayangtse Monastery',
    date: '2026-01-05',
    time: '10:30 AM',
    duration: '1 day',
    participants: 80,
    price: '₹200',
    description: 'Traditional Cham dance performance telling stories of good triumphing over evil',
    type: 'performance',
    isPopular: false,
  },
  {
    id: '3',
    title: 'Meditation Retreat',
    monastery: 'Enchey Monastery',
    date: '2026-06-21',
    time: '06:00 AM',
    duration: '7 days',
    participants: 25,
    price: '₹1,500',
    description: 'Week-long meditation retreat with experienced monks in a peaceful setting',
    type: 'retreat',
    isPopular: true,
  },
];

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'festival': return 'bg-purple-100 text-purple-800';
    case 'performance': return 'bg-blue-100 text-blue-800';
    case 'retreat': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const CulturalCalendar = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-primary mb-4">
            Cultural Calendar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join authentic Buddhist festivals, sacred rituals, and meditation retreats throughout the year. Experience Sikkim's living spiritual traditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="monastery-card overflow-hidden">
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      {event.isPopular && (
                        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-lato text-primary line-clamp-2 mb-2">
                      {event.title}
                    </CardTitle>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.monastery}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time} • {event.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {event.participants} participants max
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-lato font-bold text-primary">
                    {event.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per person
                  </div>
                </div>
                
                <Button 
                  variant="monastery" 
                  className="w-full"
                  onClick={() => navigate('/accommodation')} // Redirect on click
                >
                  Book Experience
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-xl font-lato font-bold text-primary mb-4">
              Plan Your Spiritual Journey
            </h3>
            <p className="text-muted-foreground mb-6">
              View our complete festival calendar and book authentic cultural experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/accommodation')} // Redirect on click
              >
                <House className="h-4 w-4" />
                Accommodation
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary">
                Custom Itinerary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalCalendar;
