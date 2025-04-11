import React from 'react';
import { Typography, Card, CardBody, Progress, Button } from "@material-tailwind/react";
import colors from "../../../theme/colors";

const TrainerStats = () => {
  // Trainer stats data
  const trainerInfo = {
    name: "Alex",
    level: 28,
    exp: 12450,
    nextLevel: 15000,
    rank: "Elite Collector",
    joinDate: "Mar 15, 2023",
    creatures: {
      collected: 87,
      total: 150,
      byType: [
        { type: "Fire", count: 12, total: 18, color: "#F87171" },
        { type: "Water", count: 15, total: 24, color: "#60A5FA" },
        { type: "Electric", count: 9, total: 15, color: "#FBBF24" },
        { type: "Grass", count: 14, total: 20, color: "#4ADE80" },
        { type: "Dragon", count: 6, total: 12, color: "#C084FC" },
        { type: "Other", count: 31, total: 61, color: "#94A3B8" }
      ]
    },
    achievements: [
      { name: "Fire Master", description: "Collect 10 fire type creatures", completed: true, icon: "🔥" },
      { name: "Water Expert", description: "Collect 15 water type creatures", completed: true, icon: "💧" },
      { name: "Early Adopter", description: "Join during beta period", completed: true, icon: "🌟" },
      { name: "Dragon Tamer", description: "Collect all dragon types", completed: false, icon: "🐉" },
      { name: "Trading Pro", description: "Complete 50 trades", completed: false, icon: "🔄" }
    ]
  };

  // Calculate collection percentage
  const collectionPercentage = Math.round((trainerInfo.creatures.collected / trainerInfo.creatures.total) * 100);
  
  // Calculate level progress percentage
  const levelProgressPercentage = Math.round((trainerInfo.exp / trainerInfo.nextLevel) * 100);

  return (
    <div className="bg-white w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <Typography variant="h2" className="font-pixel text-3xl mb-2" style={{ color: colors.turquoise }}>
            TRAINER PROFILE
          </Typography>
          <Typography className="text-gray-600 max-w-2xl">
            Track your collection progress, view achievements, and see your trainer statistics.
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trainer Profile Card */}
          <Card className="shadow-md">
            <CardBody>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-turquoise to-gold flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {trainerInfo.name.charAt(0)}
                </div>
                <div>
                  <Typography variant="h4" className="font-pixel" style={{ color: colors.gold }}>
                    {trainerInfo.name}
                  </Typography>
                  <Typography className="text-gray-600">
                    {trainerInfo.rank}
                  </Typography>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <Typography className="text-sm font-medium">
                    Level {trainerInfo.level}
                  </Typography>
                  <Typography className="text-sm">
                    {trainerInfo.exp} / {trainerInfo.nextLevel} XP
                  </Typography>
                </div>
                <Progress 
                  value={levelProgressPercentage} 
                  className="h-2"
                  style={{ 
                    '--progress-color': colors.turquoise,
                    background: `${colors.turquoise}30`
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Typography className="text-gray-500 text-sm">Creatures</Typography>
                  <Typography className="font-pixel text-xl" style={{ color: colors.turquoise }}>
                    {trainerInfo.creatures.collected}/{trainerInfo.creatures.total}
                  </Typography>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Typography className="text-gray-500 text-sm">Joined</Typography>
                  <Typography className="font-pixel text-xl" style={{ color: colors.turquoise }}>
                    {trainerInfo.joinDate}
                  </Typography>
                </div>
              </div>

              <Button 
                fullWidth
                className="font-pixel text-sm"
                style={{ backgroundColor: colors.gold, color: "#000" }}
              >
                EDIT PROFILE
              </Button>
            </CardBody>
          </Card>

          {/* Collection Progress Card */}
          <Card className="shadow-md">
            <CardBody>
              <Typography variant="h5" className="font-pixel mb-4" style={{ color: colors.gold }}>
                COLLECTION PROGRESS
              </Typography>

              <div className="mb-6 text-center">
                <div className="relative inline-block">
                  <svg className="w-32 h-32" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={`${colors.turquoise}30`}
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={colors.turquoise}
                      strokeWidth="3"
                      strokeDasharray={`${collectionPercentage}, 100`}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <Typography className="font-pixel text-3xl" style={{ color: colors.gold }}>
                      {collectionPercentage}%
                    </Typography>
                    <Typography className="text-xs text-gray-500">
                      Complete
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {trainerInfo.creatures.byType.map((type, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <Typography className="text-sm font-medium">
                        {type.type}
                      </Typography>
                      <Typography className="text-sm">
                        {type.count}/{type.total}
                      </Typography>
                    </div>
                    <Progress 
                      value={(type.count / type.total) * 100} 
                      className="h-1.5"
                      style={{ 
                        '--progress-color': type.color,
                        background: `${type.color}30`
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Achievements Card */}
          <Card className="shadow-md">
            <CardBody>
              <Typography variant="h5" className="font-pixel mb-4" style={{ color: colors.gold }}>
                ACHIEVEMENTS
              </Typography>

              <div className="space-y-4">
                {trainerInfo.achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border flex items-start ${
                      achievement.completed 
                        ? `border-green-200 bg-green-50` 
                        : `border-gray-200 bg-gray-50 opacity-60`
                    }`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-lg mr-3 flex items-center justify-center text-lg ${
                        achievement.completed 
                          ? `bg-green-100` 
                          : `bg-gray-200`
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div>
                      <Typography 
                        className={`font-medium ${achievement.completed ? 'text-green-800' : 'text-gray-500'}`}
                      >
                        {achievement.name}
                      </Typography>
                      <Typography className="text-xs text-gray-500">
                        {achievement.description}
                      </Typography>
                    </div>
                    {achievement.completed && (
                      <div className="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button 
                fullWidth
                className="mt-6 font-pixel text-sm"
                variant="outlined"
                style={{ 
                  color: colors.turquoise,
                  borderColor: colors.turquoise
                }}
              >
                VIEW ALL ACHIEVEMENTS
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrainerStats; 