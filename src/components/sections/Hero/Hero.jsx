import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";

// Import pixel art assets
import mysteryNFTImg from "../../../assets/pixel-art-question-mark-creature--teal-and-mint-gr.png";
import pokemonStickerImg from "../../../assets/Creature Pokemon Sprite Sticker.gif";
import charizardGif from "../../../assets/mega_charizard_y_animated_sprite_by_noellembrooks_ddmd4dm.gif";
import gyaradosGif from "../../../assets/mega_gyarados_animated_v2__request__by_diegotoon20_d9dslj3.gif";
import raichuGif from "../../../assets/raichu.gif";

// Import Sidebar component
import Sidebar from "./Sidebar";
// Import PageTransition component
import PageTransition from "../../utils/PageTransition";

// Add neumorphism style classes - keeping only the ones we actually use
const raisedNeumorphicBox = "shadow-[5px_5px_15px_0px_rgba(0,0,0,0.1),-5px_-5px_15px_0px_rgba(255,255,255,0.8)] border-2 border-gray-50 transform transition-all duration-200 hover:shadow-[8px_8px_20px_0px_rgba(0,0,0,0.12),-8px_-8px_20px_0px_rgba(255,255,255,0.9)] hover:translate-y-[-2px]";
const insetNeumorphicBox = "shadow-[inset_5px_5px_10px_0px_rgba(0,0,0,0.07),inset_-5px_-5px_10px_0px_rgba(255,255,255,0.5)] border-2 border-gray-100";
const pressedNeumorphicBox = "shadow-[inset_5px_5px_10px_0px_rgba(0,0,0,0.15),inset_-5px_-5px_10px_0px_rgba(255,255,255,0.5)] border-2 border-black";

