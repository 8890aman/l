import React, { useState } from 'react';
import { Typography, Card, CardBody, CardFooter, Button, Chip, Input, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, FireIcon, BoltIcon, CloudIcon } from "@heroicons/react/24/outline";
import colors from "../../../theme/colors";

// Import creature images
import TidalWraithImg from "../../../assets/pixel-art--gyarados-nft-collectible-style--white-b.png";
import VoltVixenImg from "../../../assets/pixel-art--electrofox-nft-collectible-style--white-background.png";
import EmberWingImg from "../../../assets/pixel-art--firedragon-nft-collectible-style--white-background.png";
import MysteryImg from "../../../assets/pixel-art--mystery-nft-collectible-style--white-background.png";

const CreatureDex = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Define creature types
  const types = [
    { value: "all", label: "All Types", icon: <AdjustmentsHorizontalIcon className="h-4 w-4" /> },
    { value: "fire", label: "Fire", icon: <FireIcon className="h-4 w-4" style={{ color: "#F97316" }} /> },
    { value: "electric", label: "Electric", icon: <BoltIcon className="h-4 w-4" style={{ color: "#FACC15" }} /> },
    { value: "water", label: "Water", icon: <CloudIcon className="h-4 w-4" style={{ color: "#0EA5E9" }} /> },
  ];
  
  // Creature data
  const creatures = [
    {
      id: 1,
      name: "TidalWraith",
      number: "001",
      type: "water",
      image: TidalWraithImg,
      description: "A powerful water serpent that commands the seas with tsunami-like abilities.",
      stats: {
        power: 85,
        speed: 70,
        defense: 65
      },
      rarity: "Rare",
      discovered: true
    },
    {
      id: 2,
      name: "VoltVixen",
      number: "002",
      type: "electric",
      image: VoltVixenImg,
      description: "A quick-witted electric fox with the ability to generate lightning storms.",
      stats: {
        power: 65,
        speed: 95,
        defense: 50
      },
      rarity: "Uncommon",
      discovered: true
    },
    {
      id: 3,
      name: "EmberWing",
      number: "003",
      type: "fire",
      image: EmberWingImg,
      description: "A majestic fire dragon whose wings burn with the intensity of a thousand suns.",
      stats: {
        power: 90,
        speed: 60,
        defense: 75
      },
      rarity: "Rare",
      discovered: true
    },
    {
      id: 4,
      name: "EnigmaShift",
      number: "004",
      type: "psychic",
      image: MysteryImg,
      description: "A mysterious creature that can alter its form based on the thoughts of its trainer.",
      stats: {
        power: "???",
        speed: "???",
        defense: "???"
      },
      rarity: "Legendary",
      discovered: false
    },
    {
      id: 5,
      name: "StoneClaw",
      number: "005",
      type: "earth",
      image: null,
      description: "A sturdy earth creature with claws that can cut through solid rock.",
      stats: {
        power: 75,
        speed: 40,
        defense: 95
      },
      rarity: "Uncommon",
      discovered: false
    },
    {
      id: 6,
      name: "NightShade",
      number: "006",
      type: "dark",
      image: null,
      description: "A shadow creature that blends into the darkness and strikes without warning.",
      stats: {
        power: 80,
        speed: 80,
        defense: 60
      },
      rarity: "Rare",
      discovered: false
    }
  ];
  
  // Filter creatures based on active tab and search term
  const filteredCreatures = creatures.filter(creature => {
    const matchesType = activeTab === "all" || creature.type === activeTab;
    const matchesSearch = creature.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          creature.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  // Type color mapping
  const typeColors = {
    "fire": { bg: "#FFEDD5", text: "#F97316", border: "#FDBA74" },
    "water": { bg: "#E0F2FE", text: "#0EA5E9", border: "#7DD3FC" },
    "electric": { bg: "#FEF9C3", text: "#CA8A04", border: "#FDE047" },
    "psychic": { bg: "#F3E8FF", text: "#9333EA", border: "#D8B4FE" },
    "earth": { bg: "#F7FEE7", text: "#65A30D", border: "#BEF264" },
    "dark": { bg: "#E2E8F0", text: "#334155", border: "#94A3B8" }
  };
  
  // Rarity color mapping
  const rarityColors = {
    "Common": colors.turquoise,
    "Uncommon": "#65A30D",
    "Rare": colors.gold,
    "Legendary": "#9333EA"
  };
  
  return (
    <div className="bg-white w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <Typography variant="h2" className="font-pixel text-3xl" style={{ color: colors.turquoise }}>
              CREATURE DEX
            </Typography>
            <Typography className="text-gray-600 max-w-2xl">
              Your compendium of discovered creatures and their attributes. Catalog, research, and track your collection.
            </Typography>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <Typography variant="small" className="text-gray-700">
              <span className="font-semibold">{creatures.filter(c => c.discovered).length}</span> / {creatures.length} Discovered
            </Typography>
            <Button 
              className="font-pixel"
              style={{ 
                backgroundColor: colors.gold,
                color: "black" 
              }}
            >
              EXPORT DATA
            </Button>
          </div>
        </div>
        
        {/* Filters and search */}
        <div className="mb-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/3">
            <Input
              label="Search Creatures"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-2/3">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
              <TabsHeader className="bg-gray-100">
                {types.map(({ value, label, icon }) => (
                  <Tab key={value} value={value} className="flex items-center space-x-2">
                    {icon}
                    <span>{label}</span>
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>
        </div>
        
        {/* Creature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCreatures.map(creature => (
            <Card key={creature.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="relative">
                {creature.discovered ? (
                  <img 
                    src={creature.image} 
                    alt={creature.name}
                    className="w-full h-64 object-contain bg-gray-50"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <Typography variant="h4" className="text-gray-400 font-pixel">
                      ? ? ?
                    </Typography>
                  </div>
                )}
                
                <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded">
                  <Typography variant="small" className="text-white font-pixel">
                    #{creature.number}
                  </Typography>
                </div>
                
                {creature.discovered && (
                  <div 
                    className="absolute top-2 right-2 px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: typeColors[creature.type].bg,
                      border: `1px solid ${typeColors[creature.type].border}`
                    }}
                  >
                    <Typography 
                      variant="small" 
                      className="font-medium"
                      style={{ color: typeColors[creature.type].text }}
                    >
                      {creature.type.charAt(0).toUpperCase() + creature.type.slice(1)}
                    </Typography>
                  </div>
                )}
              </div>
              
              <CardBody className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Typography variant="h5" className="font-pixel" style={{ color: creature.discovered ? colors.turquoise : "#94A3B8" }}>
                    {creature.discovered ? creature.name : "UNDISCOVERED"}
                  </Typography>
                  
                  {creature.discovered && (
                    <Chip 
                      size="sm"
                      value={creature.rarity} 
                      className="px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${rarityColors[creature.rarity]}20`,
                        color: rarityColors[creature.rarity]
                      }}
                    />
                  )}
                </div>
                
                <Typography variant="small" className="text-gray-700 mb-3 line-clamp-2 h-10">
                  {creature.discovered ? creature.description : "This creature has not yet been discovered."}
                </Typography>
                
                {creature.discovered && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Typography variant="small" className="text-gray-500">Power</Typography>
                      <Typography variant="small" className="font-semibold">{creature.stats.power}</Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography variant="small" className="text-gray-500">Speed</Typography>
                      <Typography variant="small" className="font-semibold">{creature.stats.speed}</Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography variant="small" className="text-gray-500">Defense</Typography>
                      <Typography variant="small" className="font-semibold">{creature.stats.defense}</Typography>
                    </div>
                  </div>
                )}
              </CardBody>
              
              <CardFooter className="pt-0">
                <Button 
                  fullWidth
                  variant={creature.discovered ? "filled" : "outlined"}
                  className="font-pixel text-sm"
                  style={{ 
                    backgroundColor: creature.discovered ? colors.turquoise : "transparent",
                    color: creature.discovered ? "white" : colors.turquoise,
                    borderColor: creature.discovered ? colors.turquoise : colors.turquoise
                  }}
                >
                  {creature.discovered ? "VIEW DETAILS" : "MARK AS DISCOVERED"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredCreatures.length === 0 && (
          <div className="bg-gray-50 p-10 rounded-lg text-center">
            <Typography variant="h5" className="font-pixel text-gray-500">
              NO CREATURES FOUND
            </Typography>
            <Typography className="text-gray-600 mt-2">
              Try adjusting your search or filters to find more creatures.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatureDex; 