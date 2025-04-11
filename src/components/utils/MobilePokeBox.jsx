import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  UserIcon,
  BoltIcon,
  MusicalNoteIcon,
  ArchiveBoxIcon,
  XMarkIcon
} from "@heroicons/react/24/solid";

// Import audio files
import battleTheme from "../../assets/music/battle-theme.mp3";
import route1Theme from "../../assets/music/route-1.mp3";
import gymLeaderTheme from "../../assets/music/gym-leader.mp3";
import evolutionTheme from "../../assets/music/evolution.mp3";
import pixelParadise from "../../assets/music/Pixel Paradise.mp3";
import pixelatedHeartache from "../../assets/music/Pixelated Heartache.mp3";
import notificationSound from "../../assets/music/notification.mp3";
import pageSwitchSound from "../../assets/music/pageOrnavlinkswitch.mp3";

// Import only the needed images
import charizardGif from "../../assets/mega_charizard_y_animated_sprite_by_noellembrooks_ddmd4dm.gif";
import gyaradosGif from "../../assets/mega_gyarados_animated_v2__request__by_diegotoon20_d9dslj3.gif";
import raichuGif from "../../assets/raichu.gif";
import mysteryImg from "../../assets/pixel-art-question-mark-creature--teal-and-mint-gr.png";

