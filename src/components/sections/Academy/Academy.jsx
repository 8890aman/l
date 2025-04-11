import React from "react";
import { Typography, Card, Button } from "@material-tailwind/react";

const Academy = () => {
  const courses = [
    {
      title: "Battle Basics",
      level: "Beginner",
      duration: "2 hours",
      modules: 5,
      description: "Learn the fundamentals of creature battles and strategy"
    },
    {
      title: "Advanced Training",
      level: "Intermediate",
      duration: "4 hours",
      modules: 8,
      description: "Master advanced training techniques and evolution paths"
    },
    {
      title: "Market Mastery",
      level: "Advanced",
      duration: "3 hours",
      modules: 6,
      description: "Understanding market dynamics and trading strategies"
    }
  ];

  const resources = [
    {
      title: "Creature Guide",
      type: "Documentation",
      lastUpdated: "2 days ago"
    },
    {
      title: "Training Manual",
      type: "PDF Guide",
      lastUpdated: "1 week ago"
    },
    {
      title: "Strategy Handbook",
      type: "Interactive",
      lastUpdated: "3 days ago"
    }
  ];

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto">
        {/* Academy Header */}
        <div className="text-center mb-10">
          <Typography variant="h2" className="font-pixel text-4xl text-gray-800 mb-4">
            Arcane Academy
          </Typography>
          <Typography className="text-gray-600 font-pixel">
            Master the Art of Creature Training
          </Typography>
        </div>

        {/* Courses Section */}
        <div className="mb-12">
          <Typography variant="h3" className="font-pixel text-2xl text-gray-800 mb-6">
            Featured Courses
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="p-6 bg-white shadow-lg rounded-xl border border-gray-100">
                <Typography variant="h5" className="font-pixel text-gray-800 mb-4">
                  {course.title}
                </Typography>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <Typography className="text-gray-600 font-pixel">Level</Typography>
                    <Typography className="text-gray-800 font-pixel">{course.level}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography className="text-gray-600 font-pixel">Duration</Typography>
                    <Typography className="text-gray-800 font-pixel">{course.duration}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography className="text-gray-600 font-pixel">Modules</Typography>
                    <Typography className="text-gray-800 font-pixel">{course.modules}</Typography>
                  </div>
                </div>
                <Typography className="text-gray-600 font-pixel text-sm mb-4">
                  {course.description}
                </Typography>
                <Button className="w-full bg-purple-500 font-pixel text-sm">
                  Start Learning
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-12">
          <Typography variant="h3" className="font-pixel text-2xl text-gray-800 mb-6">
            Learning Resources
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="p-6 bg-white shadow-lg rounded-xl border border-gray-100">
                <Typography variant="h5" className="font-pixel text-gray-800 mb-2">
                  {resource.title}
                </Typography>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Typography className="text-gray-600 font-pixel">Type</Typography>
                    <Typography className="text-gray-800 font-pixel">{resource.type}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography className="text-gray-600 font-pixel">Updated</Typography>
                    <Typography className="text-gray-800 font-pixel">{resource.lastUpdated}</Typography>
                  </div>
                </div>
                <Button variant="text" className="mt-4 w-full text-purple-500 font-pixel text-sm">
                  Access Resource
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academy; 