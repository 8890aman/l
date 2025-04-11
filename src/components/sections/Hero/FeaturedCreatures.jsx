import React, { useState } from "react";
import { Typography, Button, Card } from "@material-tailwind/react";

// Import colors from theme
import colors from "../../../theme/colors";

// Import creature images
import firedragonImg from "../../../assets/pixel-art-fire-dragon-creature--vibrant-orange-and-removebg-preview.png";
import gyaradosImg from "../../../assets/pixel-art--gyarados-nft-collectible-style--white-b.png";
import infernoRexImg from "../../../assets/---pixel-art-fire-dinosaur-creature-with-crimson-s.png";
import abyssalFangImg from "../../../assets/---pixel-art-dark-water-serpent-with-deep-blue-bla.png";
import pyroStrikerImg from "../../../assets/pixel-art-humanoid-animal-with-flame-covered-fists.png";
import waterDragonImg from "../../../assets/pixel-art-water-dragon--blue-and-cyan-color-palett (1).png";

const FeaturedCreatures = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Featured creatures with detailed descriptions
  const featuredCreatures = [
    {
      id: 1,
      name: "EmberWing",
      image: firedragonImg,
      type: "FIRE",
      rarity: "RARE",
      description: "A majestic fire dragon whose wings glow with the intensity of molten lava. EmberWing's fiery breath can melt even the toughest metals.",
      price: "0.85 ETH"
    },
    {
      id: 2,
      name: "TidalWraith",
      image: gyaradosImg,
      type: "WATER",
      rarity: "ULTRA RARE",
      description: "The ancient guardian of deep seas, TidalWraith commands the power of tsunamis. Its roar alone can part the waters of entire oceans.",
      price: "1.25 ETH"
    },
    {
      id: 3,
      name: "InfernoRex",
      image: infernoRexImg,
      type: "FIRE",
      rarity: "EPIC",
      description: "A primordial fire dinosaur with scales hardened by volcanic heat. InfernoRex leaves trails of flames wherever it walks.",
      price: "1.05 ETH"
    },
    {
      id: 4,
      name: "AbyssalFang",
      image: abyssalFangImg,
      type: "WATER/DARK",
      rarity: "LEGENDARY",
      description: "Born in the darkest depths of the ocean, AbyssalFang strikes fear into all sea dwellers. Its body generates ghostly blue flames underwater.",
      price: "1.45 ETH"
    },
    {
      id: 5,
      name: "PyroStriker",
      image: pyroStrikerImg,
      type: "FIRE/FIGHTING",
      rarity: "RARE",
      description: "A martial arts master with fists of flame, PyroStriker moves with incredible speed and precision. Its combat prowess is unmatched.",
      price: "0.95 ETH"
    },
    {
      id: 6,
      name: "TidalDrake",
      image: waterDragonImg,
      type: "WATER/DRAGON",
      rarity: "MYTHIC",
      description: "An ancient water dragon that controls ocean currents with a flick of its tail. TidalDrake has been sighted by sailors throughout history.",
      price: "1.75 ETH"
    }
  ];

  const currentFeatured = featuredCreatures[featuredIndex];

  // Navigate to next featured creature
  const handleNext = () => {
    setFeaturedIndex((prev) => (prev < featuredCreatures.length - 1 ? prev + 1 : 0));
  };

  // Navigate to previous featured creature
  const handlePrev = () => {
    setFeaturedIndex((prev) => (prev > 0 ? prev - 1 : featuredCreatures.length - 1));
  };

  return (
    <div className="w-full py-8 px-4 flex flex-col items-center">
      {/* Section header */}
      <div className="w-full text-center mb-8">
        <Typography variant="h2" className="font-pixel text-3xl mb-2" style={{ color: colors.turquoise }}>
          FEATURED CREATURES
        </Typography>
        <Typography className="text-gray-600 max-w-2xl mx-auto">
          Explore our rarest and most powerful digital creatures. Each one is a unique NFT with special abilities and lore.
        </Typography>
      </div>

      {/* Featured creature spotlight */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        {/* Image section */}
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center" style={{ backgroundColor: colors.lightYellow }}>
          <img 
            src={currentFeatured.image} 
            alt={currentFeatured.name} 
            className="h-80 object-contain"
          />
        </div>

        {/* Details section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <Typography variant="h3" className="font-pixel text-2xl">
                {currentFeatured.name}
              </Typography>
              <div 
                className="px-3 py-1 rounded-full text-xs" 
                style={{ 
                  backgroundColor: colors.gold + '20',
                  color: colors.gold,
                  border: `1px solid ${colors.gold}`
                }}
              >
                {currentFeatured.rarity}
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <div 
                className="px-2 py-1 rounded text-xs" 
                style={{ 
                  backgroundColor: colors.turquoise + '20',
                  color: colors.turquoise,
                  border: `1px solid ${colors.turquoise}`
                }}
              >
                {currentFeatured.type}
              </div>
              <div 
                className="px-2 py-1 rounded text-xs" 
                style={{ 
                  backgroundColor: colors.mintGreen + '20',
                  color: colors.mintGreen,
                  border: `1px solid ${colors.mintGreen}`
                }}
              >
                NFT
              </div>
            </div>

            <Typography className="text-gray-700 mb-8">
              {currentFeatured.description}
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <Typography className="text-sm text-gray-500">Current price</Typography>
              <Typography variant="h4" className="font-pixel text-xl" style={{ color: colors.turquoise }}>
                {currentFeatured.price}
              </Typography>
            </div>
            <Button 
              className="rounded-full px-6"
              style={{ backgroundColor: colors.turquoise, color: 'white' }}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-center gap-4 mb-12">
        <Button 
          onClick={handlePrev}
          className="rounded-full w-12 h-12 flex items-center justify-center"
          style={{ backgroundColor: 'white', color: colors.turquoise, border: `1px solid ${colors.turquoise}` }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Button>
        <Button 
          onClick={handleNext}
          className="rounded-full w-12 h-12 flex items-center justify-center"
          style={{ backgroundColor: colors.turquoise, color: 'white' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Button>
      </div>

      {/* Gallery section */}
      <div className="w-full max-w-6xl">
        <Typography variant="h4" className="font-pixel text-xl mb-6" style={{ color: colors.turquoise }}>
          COLLECTION GALLERY
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredCreatures.map((creature) => (
            <Card key={creature.id} className="overflow-hidden">
              <div className="h-48 flex items-center justify-center p-4" style={{ backgroundColor: colors.lightYellow }}>
                <img 
                  src={creature.image} 
                  alt={creature.name} 
                  className="h-full object-contain"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography className="font-pixel">{creature.name}</Typography>
                  <Typography className="text-sm" style={{ color: colors.turquoise }}>{creature.price}</Typography>
                </div>
                <div className="flex gap-2">
                  <div 
                    className="px-2 py-0.5 rounded text-xs" 
                    style={{ 
                      backgroundColor: colors.turquoise + '20',
                      color: colors.turquoise,
                      border: `1px solid ${colors.turquoise}`
                    }}
                  >
                    {creature.type}
                  </div>
                  <div 
                    className="px-2 py-0.5 rounded text-xs" 
                    style={{ 
                      backgroundColor: colors.gold + '20',
                      color: colors.gold,
                      border: `1px solid ${colors.gold}`
                    }}
                  >
                    {creature.rarity}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCreatures; 