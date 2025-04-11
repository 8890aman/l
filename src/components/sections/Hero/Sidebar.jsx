import React, { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Import icons
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  TrophyIcon, 
  Cog6ToothIcon,
  ArchiveBoxIcon,
  UserIcon,
  BoltIcon,
  MusicalNoteIcon
} from "@heroicons/react/24/solid";

// Import only the needed images
import mysteryImg from "../../../assets/pixel-art-question-mark-creature--teal-and-mint-gr.png";
import charizardGif from "../../../assets/mega_charizard_y_animated_sprite_by_noellembrooks_ddmd4dm.gif";
import gyaradosGif from "../../../assets/mega_gyarados_animated_v2__request__by_diegotoon20_d9dslj3.gif";
import raichuGif from "../../../assets/raichu.gif";

// Import audio files
import battleTheme from "../../../assets/music/battle-theme.mp3";
import route1Theme from "../../../assets/music/route-1.mp3";
import gymLeaderTheme from "../../../assets/music/gym-leader.mp3";
import evolutionTheme from "../../../assets/music/evolution.mp3";
import pixelParadise from "../../../assets/music/Pixel Paradise.mp3";
import pixelatedHeartache from "../../../assets/music/Pixelated Heartache.mp3";
import notificationSound from "../../../assets/music/notification.mp3";
import pageSwitchSound from "../../../assets/music/pageOrnavlinkswitch.mp3";

// Main component
const Sidebar = ({ isCollapsed, toggleCollapse, onSectionChange }) => {
  // State management
  const [showMusic, setShowMusic] = useState(false);
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
  const [isLightsOn, setIsLightsOn] = useState(false);
  const [showPokemonScreen, setShowPokemonScreen] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(() => {
    const savedMenuIndex = localStorage.getItem('pokebox-selected-menu-index');
    return savedMenuIndex !== null ? parseInt(savedMenuIndex, 10) : 0;
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationTimer, setNotificationTimer] = useState(null);
  const [miniPlayerVisible, setMiniPlayerVisible] = useState(() => {
    const savedMiniPlayerState = localStorage.getItem('pokebox-mini-player-visible');
    return savedMiniPlayerState !== null ? savedMiniPlayerState === 'true' : false;
  });
  const [currentProgress, setCurrentProgress] = useState(0);
  const progressIntervalRef = useRef(null);

  // Audio refs
  const audioRef = useRef(null);
  const soundEffectRef = useRef(null);

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

  // Show notification message
  const showNotificationMessage = (message, duration = 5000) => {
    // Clear any existing notification timer
    if (notificationTimer) clearTimeout(notificationTimer);
    
    // Set notification message and show it
    setNotificationMessage(message);
    setShowNotification(true);
    
    // Play notification sound
    playSound(notificationSound);
    
    // Set timer to hide notification
    const timer = setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage("");
    }, duration);
    
    setNotificationTimer(timer);
  };
  
  // Hide notification
  const hideNotification = () => {
    setShowNotification(false);
    if (notificationTimer) {
      clearTimeout(notificationTimer);
      setNotificationTimer(null);
    }
  };

  // Listen for notification events from other components
  useEffect(() => {
    const handleNotificationEvent = (event) => {
      if (event.detail && event.detail.message) {
        // Only show notifications about receiving Pokémon
        if (event.detail.message.includes("added to your collection")) {
          showNotificationMessage(event.detail.message);
        }
      }
    };
    
    document.addEventListener('pokedex-notification', handleNotificationEvent);
    
    return () => {
      document.removeEventListener('pokedex-notification', handleNotificationEvent);
    };
  }, []);

  // Clean up notification timer on unmount
  useEffect(() => {
    return () => {
      if (notificationTimer) clearTimeout(notificationTimer);
    };
  }, [notificationTimer]);

  // Menu navigation items
  const menuItems = [
    { id: "home", label: "HOME", icon: HomeIcon, description: "Return to the main dashboard", path: "/" },
    { id: "profile", label: "TRAINER PROFILE", icon: UserIcon, description: "View and edit your trainer information", path: "/profile" },
    { id: "collection", label: "MY COLLECTION", icon: ArchiveBoxIcon, description: "Browse your Pokémon collection", path: "/collection" },
    { id: "battle", label: "BATTLE CENTER", icon: BoltIcon, description: "Fight against other trainers", path: "/battle" },
    { id: "music", label: "MUSIC PLAYER", icon: MusicalNoteIcon, description: "Browse and play music tracks", path: "/music" },
    { id: "marketplace", label: "MARKETPLACE", icon: ShoppingBagIcon, description: "Buy and sell Pokémon", path: "/marketplace" },
  ];

  // Define creatures data using all available images
  const creatures = [
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
  ];

  // Get current creature
  const currentCreature = creatures[creatureIndex];

  // Toggle music panel - modified to handle stopping and restarting music properly
  const toggleMusic = () => {
    playSound(pageSwitchSound);
    
    // Store current time position if audio is playing
    let currentTime = 0;
    if (audioRef.current) {
      currentTime = audioRef.current.currentTime;
    }
    
    // We're opening the music UI
    if (!showMusic) {
      setMiniPlayerVisible(false); // Hide mini player when opening full player
    } 
    // We're closing the music UI but music is playing
    else if (isPlaying) {
      setMiniPlayerVisible(true);
    }
    
    // Update UI state
    setShowMusic(!showMusic);
    
    // After state update, ensure the audio continues from the same position if playing
    if (isPlaying && audioRef.current) {
      // Use a small timeout to ensure DOM updates first
      setTimeout(() => {
        if (audioRef.current && isPlaying) {
          audioRef.current.currentTime = currentTime;
          if (audioRef.current.paused) {
            audioRef.current.play().catch(err => console.log("Playback error:", err));
          }
        }
      }, 50);
    }
  };

  // Handle play button click in the music player or mini player
  const handlePlayButtonClick = () => {
    // If we're starting to play music
    if (!isPlaying) {
      setIsPlaying(true);
      // If music player is closed, show mini player
      if (!showMusic) {
        setMiniPlayerVisible(true);
      }
      
      // Ensure the audio plays when we click play
      if (audioRef.current) {
        audioRef.current.src = musicTracks[selectedTrackIndex].src;
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(err => console.log("Playback error:", err));
      }
      
      // Save preference to localStorage
      localStorage.setItem('pokebox-music-enabled', 'true');
    } 
    // If we're stopping music
    else {
    setIsPlaying(false);
      
      // Pause the audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Save preference to localStorage
      localStorage.setItem('pokebox-music-enabled', 'false');
    }
  };

  // Toggle Pokémon screen
  const togglePokemonScreen = () => {
    playSound(pageSwitchSound);
    setShowPokemonScreen(!showPokemonScreen);
  };

  // Navigate to path
  const navigateTo = (path) => {
    // Handle navigation (can be expanded later)
    console.log(`Navigating to: ${path}`);
    
    // Note: onSectionChange is now called directly from the onClick handler
    // so we don't need to call it here again
  };

  // Handle D-pad navigation
  const handleDPadUp = () => {
    if (showMusic) {
      // In music screen, navigate up through Pixel-themed tracks
      const pixelTracks = musicTracks.filter(track => track.name.startsWith("Pixel"));
      // Find current track index in filtered list
      const currentTrackId = musicTracks[selectedTrackIndex].id;
      const currentPixelIndex = pixelTracks.findIndex(t => t.id === currentTrackId);
      
      // If we're not at the top, move up
      if (currentPixelIndex > 0) {
        const prevPixelIndex = currentPixelIndex - 1;
        // Get the actual index in the main tracks array
        const prevTrackIndex = musicTracks.findIndex(t => t.id === pixelTracks[prevPixelIndex].id);
        setSelectedTrackIndex(prevTrackIndex);
      }
    } else if (!showPokemonScreen) {
      // In menu screen, navigate up through menu items
      setSelectedMenuIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
  };

  const handleDPadDown = () => {
    if (showMusic) {
      // In music screen, navigate down through Pixel-themed tracks
      const pixelTracks = musicTracks.filter(track => track.name.startsWith("Pixel"));
      // Find current track index in filtered list
      const currentTrackId = musicTracks[selectedTrackIndex].id;
      const currentPixelIndex = pixelTracks.findIndex(t => t.id === currentTrackId);
      
      // If we're not at the bottom, move down
      if (currentPixelIndex < pixelTracks.length - 1) {
        const nextPixelIndex = currentPixelIndex + 1;
        // Get the actual index in the main tracks array
        const nextTrackIndex = musicTracks.findIndex(t => t.id === pixelTracks[nextPixelIndex].id);
        setSelectedTrackIndex(nextTrackIndex);
      }
    } else if (!showPokemonScreen) {
      // In menu screen, navigate down through menu items
      setSelectedMenuIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : prev));
    }
  };

  const handleDPadLeft = () => {
    if (!showMusic && showPokemonScreen) {
      setCreatureIndex(prev => (prev > 0 ? prev - 1 : creatures.length - 1));
    }
  };

  const handleDPadRight = () => {
    if (!showMusic && showPokemonScreen) {
      setCreatureIndex(prev => (prev < creatures.length - 1 ? prev + 1 : 0));
    }
  };

  const handleDPadSelect = () => {
    // If notification is showing, dismiss it
    if (showNotification) {
      hideNotification();
      return;
    }
    
    if (showMusic && isMusicEnabled) {
      setIsPlaying(!isPlaying);
      // Don't show notification for music playback anymore
    } else if (!showPokemonScreen) {
      // Select the currently focused menu item
      selectCurrentMenuItem();
    }
  };
  
  // Select current menu item
  const selectCurrentMenuItem = () => {
    const selectedItem = menuItems[selectedMenuIndex];
    if (selectedItem.id === 'collection') {
      togglePokemonScreen();
      // Sound is played in the toggle function
    } else if (selectedItem.id === 'music') {
      toggleMusic();
      // Sound is played in the toggle function
    } else {
      // Call onSectionChange with the correct item ID
      if (onSectionChange) {
        playSound(pageSwitchSound);
        onSectionChange(selectedItem.id);
      }
      navigateTo(selectedItem.path);
    }
  };

  // Toggle music enabled state
  const toggleMusicEnabled = () => {
    setIsMusicEnabled(!isMusicEnabled);
    if (isMusicEnabled && isPlaying) {
      setIsPlaying(false);
    }
  };

  // Blinking effect for LEDs and speaker lights
  useEffect(() => {
    let interval;
    if (isPlaying && showMusic && isMusicEnabled) {
      // Using interval for music visualizer animation (no longer using isBlinking)
      interval = setInterval(() => {
        // Just keep interval active without state changes since we use CSS animations now
      }, 500);
    } else if (!showMusic) {
      // Blink the LED every 3 seconds when not in music mode
      interval = setInterval(() => {
        setIsLightsOn(prev => !prev);
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, showMusic, isMusicEnabled]);

  // Filter music tracks to only pixel-themed songs
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
        
        // Ensure the audio is playing with the correct track
      if (audioRef.current) {
          setTimeout(() => {
            if (audioRef.current && isPlaying) {
        audioRef.current.src = musicTracks[selectedTrackIndex].src;
              audioRef.current.volume = 0.5;
              audioRef.current.play().catch(err => {
                console.log("Auto-playback error:", err);
                // Some browsers block autoplay, so update state to reflect this
                setIsPlaying(false);
              });
            }
          }, 100); // Short delay to ensure DOM is ready
        }
      }
    }
  }, []);

  // Handle music playback - modified to autoplay on mount
  useEffect(() => {
    if (isPlaying && isMusicEnabled && (showMusic || miniPlayerVisible)) {
      if (audioRef.current) {
        audioRef.current.src = musicTracks[selectedTrackIndex].src;
        audioRef.current.loop = false; // Don't loop individual tracks
        audioRef.current.play().catch(error => {
          console.log("Playback prevented:", error);
          // If autoplay is blocked, update state to reflect actual playback status
          setIsPlaying(false);
        });
      }
    } else if (!isPlaying && audioRef.current) {
        audioRef.current.pause();
      }
  }, [isPlaying, selectedTrackIndex, isMusicEnabled, showMusic, miniPlayerVisible]);

  // Start/stop progress timer based on playback state - modified to handle track looping
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

  // Close mini player - separate from play/pause functionality
  const closeMiniPlayer = (e) => {
    if (e) e.stopPropagation();
    setMiniPlayerVisible(false);
    setIsPlaying(false);
    localStorage.setItem('pokebox-music-enabled', 'false');
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Explicit width of sidebar for calculations
  const sidebarWidth = 350;

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Save selected track index to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pokebox-selected-track-index', selectedTrackIndex.toString());
  }, [selectedTrackIndex]);

  // Save mini player state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pokebox-mini-player-visible', miniPlayerVisible.toString());
  }, [miniPlayerVisible]);

  // Save selected menu index to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pokebox-selected-menu-index', selectedMenuIndex.toString());
  }, [selectedMenuIndex]);

  // When the component mounts, check if we need to load a saved section
  useEffect(() => {
    // After mounting, check if we need to auto-select a saved menu item
    const savedMenuIndex = localStorage.getItem('pokebox-selected-menu-index');
    if (savedMenuIndex !== null) {
      const menuIndex = parseInt(savedMenuIndex, 10);
      const selectedItem = menuItems[menuIndex];
      // Only call onSectionChange if it's not the music or collection (to avoid opening those screens automatically)
      if (selectedItem && selectedItem.id !== 'music' && selectedItem.id !== 'collection') {
        if (onSectionChange) {
          onSectionChange(selectedItem.id);
        }
      }
    }
  }, []);

  return (
    <div className="fixed top-0 right-0 bottom-0 h-screen hidden lg:block" style={{ width: `${sidebarWidth}px`, overflow: 'visible' }}>
      {/* Hidden audio elements */}
      <audio ref={audioRef} />
      <audio ref={soundEffectRef} />
      
      {/* Classic Pokédex Container */}
      <div 
        className={`absolute inset-0 h-full flex flex-col bg-[#FF0000] rounded-l-3xl overflow-hidden shadow-xl transition-transform duration-500`}
        style={{ 
          width: `${sidebarWidth}px`,
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
          transform: isCollapsed ? `translateX(${sidebarWidth - 40}px)` : 'translateX(0)',
          zIndex: 50
        }}
      >
        <div className="bg-[#FF0000] rounded-l-2xl overflow-hidden h-full border-4 border-[#CC0000] shadow-lg flex flex-col relative">
          {/* Toggle Button */}
          <button 
            onClick={toggleCollapse}
            className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-[#FF0000] text-white rounded-l-lg p-1.5 shadow-md border-2 border-[#CC0000] hover:bg-[#CC0000] transition-colors duration-200 focus:outline-none"
            style={{ zIndex: 60 }}
          >
            {isCollapsed ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>

          {/* Top Section with Curved Edge */}
          <div className="h-16 bg-[#FF0000] relative">
            {/* Big blue light with pulsing animation */}
            <div className="absolute top-4 left-4 flex items-center">
              <div className={`w-8 h-8 rounded-full border-4 border-white ${isLightsOn ? 'bg-[#85DDFF]' : 'bg-[#6CB0FF]'} relative overflow-hidden transition-colors duration-300`}>
                <div className="absolute inset-0 bg-white/20 rounded-full transform translate-x-1 translate-y-1 w-2 h-2"></div>
              </div>
              
              {/* Small indicator lights */}
              <div className="ml-3 flex space-x-2">
                <div className={`w-2 h-2 rounded-full ${isLightsOn ? 'bg-[#FF5252]' : 'bg-[#AA0000]'} transition-colors duration-300`}></div>
                <div className={`w-2 h-2 rounded-full ${isLightsOn ? 'bg-[#AAFF00]' : 'bg-[#00AA00]'} transition-colors duration-300`}></div>
                <div className={`w-2 h-2 rounded-full ${isLightsOn ? 'bg-[#FFEB3B]' : 'bg-[#AA8800]'} transition-colors duration-300`}></div>
              </div>
            </div>
            
            {/* Mini music player in top section - NEW POSITION */}
            {miniPlayerVisible && isPlaying && !showMusic && (
              <div className="absolute top-1 right-4 z-50 w-[170px] bg-[#2a6fa8] rounded-lg shadow-md border-2 border-[#85DDFF]">
                <div className="flex items-center p-1.5 relative">
                  <div className="w-6 h-6 rounded-full bg-[#1a4971] flex items-center justify-center mr-2 border border-[#85DDFF]">
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
                  <div className="flex-1 overflow-hidden cursor-pointer" onClick={() => setShowMusic(true)}>
                    <Typography className="font-pixel text-[6px] text-white truncate">
                      {isPlaying ? "Now Playing:" : "Paused:"}
                    </Typography>
                    <Typography className="font-pixel text-[8px] text-[#85DDFF] font-bold truncate">
                      {musicTracks[selectedTrackIndex].name}
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <button 
                      className="w-5 h-5 rounded-full flex items-center justify-center bg-[#85DDFF]/20 hover:bg-[#85DDFF]/40 mr-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayButtonClick();
                      }}
                    >
                      {isPlaying ? (
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                      ) : (
                        <div className="w-0 h-0 border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent border-l-[4px] border-l-white ml-0.5"></div>
                      )}
                    </button>
                    <button 
                      className="w-5 h-5 flex items-center justify-center rounded-full bg-[#85DDFF]/20 hover:bg-[#85DDFF]/40"
                      onClick={closeMiniPlayer}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="px-2 pb-1.5">
                  <div className="w-full h-0.5 bg-[#1a4971] rounded-full">
                    <div 
                      className="h-full bg-[#85DDFF] rounded-full"
                      style={{ width: `${currentProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
              </div>
              
          {/* Main Screen Area */}
          <div className="px-6 pt-6 pb-3 flex-1">
            {/* Main Display Screen with Black Border */}
            <div className="rounded-lg border-4 border-[#222222] overflow-hidden shadow-inner relative h-full">
              {/* Screen Background */}
              <div className="bg-[#232323] h-full p-1">
                {/* Inner Screen with Blue Background */}
                <div className="bg-[#3298cb] rounded-sm h-full p-1 overflow-hidden">
                {/* Notification Overlay */}
                {showNotification && (
                  <div className="absolute inset-x-4 top-8 z-50 pointer-events-none">
                    <div className="bg-[#3298cb] border-4 border-[#2a6fa8] rounded-lg shadow-lg overflow-hidden font-pixel select-none animate-bounce-subtle" 
                      style={{ 
                        boxShadow: '0 0 0 2px #000, 0 0 0 4px #2a6fa8',
                        imageRendering: 'pixelated'
                      }}>
                      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-2 py-0.5 border-b border-[#111111] flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#AAFF00] mr-1 border border-[#85DDFF] animate-pulse shadow-sm"></div>
                        <Typography className="font-pixel text-[8px] text-white">POKÉDEX ALERT</Typography>
                      </div>
                      <div className="p-2 bg-[#85DDFF] text-white">
                        <Typography className="font-pixel text-[8px] text-[#2a6fa8] text-center">
                          {notificationMessage}
                        </Typography>
                      </div>
                      <div className="bg-[#2a6fa8] px-2 py-0.5 border-t border-[#85DDFF] flex items-center justify-between">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#85DDFF] border border-[#3298cb]"></div>
                        <Typography className="font-pixel text-[7px] text-white">PRESS A TO DISMISS</Typography>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] border border-[#00AA00]"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {showMusic ? (
                  // Music Selection UI - Enhanced version
                  <div className="w-full h-full flex flex-col bg-gradient-to-b from-[#1a4971] to-[#2a6fa8] rounded-sm overflow-hidden">
                    {/* Header with improved styling */}
                    <div className="bg-gradient-to-r from-[#085283] to-[#2a6fa8] px-3 py-2 flex items-center justify-between border-b-2 border-[#85DDFF]">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#AAFF00] animate-pulse' : 'bg-[#FF5252]'} mr-2 border border-white`}></div>
                        <Typography className="font-pixel text-[12px] font-bold text-white drop-shadow-md">
                          POKÉMUSIC
                          </Typography>
                      </div>
                        <button 
                        className="text-[8px] font-pixel px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FF5252] to-[#FF3030] text-white border border-white shadow-md hover:from-[#FF3030] hover:to-[#FF1010] transition-all duration-200"
                          onClick={toggleMusic}
                        >
                        CLOSE
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
                    
                    {/* Track listing with improved styling - Only show songs that start with "Pixel" */}
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
                          onClick={handlePlayButtonClick}
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
                          onClick={toggleMusicEnabled}
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
                          onClick={togglePokemonScreen}
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
                      <div className="bg-[#FFFFFF] flex-1 flex items-center justify-center p-2 relative min-h-[220px]">
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
                      </div>
                    </div>
                ) : (
                  // Default UI with menu items
                  <div className="w-full h-full flex flex-col bg-[#2a6fa8] rounded-sm">
                    {/* Header */}
                    <div className="p-2 border-b-2 border-[#85DDFF]">
                      <Typography className="font-pixel text-[12px] font-bold text-white text-center">
                        POKéDEX MENU
                      </Typography>
                      <Typography className="font-pixel text-[8px] text-white text-center mt-1">
                        Use D-PAD to navigate • Press A to select
                      </Typography>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="flex-1 p-2 overflow-auto">
                      {menuItems.map((item, index) => (
                        <div 
                          key={item.id}
                          className={`mb-2 p-2 rounded-lg transition-all duration-200 ${
                            selectedMenuIndex === index 
                              ? 'bg-[#85DDFF] border-2 border-white shadow-[0_0_10px_rgba(133,221,255,0.5)]' 
                              : item.id === 'collection' 
                                ? 'bg-[#85DDFF]/30 border-2 border-[#85DDFF]' 
                                : 'bg-[#3298cb] hover:bg-[#85DDFF]/30'
                          } cursor-pointer`}
                          onClick={() => {
                            setSelectedMenuIndex(index);
                            if (item.id === 'collection') {
                              togglePokemonScreen();
                            } else if (item.id === 'music') {
                              toggleMusic();
                            } else {
                              if (onSectionChange) {
                                playSound(pageSwitchSound);
                                onSectionChange(item.id);
                              }
                              navigateTo(item.path);
                            }
                          }}
                        >
                          <div className="flex items-center mb-1">
                            <item.icon className="h-4 w-4 mr-2 text-white" />
                            <Typography className="font-pixel text-[10px] text-white font-bold">
                              {item.label}
                            </Typography>
                            {selectedMenuIndex === index && (
                              <div className="ml-2 w-2 h-2 rounded-full bg-white animate-pulse"></div>
                            )}
                          </div>
                          <Typography className="font-pixel text-[8px] text-white/80">
                            {item.description}
                          </Typography>
                        </div>
                      ))}
                    </div>
                    
                    {/* Footer with user info */}
                    <div className="p-2 border-t-2 border-[#85DDFF] bg-[#2a6fa8]">
                      <div className="flex justify-between items-center">
                        <div>
                          <Typography className="font-pixel text-[8px] text-white/80">
                            TRAINER:
                          </Typography>
                          <Typography className="font-pixel text-[10px] text-white font-bold">
                            ASH KETCHUM
                          </Typography>
                        </div>
                        <div>
                          <Typography className="font-pixel text-[8px] text-white/80">
                            POKéMON:
                          </Typography>
                          <Typography className="font-pixel text-[10px] text-white font-bold">
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
          </div>
          
          {/* Control Pad Section */}
          <div className="px-6 pb-4  flex flex-col gap-3">
            {/* D-Pad */}
            <div className="flex justify-center mb-2">
              <div className="w-36 h-36 relative">
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#222] z-10"></div>
                
                {/* Up Button */}
              <button 
                  className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center z-20 transition-all duration-150"
                onClick={handleDPadUp}
              >
                  <div className="w-10 h-10 rounded-sm bg-[#222] flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-white"></div>
                  </div>
              </button>
              
                {/* Right Button */}
                <button 
                  className="absolute top-1/2 right-1 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center z-20 transition-all duration-150"
                  onClick={handleDPadRight}
                >
                  <div className="w-10 h-10 rounded-sm bg-[#222] flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-white"></div>
                  </div>
                </button>
                
                {/* Down Button */}
                <button 
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center z-20 transition-all duration-150"
                  onClick={handleDPadDown}
                >
                  <div className="w-10 h-10 rounded-sm bg-[#222] flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-white"></div>
                  </div>
                </button>
                
                {/* Left Button */}
                <button 
                  className="absolute top-1/2 left-1 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center z-20 transition-all duration-150"
                  onClick={handleDPadLeft}
                >
                  <div className="w-10 h-10 rounded-sm bg-[#222] flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] border-r-white"></div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex justify-around">
              {/* Black Circular Buttons */}
              <button 
                className="w-14 h-14 bg-[#222222] hover:bg-[#333333] active:bg-[#111111] rounded-full shadow-md border-2 border-[#111111] flex items-center justify-center transition-transform duration-150 transform active:scale-95"
                onClick={handleDPadSelect}
              >
                <Typography className="font-pixel text-[8px] text-white">
                  CHOOSE
                </Typography>
              </button>
              
              <button 
                className="w-14 h-14 bg-[#222222] hover:bg-[#333333] active:bg-[#111111] rounded-full shadow-md border-2 border-[#111111] flex items-center justify-center transition-transform duration-150 transform active:scale-95"
                onClick={showPokemonScreen ? togglePokemonScreen : toggleMusic}
              >
                <Typography className="font-pixel text-[8px] text-white">
                  BACK
                </Typography>
              </button>
            </div>
            
            {/* Bottom Control Elements */}
            <div className="flex justify-between items-center mt-1">
              {/* Speaker Holes */}
              <div className="flex space-x-0.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 h-4 bg-[#222222] rounded-full"></div>
                ))}
              </div>
              
              {/* Small Rectangular Buttons */}
              <div className="flex space-x-2">
                <button
                  className="w-10 h-4 bg-[#444444] hover:bg-[#555555] active:bg-[#333333] rounded shadow-sm border border-[#222222] flex items-center justify-center"
                  onClick={toggleMusicEnabled}
                >
                  <Typography className="font-pixel text-[6px] text-white">
                    {isMusicEnabled ? "SOUND" : "MUTE"}
                  </Typography>
                </button>
                
                <button
                  className="w-10 h-4 bg-[#FF5252] hover:bg-[#FF6E6E] active:bg-[#D64545] rounded shadow-sm border border-[#CC0000] flex items-center justify-center"
                >
                  <Typography className="font-pixel text-[6px] text-white">
                    POWER
              </Typography>
                </button>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="mt-2 bg-[#232323] rounded-full h-1.5 overflow-hidden border border-[#111111]">
              <div 
                className="h-full bg-[#AAFF00]" 
                style={{ width: `${(creatureIndex + 1) / creatures.length * 100}%` }}
              ></div>
            </div>
            
            <Typography className="font-pixel text-[8px] text-white text-center">
              {creatures.length} POKéMON REGISTERED
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this style for equalizer animation at the end of the file after export default Sidebar;
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
  
  @keyframes equalizer {
    0%, 100% { height: 40%; }
    50% { height: 100%; }
  }
  
  @keyframes equalize {
    0% { height: 3px; }
    50% { height: 8px; }
    100% { height: 3px; }
  }
`;
document.head.appendChild(style);

export default Sidebar; 