import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Camera, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MonasteryCardProps {
  monastery: {
    id: string;
    name: string;
    description: string;
    region: string;
    image: string;
    rating: number;
    yearEstablished: number;
    hasVirtualTour: boolean;
    accessibility: 'full' | 'partial' | 'limited';
  };
  className?: string;
}

const MonasteryCard: React.FC<MonasteryCardProps> = ({ monastery, className }) => {
  const getAccessibilityColor = (level: string) => {
    switch (level) {
      case 'full': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'limited': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={cn("monastery-card bg-card hover:bg-card-hover overflow-hidden", className)}>
      <div className="relative">
        <img
          src={monastery.image}
          alt={monastery.name}
          className="w-full h-48 object-cover"
        />
        {monastery.hasVirtualTour && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            <Camera className="h-3 w-3 mr-1" />
            360° Tour
          </Badge>
        )}
        <div className="absolute top-3 left-3">
          <div className="flex items-center bg-white/90 rounded-full px-2 py-1 text-sm">
            <Star className="h-3 w-3 text-accent mr-1" />
            {monastery.rating}
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-lato text-primary line-clamp-2">
            {monastery.name}
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {monastery.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Region and Year */}
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{monastery.region}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>Est. {monastery.yearEstablished}</span>
          </div>
          
          {/* Accessibility Badge */}
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={getAccessibilityColor(monastery.accessibility)}
            >
              <Users className="h-3 w-3 mr-1" />
              {monastery.accessibility} access
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="monastery" className="flex-1" size="sm">
              Explore
            </Button>
            <Button variant="outline" size="sm" className="border-primary text-primary">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonasteryCard;