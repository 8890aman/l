import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
  Progress,
  Tooltip,
  IconButton,
  Tabs,
  TabsHeader,
  Tab
} from "@material-tailwind/react";
import {
  TrophyIcon,
  BoltIcon,
  HeartIcon,
  ShieldIcon,
  Cog6ToothIcon,
  ArrowUpIcon,
  SparklesIcon,
  ArrowPathIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import colors from "../../../theme/colors";

// Import creature images
import TidalWraithImg from "../../../assets/pixel-art--gyarados-nft-collectible-style--white-b.png";
import VoltVixenImg from "../../../assets/pixel-art--electrofox-nft-collectible-style--white-background.png";
import EmberWingImg from "../../../assets/pixel-art--firedragon-nft-collectible-style--white-background.png";

const TrainingCenter = () => {
  const [selectedCreature, setSelectedCreature] = useState(0);
  const [currentModule, setCurrentModule] = useState('stats');
  const [trainingEnergy, setTrainingEnergy] = useState(100);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingInterval, setTrainingInterval] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Player creatures collection with stats
  const playerCreatures = [
    {
      id: 1,
      name: "TidalWraith",
      type: "water",
      level: 28,
      image: TidalWraithImg,
      experience: 3240,
      nextLevel: 4000,
      stats: {
        attack: 68,
        defense: 72,
        speed: 65,
        special: 81
      },
      skills: [
        { name: "Hydro Blast", level: 3, damage: 45, type: "water", cooldown: "5s" },
        { name: "Tidal Wave", level: 2, damage: 35, type: "water", cooldown: "3s" },
        { name: "Whirlpool", level: 1, damage: 20, type: "water", cooldown: "2s" },
      ],
      training: {
        attack: 0,
        defense: 0,
        speed: 0,
        special: 0
      }
    },
    {
      id: 2,
      name: "VoltVixen",
      type: "electric",
      level: 23,
      image: VoltVixenImg,
      experience: 2100,
      nextLevel: 2500,
      stats: {
        attack: 61,
        defense: 54,
        speed: 85,
        special: 70
      },
      skills: [
        { name: "Thunder Shock", level: 3, damage: 40, type: "electric", cooldown: "4s" },
        { name: "Quick Attack", level: 2, damage: 25, type: "normal", cooldown: "2s" },
        { name: "Spark", level: 1, damage: 15, type: "electric", cooldown: "1s" },
      ],
      training: {
        attack: 0,
        defense: 0,
        speed: 0,
        special: 0
      }
    },
    {
      id: 3,
      name: "EmberWing",
      type: "fire",
      level: 32,
      image: EmberWingImg,
      experience: 5200,
      nextLevel: 6000,
      stats: {
        attack: 78,
        defense: 65,
        speed: 72,
        special: 76
      },
      skills: [
        { name: "Inferno", level: 3, damage: 50, type: "fire", cooldown: "6s" },
        { name: "Wing Attack", level: 2, damage: 30, type: "flying", cooldown: "3s" },
        { name: "Ember", level: 1, damage: 20, type: "fire", cooldown: "2s" },
      ],
      training: {
        attack: 0,
        defense: 0,
        speed: 0,
        special: 0
      }
    }
  ];
  
  // Training modules data
  const trainingModules = [
    { 
      id: 'stats', 
      name: 'STATS', 
      description: 'Improve your creature\'s base statistics',
      icon: <Cog6ToothIcon className="h-4 w-4" /> 
    },
    { 
      id: 'skills', 
      name: 'SKILLS', 
      description: 'Upgrade and learn new abilities',
      icon: <BoltIcon className="h-4 w-4" /> 
    }
  ];
  
  // Get color based on creature type
  const getTypeColor = (type) => {
    switch(type) {
      case 'water': return { bg: '#E0F2FE', text: '#0EA5E9', border: '#7DD3FC' };
      case 'fire': return { bg: '#FFEDD5', text: '#F97316', border: '#FDBA74' };
      case 'electric': return { bg: '#FEF9C3', text: '#CA8A04', border: '#FDE047' };
      default: return { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' };
    }
  };
  
  // Start training session for selected stat
  const startTraining = (statType) => {
    if (trainingEnergy <= 0 || trainingInterval) return;
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(trainingInterval);
          setTrainingInterval(null);
          setTrainingComplete(true);
          setShowAnimation(true);
          
          // Update creature's training values
          const updatedCreatures = [...playerCreatures];
          updatedCreatures[selectedCreature].training[statType] += 1;
          
          // Decrease energy
          setTrainingEnergy(prev => Math.max(0, prev - 25));
          
          setTimeout(() => {
            setShowAnimation(false);
            setTrainingComplete(false);
            setTrainingProgress(0);
          }, 2000);
          
          return 0;
        }
        return prev + 4;
      });
    }, 100);
    
    setTrainingInterval(interval);
  };
  
  // Cancel ongoing training
  const cancelTraining = () => {
    if (trainingInterval) {
      clearInterval(trainingInterval);
      setTrainingInterval(null);
      setTrainingProgress(0);
    }
  };
  
  // Reset energy with cooldown
  const resetEnergy = () => {
    if (trainingEnergy < 100) {
      setTrainingEnergy(100);
    }
  };
  
  // Clear interval on component unmount
  useEffect(() => {
    return () => {
      if (trainingInterval) {
        clearInterval(trainingInterval);
      }
    };
  }, [trainingInterval]);
  
  const creature = playerCreatures[selectedCreature];
  const typeColor = getTypeColor(creature.type);
  
  return (
    <div className="bg-white w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row mb-10">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <div>
              <Typography variant="h2" className="font-pixel text-3xl mb-4" style={{ color: colors.turquoise }}>
                TRAINING CENTER
              </Typography>
              <Typography className="text-gray-600 mb-6">
                Enhance your creatures' abilities through specialized training sessions. Improve stats, learn new skills, and evolve your team to defeat any challenger.
              </Typography>
            </div>
            
            {/* Creature Selection Panel */}
            <div className="mb-6">
              <Typography variant="h5" className="font-pixel mb-3" style={{ color: colors.gold }}>
                <TrophyIcon className="h-5 w-5 inline-block mr-2" />
                YOUR CREATURES
              </Typography>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {playerCreatures.map((creature, index) => (
                  <Card 
                    key={creature.id} 
                    className={`cursor-pointer transition-all ${
                      selectedCreature === index 
                        ? 'shadow-lg ring-2 transform scale-105' 
                        : 'shadow hover:shadow-md'
                    }`}
                    style={{ 
                      borderColor: selectedCreature === index ? typeColor.border : '',
                      ringColor: selectedCreature === index ? typeColor.border : ''
                    }}
                    onClick={() => setSelectedCreature(index)}
                  >
                    <CardBody className="p-4">
                      <div className="bg-gray-50 rounded-md flex items-center justify-center p-2 mb-2 h-24">
                        <img 
                          src={creature.image} 
                          alt={creature.name} 
                          className="h-20 object-contain"
                        />
                      </div>
                      <Typography variant="h6" className="font-pixel text-center" style={{ color: colors.turquoise }}>
                        {creature.name}
                      </Typography>
                      <div className="flex justify-center items-center mt-1">
                        <span 
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{ 
                            backgroundColor: getTypeColor(creature.type).bg,
                            color: getTypeColor(creature.type).text
                          }}
                        >
                          {creature.type.toUpperCase()}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-xs font-medium">LVL {creature.level}</span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Energy Meter */}
            <Card className="mb-6">
              <CardBody className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-pixel" style={{ color: colors.turquoise }}>
                    TRAINING ENERGY
                  </Typography>
                  <IconButton
                    variant="text"
                    size="sm"
                    color="blue"
                    onClick={resetEnergy}
                    disabled={trainingEnergy >= 100}
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                  </IconButton>
                </div>
                <Progress
                  value={trainingEnergy}
                  size="lg"
                  color={trainingEnergy > 50 ? "green" : trainingEnergy > 25 ? "amber" : "red"}
                  className="h-4"
                />
                <div className="flex justify-between mt-2">
                  <Typography variant="small" className="text-gray-600">
                    Each training session uses 25 energy
                  </Typography>
                  <Typography variant="small" className="font-medium">
                    {trainingEnergy}/100
                  </Typography>
                </div>
              </CardBody>
            </Card>
            
            {/* Experience Progress */}
            <Card>
              <CardBody className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-pixel" style={{ color: colors.turquoise }}>
                    LEVEL PROGRESS
                  </Typography>
                  <Typography className="text-sm">
                    Level {creature.level}
                    <ArrowUpIcon className="h-3 w-3 inline-block ml-1" />
                    {creature.level + 1}
                  </Typography>
                </div>
                <Progress
                  value={(creature.experience / creature.nextLevel) * 100}
                  size="lg"
                  color="blue"
                  className="h-4"
                />
                <div className="flex justify-between mt-2">
                  <Typography variant="small" className="text-gray-600">
                    Training increases experience
                  </Typography>
                  <Typography variant="small" className="font-medium">
                    {creature.experience}/{creature.nextLevel} XP
                  </Typography>
                </div>
              </CardBody>
            </Card>
          </div>
          
          <div className="lg:w-1/2 lg:pl-8">
            <Card className="relative">
              {showAnimation && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-30 rounded-lg">
                  <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                    <SparklesIcon className="h-12 w-12 mx-auto mb-3 text-yellow-500" />
                    <Typography variant="h4" className="font-pixel" style={{ color: colors.gold }}>
                      TRAINING COMPLETE!
                    </Typography>
                    <Typography>
                      Your creature's stats have improved!
                    </Typography>
                  </div>
                </div>
              )}
              
              <CardBody>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Typography variant="h4" className="font-pixel" style={{ color: colors.turquoise }}>
                      {creature.name}
                    </Typography>
                    <div className="flex items-center">
                      <span 
                        className="px-2 py-0.5 rounded-full text-sm mr-2"
                        style={{ 
                          backgroundColor: typeColor.bg,
                          color: typeColor.text
                        }}
                      >
                        {creature.type.toUpperCase()}
                      </span>
                      <Typography className="text-sm">
                        Level {creature.level}
                      </Typography>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <img 
                      src={creature.image} 
                      alt={creature.name} 
                      className="h-32 object-contain"
                    />
                  </div>
                </div>
                
                <Tabs value={currentModule} onChange={(value) => setCurrentModule(value)}>
                  <TabsHeader>
                    {trainingModules.map((module) => (
                      <Tab key={module.id} value={module.id} className="font-pixel">
                        <div className="flex items-center gap-2">
                          {module.icon}
                          <span>{module.name}</span>
                        </div>
                      </Tab>
                    ))}
                  </TabsHeader>
                </Tabs>
                
                <div className="mt-6">
                  {currentModule === 'stats' && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div 
                          className={`p-4 border rounded-lg ${
                            trainingInterval && !trainingComplete ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <BoltIcon className="h-5 w-5 mr-2 text-red-500" />
                              <Typography className="font-medium">
                                Attack
                              </Typography>
                            </div>
                            <Typography className="font-bold text-lg">
                              {creature.stats.attack + creature.training.attack}
                              {creature.training.attack > 0 && (
                                <span className="text-green-500 text-sm ml-1">
                                  +{creature.training.attack}
                                </span>
                              )}
                            </Typography>
                          </div>
                          
                          {trainingInterval && !trainingComplete ? (
                            <div>
                              <Progress
                                value={trainingProgress}
                                color="red"
                                className="h-2 mb-2"
                              />
                              <Button
                                size="sm"
                                color="red"
                                variant="outlined"
                                fullWidth
                                onClick={cancelTraining}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              color="red"
                              fullWidth
                              disabled={trainingEnergy <= 0 || !!trainingInterval}
                              onClick={() => startTraining('attack')}
                            >
                              Train Attack
                            </Button>
                          )}
                        </div>
                        
                        <div 
                          className={`p-4 border rounded-lg ${
                            trainingInterval && !trainingComplete ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <ShieldIcon className="h-5 w-5 mr-2 text-blue-500" />
                              <Typography className="font-medium">
                                Defense
                              </Typography>
                            </div>
                            <Typography className="font-bold text-lg">
                              {creature.stats.defense + creature.training.defense}
                              {creature.training.defense > 0 && (
                                <span className="text-green-500 text-sm ml-1">
                                  +{creature.training.defense}
                                </span>
                              )}
                            </Typography>
                          </div>
                          
                          {trainingInterval && !trainingComplete ? (
                            <div>
                              <Progress
                                value={trainingProgress}
                                color="blue"
                                className="h-2 mb-2"
                              />
                              <Button
                                size="sm"
                                color="blue"
                                variant="outlined"
                                fullWidth
                                onClick={cancelTraining}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              color="blue"
                              fullWidth
                              disabled={trainingEnergy <= 0 || !!trainingInterval}
                              onClick={() => startTraining('defense')}
                            >
                              Train Defense
                            </Button>
                          )}
                        </div>
                        
                        <div 
                          className={`p-4 border rounded-lg ${
                            trainingInterval && !trainingComplete ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <HeartIcon className="h-5 w-5 mr-2 text-green-500" />
                              <Typography className="font-medium">
                                Speed
                              </Typography>
                            </div>
                            <Typography className="font-bold text-lg">
                              {creature.stats.speed + creature.training.speed}
                              {creature.training.speed > 0 && (
                                <span className="text-green-500 text-sm ml-1">
                                  +{creature.training.speed}
                                </span>
                              )}
                            </Typography>
                          </div>
                          
                          {trainingInterval && !trainingComplete ? (
                            <div>
                              <Progress
                                value={trainingProgress}
                                color="green"
                                className="h-2 mb-2"
                              />
                              <Button
                                size="sm"
                                color="green"
                                variant="outlined"
                                fullWidth
                                onClick={cancelTraining}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              color="green"
                              fullWidth
                              disabled={trainingEnergy <= 0 || !!trainingInterval}
                              onClick={() => startTraining('speed')}
                            >
                              Train Speed
                            </Button>
                          )}
                        </div>
                        
                        <div 
                          className={`p-4 border rounded-lg ${
                            trainingInterval && !trainingComplete ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <SparklesIcon className="h-5 w-5 mr-2 text-purple-500" />
                              <Typography className="font-medium">
                                Special
                              </Typography>
                            </div>
                            <Typography className="font-bold text-lg">
                              {creature.stats.special + creature.training.special}
                              {creature.training.special > 0 && (
                                <span className="text-green-500 text-sm ml-1">
                                  +{creature.training.special}
                                </span>
                              )}
                            </Typography>
                          </div>
                          
                          {trainingInterval && !trainingComplete ? (
                            <div>
                              <Progress
                                value={trainingProgress}
                                color="purple"
                                className="h-2 mb-2"
                              />
                              <Button
                                size="sm"
                                color="purple"
                                variant="outlined"
                                fullWidth
                                onClick={cancelTraining}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              color="purple"
                              fullWidth
                              disabled={trainingEnergy <= 0 || !!trainingInterval}
                              onClick={() => startTraining('special')}
                            >
                              Train Special
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <Typography className="text-gray-600 text-sm italic">
                          Training increases both stats and experience toward the next level.
                          <Tooltip content="Higher stats improves battle performance. When your creature gains enough experience, it will level up and become more powerful.">
                            <InformationCircleIcon className="h-4 w-4 inline-block ml-1 cursor-help" />
                          </Tooltip>
                        </Typography>
                      </div>
                    </div>
                  )}
                  
                  {currentModule === 'skills' && (
                    <div>
                      <Typography className="mb-4 text-gray-600">
                        Upgrade your creature's skills or teach them new abilities.
                      </Typography>
                      
                      <div className="space-y-4">
                        {creature.skills.map((skill, index) => (
                          <Card key={index} className="overflow-hidden">
                            <CardBody className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Typography variant="h6" className="font-pixel" style={{ color: colors.turquoise }}>
                                    {skill.name}
                                  </Typography>
                                  <div className="flex items-center mt-1">
                                    <span 
                                      className="px-2 py-0.5 rounded-full text-xs mr-2"
                                      style={{ 
                                        backgroundColor: getTypeColor(skill.type).bg,
                                        color: getTypeColor(skill.type).text
                                      }}
                                    >
                                      {skill.type.toUpperCase()}
                                    </span>
                                    <Typography className="text-xs text-gray-600">
                                      Level {skill.level} • {skill.damage} damage • {skill.cooldown} cooldown
                                    </Typography>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  disabled={trainingEnergy < 50}
                                  style={{ 
                                    backgroundColor: colors.turquoise,
                                    color: "white" 
                                  }}
                                >
                                  Upgrade
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                        
                        <Card className="border-dashed border-2 border-gray-300">
                          <CardBody className="p-4 text-center">
                            <Typography className="text-gray-500">
                              <SparklesIcon className="h-6 w-6 mx-auto mb-2" />
                              Learn New Skill
                            </Typography>
                            <Button
                              variant="outlined"
                              size="sm"
                              className="mt-2"
                              disabled={trainingEnergy < 75}
                            >
                              75 Energy to Unlock
                            </Button>
                          </CardBody>
                        </Card>
                      </div>
                      
                      <div className="text-center mt-6">
                        <Typography className="text-gray-600 text-sm italic">
                          Upgrading skills requires 50 energy. Learning new skills requires 75 energy.
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
              
              <CardFooter className="pt-0">
                <div className="border-t pt-4">
                  <Typography variant="small" className="font-medium mb-2">
                    Training Summary
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    You've improved {creature.name}'s stats {Object.values(creature.training).reduce((a, b) => a + b, 0)} times through training.
                    Continue training to reach level {creature.level + 1} and unlock new abilities!
                  </Typography>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCenter; 