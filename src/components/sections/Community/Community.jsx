import React from "react";
import { Typography, Card, Button } from "@material-tailwind/react";

const Community = () => {
  const upcomingEvents = [
    {
      title: "Battle Tournament",
      date: "May 15, 2024",
      prize: "50 ETH",
      participants: 128,
      status: "Registering"
    },
    {
      title: "Breeding Event",
      date: "May 20, 2024",
      prize: "Rare Egg",
      participants: 256,
      status: "Coming Soon"
    },
    {
      title: "Training Workshop",
      date: "May 18, 2024",
      prize: "Skill Boost",
      participants: 64,
      status: "Open"
    }
  ];

  const trainerStats = {
    totalTrainers: "10,234",
    activeBattles: "456",
    rarityScore: "8.7/10",
    communityRating: "Excellent"
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto">
        {/* Community Header */}
        <div className="text-center mb-10">
          <Typography variant="h2" className="font-pixel text-4xl text-gray-800 mb-4">
            Community Hub
          </Typography>
          <Typography className="text-gray-600 font-pixel">
            Connect, Compete, and Grow Together
          </Typography>
        </div>

        {/* Events Section */}
        <div className="mb-12">
          <Typography variant="h3" className="font-pixel text-2xl text-gray-800 mb-6">
            Upcoming Events
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="p-6 bg-white shadow-lg rounded-xl border border-gray-100">
                <Typography variant="h5" className="font-pixel text-gray-800 mb-4">
                  {event.title}
                </Typography>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <Typography className="text-gray-600 font-pixel">Date</Typography>
                    <Typography className="text-gray-800 font-pixel">{event.date}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography className="text-gray-600 font-pixel">Prize</Typography>
                    <Typography className="text-gray-800 font-pixel">{event.prize}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography className="text-gray-600 font-pixel">Participants</Typography>
                    <Typography className="text-gray-800 font-pixel">{event.participants}</Typography>
                  </div>
                </div>
                <Button 
                  className="w-full bg-purple-500 font-pixel text-sm"
                  disabled={event.status === "Coming Soon"}
                >
                  {event.status}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Trainer Stats */}
        <div className="mb-12">
          <Typography variant="h3" className="font-pixel text-2xl text-gray-800 mb-6">
            Trainer Statistics
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(trainerStats).map(([key, value]) => (
              <Card key={key} className="p-6 bg-white shadow-lg rounded-xl border border-gray-100">
                <Typography className="text-gray-600 font-pixel mb-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Typography>
                <Typography variant="h4" className="font-pixel text-gray-800">
                  {value}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community; 