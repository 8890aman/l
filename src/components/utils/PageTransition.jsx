import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";

const PageTransition = ({ 
  isActive, 
  onTransitionComplete, 
  // eslint-disable-next-line no-unused-vars
  pageName = "PAGE",
  excludeSidebar = true,
  duration = 1000 
}) => {
  // Local state for animation timing
  const [isVisible, setIsVisible] = useState(isActive);
  
  // Handle transition animation
  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      
      // If transition is activating, set a timer to complete it
      const timer = setTimeout(() => {
        if (onTransitionComplete) {
          onTransitionComplete();
        }
      }, duration);
      
      return () => clearTimeout(timer);
    } else {
      // If transition is deactivating, add a small delay before hiding completely
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // Animation out time
      
      return () => clearTimeout(timer);
    }
  }, [isActive, duration, onTransitionComplete]);
  
  // Don't render anything if not visible (fully transitioned out)
  if (!isVisible && !isActive) return null;
  
  return (
    <div 
      className={`fixed top-0 left-0 bottom-0 ${excludeSidebar ? 'right-0 md:right-[350px]' : 'right-0'} 
                 bg-[#232323] z-[40] pointer-events-none transition-transform duration-500 
                 ${isActive ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="h-full flex flex-col items-center justify-center">
        {/* Pixelated loading animation */}
        <div className="w-32 h-32 relative mb-4">
          {/* Pokéball animation */}
          <div className={`absolute inset-0 rounded-full bg-[#FF0000] border-8 border-[#111111] transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-0'}`}>
            <div className="absolute inset-0 w-full h-[16px] bg-[#111111] top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-8 border-[#111111]"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#111111]"></div>
          </div>
        </div>
        
        {/* Pixelated scan lines */}
        <div className="w-full h-full absolute inset-0 opacity-20 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="h-[2px] w-full bg-[#85DDFF]"
              style={{ 
                top: `${i * 2}%`,
                position: 'absolute',
                animation: 'scanline 3s linear infinite',
                animationDelay: `${i * 15}ms`,
              }}
            ></div>
          ))}
        </div>
        
        <Typography className="font-pixel text-[#85DDFF] text-lg z-10 animate-pulse">
          LOADING
        </Typography>
      </div>
      
      <style jsx="true">{`
        @keyframes scanline {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default PageTransition; 