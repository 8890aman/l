import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardBody,
  Progress,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Chip
} from "@material-tailwind/react";
import { 
  UserCircleIcon,
  StarIcon,
  TrophyIcon,
  ChartBarIcon,
  ClockIcon,
  FireIcon,
  BoltIcon
} from "@heroicons/react/24/outline";
import PageTransition from "../../utils/PageTransition";

// Import ash gif
import ashGif from "../../../assets/ash profile.gif";

const TrainerProfile = () => {
  const [pageTransition, setPageTransition] = useState(true);
  const [activeTab, setActiveTab] = useState("stats");
  const [profileCollapseOnMobile, setProfileCollapseOnMobile] = useState(false);
  
  // Example trainer data
  const trainerData = {
    name: "Ash Ketchum",
    level: 42,
    title: "Pokémon Master",
    location: "Pallet Town",
    joinedDate: "10/3/2018",
    exp: 78450,
    nextLevelExp: 80000,
    rank: "Elite",
    badges: 8,
    pokemonCount: 152,
    battleWins: 387,
    battleLosses: 64,
    catchRate: 85,
    achievements: [
      { name: "Fire Master", description: "Captured all fire type creatures", date: "12/5/2023", icon: <FireIcon className="w-4 h-4 text-orange-500" /> },
      { name: "Battle Legend", description: "Won 300+ battles", date: "3/18/2023", icon: <TrophyIcon className="w-4 h-4 text-amber-500" /> },
      { name: "Electric Specialist", description: "Evolved 20 electric types", date: "7/22/2023", icon: <BoltIcon className="w-4 h-4 text-yellow-500" /> },
      { name: "Pro Trainer", description: "Reached level 40", date: "5/10/2023", icon: <StarIcon className="w-4 h-4 text-blue-500" /> }
    ],
    recentActivity: [
      { action: "Caught a rare Vulpix", time: "2 hours ago" },
      { action: "Won battle against Team Rocket", time: "1 day ago" },
      { action: "Evolved Pikachu to Raichu", time: "3 days ago" },
      { action: "Completed Kanto region tour", time: "1 week ago" },
      { action: "Earned Fire Master achievement", time: "2 weeks ago" }
    ],
    stats: {
      strength: 85,
      stamina: 78,
      strategy: 92,
      catching: 88,
      training: 90,
      exploration: 83
    }
  };
  
  // Use effect to handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      // Always keep the profile visible by default regardless of screen size
      setProfileCollapseOnMobile(false);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Add animation effect when component mounts
  useEffect(() => {
    // Start with transition active
    setPageTransition(true);
    
    // Remove transition after delay will be handled by the component
  }, []);
  
  // Function to handle transition completion
  const handleTransitionComplete = () => {
    setPageTransition(false);
  };
  
  // Calculate experience percentage for progress bar
  const expPercentage = Math.round((trainerData.exp / trainerData.nextLevelExp) * 100);
  
  // Toggle profile section on mobile
  const toggleProfileSection = () => {
    setProfileCollapseOnMobile(!profileCollapseOnMobile);
  };

  return (
    <div className="h-[100vh] bg-white relative overflow-auto">
      {/* Use the PageTransition component */}
      <PageTransition 
        isActive={pageTransition}
        onTransitionComplete={handleTransitionComplete}
        pageName="TRAINER PROFILE"
        excludeSidebar={true}
        duration={1000}
      />
      
      <div className="w-full h-full px-2 sm:px-4 py-2 bg-white border-4 border-[#3298cb] rounded-lg flex flex-col lg:pr-[380px]">
        {/* Header */}
        <div className="mb-2 flex-shrink-0">
          <Typography variant="h2" className="font-pixel text-lg sm:text-xl text-[#3298cb] drop-shadow-sm">
            TRAINER PROFILE
          </Typography>
          <Typography className="text-gray-600 max-w-2xl text-xs">
            View your trainer stats, achievements, and recent activity.
          </Typography>
        </div>
        
        {/* Content Area - Takes remaining height */}
        <div className="flex-1 overflow-auto">
          <div className="h-full">
            {/* Mobile toggle button for profile section */}
            <div className="lg:hidden mb-2">
              <Button
                color="blue"
                className="w-full flex items-center justify-center gap-2 font-pixel py-2 bg-[#3298cb] text-white text-xs"
                onClick={toggleProfileSection}
              >
                <UserCircleIcon className="h-3 w-3" />
                {profileCollapseOnMobile ? "SHOW PROFILE" : "HIDE PROFILE"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-2 h-full">
              {/* Profile Card */}
              <div className={`lg:col-span-1 h-auto lg:h-full ${profileCollapseOnMobile ? 'hidden' : 'block'} lg:block`}>
                <Card className="bg-white border-4 border-[#3298cb] shadow-md rounded-lg h-full overflow-hidden">
                  <CardBody className="p-2 sm:p-4 lg:p-2 bg-[#85DDFF] h-full overflow-y-auto">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#2a6fa8] mb-2 bg-white flex items-center justify-center">
                        <img 
                          src={ashGif} 
                          alt="Trainer Ash"
                          className="h-24 sm:h-32 w-24 sm:w-32 object-contain"
                        />
                      </div>
                      
                      <Typography variant="h4" className="font-pixel text-sm sm:text-base text-[#2a6fa8] mb-0.5">
                        {trainerData.name}
                      </Typography>
                      
                      <div className="flex items-center mb-2">
                        <Chip
                          value={`Lvl ${trainerData.level}`}
                          className="font-pixel text-[10px] bg-[#3298cb] text-white px-2 py-1"
                          variant="filled"
                        />
                        <Chip
                          value={trainerData.rank}
                          className="font-pixel text-[10px] bg-amber-500 text-white ml-1 px-2 py-1"
                          variant="filled"
                        />
                      </div>
                      
                      <div className="w-full p-1.5 bg-[#3298cb] rounded-md mb-2 border border-[#2a6fa8]">
                        <Typography className="font-pixel text-[10px] text-white mb-0.5 text-center">
                          {trainerData.exp} / {trainerData.nextLevelExp} EXP
                        </Typography>
                        
                        {/* Pixelated progress bar */}
                        <div className="w-full h-4 bg-gray-200 relative rounded-sm overflow-hidden" 
                          style={{ 
                            borderRadius: '2px', 
                            boxShadow: 'inset 0 0 0 1px #000, inset 0 0 0 2px #fff'
                          }}
                        >
                          <div 
                            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                            style={{ 
                              width: `${expPercentage}%`,
                              clipPath: 'polygon(0% 0%, 95% 0%, 100% 20%, 100% 80%, 95% 100%, 0% 100%)'
                            }}
                          />
                          
                          {/* Pixelated grid overlay for 8-bit effect */}
                          <div className="absolute inset-0 opacity-10" 
                            style={{
                              backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                              backgroundSize: '4px 4px'
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Trainer Details - More compact on smaller screens */}
                      <div className="w-full bg-white border border-[#2a6fa8] rounded-md p-1.5 mb-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-2 gap-y-0.5">
                          <div className="flex justify-between items-center">
                            <Typography className="font-pixel text-[10px] text-[#2a6fa8]">
                              Title:
                            </Typography>
                            <Typography className="font-pixel text-[10px] text-gray-700">
                              {trainerData.title}
                            </Typography>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Typography className="font-pixel text-[10px] text-[#2a6fa8]">
                              Location:
                            </Typography>
                            <Typography className="font-pixel text-[10px] text-gray-700">
                              {trainerData.location}
                            </Typography>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Typography className="font-pixel text-[10px] text-[#2a6fa8]">
                              Joined:
                            </Typography>
                            <Typography className="font-pixel text-[10px] text-gray-700">
                              {trainerData.joinedDate}
                            </Typography>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Typography className="font-pixel text-[10px] text-[#2a6fa8]">
                              Collection:
                            </Typography>
                            <Typography className="font-pixel text-[10px] text-gray-700">
                              {trainerData.pokemonCount} Pokémon
                            </Typography>
                          </div>
                          
                          <div className="flex justify-between items-center sm:col-span-2 lg:col-span-1">
                            <Typography className="font-pixel text-[10px] text-[#2a6fa8]">
                              Badges:
                            </Typography>
                            <Typography className="font-pixel text-[10px] text-gray-700">
                              {trainerData.badges} Badges
                            </Typography>
                          </div>
                        </div>
                      </div>
                      
                      {/* Battle Record */}
                      <div className="w-full bg-[#3298cb] rounded-md p-1.5 border border-[#2a6fa8]">
                        <Typography className="font-pixel text-[10px] text-white mb-1 text-center">
                          BATTLE RECORD
                        </Typography>
                        
                        <div className="flex justify-between">
                          <div className="bg-green-500 text-white rounded-md p-1 w-[48%] flex flex-col items-center">
                            <Typography className="font-pixel text-[8px]">
                              WINS
                            </Typography>
                            <Typography className="font-pixel text-xs">
                              {trainerData.battleWins}
                            </Typography>
                          </div>
                          
                          <div className="bg-red-500 text-white rounded-md p-1 w-[48%] flex flex-col items-center">
                            <Typography className="font-pixel text-[8px]">
                              LOSSES
                            </Typography>
                            <Typography className="font-pixel text-xs">
                              {trainerData.battleLosses}
                            </Typography>
                          </div>
                        </div>
                        
                        <Typography className="font-pixel text-[8px] text-white mt-1 text-center">
                          Win Rate: {Math.round((trainerData.battleWins / (trainerData.battleWins + trainerData.battleLosses)) * 100)}%
                        </Typography>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              
              {/* Main Content Area */}
              <div className="lg:col-span-3 h-full">
                <Card className="h-full border-4 border-[#3298cb] rounded-lg overflow-hidden shadow-md bg-white">
                  <CardBody className="p-2 sm:p-4 lg:p-2 h-full overflow-auto">
                    {/* Tabs - Responsive layout for mobile */}
                    <Tabs value={activeTab} className="h-full" id="trainer-tabs">
                      <TabsHeader className="bg-[#85DDFF]/20 border-b-2 border-[#2a6fa8] mb-2 overflow-x-auto">
                        <Tab 
                          value="stats" 
                          onClick={() => setActiveTab("stats")}
                          className={`${activeTab === "stats" ? "text-[#2a6fa8] font-bold" : "text-gray-600"} font-pixel text-[9px] sm:text-xs py-1 min-w-[80px]`}
                        >
                          <div className="flex items-center gap-1 justify-center">
                            <ChartBarIcon className="h-3 w-3" />
                            <span className="hidden xs:inline">Stats</span>
                          </div>
                        </Tab>
                        <Tab 
                          value="achievements" 
                          onClick={() => setActiveTab("achievements")}
                          className={`${activeTab === "achievements" ? "text-[#2a6fa8] font-bold" : "text-gray-600"} font-pixel text-[9px] sm:text-xs py-1 min-w-[80px]`}
                        >
                          <div className="flex items-center gap-1 justify-center">
                            <StarIcon className="h-3 w-3" />
                            <span className="hidden xs:inline">Achievements</span>
                          </div>
                        </Tab>
                        <Tab 
                          value="activity" 
                          onClick={() => setActiveTab("activity")}
                          className={`${activeTab === "activity" ? "text-[#2a6fa8] font-bold" : "text-gray-600"} font-pixel text-[9px] sm:text-xs py-1 min-w-[80px]`}
                        >
                          <div className="flex items-center gap-1 justify-center">
                            <ClockIcon className="h-3 w-3" />
                            <span className="hidden xs:inline">Activity</span>
                          </div>
                        </Tab>
                      </TabsHeader>
                      
                      <TabsBody className="h-full overflow-auto">
                        {/* Stats Tab */}
                        <TabPanel value="stats" className="p-0">
                          <div className="pb-4">
                            <Typography variant="h5" className="font-pixel text-sm text-[#2a6fa8] mb-3 bg-white pb-1">
                              Trainer Stats
                            </Typography>
                            
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                              {Object.entries(trainerData.stats).map(([stat, value]) => (
                                <div key={stat} className="mb-2">
                                  <div className="flex justify-between mb-1">
                                    <Typography className="font-pixel text-[10px] text-gray-700 capitalize">
                                      {stat}
                                    </Typography>
                                    <Typography className="font-pixel text-[10px] text-[#2a6fa8]">
                                      {value}/100
                                    </Typography>
                                  </div>
                                  
                                  {/* Pixelated stat bar */}
                                  <div className="w-full h-4 bg-gray-200 relative rounded-sm overflow-hidden" 
                                    style={{ 
                                      borderRadius: '2px', 
                                      boxShadow: 'inset 0 0 0 1px #000, inset 0 0 0 2px #fff'
                                    }}
                                  >
                                    <div 
                                      className="absolute top-0 bottom-0 left-0 transition-all duration-500"
                                      style={{ 
                                        width: `${value}%`,
                                        clipPath: 'polygon(0% 0%, 95% 0%, 100% 20%, 100% 80%, 95% 100%, 0% 100%)',
                                        background: `linear-gradient(90deg, #3298cb, ${
                                          value < 50 ? '#64b5ed' :
                                          value < 70 ? '#4fc1ff' :
                                          value < 85 ? '#41aeff' : '#2a6fa8'
                                        })`
                                      }}
                                    />
                                    
                                    {/* Pixelated grid overlay for 8-bit effect */}
                                    <div className="absolute inset-0 opacity-10" 
                                      style={{
                                        backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                                        backgroundSize: '4px 4px'
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Trainer Trivia */}
                            <Typography variant="h5" className="font-pixel text-sm text-[#2a6fa8] mt-4 sm:mt-6 mb-3 bg-white pb-1">
                              Trainer Facts
                            </Typography>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-[#85DDFF]/20 p-2 rounded-md border border-[#3298cb]/30">
                                <Typography className="font-pixel text-[10px] text-gray-700">
                                  • Catch success rate: {trainerData.catchRate}%
                                </Typography>
                                <Typography className="font-pixel text-[10px] text-gray-700">
                                  • Favorite type: Electric
                                </Typography>
                                <Typography className="font-pixel text-[10px] text-gray-700">
                                  • First creature: Pikachu
                                </Typography>
                              </div>
                              
                              <div className="bg-[#85DDFF]/20 p-2 rounded-md border border-[#3298cb]/30">
                                <Typography className="font-pixel text-[10px] text-gray-700">
                                  • Regions explored: 6
                                </Typography>
                                <Typography className="font-pixel text-[10px] text-gray-700">
                                  • PokéDex completion: 78%
                                </Typography>
                                <Typography className="font-pixel text-[10px] text-gray-700">
                                  • Battle strategy: Aggressive
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        
                        {/* Achievements Tab */}
                        <TabPanel value="achievements" className="p-0">
                          <div className="pb-4">
                            <Typography variant="h5" className="font-pixel text-sm text-[#2a6fa8] mb-3 bg-white pb-1">
                              Achievements & Badges
                            </Typography>
                            
                            <div className="grid grid-cols-1 gap-2">
                              {trainerData.achievements.map((achievement, index) => (
                                <Card key={index} className="border border-[#3298cb]/30 rounded-md overflow-hidden">
                                  <CardBody className="p-2 flex items-center gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#85DDFF] flex items-center justify-center border-2 border-[#2a6fa8]">
                                      {achievement.icon}
                                    </div>
                                    
                                    <div className="flex-1">
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                        <Typography className="font-pixel text-[10px] sm:text-[12px] text-[#2a6fa8]">
                                          {achievement.name}
                                        </Typography>
                                        <Typography className="font-pixel text-[8px] text-gray-500">
                                          {achievement.date}
                                        </Typography>
                                      </div>
                                      <Typography className="font-pixel text-[9px] sm:text-[10px] text-gray-600">
                                        {achievement.description}
                                      </Typography>
                                    </div>
                                  </CardBody>
                                </Card>
                              ))}
                            </div>
                            
                            <div className="mt-4">
                              <Typography variant="h5" className="font-pixel text-sm text-[#2a6fa8] mb-3 bg-white pb-1">
                                Gym Badges
                              </Typography>
                              
                              <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
                                {/* Example gym badges - would be dynamic in a real app */}
                                {[...Array(8)].map((_, index) => (
                                  <div key={index} className="bg-[#85DDFF]/20 border border-[#3298cb]/30 rounded-md p-2 flex flex-col items-center">
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                                      index < trainerData.badges ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-gray-300'
                                    } border-2 border-[#2a6fa8]`}>
                                      {index < trainerData.badges ? (
                                        <StarIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                      ) : (
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-400 rounded-full opacity-30"></div>
                                      )}
                                    </div>
                                    <Typography className="font-pixel text-[8px] text-center mt-1 text-gray-700">
                                      {index < trainerData.badges ? `Badge ${index + 1}` : 'Locked'}
                                    </Typography>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        
                        {/* Activity Tab */}
                        <TabPanel value="activity" className="p-0">
                          <div className="pb-4">
                            <Typography variant="h5" className="font-pixel text-sm text-[#2a6fa8] mb-3 bg-white pb-1">
                              Recent Activity
                            </Typography>
                            
                            <div className="relative border-l-2 border-[#3298cb] pl-4 ml-2">
                              {trainerData.recentActivity.map((activity, index) => (
                                <div key={index} className="mb-4 relative">
                                  {/* Timeline dot */}
                                  <div className="absolute w-3 h-3 bg-[#3298cb] rounded-full -left-[1.65rem] border-2 border-white"></div>
                                  
                                  <div className="bg-[#85DDFF]/10 p-2 rounded-md border border-[#3298cb]/30">
                                    <Typography className="font-pixel text-[10px] sm:text-[12px] text-[#2a6fa8]">
                                      {activity.action}
                                    </Typography>
                                    <Typography className="font-pixel text-[8px] text-gray-500">
                                      {activity.time}
                                    </Typography>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-center mt-4">
                              <Button 
                                variant="outlined"
                                className="font-pixel text-[10px] border border-[#3298cb] text-[#2a6fa8] hover:bg-[#85DDFF]/20 px-3 py-1.5"
                              >
                                View All Activity
                              </Button>
                            </div>
                          </div>
                        </TabPanel>
                      </TabsBody>
                    </Tabs>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile; 