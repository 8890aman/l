import React from 'react';
import { Typography, Card, CardBody, Button, Chip } from "@material-tailwind/react";
import colors from "../../../theme/colors";

const CommunityEvents = () => {
  // Event data
  const events = [
    {
      id: 1,
      title: "Weekly Battle Tournament",
      description: "Compete with your strongest creatures in our weekly tournament. Top 3 winners receive exclusive rewards!",
      date: "Jun 15, 2023",
      time: "18:00 UTC",
      location: "Battle Arena",
      type: "Tournament",
      typeColor: colors.gold,
      image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      attendees: 42
    },
    {
      id: 2,
      title: "Rare Creature Trading Event",
      description: "Special trading event featuring only rare and legendary creatures. Bring your best offers!",
      date: "Jun 18, 2023",
      time: "15:00 UTC",
      location: "Trading Hub",
      type: "Trading",
      typeColor: colors.turquoise,
      image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      attendees: 78
    },
    {
      id: 3,
      title: "VoltVixen Evolution Event",
      description: "Special limited-time event: All VoltVixen evolve at 2x speed. Don't miss this chance to power up your electric creatures!",
      date: "Jun 22, 2023",
      time: "All Day",
      location: "Global",
      type: "Special",
      typeColor: "#FBBF24",
      image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      attendees: 124
    }
  ];

  // Featured event (first in the list)
  const featuredEvent = events[0];
  
  // Other events
  const otherEvents = events.slice(1);

  return (
    <div className="bg-gray-50 w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <Typography variant="h2" className="font-pixel text-3xl mb-2" style={{ color: colors.turquoise }}>
            COMMUNITY EVENTS
          </Typography>
          <Typography className="text-gray-600 max-w-2xl">
            Join fellow trainers in tournaments, trading events, and special feature launches.
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Event */}
          <div className="lg:col-span-2">
            <Card className="shadow-md overflow-hidden h-full">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={featuredEvent.image} 
                  alt={featuredEvent.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Chip 
                    value={featuredEvent.type} 
                    className="font-pixel text-xs"
                    style={{ 
                      backgroundColor: featuredEvent.typeColor,
                      color: "#000"
                    }}
                  />
                </div>
              </div>
              <CardBody>
                <div className="mb-4">
                  <Typography variant="h4" className="font-pixel mb-2" style={{ color: colors.gold }}>
                    {featuredEvent.title}
                  </Typography>
                  <Typography className="text-gray-600 mb-4">
                    {featuredEvent.description}
                  </Typography>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <Typography className="text-xs text-gray-500">Date & Time</Typography>
                    <Typography className="font-medium">
                      {featuredEvent.date} • {featuredEvent.time}
                    </Typography>
                  </div>
                  <div className="flex flex-col">
                    <Typography className="text-xs text-gray-500">Location</Typography>
                    <Typography className="font-medium">
                      {featuredEvent.location}
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center overflow-hidden"
                        >
                          <Typography className="text-xs font-semibold text-gray-600">
                            {String.fromCharCode(65 + i)}
                          </Typography>
                        </div>
                      ))}
                    </div>
                    <Typography className="ml-2 text-sm text-gray-600">
                      +{featuredEvent.attendees - 3} attending
                    </Typography>
                  </div>
                  
                  <Button 
                    className="font-pixel text-sm"
                    style={{ backgroundColor: colors.turquoise, color: "#000" }}
                  >
                    JOIN EVENT
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
          
          {/* Event Calendar */}
          <div>
            <Card className="shadow-md h-full">
              <CardBody>
                <Typography variant="h5" className="font-pixel mb-4" style={{ color: colors.gold }}>
                  UPCOMING EVENTS
                </Typography>
                
                <div className="space-y-4">
                  {otherEvents.map(event => (
                    <div key={event.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start">
                        <div 
                          className="w-12 h-12 rounded-lg mr-3 flex-shrink-0 flex flex-col items-center justify-center text-white"
                          style={{ backgroundColor: event.typeColor }}
                        >
                          <Typography className="text-xs font-bold text-black">
                            {event.date.split(' ')[1]}
                          </Typography>
                          <Typography className="text-sm font-bold text-black">
                            {event.date.split(' ')[0]}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="font-medium">
                            {event.title}
                          </Typography>
                          <Typography className="text-xs text-gray-500">
                            {event.time} • {event.location}
                          </Typography>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Typography className="text-sm text-gray-600 line-clamp-2">
                          {event.description}
                        </Typography>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <Typography className="text-xs text-gray-500">
                          {event.attendees} attending
                        </Typography>
                        <Button 
                          size="sm"
                          variant="text"
                          className="font-pixel text-xs p-0"
                          style={{ color: colors.turquoise }}
                        >
                          VIEW DETAILS
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  fullWidth
                  variant="outlined"
                  className="mt-6 font-pixel text-sm"
                  style={{ 
                    color: colors.gold,
                    borderColor: colors.gold
                  }}
                >
                  VIEW ALL EVENTS
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityEvents; 