// Main Hero Component
const Hero = () => {
  // State for sidebar collapse
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // State for page transition
  const [pageTransition, setPageTransition] = useState(true);
  
  // Toggle sidebar collapse
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Add animation effect when component mounts
  useEffect(() => {
    // Start with transition active
    setPageTransition(true);
  }, []);
  
  // Function to handle transition completion
  const handleTransitionComplete = () => {
    setPageTransition(false);
  };

  return (
    <div className="relative bg-white h-[calc(100vh-0px)] py-2 px-2 overflow-auto">
      {/* Use the PageTransition component */}
      <PageTransition 
        isActive={pageTransition}
        onTransitionComplete={handleTransitionComplete}
        pageName="HERO"
        excludeSidebar={true}
        duration={1000}
      />
      
      <div className="w-full h-full">
        {/* Main layout with fixed sidebar on right */}
        <div className={`flex flex-col md:flex-row gap-4 h-full p-1 transition-all duration-300 ${isSidebarCollapsed ? 'pr-0' : 'lg:pr-[350px]'}`}>
          {/* Main Content Area - taking full width with padding for sidebar */}
          <div className="w-full flex flex-col gap-4 h-full">
            <div className="flex flex-col md:flex-row gap-4" style={{height: "60%"}}>
              {/* Left Card - Gyarados */}
              <div className="md:w-1/2 h-full min-h-[250px] md:min-h-[250px] mb-4 md:mb-0">
                <div className={`bg-gradient-to-br from-[#c8e0f7] to-[#d8ecff] rounded-2xl p-3 md:p-5 relative overflow-hidden h-full ${insetNeumorphicBox} border-2 border-[#dff2ff]/80 backdrop-blur-sm`}>
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
                    <Typography variant="h3" className="font-pixel text-2xl md:text-3xl lg:text-5xl text-[#2c3e50] drop-shadow-md">
                      GYARADOS
                    </Typography>
                    <div className="mt-1 md:mt-2 bg-white/90 rounded-lg px-2 md:px-3 py-0.5 md:py-1 inline-block shadow-sm border-2 border-blue-200 backdrop-blur-sm">
                      <span className="font-pixel text-[10px] md:text-xs text-blue-900">WATER • FLYING</span>
                    </div>
                  </div>
                  
                  {/* Water bubbles decoration */}
                  <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="absolute rounded-full bg-white/30"
                        style={{
                          width: `${Math.random() * 20 + 5}px`,
                          height: `${Math.random() * 20 + 5}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`,
                          animationDelay: `${Math.random() * 5}s`
                        }}>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add the Gyarados image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={gyaradosGif} 
                      alt="Gyarados" 
                      className="object-contain w-full h-full scale-90 md:scale-90" 
                    />
                  </div>
                  
                  <div className="absolute top-1/4 right-2 md:right-4 rotate-90 z-10">
                    <div className="bg-[#2c4b6e] px-1 md:px-2 py-0.5 md:py-1 rounded-lg font-pixel text-white text-xs md:text-sm shadow-md border-2 border-[#4a7fb3]">
                      $49
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-3 md:left-6 z-10">
                    <div className="transform translate-y-[1px]">
                      <div className="bg-white px-2 md:px-4 py-0.5 md:py-1 rounded-t-md font-pixel text-[10px] md:text-xs text-blue-900 shadow-sm border-2 border-blue-200 border-b-0">
                        HP: 120 • ATK: 95
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Tiled layout */}
              <div className="md:w-1/2 h-full mt-4 md:mt-0 min-h-[250px] md:min-h-[250px]">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 md:gap-4 h-auto md:h-full">
                  {/* VoltVixen Card */}
                  <div className="relative h-auto min-h-[80px] md:min-h-[120px] mb-2 md:mb-4">
                    <div className={`bg-gradient-to-br from-[#fff8b8] to-[#fffad6] rounded-2xl p-2 md:p-4 relative overflow-hidden h-full ${insetNeumorphicBox} border-2 border-[#fffce9]/90`}>
                      {/* Price tag - top right */}
                      <div className="absolute top-1 right-1 z-10 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-md font-bold shadow-sm border border-yellow-600 hidden md:block">
                        $12
                      </div>
                      
                      {/* Add the VoltVixen image */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 flex items-center justify-center">
                        <img 
                          src={raichuGif} 
                          alt="Raichu" 
                          className="object-contain max-h-full max-w-full scale-100" 
                        />
                      </div>
                      
                      {/* Type chip */}
                      <div className="absolute top-1 left-1 z-10 hidden md:block">
                        <div className="bg-yellow-100 px-2 py-0.5 rounded-md font-pixel text-[8px] md:text-[10px] text-yellow-800 shadow-sm border border-yellow-200 font-bold">
                          ELECTRIC
                        </div>
                      </div>
                      
                      {/* Name chip - visible on larger screens only */}
                      <div className="absolute bottom-1 left-0 right-0 z-10 flex justify-center hidden md:flex">
                        <div className="bg-orange-400 px-2 py-0.5 rounded-md font-pixel text-[10px] text-white shadow-sm border border-orange-500 font-bold text-center">
                          RAICHU
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mint Rewards Card */}
                  <div className="relative h-auto min-h-[80px] md:min-h-[120px] mb-2 md:mb-4">
                    <div className={`bg-gradient-to-br from-[#ffe8f0] to-[#fff0f6] rounded-2xl p-2 md:p-4 relative overflow-hidden h-full ${insetNeumorphicBox} border-2 border-pink-200`}>
                      <div className="flex flex-col items-center justify-center h-full">
                        <Typography className="font-pixel text-red-500 font-bold text-center text-base md:text-2xl drop-shadow-md">
                          MINT
                        </Typography>
                        <Typography className="font-pixel text-red-500 font-bold text-center text-base md:text-2xl drop-shadow-md">
                          REWARDS
                        </Typography>
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer bar that spans across both cards - mobile only */}
                  
                  {/* Charizard Card */}
                  <div className="relative h-auto min-h-[80px] md:min-h-[120px]">
                    <div className={`bg-gradient-to-br from-[#fff8b8] to-[#ffefbc] rounded-2xl p-2 md:p-4 relative overflow-hidden h-full ${insetNeumorphicBox} border-2 border-[#fffce9]/90`}>
                      {/* Add the Charizard animated GIF */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                        <img 
                          src={charizardGif} 
                          alt="Charizard" 
                          className="object-contain max-h-full max-w-full scale-100 md:scale-125" 
                        />
                      </div>
                      
                      {/* Price tag */}
                      <div className="absolute top-1 right-1 z-10 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-md font-bold shadow-sm border border-orange-600 hidden md:block">
                        $35
                      </div>
                      
                      {/* Type chip */}
                      <div className="absolute top-1 left-1 z-10 hidden md:block">
                        <div className="bg-red-200 px-2 py-0.5 rounded-md font-pixel text-[8px] md:text-[10px] text-red-800 shadow-sm border border-red-200 font-bold">
                          FIRE • FLYING
                        </div>
                      </div>
                      
                      {/* Name chip */}
                      <div className="absolute bottom-1 left-0 right-0 z-10 flex justify-center hidden md:flex">
                        <div className="bg-orange-400 px-2 py-0.5 rounded-md font-pixel text-[10px] text-white shadow-sm border border-orange-500 font-bold text-center">
                          CHARIZARD
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WHO'S THAT POKEMON Card */}
                  <div className="relative h-auto min-h-[80px] md:min-h-[120px]">
                    <div className={`bg-gradient-to-br from-[#e8f6ef] to-[#f0faf5] rounded-2xl p-2 md:p-4 relative overflow-hidden h-full ${insetNeumorphicBox} border-2 border-[#ecfffb]/80`}>
                      {/* Add the silhouette image */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img 
                            src={mysteryNFTImg} 
                            alt="Mystery Pokémon" 
                            className="object-contain max-h-full max-w-full" 
                            style={{ filter: 'brightness(0) invert(0)', opacity: '0.8' }}
                          />
                          {/* Add animated question marks */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {[...Array(2)].map((_, i) => (
                              <div 
                                key={i} 
                                className="absolute font-pixel text-2xl md:text-4xl font-bold text-teal-600"
                                style={{
                                  animation: `float ${1 + i * 0.5}s infinite ease-in-out alternate`,
                                  left: `${40 + i * 20}%`,
                                  top: `${30 + (i % 2) * 20}%`,
                                  textShadow: '2px 2px 0 rgba(0,0,0,0.2)'
                                }}
                              >
                                ?
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Top type tag */}
                      <div className="absolute top-1 left-1 z-10 hidden md:block">
                        <div className="bg-teal-100 px-2 py-0.5 rounded-md font-pixel text-[8px] md:text-[10px] text-teal-800 shadow-sm border border-teal-200 font-bold">
                          MYSTERY
                        </div>
                      </div>
                      
                      {/* Who's that pokemon tag - split into top and bottom */}
                      <div className="absolute top-1 right-1 z-10 hidden md:block">
                        <div className="bg-teal-500 px-2 py-0.5 rounded-md font-pixel text-[8px] md:text-[10px] text-white shadow-sm border border-teal-600 font-bold">
                          WHO'S THAT
                        </div>
                      </div>
                      
                      <div className="absolute bottom-1 left-0 right-0 z-10 flex justify-center hidden md:flex">
                        <div className="bg-teal-500 px-2 py-0.5 rounded-md font-pixel text-[10px] text-white shadow-sm border border-teal-600 font-bold">
                          POKÉMON?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row divided into 3 sections */}
            <div className="flex flex-col lg:flex-row gap-3 md:gap-4 flex-1">
              {/* Bottom Left Card */}
              <div className="w-full lg:w-1/3 h-full min-h-[150px] md:min-h-[200px]">
                <div className={`bg-gradient-to-br from-[#ff5350] to-[#f8e58c] rounded-2xl p-3 md:p-5 relative overflow-hidden h-full ${raisedNeumorphicBox}`}>
                  {/* Pokeball decoration in background */}
                  <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 rounded-full bg-white opacity-10 transform translate-x-10 translate-y-[-30px]"></div>
                  <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 border-[12px] md:border-[16px] border-[#ff5350] rounded-full opacity-10 transform translate-x-10 translate-y-[-30px]"></div>
                  
                  <div className="relative z-10">
                    <Typography variant="h2" className="font-pixel text-xl md:text-3xl text-white mb-1 leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                      <span className="bg-[#3a66b0] px-2 md:px-3 py-0.5 md:py-1 rounded-lg inline-block transform -rotate-2">Catch 'em all</span>
                    </Typography>
                    <Typography variant="h2" className="font-pixel text-lg md:text-2xl text-[#3a66b0] mb-1 md:mb-2 leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                      with rare
                    </Typography>
                    <Typography variant="h2" className="font-pixel text-xl md:text-3xl text-white mb-1 md:mb-2 leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                      <span className="bg-[#ff5350] px-2 md:px-3 py-0.5 md:py-1 rounded-lg inline-block transform rotate-1">Pokémon NFTs</span>
                    </Typography>
                    <Typography variant="h2" className="font-pixel text-lg md:text-2xl text-[#3a66b0] mb-1 leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                      for trainers
                    </Typography>
                    <Typography variant="h2" className="font-pixel text-lg md:text-2xl text-[#3a66b0] leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                      worldwide
                    </Typography>
                  </div>
                  
                  {/* Small Pokeball icon at bottom */}
                  <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 w-6 md:w-8 h-6 md:h-8 z-10">
                    <div className="w-full h-full rounded-full bg-white border-2 border-black relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#ff5350]"></div>
                      <div className="absolute top-[calc(50%-1px)] left-0 right-0 h-[2px] bg-black"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[4px] md:w-[6px] h-[4px] md:h-[6px] bg-white rounded-full border-2 border-black"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Center Card - Gengar */}
              <div className="w-full lg:w-1/3 h-full min-h-[150px] md:min-h-[200px] mt-3 md:mt-4 lg:mt-0">
                <div className={`bg-gradient-to-br from-[#7b68ee] to-[#4b0082] rounded-2xl p-3 md:p-5 relative overflow-hidden h-full ${raisedNeumorphicBox}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dace91da-5c97-4c30-9602-afabbcd57695/d3k0ij4-bc5df38b-319c-49c7-830b-5c1e33acf43a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RhY2U5MWRhLTVjOTctNGMzMC05NjAyLWFmYWJiY2Q1NzY5NVwvZDNrMGlqNC1iYzVkZjM4Yi0zMTljLTQ5YzctODMwYi01YzFlMzNhY2Y0M2EuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.LjIuc-9Fd1IQRbM3OzycUB-NArdxAqurT3zPN_TYEgE" 
                      alt="Gengar Animation" 
                      className="object-contain max-h-full max-w-full scale-[2] md:scale-[2.5] transform" 
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Right Card - Snorlax */}
              <div className="w-full lg:w-1/3 h-full min-h-[150px] md:min-h-[200px] mt-3 md:mt-4 lg:mt-0">
                <div className={`bg-gradient-to-br from-[#86bbbd] to-[#015958] rounded-2xl p-3 md:p-5 relative overflow-hidden h-full ${raisedNeumorphicBox}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={pokemonStickerImg} 
                      alt="Pokemon Sticker" 
                      className="object-contain max-h-full max-w-full scale-[1.5] md:scale-[1.8] transform" 
                    />
                  </div>
                  <div className="absolute -right-2 bottom-2 opacity-5">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar Component */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleCollapse={toggleSidebarCollapse} />
    </div>
  );
};

// Add custom animations for blinking, twinkling, floating, and flickering
const style = document.createElement('style');
style.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  .animate-twinkle {
    animation: twinkle 3s infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
    50% { transform: translateY(-15px) scale(1.1); opacity: 0.7; }
  }
  
  @keyframes flicker {
    0%, 100% { opacity: 0.2; transform: scale(0.8) translateY(5px); }
    50% { opacity: 0.6; transform: scale(1.2) translateY(-5px); }
  }
`;
document.head.appendChild(style);

export default Hero; 