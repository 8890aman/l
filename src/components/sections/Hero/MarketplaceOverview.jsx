import React from 'react';
import { Typography, Card, CardBody, Button, Progress } from "@material-tailwind/react";
import colors from "../../../theme/colors";

// Import creature images
import emberWing from "../../../assets/pixel-art--ember-fire-dragon-pokemon-nft-collecti.png";
import voltVixen from "../../../assets/pixel-art--electro-yellow-fox-pokemon-nft-collect.png";
import tidalWraith from "../../../assets/pixel-art--gyarados-nft-collectible-style--white-b.png";
import forestGuardian from "../../../assets/---pixel-art-leaf-covered-forest-guardian-creature.png";

const MarketplaceOverview = () => {
  // Featured listings data
  const featuredListings = [
    {
      id: 1,
      name: "EmberWing",
      image: emberWing,
      price: "1.45 ETH",
      seller: "Ash_Ketchum",
      timeLeft: "6h 23m",
      bidCount: 8,
      colors: ["#FF5A5A", "#991111"]
    },
    {
      id: 2,
      name: "VoltVixen",
      image: voltVixen,
      price: "0.95 ETH",
      seller: "Electric_Master",
      timeLeft: "3h 45m",
      bidCount: 12,
      colors: ["#EAB308", "#854D0E"]
    },
    {
      id: 3,
      name: "TidalWraith",
      image: tidalWraith,
      price: "2.35 ETH",
      seller: "WaterGuru",
      timeLeft: "12h 10m",
      bidCount: 5,
      colors: ["#0EA5E9", "#0C4A6E"]
    },
    {
      id: 4,
      name: "ForestGuardian",
      image: forestGuardian,
      price: "1.15 ETH",
      seller: "LeafTrainer",
      timeLeft: "8h 37m",
      bidCount: 7,
      colors: ["#22C55E", "#14532D"]
    }
  ];

  // Market trends data
  const marketTrends = [
    { type: "Fire", growth: 28, color: "#F87171" },
    { type: "Water", growth: 12, color: "#60A5FA" },
    { type: "Electric", growth: 35, color: "#FBBF24" },
    { type: "Grass", growth: 18, color: "#4ADE80" },
    { type: "Dragon", growth: 42, color: "#C084FC" }
  ];

  return (
    <div className="bg-gray-50 w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <Typography variant="h2" className="font-pixel text-3xl mb-2" style={{ color: colors.turquoise }}>
              MARKETPLACE
            </Typography>
            <Typography className="text-gray-600 max-w-2xl">
              Explore the hottest listings and market trends for digital creatures in our marketplace.
            </Typography>
          </div>
          <Button 
            className="rounded-full px-6 py-3 font-pixel text-sm"
            style={{ backgroundColor: colors.gold, color: "#000" }}
          >
            VIEW ALL
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Featured listings */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardBody className="p-0">
                    {/* Image section */}
                    <div 
                      className="h-48 relative" 
                      style={{ 
                        background: `linear-gradient(135deg, ${listing.colors[0]}20, ${listing.colors[1]}40)`,
                      }}
                    >
                      <img 
                        src={listing.image} 
                        alt={listing.name}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                      />
                      <div 
                        className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          color: listing.colors[0],
                        }}
                      >
                        {listing.timeLeft} left
                      </div>
                    </div>

                    {/* Info section */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Typography variant="h5" className="font-pixel" style={{ color: colors.gold }}>
                          {listing.name}
                        </Typography>
                        <div className="text-right">
                          <Typography className="text-xs text-gray-500">Current bid</Typography>
                          <Typography className="font-pixel text-md" style={{ color: colors.turquoise }}>
                            {listing.price}
                          </Typography>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
                          <Typography className="text-sm text-gray-700">
                            @{listing.seller}
                          </Typography>
                        </div>
                        <Typography className="text-sm text-gray-500">
                          {listing.bidCount} bids
                        </Typography>
                      </div>

                      <Button 
                        fullWidth
                        className="mt-2 rounded-md font-pixel text-sm"
                        style={{ 
                          backgroundColor: "white", 
                          color: colors.turquoise,
                          border: `1px solid ${colors.turquoise}`
                        }}
                      >
                        PLACE BID
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Market trends */}
          <div className="w-full lg:w-1/4">
            <Card className="shadow-md h-full">
              <CardBody>
                <Typography variant="h5" className="font-pixel mb-6" style={{ color: colors.gold }}>
                  MARKET TRENDS
                </Typography>

                <div className="space-y-6">
                  {marketTrends.map((trend, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <Typography className="text-sm font-medium">
                          {trend.type} Type
                        </Typography>
                        <Typography className="text-sm font-pixel" style={{ color: trend.color }}>
                          +{trend.growth}%
                        </Typography>
                      </div>
                      <Progress 
                        value={trend.growth} 
                        color="blue"
                        size="sm"
                        className="h-1.5"
                        style={{ 
                          '--progress-color': trend.color,
                          background: `${trend.color}30`
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Typography variant="h6" className="font-pixel mb-4" style={{ color: colors.gold }}>
                    HOT SEARCHES
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {['Legendary', 'Dragon', 'Limited', 'Water', 'Gen1', 'Rare', 'Fire', 'Flying'].map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${colors.turquoise}20`,
                          color: colors.turquoise
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceOverview; 