const MobilePokeBox = ({ onSectionChange }) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showPokemonScreen, setShowPokemonScreen] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(() => {
    const savedTrackIndex = localStorage.getItem('pokebox-selected-track-index');
    return savedTrackIndex !== null ? parseInt(savedTrackIndex, 10) : 0;
  });
  const [isPlaying, setIsPlaying] = useState(() => {
    const savedPreference = localStorage.getItem('pokebox-music-enabled');
    return savedPreference !== null ? savedPreference === 'true' : true; // Default to true
  });
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [creatureIndex, setCreatureIndex] = useState(0);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(() => {
    const savedMenuIndex = localStorage.getItem('pokebox-selected-menu-index');
    return savedMenuIndex !== null ? parseInt(savedMenuIndex, 10) : 0;
  });
  const [currentProgress, setCurrentProgress] = useState(0);
  const [miniPlayerVisible, setMiniPlayerVisible] = useState(() => {
    const savedMiniPlayerState = localStorage.getItem('pokebox-mini-player-visible');
    return savedMiniPlayerState !== null ? savedMiniPlayerState === 'true' : false;
  });
  const progressIntervalRef = useRef(null);

  // Audio refs
  const audioRef = useRef(null);
  const soundEffectRef = useRef(null);

  // Get collection from localStorage
  const [userCreatures, setUserCreatures] = useState(() => {
    try {
      const savedCollection = localStorage.getItem('pokebox-collection');
      return savedCollection ? JSON.parse(savedCollection) : [];
    } catch (error) {
      console.error("Error loading collection from localStorage:", error);
      return [];
    }
  });

  // Menu items
  const menuItems = [
    { id: "home", label: "HOME", icon: HomeIcon, description: "Return to the main dashboard", path: "/" },
    { id: "profile", label: "TRAINER", icon: UserIcon, description: "View trainer information", path: "/profile" },
    { id: "collection", label: "COLLECTION", icon: ArchiveBoxIcon, description: "Browse your collection", path: "/collection" },
    { id: "battle", label: "BATTLE", icon: BoltIcon, description: "Fight against trainers", path: "/battle" },
    { id: "music", label: "MUSIC", icon: MusicalNoteIcon, description: "Play music tracks", path: "/music" },
    { id: "marketplace", label: "MARKET", icon: ShoppingBagIcon, description: "Buy and sell", path: "/marketplace" },
  ];

  // Define creatures data
  const creatures = [...(userCreatures || []), ...[
    {
      id: 1,
      name: "EmberWing",
      image: charizardGif,
      number: "006",
      type: "FIRE/FLYING",
      stats: { hp: 78, atk: 84, def: 78, spd: 100 },
      height: "1.7m",
      weight: "90.5kg",
      desc: "Breathes fire that is hot enough to melt boulders. Known to cause forest fires unintentionally."
    },
    {
      id: 2,
      name: "TidalWraith",
      image: gyaradosGif,
      number: "130",
      type: "WATER/DRAGON",
      stats: { hp: 95, atk: 125, def: 79, spd: 81 },
      height: "6.5m",
      weight: "235kg",
      desc: "Once it begins to rampage, it won't stop until everything is destroyed. Known for its fierce temper."
    },
    {
      id: 3,
      name: "VoltVixen",
      image: raichuGif,
      number: "026",
      type: "ELECTRIC",
      stats: { hp: 60, atk: 90, def: 55, spd: 110 },
      height: "0.8m",
      weight: "30kg",
      desc: "When electricity builds up inside its body, it becomes feisty. It also glows in the dark."
    },
    {
      id: 9,
      name: "EnigmaShift",
      image: mysteryImg,
      number: "???",
      type: "UNKNOWN",
      stats: { hp: "???", atk: "???", def: "???", spd: "???" },
      height: "?.?m",
      weight: "??kg",
      desc: "A mysterious creature that seems to shift between different types. Its true form is unknown."
    },
  ]].filter((creature, index, self) => 
    // Remove duplicates by ID 
    index === self.findIndex((c) => c.id === creature.id)
  );

  // Get current creature
  const currentCreature = creatures[creatureIndex];

  // Music tracks
  const musicTracks = [
    { id: 1, name: "Battle Theme", duration: "2:15", src: battleTheme, artist: "PokéMix Vol.1", pixelThemed: true },
    { id: 2, name: "Route 1", duration: "1:45", src: route1Theme, artist: "PokéMix Vol.1", pixelThemed: true },
    { id: 3, name: "Gym Leader", duration: "3:10", src: gymLeaderTheme, artist: "PokéMix Vol.1", pixelThemed: true },
    { id: 4, name: "Evolution", duration: "1:30", src: evolutionTheme, artist: "PokéMix Vol.1", pixelThemed: true },
    { id: 5, name: "Pixel Paradise", duration: "3:45", src: pixelParadise, artist: "Retro Beats", pixelThemed: true },
    { id: 6, name: "Pixelated Heartache", duration: "4:12", src: pixelatedHeartache, artist: "Retro Beats", pixelThemed: true },
    { id: 7, name: "Notification Tone", duration: "0:05", src: notificationSound, artist: "Sound FX", pixelThemed: false },
    { id: 8, name: "Page Switch", duration: "0:03", src: pageSwitchSound, artist: "Sound FX", pixelThemed: false },
  ];

  // Play sound effect
  const playSound = (soundSrc) => {
    if (isMusicEnabled) {
      if (soundEffectRef.current) {
        soundEffectRef.current.src = soundSrc;
        soundEffectRef.current.volume = 0.3; // Lower volume for effects
        soundEffectRef.current.play();
      }
    }
  };

  // Handle music playback
  useEffect(() => {
    if (isPlaying && isMusicEnabled) {
      if (audioRef.current) {
        audioRef.current.src = musicTracks[selectedTrackIndex].src;
        audioRef.current.loop = false; // Don't loop individual tracks
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(error => {
          console.log("Playback prevented:", error);
          // If autoplay is blocked, update state to reflect actual playback status
          setIsPlaying(false);
        });
      }
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, selectedTrackIndex, isMusicEnabled]);

  // Progress tracking and track switching
  useEffect(() => {
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    // If music is playing, start the progress timer
    if (isPlaying && audioRef.current) {
      progressIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          // Update progress percentage
          const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0;
          setCurrentProgress(percentage);
          
          // If the track ended, play the next Pixel track
          if (audioRef.current.ended) {
            // Get all tracks that start with "Pixel"
            const pixelTracks = musicTracks.filter(track => track.name.startsWith("Pixel"));
            
            // Find current track index in the filtered list
            const currentPixelIndex = pixelTracks.findIndex(track => 
              track.id === musicTracks[selectedTrackIndex].id
            );
            
            // Move to next track in the Pixel tracks loop
            const nextPixelIndex = (currentPixelIndex + 1) % pixelTracks.length;
            
            // Get the actual index in the full tracks array
            const nextTrackIndex = musicTracks.findIndex(track => 
              track.id === pixelTracks[nextPixelIndex].id
            );
            
            // Set the next track
            setSelectedTrackIndex(nextTrackIndex);
          }
        }
      }, 500);
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, selectedTrackIndex, musicTracks]);

  // Auto-start music when component mounts
  useEffect(() => {
    // Check if music should be playing based on saved state
    if (isPlaying) {
      // Find the first Pixel track or use the saved track index
      const pixelTracks = musicTracks.filter(track => track.name.startsWith("Pixel"));
      if (pixelTracks.length > 0) {
        // Use the saved track if valid, otherwise use the first pixel track
        const currentTrackId = musicTracks[selectedTrackIndex]?.id;
        const isCurrentTrackPixel = pixelTracks.some(t => t.id === currentTrackId);
        
        if (!isCurrentTrackPixel) {
          // If current track is not a pixel track, switch to the first pixel track
          const firstPixelTrackIndex = musicTracks.findIndex(track => track.name.startsWith("Pixel"));
          if (firstPixelTrackIndex !== -1) {
            setSelectedTrackIndex(firstPixelTrackIndex);
          }
        }
        
        // Show mini player if music should be playing
        setMiniPlayerVisible(true);
      }
    }
  }, []);

  // Save selected track index to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pokebox-selected-track-index', selectedTrackIndex.toString());
  }, [selectedTrackIndex]);

  // Save mini player state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pokebox-mini-player-visible', miniPlayerVisible.toString());
  }, [miniPlayerVisible]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Add animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes equalizer {
        0%, 100% { height: 40%; }
        50% { height: 100%; }
      }
      
      @keyframes equalize {
        0% { height: 3px; }
        50% { height: 8px; }
        100% { height: 3px; }
      }
      
      @keyframes float-button {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-5px) scale(1.05); }
      }
      
      .float-animation {
        animation: float-button 3s infinite ease-in-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Update user creatures when collection changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedCollection = localStorage.getItem('pokebox-collection');
        if (savedCollection) {
          setUserCreatures(JSON.parse(savedCollection));
        }
      } catch (error) {
        console.error("Error updating collection from localStorage:", error);
      }
    };
    
    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    // Check for updates periodically (for cases where storage event might not fire)
    const checkInterval = setInterval(handleStorageChange, 2000);
    
    // Initial load
    handleStorageChange();
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkInterval);
    };
  }, []);

  return (
    <div className="lg:hidden">
      {/* Hidden audio elements */}
      <audio ref={audioRef} />
      <audio ref={soundEffectRef} />

      {/* Floating Pokédex Button */}
      {!isOpen && (
        <button
          onClick={() => {
            playSound(pageSwitchSound);
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-[#FF0000] to-[#CC0000] text-white flex items-center rounded-full shadow-[0_5px_15px_rgba(204,0,0,0.5)] pr-3 hover:scale-105 transition-all duration-200 z-50"
        >
          <div className="w-14 h-14 relative flex items-center justify-center">
            {/* Red top half */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000] to-[#CC0000] rounded-full border-4 border-white"></div>
            
            {/* Divider line */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-[#111] transform -translate-y-1/2 z-10"></div>
            
            {/* White bottom half */}
            <div className="absolute top-1/2 left-0 right-0 bottom-0 bg-white rounded-b-full border-4 border-white"></div>
            
            {/* Center button */}
            <div className="absolute w-6 h-6 rounded-full bg-white border-2 border-[#111] z-20 flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-full bg-[#85DDFF]"></div>
            </div>
          </div>
          
          {/* Menu text */}
          <span className="font-pixel text-white text-sm ml-1 drop-shadow-md">MENU</span>
        </button>
      )}

      {/* Mini Player */}
      {miniPlayerVisible && isPlaying && !isOpen && !showMusic && (
        <div className="fixed bottom-24 right-6 z-50 w-[220px] bg-gradient-to-r from-[#2a6fa8] to-[#3298cb] rounded-lg shadow-lg border-2 border-[#85DDFF]/80 backdrop-blur-sm">
          <div className="flex items-center p-2 relative">
            <div className="w-7 h-7 rounded-full bg-[#1a4971] flex items-center justify-center mr-2 border border-[#85DDFF] shadow-inner">
              {isPlaying ? (
                <div className="flex items-end h-3 space-x-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-0.5 bg-[#AAFF00]" 
                      style={{ 
                        height: `${2 + Math.sin(Date.now()/200 + i) * 2}px`,
                        animation: 'equalize 1s infinite ease-in-out',
                        animationDelay: `${i * 0.2}s`
                      }}
                    ></div>
                  ))}
                </div>
              ) : (
                <MusicalNoteIcon className="h-3 w-3 text-[#85DDFF]" />
              )}
            </div>
            <div className="flex-1 overflow-hidden cursor-pointer" onClick={() => {
              setIsOpen(true);
              setShowMusic(true);
            }}>
              <Typography className="font-pixel text-[8px] text-white/80 truncate">
                {isPlaying ? "Now Playing:" : "Paused:"}
              </Typography>
              <Typography className="font-pixel text-[10px] text-[#85DDFF] font-bold truncate">
                {musicTracks[selectedTrackIndex].name}
              </Typography>
            </div>
            <div className="flex items-center">
              <button 
                className="w-6 h-6 rounded-full flex items-center justify-center bg-[#85DDFF]/20 hover:bg-[#85DDFF]/40 mr-1 border border-[#85DDFF]/40"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                  localStorage.setItem('pokebox-music-enabled', (!isPlaying).toString());
                }}
              >
                {isPlaying ? (
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                ) : (
                  <div className="w-0 h-0 border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent border-l-[4px] border-l-white ml-0.5"></div>
                )}
              </button>
              <button 
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#85DDFF]/20 hover:bg-[#85DDFF]/40 border border-[#85DDFF]/40"
                onClick={() => {
                  setMiniPlayerVisible(false);
                  setIsPlaying(false);
                  localStorage.setItem('pokebox-music-enabled', 'false');
                  if (audioRef.current) {
                    audioRef.current.pause();
                  }
                }}
              >
                <XMarkIcon className="h-3 w-3 text-white" />
              </button>
            </div>
          </div>
          <div className="px-2 pb-2">
            <div className="w-full h-1 bg-[#1a4971] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#85DDFF] to-[#AAFF00] rounded-full"
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Pokédex UI - Full Screen */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#FF0000] to-[#CC0000] rounded-xl w-full max-w-md h-[90vh] overflow-hidden border-4 border-white shadow-[0_10px_50px_rgba(0,0,0,0.5)] flex flex-col relative">
            {/* Top Section with Blue Light */}
            <div className="h-16 bg-gradient-to-r from-[#FF0000] to-[#CC0000] relative px-4 flex items-center shadow-md">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#85DDFF] relative overflow-hidden shadow-md">
                <div className="absolute w-3 h-3 bg-white/40 rounded-full top-1 left-1"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#3298cb]/30"></div>
              </div>
              <div className="ml-3 flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FF5252] border border-white/30"></div>
                <div className="w-2 h-2 rounded-full bg-[#AAFF00] border border-white/30"></div>
                <div className="w-2 h-2 rounded-full bg-[#FFEB3B] border border-white/30"></div>
              </div>
              <div className="ml-auto">
                <Typography className="font-pixel text-white text-sm drop-shadow-md">POKéMOBILE</Typography>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 p-4">
              <div className="bg-[#222222] rounded-lg border-4 border-[#222222] h-full overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <div className="bg-gradient-to-br from-[#3298cb] to-[#2a6fa8] rounded-sm h-full p-2 overflow-hidden">
                  {showMusic ? (
                    // Music Selection UI
                    <div className="w-full h-full flex flex-col bg-gradient-to-b from-[#1a4971] to-[#2a6fa8] rounded-sm overflow-hidden">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-[#085283] to-[#2a6fa8] px-3 py-2 flex items-center justify-between border-b-2 border-[#85DDFF]">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#AAFF00] animate-pulse' : 'bg-[#FF5252]'} mr-2 border border-white`}></div>
                          <Typography className="font-pixel text-[12px] font-bold text-white drop-shadow-md">
                            POKÉMUSIC
                          </Typography>
                        </div>
                        <button 
                          className="text-[8px] font-pixel px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FF5252] to-[#FF3030] text-white border border-white shadow-md hover:from-[#FF3030] hover:to-[#FF1010] transition-all duration-200"
                          onClick={() => {
                            playSound(pageSwitchSound);
                            setShowMusic(false);
                            if (isPlaying) {
                              setMiniPlayerVisible(true);
                            }
                          }}
                        >
                          BACK
                        </button>
                      </div>
                      
                      {/* Music visualizer - only shows when playing */}
                      {isPlaying && isMusicEnabled && (
                        <div className="h-12 bg-black/40 flex items-end justify-center px-2 py-1">
                          <div className="flex items-end h-full w-full space-x-1">
                            {[...Array(16)].map((_, i) => (
                              <div 
                                key={i} 
                                className="bg-[#85DDFF] w-full rounded-t-sm" 
                                style={{ 
                                  height: `${Math.floor(Math.random() * 100)}%`,
                                  animation: 'equalizer 1s infinite ease-in-out',
                                  animationDelay: `${i * 0.06}s`,
                                  opacity: isPlaying ? 0.8 : 0.3
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Track listing - Only show songs that start with "Pixel" */}
                      <div className="flex-1 overflow-auto px-2 py-1">
                        <div className="mb-2 mt-1">
                          <Typography className="font-pixel text-[10px] text-[#85DDFF] uppercase border-b border-[#85DDFF]/30 pb-1">
                            Select a track
                          </Typography>
                        </div>
                        
                        {musicTracks
                          .filter(track => track.name.startsWith("Pixel"))
                          .map((track) => {
                            // Get the actual index in the full array
                            const actualIndex = musicTracks.findIndex(t => t.id === track.id);
                            return (
                              <div 
                                key={track.id} 
                                onClick={() => {
                                  setSelectedTrackIndex(actualIndex);
                                  if(isMusicEnabled && !isPlaying) {
                                    setIsPlaying(true);
                                    localStorage.setItem('pokebox-music-enabled', 'true');
                                  }
                                }}
                                className={`flex justify-between items-center py-1.5 px-2 mb-2 rounded-md cursor-pointer transition-all duration-200
                                  ${selectedTrackIndex === actualIndex 
                                    ? 'bg-gradient-to-r from-[#85DDFF]/40 to-[#85DDFF]/20 border-l-4 border-[#85DDFF]' 
                                    : 'hover:bg-[#3298cb]/50 border-l-4 border-transparent'}`}
                              >
                                <div className="flex items-center">
                                  {/* Track icon/indicator */}
                                  <div className="mr-2 relative">
                                    {selectedTrackIndex === actualIndex && isPlaying && isMusicEnabled ? (
                                      // Animated playing indicator
                                      <div className="w-6 h-6 rounded-full bg-[#2a6fa8]/70 border border-[#85DDFF] flex items-center justify-center">
                                        <div className="flex items-end h-3 space-x-0.5">
                                          {[...Array(3)].map((_, i) => (
                                            <div 
                                              key={i} 
                                              className="w-1 bg-[#AAFF00]" 
                                              style={{ 
                                                height: `${6 + Math.sin(Date.now()/200 + i) * 3}px`,
                                                animation: 'equalize 1s infinite ease-in-out',
                                                animationDelay: `${i * 0.2}s`
                                              }}
                                            ></div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      // Regular music note icon
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                                        ${selectedTrackIndex === actualIndex ? 'bg-[#85DDFF]/30 border border-[#85DDFF]' : 'bg-[#2a6fa8]/50'}`}>
                                        <MusicalNoteIcon className="h-3 w-3 text-white" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Track name */}
                                  <div>
                                    <Typography 
                                      className={`font-pixel text-[10px] ${selectedTrackIndex === actualIndex ? 'text-white font-bold' : 'text-[#85DDFF]'}`}
                                    >
                                      {track.name}
                                    </Typography>
                                    <Typography className="font-pixel text-[7px] text-[#85DDFF]/70">
                                      {track.artist}
                                    </Typography>
                                  </div>
                                </div>
                                
                                {/* Duration */}
                                <div className="flex flex-col items-end">
                                  <Typography className={`font-pixel text-[9px] ${selectedTrackIndex === actualIndex ? 'text-white' : 'text-[#85DDFF]/70'}`}>
                                    {track.duration}
                                  </Typography>
                                  {selectedTrackIndex === actualIndex && (
                                    <div className="w-8 h-1 bg-[#85DDFF]/30 rounded-full mt-1">
                                      <div 
                                        className="h-full bg-[#85DDFF] rounded-full"
                                        style={{ width: `${currentProgress}%` }}
                                      ></div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      
                      {/* Playback controls */}
                      <div className="bg-[#1a4971] border-t border-[#85DDFF]/50 p-2">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => {
                              // Filter only Pixel songs
                              const pixelTracks = musicTracks.filter(track => track.name.startsWith("Pixel"));
                              // Find current track index in filtered list
                              const currentTrackId = musicTracks[selectedTrackIndex].id;
                              const currentPixelIndex = pixelTracks.findIndex(t => t.id === currentTrackId);
                              // Calculate previous index with wrap-around
                              const prevPixelIndex = (currentPixelIndex - 1 + pixelTracks.length) % pixelTracks.length;
                              // Get the actual index in the main tracks array
                              const prevTrackIndex = musicTracks.findIndex(t => t.id === pixelTracks[prevPixelIndex].id);
                              // Set the new index
                              setSelectedTrackIndex(prevTrackIndex);
                            }}
                            className="w-8 h-8 rounded-full bg-[#2a6fa8]/70 flex items-center justify-center border border-[#85DDFF]/30 hover:bg-[#3298cb] transition-colors duration-200"
                          >
                            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-white ml-[-2px]"></div>
                          </button>
                          
                          <button
                            onClick={() => {
                              setIsPlaying(!isPlaying);
                              localStorage.setItem('pokebox-music-enabled', (!isPlaying).toString());
                            }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200
                              ${isPlaying 
                                ? 'bg-[#FF5252] border-[#FFEB3B] hover:bg-[#FF3030]' 
                                : 'bg-[#AAFF00] border-[#85DDFF] hover:bg-[#88cc00]'}`}
                          >
                            {isPlaying ? (
                              <div className="w-4 h-5 bg-white rounded-sm"></div>
                            ) : (
                              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-white ml-1"></div>
                            )}
                          </button>
                          
                          <button
                            onClick={() => {
                              // Filter only Pixel songs
                              const pixelTracks = musicTracks.filter(track => track.name.startsWith("Pixel"));
                              // Find current track index in filtered list
                              const currentTrackId = musicTracks[selectedTrackIndex].id;
                              const currentPixelIndex = pixelTracks.findIndex(t => t.id === currentTrackId);
                              // Calculate next index with wrap-around
                              const nextPixelIndex = (currentPixelIndex + 1) % pixelTracks.length;
                              // Get the actual index in the main tracks array
                              const nextTrackIndex = musicTracks.findIndex(t => t.id === pixelTracks[nextPixelIndex].id);
                              // Set the new index
                              setSelectedTrackIndex(nextTrackIndex);
                            }}
                            className="w-8 h-8 rounded-full bg-[#2a6fa8]/70 flex items-center justify-center border border-[#85DDFF]/30 hover:bg-[#3298cb] transition-colors duration-200"
                          >
                            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-white mr-[-2px]"></div>
                          </button>
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <Typography className="font-pixel text-[7px] text-[#85DDFF]">
                            {/* Display position within pixel tracks, not all tracks */}
                            {musicTracks.filter(track => track.name.startsWith("Pixel")).findIndex(
                              t => t.id === musicTracks[selectedTrackIndex].id
                            ) + 1}/{musicTracks.filter(track => track.name.startsWith("Pixel")).length}
                          </Typography>
                          
                          <button
                            onClick={() => setIsMusicEnabled(!isMusicEnabled)}
                            className={`px-2 py-0.5 rounded-full text-[7px] font-pixel border transition-colors duration-200
                              ${isMusicEnabled 
                                ? 'bg-[#85DDFF]/20 border-[#85DDFF] text-white' 
                                : 'bg-[#FF5252]/20 border-[#FF5252] text-[#FF5252]'}`}
                          >
                            {isMusicEnabled ? 'SOUND ON' : 'MUTED'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : showPokemonScreen ? (
                    // Pokémon Display UI
                    <div className="w-full h-full flex flex-col">
                      {/* Header Bar with Back Button */}
                      <div className="bg-[#2a6fa8] rounded-t-sm px-1 py-0.5 flex justify-between items-center">
                        <div className="flex items-center">
                          <button 
                            onClick={() => {
                              playSound(pageSwitchSound);
                              setShowPokemonScreen(false);
                            }}
                            className="mr-2 px-1 rounded bg-[#1c4e85] text-white text-[7px] font-pixel flex items-center"
                          >
                            &lt; BACK
                          </button>
                          <Typography className="font-pixel text-[8px] text-white">
                            #{currentCreature.number}
                          </Typography>
                        </div>
                        <Typography className="font-pixel text-[8px] text-white uppercase">
                          {currentCreature.type}
                        </Typography>
                      </div>
                      
                      {/* Pokémon Image Area */}
                      <div className="bg-[#FFFFFF] flex-1 flex items-center justify-center p-2 relative min-h-[180px]">
                        {/* Grid Pattern Background */}
                        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                          {[...Array(100)].map((_, i) => (
                            <div key={i} className="border-[0.5px] border-[#DDDDDD]"></div>
                          ))}
                        </div>
                        
                        {/* Creature Image */}
                        <img 
                          src={currentCreature.image}
                          alt={currentCreature.name} 
                          className="w-4/5 h-4/5 object-contain z-10" 
                        />
                      </div>
                      
                      {/* Info Area */}
                      <div className="bg-[#2a6fa8] p-2">
                        <Typography className="font-pixel text-[12px] font-bold text-white mb-1">
                          {currentCreature.name.toUpperCase()}
                        </Typography>
                        
                        {/* Stats in 2 columns */}
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          <Typography className="font-pixel text-[9px] text-white">
                            HP: {currentCreature.stats.hp}
                          </Typography>
                          <Typography className="font-pixel text-[9px] text-white">
                            ATK: {currentCreature.stats.atk}
                          </Typography>
                          <Typography className="font-pixel text-[9px] text-white">
                            DEF: {currentCreature.stats.def}
                          </Typography>
                          <Typography className="font-pixel text-[9px] text-white">
                            SPD: {currentCreature.stats.spd}
                          </Typography>
                          <Typography className="font-pixel text-[9px] text-white">
                            HT: {currentCreature.height}
                          </Typography>
                          <Typography className="font-pixel text-[9px] text-white">
                            WT: {currentCreature.weight}
                          </Typography>
                        </div>
                        
                        {/* Description */}
                        <div className="mt-2 border border-[#85DDFF] rounded-sm p-1 bg-[#3298cb]">
                          <Typography className="font-pixel text-[8px] text-white leading-tight">
                            {currentCreature.desc}
                          </Typography>
                        </div>
                        
                        {/* Navigation dots */}
                        <div className="flex justify-center mt-2 space-x-1">
                          {creatures.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCreatureIndex(index)}
                              className={`w-2 h-2 rounded-full ${index === creatureIndex ? 'bg-white' : 'bg-white/30'}`}
                            ></button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Default UI with menu items
                    <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#2a6fa8] to-[#1a4971] rounded-sm">
                      {/* Header */}
                      <div className="p-3 border-b-2 border-[#85DDFF]">
                        <Typography className="font-pixel text-[14px] font-bold text-white text-center drop-shadow-md">
                          POKéDEX MENU
                        </Typography>
                        <Typography className="font-pixel text-[9px] text-white/80 text-center mt-1">
                          Select an option below
                        </Typography>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="flex-1 p-3 overflow-auto">
                        {menuItems.map((item, index) => (
                          <div 
                            key={item.id}
                            className={`mb-3 p-2.5 rounded-lg transition-all duration-200 ${
                              selectedMenuIndex === index 
                                ? 'bg-gradient-to-r from-[#85DDFF] to-[#3298cb] border-2 border-white shadow-[0_0_15px_rgba(133,221,255,0.5)]' 
                                : item.id === 'collection' 
                                  ? 'bg-[#85DDFF]/30 border-2 border-[#85DDFF]' 
                                  : 'bg-[#3298cb]/70 hover:bg-[#85DDFF]/30 border border-[#85DDFF]/40'
                            } cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md`}
                            onClick={() => {
                              playSound(pageSwitchSound);
                              setSelectedMenuIndex(index);
                              localStorage.setItem('pokebox-selected-menu-index', index.toString());
                              
                              if (item.id === 'collection') {
                                setShowPokemonScreen(true);
                              } else if (item.id === 'music') {
                                setShowMusic(true);
                              } else {
                                if (onSectionChange) {
                                  onSectionChange(item.id);
                                }
                                setIsOpen(false);
                              }
                            }}
                          >
                            <div className="flex items-center mb-1">
                              <div className="bg-[#1a4971] p-1.5 rounded-md shadow-inner mr-2.5">
                                <item.icon className="h-4 w-4 text-[#85DDFF]" />
                              </div>
                              <Typography className="font-pixel text-[11px] text-white font-bold drop-shadow-sm">
                                {item.label}
                              </Typography>
                              {selectedMenuIndex === index && (
                                <div className="ml-2 w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
                              )}
                            </div>
                            <Typography className="font-pixel text-[8px] text-white/80 pl-9">
                              {item.description}
                            </Typography>
                          </div>
                        ))}
                      </div>
                      
                      {/* Footer */}
                      <div className="p-3 border-t-2 border-[#85DDFF] bg-gradient-to-r from-[#1a4971] to-[#2a6fa8]">
                        <div className="flex justify-between items-center">
                          <div className="bg-[#3298cb]/50 px-2 py-1 rounded-lg border border-[#85DDFF]/30">
                            <Typography className="font-pixel text-[8px] text-white/80">
                              TRAINER:
                            </Typography>
                            <Typography className="font-pixel text-[10px] text-white font-bold drop-shadow-sm">
                              ASH KETCHUM
                            </Typography>
                          </div>
                          <div className="bg-[#3298cb]/50 px-2 py-1 rounded-lg border border-[#85DDFF]/30">
                            <Typography className="font-pixel text-[8px] text-white/80">
                              POKéMON:
                            </Typography>
                            <Typography className="font-pixel text-[10px] text-white font-bold drop-shadow-sm">
                              {creatures.length} REGISTERED
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Control Panel */}
            <div className="h-16 bg-gradient-to-r from-[#CC0000] to-[#FF0000] p-3 flex justify-between items-center shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)]">
              {/* Sound Toggle Button */}
              <button 
                onClick={() => setIsMusicEnabled(!isMusicEnabled)}
                className={`px-3 py-1 rounded-full text-[8px] font-pixel shadow-md ${
                  isMusicEnabled 
                    ? 'bg-gradient-to-r from-[#85DDFF]/30 to-[#85DDFF]/10 border border-[#85DDFF] text-white' 
                    : 'bg-gradient-to-r from-[#FF5252]/30 to-[#FF5252]/10 border border-[#FF5252] text-[#FF5252]'
                }`}
              >
                {isMusicEnabled ? 'SOUND ON' : 'MUTED'}
              </button>
              
              {/* Navigation Buttons */}
              <div className="flex space-x-3">
                {showMusic || showPokemonScreen ? (
                  <button
                    onClick={() => {
                      playSound(pageSwitchSound);
                      setShowMusic(false);
                      setShowPokemonScreen(false);
                      if (isPlaying) {
                        setMiniPlayerVisible(true);
                      }
                    }}
                    className="bg-gradient-to-b from-[#333333] to-[#222222] text-white px-4 py-2 rounded-md flex items-center justify-center border-2 border-[#111111] shadow-md hover:shadow-lg active:shadow-inner active:from-[#222222] active:to-[#333333] transition-all duration-100"
                  >
                    <Typography className="font-pixel text-[9px]">MENU</Typography>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      playSound(pageSwitchSound);
                      setIsOpen(false);
                    }}
                    className="bg-gradient-to-b from-[#333333] to-[#222222] text-white px-4 py-2 rounded-md flex items-center justify-center border-2 border-[#111111] shadow-md hover:shadow-lg active:shadow-inner active:from-[#222222] active:to-[#333333] transition-all duration-100"
                  >
                    <Typography className="font-pixel text-[9px]">CLOSE</Typography>
                  </button>
                )}
                
                {showPokemonScreen && (
                  <>
                    <button
                      onClick={() => {
                        playSound(pageSwitchSound);
                        setCreatureIndex(prev => (prev > 0 ? prev - 1 : creatures.length - 1));
                      }}
                      className="bg-gradient-to-b from-[#333333] to-[#222222] text-white rounded-full w-11 h-11 flex items-center justify-center border-2 border-[#111111] shadow-md hover:shadow-lg active:shadow-inner active:from-[#222222] active:to-[#333333] transition-all duration-100"
                    >
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-white ml-[-1px]"></div>
                    </button>
                    <button
                      onClick={() => {
                        playSound(pageSwitchSound);
                        setCreatureIndex(prev => (prev < creatures.length - 1 ? prev + 1 : 0));
                      }}
                      className="bg-gradient-to-b from-[#333333] to-[#222222] text-white rounded-full w-11 h-11 flex items-center justify-center border-2 border-[#111111] shadow-md hover:shadow-lg active:shadow-inner active:from-[#222222] active:to-[#333333] transition-all duration-100"
                    >
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-white mr-[-1px]"></div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePokeBox; 