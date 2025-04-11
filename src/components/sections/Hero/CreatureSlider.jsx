import React, { useState, useEffect } from "react";
import { Typography, Button, IconButton } from "@material-tailwind/react";

// Import theme colors
import colors from "../../../theme/colors";

// Import creature images
import magmaDrake from "../../../assets/---pixel-art-dragon-creature-with-magma-cracked-sc.png";
import abyssalFang from "../../../assets/---pixel-art-dark-water-serpent-with-deep-blue-bla.png";
import pyroStriker from "../../../assets/pixel-art-humanoid-animal-with-flame-covered-fists.png";
import tempestSerpent from "../../../assets/---pixel-art-flying-water-dragon-with-cloud-like-w.png";
import abyssTitan from "../../../assets/---pixel-art-armored-water-creature-with-steel-pla.png";

const CreatureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Rare creatures data
  const rareCreatures = [
    {
      id: 1,
      name: "MagmaDrake",
      number: "#429",
      type: "FIRE/DRAGON",
      image: magmaDrake,
      rarity: "Legendary",
      price: "2.45 ETH",
      colors: ["#FF5A5A", "#991111"],
      description: "A powerful dragon forged from the depths of volcanic activity. Its scales bear the markings of magma flows."
    },
    {
      id: 2,
      name: "AbyssalFang",
      number: "#245",
      type: "WATER/DARK",
      image: abyssalFang,
      rarity: "Ultra Rare",
      price: "1.78 ETH",
      colors: ["#1E40AF", "#0F172A"],
      description: "Dwelling in the deepest ocean trenches, this serpent has adapted to the crushing pressure and eternal darkness."
    },
    {
      id: 3,
      name: "PyroStriker",
      number: "#312",
      type: "FIRE/FIGHTING",
      image: pyroStriker,
      rarity: "Epic",
      price: "1.22 ETH",
      colors: ["#F97316", "#B45309"],
      description: "A martial artist whose fists burn with intense flame. Each strike leaves a trail of embers in its wake."
    },
    {
      id: 4,
      name: "TempestSerpent",
      number: "#378",
      type: "WATER/FLYING",
      image: tempestSerpent,
      rarity: "Rare",
      price: "0.95 ETH",
      colors: ["#0EA5E9", "#0C4A6E"],
      description: "Soaring through storm clouds, this creature controls both water and wind, creating powerful hurricanes."
    },
    {
      id: 5,
      name: "AbyssTitan",
      number: "#501",
      type: "WATER/STEEL",
      image: abyssTitan,
      rarity: "Ultra Rare",
      price: "1.65 ETH",
      colors: ["#0F766E", "#134E4A"],
      description: "Protected by nearly impenetrable armor, this aquatic titan rules over underwater kingdoms with unmatched defense."
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rareCreatures.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + rareCreatures.length) % rareCreatures.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const currentCreature = rareCreatures[currentIndex];

  return (
    <div className="w-full py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <Typography variant="h2" className="font-pixel text-3xl mb-2" style={{ color: colors.turquoise }}>
            RARE CREATURES
          </Typography>
          <Typography className="text-gray-600 max-w-2xl mx-auto">
            Discover the most sought-after digital creatures in our universe. These rare collectibles are prized for their unique attributes and limited availability.
          </Typography>
        </div>

        {/* Slider content */}
        <div 
          className="relative rounded-2xl p-8 shadow-xl overflow-hidden mb-8" 
          style={{ 
            background: `linear-gradient(135deg, ${currentCreature.colors[0]}20, ${currentCreature.colors[1]}40)`,
            borderWidth: "1px",
            borderColor: `${currentCreature.colors[0]}50`,
          }}
        >
          {/* Background effect */}
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-10 z-0"
            style={{ 
              backgroundImage: `url(${currentCreature.image})`, 
              backgroundSize: "cover", 
              backgroundPosition: "center",
              filter: "blur(20px)"
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            {/* Image */}
            <div className="w-full md:w-2/5 mb-8 md:mb-0 flex justify-center">
              <div className="relative transform transition-transform duration-500 hover:scale-105">
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-xl"></div>
                <img 
                  src={currentCreature.image} 
                  alt={currentCreature.name} 
                  className="relative z-10 w-64 h-64 object-contain"
                />
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-3/5 md:pl-10">
              <div className="flex items-center mb-2">
                <Typography className="font-pixel text-md mr-3" style={{ color: currentCreature.colors[0] }}>
                  {currentCreature.number}
                </Typography>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium" 
                  style={{ 
                    backgroundColor: currentCreature.colors[0] + '30',
                    color: currentCreature.colors[0]
                  }}
                >
                  {currentCreature.rarity}
                </span>
              </div>

              <Typography variant="h3" className="font-pixel text-4xl mb-2" style={{ color: colors.gold }}>
                {currentCreature.name}
              </Typography>

              <div className="mb-3">
                <span 
                  className="inline-block px-3 py-1 rounded-md text-sm font-pixel"
                  style={{ backgroundColor: currentCreature.colors[1] + '30', color: currentCreature.colors[0] }}
                >
                  {currentCreature.type}
                </span>
              </div>

              <Typography className="text-gray-600 mb-6">
                {currentCreature.description}
              </Typography>

              <div className="flex items-center justify-between">
                <div>
                  <Typography className="text-gray-500 text-sm">Current value</Typography>
                  <Typography className="font-pixel text-2xl" style={{ color: colors.turquoise }}>
                    {currentCreature.price}
                  </Typography>
                </div>

                <Button 
                  className="rounded-full px-6 py-3 font-pixel text-sm"
                  style={{ backgroundColor: colors.gold, color: "#000" }}
                >
                  VIEW DETAILS
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {/* Dots */}
          <div className="flex space-x-2">
            {rareCreatures.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "w-8" : ""
                }`}
                style={{ 
                  backgroundColor: currentIndex === index 
                    ? colors.turquoise 
                    : `${colors.turquoise}40`
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex space-x-3">
            <IconButton
              variant="outlined"
              size="sm"
              onClick={goToPrev}
              className="rounded-full"
              style={{ borderColor: colors.turquoise, color: colors.turquoise }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </IconButton>
            
            <IconButton
              variant="filled"
              size="sm"
              onClick={goToNext}
              className="rounded-full"
              style={{ backgroundColor: colors.turquoise }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatureSlider; 