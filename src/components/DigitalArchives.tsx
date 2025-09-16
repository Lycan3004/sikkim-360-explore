import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Archive, Book, Image, Download, Search, Eye } from 'lucide-react';
import manuscriptImage from '@/assets/buddhist-manuscript2.jpg';
import muralImage from '@/assets/buddhist-mural1.jpg';
import wheelImage from '@/assets/prayerwheel.jpg';
import { Link } from 'react-router-dom';

const archiveItems = [
  {
    id: '1',
    title: 'Ancient Buddhist Manuscript',
    type: 'manuscript',
    monastery: 'Rumtek Monastery',
    century: '14th Century',
    language: 'Tibetan',
    image: manuscriptImage,
    description: 'Rare illuminated manuscript containing Lotus Sutra teachings',
    detailLink: '/muraldetails/abd-manuscript', // added detail link
  },
  {
    id: '2',
    title: 'Sacred Mural Collection',
    type: 'mural',
    monastery: 'Pemayangtse Monastery',
    century: '18th Century',
    language: 'Sanskrit',
    image: muralImage,
    description: 'Detailed wall paintings depicting the life of Buddha',
    detailLink: '/muraldetails/sacred-mural', // added detail link
  },
  {
    id: '3',
    title: 'Prayer Wheel Inscriptions',
    type: 'photo',
    monastery: 'Enchey Monastery',
    century: '19th Century',
    language: 'Tibetan',
    image: wheelImage,
    description: 'Historical documentation of sacred prayer wheel mantras',
    detailLink: '/muraldetails/prayer-insc', // added detail link
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'manuscript':
      return <Book className="h-4 w-4" />;
    case 'mural':
      return <Image className="h-4 w-4" />;
    case 'photo':
      return <Archive className="h-4 w-4" />;
    default:
      return <Archive className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'manuscript':
      return 'bg-blue-100 text-blue-800';
    case 'mural':
      return 'bg-purple-100 text-purple-800';
    case 'photo':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const DigitalArchives = () => {
  return (
    <section id='digital-archives' className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-primary mb-4">
            Digital Heritage Archives
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our digitized collection of ancient manuscripts, sacred murals, and historical artifacts preserving Sikkim's Buddhist heritage.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center p-4">
            <div className="text-2xl font-lato font-bold text-accent mb-1">127</div>
            <div className="text-sm text-muted-foreground">Manuscripts</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-lato font-bold text-accent mb-1">89</div>
            <div className="text-sm text-muted-foreground">Murals</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-lato font-bold text-accent mb-1">245</div>
            <div className="text-sm text-muted-foreground">Photographs</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-lato font-bold text-accent mb-1">58</div>
            <div className="text-sm text-muted-foreground">Documents</div>
          </Card>
        </div>

        {/* Archive Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {archiveItems.map((item) => (
            <Card key={item.id} className="monastery-card overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className={`absolute top-3 right-3 ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                  {item.type}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-lato text-primary line-clamp-2">
                  {item.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{item.monastery}</span>
                  <span className="mx-2">•</span>
                  <span>{item.century}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex gap-2">
                  <Link to={item.detailLink} className="flex-1" style={{ textDecoration: 'none' }}>
                    <Button variant="monastery" size="sm" style={{ width: '100%' }}>
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="border-primary text-primary">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Browse */}
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-lato font-bold text-primary mb-4">
            Explore Our Complete Archive
          </h3>
          <p className="text-muted-foreground mb-6">
            Search through hundreds of digitized artifacts using our advanced filtering system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              <Search className="h-4 w-4" />
              Advanced Search
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary">
              Browse All Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalArchives;