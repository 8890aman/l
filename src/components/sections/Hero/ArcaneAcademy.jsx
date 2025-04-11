import React from 'react';
import { Typography, Card, CardBody, Button, List, ListItem, ListItemPrefix, Progress } from "@material-tailwind/react";
import { AcademicCapIcon, BookOpenIcon, StarIcon, ChevronRightIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import colors from "../../../theme/colors";

// Import sample images
import CreatureImg from "../../../assets/pixel-art--mystery-nft-collectible-style--white-background.png";

const ArcaneAcademy = () => {
  // Learning paths data
  const learningPaths = [
    {
      id: 1,
      title: "Creature Basics",
      description: "Learn the fundamentals of creature care, training, and evolution.",
      level: "Beginner",
      modules: 8,
      completed: 5,
      progress: 62,
      icon: <BookOpenIcon className="h-5 w-5" style={{ color: colors.turquoise }} />
    },
    {
      id: 2,
      title: "Battle Tactics",
      description: "Master advanced battle strategies and creature type advantages.",
      level: "Intermediate",
      modules: 12,
      completed: 3,
      progress: 25,
      icon: <StarIcon className="h-5 w-5" style={{ color: colors.gold }} />
    },
    {
      id: 3,
      title: "Arcana Trading",
      description: "Understand marketplace dynamics and trading for maximum value.",
      level: "Advanced",
      modules: 10,
      completed: 1,
      progress: 10,
      icon: <ArrowUpCircleIcon className="h-5 w-5" style={{ color: "#9F7AEA" }} />
    }
  ];

  // Featured tutorials
  const featuredTutorials = [
    {
      id: 1,
      title: "Evolution Requirements for Water Creatures",
      author: "Professor Azure",
      duration: "12 min",
      views: 1542,
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Type Advantages in Tournament Play",
      author: "Battle Master Kai",
      duration: "20 min",
      views: 982,
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Reading Creature Stats Like a Pro",
      author: "Data Analyst Elara",
      duration: "15 min",
      views: 2341,
      difficulty: "Beginner"
    },
    {
      id: 4,
      title: "Market Timing: When to Buy & Sell",
      author: "Trader Phoenix",
      duration: "32 min",
      views: 876,
      difficulty: "Advanced"
    }
  ];

  // Difficulty color mapping
  const difficultyColors = {
    "Beginner": colors.turquoise,
    "Intermediate": colors.gold,
    "Advanced": "#9F7AEA"
  };

  return (
    <div className="bg-gray-50 w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <div className="flex items-center mb-2">
              <AcademicCapIcon className="h-8 w-8 mr-3" style={{ color: colors.gold }} />
              <Typography variant="h2" className="font-pixel text-3xl" style={{ color: colors.turquoise }}>
                ARCANE ACADEMY
              </Typography>
            </div>
            <Typography className="text-gray-600 max-w-2xl">
              Master the art of creature collection, training, and trading with our curated learning resources.
            </Typography>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              className="font-pixel"
              style={{ 
                backgroundColor: colors.gold,
                color: "black" 
              }}
            >
              VIEW ALL COURSES
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning paths section */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardBody>
                <Typography variant="h4" className="font-pixel mb-4" style={{ color: colors.turquoise }}>
                  YOUR LEARNING PATHS
                </Typography>
                
                <div className="space-y-6">
                  {learningPaths.map(path => (
                    <div key={path.id} className="border rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="rounded-full bg-gray-100 p-3 mr-4">
                          {path.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <Typography variant="h6" className="font-pixel" style={{ color: difficultyColors[path.level] }}>
                              {path.title}
                            </Typography>
                            <Typography variant="small" className="text-gray-500">
                              {path.level}
                            </Typography>
                          </div>
                          <Typography variant="small" className="mb-3">
                            {path.description}
                          </Typography>
                          
                          <div className="mb-2">
                            <Progress 
                              value={path.progress} 
                              size="sm" 
                              color={path.level === "Beginner" ? "teal" : path.level === "Intermediate" ? "amber" : "purple"}
                            />
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Typography variant="small" className="text-gray-600">
                              {path.completed} of {path.modules} modules completed
                            </Typography>
                            <Button 
                              variant="text" 
                              size="sm"
                              className="flex items-center font-pixel"
                              style={{ color: difficultyColors[path.level] }}
                            >
                              CONTINUE
                              <ChevronRightIcon className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
          
          {/* Featured tutorials */}
          <div>
            <Card className="shadow-sm">
              <CardBody>
                <Typography variant="h4" className="font-pixel mb-4" style={{ color: colors.turquoise }}>
                  FEATURED TUTORIALS
                </Typography>
                
                <List>
                  {featuredTutorials.map(tutorial => (
                    <ListItem key={tutorial.id} className="py-3">
                      <div className="w-full">
                        <div className="flex items-start">
                          <ListItemPrefix>
                            <div className="rounded-full bg-gray-100 p-2">
                              <BookOpenIcon className="h-4 w-4" style={{ color: difficultyColors[tutorial.difficulty] }} />
                            </div>
                          </ListItemPrefix>
                          
                          <div className="flex-1">
                            <Typography variant="h6" className="text-base">
                              {tutorial.title}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" className="text-gray-600">
                                by {tutorial.author}
                              </Typography>
                              <Typography variant="small" className="text-gray-500">
                                {tutorial.duration}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-2 ml-10 text-xs">
                          <div className="mr-4 text-gray-500">
                            {tutorial.views.toLocaleString()} views
                          </div>
                          <div 
                            className="px-2 py-1 rounded-full text-xs"
                            style={{ 
                              backgroundColor: `${difficultyColors[tutorial.difficulty]}20`, 
                              color: difficultyColors[tutorial.difficulty]
                            }}
                          >
                            {tutorial.difficulty}
                          </div>
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </List>
                
                <div className="mt-4">
                  <Button 
                    variant="outlined"
                    fullWidth
                    className="font-pixel"
                    style={{ 
                      color: colors.turquoise,
                      borderColor: colors.turquoise
                    }}
                  >
                    VIEW ALL TUTORIALS
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            {/* Quick tip */}
            <Card className="mt-6 shadow-sm" style={{ borderTop: `4px solid ${colors.gold}` }}>
              <CardBody>
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-amber-50 p-2 mr-3">
                    <StarIcon className="h-5 w-5" style={{ color: colors.gold }} />
                  </div>
                  <Typography variant="h5" className="font-pixel" style={{ color: colors.gold }}>
                    TRAINER TIP
                  </Typography>
                </div>
                
                <Typography className="mb-4">
                  Did you know that evolving your creatures at specific level milestones can unlock rare abilities? Wait until level 25 for TidalWraith to unlock its special Tsunami attack!
                </Typography>
                
                <div className="flex space-x-4">
                  <img 
                    src={CreatureImg} 
                    alt="Creature evolution" 
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <Typography variant="h6" className="text-sm">
                      Level-based Evolution Guide
                    </Typography>
                    <Button 
                      variant="text" 
                      size="sm"
                      className="flex items-center p-0 mt-1"
                      style={{ color: colors.turquoise }}
                    >
                      Read more
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcaneAcademy; 