import React, { useState, useEffect, useRef } from 'react';
import {
  Typography,
  Card,
  CardBody,
  Button
} from "@material-tailwind/react";
import { 
  BoltIcon,
  ShieldExclamationIcon,
  ClockIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from "@heroicons/react/24/outline";
import PageTransition from "../../utils/PageTransition";
import battleTheme from "../../../assets/music/battle-theme.mp3";

// You'll need to create or source this image based on the prompt below
// Placeholder - reference this as a comment
// const battleArenaImage = "/path/to/your/generated/battle-arena.png";

const BattleCenter = () => {
  const [pageTransition, setPageTransition] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const battleMusicRef = useRef(null);
  
  // Add animation effect when component mounts
  useEffect(() => {
    setPageTransition(true);
    
    // Play battle music when component mounts
    if (battleMusicRef.current && isMusicEnabled) {
      battleMusicRef.current.volume = 0.15;
      battleMusicRef.current.loop = true;
      battleMusicRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
    
    // Clean up when component unmounts
    return () => {
      if (battleMusicRef.current) {
        battleMusicRef.current.pause();
        battleMusicRef.current.currentTime = 0;
      }
    };
  }, [isMusicEnabled]);
  
  // Toggle battle music
  const toggleBattleMusic = () => {
    const newMusicState = !isMusicEnabled;
    setIsMusicEnabled(newMusicState);
    
    if (battleMusicRef.current) {
      if (newMusicState) {
        battleMusicRef.current.play().catch(error => {
          console.log("Playback prevented:", error);
        });
      } else {
        battleMusicRef.current.pause();
      }
    }
  };
  
  // Function to handle transition completion
  const handleTransitionComplete = () => {
    setPageTransition(false);
  };

  return (
    <div className="h-screen bg-white relative overflow-hidden">
      {/* Hidden audio element for battle music */}
      <audio ref={battleMusicRef} src={battleTheme} />
      
      {/* Use the PageTransition component */}
      <PageTransition 
        isActive={pageTransition}
        onTransitionComplete={handleTransitionComplete}
        pageName="BATTLE CENTER"
        excludeSidebar={true}
        duration={1000}
      />
      
      <div className="w-full h-full px-4 py-2 bg-white border-4 border-[#3298cb] rounded-lg flex flex-col lg:pr-[380px]">
        {/* This is where you'll use the generated image 
            Use the prompt below to generate an 8-bit battle arena with two Pokémon */}
        <div className="absolute inset-0 z-0 overflow-hidden lg:mr-[380px]">
          {/* Background will be replaced with an image */}
          <div className="absolute inset-0 bg-cover bg-center opacity-25"
               style={{ 
                 backgroundImage: `url('/battle-arena-placeholder.png')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 /* 
                 Image Prompt for DALL-E or Midjourney:
                 "Create an 8-bit pixel art battle arena for a Pokémon-style game. 
                 The scene should feature:
                 - A green grassy battlefield with dividing line in the center
                 - Two trainer platforms on opposite sides (red on left, blue on right)
                 - Stadium seating with small pixel dots representing an audience
                 - A Charizard-inspired fire creature on the left platform
                 - A Blastoise-inspired water creature on the right platform
                 - Subtle lighting effects from stadium lights
                 - Clear 8-bit/16-bit pixel art style with visible pixels
                 - Soft color palette suitable for a background
                 The image should be wide format and suitable as a game background."
                 */
               }}
          >
          </div>
        </div>
        
        {/* Header */}
        <div className="mb-4 z-10 relative flex flex-col sm:flex-row justify-between items-start">
          <div>
            <Typography variant="h2" className="font-pixel text-xl text-[#3298cb] drop-shadow-sm">
              BATTLE CENTER
            </Typography>
            <Typography className="text-gray-600 max-w-2xl text-xs">
              Test your skills against other trainers and level up your creatures.
            </Typography>
          </div>
          
          {/* Music toggle button */}
          <button 
            onClick={toggleBattleMusic}
            className={`p-2 rounded-full mt-2 sm:mt-0 ${
              isMusicEnabled ? 'bg-[#85DDFF]/30 text-[#3298cb]' : 'bg-red-100 text-red-500'
            } transition-all duration-300`}
            title={isMusicEnabled ? 'Mute battle music' : 'Play battle music'}
          >
            {isMusicEnabled ? (
              <SpeakerWaveIcon className="h-5 w-5" />
            ) : (
              <SpeakerXMarkIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {/* Content Area - Takes remaining height */}
        <div className="flex-1 overflow-hidden flex flex-col items-center justify-center z-10 relative">
          <Card className="w-full max-w-2xl border-4 border-[#3298cb] shadow-md rounded-lg overflow-hidden">
            <CardBody className="p-4 sm:p-6 bg-[#85DDFF]/20 backdrop-blur-sm flex flex-col items-center">
              {/* Coming Soon Badge */}
              <div className="bg-[#3298cb] text-white px-4 py-2 rounded-md font-pixel text-sm mb-4 transform rotate-[-3deg] shadow-md border-2 border-white">
                COMING SOON
              </div>
              
              {/* Main Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#3298cb]/20 flex items-center justify-center border-4 border-[#2a6fa8]">
                  <BoltIcon className="h-12 w-12 sm:h-14 sm:w-14 text-[#2a6fa8]" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FFEB3B] flex items-center justify-center border-2 border-[#FFC107] animate-pulse">
                  <ClockIcon className="h-5 w-5 text-[#B27200]" />
                </div>
              </div>
              
              <Typography variant="h3" className="font-pixel text-lg text-[#2a6fa8] mb-3 text-center">
                Battle Center Under Construction
              </Typography>
              
              <Typography className="text-gray-700 text-center mb-4 text-sm sm:text-base">
                Our training grounds are being prepared for epic battles! Soon you'll be able to challenge
                other trainers, earn badges, and climb the ranks to become the ultimate champion.
              </Typography>
              
              {/* Features Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6">
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-[#3298cb]/30 flex flex-col items-center">
                  <BoltIcon className="h-8 w-8 text-[#3298cb] mb-2" />
                  <Typography className="font-pixel text-xs text-[#2a6fa8] text-center">
                    PVP Battles
                  </Typography>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-[#3298cb]/30 flex flex-col items-center">
                  <ShieldExclamationIcon className="h-8 w-8 text-[#3298cb] mb-2" />
                  <Typography className="font-pixel text-xs text-[#2a6fa8] text-center">
                    Gym Challenges
                  </Typography>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-[#3298cb]/30 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-[#3298cb] mb-2">
                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                  </svg>
                  <Typography className="font-pixel text-xs text-[#2a6fa8] text-center">
                    Tournament Mode
                  </Typography>
                </div>
              </div>
              
              {/* Pixelated construction border */}
              <div className="w-full h-8 relative mb-4 overflow-hidden">
                <div className="absolute inset-0 border-b-4 border-[#3298cb] border-dashed"></div>
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute bottom-0 w-4 h-4 bg-[#3298cb]"
                    style={{ 
                      left: `${i * 5}%`, 
                      clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)'
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Notification */}
              <div className="bg-[#85DDFF]/20 backdrop-blur-sm p-3 rounded-md border border-[#3298cb]/30 w-full text-center mb-2">
                <Typography className="font-pixel text-xs text-[#2a6fa8]">
                  Want to be notified when battles are ready?
                </Typography>
              </div>
              
              <Button
                className="font-pixel text-[10px] bg-gradient-to-r from-[#3298cb] to-[#2a6fa8] text-white py-2 px-4 rounded-md"
              >
                Join Waitlist
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BattleCenter; 